package main

import (
	"context"
	"database/sql"
	"fmt"
	"time"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

// Setting struct
type Setting struct {
	ID int `json:"id,omitempty"` // Pointer makes it optional
	// The name of the setting
	Name string `json:"name"`
	// The value of the setting
	Value     string     `json:"value"`
	CreatedAt *time.Time `json:"created_at,omitempty" db:"created_at"` // Pointer makes it optional
	UpdatedAt *time.Time `json:"updated_at,omitempty" db:"updated_at"` // Pointer makes it optional
}

func CreateSettingTable(ctx context.Context) {
	// Open SQLite database
	db, err := sql.Open("sqlite3", "./blocks.db")
	if err != nil {
		runtime.LogError(ctx, fmt.Sprintf("Failed to open database: %v", err))
		return
	}
	defer db.Close()

	// Create table
	statement, err := db.Prepare("CREATE TABLE IF NOT EXISTS settings (id INTEGER PRIMARY KEY, name TEXT, value TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP)")
	if err != nil {
		runtime.LogError(ctx, fmt.Sprintf("Failed to create table: %v", err))
		return
	}

	_, err = statement.Exec()
	if err != nil {
		runtime.LogError(ctx, fmt.Sprintf("Failed to execute statement: %v", err))
		return
	}
}

func AddSetting(ctx context.Context, setting Setting) {
	// Open SQLite database
	db, err := sql.Open("sqlite3", "./blocks.db")
	if err != nil {
		runtime.LogError(ctx, fmt.Sprintf("Failed to open database: %v", err))
		return
	}
	defer db.Close()

	// Check if setting exists
	row := db.QueryRow("SELECT * FROM settings WHERE name = ?", setting.Name)
	var existingSetting Setting
	err = row.Scan(&existingSetting.ID, &existingSetting.Name, &existingSetting.Value, &existingSetting.CreatedAt, &existingSetting.UpdatedAt)
	if err == nil {
		// Setting exists, update it
		return
	}

	// Insert data
	statement, err := db.Prepare("INSERT INTO settings (name, value, created_at, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)")
	if err != nil {
		runtime.LogError(ctx, fmt.Sprintf("Failed to prepare statement: %v", err))
		return
	}

	_, err = statement.Exec(setting.Name, setting.Value)
	if err != nil {
		runtime.LogError(ctx, fmt.Sprintf("Failed to execute statement: %v", err))
		return
	}
}

func GetSetting(ctx context.Context, name string) (Setting, error) {
	// Open SQLite database
	db, err := sql.Open("sqlite3", "./blocks.db")
	if err != nil {
		runtime.LogError(ctx, fmt.Sprintf("Failed to open database: %v", err))
		return Setting{}, err
	}
	defer db.Close()

	// Query data
	row := db.QueryRow("SELECT * FROM settings WHERE name = ?", name)
	var setting Setting
	err = row.Scan(&setting.ID, &setting.Name, &setting.Value, &setting.CreatedAt, &setting.UpdatedAt)
	if err != nil {
		runtime.LogError(ctx, fmt.Sprintf("Failed to scan row: %v", err))
		return Setting{}, err
	}

	return setting, nil
}

func SettingExists(ctx context.Context, name string) bool {
	// Open SQLite database
	db, err := sql.Open("sqlite3", "./blocks.db")
	if err != nil {
		runtime.LogError(ctx, fmt.Sprintf("Failed to open database: %v", err))
		return false
	}
	defer db.Close()

	// Query data
	row := db.QueryRow("SELECT * FROM settings WHERE name = ?", name)
	var setting Setting
	err = row.Scan(&setting.ID, &setting.Name, &setting.Value, &setting.CreatedAt, &setting.UpdatedAt)
	if err != nil {
		return false
	}

	return true
}

func UpdateSetting(ctx context.Context, setting Setting) error {
	// Open SQLite database
	db, err := sql.Open("sqlite3", "./blocks.db")
	if err != nil {
		runtime.LogError(ctx, fmt.Sprintf("Failed to open database: %v", err))
		return err
	}
	defer db.Close()

	// Update data
	statement, err := db.Prepare("UPDATE settings SET value = ?, updated_at = CURRENT_TIMESTAMP WHERE name = ?")
	if err != nil {
		runtime.LogError(ctx, fmt.Sprintf("Failed to prepare statement: %v", err))
		return err
	}

	_, err = statement.Exec(setting.Value, setting.Name)
	if err != nil {
		runtime.LogError(ctx, fmt.Sprintf("Failed to execute statement: %v", err))
		return err
	}

	return nil
}
