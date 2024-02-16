package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"

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
	folderPath, err := runtime.OpenFileDialog(a.ctx, runtime.OpenDialogOptions{
		Title: "Select Folder",
	})

	if err != nil {
		fmt.Println("Error selecting folder:", err)
		return ""
	}

	return folderPath
}
