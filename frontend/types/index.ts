export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface Question {
  id: string; // e.g. "042"
  title: string; // e.g. "Trapping Rain Water"
  difficulty: Difficulty;
  category: string; // e.g. "String Manipulation", "Hash Maps"
  acceptance: string; // e.g. "54.2%"
  estimatedTime: string; // e.g. "45m"
  companies: string[]; // e.g. ["Google", "Amazon", "Meta"]
  description: string; // HTML or text description
  constraints: string[];
  exampleInput?: string;
  exampleOutput?: string;
  exampleExplanation?: string;
  isRecommended?: boolean;
}

export interface Company {
  name: string;
  questionCount: number;
  frequency: 'High Frequency' | 'Very High' | 'Growing' | 'Top Tier' | 'Stable' | 'Elite' | 'Culture-Fit' | 'System Design';
  brandColor: string; // e.g. "bg-blue-500"
  logoPath: string; // e.g. "/images/google.png"
  trendType: 'bar' | 'progress' | 'wave' | 'dots' | 'circle';
  trendValue?: number; // for progress/other views
}

export interface Category {
  id: string; // e.g. "dynamic-programming"
  name: string; // e.g. "Dynamic Programming"
  description: string;
  difficultyTag: 'Advanced' | 'Design' | 'Fundamentals' | 'High Failure Rate' | 'SQL/NoSQL' | 'Web Tech' | 'Soft Skills';
  difficultyColor: string; // e.g. "text-tertiary bg-tertiary/10"
  icon: string; // Material symbol icon name or Lucide equivalent
  questionsSolved: number;
  totalQuestions: number;
  progressPercent: number;
  spanColumns?: boolean; // if bento spans 2 cols
  imagePath?: string;
}

export interface User {
  name: string;
  title: string;
  company: string;
  bio: string;
  rank: string; // e.g. "Expert IV"
  rankPercentile: string; // e.g. "TOP 2%"
  xp: number;
  xpMax: number;
  avatarUrl: string;
  website: string;
  github: string;
  linkedin: string;
}

export interface Activity {
  id: string;
  date: string; // e.g. "Today, 10:45 AM"
  type: 'solved' | 'badge' | 'download' | 'ai';
  text: string; // e.g. "Solved 'Merge K Sorted Lists' in 24 mins."
  subtext: string; // e.g. "Accuracy: 100% • Optimal Space O(1)"
  color: string; // e.g. "bg-primary"
}

export interface Submission {
  id: string;
  problem: string;
  difficulty: Difficulty;
  status: 'Accepted' | 'Wrong Answer' | 'Time Limit Exceeded' | 'Runtime Error';
  runtime: string; // e.g. "24 ms" or "--"
  language: string; // e.g. "C++", "Python", "Go", "TypeScript"
  date: string; // e.g. "2 hours ago"
}

export interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string; // e.g. "Assistant · Now"
}
