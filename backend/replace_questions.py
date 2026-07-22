import json

with open('dataset/questions.json', 'r', encoding='utf-8') as f:
    qs = json.load(f)

# Keep only programming questions (Q1-20) and replace Q21-30 with new programming questions
new_questions = [q for q in qs if q['id'] <= 20]

# Add 10 new programming questions
extra = [
    {
        "id": 21, "title": "Number of Islands", "type": "Programming",
        "category": "Graphs", "difficulty": "Medium", "companies": ["Amazon", "Microsoft"],
        "statement": "Given an m x n 2D binary grid which represents a map of '1's (land) and '0's (water), return the number of islands.\n\nAn island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.",
        "examples": [
            {"input": "grid = [[\"1\",\"1\",\"0\"],[\"0\",\"1\",\"0\"],[\"0\",\"0\",\"1\"]]", "output": "2", "explanation": "Two separate islands."}
        ],
        "constraints": ["m == grid.length", "n == grid[i].length", "1 <= m, n <= 300", "grid[i][j] is '0' or '1'."],
        "python_solution": "class Solution:\n    def numIslands(self, grid):",
        "java_solution": "class Solution {\n    public int numIslands(char[][] grid) {\n        return 0;\n    }\n}",
        "test_cases": [{"input": "[[\"1\",\"1\",\"0\"],[\"0\",\"1\",\"0\"],[\"0\",\"0\",\"1\"]]", "expected": "2"}],
        "explanation": ""
    },
    {
        "id": 22, "title": "Clone Graph", "type": "Programming",
        "category": "Graphs", "difficulty": "Medium", "companies": ["Facebook", "Google"],
        "statement": "Given a reference of a node in a connected undirected graph, return a deep copy (clone) of the graph.\n\nEach node in the graph contains a value (int) and a list of its neighbors.",
        "examples": [
            {"input": "adjList = [[2,4],[1,3],[2,4],[1,3]]", "output": "[[2,4],[1,3],[2,4],[1,3]]", "explanation": "Clone of the original graph."}
        ],
        "constraints": ["The number of nodes in the graph is in the range [0, 100]."],
        "python_solution": "class Solution:\n    def cloneGraph(self, node):",
        "java_solution": "class Solution {\n    public Node cloneGraph(Node node) {\n        return null;\n    }\n}",
        "test_cases": [],
        "explanation": ""
    },
    {
        "id": 23, "title": "Pacific Atlantic Water Flow", "type": "Programming",
        "category": "Graphs", "difficulty": "Medium", "companies": ["Google"],
        "statement": "There is an m x n rectangular island that borders both the Pacific Ocean and Atlantic Ocean. Given an m x n integer matrix heights, return a list of grid coordinates where water can flow to both the Pacific and Atlantic oceans.",
        "examples": [
            {"input": "heights = [[1,2,2,3,5],[3,2,3,4,4]]", "output": "[[0,4],[1,3],[1,4]]", "explanation": "Water flows from these cells to both oceans."}
        ],
        "constraints": ["m == heights.length", "n == heights[r].length"],
        "python_solution": "class Solution:\n    def pacificAtlantic(self, heights):",
        "java_solution": "class Solution {\n    public List<List<Integer>> pacificAtlantic(int[][] heights) {\n        return new ArrayList<>();\n    }\n}",
        "test_cases": [],
        "explanation": ""
    },
    {
        "id": 24, "title": "Word Search", "type": "Programming",
        "category": "Backtracking", "difficulty": "Medium", "companies": ["Amazon", "Microsoft"],
        "statement": "Given an m x n grid of characters board and a string word, return true if word exists in the grid.\n\nThe word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring.",
        "examples": [
            {"input": "board = [[\"A\",\"B\"],[\"C\",\"D\"]], word = \"ABDC\"", "output": "true", "explanation": "ABDC path exists going right then down diagonally."}
        ],
        "constraints": ["m == board.length", "n = board[i].length", "1 <= m, n <= 6"],
        "python_solution": "class Solution:\n    def exist(self, board, word):",
        "java_solution": "class Solution {\n    public boolean exist(char[][] board, String word) {\n        return false;\n    }\n}",
        "test_cases": [{"input": "[[\"A\",\"B\"],[\"C\",\"D\"]], \"ABDC\"", "expected": "True"}],
        "explanation": ""
    },
    {
        "id": 25, "title": "Reverse Linked List", "type": "Programming",
        "category": "Linked List", "difficulty": "Easy", "companies": ["Amazon", "Apple"],
        "statement": "Given the head of a singly linked list, reverse the list, and return the reversed list.",
        "examples": [
            {"input": "head = [1,2,3,4,5]", "output": "[5,4,3,2,1]", "explanation": "Reversed the linked list."}
        ],
        "constraints": ["The number of nodes in the list is the range [0, 5000].", "-5000 <= Node.val <= 5000"],
        "python_solution": "class Solution:\n    def reverseList(self, head):",
        "java_solution": "class Solution {\n    public ListNode reverseList(ListNode head) {\n        return null;\n    }\n}",
        "test_cases": [],
        "explanation": ""
    },
    {
        "id": 26, "title": "Linked List Cycle", "type": "Programming",
        "category": "Linked List", "difficulty": "Easy", "companies": ["Amazon", "Google"],
        "statement": "Given head, the head of a linked list, determine if the linked list has a cycle in it.\n\nReturn true if there is a cycle in the linked list. Otherwise, return false.",
        "examples": [
            {"input": "head = [3,2,0,-4], pos = 1", "output": "true", "explanation": "There is a cycle, tail connects to node index 1."}
        ],
        "constraints": ["The number of the nodes in the list is in the range [0, 10^4]."],
        "python_solution": "class Solution:\n    def hasCycle(self, head):",
        "java_solution": "class Solution {\n    public boolean hasCycle(ListNode head) {\n        return false;\n    }\n}",
        "test_cases": [],
        "explanation": ""
    },
    {
        "id": 27, "title": "Maximum Depth of Binary Tree", "type": "Programming",
        "category": "Trees", "difficulty": "Easy", "companies": ["Amazon", "Google"],
        "statement": "Given the root of a binary tree, return its maximum depth.\n\nA binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.",
        "examples": [
            {"input": "root = [3,9,20,null,null,15,7]", "output": "3", "explanation": "The maximum depth is 3."}
        ],
        "constraints": ["The number of nodes in the tree is in the range [0, 10^4].", "-100 <= Node.val <= 100"],
        "python_solution": "class Solution:\n    def maxDepth(self, root):",
        "java_solution": "class Solution {\n    public int maxDepth(TreeNode root) {\n        return 0;\n    }\n}",
        "test_cases": [],
        "explanation": ""
    },
    {
        "id": 28, "title": "Invert Binary Tree", "type": "Programming",
        "category": "Trees", "difficulty": "Easy", "companies": ["Google", "Apple"],
        "statement": "Given the root of a binary tree, invert the tree, and return its root.",
        "examples": [
            {"input": "root = [4,2,7,1,3,6,9]", "output": "[4,7,2,9,6,3,1]", "explanation": "Left and right subtrees are swapped at every node."}
        ],
        "constraints": ["The number of nodes in the tree is in the range [0, 100].", "-100 <= Node.val <= 100"],
        "python_solution": "class Solution:\n    def invertTree(self, root):",
        "java_solution": "class Solution {\n    public TreeNode invertTree(TreeNode root) {\n        return null;\n    }\n}",
        "test_cases": [],
        "explanation": ""
    },
    {
        "id": 29, "title": "Validate Binary Search Tree", "type": "Programming",
        "category": "Trees", "difficulty": "Medium", "companies": ["Amazon", "Facebook"],
        "statement": "Given the root of a binary tree, determine if it is a valid binary search tree (BST).\n\nA valid BST is defined as: left subtree nodes are less than root, right subtree nodes are greater than root, and both subtrees are also valid BSTs.",
        "examples": [
            {"input": "root = [2,1,3]", "output": "true", "explanation": "[2,1,3] forms a valid BST."}
        ],
        "constraints": ["The number of nodes in the tree is in the range [1, 10^4].", "-2^31 <= Node.val <= 2^31 - 1"],
        "python_solution": "class Solution:\n    def isValidBST(self, root):",
        "java_solution": "class Solution {\n    public boolean isValidBST(TreeNode root) {\n        return false;\n    }\n}",
        "test_cases": [],
        "explanation": ""
    },
    {
        "id": 30, "title": "Product of Array Except Self", "type": "Programming",
        "category": "Arrays / Hashing", "difficulty": "Medium", "companies": ["Facebook", "Amazon", "Microsoft"],
        "statement": "Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].\n\nYou must write an algorithm that runs in O(n) time and without using the division operation.",
        "examples": [
            {"input": "nums = [1,2,3,4]", "output": "[24,12,8,6]", "explanation": "Each element is replaced by the product of all others."},
            {"input": "nums = [-1,1,0,-3,3]", "output": "[0,0,9,0,0]", "explanation": "Product of all elements except self."}
        ],
        "constraints": ["2 <= nums.length <= 10^5", "-30 <= nums[i] <= 30", "The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer."],
        "python_solution": "class Solution:\n    def productExceptSelf(self, nums):",
        "java_solution": "class Solution {\n    public int[] productExceptSelf(int[] nums) {\n        return new int[]{};\n    }\n}",
        "test_cases": [{"input": "[1,2,3,4]", "expected": "[24, 12, 8, 6]"}],
        "explanation": ""
    }
]

all_questions = new_questions + extra

with open('dataset/questions.json', 'w', encoding='utf-8') as f:
    json.dump(all_questions, f, indent=2)

print(f"Done! Total questions: {len(all_questions)}")
for q in all_questions:
    print(f"  Q{q['id']}: {q['title']} [{q['type']}]")
