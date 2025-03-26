import psycopg2
import numpy as np
from sentence_transformers import SentenceTransformer

# ✅ Load the correct SBERT model (384-dimensional)
model = SentenceTransformer('all-MiniLM-L6-v2')

# ✅ Connect to PostgreSQL
conn = psycopg2.connect(
    database="lost_found",
    user="postgres",
    password="your_password",
    host="localhost",
    port="5432"
)
cursor = conn.cursor()

# ✅ Retrieve all stored descriptions
cursor.execute("SELECT id, description FROM found_items")
found_items = cursor.fetchall()

# ✅ Update embeddings for consistency
for item_id, description in found_items:
    embedding = model.encode(description).astype(np.float32).tobytes()  # Convert to binary
    cursor.execute("UPDATE found_items SET embedding = %s WHERE id = %s", (embedding, item_id))

# ✅ Commit changes and close the connection
conn.commit()
cursor.close()
conn.close()

print("✅ All embeddings updated successfully to 384 dimensions!")
