export interface AIResponse {
  id: string;
  content: string;
  timestamp: string;
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const KEYWORD_RESPONSES: Record<string, string> = {
  'bfs|breadth': `## BFS (Breadth-First Search)

BFS explores nodes level by level using a **queue** data structure.

**Key Properties:**
- **Time Complexity:** O(V + E)
- **Space Complexity:** O(V) — stores all nodes at the current level
- **Best for:** Shortest path in unweighted graphs

\`\`\`python
from collections import deque

def bfs(graph, start):
    visited = set([start])
    queue = deque([start])
    while queue:
        node = queue.popleft()
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    return visited
\`\`\`

BFS guarantees finding the shortest path in unweighted graphs, making it ideal for problems like "Word Ladder" or "Shortest Path in Binary Matrix".`,

  'dfs|depth': `## DFS (Depth-First Search)

DFS explores as deep as possible along each branch before backtracking, using a **stack** (or recursion).

**Key Properties:**
- **Time Complexity:** O(V + E)
- **Space Complexity:** O(H) where H is the height of the tree/graph
- **Best for:** Cycle detection, topological sort, connected components

\`\`\`python
def dfs(graph, node, visited=None):
    if visited is None:
        visited = set()
    visited.add(node)
    for neighbor in graph[node]:
        if neighbor not in visited:
            dfs(graph, neighbor, visited)
    return visited
\`\`\`

DFS is memory-efficient for deep graphs and is the foundation for algorithms like Tarjan's SCC and topological sorting.`,

  'array|two pointer': `## Two Pointer Technique on Arrays

The two-pointer technique uses two indices that move towards each other or in the same direction to solve problems efficiently.

**Common Patterns:**
1. **Opposite ends** — start from both ends (e.g., Two Sum on sorted array)
2. **Same direction** — slow/fast pointers (e.g., remove duplicates)
3. **Sliding window** — variable-size window for subarray problems

\`\`\`python
def two_sum_sorted(nums, target):
    left, right = 0, len(nums) - 1
    while left < right:
        current = nums[left] + nums[right]
        if current == target:
            return [left, right]
        elif current < target:
            left += 1
        else:
            right -= 1
    return [-1, -1]
\`\`\`

**Time:** O(n) | **Space:** O(1) — much better than the O(n) hash map approach when the array is already sorted.`,

  'dynamic programming|dp|memoization': `## Dynamic Programming Fundamentals

DP solves complex problems by breaking them into **overlapping subproblems** and storing results to avoid redundant computation.

**Two Approaches:**
1. **Top-Down (Memoization)** — Recursive with caching
2. **Bottom-Up (Tabulation)** — Iterative with a DP table

\`\`\`python
# Fibonacci — Top-Down
def fib_memo(n, memo={}):
    if n <= 1:
        return n
    if n not in memo:
        memo[n] = fib_memo(n-1) + fib_memo(n-2)
    return memo[n]

# Fibonacci — Bottom-Up
def fib_tab(n):
    if n <= 1:
        return n
    dp = [0] * (n + 1)
    dp[1] = 1
    for i in range(2, n + 1):
        dp[i] = dp[i-1] + dp[i-2]
    return dp[n]
\`\`\`

**Framework:** Define state → Write recurrence → Identify base cases → Optimize space if possible.`,

  'tree|binary tree|bst': `## Binary Tree Traversals

Understanding tree traversals is fundamental for interview success.

**Three Main Traversals:**
- **Inorder** (Left → Root → Right): Gives sorted order for BST
- **Preorder** (Root → Left → Right): Used for serialization
- **Postorder** (Left → Right → Root): Used for deletion

\`\`\`python
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def inorder(root):
    if not root:
        return []
    return inorder(root.left) + [root.val] + inorder(root.right)

def level_order(root):
    if not root:
        return []
    result, queue = [], [root]
    while queue:
        level = []
        for _ in range(len(queue)):
            node = queue.pop(0)
            level.append(node.val)
            if node.left: queue.append(node.left)
            if node.right: queue.append(node.right)
        result.append(level)
    return result
\`\`\``,

  'linked list': `## Linked List Patterns

Key patterns for linked list interview problems:

**1. Fast & Slow Pointers (Floyd's Algorithm)**
\`\`\`python
def has_cycle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True
    return False
\`\`\`

**2. Reverse a Linked List**
\`\`\`python
def reverse(head):
    prev, curr = None, head
    while curr:
        nxt = curr.next
        curr.next = prev
        prev = curr
        curr = nxt
    return prev
\`\`\`

These two patterns solve ~70% of linked list problems.`,

  'graph|adjacency': `## Graph Representations & Algorithms

**Adjacency List** is the most common representation for sparse graphs:

\`\`\`python
graph = {
    0: [1, 2],
    1: [0, 3],
    2: [0, 3],
    3: [1, 2]
}
\`\`\`

**Key Algorithms:**
- **Dijkstra's** — Shortest path with weights: O((V+E) log V)
- **Bellman-Ford** — Handles negative weights: O(VE)
- **Kruskal's/Prim's** — Minimum Spanning Tree
- **Topological Sort** — DAG ordering: O(V+E)
- **Union-Find** — Connected components: O(α(n))`,

  'sort|sorting': `## Sorting Algorithm Comparison

| Algorithm | Best | Average | Worst | Space | Stable |
|-----------|------|---------|-------|-------|--------|
| Quick Sort | O(n log n) | O(n log n) | O(n²) | O(log n) | No |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) | Yes |
| Heap Sort | O(n log n) | O(n log n) | O(n log n) | O(1) | No |
| Tim Sort | O(n) | O(n log n) | O(n log n) | O(n) | Yes |

**Interview Tip:** Python uses Tim Sort. Know when to use each:
- **Merge Sort** for linked lists (no random access needed)
- **Quick Sort** for arrays (cache-friendly)
- **Counting Sort** for bounded integer ranges O(n+k)`,

  'hash|hashmap|dictionary': `## Hash Map Patterns

Hash maps provide O(1) average lookup and are essential for optimization.

**Pattern 1: Frequency Count**
\`\`\`python
from collections import Counter
def top_k_frequent(nums, k):
    return [x for x, _ in Counter(nums).most_common(k)]
\`\`\`

**Pattern 2: Two Sum**
\`\`\`python
def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
\`\`\`

**Pattern 3: Group Anagrams**
\`\`\`python
def group_anagrams(strs):
    groups = {}
    for s in strs:
        key = tuple(sorted(s))
        groups.setdefault(key, []).append(s)
    return list(groups.values())
\`\`\``
};

const GENERIC_RESPONSE = `That's a great question! Here are some key points to consider:

1. **Break down the problem** into smaller subproblems
2. **Identify the pattern** — is it a sliding window, two pointer, or DP problem?
3. **Consider edge cases** — empty input, single element, duplicates
4. **Analyze complexity** — aim for optimal time and space

Would you like me to dive deeper into any specific algorithm or data structure? I can provide detailed explanations with code examples for:
- Arrays & Strings
- Trees & Graphs  
- Dynamic Programming
- System Design concepts`;

export async function getMockAIResponse(prompt: string): Promise<AIResponse> {
  await delay(1000 + Math.random() * 1000);

  const lowerPrompt = prompt.toLowerCase();
  let content = GENERIC_RESPONSE;

  for (const [keywords, response] of Object.entries(KEYWORD_RESPONSES)) {
    const patterns = keywords.split('|');
    if (patterns.some(p => lowerPrompt.includes(p))) {
      content = response;
      break;
    }
  }

  return {
    id: Date.now().toString(),
    content,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  };
}

const ASSISTANT_RESPONSES: Record<string, (title: string) => string> = {
  explain: (title) => `## Problem Analysis: ${title}

**Approach:** This problem can be solved using the Two Pointer technique.

**Intuition:** We maintain two pointers starting from opposite ends. At each step, we process the side with the smaller height because the water trapped depends on the minimum of the two boundaries.

**Algorithm:**
1. Initialize \`left = 0\`, \`right = n-1\`, \`left_max = 0\`, \`right_max = 0\`
2. While \`left < right\`:
   - If \`height[left] < height[right]\`: process left side
   - Else: process right side
3. Update max heights and accumulate trapped water

**Why it works:** The key insight is that water at any position is determined by \`min(left_max, right_max) - height[i]\`. By processing the smaller side first, we guarantee correctness.`,

  hint: (title) => `## Progressive Hint for: ${title}

**Hint 1:** Think about what determines how much water can be stored above each bar.

**Hint 2:** The water at each position depends on the maximum height to its left AND right. Can you precompute these?

**Hint 3:** Can you avoid the extra space by using two pointers moving inward? The pointer with the smaller height boundary determines the water level.

Try implementing this approach before asking for the full solution!`,

  complexity: (title) => `## Complexity Analysis: ${title}

### Two Pointer Approach:
- **Time Complexity:** O(n) — single pass with two pointers
- **Space Complexity:** O(1) — only constant extra variables

### Alternative — Prefix/Suffix Arrays:
- **Time Complexity:** O(n) — three passes
- **Space Complexity:** O(n) — two auxiliary arrays

### Brute Force:
- **Time Complexity:** O(n²) — for each element, scan left and right
- **Space Complexity:** O(1)

The two-pointer approach is optimal with O(n) time and O(1) space.`,

  optimize: (title) => `## Optimization Suggestions: ${title}

Your current solution looks good! Here are some potential optimizations:

**1. Early termination:**
\`\`\`python
if not height or len(height) < 3:
    return 0
\`\`\`

**2. Avoid redundant comparisons:**
\`\`\`python
while left < right:
    if height[left] <= height[right]:
        left += 1
        left_max = max(left_max, height[left])
        water += left_max - height[left]
    else:
        right -= 1
        right_max = max(right_max, height[right])
        water += right_max - height[right]
\`\`\`

**3. Consider monotonic stack** for a different perspective that may be more intuitive for some.`,

  debug: (title) => `## Common Pitfalls: ${title}

**Bug 1: Off-by-one errors**
Make sure your while loop condition is \`left < right\`, not \`left <= right\`.

**Bug 2: Forgetting to update max values**
Always update \`left_max\` or \`right_max\` before calculating trapped water.

**Bug 3: Edge cases to test:**
- Empty array: \`[]\` → 0
- Single element: \`[5]\` → 0
- Two elements: \`[1, 2]\` → 0
- Flat array: \`[3, 3, 3]\` → 0
- V-shape: \`[3, 0, 3]\` → 3
- Descending: \`[5, 4, 3, 2, 1]\` → 0

**Bug 4: Integer overflow** — Not an issue in Python, but watch out in Java/C++.`,

  testcases: (title) => `## Generated Test Cases: ${title}

\`\`\`python
# Test Case 1: Standard example
assert trap([0,1,0,2,1,0,1,3,2,1,2,1]) == 6

# Test Case 2: Empty input
assert trap([]) == 0

# Test Case 3: No trapping possible
assert trap([1,2,3,4,5]) == 0

# Test Case 4: V-shape
assert trap([5,0,5]) == 5

# Test Case 5: Complex pattern  
assert trap([4,2,0,3,2,5]) == 9

# Test Case 6: Single peak
assert trap([0,1,0]) == 0

# Test Case 7: Large values
assert trap([10000,0,10000]) == 10000

# Test Case 8: Alternating
assert trap([1,0,1,0,1]) == 2
\`\`\`

All test cases cover edge cases and common patterns.`
};

export async function getMockAssistantResponse(action: string, questionTitle: string): Promise<AIResponse> {
  await delay(800 + Math.random() * 1200);

  const responseFn = ASSISTANT_RESPONSES[action];
  const content = responseFn ? responseFn(questionTitle) : `I can help with "${action}" for ${questionTitle}. What specific aspect would you like me to explain?`;

  return {
    id: Date.now().toString(),
    content,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  };
}

export function getSuggestedPrompts(): string[] {
  return [
    'Explain Two Pointers',
    'Mock Interview for Meta',
    'Debug Python Decorator',
    'Explain Graph BFS vs DFS',
    'System Design Concepts',
    'Dynamic Programming Patterns',
  ];
}
