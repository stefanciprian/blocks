package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"os/exec"
	"strings"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx

	// Create the app table
	CreateAppTable(ctx)
}

// CheckNodeJS checks if Node.js is installed and returns its version or an error.
func (a *App) CheckNodeJS() (string, error) {
	// The command to check Node.js version
	cmd := exec.Command("node", "-v")

	// Run the command and capture the output
	output, err := cmd.Output()
	if err != nil {
		// Node.js might not be installed or another error occurred
		return "", err
	}

	// Trim the output to get a clean version string
	version := strings.TrimSpace(string(output))
	return version, nil
}

func (a *App) GetApps() []Application {
	return GetApps(a.ctx)
}

func (a *App) InsertApp(applicationJsonString string) {
	var application Application
	err := json.Unmarshal([]byte(applicationJsonString), &application)
	if err != nil {
		log.Fatal(err)
	}
	AddApp(a.ctx, application)
}

func (a *App) SelectFolder() string {
	// This will open a folder selection dialog and return the selected path
	// Note: This is a placeholder. You'll need to implement the dialog functionality depending on your OS.
	folderPath, err := runtime.OpenDirectoryDialog(a.ctx, runtime.OpenDialogOptions{
		Title: "Select Folder",
	})

	if err != nil {
		fmt.Println("Error selecting folder:", err)
		return ""
	}

	return folderPath
}
