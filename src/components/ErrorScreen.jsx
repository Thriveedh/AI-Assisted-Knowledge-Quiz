import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

export const ErrorScreen = ({ error, onRetry, onBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="mb-6">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto" />
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Something went wrong
          </h2>

          <p className="text-gray-600 mb-8">
            {error}
          </p>

          <div className="flex flex-col gap-3">
            <button
              onClick={onRetry}
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-all"
            >
              <RefreshCw className="w-5 h-5" />
              <span>Try Again</span>
            </button>

            <button
              onClick={onBack}
              className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-all"
            >
              Back to Topics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};