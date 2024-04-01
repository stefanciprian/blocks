package main

import (
	"bytes"
	"context"
	"encoding/csv"
	"fmt"
	"io"
	"os"

	"github.com/dstotijn/go-notion"
)

func GetNotionDatabase(ctx context.Context, notionSecretKey string, databaseID string) notion.Database {
	client := notion.NewClient(notionSecretKey)
	// Get the page content
	database, err := client.FindDatabaseByID(context.Background(), databaseID)
	if err != nil {
		// Handle error...
		println("Error:", err.Error())
	}
	// Print the page title
	println("Database title:", database.ID)

	return database
}

func GenerateCSVFromNotionDatabase(ctx context.Context, database notion.Database) {
	// Headers for the CSV
	headers := []string{}
	// Get Properties
	for _, property := range database.Properties {
		println("Property:", property.Name)
		headers = append(headers, property.Name)
	}

	file, err := os.Create("Notion_Import.csv")
	if err != nil {
		panic(err)
	}
	defer file.Close()

	writer := csv.NewWriter(file)
	defer writer.Flush()
	if err := writer.Write(headers); err != nil {
		panic(err)
	}

	rows := [][]string{
		// Add more rows as needed
	}

	for _, row := range rows {
		if err := writer.Write(row); err != nil {
			panic(err)
		}
	}
}

func ImportCSVFileForNotionDB(ctx context.Context, fileData []byte, fileName string) {
	fmt.Println("File Name:", fileName)

	// Create a new reader for the file data
	reader := csv.NewReader(bytes.NewBuffer(fileData))

	// Optionally, configure the reader according to your CSV file's format
	// For example, to change the field delimiter to a semicolon:
	// reader.Comma = ';'

	// Read and print each record (line)
	for {
		record, err := reader.Read()
		if err == io.EOF {
			break // End of file
		}
		if err != nil {
			fmt.Println("Error reading CSV:", err)
			return
		}

		// Process the record (a slice of fields for the current row)
		fmt.Println(record) // Or process the record as needed
	}
}
