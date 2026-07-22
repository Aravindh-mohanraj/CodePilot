import requests
import json
import random

base_url = "http://127.0.0.1:8000"

test_email = f"test_user_{random.randint(1000, 9999)}@prepforge.ai"
test_password = "SecurePassword123!"
test_name = "Alex Mercer"

print(f"1. Testing Signup for {test_email}...")
signup_res = requests.post(f"{base_url}/auth/signup", json={
    "name": test_name,
    "email": test_email,
    "password": test_password
})

print("Signup Status:", signup_res.status_code)
print("Signup Response:", signup_res.json())
assert signup_res.status_code == 200
assert signup_res.json()["status"] == "success"

print("\n2. Testing Login with correct credentials...")
login_res = requests.post(f"{base_url}/auth/login", json={
    "email": test_email,
    "password": test_password
})

print("Login Status:", login_res.status_code)
print("Login Response:", login_res.json())
assert login_res.status_code == 200
assert login_res.json()["status"] == "success"

print("\n3. Testing Login with wrong password...")
wrong_res = requests.post(f"{base_url}/auth/login", json={
    "email": test_email,
    "password": "WrongPassword"
})

print("Wrong Login Status:", wrong_res.status_code)
assert wrong_res.status_code == 401

print("\nALL AUTH API TESTS PASSED SUCCESSFULLY!")
