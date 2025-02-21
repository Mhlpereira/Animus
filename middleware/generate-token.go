package main

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"time"

	"github.com/golang-jwt/jwt/v5"
)


type TokenRequest struct {
    UserID int `json:"userId"`
}

type TokenResponse struct {
    Token string `json:"token"`
}

func generateToken(w http.ResponseWriter, r *http.Request) {
    var req TokenRequest
    if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
        http.Error(w, "Invalid request", http.StatusBadRequest)
        return
    }

    token := jwt.New(jwt.SigningMethodHS256)
    claims := token.Claims.(jwt.MapClaims)
    claims["userId"] = req.UserID
    claims["exp"] = time.Now().Add(time.Hour * 1).Unix()

    tokenString, err := token.SignedString()
    if err != nil {
        http.Error(w, "Error generating token", http.StatusInternalServerError)
        return
    }

    if err := saveToken(req.UserID, tokenString); err != nil {
        http.Error(w, "Error saving token", http.StatusInternalServerError)
        return
    }

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(TokenResponse{Token: tokenString})
}

func saveToken(userID int, token string) error {
    db := getDB()
    _, err := db.Exec("INSERT INTO tokens (user_id, token, expires_at) VALUES ($1, $2, $3)",
        userID, token, time.Now().Add(time.Hour*1))
    return err
}

func getDB() *sql.DB {
    // Configuração do banco de dados (exemplo com PostgreSQL)
    db, err := sql.Open("postgres", "user=username dbname=mydb sslmode=disable")
    if err != nil {
        log.Fatal(err)
    }
    return db
}

