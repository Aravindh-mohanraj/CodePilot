import re

def safe_eval_input(tc_input_str):
    if not tc_input_str or not isinstance(tc_input_str, str):
        return []
    
    if "=" in tc_input_str:
        try:
            # Match assignments like key = val
            matches = re.findall(r'([a-zA-Z0-9_]+)\s*=\s*(\[.*?\]|"[^"]*"|\'[^\']*\'|[-?\d\.]+|True|False|true|false)', tc_input_str)
            if matches:
                args = []
                for _, val in matches:
                    args.append(eval(val.strip()))
                return args
        except Exception as e:
            print("Regex eval notice:", e)

    try:
        val = eval(tc_input_str.strip())
        return [val] if not isinstance(val, tuple) else list(val)
    except Exception:
        pass

    return [tc_input_str.strip()]

print("1. Add Two Numbers:", safe_eval_input("l1 = [2, 4, 3], l2 = [5, 6, 4]"))
print("2. Longest Substring:", safe_eval_input("s = \"abcabcbb\""))
print("3. Median Array:", safe_eval_input("nums1 = [1, 3], nums2 = [2]"))
