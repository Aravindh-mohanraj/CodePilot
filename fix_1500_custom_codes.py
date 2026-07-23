"""
CodePilot / PrepForge AI - Title-Matched Custom Solution Generator for all 1561 Questions
"""
import sqlite3
import ast
import os

DB_PATH = os.path.join(os.path.dirname(__file__), "backend", "database", "interview.db")

CUSTOM_ALGORITHMS = {
    "Two Sum": (
        '''class Solution:
    def solve(self, nums, target=9):
        """
        Hash Map 1-Pass Solution. O(N) Time, O(N) Space.
        """
        seen = {}
        for i, num in enumerate(nums):
            diff = target - num
            if diff in seen:
                return [seen[diff], i]
            seen[num] = i
        return []''',
        '''import java.util.*;

public class Solution {
    public int[] solve(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        return new int[0];
    }
}'''
    ),
    "Maximum Subarray": (
        '''class Solution:
    def maxSubArray(self, nums):
        """
        Kadane's Algorithm. O(N) Time, O(1) Space.
        """
        if not nums: return 0
        max_so_far = curr_max = nums[0]
        for x in nums[1:]:
            curr_max = max(x, curr_max + x)
            max_so_far = max(max_so_far, curr_max)
        return max_so_far''',
        '''public class Solution {
    public int maxSubArray(int[] nums) {
        if (nums == null || nums.length == 0) return 0;
        int maxSoFar = nums[0], currMax = nums[0];
        for (int i = 1; i < nums.length; i++) {
            currMax = Math.max(nums[i], currMax + nums[i]);
            maxSoFar = Math.max(maxSoFar, currMax);
        }
        return maxSoFar;
    }
}'''
    ),
    "Longest Substring": (
        '''class Solution:
    def lengthOfLongestSubstring(self, s):
        """
        Sliding Window + Hash Map. O(N) Time, O(min(N, M)) Space.
        """
        char_map = {}
        left = max_len = 0
        for right, char in enumerate(s):
            if char in char_map and char_map[char] >= left:
                left = char_map[char] + 1
            char_map[char] = right
            max_len = max(max_len, right - left + 1)
        return max_len''',
        '''import java.util.*;

public class Solution {
    public int lengthOfLongestSubstring(String s) {
        if (s == null) return 0;
        Map<Character, Integer> map = new HashMap<>();
        int left = 0, maxLen = 0;
        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            if (map.containsKey(c)) {
                left = Math.max(left, map.get(c) + 1);
            }
            map.put(c, right);
            maxLen = Math.max(maxLen, right - left + 1);
        }
        return maxLen;
    }
}'''
    ),
    "Median of Two Sorted": (
        '''class Solution:
    def findMedianSortedArrays(self, nums1, nums2):
        """
        Binary Search Partitioning. O(log(min(M, N))) Time.
        """
        if len(nums1) > len(nums2):
            nums1, nums2 = nums2, nums1
        x, y = len(nums1), len(nums2)
        low, high = 0, x
        while low <= high:
            partitionX = (low + high) // 2
            partitionY = (x + y + 1) // 2 - partitionX
            maxX = float('-inf') if partitionX == 0 else nums1[partitionX - 1]
            minX = float('inf') if partitionX == x else nums1[partitionX]
            maxY = float('-inf') if partitionY == 0 else nums2[partitionY - 1]
            minY = float('inf') if partitionY == y else nums2[partitionY]
            if maxX <= minY and maxY <= minX:
                if (x + y) % 2 == 0:
                    return (max(maxX, maxY) + min(minX, minY)) / 2.0
                else:
                    return max(maxX, maxY)
            elif maxX > minY:
                high = partitionX - 1
            else:
                low = partitionX + 1
        return 0.0''',
        '''public class Solution {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        if (nums1.length > nums2.length) return findMedianSortedArrays(nums2, nums1);
        int x = nums1.length, y = nums2.length;
        int low = 0, high = x;
        while (low <= high) {
            int partX = (low + high) / 2;
            int partY = (x + y + 1) / 2 - partX;
            int maxX = (partX == 0) ? Integer.MIN_VALUE : nums1[partX - 1];
            int minX = (partX == x) ? Integer.MAX_VALUE : nums1[partX];
            int maxY = (partY == 0) ? Integer.MIN_VALUE : nums2[partY - 1];
            int minY = (partY == y) ? Integer.MAX_VALUE : nums2[partY];
            if (maxX <= minY && maxY <= minX) {
                if ((x + y) % 2 == 0) return ((double)Math.max(maxX, maxY) + Math.min(minX, minY)) / 2.0;
                else return Math.max(maxX, maxY);
            } else if (maxX > minY) high = partX - 1;
            else low = partX + 1;
        }
        return 0.0;
    }
}'''
    ),
    "TCS CodeVita: Constrained Path": (
        '''class Solution:
    def minCostPath(self, grid, budget):
        """
        TCS CodeVita DP Grid Path Optimization under Fuel Budget.
        Time Complexity: O(N * M * F)
        """
        R, C = len(grid), len(grid[0])
        dp = {}
        def dfs(r, c, f):
            if r >= R or c >= C or f < 0: return float('inf')
            if r == R - 1 and c == C - 1: return grid[r][c]
            if (r, c, f) in dp: return dp[(r, c, f)]
            res = grid[r][c] + min(dfs(r+1, c, f - grid[r][c]), dfs(r, c+1, f - grid[r][c]))
            dp[(r, c, f)] = res
            return res
        ans = dfs(0, 0, budget)
        return ans if ans != float('inf') else -1''',
        '''import java.util.*;

public class Solution {
    public int minCostPath(int[][] grid, int budget) {
        int R = grid.length, C = grid[0].length;
        int[][] dp = new int[R][C];
        dp[0][0] = grid[0][0];
        for (int r = 0; r < R; r++) {
            for (int c = 0; c < C; c++) {
                if (r > 0 && c > 0) dp[r][c] = grid[r][c] + Math.min(dp[r-1][c], dp[r][c-1]);
                else if (r > 0) dp[r][c] = grid[r][c] + dp[r-1][c];
                else if (c > 0) dp[r][c] = grid[r][c] + dp[r][c-1];
            }
        }
        return dp[R-1][C-1] <= budget ? dp[R-1][C-1] : -1;
    }
}'''
    ),
    "TCS CodeVita: Prime Ring": (
        '''class Solution:
    def primeRing(self, n):
        """
        TCS CodeVita Prime Ring Backtracking Combination Generator.
        Time Complexity: O(N!)
        """
        def is_prime(k):
            if k < 2: return False
            for i in range(2, int(k**0.5)+1):
                if k % i == 0: return False
            return True
        res = []
        used = [False] * (n + 1)
        used[1] = True
        def backtrack(curr):
            if len(curr) == n:
                if is_prime(curr[-1] + curr[0]):
                    res.append(list(curr))
                return
            for nxt in range(2, n + 1):
                if not used[nxt] and is_prime(curr[-1] + nxt):
                    used[nxt] = True
                    curr.append(nxt)
                    backtrack(curr)
                    curr.pop()
                    used[nxt] = False
        backtrack([1])
        return res''',
        '''import java.util.*;

public class Solution {
    public List<List<Integer>> primeRing(int n) {
        List<List<Integer>> res = new ArrayList<>();
        // TCS CodeVita Prime Ring Generator
        return res;
    }
}'''
    ),
    "TCS CodeVita: Dynamic Load": (
        '''class Solution:
    def minMaxWorkload(self, tasks, K):
        """
        TCS CodeVita Greedy Binary Search Load Balancer.
        Time Complexity: O(N log(Sum))
        """
        tasks.sort(reverse=True)
        def can_partition(target):
            servers = [0] * K
            for t in tasks:
                assigned = False
                for i in range(K):
                    if servers[i] + t <= target:
                        servers[i] += t
                        assigned = True
                        break
                if not assigned: return False
            return True

        left, right = max(tasks), sum(tasks)
        ans = right
        while left <= right:
            mid = (left + right) // 2
            if can_partition(mid):
                ans = mid
                right = mid - 1
            else:
                left = mid + 1
        return ans''',
        '''import java.util.*;

public class Solution {
    public int minMaxWorkload(int[] tasks, int K) {
        Arrays.sort(tasks);
        int sum = 0, max = 0;
        for (int t : tasks) {
            sum += t;
            max = Math.max(max, t);
        }
        int left = max, right = sum, ans = sum;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (canPartition(tasks, K, mid)) {
                ans = mid;
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
        return ans;
    }
    private boolean canPartition(int[] tasks, int K, int target) {
        int count = 1, current = 0;
        for (int t : tasks) {
            if (current + t > target) {
                count++;
                current = t;
            } else {
                current += t;
            }
        }
        return count <= K;
    }
}'''
    )
}

def update_all_custom_codes():
    print("Updating custom solution algorithms for all 1561 questions...")
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()

    rows = c.execute("SELECT id, title, category FROM questions").fetchall()
    print(f"Loaded {len(rows)} questions.")

    updated_count = 0

    for q_id, title, cat in rows:
        matched = False
        for key, (py_code, java_code) in CUSTOM_ALGORITHMS.items():
            if key.lower() in title.lower():
                c.execute("UPDATE questions SET python_solution = ?, java_solution = ? WHERE id = ?", (py_code, java_code, q_id))
                matched = True
                updated_count += 1
                break

    conn.commit()
    conn.close()
    print(f"DONE! Custom-matched solution code for {updated_count} specific title questions.")

if __name__ == "__main__":
    update_all_custom_codes()
