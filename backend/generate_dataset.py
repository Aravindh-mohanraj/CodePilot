import json

with open('dataset/questions.json', 'r', encoding='utf-8') as f:
    qs = json.load(f)

# Problem 6 to 20 Data
coding_data = {
    6: {
        "statement": "Given two strings text1 and text2, return the length of their longest common subsequence. If there is no common subsequence, return 0.\n\nA subsequence of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.",
        "python": "class Solution:\n    def longestCommonSubsequence(self, text1, text2):\n        pass",
        "java": "class Solution {\n    public int longestCommonSubsequence(String text1, String text2) {\n        return 0;\n    }\n}",
        "examples": [{"input": "text1 = 'abcde', text2 = 'ace'", "output": "3", "explanation": "The longest common subsequence is 'ace'."}, {"input": "text1 = 'abc', text2 = 'abc'", "output": "3", "explanation": "The longest common subsequence is 'abc'."}],
        "test_cases": [{"input": "'abcde', 'ace'", "expected": "3"}, {"input": "'abc', 'def'", "expected": "0"}]
    },
    7: {
        "statement": "You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.\n\nReturn the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.",
        "python": "class Solution:\n    def coinChange(self, coins, amount):\n        pass",
        "java": "class Solution {\n    public int coinChange(int[] coins, int amount) {\n        return -1;\n    }\n}",
        "examples": [{"input": "coins = [1,2,5], amount = 11", "output": "3", "explanation": "11 = 5 + 5 + 1"}, {"input": "coins = [2], amount = 3", "output": "-1", "explanation": "Cannot be made up."}],
        "test_cases": [{"input": "[1,2,5], 11", "expected": "3"}, {"input": "[2], 3", "expected": "-1"}]
    },
    8: {
        "statement": "You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night.\n\nGiven an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.",
        "python": "class Solution:\n    def rob(self, nums):\n        pass",
        "java": "class Solution {\n    public int rob(int[] nums) {\n        return 0;\n    }\n}",
        "examples": [{"input": "nums = [1,2,3,1]", "output": "4", "explanation": "Rob house 1 (money = 1) and then rob house 3 (money = 3). Total = 4."}, {"input": "nums = [2,7,9,3,1]", "output": "12", "explanation": "Rob houses 1, 3, and 5 for total 12."}],
        "test_cases": [{"input": "[1,2,3,1]", "expected": "4"}, {"input": "[2,7,9,3,1]", "expected": "12"}]
    },
    9: {
        "statement": "You are climbing a staircase. It takes n steps to reach the top.\n\nEach time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
        "python": "class Solution:\n    def climbStairs(self, n):\n        pass",
        "java": "class Solution {\n    public int climbStairs(int n) {\n        return 0;\n    }\n}",
        "examples": [{"input": "n = 2", "output": "2", "explanation": "1 step + 1 step, or 2 steps"}, {"input": "n = 3", "output": "3", "explanation": "1+1+1, 1+2, 2+1"}],
        "test_cases": [{"input": "2", "expected": "2"}, {"input": "3", "expected": "3"}]
    },
    10: {
        "statement": "Given an integer array nums, return the length of the longest strictly increasing subsequence.",
        "python": "class Solution:\n    def lengthOfLIS(self, nums):\n        pass",
        "java": "class Solution {\n    public int lengthOfLIS(int[] nums) {\n        return 0;\n    }\n}",
        "examples": [{"input": "nums = [10,9,2,5,3,7,101,18]", "output": "4", "explanation": "The longest increasing subsequence is [2,3,7,101]."}],
        "test_cases": [{"input": "[10,9,2,5,3,7,101,18]", "expected": "4"}]
    },
    11: {
        "statement": "The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other.\n\nGiven an integer n, return the number of distinct solutions to the n-queens puzzle.",
        "python": "class Solution:\n    def totalNQueens(self, n):\n        pass",
        "java": "class Solution {\n    public int totalNQueens(int n) {\n        return 0;\n    }\n}",
        "examples": [{"input": "n = 4", "output": "2", "explanation": "There are 2 distinct solutions for the 4-queens puzzle."}],
        "test_cases": [{"input": "4", "expected": "2"}, {"input": "1", "expected": "1"}]
    },
    12: {
        "statement": "Given an integer array nums of unique elements, return all possible subsets (the power set).\n\nThe solution set must not contain duplicate subsets. Return the solution in any order.",
        "python": "class Solution:\n    def subsets(self, nums):\n        pass",
        "java": "class Solution {\n    public List<List<Integer>> subsets(int[] nums) {\n        return new ArrayList<>();\n    }\n}",
        "examples": [{"input": "nums = [1,2,3]", "output": "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]", "explanation": "Returns all 8 possible subsets."}],
        "test_cases": [{"input": "[0]", "expected": "[[], [0]]"}]
    },
    13: {
        "statement": "Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target.\n\nThe same number may be chosen from candidates an unlimited number of times.",
        "python": "class Solution:\n    def combinationSum(self, candidates, target):\n        pass",
        "java": "class Solution {\n    public List<List<Integer>> combinationSum(int[] candidates, int target) {\n        return new ArrayList<>();\n    }\n}",
        "examples": [{"input": "candidates = [2,3,6,7], target = 7", "output": "[[2,2,3],[7]]", "explanation": "2 and 3 are candidates, and 2 + 2 + 3 = 7. Note that 2 can be used multiple times."}],
        "test_cases": [{"input": "[2], 1", "expected": "[]"}]
    },
    14: {
        "statement": "Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.",
        "python": "class Solution:\n    def merge(self, intervals):\n        pass",
        "java": "class Solution {\n    public int[][] merge(int[][] intervals) {\n        return new int[][]{};\n    }\n}",
        "examples": [{"input": "intervals = [[1,3],[2,6],[8,10],[15,18]]", "output": "[[1,6],[8,10],[15,18]]", "explanation": "Since intervals [1,3] and [2,6] overlap, merge them into [1,6]."}],
        "test_cases": [{"input": "[[1,4],[4,5]]", "expected": "[[1,5]]"}]
    },
    15: {
        "statement": "You are given an integer array nums. You are initially positioned at the array's first index, and each element in the array represents your maximum jump length at that position.\n\nReturn true if you can reach the last index, or false otherwise.",
        "python": "class Solution:\n    def canJump(self, nums):\n        pass",
        "java": "class Solution {\n    public boolean canJump(int[] nums) {\n        return false;\n    }\n}",
        "examples": [{"input": "nums = [2,3,1,1,4]", "output": "true", "explanation": "Jump 1 step from index 0 to 1, then 3 steps to the last index."}],
        "test_cases": [{"input": "[2,3,1,1,4]", "expected": "True"}, {"input": "[3,2,1,0,4]", "expected": "False"}]
    },
    16: {
        "statement": "Given an array of meeting time intervals where intervals[i] = [starti, endi], determine if a person could attend all meetings.",
        "python": "class Solution:\n    def canAttendMeetings(self, intervals):\n        pass",
        "java": "class Solution {\n    public boolean canAttendMeetings(int[][] intervals) {\n        return false;\n    }\n}",
        "examples": [{"input": "intervals = [[0,30],[5,10],[15,20]]", "output": "false", "explanation": "Meetings overlap."}],
        "test_cases": [{"input": "[[0,30],[5,10],[15,20]]", "expected": "False"}, {"input": "[[7,10],[2,4]]", "expected": "True"}]
    },
    17: {
        "statement": "Given an integer array nums and an integer k, return the kth largest element in the array.\n\nNote that it is the kth largest element in the sorted order, not the kth distinct element.",
        "python": "class Solution:\n    def findKthLargest(self, nums, k):\n        pass",
        "java": "class Solution {\n    public int findKthLargest(int[] nums, int k) {\n        return 0;\n    }\n}",
        "examples": [{"input": "nums = [3,2,1,5,6,4], k = 2", "output": "5", "explanation": "The 2nd largest element is 5."}],
        "test_cases": [{"input": "[3,2,1,5,6,4], 2", "expected": "5"}]
    },
    18: {
        "statement": "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.",
        "python": "class Solution:\n    def findMedianSortedArrays(self, nums1, nums2):\n        pass",
        "java": "class Solution {\n    public double findMedianSortedArrays(int[] nums1, int[] nums2) {\n        return 0.0;\n    }\n}",
        "examples": [{"input": "nums1 = [1,3], nums2 = [2]", "output": "2.0", "explanation": "merged array = [1,2,3] and median is 2."}],
        "test_cases": [{"input": "[1,3], [2]", "expected": "2.0"}]
    },
    19: {
        "statement": "You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).\n\nFind two lines that together with the x-axis form a container, such that the container contains the most water. Return the maximum amount of water a container can store.",
        "python": "class Solution:\n    def maxArea(self, height):\n        pass",
        "java": "class Solution {\n    public int maxArea(int[] height) {\n        return 0;\n    }\n}",
        "examples": [{"input": "height = [1,8,6,2,5,4,8,3,7]", "output": "49", "explanation": "The maximum area is obtained between the lines at index 1 and 8."}],
        "test_cases": [{"input": "[1,8,6,2,5,4,8,3,7]", "expected": "49"}, {"input": "[1,1]", "expected": "1"}]
    },
    20: {
        "statement": "Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.",
        "python": "class Solution:\n    def threeSum(self, nums):\n        pass",
        "java": "class Solution {\n    public List<List<Integer>> threeSum(int[] nums) {\n        return new ArrayList<>();\n    }\n}",
        "examples": [{"input": "nums = [-1,0,1,2,-1,-4]", "output": "[[-1,-1,2],[-1,0,1]]", "explanation": "Triplets summing to 0."}],
        "test_cases": [{"input": "[0,1,1]", "expected": "[]"}]
    }
}

for q in qs:
    id = q['id']
    if 1 <= id <= 5:
        # already patched correctly for statement and examples, but let's just make sure test_cases are there directly
        if id == 1: q['test_cases'] = [{"input": "[2, 7, 11, 15], 9", "expected": "[0, 1]"}, {"input": "[3, 2, 4], 6", "expected": "[1, 2]"}]
        if id == 2: q['test_cases'] = [{"input": "[7, 1, 5, 3, 6, 4]", "expected": "5"}, {"input": "[7, 6, 4, 3, 1]", "expected": "0"}]
        if id == 3: q['test_cases'] = [{"input": "'()'", "expected": "True"}, {"input": "'(]'", "expected": "False"}]
        if id == 4: q['test_cases'] = [{"input": "[1,2,4], [1,3,4]", "expected": "[1,1,2,3,4,4]"}, {"input": "[], []", "expected": "[]"}]
        if id == 5: q['test_cases'] = [{"input": "[-1,0,3,5,9,12], 9", "expected": "4"}, {"input": "[-1,0,3,5,9,12], 2", "expected": "-1"}]
    elif 6 <= id <= 20:
        data = coding_data.get(id)
        if data:
            q['statement'] = data['statement']
            q['python_solution'] = data['python']
            q['java_solution'] = data['java']
            q['examples'] = data['examples']
            q['test_cases'] = data['test_cases']
            q['constraints'] = ["General constraint 1", "General constraint 2"]
    elif 21 <= id <= 30:
        q['statement'] = f"{q['title']}\n\nPlease provide your detailed theoretical explanation below. This is not a coding question, but you can write your explanation as comments or text."
        q['python_solution'] = "# Write your theoretical explanation here\nclass Solution:\n    def solve(self):\n        return 'Submitted'"
        q['java_solution'] = "// Write your theoretical explanation here\nclass Solution {\n    public String solve() {\n        return \"Submitted\";\n    }\n}"
        q['examples'] = []
        q['test_cases'] = [{"input": "", "expected": "'Submitted'"}]
        q['constraints'] = []

with open('dataset/questions.json', 'w', encoding='utf-8') as f:
    json.dump(qs, f, indent=2)

print("Updated questions.json completely!")
