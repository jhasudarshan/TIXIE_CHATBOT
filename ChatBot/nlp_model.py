import pickle
import sys
import json
import os
# Load everything from the pickle file
file_path = os.path.join('ChatBot', 'model_data1.pkl')

with open(file_path, 'rb') as model_file:
    model_data = pickle.load(model_file)

# Extract the components from the loaded data
vectorizer = model_data['tfidf_vectorizer']
classifier = model_data['model']
label_encoder = model_data['label_encoder']

def preprocess_text(text):
    # Preprocess the input text as you did during model training
    tokens = text.lower().split()  # Simple tokenization, adjust if needed
    return ' '.join(tokens)

def predict_intent(message):
    preprocessed_message = preprocess_text(message)
    vectorized_message = vectorizer.transform([preprocessed_message])
    predicted_label_index = classifier.predict(vectorized_message)[0]
    predicted_label = label_encoder.inverse_transform([predicted_label_index])[0]
    return predicted_label

def get_response(intent):
    # Load the JSON data to find responses (assuming the JSON file is still available)
    file_path = os.path.join('ChatBot', 'meuseum1.json')
    with open(file_path, 'r') as f:
        data = json.load(f)

    # Find a response for the predicted intent
    for intent_data in data['intents']:
        if intent in intent_data.get('Tags', []):
            return intent_data.get('Tags')[0], intent_data.get('Response', [''])[0]  # Adjust if multiple responses
    
    return intent,"I'm sorry, I don't understand your query."

if __name__ == "__main__":
    if len(sys.argv) > 1:
        user_message = sys.argv[1]
    else:
        user_message = "what is the show time for ancient civilaisations"  # Provide a default message for testing or fallback

    intent = predict_intent(user_message)
    tag, response = get_response(intent)
    result = {
        "intent": tag,
        "response": response
    }
    
    print(json.dumps(result)) 