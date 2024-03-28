package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"os"
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
	CreateApplicationTable(ctx)
	// Create the setting table
	CreateSettingTable(ctx)

	// Insert setting if it doesn't exist
	if !SettingExists(ctx, "notion_api_key") {
		AddSetting(ctx, Setting{Name: "notion_api_key", Value: ""})
	}
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

func (a *App) GenerateApplication(applicationJsonString string) {
	var application Application
	err := json.Unmarshal([]byte(applicationJsonString), &application)
	if err != nil {
		log.Fatal(err)
	}
	log.Println(application)
	// Check if NestJS is installed
	cmdNestJS := exec.Command("nest", "-v")
	_, errNestJS := cmdNestJS.Output()

	if errNestJS != nil {
		// NestJS is not installed
		fmt.Println("NestJS is not installed. Please install it using the following command:")
		fmt.Println("npm install -g @nestjs/cli")
		// Install NestJS
		cmdInstallNestJS := exec.Command("npm", "install", "-g", "@nestjs/cli")
		_, errInstallNestJS := cmdInstallNestJS.Output()
		if errInstallNestJS != nil {
			// An error occurred
			fmt.Println("Error installing NestJS:", errInstallNestJS)
			return
		}
	}

	// Change to the selected folder
	err = os.Chdir(application.Path)
	if err != nil {
		fmt.Println("Error changing directory:", err)
		return
	}

	// The command to generate a NestJS app
	// nest new backend --skip-git --package-manager=npm --no-interactive

	cmd := exec.Command("nest", "new", application.Name, "--skip-git", "--package-manager=npm")
	// Run the command and capture the output
	output, err := cmd.CombinedOutput()
	if err != nil {
		// An error occurred
		fmt.Println("Error generating app:", err)
		fmt.Println(string(output))
		return
	}

	// Success

	fmt.Println("Application generated successfully!")
}

func (a *App) GetApplications() []Application {
	return GetApplications(a.ctx)
}

func (a *App) GetSelectedApplication() Application {
	return GetSelectedApplication(a.ctx)
}

func (a *App) InsertApplication(applicationJsonString string) {
	var application Application
	err := json.Unmarshal([]byte(applicationJsonString), &application)
	if err != nil {
		log.Fatal(err)
	}
	AddApplication(a.ctx, application)
}

func (a *App) SelectApplication(id int) {
	UpdateSelectedApplication(a.ctx, id)
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

func (a *App) UpdateSetting(settingsJsonString string) {
	var setting Setting
	err := json.Unmarshal([]byte(settingsJsonString), &setting)
	if err != nil {
		log.Fatal(err)
	}
	UpdateSetting(a.ctx, setting)
}
