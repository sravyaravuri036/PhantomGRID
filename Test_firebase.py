from google.cloud import firestore

db = firestore.Client()

doc_ref = db.collection("test_logs").document()
doc_ref.set({
    "message": "Hello Firestore!",
    "status": "success"
})

print("Test log written to Firestore!")
