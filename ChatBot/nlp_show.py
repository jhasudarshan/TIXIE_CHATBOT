import sys

def main():
    if len(sys.argv) > 1:
        user_message = sys.argv[1]
    else:
        user_message = "book ticket for space exploration"  # Provide a default message for testing or fallback

    # Check if any of the show names are in the user message
    if 'ancient civilizations' in user_message.lower():
        print("trying to book if available")
        return 'ancient civilizations'
        
    elif 'space exploration' in user_message.lower():
        print("trying to book if available")
        return 'space exploration'
        
    elif 'renaissance art' in user_message.lower():
        print("trying to book if available")
        return 'renaissance art'
    else:
        print("Enter a valid show name")

main()
