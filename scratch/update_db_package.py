import sqlite3
import json

db_path = "backend/database/interview.db"
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

add_two_num_stmt = "You are given two non-empty array representations of linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a reversed array representation of a linked list."
add_two_num_examples = json.dumps([
    {"input": "l1 = [2, 4, 3], l2 = [5, 6, 4]", "output": "[7, 0, 8]", "explanation": "342 + 465 = 807 -> [7, 0, 8]"},
    {"input": "l1 = [0], l2 = [0]", "output": "[0]", "explanation": "0 + 0 = 0 -> [0]"},
    {"input": "l1 = [9, 9, 9, 9, 9, 9, 9], l2 = [9, 9, 9, 9]", "output": "[8, 9, 9, 9, 0, 0, 0, 1]", "explanation": "9999999 + 9999 = 10009998 -> [8, 9, 9, 9, 0, 0, 0, 1]"}
])
add_two_num_py = """class Solution:
    def addTwoNumbers(self, l1, l2):
        dummy = []
        carry = 0
        i = 0
        while i < len(l1) or i < len(l2) or carry:
            val1 = l1[i] if i < len(l1) else 0
            val2 = l2[i] if i < len(l2) else 0
            total = val1 + val2 + carry
            carry = total // 10
            dummy.append(total % 10)
            i += 1
        return dummy"""

add_two_num_java = """public class Solution {
    public int[] addTwoNumbers(int[] l1, int[] l2) {
        java.util.List<Integer> list = new java.util.ArrayList<>();
        int carry = 0, i = 0;
        while (i < l1.length || i < l2.length || carry != 0) {
            int val1 = i < l1.length ? l1[i] : 0;
            int val2 = i < l2.length ? l2[i] : 0;
            int total = val1 + val2 + carry;
            carry = total / 10;
            list.add(total % 10);
            i++;
        }
        int[] res = new int[list.size()];
        for (int k = 0; k < list.size(); k++) res[k] = list.get(k);
        return res;
    }
}"""

add_two_num_tc = json.dumps([
    {"input": "l1 = [2, 4, 3], l2 = [5, 6, 4]", "expected": "[7, 0, 8]", "explanation": "342 + 465 = 807 -> [7, 0, 8]"},
    {"input": "l1 = [0], l2 = [0]", "expected": "[0]", "explanation": "0 + 0 = 0 -> [0]"},
    {"input": "l1 = [9, 9, 9, 9], l2 = [9, 9]", "expected": "[8, 9, 0, 0, 1]", "explanation": "9999 + 99 = 10098 -> [8, 9, 0, 0, 1]"},
    {"input": "l1 = [1], l2 = [9, 9, 9]", "expected": "[0, 0, 0, 1]", "explanation": "1 + 999 = 1000 -> [0, 0, 0, 1]"},
    {"input": "l1 = [5], l2 = [5]", "expected": "[0, 1]", "explanation": "5 + 5 = 10 -> [0, 1]"},
    {"input": "l1 = [1, 8], l2 = [0]", "expected": "[1, 8]", "explanation": "81 + 0 = 81 -> [1, 8]"},
    {"input": "l1 = [0, 1], l2 = [0, 2]", "expected": "[0, 3]", "explanation": "10 + 20 = 30 -> [0, 3]"},
    {"input": "l1 = [3, 7], l2 = [9, 2]", "expected": "[2, 0, 1]", "explanation": "73 + 29 = 102 -> [2, 0, 1]"},
    {"input": "l1 = [9, 9], l2 = [1]", "expected": "[0, 0, 1]", "explanation": "99 + 1 = 100 -> [0, 0, 1]"},
    {"input": "l1 = [2, 0, 5], l2 = [8, 9, 4]", "expected": "[0, 0, 0, 1]", "explanation": "502 + 498 = 1000 -> [0, 0, 0, 1]"},
    {"input": "l1 = [1, 0, 0, 0, 1], l2 = [9, 9, 9]", "expected": "[0, 0, 0, 1, 1]", "explanation": "10001 + 999 = 11000 -> [0, 0, 0, 1, 1]"},
    {"input": "l1 = [8, 3, 2], l2 = [2, 6, 7]", "expected": "[0, 0, 0, 1]", "explanation": "238 + 762 = 1000 -> [0, 0, 0, 1]"},
    {"input": "l1 = [9], l2 = [9, 9, 9, 9, 9]", "expected": "[8, 0, 0, 0, 0, 1]", "explanation": "9 + 99999 = 100008 -> [8, 0, 0, 0, 0, 1]"},
    {"input": "l1 = [4, 3, 2, 1], l2 = [6, 6, 7, 8]", "expected": "[0, 0, 0, 0, 1]", "explanation": "1234 + 8766 = 10000 -> [0, 0, 0, 0, 1]"},
    {"input": "l1 = [1, 2, 3, 4, 5], l2 = [9, 7, 6, 5, 4]", "expected": "[0, 0, 0, 0, 0, 1]", "explanation": "54321 + 45679 = 100000 -> [0, 0, 0, 0, 0, 1]"}
])

cursor.execute("""
UPDATE questions 
SET statement = ?, examples = ?, python_solution = ?, java_solution = ?, test_cases = ? 
WHERE title LIKE '%Add Two Numbers%'
""", (add_two_num_stmt, add_two_num_examples, add_two_num_py, add_two_num_java, add_two_num_tc))

conn.commit()
print("Updated 'Add Two Numbers' database entries successfully. Modified rows:", cursor.rowcount)
conn.close()
