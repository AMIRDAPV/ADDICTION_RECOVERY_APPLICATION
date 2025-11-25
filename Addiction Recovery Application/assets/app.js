const TOTAL_CHALLENGES = 28;

document.addEventListener("DOMContentLoaded", async () => {
  await ensureSeedUsers();
  renderNavbar();
  wireGlobalActions();
  
  // Only initialize tree and progress UI on pages that have them
  const treeStage = document.getElementById("treeStage");
  if (treeStage) {
    initializeTree();
    updateProgressUI();
  }
  
  setYearFooter();
});

function ensureSeedUsers() {
  if (localStorage.getItem("users")) {
    return Promise.resolve();
  }

  return fetch("data/users.json")
    .then(response => (response.ok ? response.json() : null))
    .then(data => {
      if (data && Array.isArray(data)) {
        localStorage.setItem("users", JSON.stringify(data));
      }
    })
    .catch(() => {
      console.warn("Could not seed users from JSON.");
    });
}

function renderNavbar() {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  navbar.innerHTML = `
    <div class="nav-container">
      <a class="brand" href="index.html">
        <span class="brand-icon">🌱</span>
        <span>Bloom Recovery</span>
      </a>
      <div class="nav-actions">
        <a class="nav-link" href="index.html">Home</a>
        ${getAuthMarkup()}
      </div>
    </div>
  `;

  const logoutBtn = document.querySelector("[data-action='logout']");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", handleLogout);
  }
}

function getAuthMarkup() {
  const loggedIn = localStorage.getItem("loggedIn") === "true";
  if (loggedIn) {
    const currentUser = localStorage.getItem("currentUser") || "You";
    return `
      <span class="nav-link" style="pointer-events:none;">Hi, ${sanitize(currentUser)}</span>
      <button class="btn-outline" data-action="logout">Logout</button>
    `;
  }

  return `
    <a class="nav-link" href="login.html">Login</a>
    <a class="btn-primary" style="text-decoration:none;display:inline-flex;align-items:center;justify-content:center;" href="signup.html">Sign Up</a>
  `;
}

function handleLogout() {
  localStorage.setItem("loggedIn", "false");
  localStorage.removeItem("currentUser");
  alert("Logged out successfully. Come back soon!");
  window.location.href = "index.html";
}

function wireGlobalActions() {
  document.querySelectorAll("[data-action='start-journey']").forEach(btn => {
    btn.addEventListener("click", () => {
      const loggedIn = localStorage.getItem("loggedIn") === "true";
      window.location.href = loggedIn ? "quiz.html" : "login.html";
    });
  });

  document.querySelectorAll("[data-action='open-settings']").forEach(btn => {
    btn.addEventListener("click", () => {
      alert("Personal reminder settings are coming soon. For now, schedule your mindful breaks in your favorite planner!");
    });
  });
}

function getUserProgressKey() {
  const currentUser = localStorage.getItem("currentUser");
  return currentUser ? `recoveryProgress_${currentUser}` : "recoveryProgress";
}

function updateProgressUI() {
  const progressFill = document.getElementById("progressFill");
  const progressText = document.getElementById("progressText");
  const challengeCount = document.getElementById("challengeCount");
  const treeStage = document.getElementById("treeStage");

  if (!progressFill && !treeStage) return;

  const { completed, percent } = calculateProgress();

  if (progressFill) {
    progressFill.style.width = `${percent}%`;
  }
  if (progressText) {
    progressText.textContent = `${percent}% completed`;
  }
  if (challengeCount) {
    challengeCount.textContent = `${completed} of ${TOTAL_CHALLENGES} mindful moments logged`;
  }
  if (treeStage) {
    const stage = deriveTreeStage(percent, completed);
    treeStage.setAttribute("data-stage", stage);
    animateTreeGrowth(treeStage, completed, false);
  }
}

function calculateProgress() {
  const progressKey = getUserProgressKey();
  const progress = JSON.parse(localStorage.getItem(progressKey) || "{}");
  let completed = 0;

  Object.values(progress).forEach(weekArray => {
    if (!Array.isArray(weekArray)) return;

    weekArray.forEach(day => {
      if (day?.completed) {
        completed += 1;
      }
    });
  });

  const percent = Math.min(100, Math.round((completed / TOTAL_CHALLENGES) * 100));
  return { completed, percent };
}

function initializeTreeElements(leafContainer, budsContainer, flowersContainer) {
  if (!leafContainer || !budsContainer || !flowersContainer) return;
  
  // Generate 28 leaves with more natural, tree-like distribution
  const leafPositions = [
    // Top canopy (sapling stage - first 10)
    { top: '15%', left: '48%', rotate: '-12deg', size: '14px' },
    { top: '18%', left: '35%', rotate: '25deg', size: '16px' },
    { top: '20%', left: '62%', rotate: '-28deg', size: '15px' },
    { top: '22%', left: '28%', rotate: '18deg', size: '17px' },
    { top: '24%', left: '55%', rotate: '-15deg', size: '16px' },
    { top: '26%', left: '70%', rotate: '22deg', size: '15px' },
    { top: '28%', left: '42%', rotate: '-20deg', size: '18px' },
    { top: '30%', left: '32%', rotate: '30deg', size: '16px' },
    { top: '32%', left: '65%', rotate: '-25deg', size: '17px' },
    { top: '34%', left: '50%', rotate: '15deg', size: '18px' },
    // Middle canopy (grown stage - next 10)
    { top: '36%', left: '38%', rotate: '-18deg', size: '19px' },
    { top: '38%', left: '58%', rotate: '28deg', size: '18px' },
    { top: '40%', left: '30%', rotate: '-22deg', size: '20px' },
    { top: '42%', left: '68%', rotate: '20deg', size: '19px' },
    { top: '44%', left: '45%', rotate: '-25deg', size: '21px' },
    { top: '46%', left: '52%', rotate: '18deg', size: '20px' },
    { top: '48%', left: '35%', rotate: '-30deg', size: '19px' },
    { top: '50%', left: '60%', rotate: '22deg', size: '21px' },
    { top: '52%', left: '28%', rotate: '-20deg', size: '20px' },
    { top: '54%', left: '72%', rotate: '25deg', size: '19px' },
    // Lower canopy (bloom stage - last 8)
    { top: '56%', left: '42%', rotate: '-18deg', size: '22px' },
    { top: '58%', left: '55%', rotate: '20deg', size: '21px' },
    { top: '60%', left: '33%', rotate: '-24deg', size: '23px' },
    { top: '62%', left: '65%', rotate: '22deg', size: '22px' },
    { top: '64%', left: '48%', rotate: '-20deg', size: '24px' },
    { top: '66%', left: '38%', rotate: '26deg', size: '23px' },
    { top: '68%', left: '58%', rotate: '-22deg', size: '25px' },
    { top: '70%', left: '50%', rotate: '24deg', size: '24px' }
  ];
  
  // Generate flower positions (appear from challenge 15+)
  const flowerPositions = [
    { top: '22%', left: '40%', size: '12px', color: '#ffb3d9' },
    { top: '28%', left: '58%', size: '14px', color: '#ff99cc' },
    { top: '35%', left: '35%', size: '13px', color: '#ffb3d9' },
    { top: '42%', left: '62%', size: '15px', color: '#ff99cc' },
    { top: '48%', left: '45%', size: '14px', color: '#ffb3d9' },
    { top: '54%', left: '55%', size: '16px', color: '#ff99cc' },
    { top: '60%', left: '38%', size: '15px', color: '#ffb3d9' },
    { top: '65%', left: '60%', size: '17px', color: '#ff99cc' }
  ];
  
  // Generate bud positions (appear from challenge 8+)
  const budPositions = [
    { top: '20%', left: '50%', size: '10px' },
    { top: '30%', left: '40%', size: '11px' },
    { top: '38%', left: '60%', size: '10px' },
    { top: '46%', left: '35%', size: '12px' },
    { top: '52%', left: '65%', size: '11px' },
    { top: '58%', left: '48%', size: '13px' }
  ];
  
  // Initialize leaves
  leafContainer.innerHTML = '';
  leafPositions.forEach((pos, index) => {
    const leaf = document.createElement('div');
    leaf.className = 'tree-leaf';
    leaf.style.cssText = `
      position: absolute;
      top: ${pos.top};
      left: ${pos.left};
      width: ${pos.size};
      height: ${parseInt(pos.size) + 4}px;
      background: linear-gradient(135deg, #a8e6a3 0%, #7bc87a 50%, #6ab86a 100%);
      border-radius: 50% 0 50% 0;
      transform: rotate(${pos.rotate}) scale(0);
      opacity: 0;
      transition: opacity 0.4s ease, transform 0.4s ease;
      box-shadow: 0 3px 8px rgba(123, 200, 122, 0.5);
      z-index: 2;
    `;
    leafContainer.appendChild(leaf);
  });
  
  // Initialize buds
  budsContainer.innerHTML = '';
  budPositions.forEach((pos) => {
    const bud = document.createElement('span');
    bud.className = 'tree-bud';
    bud.style.cssText = `
      position: absolute;
      top: ${pos.top};
      left: ${pos.left};
      width: ${pos.size};
      height: ${pos.size};
      border-radius: 50%;
      background: radial-gradient(circle, #e5f7ff, #a6dcef 75%, transparent 75%);
      box-shadow: 0 4px 10px rgba(166, 220, 239, 0.4);
      opacity: 0;
      transform: scale(0);
      transition: opacity 0.5s ease, transform 0.5s ease;
      z-index: 3;
    `;
    budsContainer.appendChild(bud);
  });
  
  // Initialize flowers
  flowersContainer.innerHTML = '';
  flowerPositions.forEach((pos) => {
    const flower = document.createElement('span');
    flower.className = 'tree-flower';
    flower.style.cssText = `
      position: absolute;
      top: ${pos.top};
      left: ${pos.left};
      width: ${pos.size};
      height: ${pos.size};
      border-radius: 50%;
      background: radial-gradient(circle, #ffe5f2, ${pos.color} 70%, #ff99cc 100%);
      box-shadow: 0 4px 12px rgba(255, 153, 204, 0.5);
      opacity: 0;
      transform: scale(0);
      transition: opacity 0.6s ease, transform 0.6s ease;
      z-index: 4;
    `;
    flowersContainer.appendChild(flower);
  });
}

function initializeTree() {
  const treeStage = document.getElementById("treeStage");
  if (!treeStage) return;
  
  const leafContainer = treeStage.querySelector('.tree-leaf-container');
  const budsContainer = treeStage.querySelector('.tree-buds');
  const flowersContainer = treeStage.querySelector('.tree-flowers');
  
  initializeTreeElements(leafContainer, budsContainer, flowersContainer);
}

function animateTreeGrowth(treeStage, completed, showCelebration = false) {
  const leaves = treeStage.querySelectorAll('.tree-leaf');
  const buds = treeStage.querySelectorAll('.tree-bud');
  const flowers = treeStage.querySelectorAll('.tree-flower');
  const totalLeaves = 28;
  // Start with 3 initial leaves for sapling, then add one per challenge
  const initialLeaves = 3;
  // Total leaves to show: 3 initial + completed challenges (max 28 total)
  const leavesToShow = Math.min(initialLeaves + completed, totalLeaves);
  
  // Animate leaves (3 initial + one per challenge)
  leaves.forEach((leaf, index) => {
    const currentTransform = leaf.style.transform || '';
    const rotateMatch = currentTransform.match(/rotate\([^)]+\)/);
    const rotate = rotateMatch ? rotateMatch[0] : '';
    
    if (index < leavesToShow) {
      const isInitialLeaf = index < initialLeaves;
      if (isInitialLeaf) {
        // Initial sapling leaves - show immediately
        leaf.style.opacity = '1';
        leaf.style.transform = `${rotate} scale(1)`.trim();
        if (completed > 0) {
          // Animate if not the first load
          leaf.style.animation = 'leafGrow 0.6s ease-out both';
        }
      } else {
        // Additional leaves from challenges - animate with delay
        const challengeIndex = index - initialLeaves;
        setTimeout(() => {
          leaf.style.opacity = '1';
          leaf.style.transform = `${rotate} scale(1)`.trim();
          leaf.style.animation = 'leafGrow 0.6s ease-out both';
        }, challengeIndex * 50);
      }
    } else {
      // Hide leaves beyond what should be shown
      if (index >= initialLeaves) {
        leaf.style.opacity = '0';
        leaf.style.transform = `${rotate} scale(0)`.trim();
        leaf.style.animation = 'none';
      }
    }
  });
  
  // Show buds starting from challenge 8
  const budsToShow = Math.max(0, Math.min(buds.length, Math.floor((completed - 7) / 2)));
  buds.forEach((bud, index) => {
    if (index < budsToShow && completed >= 8) {
      setTimeout(() => {
        bud.style.opacity = '1';
        bud.style.transform = 'scale(1)';
        bud.style.animation = 'budBloom 0.8s ease-out both';
      }, (index + 8) * 60);
    } else {
      bud.style.opacity = '0';
      bud.style.transform = 'scale(0)';
    }
  });
  
  // Show flowers starting from challenge 15
  const flowersToShow = Math.max(0, Math.min(flowers.length, Math.floor((completed - 14) / 2)));
  flowers.forEach((flower, index) => {
    if (index < flowersToShow && completed >= 15) {
      setTimeout(() => {
        flower.style.opacity = '1';
        flower.style.transform = 'scale(1)';
        flower.style.animation = 'flowerBloom 1s ease-out both';
      }, (index + 15) * 70);
    } else {
      flower.style.opacity = '0';
      flower.style.transform = 'scale(0)';
    }
  });
  
  // Show celebration animation if requested
  if (showCelebration) {
    showTreeCelebration(treeStage, completed);
  }
}

function showTreeCelebration(treeStage, completed) {
  // Create leaf shower effect
  createLeafShower();
  
  // Calculate percentage for stage
  const percent = Math.round((completed / 28) * 100);
  const stage = deriveTreeStage(percent, completed);
  
  // Show celebration overlay with tree growth animation
  const overlay = document.createElement('div');
  overlay.className = 'celebration-overlay';
  overlay.innerHTML = `
    <div class="celebration-content">
      <div class="celebration-tree-container">
        <div class="tree-stage celebration-tree" data-stage="${stage}">
          <div class="tree-visual">
            <div class="tree-trunk"></div>
            <div class="tree-leaves"></div>
            <div class="tree-leaf-container"></div>
            <div class="tree-buds"></div>
            <div class="tree-flowers"></div>
            <div class="tree-pot"></div>
          </div>
        </div>
      </div>
      <h2 class="celebration-title">🌱 Your Tree is Growing! 🌱</h2>
      <p class="celebration-message">Amazing progress! Keep nurturing your recovery journey.</p>
      <div class="celebration-progress">
        <span>${completed} of 28 challenges completed</span>
      </div>
    </div>
  `;
  
  document.body.appendChild(overlay);
  
  // Initialize and animate the celebration tree
  setTimeout(() => {
    const celebrationTree = overlay.querySelector('.celebration-tree');
    if (celebrationTree) {
      // Initialize tree elements for celebration
      const leafContainer = celebrationTree.querySelector('.tree-leaf-container');
      const budsContainer = celebrationTree.querySelector('.tree-buds');
      const flowersContainer = celebrationTree.querySelector('.tree-flowers');
      
      if (leafContainer && budsContainer && flowersContainer) {
        // Use the same initialization logic but for celebration tree
        initializeTreeElements(leafContainer, budsContainer, flowersContainer);
        animateTreeGrowth(celebrationTree, completed, false);
      }
    }
  }, 100);
  
  // Remove overlay after ~4 seconds (within requested 3-5 second window)
  setTimeout(() => {
    overlay.style.opacity = '0';
    overlay.style.transform = 'scale(0.95)';
    setTimeout(() => {
      if (document.body.contains(overlay)) {
        document.body.removeChild(overlay);
      }
    }, 500);
  }, 4000);
}

function createLeafShower() {
  const showerContainer = document.createElement('div');
  showerContainer.className = 'leaf-shower-container';
  document.body.appendChild(showerContainer);
  
  // Create 30-40 falling leaves
  for (let i = 0; i < 35; i++) {
    const leaf = document.createElement('div');
    leaf.className = 'shower-leaf';
    leaf.style.cssText = `
      position: fixed;
      top: -20px;
      left: ${Math.random() * 100}%;
      width: ${12 + Math.random() * 8}px;
      height: ${16 + Math.random() * 8}px;
      background: linear-gradient(135deg, #a8e6a3, #7bc87a);
      border-radius: 50% 0 50% 0;
      transform: rotate(${Math.random() * 360}deg);
      opacity: ${0.6 + Math.random() * 0.4};
      animation: leafFall ${3 + Math.random() * 2}s linear forwards;
      z-index: 9999;
      pointer-events: none;
    `;
    showerContainer.appendChild(leaf);
  }
  
  // Remove shower after animation
  setTimeout(() => {
    showerContainer.remove();
  }, 5000);
}

function deriveTreeStage(percent, completed) {
  // Always start as sapling, even at 0%
  if (completed === 0) return "sapling";
  if (percent < 35) return "sapling";
  if (percent < 75) return "grown";
  return "bloom";
}

function setYearFooter() {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

function sanitize(value) {
  const div = document.createElement("div");
  div.textContent = value;
  return div.innerHTML;
}

// Utility exposed for other pages when needed
window.BloomApp = {
  updateProgressUI,
  calculateProgress,
  getUserProgressKey,
  showTreeCelebration,
  createLeafShower
};

