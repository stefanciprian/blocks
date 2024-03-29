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
	Path        string     `json:"path,omitempty"`                       // Pointer makes it optional
	IsGenerated bool       `json:"is_generated,omitempty"`               // Pointer makes it optional
	IsSelected  bool       `json:"is_selected,omitempty"`                // Pointer makes it optional
	CreatedAt   *time.Time `json:"created_at,omitempty" db:"created_at"` // Pointer makes it optional
	UpdatedAt   *time.Time `json:"updated_at,omitempty" db:"updated_at"` // Pointer makes it optional
}

func AddApplication(ctx context.Context, application Application) {
	// Open SQLite database
	db, err := sql.Open("sqlite3", "./blocks.db")
	if err != nil {
		runtime.LogError(ctx, fmt.Sprintf("Failed to open database: %v", err))
		return
	}
	defer db.Close()

	// Insert data
	statement, err := db.Prepare("INSERT INTO applications (name, description, path, is_generated, is_selected, created_at, updated_at) VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)")
	if err != nil {
		runtime.LogError(ctx, fmt.Sprintf("Failed to prepare statement: %v", err))
		return
	}

	execStatement, err := statement.Exec(application.Name, application.Description, application.Path, application.IsGenerated, application.IsSelected)
	if err != nil {
		runtime.LogError(ctx, fmt.Sprintf("Failed to execute statement: %v", err))
		return
	}
	fmt.Println(execStatement)
}

func CreateApplicationTable(ctx context.Context) {
	// Open SQLite database
	db, err := sql.Open("sqlite3", "./blocks.db")
	if err != nil {
		runtime.LogError(ctx, fmt.Sprintf("Failed to open database: %v", err))
		return
	}
	defer db.Close()

	// Create table
	statement, err := db.Prepare("CREATE TABLE IF NOT EXISTS applications (id INTEGER PRIMARY KEY, name TEXT, description TEXT, path TEXT, is_generated BOOLEAN, is_selected BOOLEAN, created_at DATETIME DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP)")
	if err != nil {
		runtime.LogError(ctx, fmt.Sprintf("Failed to create table: %v", err))
		return
	}
	statement.Exec()
}

func GetApplications(ctx context.Context) []Application {
	// Open SQLite database
	db, err := sql.Open("sqlite3", "./blocks.db")
	if err != nil {
		runtime.LogError(ctx, fmt.Sprintf("Failed to open database: %v", err))
		return nil
	}
	defer db.Close()

	// Query data
	rows, err := db.Query("SELECT * FROM applications")
	if err != nil {
		runtime.LogError(ctx, fmt.Sprintf("Failed to query database: %v", err))
		return nil
	}
	defer rows.Close()

	// Get results
	var applications []Application
	for rows.Next() {
		var application Application
		err = rows.Scan(&application.ID, &application.Name, &application.Description, &application.Path, &application.IsGenerated, &application.IsSelected, &application.CreatedAt, &application.UpdatedAt)
		if err != nil {
			runtime.LogError(ctx, fmt.Sprintf("Failed to scan row: %v", err))
			return nil
		}
		applications = append(applications, application)
	}

	return applications
}

// Update is_selected to true for a given id and for the others false
func UpdateSelectedApplication(ctx context.Context, id int) {
	// Open SQLite database
	db, err := sql.Open("sqlite3", "./blocks.db")
	if err != nil {
		runtime.LogError(ctx, fmt.Sprintf("Failed to open database: %v", err))
		return
	}
	defer db.Close()

	// Update data
	statement, err := db.Prepare("UPDATE applications SET is_selected = (id = ?)")
	if err != nil {
		runtime.LogError(ctx, fmt.Sprintf("Failed to prepare statement: %v", err))
		return
	}

	execStatement, err := statement.Exec(id)
	if err != nil {
		runtime.LogError(ctx, fmt.Sprintf("Failed to execute statement: %v", err))
		return
	}
	fmt.Println(execStatement)
}

// Get the row with is_selected = true
func GetSelectedApplication(ctx context.Context) Application {
	// Open SQLite database
	db, err := sql.Open("sqlite3", "./blocks.db")
	if err != nil {
		runtime.LogError(ctx, fmt.Sprintf("Failed to open database: %v", err))
		return Application{}
	}
	defer db.Close()

	// Query data
	rows, err := db.Query("SELECT * FROM applications WHERE is_selected = 1")
	if err != nil {
		runtime.LogError(ctx, fmt.Sprintf("Failed to query database: %v", err))
		return Application{}
	}
	defer rows.Close()

	// Get results
	var application Application
	for rows.Next() {
		err = rows.Scan(&application.ID, &application.Name, &application.Description, &application.Path, &application.IsGenerated, &application.IsSelected, &application.CreatedAt, &application.UpdatedAt)
		if err != nil {
			runtime.LogError(ctx, fmt.Sprintf("Failed to scan row: %v", err))
			return Application{}
		}
	}

	return application
}
