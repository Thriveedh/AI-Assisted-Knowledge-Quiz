import React from 'react';
import { BookOpen, Heart, Cpu, FlaskConical } from 'lucide-react';

const topics = [
  {
    id: 'wellness',
    name: 'Wellness & Health',
    description: 'Test your knowledge about mental and physical health',
    icon: 'heart'
  },
  {
    id: 'tech',
    name: 'Tech Trends',
    description: 'Explore the latest in technology and innovation',
    icon: 'cpu'
  },
  {
    id: 'science',
    name: 'Science',
    description: 'Discover fascinating facts about the natural world',
    icon: 'flask'
  },
  {
    id: 'history',
    name: 'History',
    description: 'Journey through significant historical events',
    icon: 'book'
  }
];

const getIcon = (iconName) => {
  switch (iconName) {
    case 'heart':
      return <Heart className="w-8 h-8" />;
    case 'cpu':
      return <Cpu className="w-8 h-8" />;
    case 'flask':
      return <FlaskConical className="w-8 h-8" />;
    case 'book':
      return <BookOpen className="w-8 h-8" />;
    default:
      return <BookOpen className="w-8 h-8" />;
  }
};

export const TopicSelection = ({ onSelectTopic }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            AI-Powered Quiz
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose a topic and challenge yourself with AI-generated questions tailored to test your knowledge
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {topics.map((topic) => (
            <button
              key={topic.id}
              onClick={() => onSelectTopic(topic.id)}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 hover:border-indigo-200"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-4 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full group-hover:from-indigo-200 group-hover:to-purple-200 transition-all duration-300">
                  {getIcon(topic.icon)}
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">
                  {topic.name}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {topic.description}
                </p>
                <div className="text-indigo-600 font-medium group-hover:text-indigo-700 transition-colors">
                  Start Quiz →
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};