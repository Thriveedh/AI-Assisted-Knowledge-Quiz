# AI-Assisted Knowledge Quiz

A dynamic quiz application powered by OpenAI that generates fresh, unique questions for every quiz session. Built with React, TypeScript, and Tailwind CSS.

## 1. Project Setup & Demo

### Web Setup
```bash
# Install dependencies
npm install

# Set up environment variables
# Copy .env file and add your OpenAI API key
VITE_OPENAI_API_KEY=your_openai_api_key_here

# Start development server
npm run dev
```

### Live Demo
The application will be available at `http://localhost:5173` after running the development server.

**Demo Features:**
- Interactive topic selection (Wellness, Technology, Science, History)
- AI-generated questions that are unique every time and fallback questions if ai doesn't work
- Real-time progress tracking
- Personalized AI feedback based on performance
- Responsive design for all screen sizes

## 2. Problem Understanding

### Core Problem
Traditional quiz applications use static, pre-written questions that become repetitive and predictable over time. Users quickly memorize answers rather than truly learning, reducing the educational value.

### Solution Approach
This application leverages OpenAI's GPT-3.5-turbo model to generate fresh, unique questions for each quiz session, ensuring:
- **Dynamic Content**: Every quiz experience is different
- **Educational Value**: Questions are crafted to be challenging and informative
- **Personalized Feedback**: AI analyzes performance and provides tailored insights
- **Scalable Topics**: Easy to add new subject areas without manual question creation

### Assumptions Made
- Users have internet connectivity for AI API calls
- OpenAI API key is available and has sufficient credits
- Users prefer variety over consistency in question difficulty
- 5 questions per quiz provide adequate assessment without fatigue
- Multiple-choice format is suitable for all topic areas

## 3. AI Prompts & Iterations

### Initial Prompt Strategy
**First Attempt:**
```
Generate 5 quiz questions about [topic]
```

**Issues Faced:**
- Inconsistent response format
- Questions too easy or too difficult
- Poor JSON structure
- Repetitive question types

### Refined Prompt (Current Implementation)
```javascript
const prompt = `Generate 5 unique, challenging multiple-choice questions about ${topic}. 
Each question should have 4 options (A, B, C, D) with only one correct answer.
Make the questions educational, engaging, and at an intermediate difficulty level.
Vary the question types and cover different aspects of ${topic}.

Return the response in this exact JSON format:
[
  {
    "id": 1,
    "question": "Question text here?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": 0
  }
]

Make sure correctAnswer is the index (0-3) of the correct option.
Generate completely new and different questions each time - avoid repetition.`;
```

### Feedback Generation Prompt
```javascript
const prompt = `A student just completed a ${topic} quiz and scored ${score} out of ${total} questions (${percentage.toFixed(1)}%).

Provide personalized, encouraging feedback that:
1. Acknowledges their performance level
2. Gives specific insights about their ${topic} knowledge
3. Offers constructive suggestions for improvement if needed
4. Maintains a positive, motivational tone
5. Is about 2-3 sentences long

Make the feedback feel personal and specific to ${topic}, not generic.`;
```

### Key Improvements Made
- **Structured System Messages**: Better AI behavior guidance
- **Validation Logic**: Ensures proper response format
- **Error Handling**: Graceful fallbacks when AI fails
- **Topic-Specific Context**: Tailored prompts for each subject area

## 4. Architecture & Code Structure

### Component Hierarchy
```
App.jsx (Main navigation & state management)
├── TopicSelection.jsx (Landing page with topic cards)
├── Quiz.jsx (Main quiz interface)
│   ├── QuestionCard.jsx (Individual question display)
│   └── LoadingSpinner.jsx (Loading states)
└── Results.jsx (Score display & AI feedback)
```

### Key Files & Responsibilities

#### `src/App.jsx`
- **Purpose**: Main application component managing global state and navigation
- **State Management**: Controls current screen (topic-selection, quiz, results)
- **Navigation**: Handles transitions between different app states
- **Data Flow**: Passes quiz results and topic selections between components

#### `src/aiService.js`
- **Purpose**: Centralized AI integration layer
- **OpenAI Integration**: Handles API calls to GPT-3.5-turbo
- **Question Generation**: Processes AI responses and validates format
- **Feedback Generation**: Creates personalized performance feedback
- **Error Handling**: Provides fallback questions when AI fails
- **Rate Limiting**: Manages API call frequency and costs

#### `src/components/Quiz.jsx`
- **Purpose**: Main quiz interface managing question flow
- **State Management**: Tracks current question, answers, and score
- **Progress Tracking**: Visual progress bar and question counter
- **Answer Validation**: Handles user selections and scoring
- **Loading States**: Shows spinners during AI question generation

#### `src/components/TopicSelection.jsx`
- **Purpose**: Landing page with interactive topic cards
- **Visual Design**: Gradient cards with hover animations
- **Topic Management**: Handles topic selection and routing
- **Responsive Layout**: Grid system adapting to screen sizes

#### `src/components/Results.jsx`
- **Purpose**: Displays quiz results and AI-generated feedback
- **Performance Analysis**: Shows score, percentage, and visual indicators
- **AI Feedback**: Requests and displays personalized insights
- **Navigation**: Provides retry and topic selection options

#### `src/types.js`
- **Purpose**: TypeScript type definitions for type safety
- **Interfaces**: Question, QuizState, QuizTopic types
- **Data Validation**: Ensures consistent data structures

### State Management Strategy
- **Local Component State**: Used for UI-specific state (loading, selections)
- **Prop Drilling**: Simple parent-to-child data flow for small app size
- **Event Callbacks**: Child components communicate with parent via callbacks
- **No External State Library**: React's built-in state management sufficient for current scope

### API Integration Pattern
```javascript
// Centralized service pattern
class AIService {
  async generateQuestions(topic) {
    // OpenAI API call with error handling
  }
  
  async generateFeedback(score, total, topic) {
    // Personalized feedback generation
  }
  
  getFallbackQuestions(topic) {
    // Backup questions for offline/error scenarios
  }
}
```

## 5. Screenshots

### Topic Selection Screen
![Topic Selection](https://via.placeholder.com/800x600/4F46E5/FFFFFF?text=Topic+Selection+Screen)
*Interactive cards for Wellness, Technology, Science, and History topics*

### Quiz Interface
![Quiz Interface](https://via.placeholder.com/800x600/059669/FFFFFF?text=Quiz+Interface)
*Clean question display with progress tracking and multiple choice options*

### Results Screen
![Results Screen](https://via.placeholder.com/800x600/DC2626/FFFFFF?text=Results+Screen)
*Score display with AI-generated personalized feedback*

### Loading States
![Loading State](https://via.placeholder.com/800x600/6B7280/FFFFFF?text=Loading+Spinner)
*Elegant loading animations during AI question generation*

## 6. Known Issues / Improvements

### Current Limitations

#### API Dependency
- **Issue**: Requires internet connection and OpenAI API availability
- **Impact**: App fails without connectivity or API issues
- **Improvement**: Implement better offline caching and local question banks

#### Cost Management
- **Issue**: Each quiz session costs API credits
- **Impact**: Potential unexpected costs with high usage
- **Improvement**: Add usage tracking, rate limiting, and cost alerts

#### Question Quality Consistency
- **Issue**: AI sometimes generates questions with varying difficulty
- **Impact**: Inconsistent user experience across quiz sessions
- **Improvement**: Implement difficulty scoring and question validation

#### Limited Error Recovery
- **Issue**: Basic error handling with simple retry mechanism
- **Impact**: Poor UX when API fails repeatedly
- **Improvement**: Progressive fallback system with cached questions

### Planned Improvements

#### Performance Optimizations
- **Caching**: Store recent questions to reduce API calls
- **Preloading**: Generate next question while user answers current one
- **Batch Processing**: Request multiple question sets in single API call

#### Enhanced User Experience
- **Question History**: Track previously asked questions to avoid repetition
- **Difficulty Adaptation**: Adjust question difficulty based on user performance
- **Topic Mixing**: Allow users to select multiple topics for mixed quizzes
- **Time Limits**: Add optional timer for competitive quiz experience

#### Analytics & Insights
- **Performance Tracking**: Store user scores and improvement over time
- **Topic Analysis**: Show strengths and weaknesses across different subjects
- **Learning Recommendations**: Suggest study materials based on quiz results

#### Technical Improvements
- **Backend Integration**: Move API calls to secure backend service
- **Database Storage**: Persist user progress and quiz history
- **Authentication**: User accounts for personalized experience
- **Mobile App**: React Native version for mobile platforms

## 7. Bonus Work

### Visual Polish
- **Gradient Backgrounds**: Beautiful color transitions for modern aesthetic
- **Micro-interactions**: Hover effects, button animations, and smooth transitions
- **Loading Animations**: Custom spinning indicators with contextual messages
- **Progress Visualization**: Animated progress bars and completion indicators

### User Experience Enhancements
- **Responsive Design**: Optimized layouts for mobile, tablet, and desktop
- **Accessibility**: Proper ARIA labels and keyboard navigation support
- **Error Boundaries**: Graceful error handling with user-friendly messages
- **Performance Optimization**: Lazy loading and efficient re-renders

### Advanced Features
- **Dynamic Feedback**: AI-powered personalized insights based on performance patterns
- **Topic Customization**: Extensible system for adding new quiz categories
- **Fallback System**: Robust offline functionality with pre-cached questions
- **Analytics Integration**: Performance tracking and improvement suggestions

### Code Quality
- **TypeScript Integration**: Full type safety throughout the application
- **Component Architecture**: Modular, reusable components with clear responsibilities
- **Error Handling**: Comprehensive error boundaries and user feedback
- **Documentation**: Inline comments and clear function documentation

### Future Roadmap
- **Multi-language Support**: Internationalization for global users
- **Social Features**: Share results and compete with friends
- **Adaptive Learning**: AI-powered difficulty adjustment based on performance
- **Offline Mode**: Full functionality without internet connection
- **Voice Integration**: Audio questions and voice-controlled answers

---

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up your OpenAI API key in `.env`
4. Start the development server: `npm run dev`
5. Open `http://localhost:5173` and start learning!

## Contributing

Feel free to submit issues and enhancement requests. This project is designed to be educational and welcomes contributions from the community.

## License

This project is open source and available under the [MIT License](LICENSE).
