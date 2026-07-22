import { Question, Company, Category, User, Activity, Submission, ChatMessage } from '@/types';

export const MOCK_USER: User = {
  name: "Alex Rivera",
  title: "Senior Software Engineer",
  company: "TechCorp",
  bio: "Passionate about distributed systems, low-latency architectures, and mastering competitive programming. Currently grinding for L6 interviews.",
  rank: "Expert IV",
  rankPercentile: "TOP 2%",
  xp: 2450,
  xpMax: 3000,
  avatarUrl: "/images/alex-rivera.jpg",
  website: "arivera.dev",
  github: "arivera-dev",
  linkedin: "alex-rivera"
};

export const MOCK_QUESTIONS: Question[] = [
  {
    id: "042",
    title: "Trapping Rain Water",
    difficulty: "Hard",
    category: "String Manipulation",
    acceptance: "54.2%",
    estimatedTime: "45m",
    companies: ["Amazon", "Google", "Meta"],
    description: "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
    constraints: [
      "n == height.length",
      "1 <= n <= 2 * 10^4",
      "0 <= height[i] <= 10^5"
    ],
    exampleInput: "height = [0,1,0,2,1,0,1,3,2,1,2,1]",
    exampleOutput: "6",
    exampleExplanation: "The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped.",
    isRecommended: false
  },
  {
    id: "001",
    title: "Two Sum",
    difficulty: "Easy",
    category: "Arrays",
    acceptance: "49.8%",
    estimatedTime: "15m",
    companies: ["Meta", "Apple"],
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists."
    ],
    exampleInput: "nums = [2,7,11,15], target = 9",
    exampleOutput: "[0,1]",
    exampleExplanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
    isRecommended: false
  },
  {
    id: "198",
    title: "House Robber III",
    difficulty: "Medium",
    category: "Dynamic Programming",
    acceptance: "51.1%",
    estimatedTime: "30m",
    companies: ["LinkedIn", "Microsoft"],
    description: "The thief has found himself a new place for his thievery. There is only one entrance to this area, called root. Besides the root, each house has one and only one parent house. After a tour, the smart thief realized that all houses in this place form a binary tree. It will automatically contact the police if two directly-linked houses were broken into on the same night. Return the maximum amount of money the thief can rob tonight without alerting the police.",
    constraints: [
      "The number of nodes in the tree is in the range [1, 10^4].",
      "0 <= Node.val <= 10^4"
    ],
    exampleInput: "root = [3,2,3,null,3,null,1]",
    exampleOutput: "7",
    exampleExplanation: "Maximum amount of money the thief can rob = 3 + 3 + 1 = 7.",
    isRecommended: false
  },
  {
    id: "020",
    title: "Valid Parentheses",
    difficulty: "Easy",
    category: "Stacks",
    acceptance: "40.5%",
    estimatedTime: "10m",
    companies: ["Bloomberg"],
    description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if open brackets are closed by the same type of brackets, and open brackets are closed in the correct order.",
    constraints: [
      "1 <= s.length <= 10^4",
      "s consists of parentheses only '()[]{}'."
    ],
    exampleInput: "s = '()[]{}'",
    exampleOutput: "true",
    exampleExplanation: "All brackets are closed correctly in order.",
    isRecommended: true
  }
];

export const MOCK_COMPANIES: Company[] = [
  {
    name: "Google",
    questionCount: 1240,
    frequency: "High Frequency",
    brandColor: "bg-blue-500",
    logoPath: "/images/google.png",
    trendType: "bar"
  },
  {
    name: "Amazon",
    questionCount: 980,
    frequency: "Very High",
    brandColor: "bg-orange-500",
    logoPath: "/images/amazon.png",
    trendType: "progress",
    trendValue: 85
  },
  {
    name: "Microsoft",
    questionCount: 850,
    frequency: "Growing",
    brandColor: "bg-blue-400",
    logoPath: "/images/microsoft.png",
    trendType: "wave"
  },
  {
    name: "Meta",
    questionCount: 720,
    frequency: "Top Tier",
    brandColor: "bg-blue-600",
    logoPath: "/images/meta.png",
    trendType: "bar"
  },
  {
    name: "Adobe",
    questionCount: 450,
    frequency: "Stable",
    brandColor: "bg-red-500",
    logoPath: "/images/adobe.png",
    trendType: "dots"
  },
  {
    name: "Apple",
    questionCount: 610,
    frequency: "Elite",
    brandColor: "bg-slate-300",
    logoPath: "/images/apple.png",
    trendType: "progress",
    trendValue: 66
  },
  {
    name: "Netflix",
    questionCount: 340,
    frequency: "Culture-Fit",
    brandColor: "bg-red-600",
    logoPath: "/images/netflix.png",
    trendType: "progress",
    trendValue: 100
  },
  {
    name: "Stripe",
    questionCount: 510,
    frequency: "System Design",
    brandColor: "bg-indigo-500",
    logoPath: "/images/stripe.png",
    trendType: "dots"
  }
];

export const MOCK_CATEGORIES: Category[] = [
  {
    id: "dynamic-programming",
    name: "Dynamic Programming",
    description: "Master optimal substructure and overlapping subproblems across 45+ elite challenges.",
    difficultyTag: "Advanced",
    difficultyColor: "bg-tertiary/10 text-tertiary",
    icon: "rebase",
    questionsSolved: 18,
    totalQuestions: 45,
    progressPercent: 40
  },
  {
    id: "system-design",
    name: "System Design",
    description: "Architect scalable distributed systems. Load balancing, sharding, and CAP theorem.",
    difficultyTag: "Design",
    difficultyColor: "bg-secondary-container/20 text-secondary",
    icon: "hub",
    questionsSolved: 12,
    totalQuestions: 20,
    progressPercent: 60
  },
  {
    id: "operating-systems",
    name: "Operating Systems",
    description: "Deep dive into concurrency, process scheduling, memory management, and file systems.",
    difficultyTag: "Fundamentals",
    difficultyColor: "bg-outline-variant/20 text-on-surface-variant",
    icon: "memory",
    questionsSolved: 25,
    totalQuestions: 30,
    progressPercent: 83
  },
  {
    id: "graph-theory",
    name: "Graph Theory & Algorithms",
    description: "From BFS/DFS to Dijkstra and Bellman-Ford. Understanding adjacency lists and matrices for complex networks.",
    difficultyTag: "High Failure Rate",
    difficultyColor: "bg-error-container/20 text-error",
    icon: "account_tree",
    questionsSolved: 8,
    totalQuestions: 52,
    progressPercent: 15,
    spanColumns: true,
    imagePath: "/images/graph-network.jpg"
  },
  {
    id: "databases",
    name: "Databases",
    description: "Master indexing, ACID properties, normalization, and complex query optimization across relational and non-relational engines.",
    difficultyTag: "SQL/NoSQL",
    difficultyColor: "bg-primary-container/20 text-primary",
    icon: "database",
    questionsSolved: 0,
    totalQuestions: 40,
    progressPercent: 0
  },
  {
    id: "computer-networks",
    name: "Computer Networks",
    description: "HTTP/3, TCP/IP handshake, DNS resolution, and TLS encryption layers.",
    difficultyTag: "Web Tech",
    difficultyColor: "bg-outline-variant/20 text-on-surface-variant",
    icon: "lan",
    questionsSolved: 10,
    totalQuestions: 25,
    progressPercent: 40
  },
  {
    id: "behavioral",
    name: "Behavioral Questions",
    description: "Use the STAR method to conquer leadership, conflict, and teamwork scenarios common at FAANG.",
    difficultyTag: "Soft Skills",
    difficultyColor: "bg-tertiary-container/20 text-tertiary",
    icon: "groups",
    questionsSolved: 8,
    totalQuestions: 15,
    progressPercent: 53
  }
];

export const MOCK_ACTIVITIES: Activity[] = [
  {
    id: "1",
    date: "Today, 10:45 AM",
    type: "solved",
    text: "Solved \"Merge K Sorted Lists\" in 24 mins.",
    subtext: "Accuracy: 100% • Optimal Space O(1)",
    color: "bg-primary"
  },
  {
    id: "2",
    date: "Yesterday",
    type: "badge",
    text: "Earned Badge: \"Recursion Master\"",
    subtext: "For solving 25 problems in recursion category.",
    color: "bg-secondary"
  },
  {
    id: "3",
    date: "Oct 24, 2024",
    type: "download",
    text: "Downloaded \"System Design Cheat Sheet\"",
    subtext: "PDF Resource • 4.2MB",
    color: "bg-tertiary"
  },
  {
    id: "4",
    date: "Oct 22, 2024",
    type: "ai",
    text: "AI Assistant generated a custom study plan for Google L4.",
    subtext: "Dynamic Schedule • 8 Weeks Path",
    color: "bg-on-surface-variant"
  }
];

export const MOCK_SUBMISSIONS: Submission[] = [
  {
    id: "sub_1",
    problem: "Longest Palindromic Substring",
    difficulty: "Medium",
    status: "Accepted",
    runtime: "24 ms",
    language: "C++",
    date: "2 hours ago"
  },
  {
    id: "sub_2",
    problem: "Merge K Sorted Lists",
    difficulty: "Hard",
    status: "Wrong Answer",
    runtime: "--",
    language: "Python",
    date: "5 hours ago"
  },
  {
    id: "sub_3",
    problem: "Two Sum",
    difficulty: "Easy",
    status: "Accepted",
    runtime: "12 ms",
    language: "Go",
    date: "Yesterday"
  },
  {
    id: "sub_4",
    problem: "Reorder Routes to Make All Paths Lead to the City Zero",
    difficulty: "Medium",
    status: "Accepted",
    runtime: "68 ms",
    language: "TypeScript",
    date: "Nov 12, 2024"
  }
];

export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: "msg_1",
    sender: "ai",
    text: "Hello! I'm your PrepForge AI coach. I can help you master complex data structures, practice behavioral questions, or run a mock interview session. What should we focus on today?",
    timestamp: "Assistant · Now"
  },
  {
    id: "msg_2",
    sender: "user",
    text: "Can you explain the difference between BFS and DFS in terms of space complexity for a very deep tree?",
    timestamp: "You · 2m ago"
  },
  {
    id: "msg_3",
    sender: "ai",
    text: "Great question. For a very deep (or infinite) tree, the space complexity differs significantly:\n\n• BFS (Breadth-First Search): Space complexity is O(W) where W is the maximum width. In a balanced tree, this can be O(2^d).\n• DFS (Depth-First Search): Space complexity is O(D) where D is the maximum depth. DFS only stores the current path from the root.\n\n\"If the tree is deep but narrow, DFS is much more memory efficient. If the tree is wide but shallow, BFS might be preferred.\"",
    timestamp: "Assistant · Just now"
  }
];
