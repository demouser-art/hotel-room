#!/usr/bin/env python3
"""
Backend API Testing Script
Tests the FastAPI backend endpoints to ensure proper functionality
"""

import requests
import json
import sys
from datetime import datetime
import os
from pathlib import Path

# Load environment variables to get the backend URL
def load_frontend_env():
    """Load frontend .env file to get REACT_APP_BACKEND_URL"""
    frontend_env_path = Path("/app/frontend/.env")
    env_vars = {}
    
    if frontend_env_path.exists():
        with open(frontend_env_path, 'r') as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#') and '=' in line:
                    key, value = line.split('=', 1)
                    env_vars[key] = value.strip('"')
    
    return env_vars

def test_backend_api():
    """Test all backend API endpoints"""
    
    # Get backend URL from frontend environment
    env_vars = load_frontend_env()
    base_url = env_vars.get('REACT_APP_BACKEND_URL', 'http://localhost:8001')
    api_base_url = f"{base_url}/api"
    
    print(f"Testing Backend API at: {api_base_url}")
    print("=" * 60)
    
    test_results = {
        "root_endpoint": False,
        "post_status": False,
        "get_status": False,
        "database_connectivity": False
    }
    
    # Test 1: Root endpoint
    print("1. Testing Root Endpoint...")
    try:
        response = requests.get(f"{api_base_url}/", timeout=10)
        if response.status_code == 200:
            data = response.json()
            if data.get("message") == "Hello World":
                print("   ✅ Root endpoint working correctly")
                test_results["root_endpoint"] = True
            else:
                print(f"   ❌ Root endpoint returned unexpected data: {data}")
        else:
            print(f"   ❌ Root endpoint failed with status: {response.status_code}")
    except requests.exceptions.RequestException as e:
        print(f"   ❌ Root endpoint request failed: {str(e)}")
    
    # Test 2: POST /api/status endpoint
    print("\n2. Testing POST /api/status endpoint...")
    try:
        test_data = {
            "client_name": "test_client_backend_verification"
        }
        response = requests.post(f"{api_base_url}/status", 
                               json=test_data, 
                               headers={"Content-Type": "application/json"},
                               timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            if (data.get("client_name") == "test_client_backend_verification" and 
                "id" in data and "timestamp" in data):
                print("   ✅ POST status endpoint working correctly")
                test_results["post_status"] = True
                test_results["database_connectivity"] = True
                created_id = data["id"]
            else:
                print(f"   ❌ POST status endpoint returned unexpected data: {data}")
        else:
            print(f"   ❌ POST status endpoint failed with status: {response.status_code}")
            print(f"   Response: {response.text}")
    except requests.exceptions.RequestException as e:
        print(f"   ❌ POST status endpoint request failed: {str(e)}")
    
    # Test 3: GET /api/status endpoint
    print("\n3. Testing GET /api/status endpoint...")
    try:
        response = requests.get(f"{api_base_url}/status", timeout=10)
        if response.status_code == 200:
            data = response.json()
            if isinstance(data, list):
                print(f"   ✅ GET status endpoint working correctly (returned {len(data)} records)")
                test_results["get_status"] = True
                
                # Check if our test record exists
                test_record_found = any(
                    record.get("client_name") == "test_client_backend_verification" 
                    for record in data
                )
                if test_record_found:
                    print("   ✅ Database persistence verified - test record found")
                else:
                    print("   ⚠️  Test record not found in database (may have been cleared)")
            else:
                print(f"   ❌ GET status endpoint returned non-list data: {data}")
        else:
            print(f"   ❌ GET status endpoint failed with status: {response.status_code}")
    except requests.exceptions.RequestException as e:
        print(f"   ❌ GET status endpoint request failed: {str(e)}")
    
    # Summary
    print("\n" + "=" * 60)
    print("BACKEND API TEST SUMMARY:")
    print("=" * 60)
    
    passed_tests = sum(test_results.values())
    total_tests = len(test_results)
    
    for test_name, result in test_results.items():
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{test_name.replace('_', ' ').title()}: {status}")
    
    print(f"\nOverall Result: {passed_tests}/{total_tests} tests passed")
    
    if passed_tests == total_tests:
        print("🎉 All backend tests PASSED! Backend is working correctly.")
        return True
    else:
        print("⚠️  Some backend tests FAILED. Backend may have issues.")
        return False

if __name__ == "__main__":
    success = test_backend_api()
    sys.exit(0 if success else 1)