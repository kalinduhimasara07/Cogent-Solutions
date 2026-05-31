import json
import urllib.request
import urllib.error

# Config
url = "http://127.0.0.1:8000/api/generate-invitation"

# Different profiles to test the matching matrix
test_profiles = [
    {
        "name": "Alex Mercer",
        "email": "alex.mercer@logistics.com",
        "priorities": "Optimizing fleet routing overheads, tracking warehouse inventory, last-mile delivery issues."
    },
    {
        "name": "Sarah Connor",
        "email": "sarah.connor@sustainability.org",
        "priorities": "Green operations and sustainable sourcing targets in the supply chain."
    },
    {
        "name": "Joe Miller",
        "email": "joe.miller@enterprise.com",
        "priorities": "Risk management, software deployment strategies, avoiding failure during SCM implementation."
    }
]

print("=" * 70)
print("[START] ACCELALPHA-ORACLE-2024 END-TO-END API TEST SUITE")
print("=" * 70)
print("Note: Make sure your backend server is running in another terminal window!")
print("Run command: .venv\\Scripts\\uvicorn backend.main:app --reload --port 8000\n")

for i, profile in enumerate(test_profiles, start=1):
    print(f"[*] Test Case #{i}: Testing priorities for '{profile['name']}'...")
    print(f"   Priorities: \"{profile['priorities']}\"")
    
    req = urllib.request.Request(
        url,
        data=json.dumps(profile).encode("utf-8"),
        headers={"Content-Type": "application/json"},
        method="POST"
    )
    
    try:
        with urllib.request.urlopen(req) as response:
            res_data = json.loads(response.read().decode("utf-8"))
            matched = res_data.get("matched_session", {})
            draft = res_data.get("invitation_draft", "")
            
            print(f"\n   [SUCCESS]")
            print(f"   Matched Session : {matched.get('title')}")
            print(f"   Presenter       : {matched.get('speaker')}")
            print(f"   Time            : {matched.get('time')}")
            print(f"   Draft Preview   :\n\"\"\"\n{draft}\n\"\"\"")
            
    except urllib.error.URLError as e:
        print(f"   [ERROR] Connection failed! Is your backend server running?")
        print(f"      Error: {e}")
        break
    except Exception as e:
        print(f"   [ERROR] Failed with error: {e}")
        
    print("-" * 70)
