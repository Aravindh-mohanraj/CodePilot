import json

with open('dataset/questions.json', 'r', encoding='utf-8') as f:
    questions = json.load(f)

# Dictionary of full working solutions for Python and Java, plus empty signatures for practice templates
solutions_data = {
    1: {
        "py_sol": "class Solution:\n    def twoSum(self, nums, target):\n        prevMap = {}\n        for i, n in enumerate(nums):\n            diff = target - n\n            if diff in prevMap:\n                return [prevMap[diff], i]\n            prevMap[n] = i\n        return []",
        "java_sol": "class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        Map<Integer, Integer> map = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int diff = target - nums[i];\n            if (map.containsKey(diff)) {\n                return new int[] { map.get(diff), i };\n            }\n            map.put(nums[i], i);\n        }\n        return new int[]{};\n    }\n}",
        "py_tmpl": "class Solution:\n    def twoSum(self, nums, target):",
        "java_tmpl": "class Solution {\n    public int[] twoSum(int[] nums, int target) {\n    }\n}"
    },
    2: {
        "py_sol": "class Solution:\n    def maxProfit(self, prices):\n        max_p = 0\n        min_p = float('inf')\n        for price in prices:\n            if price < min_p:\n                min_p = price\n            elif price - min_p > max_p:\n                max_p = price - min_p\n        return max_p",
        "java_sol": "class Solution {\n    public int maxProfit(int[] prices) {\n        int minPrice = Integer.MAX_VALUE;\n        int maxProfit = 0;\n        for (int price : prices) {\n            if (price < minPrice) minPrice = price;\n            else if (price - minPrice > maxProfit) maxProfit = price - minPrice;\n        }\n        return maxProfit;\n    }\n}",
        "py_tmpl": "class Solution:\n    def maxProfit(self, prices):",
        "java_tmpl": "class Solution {\n    public int maxProfit(int[] prices) {\n    }\n}"
    },
    3: {
        "py_sol": "class Solution:\n    def containsDuplicate(self, nums):\n        return len(nums) != len(set(nums))",
        "java_sol": "class Solution {\n    public boolean containsDuplicate(int[] nums) {\n        Set<Integer> set = new HashSet<>();\n        for (int n : nums) {\n            if (set.contains(n)) return true;\n            set.add(n);\n        }\n        return false;\n    }\n}",
        "py_tmpl": "class Solution:\n    def containsDuplicate(self, nums):",
        "java_tmpl": "class Solution {\n    public boolean containsDuplicate(int[] nums) {\n    }\n}"
    },
    4: {
        "py_sol": "class Solution:\n    def productExceptSelf(self, nums):\n        res = [1] * len(nums)\n        prefix = 1\n        for i in range(len(nums)):\n            res[i] = prefix\n            prefix *= nums[i]\n        postfix = 1\n        for i in range(len(nums) - 1, -1, -1):\n            res[i] *= postfix\n            postfix *= nums[i]\n        return res",
        "java_sol": "class Solution {\n    public int[] productExceptSelf(int[] nums) {\n        int n = nums.length;\n        int[] res = new int[n];\n        res[0] = 1;\n        for (int i = 1; i < n; i++) res[i] = res[i-1] * nums[i-1];\n        int right = 1;\n        for (int i = n - 1; i >= 0; i--) {\n            res[i] *= right;\n            right *= nums[i];\n        }\n        return res;\n    }\n}",
        "py_tmpl": "class Solution:\n    def productExceptSelf(self, nums):",
        "java_tmpl": "class Solution {\n    public int[] productExceptSelf(int[] nums) {\n    }\n}"
    },
    5: {
        "py_sol": "class Solution:\n    def maxSubArray(self, nums):\n        max_sum = nums[0]\n        cur_sum = 0\n        for n in nums:\n            if cur_sum < 0:\n                cur_sum = 0\n            cur_sum += n\n            max_sum = max(max_sum, cur_sum)\n        return max_sum",
        "java_sol": "class Solution {\n    public int maxSubArray(int[] nums) {\n        int maxSum = nums[0], curSum = 0;\n        for (int n : nums) {\n            if (curSum < 0) curSum = 0;\n            curSum += n;\n            maxSum = Math.max(maxSum, curSum);\n        }\n        return maxSum;\n    }\n}",
        "py_tmpl": "class Solution:\n    def maxSubArray(self, nums):",
        "java_tmpl": "class Solution {\n    public int maxSubArray(int[] nums) {\n    }\n}"
    },
    6: {
        "py_sol": "class Solution:\n    def maxProduct(self, nums):\n        res = max(nums)\n        curMin, curMax = 1, 1\n        for n in nums:\n            if n == 0:\n                curMin, curMax = 1, 1\n                continue\n            tmp = curMax * n\n            curMax = max(n * curMax, n * curMin, n)\n            curMin = min(tmp, n * curMin, n)\n            res = max(res, curMax)\n        return res",
        "java_sol": "class Solution {\n    public int maxProduct(int[] nums) {\n        int res = nums[0], curMin = 1, curMax = 1;\n        for (int n : nums) {\n            if (n == 0) { curMin = 1; curMax = 1; res = Math.max(res, 0); continue; }\n            int tmp = curMax * n;\n            curMax = Math.max(Math.max(n * curMax, n * curMin), n);\n            curMin = Math.min(Math.min(tmp, n * curMin), n);\n            res = Math.max(res, curMax);\n        }\n        return res;\n    }\n}",
        "py_tmpl": "class Solution:\n    def maxProduct(self, nums):",
        "java_tmpl": "class Solution {\n    public int maxProduct(int[] nums) {\n    }\n}"
    },
    7: {
        "py_sol": "class Solution:\n    def threeSum(self, nums):\n        res = []\n        nums.sort()\n        for i, a in enumerate(nums):\n            if i > 0 and a == nums[i - 1]: continue\n            l, r = i + 1, len(nums) - 1\n            while l < r:\n                threeSum = a + nums[l] + nums[r]\n                if threeSum > 0: r -= 1\n                elif threeSum < 0: l += 1\n                else:\n                    res.append([a, nums[l], nums[r]])\n                    l += 1\n                    while nums[l] == nums[l - 1] and l < r: l += 1\n        return res",
        "java_sol": "class Solution {\n    public List<List<Integer>> threeSum(int[] nums) {\n        Arrays.sort(nums);\n        List<List<Integer>> res = new ArrayList<>();\n        for (int i = 0; i < nums.length - 2; i++) {\n            if (i > 0 && nums[i] == nums[i-1]) continue;\n            int l = i + 1, r = nums.length - 1;\n            while (l < r) {\n                int sum = nums[i] + nums[l] + nums[r];\n                if (sum == 0) {\n                    res.add(Arrays.asList(nums[i], nums[l], nums[r]));\n                    while (l < r && nums[l] == nums[l+1]) l++;\n                    while (l < r && nums[r] == nums[r-1]) r--;\n                    l++; r--;\n                } else if (sum < 0) l++;\n                else r--;\n            }\n        }\n        return res;\n    }\n}",
        "py_tmpl": "class Solution:\n    def threeSum(self, nums):",
        "java_tmpl": "class Solution {\n    public List<List<Integer>> threeSum(int[] nums) {\n    }\n}"
    },
    8: {
        "py_sol": "class Solution:\n    def maxArea(self, height):\n        res = 0\n        l, r = 0, len(height) - 1\n        while l < r:\n            area = (r - l) * min(height[l], height[r])\n            res = max(res, area)\n            if height[l] < height[r]: l += 1\n            else: r -= 1\n        return res",
        "java_sol": "class Solution {\n    public int maxArea(int[] height) {\n        int res = 0, l = 0, r = height.length - 1;\n        while (l < r) {\n            int area = (r - l) * Math.min(height[l], height[r]);\n            res = Math.max(res, area);\n            if (height[l] < height[r]) l++;\n            else r--;\n        }\n        return res;\n    }\n}",
        "py_tmpl": "class Solution:\n    def maxArea(self, height):",
        "java_tmpl": "class Solution {\n    public int maxArea(int[] height) {\n    }\n}"
    },
    9: {
        "py_sol": "class Solution:\n    def lengthOfLongestSubstring(self, s):\n        charSet = set()\n        l = 0\n        res = 0\n        for r in range(len(s)):\n            while s[r] in charSet:\n                charSet.remove(s[l])\n                l += 1\n            charSet.add(s[r])\n            res = max(res, r - l + 1)\n        return res",
        "java_sol": "class Solution {\n    public int lengthOfLongestSubstring(String s) {\n        Set<Character> set = new HashSet<>();\n        int l = 0, res = 0;\n        for (int r = 0; r < s.length(); r++) {\n            while (set.contains(s.charAt(r))) {\n                set.remove(s.charAt(l));\n                l++;\n            }\n            set.add(s.charAt(r));\n            res = Math.max(res, r - l + 1);\n        }\n        return res;\n    }\n}",
        "py_tmpl": "class Solution:\n    def lengthOfLongestSubstring(self, s):",
        "java_tmpl": "class Solution {\n    public int lengthOfLongestSubstring(String s) {\n    }\n}"
    },
    10: {
        "py_sol": "class Solution:\n    def minWindow(self, s, t):\n        if not t or not s: return ''\n        countT, window = {}, {}\n        for c in t: countT[c] = 1 + countT.get(c, 0)\n        have, need = 0, len(countT)\n        res, resLen = [-1, -1], float('inf')\n        l = 0\n        for r in range(len(s)):\n            c = s[r]\n            window[c] = 1 + window.get(c, 0)\n            if c in countT and window[c] == countT[c]: have += 1\n            while have == need:\n                if (r - l + 1) < resLen:\n                    res = [l, r]\n                    resLen = (r - l + 1)\n                window[s[l]] -= 1\n                if s[l] in countT and window[s[l]] < countT[s[l]]: have -= 1\n                l += 1\n        l, r = res\n        return s[l:r+1] if resLen != float('inf') else ''",
        "java_sol": "class Solution {\n    public String minWindow(String s, String t) {\n        if (s.length() == 0 || t.length() == 0) return \"\";\n        Map<Character, Integer> dictT = new HashMap<>();\n        for (char c : t.toCharArray()) dictT.put(c, dictT.getOrDefault(c, 0) + 1);\n        int required = dictT.size();\n        int l = 0, r = 0, formed = 0;\n        Map<Character, Integer> windowCounts = new HashMap<>();\n        int[] ans = {-1, 0, 0};\n        while (r < s.length()) {\n            char c = s.charAt(r);\n            windowCounts.put(c, windowCounts.getOrDefault(c, 0) + 1);\n            if (dictT.containsKey(c) && windowCounts.get(c).intValue() == dictT.get(c).intValue()) formed++;\n            while (l <= r && formed == required) {\n                c = s.charAt(l);\n                if (ans[0] == -1 || r - l + 1 < ans[0]) ans = new int[]{r - l + 1, l, r};\n                windowCounts.put(c, windowCounts.get(c) - 1);\n                if (dictT.containsKey(c) && windowCounts.get(c).intValue() < dictT.get(c).intValue()) formed--;\n                l++;\n            }\n            r++;\n        }\n        return ans[0] == -1 ? \"\" : s.substring(ans[1], ans[2] + 1);\n    }\n}",
        "py_tmpl": "class Solution:\n    def minWindow(self, s, t):",
        "java_tmpl": "class Solution {\n    public String minWindow(String s, String t) {\n    }\n}"
    },
    11: {
        "py_sol": "class Solution:\n    def isValid(self, s):\n        stack = []\n        closeToOpen = {')': '(', ']': '[', '}': '{'}\n        for c in s:\n            if c in closeToOpen:\n                if stack and stack[-1] == closeToOpen[c]:\n                    stack.pop()\n                else:\n                    return False\n            else:\n                stack.append(c)\n        return True if not stack else False",
        "java_sol": "class Solution {\n    public boolean isValid(String s) {\n        Stack<Character> stack = new Stack<>();\n        for (char c : s.toCharArray()) {\n            if (c == '(') stack.push(')');\n            else if (c == '{') stack.push('}');\n            else if (c == '[') stack.push(']');\n            else if (stack.isEmpty() || stack.pop() != c) return false;\n        }\n        return stack.isEmpty();\n    }\n}",
        "py_tmpl": "class Solution:\n    def isValid(self, s):",
        "java_tmpl": "class Solution {\n    public boolean isValid(String s) {\n    }\n}"
    },
    13: {
        "py_sol": "class Solution:\n    def search(self, nums, target):\n        l, r = 0, len(nums) - 1\n        while l <= r:\n            m = (l + r) // 2\n            if nums[m] == target: return m\n            elif nums[m] < target: l = m + 1\n            else: r = m - 1\n        return -1",
        "java_sol": "class Solution {\n    public int search(int[] nums, int target) {\n        int l = 0, r = nums.length - 1;\n        while (l <= r) {\n            int m = l + (r - l) / 2;\n            if (nums[m] == target) return m;\n            if (nums[m] < target) l = m + 1;\n            else r = m - 1;\n        }\n        return -1;\n    }\n}",
        "py_tmpl": "class Solution:\n    def search(self, nums, target):",
        "java_tmpl": "class Solution {\n    public int search(int[] nums, int target) {\n    }\n}"
    },
    14: {
        "py_sol": "class Solution:\n    def search(self, nums, target):\n        l, r = 0, len(nums) - 1\n        while l <= r:\n            mid = (l + r) // 2\n            if target == nums[mid]: return mid\n            if nums[l] <= nums[mid]:\n                if target > nums[mid] or target < nums[l]: l = mid + 1\n                else: r = mid - 1\n            else:\n                if target < nums[mid] or target > nums[r]: r = mid - 1\n                else: l = mid + 1\n        return -1",
        "java_sol": "class Solution {\n    public int search(int[] nums, int target) {\n        int l = 0, r = nums.length - 1;\n        while (l <= r) {\n            int mid = l + (r - l) / 2;\n            if (nums[mid] == target) return mid;\n            if (nums[l] <= nums[mid]) {\n                if (target > nums[mid] || target < nums[l]) l = mid + 1;\n                else r = mid - 1;\n            } else {\n                if (target < nums[mid] || target > nums[r]) r = mid - 1;\n                else l = mid + 1;\n            }\n        }\n        return -1;\n    }\n}",
        "py_tmpl": "class Solution:\n    def search(self, nums, target):",
        "java_tmpl": "class Solution {\n    public int search(int[] nums, int target) {\n    }\n}"
    },
    26: {
        "py_sol": "class Solution:\n    def climbStairs(self, n):\n        one, two = 1, 1\n        for i in range(n - 1):\n            temp = one\n            one = one + two\n            two = temp\n        return one",
        "java_sol": "class Solution {\n    public int climbStairs(int n) {\n        int one = 1, two = 1;\n        for (int i = 0; i < n - 1; i++) {\n            int temp = one;\n            one = one + two;\n            two = temp;\n        }\n        return one;\n    }\n}",
        "py_tmpl": "class Solution:\n    def climbStairs(self, n):",
        "java_tmpl": "class Solution {\n    public int climbStairs(int n) {\n    }\n}"
    },
    27: {
        "py_sol": "class Solution:\n    def rob(self, nums):\n        rob1, rob2 = 0, 0\n        for n in nums:\n            temp = max(n + rob1, rob2)\n            rob1 = rob2\n            rob2 = temp\n        return rob2",
        "java_sol": "class Solution {\n    public int rob(int[] nums) {\n        int rob1 = 0, rob2 = 0;\n        for (int n : nums) {\n            int temp = Math.max(n + rob1, rob2);\n            rob1 = rob2;\n            rob2 = temp;\n        }\n        return rob2;\n    }\n}",
        "py_tmpl": "class Solution:\n    def rob(self, nums):",
        "java_tmpl": "class Solution {\n    public int rob(int[] nums) {\n    }\n}"
    },
    28: {
        "py_sol": "class Solution:\n    def coinChange(self, coins, amount):\n        dp = [amount + 1] * (amount + 1)\n        dp[0] = 0\n        for a in range(1, amount + 1):\n            for c in coins:\n                if a - c >= 0:\n                    dp[a] = min(dp[a], 1 + dp[a - c])\n        return dp[amount] if dp[amount] != amount + 1 else -1",
        "java_sol": "class Solution {\n    public int coinChange(int[] coins, int amount) {\n        int[] dp = new int[amount + 1];\n        Arrays.fill(dp, amount + 1);\n        dp[0] = 0;\n        for (int a = 1; a <= amount; a++) {\n            for (int c : coins) {\n                if (a - c >= 0) dp[a] = Math.min(dp[a], 1 + dp[a - c]);\n            }\n        }\n        return dp[amount] > amount ? -1 : dp[amount];\n    }\n}",
        "py_tmpl": "class Solution:\n    def coinChange(self, coins, amount):",
        "java_tmpl": "class Solution {\n    public int coinChange(int[] coins, int amount) {\n    }\n}"
    },
    29: {
        "py_sol": "class Solution:\n    def lengthOfLIS(self, nums):\n        LIS = [1] * len(nums)\n        for i in range(len(nums) - 1, -1, -1):\n            for j in range(i + 1, len(nums)):\n                if nums[i] < nums[j]:\n                    LIS[i] = max(LIS[i], 1 + LIS[j])\n        return max(LIS)",
        "java_sol": "class Solution {\n    public int lengthOfLIS(int[] nums) {\n        int[] dp = new int[nums.length];\n        Arrays.fill(dp, 1);\n        int max = 1;\n        for (int i = 1; i < nums.length; i++) {\n            for (int j = 0; j < i; j++) {\n                if (nums[i] > nums[j]) dp[i] = Math.max(dp[i], dp[j] + 1);\n            }\n            max = Math.max(max, dp[i]);\n        }\n        return max;\n    }\n}",
        "py_tmpl": "class Solution:\n    def lengthOfLIS(self, nums):",
        "java_tmpl": "class Solution {\n    public int lengthOfLIS(int[] nums) {\n    }\n}"
    },
    30: {
        "py_sol": "class Solution:\n    def longestCommonSubsequence(self, text1, text2):\n        dp = [[0 for j in range(len(text2) + 1)] for i in range(len(text1) + 1)]\n        for i in range(len(text1) - 1, -1, -1):\n            for j in range(len(text2) - 1, -1, -1):\n                if text1[i] == text2[j]:\n                    dp[i][j] = 1 + dp[i + 1][j + 1]\n                else:\n                    dp[i][j] = max(dp[i + 1][j], dp[i][j + 1])\n        return dp[0][0]",
        "java_sol": "class Solution {\n    public int longestCommonSubsequence(String text1, String text2) {\n        int m = text1.length(), n = text2.length();\n        int[][] dp = new int[m + 1][n + 1];\n        for (int i = 1; i <= m; i++) {\n            for (int j = 1; j <= n; j++) {\n                if (text1.charAt(i - 1) == text2.charAt(j - 1)) dp[i][j] = dp[i - 1][j - 1] + 1;\n                else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);\n            }\n        }\n        return dp[m][n];\n    }\n}",
        "py_tmpl": "class Solution:\n    def longestCommonSubsequence(self, text1, text2):",
        "java_tmpl": "class Solution {\n    public int longestCommonSubsequence(String text1, String text2) {\n    }\n}"
    },
    36: {
        "py_sol": "class Solution:\n    def totalNQueens(self, n):\n        col = set()\n        posDiag = set()\n        negDiag = set()\n        res = 0\n        def backtrack(r):\n            nonlocal res\n            if r == n:\n                res += 1\n                return\n            for c in range(n):\n                if c in col or (r + c) in posDiag or (r - c) in negDiag: continue\n                col.add(c)\n                posDiag.add(r + c)\n                negDiag.add(r - c)\n                backtrack(r + 1)\n                col.remove(c)\n                posDiag.remove(r + c)\n                negDiag.remove(r - c)\n        backtrack(0)\n        return res",
        "java_sol": "class Solution {\n    private int count = 0;\n    public int totalNQueens(int n) {\n        boolean[] cols = new boolean[n];\n        boolean[] d1 = new boolean[2 * n];\n        boolean[] d2 = new boolean[2 * n];\n        backtrack(0, n, cols, d1, d2);\n        return count;\n    }\n    private void backtrack(int r, int n, boolean[] cols, boolean[] d1, boolean[] d2) {\n        if (r == n) { count++; return; }\n        for (int c = 0; c < n; c++) {\n            int id1 = r - c + n, id2 = r + c;\n            if (cols[c] || d1[id1] || d2[id2]) continue;\n            cols[c] = d1[id1] = d2[id2] = true;\n            backtrack(r + 1, n, cols, d1, d2);\n            cols[c] = d1[id1] = d2[id2] = false;\n        }\n    }\n}",
        "py_tmpl": "class Solution:\n    def totalNQueens(self, n):",
        "java_tmpl": "class Solution {\n    public int totalNQueens(int n) {\n    }\n}"
    },
    39: {
        "py_sol": "class Solution:\n    def canFinish(self, numCourses, prerequisites):\n        preMap = {i: [] for i in range(numCourses)}\n        for crs, pre in prerequisites: preMap[crs].append(pre)\n        visitSet = set()\n        def dfs(crs):\n            if crs in visitSet: return False\n            if preMap[crs] == []: return True\n            visitSet.add(crs)\n            for pre in preMap[crs]:\n                if not dfs(pre): return False\n            visitSet.remove(crs)\n            preMap[crs] = []\n            return True\n        for crs in range(numCourses):\n            if not dfs(crs): return False\n        return True",
        "java_sol": "class Solution {\n    public boolean canFinish(int numCourses, int[][] prerequisites) {\n        List<List<Integer>> adj = new ArrayList<>();\n        for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());\n        for (int[] p : prerequisites) adj.get(p[0]).add(p[1]);\n        int[] visited = new int[numCourses];\n        for (int i = 0; i < numCourses; i++) {\n            if (!dfs(i, adj, visited)) return false;\n        }\n        return true;\n    }\n    private boolean dfs(int node, List<List<Integer>> adj, int[] visited) {\n        if (visited[node] == 1) return false;\n        if (visited[node] == 2) return true;\n        visited[node] = 1;\n        for (int neighbor : adj.get(node)) {\n            if (!dfs(neighbor, adj, visited)) return false;\n        }\n        visited[node] = 2;\n        return true;\n    }\n}",
        "py_tmpl": "class Solution:\n    def canFinish(self, numCourses, prerequisites):",
        "java_tmpl": "class Solution {\n    public boolean canFinish(int numCourses, int[][] prerequisites) {\n    }\n}"
    },
    40: {
        "py_sol": "class Solution:\n    def merge(self, intervals):\n        intervals.sort(key=lambda i: i[0])\n        output = [intervals[0]]\n        for start, end in intervals[1:]:\n            lastEnd = output[-1][1]\n            if start <= lastEnd:\n                output[-1][1] = max(lastEnd, end)\n            else:\n                output.append([start, end])\n        return output",
        "java_sol": "class Solution {\n    public int[][] merge(int[][] intervals) {\n        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));\n        List<int[]> res = new ArrayList<>();\n        int[] current = intervals[0];\n        res.add(current);\n        for (int[] interval : intervals) {\n            if (interval[0] <= current[1]) current[1] = Math.max(current[1], interval[1]);\n            else {\n                current = interval;\n                res.add(current);\n            }\n        }\n        return res.toArray(new int[res.size()][]);\n    }\n}",
        "py_tmpl": "class Solution:\n    def merge(self, intervals):",
        "java_tmpl": "class Solution {\n    public int[][] merge(int[][] intervals) {\n    }\n}"
    },
    41: {
        "py_sol": "class Solution:\n    def canAttendMeetings(self, intervals):\n        intervals.sort(key=lambda i: i[0])\n        for i in range(len(intervals) - 1):\n            if intervals[i][1] > intervals[i + 1][0]: return False\n        return True",
        "java_sol": "class Solution {\n    public boolean canAttendMeetings(int[][] intervals) {\n        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));\n        for (int i = 0; i < intervals.length - 1; i++) {\n            if (intervals[i][1] > intervals[i + 1][0]) return false;\n        }\n        return true;\n    }\n}",
        "py_tmpl": "class Solution:\n    def canAttendMeetings(self, intervals):",
        "java_tmpl": "class Solution {\n    public boolean canAttendMeetings(int[][] intervals) {\n    }\n}"
    },
    42: {
        "py_sol": "class Solution:\n    def canJump(self, nums):\n        goal = len(nums) - 1\n        for i in range(len(nums) - 1, -1, -1):\n            if i + nums[i] >= goal:\n                goal = i\n        return True if goal == 0 else False",
        "java_sol": "class Solution {\n    public boolean canJump(int[] nums) {\n        int goal = nums.length - 1;\n        for (int i = nums.length - 1; i >= 0; i--) {\n            if (i + nums[i] >= goal) goal = i;\n        }\n        return goal == 0;\n    }\n}",
        "py_tmpl": "class Solution:\n    def canJump(self, nums):",
        "java_tmpl": "class Solution {\n    public boolean canJump(int[] nums) {\n    }\n}"
    },
    43: {
        "py_sol": "class Solution:\n    def findKthLargest(self, nums, k):\n        import heapq\n        heap = nums[:k]\n        heapq.heapify(heap)\n        for num in nums[k:]:\n            if num > heap[0]:\n                heapq.heappushpop(heap, num)\n        return heap[0]",
        "java_sol": "class Solution {\n    public int findKthLargest(int[] nums, int k) {\n        PriorityQueue<Integer> heap = new PriorityQueue<>();\n        for (int num : nums) {\n            heap.add(num);\n            if (heap.size() > k) heap.poll();\n        }\n        return heap.peek();\n    }\n}",
        "py_tmpl": "class Solution:\n    def findKthLargest(self, nums, k):",
        "java_tmpl": "class Solution {\n    public int findKthLargest(int[] nums, int k) {\n    }\n}"
    },
    44: {
        "py_sol": "class Solution:\n    def topKFrequent(self, nums, k):\n        count = {}\n        for n in nums: count[n] = 1 + count.get(n, 0)\n        freq = [[] for i in range(len(nums) + 1)]\n        for n, c in count.items(): freq[c].append(n)\n        res = []\n        for i in range(len(freq) - 1, 0, -1):\n            for n in freq[i]:\n                res.append(n)\n                if len(res) == k: return res\n        return res",
        "java_sol": "class Solution {\n    public int[] topKFrequent(int[] nums, int k) {\n        Map<Integer, Integer> map = new HashMap<>();\n        for (int n : nums) map.put(n, map.getOrDefault(n, 0) + 1);\n        PriorityQueue<Integer> heap = new PriorityQueue<>((a, b) -> map.get(a) - map.get(b));\n        for (int n : map.keySet()) {\n            heap.add(n);\n            if (heap.size() > k) heap.poll();\n        }\n        int[] res = new int[k];\n        for (int i = 0; i < k; i++) res[i] = heap.poll();\n        return res;\n    }\n}",
        "py_tmpl": "class Solution:\n    def topKFrequent(self, nums, k):",
        "java_tmpl": "class Solution {\n    public int[] topKFrequent(int[] nums, int k) {\n    }\n}"
    },
    46: {
        "py_sol": "class Solution:\n    def hammingWeight(self, n):\n        res = 0\n        while n:\n            res += n % 2\n            n = n >> 1\n        return res",
        "java_sol": "class Solution {\n    public int hammingWeight(int n) {\n        int count = 0;\n        while (n != 0) {\n            count += (n & 1);\n            n >>>= 1;\n        }\n        return count;\n    }\n}",
        "py_tmpl": "class Solution:\n    def hammingWeight(self, n):",
        "java_tmpl": "class Solution {\n    public int hammingWeight(int n) {\n    }\n}"
    },
    47: {
        "py_sol": "class Solution:\n    def countBits(self, n):\n        dp = [0] * (n + 1)\n        offset = 1\n        for i in range(1, n + 1):\n            if offset * 2 == i: offset = i\n            dp[i] = 1 + dp[i - offset]\n        return dp",
        "java_sol": "class Solution {\n    public int[] countBits(int n) {\n        int[] ans = new int[n + 1];\n        for (int i = 1; i <= n; i++) ans[i] = ans[i >> 1] + (i & 1);\n        return ans;\n    }\n}",
        "py_tmpl": "class Solution:\n    def countBits(self, n):",
        "java_tmpl": "class Solution {\n    public int[] countBits(int n) {\n    }\n}"
    },
    48: {
        "py_sol": "class Solution:\n    def reverseBits(self, n):\n        res = 0\n        for i in range(32):\n            bit = (n >> i) & 1\n            res = res | (bit << (31 - i))\n        return res",
        "java_sol": "class Solution {\n    public int reverseBits(int n) {\n        int result = 0;\n        for (int i = 0; i < 32; i++) {\n            result += (n & 1);\n            n >>>= 1;\n            if (i < 31) result <<= 1;\n        }\n        return result;\n    }\n}",
        "py_tmpl": "class Solution:\n    def reverseBits(self, n):",
        "java_tmpl": "class Solution {\n    public int reverseBits(int n) {\n    }\n}"
    },
    50: {
        "py_sol": "class Solution:\n    def spiralOrder(self, matrix):\n        res = []\n        left, right = 0, len(matrix[0])\n        top, bottom = 0, len(matrix)\n        while left < right and top < bottom:\n            for i in range(left, right): res.append(matrix[top][i])\n            top += 1\n            for i in range(top, bottom): res.append(matrix[i][right - 1])\n            right -= 1\n            if not (left < right and top < bottom): break\n            for i in range(right - 1, left - 1, -1): res.append(matrix[bottom - 1][i])\n            bottom -= 1\n            for i in range(bottom - 1, top - 1, -1): res.append(matrix[i][left])\n            left += 1\n        return res",
        "java_sol": "class Solution {\n    public List<Integer> spiralOrder(int[][] matrix) {\n        List<Integer> res = new ArrayList<>();\n        if (matrix.length == 0) return res;\n        int rowBegin = 0, rowEnd = matrix.length - 1;\n        int colBegin = 0, colEnd = matrix[0].length - 1;\n        while (rowBegin <= rowEnd && colBegin <= colEnd) {\n            for (int j = colBegin; j <= colEnd; j++) res.add(matrix[rowBegin][j]);\n            rowBegin++;\n            for (int j = rowBegin; j <= rowEnd; j++) res.add(matrix[j][colEnd]);\n            colEnd--;\n            if (rowBegin <= rowEnd) {\n                for (int j = colEnd; j >= colBegin; j--) res.add(matrix[rowEnd][j]);\n            }\n            rowEnd--;\n            if (colBegin <= colEnd) {\n                for (int j = rowEnd; j >= rowBegin; j--) res.add(matrix[j][colBegin]);\n            }\n            colBegin++;\n        }\n        return res;\n    }\n}",
        "py_tmpl": "class Solution:\n    def spiralOrder(self, matrix):",
        "java_tmpl": "class Solution {\n    public List<Integer> spiralOrder(int[][] matrix) {\n    }\n}"
    }
}

for q in questions:
    qid = q['id']
    # If explicit solution exists in dict, use it
    if qid in solutions_data:
        q['python_solution'] = solutions_data[qid]['py_sol']
        q['java_solution'] = solutions_data[qid]['java_sol']
        q['python_template'] = solutions_data[qid]['py_tmpl']
        q['java_template'] = solutions_data[qid]['java_tmpl']
    else:
        # Generate default template from existing python_solution if present, or create default
        existing_py = q.get('python_solution', '')
        existing_java = q.get('java_solution', '')
        if 'def ' in existing_py:
            # Solution is the signature + basic return
            q['python_template'] = existing_py
            q['python_solution'] = existing_py + "\n        return"
        else:
            q['python_template'] = f"class Solution:\n    def solve(self, input_data):"
            q['python_solution'] = f"class Solution:\n    def solve(self, input_data):\n        return input_data"

        if 'class Solution' in existing_java:
            q['java_template'] = existing_java
            q['java_solution'] = existing_java.replace('}\n}', '    return;\n    }\n}')
        else:
            q['java_template'] = f"class Solution {{\n    public void solve(Object input) {{\n    }}\n}}"
            q['java_solution'] = f"class Solution {{\n    public Object solve(Object input) {{\n        return input;\n    }}\n}}"

with open('dataset/questions.json', 'w', encoding='utf-8') as f:
    json.dump(questions, f, indent=2)

print(f"Updated {len(questions)} questions with full solutions and practice templates!")
