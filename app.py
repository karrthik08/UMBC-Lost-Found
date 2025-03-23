from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
import numpy as np
import faiss
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

# app = Flask(__name__)
# CORS(app, resources={r"/*": {"origins": "http://127.0.0.1:5500"}})
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}) 

# Load SBERT model
model = SentenceTransformer('all-MiniLM-L6-v2')

# PostgreSQL Connection
DB_CONFIG = {
    "dbname": "lost_found",
    "user": "mohammads",
    "password": "Nivya911",
    "host": "127.0.0.1",  # ✅ Use IP instead of "localhost"
    "port": "5432"
}

# Function to connect to PostgreSQL
def get_db_connection():
    return psycopg2.connect(**DB_CONFIG)


@app.route('/get_notifications/<int:user_id>', methods=['GET'])
def fetch_notifications(user_id):
    """Fetch notifications for a user."""
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT message, created_at FROM notifications WHERE user_id = %s ORDER BY created_at DESC LIMIT 10;", (user_id,))
    notifications = cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify({"notifications": [{"message": row[0], "created_at": row[1].strftime('%Y-%m-%d %H:%M:%S')} for row in notifications]})


# Function to add lost or found items
def add_item(description, table):
    """Inserts a lost or found item into the database."""
    conn = psycopg2.connect(
    dbname="lost_found",
    user="mohammads",
    password="Nivya911",
    host="127.0.0.1",  # ✅ Ensure this is 127.0.0.1 instead of "localhost"
    port="5432")

    cursor = conn.cursor()
    
    # Compute SBERT embedding
    embedding = model.encode(description).astype(np.float32).tobytes()

    query = f"INSERT INTO {table} (description, embedding) VALUES (%s, %s)"
    cursor.execute(query, (description, embedding))

    conn.commit()
    cursor.close()
    conn.close()

# API Endpoint: Add Lost or Found Item
@app.route('/add_item', methods=['POST'])
def add_lost_found_item():
    data = request.json
    description = data.get("description")
    category = data.get("category")  # 'lost' or 'found'

    if category not in ["lost", "found"]:
        return jsonify({"error": "Invalid category. Use 'lost' or 'found'"}), 400

    table = "lost_items" if category == "lost" else "found_items"
    add_item(description, table)

    return jsonify({"message": f"{category.capitalize()} item added successfully."})

def preprocess_text(text):
    """Simple cleaning (lowercase, stripping spaces)"""
    return text.strip().lower()  # Keeping the text simple



# API Endpoint: Match Lost Item


@app.route('/match', methods=['POST'])
def match_lost_item():
    data = request.json
    lost_item_description = data.get("lost_item")

    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Compute lost item embedding
    lost_embedding = model.encode(lost_item_description).astype(np.float32)

    # Retrieve all found items and embeddings
    cursor.execute("SELECT id, user_id, description, embedding FROM found_items")
    found_items = cursor.fetchall()

    if not found_items:
        return jsonify({"message": "No found items available."})

    found_descriptions = []
    found_embeddings = []
    found_users = []
    found_item_ids = []

    for item in found_items:
        found_item_ids.append(item[0])
        found_users.append(item[1])  # Found user's ID
        found_descriptions.append(item[2])
        found_embeddings.append(np.frombuffer(item[3], dtype=np.float32))

    found_embeddings_np = np.array(found_embeddings)

    if lost_embedding.shape[0] != found_embeddings_np.shape[1]:
        return jsonify({"error": f"Mismatch: lost={lost_embedding.shape}, stored={found_embeddings_np.shape}"})

    # FAISS similarity search
    dimension = found_embeddings_np.shape[1]
    index = faiss.IndexFlatL2(dimension)
    index.add(found_embeddings_np)

    D, I = index.search(np.array([lost_embedding]), k=1)
    best_match_index = I[0][0]
    best_match = found_descriptions[best_match_index]
    best_match_user = found_users[best_match_index]
    similarity_score = float(1 - D[0][0])

    # Fetch the user ID who posted the lost item
    cursor.execute("SELECT user_id FROM lost_items WHERE description = %s", (lost_item_description,))
    lost_user = cursor.fetchone()

    if lost_user:
        lost_user_id = lost_user[0]

        print(f"🔍 Debug: lost_user_id = {lost_user_id}, found_user_id = {best_match_user}")

        # Notifications for both users
        lost_user_msg = f"🔔 A match found for your lost item: {lost_item_description} → {best_match}"
        found_user_msg = f"🔔 We found a match for your found item: {best_match} → {lost_item_description}"

        # Insert notifications into the database
        cursor.execute("INSERT INTO notifications (user_id, message) VALUES (%s, %s)", (lost_user_id, lost_user_msg))
        cursor.execute("INSERT INTO notifications (user_id, message) VALUES (%s, %s)", (best_match_user, found_user_msg))
        conn.commit()

    cursor.close()
    conn.close()

    return jsonify({
        "lost_item": lost_item_description,
        "best_match": best_match,
        "similarity_score": similarity_score
    })




@app.route('/get_notifications/<int:user_id>', methods=['GET'])
def get_notifications(user_id):
    """Fetches the latest notifications for a given user."""
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute(
        "SELECT message, created_at FROM notifications WHERE user_id = %s ORDER BY created_at DESC LIMIT 10;", 
        (user_id,)
    )
    notifications = cursor.fetchall()
    
    cursor.close()
    conn.close()

    # ✅ Explicitly set CORS headers
    response = jsonify({
        "notifications": [
            {"message": row[0], "created_at": row[1].strftime("%Y-%m-%d %H:%M:%S")} for row in notifications
        ]
    })
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Headers", "Content-Type, Authorization")
    response.headers.add("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
    
    return response



if __name__ == '__main__':
    app.run(debug=True)
