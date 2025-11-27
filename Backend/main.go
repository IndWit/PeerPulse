package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"golang.org/x/crypto/bcrypt" // 1. IMPORT THE SCRAMBLER TOOL
)

// --- 1. THE FORMS (Data Structures) ---

// User is the Admin.
type User struct {
	ID       primitive.ObjectID `json:"id,omitempty" bson:"_id,omitempty"`
	Username string             `json:"username" bson:"username"`
	Password string             `json:"password" bson:"password"`
}

type Session struct {
	ID    primitive.ObjectID `json:"id,omitempty" bson:"_id,omitempty"`
	Title string             `json:"title" bson:"title"`
	Date  string             `json:"date" bson:"date"`
}

type Feedback struct {
	SessionID string `json:"session_id" bson:"session_id"`
	Rating    int    `json:"rating" bson:"rating"`
	Comment   string `json:"comment" bson:"comment"`
}

// Global variables
var client *mongo.Client
var db *mongo.Database

func main() {
	fmt.Println("⚡ PeerPulse Backend is starting...")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Connect to MongoDB
	var err error
	client, err = mongo.Connect(ctx, options.Client().ApplyURI("mongodb://localhost:27017"))
	if err != nil {
		log.Fatal("Could not connect to MongoDB:", err)
	}

	db = client.Database("peerpulse")
	fmt.Println("✅ Connected to MongoDB!")

	// --- 2. THE MENU (API Routes) ---
	
	// NEW: Register a new Admin
	http.HandleFunc("/register", registerHandler)

	// Admin Actions
	http.HandleFunc("/create-session", createSessionHandler)
	http.HandleFunc("/get-sessions", getSessionsHandler)
	http.HandleFunc("/view-feedback", viewFeedbackHandler)

	// User Actions
	http.HandleFunc("/submit-feedback", submitFeedbackHandler)

	fmt.Println("🚀 Server running on http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}

// --- 3. THE WORKERS ---

// NEW: registerHandler creates a new Admin in the database
func registerHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		http.Error(w, "Only POST allowed", http.StatusMethodNotAllowed)
		return
	}

	var user User
	_ = json.NewDecoder(r.Body).Decode(&user)

	// A. SCRAMBLE THE PASSWORD
	// We use "GenerateFromPassword" to turn "secret123" into gibberish
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		http.Error(w, "Server error, could not scramble password", http.StatusInternalServerError)
		return
	}
	// Replace the plain password with the scrambled one
	user.Password = string(hashedPassword)
	user.ID = primitive.NewObjectID()

	// B. SAVE TO MONGODB
	collection := db.Collection("users") // New drawer called "users"
	
	// Check if user already exists (Optional but good practice)
	// For now, we just insert.
	_, err = collection.InsertOne(context.TODO(), user)
	if err != nil {
		http.Error(w, "Error saving user", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"status": "Admin Registered Successfully!"})
}

// createSessionHandler
func createSessionHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		http.Error(w, "Only POST allowed", http.StatusMethodNotAllowed)
		return
	}

	var newSession Session
	_ = json.NewDecoder(r.Body).Decode(&newSession)
	newSession.ID = primitive.NewObjectID()

	collection := db.Collection("sessions")
	_, err := collection.InsertOne(context.TODO(), newSession)
	if err != nil {
		http.Error(w, "Failed to create session", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(newSession)
}

// getSessionsHandler
func getSessionsHandler(w http.ResponseWriter, r *http.Request) {
	collection := db.Collection("sessions")
	cursor, _ := collection.Find(context.TODO(), bson.D{{}})

	var sessions []Session
	cursor.All(context.TODO(), &sessions)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(sessions)
}

// submitFeedbackHandler
func submitFeedbackHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		http.Error(w, "Only POST allowed", http.StatusMethodNotAllowed)
		return
	}

	var newFeedback Feedback
	_ = json.NewDecoder(r.Body).Decode(&newFeedback)

	collection := db.Collection("feedback")
	_, err := collection.InsertOne(context.TODO(), newFeedback)
	if err != nil {
		http.Error(w, "Failed to submit feedback", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"status": "Feedback Received!"})
}

// viewFeedbackHandler
func viewFeedbackHandler(w http.ResponseWriter, r *http.Request) {
	sessionID := r.URL.Query().Get("session_id")
	collection := db.Collection("feedback")
	filter := bson.M{"session_id": sessionID}
	cursor, _ := collection.Find(context.TODO(), filter)

	var feedbacks []Feedback
	cursor.All(context.TODO(), &feedbacks)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(feedbacks)
}