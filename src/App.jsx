import React, { useState } from 'react';
import { TopicSelection } from './components/TopicSelection';
import { QuizLoader } from './components/QuizLoader';
import { QuizQuestion } from './components/QuizQuestion';
import { Results } from './components/Results';
import { ErrorScreen } from './components/ErrorScreen';
import { aiService } from './services/aiService';

function App() {
  const [currentScreen, setCurrentScreen] = useState('topic-selection');
  const [quizState, setQuizState] = useState({
    topic: '',
    questions: [],
    currentQuestionIndex: 0,
    score: 0,
    isCompleted: false
  });
  const [isLoadingFeedback, setIsLoadingFeedback] = useState(false);
  const [error, setError] = useState(null);

  const handleTopicSelection = async (topic) => {
    setCurrentScreen('loading');
    setError(null);
    setQuizState(prev => ({ ...prev, topic }));

    try {
      const questions = await aiService.generateQuestions(topic);
      setQuizState(prev => ({ ...prev, questions }));
      setCurrentScreen('quiz');
    } catch (err) {
      setError('Failed to generate questions. Please try again.');
      setCurrentScreen('topic-selection');
    }
  };

  const handleAnswer = (answerIndex) => {
    const currentQuestion = quizState.questions[quizState.currentQuestionIndex];
    const updatedQuestions = [...quizState.questions];
    updatedQuestions[quizState.currentQuestionIndex] = {
      ...currentQuestion,
      userAnswer: answerIndex
    };

    setQuizState(prev => ({ ...prev, questions: updatedQuestions }));
  };

  const handleNext = async () => {
    const nextIndex = quizState.currentQuestionIndex + 1;
    
    if (nextIndex >= quizState.questions.length) {
      // Quiz completed
      const score = quizState.questions.reduce((acc, question) => {
        return acc + (question.userAnswer === question.correctAnswer ? 1 : 0);
      }, 0);

      setQuizState(prev => ({ 
        ...prev, 
        score, 
        isCompleted: true 
      }));

      setIsLoadingFeedback(true);

      try {
        const feedback = await aiService.generateFeedback(score, quizState.questions.length, quizState.topic);
        setQuizState(prev => ({ ...prev, feedback }));
        setCurrentScreen('results');
      } catch (err) {
        // Fallback feedback if AI fails
        const percentage = (score / quizState.questions.length) * 100;
        let fallbackFeedback = `You completed the quiz with a score of ${score}/${quizState.questions.length} (${Math.round(percentage)}%).`;
        
        if (percentage >= 80) {
          fallbackFeedback += " Excellent work!";
        } else if (percentage >= 60) {
          fallbackFeedback += " Good job!";
        } else {
          fallbackFeedback += " Keep practicing to improve your score.";
        }

        setQuizState(prev => ({ ...prev, feedback: fallbackFeedback }));
        setCurrentScreen('results');
      } finally {
        setIsLoadingFeedback(false);
      }
    } else {
      setQuizState(prev => ({ ...prev, currentQuestionIndex: nextIndex }));
    }
  };

  const handlePrevious = () => {
    const prevIndex = quizState.currentQuestionIndex - 1;
    if (prevIndex >= 0) {
      setQuizState(prev => ({ ...prev, currentQuestionIndex: prevIndex }));
    }
  };

  const handleRestart = () => {
    const resetQuestions = quizState.questions.map(q => ({ ...q, userAnswer: undefined }));
    setQuizState(prev => ({
      ...prev,
      questions: resetQuestions,
      currentQuestionIndex: 0,
      score: 0,
      isCompleted: false,
      feedback: undefined
    }));
    setCurrentScreen('quiz');
  };

  const handleNewTopic = () => {
    setQuizState({
      topic: '',
      questions: [],
      currentQuestionIndex: 0,
      score: 0,
      isCompleted: false
    });
    setCurrentScreen('topic-selection');
    setError(null);
  };

  const handleRetry = () => {
    if (quizState.topic) {
      handleTopicSelection(quizState.topic);
    } else {
      handleNewTopic();
    }
  };

  if (error) {
    return <ErrorScreen error={error} onRetry={handleRetry} onBack={handleNewTopic} />;
  }

  if (isLoadingFeedback) {
    return <QuizLoader topic="Generating your personalized feedback" />;
  }

  switch (currentScreen) {
    case 'topic-selection':
      return <TopicSelection onSelectTopic={handleTopicSelection} />;
    
    case 'loading':
      return <QuizLoader topic={quizState.topic} />;
    
    case 'quiz':
      const currentQuestion = quizState.questions[quizState.currentQuestionIndex];
      const hasAnswered = currentQuestion?.userAnswer !== undefined;
      const canGoNext = hasAnswered;
      const canGoPrevious = quizState.currentQuestionIndex > 0;

      return (
        <QuizQuestion
          question={currentQuestion}
          questionNumber={quizState.currentQuestionIndex + 1}
          totalQuestions={quizState.questions.length}
          onAnswer={handleAnswer}
          onNext={handleNext}
          onPrevious={handlePrevious}
          canGoNext={canGoNext}
          canGoPrevious={canGoPrevious}
        />
      );
    
    case 'results':
      return (
        <Results
          score={quizState.score}
          total={quizState.questions.length}
          topic={quizState.topic}
          feedback={quizState.feedback || 'Great job completing the quiz!'}
          onRestart={handleRestart}
          onNewTopic={handleNewTopic}
        />
      );
    
    default:
      return <TopicSelection onSelectTopic={handleTopicSelection} />;
  }
}

export default App;