# Bloom Recovery - Master Prompt & Application Vision

## Application Overview
**Bloom Recovery** is a compassionate, user-centered mobile addiction recovery web application designed to help individuals overcome excessive smartphone and social media usage through personalized assessment, structured weekly challenges, and visual progress tracking via an animated tree growth system.

## Core Mission
Empower mobile users to reclaim their focus, improve mental well-being, and build healthier digital habits through science-backed routines, gentle accountability, and positive reinforcement.

## Key Features

### 1. User Authentication & Personalization
- **Individual User Accounts**: Each user has a unique profile with isolated progress tracking
- **JSON-Based Storage**: User data stored in browser localStorage with JSON format for easy export/import
- **Personalized Journey**: Every user starts with a fresh recovery tree and challenge set

### 2. Comprehensive Addiction Assessment Quiz
- **9-Question Assessment**: Evaluates usage patterns, emotional responses, and behavioral indicators
- **Categorization System**:
  - **No Addiction** (0-2 points): Healthy usage patterns, minimal impact
  - **Slightly Addicted** (3-5 points): Occasional overuse, mild dependency signs
  - **Moderately Addicted** (6-8 points): Regular overuse, noticeable impact on daily life
  - **Highly Addicted** (9-12 points): Severe dependency, significant life disruption
  - **Critically Addicted** (13+ points): Extreme dependency requiring professional support
- **Scoring Algorithm**: Weighted scoring based on:
  - Duration of usage
  - Emotional responses when unable to access
  - Impact on sleep, relationships, focus
  - Daily screen time hours
  - Bedtime/morning phone checking habits
  - Previous reduction attempts

### 3. Weekly Challenge System
- **4-Week Progressive Program**: Structured recovery journey
- **28 Total Challenges**: 7 challenges per week
- **Week-by-Week Progression**:
  - Week 1: Foundation building (awareness, basic limits)
  - Week 2: Habit replacement (offline activities, mindfulness)
  - Week 3: Digital detox practices (deeper breaks, connection)
  - Week 4: Integration & celebration (long-term sustainability)
- **User-Specific Tracking**: Each user's progress stored separately

### 4. Animated Tree Growth Visualization
- **Live Tree Companion**: Visual representation of recovery progress
- **28 Individual Leaves**: One leaf grows per completed challenge
- **Growth Stages**:
  - **Seed** (0%): Starting point, minimal growth
  - **Sapling** (1-34%): Early growth, 1-10 leaves
  - **Grown** (35-74%): Healthy growth, 11-20 leaves
  - **Bloom** (75-100%): Full recovery, 21-28 leaves with flowers
- **Animated Transitions**: Smooth CSS animations for leaf growth
- **Motivational Feedback**: Real-time visual rewards for progress

### 5. User Interface Design
- **Pastel Color Palette**: Soft, calming colors (blues, pinks, greens)
- **Responsive Layout**: Works on desktop and mobile devices
- **Sidebar Navigation**: Home page includes sidebar for quick access to:
  - Mission
  - About Us
  - Contact
  - Settings
  - Growth Chart
- **Consistent Navbar**: All pages feature app icon, name, and login/signup
- **Home Page Navigation**: Available from all pages

### 6. Loading Experience
- **Pre-Homepage Splash Screen**: Engaging GIF/animation before main content
- **Thematic Content**: Mobile recovery imagery (person putting phone away, nature scenes)
- **Smooth Transition**: Fade-in to homepage after loading

## Technical Architecture

### Frontend Stack
- **HTML5**: Semantic structure
- **CSS3**: Modern styling with CSS variables, animations, gradients
- **Vanilla JavaScript**: No framework dependencies, localStorage for data persistence

### Data Structure
```json
{
  "users": [
    {
      "name": "User Name",
      "age": "25",
      "gender": "Male/Female/Other",
      "username": "unique_username",
      "answers": ["quiz responses"],
      "addictionLevel": "Slightly Addicted",
      "score": 4
    }
  ],
  "recoveryProgress_username": {
    "1": [
      { "completed": true },
      { "completed": false }
    ]
  }
}
```

### Key Functions
- `getUserProgressKey()`: Returns user-specific storage key
- `calculateProgress()`: Computes completion percentage
- `deriveTreeStage()`: Determines tree growth stage
- `animateTreeGrowth()`: Triggers leaf animations
- `initializeTree()`: Creates 28 leaf elements

## User Journey Flow

1. **Landing/Home Page** → Loading screen → Main dashboard
2. **Sign Up** → Create account → User data saved to JSON
3. **Login** → Access personalized dashboard
4. **Quiz** → Complete assessment → Receive addiction category
5. **Recovery Plan** → View weekly challenges → Track progress
6. **Progress Visualization** → Watch tree grow → Stay motivated

## Design Principles

### Compassionate Approach
- Non-judgmental language
- Positive reinforcement
- Gentle encouragement
- Celebrating small wins

### Visual Motivation
- Pastel, calming aesthetics
- Animated tree growth
- Progress bars and percentages
- Success imagery

### User Empowerment
- Self-paced challenges
- Personal progress tracking
- Individualized recommendations
- Privacy-focused (localStorage)

## Future Enhancements (Potential)
- Community features (anonymous sharing)
- Reminder notifications
- Export progress reports
- Integration with screen time APIs
- Professional support resources
- Multi-language support
- Mobile app version

## Success Metrics
- User engagement with weekly challenges
- Completion rates across 4-week program
- Return visits and continued usage
- User-reported improvement in digital habits

---

**Version**: 1.0  
**Last Updated**: 2024  
**Maintained By**: Bloom Recovery Team

