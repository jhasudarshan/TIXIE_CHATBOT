#import pickle
import sys
import json

# Load everything from the pickle file

# with open('model_data1.pkl', 'rb') as model_file:
#     model_data = pickle.load(model_file)

# # Extract the components from the loaded data
# vectorizer = model_data['tfidf_vectorizer']
# classifier = model_data['model']
# label_encoder = model_data['label_encoder']

# def preprocess_text(text):
#     # Preprocess the input text as you did during model training
#     tokens = text.lower().split()  # Simple tokenization, adjust if needed
#     return ' '.join(tokens)

# def predict_intent(message):
#     preprocessed_message = preprocess_text(message)
#     vectorized_message = vectorizer.transform([preprocessed_message])
#     predicted_label_index = classifier.predict(vectorized_message)[0]
#     predicted_label = label_encoder.inverse_transform([predicted_label_index])[0]
#     return predicted_label

def handle_booking_intent(user_message):
    user_message = user_message.strip()

    # Check if the message contains only a number
    if user_message.isdigit():
        return user_message  # Return only the number of tickets

    # Check if the user message contains the word 'book'
    if 'book' in user_message.lower():
        # Extract the part of the message after 'book' to get the show or exhibition name
        if "for" in user_message.lower():
            show_name = user_message.lower().split("for", 1)[-1].strip()
        else:
            show_name = user_message.lower().split('book', 1)[-1].strip()
        
        # Optionally, remove common phrases like "a ticket for" or "ticket for" etc.
        show_name = show_name.replace("a ticket", "").replace("ticket", "").strip()

        # Extract the number of tickets if specified
        number_of_tickets = None
        for word in user_message.split():
            if word.isdigit():
                number_of_tickets = word
                break

        if number_of_tickets:
            return number_of_tickets  # Return only the number of tickets
        else:
            return f"How many tickets do you want to book for {show_name}?"
    else:
        # If no booking intent, predict and return the intent as usual
        return predict_intent(user_message)
'''
# def get_response(intent):
#     # Load the JSON data to find responses (assuming the JSON file is still available)
#     with open('meuseum1.json', 'r') as f:
#         data = json.load(f)
   
#     # Find a response for the predicted intent
#     for intent_data in data['intents']:
#         if intent in intent_data.get('Tags', []):
#             return intent_data.get('Response', [''])[0]  # Adjust if multiple responses
    
#     return "I'm sorry, I don't understand your query."
'''
def main():
    if len(sys.argv) > 1:
        user_message = sys.argv[1]
    else:
        user_message = "7"  # Provide a default message for testing or fallback

    # Check for numeric input first
    if user_message.isdigit():
        re = user_message
        #print(f"trying to book {user_message} if available")
        result = {
            "ticket_no": re
        }
        
        print(json.dumps(result))
        
    elif 'book' in user_message.lower():
        # Handle the booking intent separately
        re = handle_booking_intent(user_message)
        
        result = {
            "ticket_no": re
        }
        
        print(json.dumps(result)) 
        
        '''
    if 'space exploration'.lower() in user_message.lower() and 'book' in user_message.lower():
        print("Booking tickets if available")
        re1 = 'space exploration'
        print(re1)
    elif 'ancient civilizations'.lower() in user_message.lower() and 'book' in user_message.lower():
        re1 = 'Ancient Civilizations'
        print(re1)
    elif 'renaissance art'.lower() in user_message.lower() and 'book' in user_message.lower():
        re1 = 'Renaissance Art'
        print(re1)
    else:
        print("I can't understand what do you mean. type the name of the show correctly to book the ticket")
   
        # Predict intent and get response if not a numeric input
        # intent = predict_intent(user_message)
        # response = get_response(intent)
        # print(response)
    # if 'space exploration' and 'book' in user_message.lower():
    #     re='space exploration'
    #     print(re)
    '''
main()
    
