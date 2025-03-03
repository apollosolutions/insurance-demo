package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/mux"
)

// Policy represents a user's policy
type Policy struct {
	ID string `json:"id"`
}

// Claim represents a user's claim
type Claim struct {
	ID string `json:"id"`
}

// User represents a user in our system with policies and claims
type User struct {
	ID           string   `json:"id"`
	FirstName    string   `json:"firstName"`
	LastName     string   `json:"lastName"`
	EmailAddress string   `json:"emailAddress"`
	PhoneNumber  string   `json:"phoneNumber"`
	DateOfBirth  string   `json:"dateOfBirth"`
	Policies     []Policy `json:"policies,omitempty"`
	Claims       []Claim  `json:"claims,omitempty"`
}

var users []User

// loadUsersFromJSON loads users from the JSON file
func loadUsersFromJSON(filename string) error {
	// Read the JSON file
	file, err := os.Open(filename)
	if err != nil {
		return err
	}
	defer file.Close()

	// Parse JSON data
	byteValue, _ := ioutil.ReadAll(file)
	json.Unmarshal(byteValue, &users)

	return nil
}

// GetUsers returns all users
func GetUsers(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(users)
}

// GetUser returns a single user by ID
func GetUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// Get the ID from the URL parameters
	vars := mux.Vars(r)
	userID := vars["id"]

	// Find the user with the specified ID
	for _, user := range users {
		if user.ID == userID {
			json.NewEncoder(w).Encode(user)
			return
		}
	}

	// If no user is found, return 404
	w.WriteHeader(http.StatusNotFound)
	w.Write([]byte(`{"error": "User not found"}`))
}

// GetUserPolicies returns all policies for a specific user
func GetUserPolicies(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// Get the ID from the URL parameters
	vars := mux.Vars(r)
	userID := vars["id"]

	// Find the user with the specified ID
	for _, user := range users {
		if user.ID == userID {
			json.NewEncoder(w).Encode(user.Policies)
			return
		}
	}

	// If no user is found, return 404
	w.WriteHeader(http.StatusNotFound)
	w.Write([]byte(`{"error": "User not found"}`))
}

// GetUserClaims returns all claims for a specific user
func GetUserClaims(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// Get the ID from the URL parameters
	vars := mux.Vars(r)
	userID := vars["id"]

	// Find the user with the specified ID
	for _, user := range users {
		if user.ID == userID {
			json.NewEncoder(w).Encode(user.Claims)
			return
		}
	}

	// If no user is found, return 404
	w.WriteHeader(http.StatusNotFound)
	w.Write([]byte(`{"error": "User not found"}`))
}

func main() {
	// Load users from JSON file
	err := loadUsersFromJSON("users.json")
	if err != nil {
		log.Fatalf("Error loading users: %v", err)
	}

	// Initialize router
	r := mux.NewRouter()

	// Define routes
	r.HandleFunc("/users", GetUsers).Methods("GET")
	r.HandleFunc("/user/{id}", GetUser).Methods("GET")
	r.HandleFunc("/user/{id}/policies", GetUserPolicies).Methods("GET")
	r.HandleFunc("/user/{id}/claims", GetUserClaims).Methods("GET")

	// Set up server
	port := 8080
	fmt.Printf("Server starting on port %d...\n", port)
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%d", port), r))
}
