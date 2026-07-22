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
    trendType: "bar",
    categoryTag: "FAANG",
    overview: "Google is known for rigorous interviews focusing heavily on scalable algorithms, graph structures, dynamic programming, and low-latency system design.",
    rounds: ["Online Assessment", "Technical Phone Screen", "4x Onsite Coding Rounds", "System Design & Architecture", "Googliness & Leadership"],
    topics: ["Graph Theory", "Dynamic Programming", "Tries & Trees", "Distributed Caching"],
    experiences: [
      "L4 Software Engineer: 'Three rounds of coding focusing on graphs and binary search, followed by one Googliness round. Very algorithmic focus.'",
      "L5 Systems Architect: 'Highly architectural. Focused on scaling databases, consistent hashing, and message queues.'"
    ],
    taggedQuestions: [
      { title: "Find Median from Data Stream", difficulty: "Hard", frequencyPercent: 96 },
      { title: "LRU Cache Implementation", difficulty: "Medium", frequencyPercent: 88 },
      { title: "Maximum Subarray Sum", difficulty: "Easy", frequencyPercent: 72 }
    ],
    difficultyBreakdown: { easy: 300, medium: 620, hard: 320 },
    prepTips: "Focus heavily on graph traversals, topological sorts, and optimal memory constraints. Google interviewers love dry-running with edge cases.",
    startPracticeUrl: "/explore?q=Google"
  },
  {
    name: "Meta",
    questionCount: 720,
    frequency: "Top Tier",
    brandColor: "bg-blue-600",
    logoPath: "/images/meta.png",
    trendType: "bar",
    categoryTag: "FAANG",
    overview: "Meta focuses on high-speed execution, clean code, and standard data structure operations. System design focuses heavily on product engineering (like designing Instagram or Messenger).",
    rounds: ["Technical Screening", "2x Coding & Algorithms", "System Design", "Behavioral (PE)"],
    topics: ["Arrays & HashMaps", "Linked Lists", "Product Design", "Concurrency"],
    experiences: [
      "E4 Engineer: 'Extremely fast-paced. Must solve 2 coding questions in 45 minutes with optimal time complexities.'",
      "E5 Senior: 'System design was Messenger. Focus on push notifications, web sockets, and distributed key-value storage.'"
    ],
    taggedQuestions: [
      { title: "Two Sum", difficulty: "Easy", frequencyPercent: 98 },
      { title: "LRU Cache Implementation", difficulty: "Medium", frequencyPercent: 82 }
    ],
    difficultyBreakdown: { easy: 240, medium: 380, hard: 100 },
    prepTips: "Practice common LeetCode questions until you can write clean, bug-free implementations in 15-20 minutes.",
    startPracticeUrl: "/explore?q=Meta"
  },
  {
    name: "Amazon",
    questionCount: 980,
    frequency: "Very High",
    brandColor: "bg-orange-500",
    logoPath: "/images/amazon.png",
    trendType: "progress",
    trendValue: 85,
    categoryTag: "FAANG",
    overview: "Amazon evaluates candidates deeply on their Leadership Principles (LPs) alongside rigorous coding and system design loops.",
    rounds: ["Online Assessment", "Technical Phone Screen", "4x Onsite Loops", "Bar Raiser Panel"],
    topics: ["Trees & Graphs", "Object Oriented Design", "System Design", "Leadership Principles"],
    experiences: [
      "SDE II: 'Every interviewer spent 15-20 minutes asking LP questions. Make sure to structure your answers in STAR format.'",
      "SDE I: 'Standard array and hashmap questions. OOD loop focused on parking lot design.'"
    ],
    taggedQuestions: [
      { title: "Trapping Rain Water", difficulty: "Hard", frequencyPercent: 94 },
      { title: "Two Sum", difficulty: "Easy", frequencyPercent: 78 }
    ],
    difficultyBreakdown: { easy: 300, medium: 480, hard: 200 },
    prepTips: "Prepare stories for Customer Obsession, Ownership, and Bias for Action. Practice sliding window and queue operations.",
    startPracticeUrl: "/explore?q=Amazon"
  },
  {
    name: "Microsoft",
    questionCount: 850,
    frequency: "Growing",
    brandColor: "bg-blue-400",
    logoPath: "/images/microsoft.png",
    trendType: "wave",
    categoryTag: "Enterprise",
    overview: "Microsoft focus is on solid software engineering fundamentals, multi-threading, clean modular design, and platform understanding.",
    rounds: ["Phone Screen", "4x Onsite Coding Loops", "System Design & Cloud Architecture"],
    topics: ["Trees & BSTs", "Linked Lists", "System Architecture", "Multi-threading"],
    experiences: [
      "SDE II: 'Focus was heavily on binary trees and linked lists. Had a round on designing a cloud file storage system.'",
      "SDE I: 'Simple recursive questions. Interviewers were very supportive and collaborative.'"
    ],
    taggedQuestions: [
      { title: "House Robber III", difficulty: "Medium", frequencyPercent: 85 },
      { title: "Two Sum", difficulty: "Easy", frequencyPercent: 70 }
    ],
    difficultyBreakdown: { easy: 290, medium: 420, hard: 140 },
    prepTips: "Brush up on pointer operations and tree traversals. Be ready to explain memory allocation in cloud environments.",
    startPracticeUrl: "/explore?q=Microsoft"
  },
  {
    name: "Apple",
    questionCount: 610,
    frequency: "Elite",
    brandColor: "bg-slate-300",
    logoPath: "/images/apple.png",
    trendType: "progress",
    trendValue: 66,
    categoryTag: "FAANG",
    overview: "Apple interview processes are highly team-specific, focusing deeply on lower-level details, hardware-software integration, and operating system basics.",
    rounds: ["Recruiter Call", "Team Screening", "4-5x Technical Onsites"],
    topics: ["Memory Management", "C/C++ Pointer Mechanics", "System Design", "Concurrency & Threads"],
    experiences: [
      "OS Engineer: 'Intense rounds focusing on thread scheduling, virtual memory, and hardware interfaces. Very low-level focus.'",
      "Software Engineer: 'Standard data structures but they asked deeply about pointer math and cache optimization.'"
    ],
    taggedQuestions: [
      { title: "Two Sum", difficulty: "Easy", frequencyPercent: 86 }
    ],
    difficultyBreakdown: { easy: 180, medium: 320, hard: 110 },
    prepTips: "Know your pointers, threads, memory layouts, and stack vs heap. Review team-specific tech stacks closely.",
    startPracticeUrl: "/explore?q=Apple"
  },
  {
    name: "Netflix",
    questionCount: 340,
    frequency: "Culture-Fit",
    brandColor: "bg-red-600",
    logoPath: "/images/netflix.png",
    trendType: "progress",
    trendValue: 100,
    categoryTag: "FAANG",
    overview: "Netflix prioritizes senior engineers who can demonstrate exceptional system design prowess, high alignment, and deep cultural fit.",
    rounds: ["Phone Screen", "Technical System Design", "2x Coding & Concurrency", "2x Cultural Fit Loops"],
    topics: ["System Design", "Scalability & CDN", "Cultural Alignment", "Data Pipelines"],
    experiences: [
      "Senior SDE: 'Two dedicated rounds on Netflix Culture. They expect you to read the cultural memo and align with it fully.'",
      "Infrastructure Engineer: 'Designed a regional failover strategy for video streams. Coding was concurrency-heavy.'"
    ],
    taggedQuestions: [
      { title: "LRU Cache Implementation", difficulty: "Medium", frequencyPercent: 92 }
    ],
    difficultyBreakdown: { easy: 80, medium: 180, hard: 80 },
    prepTips: "Read the Netflix Culture Memo. Focus on distributed tracing, CDNs, load balancing, and network traffic optimization.",
    startPracticeUrl: "/explore?q=Netflix"
  },
  {
    name: "Uber",
    questionCount: 420,
    frequency: "System Design",
    brandColor: "bg-black",
    logoPath: "/images/google.png", // fallback placeholder logo
    trendType: "dots",
    categoryTag: "Product",
    overview: "Uber focuses deeply on geo-spatial operations, high concurrency, caching, and low-latency system design.",
    rounds: ["Screening", "2x Coding", "System Design (Geo-spatial)", "Bar Raiser"],
    topics: ["Geo-spatial Indexing", "Concurrency", "Graph Search", "Distributed Caching"],
    experiences: [
      "SDE II: 'System Design round was Ride Hailing architecture. They wanted details on spatial databases and indexing (like H3).'",
      "SDE I: 'Graph traversals and shortest path algorithms. Time constraints were tight.'"
    ],
    taggedQuestions: [
      { title: "Find Median from Data Stream", difficulty: "Hard", frequencyPercent: 88 },
      { title: "Two Sum", difficulty: "Easy", frequencyPercent: 74 }
    ],
    difficultyBreakdown: { easy: 110, medium: 210, hard: 100 },
    prepTips: "Understand geo-spatial indexes (Quadtree, H3, R-Tree), distributed lock mechanisms, and read-heavy caching strategies.",
    startPracticeUrl: "/explore?q=Uber"
  },
  {
    name: "Airbnb",
    questionCount: 310,
    frequency: "Design Heavy",
    brandColor: "bg-red-400",
    logoPath: "/images/netflix.png", // fallback placeholder
    trendType: "wave",
    categoryTag: "Product",
    overview: "Airbnb interviews emphasize pixel-perfect frontend engineering, structured data storage design, and friendly teamwork.",
    rounds: ["Screening", "Coding Loop", "Frontend/System Design", "Host Matching & Behavioral"],
    topics: ["Frontend Architecture", "Search Indexing", "Databases & Indexing", "Behavioral"],
    experiences: [
      "Senior SDE: 'Designed a real-time reservation check-out system. Focused heavily on concurrency locks and double-booking avoidance.'"
    ],
    taggedQuestions: [
      { title: "Two Sum", difficulty: "Easy", frequencyPercent: 70 }
    ],
    difficultyBreakdown: { easy: 90, medium: 150, hard: 70 },
    prepTips: "Practice designing reservation databases. Focus on synchronization and atomic transactions.",
    startPracticeUrl: "/explore?q=Airbnb"
  },
  {
    name: "Stripe",
    questionCount: 510,
    frequency: "System Design",
    brandColor: "bg-indigo-500",
    logoPath: "/images/stripe.png",
    trendType: "dots",
    categoryTag: "Startup",
    overview: "Stripe focuses on practical software development. They ask candidates to write complete, clean, running applications rather than competitive math puzzles.",
    rounds: ["Integration Coding", "System Design", "Bug Squash Loop", "Manager Chat"],
    topics: ["API Design", "Data Structures", "Transaction Consistency", "Idempotent Services"],
    experiences: [
      "SDE II: 'Instead of Leetcode, they gave me an HTTP integration challenge. I had to read documentation and write code that worked. Extremely refreshing!'"
    ],
    taggedQuestions: [
      { title: "LRU Cache Implementation", difficulty: "Medium", frequencyPercent: 95 }
    ],
    difficultyBreakdown: { easy: 150, medium: 260, hard: 100 },
    prepTips: "Learn how to use HTTP libraries, parse JSON objects rapidly, and handle API retries and idempotency key constraints.",
    startPracticeUrl: "/explore?q=Stripe"
  },
  {
    name: "Atlassian",
    questionCount: 290,
    frequency: "Growing",
    brandColor: "bg-blue-600",
    logoPath: "/images/microsoft.png", // fallback
    trendType: "circle",
    categoryTag: "Product",
    overview: "Atlassian values candidate values and practical coding capability, focusing heavily on collaborative software development skills.",
    rounds: ["Screening", "Algorithms & Structure", "Design Loop", "Values Interview"],
    topics: ["Data Structure Design", "System Design", "Atlassian Values", "Object Modeling"],
    experiences: [
      "SDE II: 'Values round was intense but friendly. The coding round felt like pair programming rather than an examination.'"
    ],
    taggedQuestions: [
      { title: "Two Sum", difficulty: "Easy", frequencyPercent: 68 }
    ],
    difficultyBreakdown: { easy: 80, medium: 150, hard: 60 },
    prepTips: "Study the Atlassian Values (e.g. 'Build with heart and balance'). Practice object-oriented design patterns.",
    startPracticeUrl: "/explore?q=Atlassian"
  },
  {
    name: "Adobe",
    questionCount: 450,
    frequency: "Stable",
    brandColor: "bg-red-500",
    logoPath: "/images/adobe.png",
    trendType: "dots",
    categoryTag: "Enterprise",
    overview: "Adobe interviews cover algorithmic logic, memory efficiency, design patterns, and creative suite structures.",
    rounds: ["Online Assessment", "Technical Screen", "3-4x Onsite Loops"],
    topics: ["Arrays & Trees", "OOD Patterns", "Matrix Operations", "System Design"],
    experiences: [
      "Software Engineer: 'Algorithmic focus was standard. Had some questions on matrices and coordinate mathematics.'"
    ],
    taggedQuestions: [
      { title: "Two Sum", difficulty: "Easy", frequencyPercent: 78 }
    ],
    difficultyBreakdown: { easy: 130, medium: 220, hard: 100 },
    prepTips: "Practice tree operations and matrix rotations. Understand object-oriented concepts like Singleton and Factory patterns.",
    startPracticeUrl: "/explore?q=Adobe"
  },
  {
    name: "Salesforce",
    questionCount: 380,
    frequency: "Enterprise",
    brandColor: "bg-sky-400",
    logoPath: "/images/google.png", // fallback
    trendType: "circle",
    categoryTag: "Enterprise",
    overview: "Salesforce looks for engineers with database understanding, robust API development, security concepts, and enterprise cloud architecture.",
    rounds: ["Online Test", "Phone Interview", "4x Coding & Systems Loops"],
    topics: ["Databases", "API Architectures", "Security Concepts", "Behavioral"],
    experiences: [
      "Developer II: 'They asked deeply about transaction rollbacks, SQL queries, and multi-tenant architectures.'"
    ],
    taggedQuestions: [
      { title: "Two Sum", difficulty: "Easy", frequencyPercent: 70 }
    ],
    difficultyBreakdown: { easy: 100, medium: 190, hard: 90 },
    prepTips: "Review SQL query optimizations, ACID principles, indexing, and multi-tenant storage patterns.",
    startPracticeUrl: "/explore?q=Salesforce"
  }
];

export const MOCK_CATEGORIES: Category[] = [
  {
    id: "arrays",
    name: "Arrays",
    description: "Master contiguous data blocks, multi-dimensional grids, and sliding window operations.",
    difficultyTag: "Beginner",
    difficultyColor: "bg-green-500/10 text-green-400",
    icon: "table_rows",
    questionsSolved: 40,
    totalQuestions: 50,
    progressPercent: 80
  },
  {
    id: "strings",
    name: "Strings",
    description: "Analyze pattern matching, regular expressions, and parsing techniques.",
    difficultyTag: "Beginner",
    difficultyColor: "bg-green-500/10 text-green-400",
    icon: "text_fields",
    questionsSolved: 35,
    totalQuestions: 40,
    progressPercent: 87
  },
  {
    id: "linked-lists",
    name: "Linked Lists",
    description: "Manipulate singly, doubly, and circular lists. Pointer operations, cycle detection, and merging.",
    difficultyTag: "Beginner",
    difficultyColor: "bg-green-500/10 text-green-400",
    icon: "link",
    questionsSolved: 15,
    totalQuestions: 20,
    progressPercent: 75
  },
  {
    id: "trees",
    name: "Trees",
    description: "Traverse binary trees, BSTs, and self-balancing nodes (AVL, Red-Black). DFS, BFS and tree serializations.",
    difficultyTag: "Intermediate",
    difficultyColor: "bg-secondary-container/20 text-secondary",
    icon: "forest",
    questionsSolved: 28,
    totalQuestions: 45,
    progressPercent: 62
  },
  {
    id: "greedy",
    name: "Greedy Algorithms",
    description: "Optimize choices locally. Activity selection, Huffman coding, and fractional knapsack solver.",
    difficultyTag: "Intermediate",
    difficultyColor: "bg-secondary-container/20 text-secondary",
    icon: "payments",
    questionsSolved: 10,
    totalQuestions: 25,
    progressPercent: 40
  },
  {
    id: "backtracking",
    name: "Backtracking",
    description: "Solve constraint satisfaction puzzles: N-Queens, Sudoku, and subset generation.",
    difficultyTag: "Advanced",
    difficultyColor: "bg-tertiary/10 text-tertiary",
    icon: "undo",
    questionsSolved: 5,
    totalQuestions: 15,
    progressPercent: 33
  },
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
