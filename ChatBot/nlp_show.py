import sys

# def handle_booking_intent(user_message):
#     user_message = user_message.strip()

#     # Define available shows
#     available_shows = ['Ancient Civilizations', 'Space Exploration', 'Renaissance Art']

#     # Check if the message contains a show name
#     for show in available_shows:
#         if show.lower() in user_message.lower():
#             return show  # Return the show name if found

#     # If no show name is found, return a prompt to ask for it
#     return "Please specify the show you want to book for."

# def process_message(user_message):
#     response = handle_booking_intent(user_message)
    
#     if response in ['Ancient Civilizations', 'Space Exploration', 'Renaissance Art']:
#         # Show name is identified
#         print(response)
#         return response
#     else:
#         # Show name is not identified
#         print(response)
#         return None

def main():
    if len(sys.argv) > 1:
        user_message = sys.argv[1]
    else:
        user_message = "i want to book ticket"  # Provide a default message for testing or fallback

    #show_name = process_message(user_message)

    # If the show name is still None, prompt for the show name
    #if show_name is None:
        # Simulate asking the user for the show name
    #print("Which show would you like to book tickets for?")
        # Simulate user response
        #user_message = input("Enter show name: ").strip()
    if user_message.lower() in ['ancient civilizations', 'space exploration', 'renaissance art']:
        print(f"{user_message}")
        if user_message.lower() in 'ancient aivilizations'.lower():
            
            return 'ancient civilizations'
           
        elif user_message.lower() in 'space exploration'.lower():
            print("hi")
            return 'space exploration'
        elif user_message.lower() in 'renaissance art'.lower():
            return 'renaissance art'.lower()
    else:
        print("enter show name")

main()
