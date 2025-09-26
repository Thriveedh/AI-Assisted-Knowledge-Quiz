import React from 'react';
import { Trophy, RefreshCw, Home, Star } from 'lucide-react';

export const Results = ({
  score,
  total,
  topic,
  feedback,
  onRestart,
  onNewTopic
}) => {
  const percentage = Math.round((score / total) * 100);
  
  const getScoreColor = () => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreIcon = () => {
    if (percentage >= 80) {
      return <Trophy className="w-12 h-12 text-yellow-500" />;
    }
    return <Star className="w-12 h-12 text-indigo-500" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="mb-8">
            {getScoreIcon()}
          </div>

          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Quiz Complete!
          </h1>

          <div className="mb-8">
            <div className={`text-6xl font-bold mb-2 ${getScoreColor()}`}>
              {score}/{total}
            </div>
            <div className={`text-2xl font-semibold ${getScoreColor()}`}>
              {percentage}% Score
            </div>
            <p className="text-gray-600 mt-2 capitalize">
              Topic: {topic}
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Personalized Feedback
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {feedback}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onRestart}
              className="flex items-center justify-center space-x-2 px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-all transform hover:scale-105"
            >
              <RefreshCw className="w-5 h-5" />
              <span>Retake Quiz</span>
            </button>
            
            <button
              onClick={onNewTopic}
              className="flex items-center justify-center space-x-2 px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-all transform hover:scale-105"
            >
              <Home className="w-5 h-5" />
              <span>New Topic</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};