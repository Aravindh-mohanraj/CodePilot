export interface InterviewQuestion {
  id: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  timeLimit: number;
  description: string;
  constraints: string[];
  exampleInput: string;
  exampleOutput: string;
}

export interface InterviewSession {
  id: string;
  company: string;
  totalQuestions: number;
  timeLimit: number;
  questions: InterviewQuestion[];
}

export interface InterviewResult {
  score: number;
  questionsAttempted: number;
  questionsCorrect: number;
  totalTime: string;
  feedback: string;
  strengths: string[];
  improvements: string[];
}

export function createMockInterview(company: string): InterviewSession {
  const questions: InterviewQuestion[] = [
    {
      id: 1,
      title: 'Two Sum',
      difficulty: 'Easy',
      category: 'Arrays & Hashing',
      timeLimit: 15,
      description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.',
      constraints: ['2 <= nums.length <= 10^4', '-10^9 <= nums[i] <= 10^9', '-10^9 <= target <= 10^9'],
      exampleInput: 'nums = [2,7,11,15], target = 9',
      exampleOutput: '[0,1]',
    },
    {
      id: 2,
      title: 'LRU Cache',
      difficulty: 'Medium',
      category: 'Linked List',
      timeLimit: 30,
      description: 'Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.\nImplement the LRUCache class:\n- LRUCache(int capacity) Initialize the LRU cache with positive size capacity.\n- int get(int key) Return the value of the key if the key exists, otherwise return -1.\n- void put(int key, int value) Update the value of the key if the key exists. Otherwise, add the key-value pair to the cache.',
      constraints: ['1 <= capacity <= 3000', '0 <= key <= 10^4', '0 <= value <= 10^5'],
      exampleInput: '["LRUCache", "put", "put", "get", "put", "get"]\n[[2], [1, 1], [2, 2], [1], [3, 3], [2]]',
      exampleOutput: '[null, null, null, 1, null, -1]',
    },
    {
      id: 3,
      title: 'Valid Parentheses',
      difficulty: 'Medium',
      category: 'Stack',
      timeLimit: 20,
      description: 'Given a string s containing just the characters "(", ")", "{", "}", "[" and "]", determine if the input string is valid.\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.',
      constraints: ['1 <= s.length <= 10^4', 's consists of parentheses only "()[]{}"'],
      exampleInput: 's = "()[]{}"',
      exampleOutput: 'true',
    },
    {
      id: 4,
      title: 'Merge K Sorted Lists',
      difficulty: 'Hard',
      category: 'Linked List',
      timeLimit: 40,
      description: 'You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.\nMerge all the linked-lists into one sorted linked-list and return it.',
      constraints: ['k == lists.length', '0 <= k <= 10^4', '0 <= lists[i].length <= 500'],
      exampleInput: 'lists = [[1,4,5],[1,3,4],[2,6]]',
      exampleOutput: '[1,1,2,3,4,4,5,6]',
    }
  ];

  return {
    id: crypto.randomUUID(),
    company,
    totalQuestions: questions.length,
    timeLimit: questions.reduce((acc, q) => acc + q.timeLimit, 0),
    questions,
  };
}

export function evaluateInterview(session: InterviewSession, answers: Map<number, string>): InterviewResult {
  const attempted = answers.size;
  // Mock logic: randomly decide if answers are correct, with higher probability for attempted questions
  let correct = 0;
  
  for (let i = 0; i < answers.size; i++) {
    if (Math.random() > 0.3) {
      correct++;
    }
  }

  const score = Math.round((correct / session.totalQuestions) * 100);

  return {
    score,
    questionsAttempted: attempted,
    questionsCorrect: correct,
    totalTime: '54:12', // Mock time
    feedback: score >= 75 
      ? 'Strong performance overall. Good grasp of data structures.' 
      : 'Keep practicing! Focus on algorithmic efficiency and edge cases.',
    strengths: ['Clear communication', 'Familiarity with arrays and strings', 'Good problem-solving approach'],
    improvements: ['Time complexity optimization', 'Handling null pointers in linked lists', 'Testing edge cases before execution'],
  };
}
