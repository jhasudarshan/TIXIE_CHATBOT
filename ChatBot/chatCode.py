import json
import pandas as pd

# Load JSON data
with open('datasets/meuseum1.json', 'r') as f:
    data = json.load(f)

# Initialize lists to store queries and responses
intents = []
responses = []

# Check the structure of the loaded data
#print("Type of loaded data:", type(data))
#print("Loaded data:", data)

# Check if data contains 'intents'
if 'intents' in data:
    for intent in data['intents']:
        intents_list = intent.get('Intent_Query', [])
        response_list = intent.get('Response', [])
        
        # Ensure response_list is a list and has responses
        if isinstance(response_list, list):
            response_text = response_list[0] if response_list else ''
        else:
            response_text = ''
        
        if intents_list:  # Check if there are queries
            for query in intents_list:
                intents.append(query)
                responses.append(response_text)
else:
    print("Data is not in the expected format. It should contain 'intents' key.")

# Check if intents and responses are populated
# print("Intents:", intents)
# print("Responses:", responses)

# Create DataFrame
df1 = pd.DataFrame({'query': intents, 'response': responses})

# Save to CSV
df1.to_csv('training_data2.csv', index=False)


import json
import nltk
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import MultinomialNB
from sklearn.ensemble import RandomForestClassifier, VotingClassifier
from sklearn.metrics import classification_report, confusion_matrix
from sklearn.preprocessing import LabelEncoder
from sklearn.neural_network import MLPClassifier
import seaborn as sns
import matplotlib.pyplot as plt

# Download necessary NLTK data
nltk.download('punkt')
nltk.download('wordnet')
nltk.download('stopwords')

# Initialize lemmatizer and stop words
lemmatizer = WordNetLemmatizer()
stop_words = set(nltk.corpus.stopwords.words('english'))

def preprocess_text(text):
    tokens = word_tokenize(text.lower())
    tokens = [word for word in tokens if word.isalpha() and word not in stop_words]  # Remove punctuation and stop words
    lemmatized_words = [lemmatizer.lemmatize(word) for word in tokens]
    return ' '.join(lemmatized_words)

# Load data from JSON file
with open('datasets/meuseum1.json') as file:
    data = json.load(file)

# Prepare data
texts = [preprocess_text(query) for intent in data['intents'] for query in intent['Intent_Query']]
labels = [intent['Tags'][0] for intent in data['intents'] for _ in intent['Intent_Query']]  # Adjust if multiple tags

# Encode labels
label_encoder = LabelEncoder()
y = label_encoder.fit_transform(labels)

# Convert texts to TF-IDF features
vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(texts)

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Define models
naive_bayes = MultinomialNB()
random_forest = RandomForestClassifier(n_estimators=100, random_state=42)
mlp = MLPClassifier(hidden_layer_sizes=(100, 50), max_iter=500, random_state=42)  # Define the ANN

# Create a Voting Classifier
voting_clf = VotingClassifier(estimators=[
    ('nb', naive_bayes),
    ('rf', random_forest),
    ('mlp', mlp)
], voting='soft')  # Use 'soft' voting for probability-based voting

# Train the Voting Classifier
voting_clf.fit(X_train, y_train)

# Evaluate the Voting Classifier
y_pred = voting_clf.predict(X_test)
print("Classification Report:\n", classification_report(y_test, y_pred, target_names=label_encoder.classes_))

# Confusion Matrix
'''
def plot_confusion_matrix(cm, classes):
    plt.figure(figsize=(10, 7))
    sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', xticklabels=classes, yticklabels=classes)
    plt.xlabel('Predicted Label')
    plt.ylabel('True Label')
    plt.title('Confusion Matrix')
    plt.show()

cm = confusion_matrix(y_test, y_pred)
plot_confusion_matrix(cm, label_encoder.classes_)
'''
def get_response(user_input):
    preprocessed_input = preprocess_text(user_input)
    input_vector = vectorizer.transform([preprocessed_input])
    predicted_tag_index = voting_clf.predict(input_vector)[0]
    
    # Check if the predicted tag index is in the encoder's classes
    predicted_tag = label_encoder.inverse_transform([predicted_tag_index])[0]
    
    # Find a response for the predicted tag
    for intent in data['intents']:
        if predicted_tag in intent['Tags']:
            return intent['Response'][0]  # Adjust if multiple responses
    
    return "I'm sorry, I don't understand your query."

# Example interaction
user_query = "What are the exhibition times for Space Exploration?"
print(get_response(user_query))
import pickle
model_data = {
    'model': voting_clf,
    'label_encoder': label_encoder,
    'tfidf_vectorizer': vectorizer
}

with open('datasets/model_data1.pkl', 'wb') as model_file:
    pickle.dump(model_data, model_file)


# Load everything from one pickle file
with open('datasets/model_data1.pkl', 'rb') as model_file:
    model_data = pickle.load(model_file)

voting_clf = model_data['model']
label_encoder = model_data['label_encoder']
vectorizer = model_data['tfidf_vectorizer']
