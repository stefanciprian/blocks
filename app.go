package main

import (
	"context"
	"fmt"
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

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

// InsertApp inserts a new app into the database
func (a *App) InsertApp(application Application) {
	AddApp(a.ctx, application)
}

func (a *App) GetApps() []Application {
	return GetApps(a.ctx)
}
