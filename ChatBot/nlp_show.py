import sys
import json

def main():
    if len(sys.argv) > 1:
        user_message = sys.argv[1]
    else:
        user_message = "book ticket for space exploration"  # Provide a default message for testing or fallback

    # Check if any of the show names are in the user message
    if 'ancient civilizations' in user_message.lower():
        result = {
            "m_name":"ancient civilizations"
        }
        print(json.dumps(result))
    elif 'space exploration' in user_message.lower():
        result = {
            "m_name":"space exploration"
        }
        print(json.dumps(result))
    elif 'renaissance art' in user_message.lower():
        result = {
            "m_name":"renaissance art"
        }
        print(json.dumps(result))
    else:
        result = {
            "m_name":""
        }
        print(json.dumps(result))

main()
