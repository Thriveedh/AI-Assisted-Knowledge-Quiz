// @ts-check

/**
 * @typedef {Object} Question
 * @property {number} id
 * @property {string} question
 * @property {string[]} options
 * @property {number} correctAnswer
 * @property {number} [userAnswer]
 */

/**
 * @typedef {Object} QuizState
 * @property {string} topic
 * @property {Question[]} questions
 * @property {number} currentQuestionIndex
 * @property {number} score
 * @property {boolean} isCompleted
 * @property {string} [feedback]
 */

/**
 * @typedef {'topic-selection' | 'loading' | 'quiz' | 'results'} QuizScreen
 */

/**
 * @typedef {Object} Topic
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {string} icon
 */

export {};