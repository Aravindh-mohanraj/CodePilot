import json
import os

with open('dataset/questions.json', 'r') as f:
    questions = json.load(f)

for q in questions:
    if q['id'] == 1:
        q['statement'] = "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order."
        q['examples'] = [
            {"input": "nums = [2,7,11,15], target = 9", "output": "[0,1]", "explanation": "Because nums[0] + nums[1] == 9, we return [0, 1]."},
            {"input": "nums = [3,2,4], target = 6", "output": "[1,2]", "explanation": "Because nums[1] + nums[2] == 6, we return [1, 2]."}
        ]
        q['constraints'] = ["2 <= nums.length <= 10^4", "-10^9 <= nums[i] <= 10^9", "-10^9 <= target <= 10^9", "Only one valid answer exists."]
    elif q['id'] == 2:
        q['statement'] = "You are given an array prices where prices[i] is the price of a given stock on the ith day.\n\nYou want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.\n\nReturn the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0."
        q['examples'] = [
            {"input": "prices = [7,1,5,3,6,4]", "output": "5", "explanation": "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5."},
            {"input": "prices = [7,6,4,3,1]", "output": "0", "explanation": "In this case, no transactions are done and the max profit is 0."}
        ]
        q['constraints'] = ["1 <= prices.length <= 10^5", "0 <= prices[i] <= 10^4"]
    elif q['id'] == 3:
        q['statement'] = "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type."
        q['examples'] = [
            {"input": "s = \"()\"", "output": "true", "explanation": "The string contains a valid pair of parentheses."},
            {"input": "s = \"()[]{}\"", "output": "true", "explanation": "All bracket pairs are valid and closed in order."}
        ]
        q['constraints'] = ["1 <= s.length <= 10^4", "s consists of parentheses only '()[]{}'."]
    elif q['id'] == 4:
        q['statement'] = "You are given the heads of two sorted linked lists list1 and list2.\n\nMerge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.\n\nReturn the head of the merged linked list."
        q['examples'] = [
            {"input": "list1 = [1,2,4], list2 = [1,3,4]", "output": "[1,1,2,3,4,4]", "explanation": "The two lists are merged node by node in sorted order."},
            {"input": "list1 = [], list2 = []", "output": "[]", "explanation": "Both lists are empty, so the merged list is also empty."}
        ]
        q['constraints'] = ["The number of nodes in both lists is in the range [0, 50].", "-100 <= Node.val <= 100", "Both list1 and list2 are sorted in non-decreasing order."]
    elif q['id'] == 5:
        q['statement'] = "Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.\n\nYou must write an algorithm with O(log n) runtime complexity."
        q['examples'] = [
            {"input": "nums = [-1,0,3,5,9,12], target = 9", "output": "4", "explanation": "9 exists in nums and its index is 4."},
            {"input": "nums = [-1,0,3,5,9,12], target = 2", "output": "-1", "explanation": "2 does not exist in nums so return -1."}
        ]
        q['constraints'] = ["1 <= nums.length <= 10^4", "-10^4 <= nums[i], target <= 10^4", "All the integers in nums are unique.", "nums is sorted in ascending order."]

with open('dataset/questions.json', 'w') as f:
    json.dump(questions, f, indent=2)

print("Patched dataset/questions.json")
