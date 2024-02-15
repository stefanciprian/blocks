package main

import (
	"context"
	"database/sql"
	"fmt"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

type Application struct {
	id          int
	name        string
	description string
	createdAt   string `db:"created_at"`
	updatedAt   string `db:"updated_at"`
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
	statement, err := db.Prepare("INSERT INTO apps (name, description, created_at, updated_at) VALUES (?)")
	if err != nil {
		runtime.LogError(ctx, fmt.Sprintf("Failed to prepare statement: %v", err))
		return
	}
	statement.Exec(application.name, application.description, application.createdAt, application.updatedAt)
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
		err = rows.Scan(&app.id, &app.name, &app.description, &app.createdAt, &app.updatedAt)
		if err != nil {
			runtime.LogError(ctx, fmt.Sprintf("Failed to scan row: %v", err))
			return nil
		}
		apps = append(apps, app)
	}

	return apps
}
