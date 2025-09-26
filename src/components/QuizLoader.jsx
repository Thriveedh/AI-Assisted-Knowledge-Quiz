import React from 'react';
import { Loader2, Brain } from 'lucide-react';

export const QuizLoader = ({ topic }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="mb-8">
          <div className="relative">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mb-6 animate-pulse">
              <Brain className="w-10 h-10 text-white" />
            </div>
            <Loader2 className="w-8 h-8 text-indigo-500 animate-spin absolute -bottom-2 -right-2" />
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Generating Your Quiz
        </h2>
        <p className="text-xl text-gray-600 mb-2">
          AI is creating personalized questions about
        </p>
        <p className="text-2xl font-semibold text-indigo-600 capitalize mb-8">
          {topic}
        </p>
        
        <div className="flex items-center justify-center space-x-2 text-gray-500">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};