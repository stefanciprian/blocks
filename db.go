package main

import (
	"context"
	"database/sql"
	"fmt"
	"time"

	_ "github.com/mattn/go-sqlite3"
	"github.com/wailsapp/wails/v2/pkg/runtime"
)

type Application struct {
	ID          *int       `json:"id,omitempty"` // Pointer makes it optional
	Name        string     `json:"name"`
	Description string     `json:"description"`
	CreatedAt   *time.Time `json:"created_at,omitempty" db:"created_at"` // Pointer makes it optional
	UpdatedAt   *time.Time `json:"updated_at,omitempty" db:"updated_at"` // Pointer makes it optional
}

func AddApp(ctx context.Context, application Application) {
	// Open SQLite database
	db, err := sql.Open("sqlite3", "./blocks.db")
	if err != nil {
		runtime.LogError(ctx, fmt.Sprintf("Failed to open database: %v", err))
		return
	}
	defer db.Close()

	// Insert data
	statement, err := db.Prepare("INSERT INTO apps (name, description, created_at, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)")
	if err != nil {
		runtime.LogError(ctx, fmt.Sprintf("Failed to prepare statement: %v", err))
		return
	}

	execStatement, err := statement.Exec(application.Name, application.Description)
	if err != nil {
		runtime.LogError(ctx, fmt.Sprintf("Failed to execute statement: %v", err))
		return
	}
	fmt.Println(execStatement)
}

func CreateAppTable(ctx context.Context) {
	// Open SQLite database
	db, err := sql.Open("sqlite3", "./blocks.db")
	if err != nil {
		runtime.LogError(ctx, fmt.Sprintf("Failed to open database: %v", err))
		return
	}
	defer db.Close()

	// Create table
	statement, err := db.Prepare("CREATE TABLE IF NOT EXISTS apps (id INTEGER PRIMARY KEY, name TEXT, description TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP)")
	if err != nil {
		runtime.LogError(ctx, fmt.Sprintf("Failed to create table: %v", err))
		return
	}
	statement.Exec()
}

func GetApps(ctx context.Context) []Application {
	// Open SQLite database
	db, err := sql.Open("sqlite3", "./blocks.db")
	if err != nil {
		runtime.LogError(ctx, fmt.Sprintf("Failed to open database: %v", err))
		return nil
	}
	defer db.Close()

	// Query data
	rows, err := db.Query("SELECT * FROM apps")
	if err != nil {
		runtime.LogError(ctx, fmt.Sprintf("Failed to query database: %v", err))
		return nil
	}
	defer rows.Close()

	// Get results
	var apps []Application
	for rows.Next() {
		var app Application
		err = rows.Scan(&app.ID, &app.Name, &app.Description, &app.CreatedAt, &app.UpdatedAt)
		if err != nil {
			runtime.LogError(ctx, fmt.Sprintf("Failed to scan row: %v", err))
			return nil
		}
		apps = append(apps, app)
	}

	return apps
}
