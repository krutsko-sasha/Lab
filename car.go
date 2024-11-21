package main

import (
	"encoding/csv"
	"encoding/json"
	"fmt"
	"os"
	"strconv"
)

type Car struct {
	Make      string `json:"make"`
	Model     string `json:"model"`
	Year      int    `json:"year"`
	Mileage   int    `json:"mileage"`
	Condition string `json:"condition"`
}

var cars []Car
const jsonFile = "cars.json"
const csvFile = "cars.csv"

// Save cars to JSON file
func saveToJSON() {
	file, err := os.Create(jsonFile)
	if err != nil {
		fmt.Println("Error creating JSON file:", err)
		return
	}
	defer file.Close()

	encoder := json.NewEncoder(file)
	encoder.SetIndent("", "  ")
	if err := encoder.Encode(cars); err != nil {
		fmt.Println("Error saving to JSON:", err)
	}
	fmt.Println("Cars saved to JSON.")
}

// Load cars from JSON file
func loadFromJSON() {
	file, err := os.Open(jsonFile)
	if err != nil {
		if os.IsNotExist(err) {
			cars = []Car{}
			return
		}
		fmt.Println("Error opening JSON file:", err)
		return
	}
	defer file.Close()

	if err := json.NewDecoder(file).Decode(&cars); err != nil {
		fmt.Println("Error decoding JSON:", err)
	}
	fmt.Println("Cars loaded from JSON.")
}

// Export cars to CSV file
func exportToCSV() {
	file, err := os.Create(csvFile)
	if err != nil {
		fmt.Println("Error creating CSV file:", err)
		return
	}
	defer file.Close()

	writer := csv.NewWriter(file)
	defer writer.Flush()

	writer.Write([]string{"Make", "Model", "Year", "Mileage", "Condition"})
	for _, car := range cars {
		writer.Write([]string{car.Make, car.Model, strconv.Itoa(car.Year), strconv.Itoa(car.Mileage), car.Condition})
	}
	fmt.Println("Cars exported to CSV.")
}

// Add a new car
func addCar() {
	var car Car
	fmt.Print("Enter Make: ")
	fmt.Scanln(&car.Make)
	fmt.Print("Enter Model: ")
	fmt.Scanln(&car.Model)
	fmt.Print("Enter Year: ")
	fmt.Scanln(&car.Year)
	fmt.Print("Enter Mileage: ")
	fmt.Scanln(&car.Mileage)
	fmt.Print("Enter Condition (New/Good/Fair/Poor): ")
	fmt.Scanln(&car.Condition)

	if car.Year < 1886 || car.Year > 2024 {
		fmt.Println("Invalid year. Must be between 1886 and current year.")
		return
	}

	cars = append(cars, car)
	fmt.Println("Car added:", car.Make, car.Model)
	saveToJSON()
}

// List all cars
func listCars() {
	for _, car := range cars {
		fmt.Printf("%s %s (%d) - Mileage: %d miles, Condition: %s\n", car.Make, car.Model, car.Year, car.Mileage, car.Condition)
	}
}

func main() {
	loadFromJSON()
	for {
		fmt.Println("\n1. Add Car")
		fmt.Println("2. List Cars")
		fmt.Println("3. Export to CSV")
		fmt.Println("4. Exit")
		fmt.Print("Choose an option: ")

		var choice int
		fmt.Scanln(&choice)

		switch choice {
		case 1:
			addCar()
		case 2:
			listCars()
		case 3:
			exportToCSV()
		case 4:
			saveToJSON()
			return
		default:
			fmt.Println("Invalid option.")
		}
	}
}
