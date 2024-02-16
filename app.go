package main

import (
	"context"
	"encoding/json"
	"log"
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

// InsertApp inserts a new app into the database
func (a *App) InsertApp(applicationJsonString string) {
	var application Application
	err := json.Unmarshal([]byte(applicationJsonString), &application)
	if err != nil {
		log.Fatal(err)
	}
	AddApp(a.ctx, application)
}

func (a *App) GetApps() []Application {
	return GetApps(a.ctx)
}
