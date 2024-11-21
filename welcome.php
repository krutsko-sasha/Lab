<?php

// 1. Class
class Car {
    // Properties
    private $make;
    private $model;
    private $year;
    private $isRunning = false;
    private $fuelLevel;
    private $mileage;
    private $condition;
    private $serviceHistory = [];
    private static $history = [];

    // Constructor
    public function __construct($make, $model, $year, $fuelLevel = 100, $mileage = 0, $condition = 'New') {
        $this->make = $make;
        $this->model = $model;
        $this->year = $year;
        $this->fuelLevel = $fuelLevel;
        $this->mileage = $mileage;
        $this->condition = $condition;
        self::$history[] = ["make" => $make, "model" => $model, "year" => $year, "mileage" => $mileage, "condition" => $condition];
    }

    // 2. Methods
    public function start() {
        if (!$this->isRunning) {
            if ($this->fuelLevel > 0) {
                $this->isRunning = true;
                echo "The car has started.\n";
            } else {
                echo "Cannot start the car. Fuel tank is empty!\n";
            }
        } else {
            echo "The car is already running.\n";
        }
    }

    public function stop() {
        if ($this->isRunning) {
            $this->isRunning = false;
            echo "The car has stopped.\n";
        } else {
            echo "The car is already stopped.\n";
        }
    }

    public function drive($distance) {
        if ($this->isRunning) {
            $fuelConsumed = $distance * 0.1;
            if ($this->fuelLevel >= $fuelConsumed) {
                $this->mileage += $distance;
                $this->fuelLevel -= $fuelConsumed;
                echo "Drove $distance miles. Current mileage: {$this->mileage} miles, Fuel level: {$this->fuelLevel}%\n";
                $this->checkMileage();
            } else {
                echo "Not enough fuel to drive that distance.\n";
            }
        } else {
            echo "Start the car before driving.\n";
        }
    }

    // 3. union types
    public function refuel(int|float $amount) {
        if ($amount < 0) {
            echo "Cannot refuel with a negative amount.\n";
            return;
        }

        $this->fuelLevel += $amount;
        if ($this->fuelLevel > 100) {
            $this->fuelLevel = 100; 
        }
        echo "Refueled. Current fuel level: {$this->fuelLevel}%\n";
    }

    public function displayDetails() {
        echo "Car Details: {$this->year} {$this->make} {$this->model}\n";
        echo "Mileage: {$this->mileage} miles\n";
        echo "Fuel Level: {$this->fuelLevel}%\n";
        echo "Condition: {$this->condition}\n";
        echo "Service History:\n";
        foreach ($this->serviceHistory as $service) {
            echo "- " . $service . "\n";
        }
    }

    public function rateCondition($rating) {
        $validRatings = ['New', 'Good', 'Fair', 'Poor'];
        if (in_array($rating, $validRatings)) {
            $this->condition = $rating;
            echo "Condition updated to: $rating\n";
        } else {
            echo "Invalid rating. Please choose from: " . implode(", ", $validRatings) . ".\n";
        }
    }

    public function addServiceRecord($service) {
        $this->serviceHistory[] = $service;
        echo "Service record added: $service\n";
    }

    private function checkMileage() {
        if ($this->mileage % 5000 == 0) {
            echo "The car should be serviced soon (mileage: {$this->mileage}).\n";
        }
    }

    // 4. Display car history(array)
    public static function displayHistory() {
        if (empty(self::$history)) {
            echo "No car history available.\n";
            return;
        }
        foreach (self::$history as $index => $car) {
            echo "Car #$index: {$car['year']} {$car['make']} {$car['model']} - Mileage: {$car['mileage']} miles, Condition: {$car['condition']}\n";
        }
    }

    // 5. Save car data to JSON
    // 6. Error handling
    public function saveToJson($filePath = 'cars.json') {
        try {
            $jsonData = json_encode(self::$history, JSON_PRETTY_PRINT);
            if (file_put_contents($filePath, $jsonData) === false) {
                throw new Exception("Error saving car data to $filePath");
            }
            echo "Car data saved to $filePath\n";
        } catch (Exception $e) {
            echo $e->getMessage() . "\n";
        }
    }

    // 7. Load car data from JSON file
    public static function loadFromJson($filePath = 'cars.json') {
        if (!file_exists($filePath)) {
            echo "No data file found at $filePath\n";
            return;
        }

        try {
            $jsonData = file_get_contents($filePath);
            if ($jsonData === false) {
                throw new Exception("Error reading from $filePath");
            }

            self::$history = json_decode($jsonData, true);
            if (json_last_error() !== JSON_ERROR_NONE) {
                throw new Exception("Error decoding JSON data: " . json_last_error_msg());
            }
            echo "Car data loaded from $filePath\n";
        } catch (Exception $e) {
            echo $e->getMessage() . "\n";
        }
    }

    // 8. Validate car data before adding
    public static function validateCarData($make, $model, $year) {
        if (empty($make) || empty($model)) {
            throw new InvalidArgumentException("Make and model are required.");
        }

        if ($year < 1886 || $year > date("Y")) {
            throw new InvalidArgumentException("Invalid year provided. Year must be between 1886 and the current year.");
        }
    }

    // 9. Export data to CSV
    public static function exportToCsv($filePath = 'cars.csv') {
        try {
            $file = fopen($filePath, 'w');
            if (!$file) {
                throw new Exception("Could not open the file for writing.");
            }

            fputcsv($file, ['Make', 'Model', 'Year', 'Mileage', 'Condition']);
            foreach (self::$history as $car) {
                fputcsv($file, $car);
            }
            fclose($file);
            echo "Car data exported to $filePath\n";
        } catch (Exception $e) {
            echo $e->getMessage() . "\n";
        }
    }
}

// Main script execution
try {
    $car1 = new Car("Toyota", "Camry", 2020);
    $car1->start();
    $car1->drive(50);
    $car1->refuel(30); 
    $car1->stop();
    $car1->rateCondition("New"); 
    $car1->addServiceRecord("Oil change at 5000 miles"); 
    $car1->saveToJson(); 
    
    $car2 = new Car("Honda", "Civic", 2023);
    $car2->start();
    $car2->drive(50);
    $car2->refuel(30); 
    $car2->stop();
    $car2->rateCondition("New"); 
    $car2->addServiceRecord("Oil change at 10000 miles"); 
    $car2->saveToJson();
    Car::loadFromJson(); 

    // Display history of cars
    Car::displayHistory();

    // 10. Example of adding a new car using command line arguments
    if ($argc > 10) {
        $make = $argv[1];
        $model = $argv[2];
        $year = (int)$argv[3];

        // Validate input
        Car::validateCarData($make, $model, $year);
        
        $newCar = new Car($make, $model, $year);
        $newCar->displayDetails();
    } else {
        echo "No car data provided. Please run the script with arguments: make model year\n";
    }

    // Export to CSV
    Car::exportToCsv(); // Export data to CSV file
} catch (Exception $e) {
    echo "An error occurred: " . $e->getMessage() . "\n";
}

?>
