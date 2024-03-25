package main

import (
	"context"

	"github.com/dstotijn/go-notion"
)

func GetNotionPage() {
	client := notion.NewClient("secret-api-key")
	// Get the page content
	page, err := client.FindPageByID(context.Background(), "18d35eb5-91f1-4dcb-85b0-c340fd965015")
	if err != nil {
		// Handle error...
		println("Error:", err.Error())
	}
	// Print the page title
	println("Page title:", page.ID)
}
