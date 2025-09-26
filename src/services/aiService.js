import OpenAI from "openai";

// Create OpenAI client (browser-only for dev/testing)
const client = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

class AIService {
  async simulateDelay(ms = 2000) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // ---- FALLBACK MOCK QUESTIONS ----
  getFallbackQuestions(topic) {
    const questionSets = {
      wellness: [
        { id: 1, question: "Which of the following is considered a key component of mental wellness?", options: ["Regular exercise", "Mindfulness practice", "Social connections", "All of the above"], correctAnswer: 3 },
        { id: 2, question: "What is the recommended amount of sleep for adults per night?", options: ["5-6 hours", "7-9 hours", "10-12 hours", "4-5 hours"], correctAnswer: 1 },
        { id: 3, question: "Which nutrient is most important for bone health?", options: ["Vitamin C", "Calcium", "Iron", "Vitamin B12"], correctAnswer: 1 },
        { id: 4, question: "What is the best way to manage stress effectively?", options: ["Ignore it completely", "Use multiple coping strategies", "Work longer hours", "Avoid all challenges"], correctAnswer: 1 },
        { id: 5, question: "How much water should an average adult drink daily?", options: ["1-2 glasses", "3-4 glasses", "8-10 glasses", "15+ glasses"], correctAnswer: 2 }
      ],
      tech: [
        { id: 1, question: "Which technology is expected to revolutionize healthcare in the next decade?", options: ["Blockchain", "AI and Machine Learning", "Virtual Reality", "3D Printing"], correctAnswer: 1 },
        { id: 2, question: "What does 'Edge Computing' refer to?", options: ["Computing at network edges", "Cutting-edge technology", "Computer hardware edges", "Software development methodology"], correctAnswer: 0 },
        { id: 3, question: "Which programming language is gaining popularity for AI development?", options: ["COBOL", "Python", "Assembly", "Pascal"], correctAnswer: 1 },
        { id: 4, question: "What is the main benefit of 5G technology?", options: ["Better battery life", "Lower costs", "Faster data speeds and lower latency", "Smaller devices"], correctAnswer: 2 },
        { id: 5, question: "Which company is leading in quantum computing development?", options: ["IBM", "Google", "Microsoft", "All of the above"], correctAnswer: 3 }
      ],
      science: [
        { id: 1, question: "What is the speed of light in a vacuum?", options: ["300,000 km/s", "299,792,458 m/s", "186,000 miles/hour", "300,000,000 m/s"], correctAnswer: 1 },
        { id: 2, question: "Which element has the atomic number 1?", options: ["Helium", "Hydrogen", "Lithium", "Carbon"], correctAnswer: 2 },
        { id: 3, question: "What is the largest planet in our solar system?", options: ["Saturn", "Neptune", "Jupiter", "Uranus"], correctAnswer: 2 },
        { id: 4, question: "What is the process by which plants make their own food?", options: ["Respiration", "Photosynthesis", "Digestion", "Fermentation"], correctAnswer: 2 },
        { id: 5, question: "Which scientist developed the theory of relativity?", options: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Stephen Hawking"], correctAnswer: 1 }
      ],
      history: [
        { id: 1, question: "In which year did World War II end?", options: ["1944", "1945", "1946", "1947"], correctAnswer: 2 },
        { id: 2, question: "Who was the first person to walk on the moon?", options: ["Buzz Aldrin", "Neil Armstrong", "John Glenn", "Alan Shepard"], correctAnswer: 2 },
        { id: 3, question: "Which ancient wonder of the world was located in Alexandria?", options: ["Hanging Gardens", "Colossus of Rhodes", "Lighthouse of Alexandria", "Temple of Artemis"], correctAnswer: 3 },
        { id: 4, question: "The Renaissance period originated in which country?", options: ["France", "Germany", "Italy", "Spain"], correctAnswer: 2 },
        { id: 5, question: "Who wrote the Declaration of Independence?", options: ["George Washington", "Benjamin Franklin", "Thomas Jefferson", "John Adams"], correctAnswer: 2 }
      ]
    };

    return questionSets[topic.toLowerCase()] || questionSets.wellness;
  }

  // ---- AI-POWERED QUESTION GENERATION (wait first, fallback if fails) ----
  async generateQuestions(topic) {
    try {
      const prompt = `
        Generate 5 multiple-choice quiz questions on the topic: "${topic}".
        Each question should be JSON with:
        - id (1–5),
        - question (string),
        - options (array of 4 strings),
        - correctAnswer (index of the correct option, 0-based).
        Return ONLY valid JSON.
      `;

      const response = await client.responses.create({
        model: "gpt-4.1-mini",
        input: prompt,
        temperature: 0.7
      });

      const output = response.output[0].content[0].text;
      const questions = JSON.parse(output);

      // Validate structure
      if (!Array.isArray(questions) || questions.length !== 5) throw new Error("Invalid AI response");

      return questions;

    } catch (error) {
      console.warn("AI failed, returning fallback questions:", error);
      return this.getFallbackQuestions(topic);
    }
  }

  // ---- INSTANT FEEDBACK ----
  generateFeedback(score, total, topic) {
    const percentage = (score / total) * 100;

    if (percentage >= 90)
      return `Outstanding performance! You scored ${score}/${total} on ${topic}.`;
    if (percentage >= 70)
      return `Great job! You scored ${score}/${total} on ${topic}.`;
    if (percentage >= 50)
      return `Good effort! You scored ${score}/${total} on ${topic}.`;
    return `You scored ${score}/${total} on ${topic}. Keep practicing and you’ll improve quickly!`;
  }
}

export const aiService = new AIService();
