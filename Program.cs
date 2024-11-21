using System;

// Define a record struct to represent a point in 2D space
public record struct Point(int X, int Y);

public class Address
{
    public required string City { get; set; }    // 'City' is required for Address initialization
    public required string Country { get; set; } // 'Country' is required for Address initialization
}

public class Person
{
    public required string Name { get; set; }   // 'Name' is required for Person initialization
    public int Age { get; set; }                // Optional property
    public required Address Address { get; set; } // 'Address' is required and must be initialized
}

//---------------------

public class Buffer<T> where T : unmanaged
{
    private T[] _data;

    public Buffer(int size)
    {
        _data = new T[size];
    }

    public T this[int index]
    {
        get => _data[index];
        set => _data[index] = value;
    }
}
// 10. User Class with Nullable Reference Types
public class User
{
    public string? Name { get; set; } // Nullable
    public string Email { get; set; } = string.Empty; // Non-nullable
}


class Program
{
    static void Main()
    {
        Console.WriteLine("Hello, World!");

        // 1. Record structs: Easy creation of immutable value types with value equality
        var point1 = new Point(10, 20);
        var point2 = new Point(10, 20);
        Console.WriteLine(point1 == point2); // Output: True

        // 2. List Patterns: Match specific structures in collections
        int[] numbers = { 1, 2, 3, 4, 5 };
        if (numbers is [1, 2, .., 5]) // Match pattern starting with 1, 2 and ending with 5
        {
            Console.WriteLine("Pattern matched!");
        }

        // 3. UTF-8 String Literals: Improved support for UTF-8 encoded strings
        ReadOnlySpan<byte> bytes = "Hello, World!"u8; // UTF-8 encoded string
        Console.WriteLine(bytes.Length); // Output: 13

        // 4. `with` Keyword on Anonymous Types: Easier data transformations
        var personAnon = new { Name = "John", Age = 30 };
        var olderPersonAnon = personAnon with { Age = 35 };
        Console.WriteLine(olderPersonAnon); // Output: { Name = John, Age = 35 }

        // 5. Extended Property Patterns and Required Properties
        var alice = new Person
        {
            Name = "Alice",
            Age = 30,
            Address = new Address
            {
                City = "Paris",
                Country = "France"
            }
        };

        if (alice is { Address.City: "Paris", Address.Country: "France" })
        {
            Console.WriteLine("Person lives in Paris, France");
        }

        // 6. Unmanaged Constraint Enhancements
        Buffer<int> intBuffer = new Buffer<int>(10);
        intBuffer[0] = 42;
        Console.WriteLine(intBuffer[0]); // Output: 42

        // 7. New default Keyword Enhancements
        var defaultInt = default(int); // 0
        var defaultString = default(string); // null
        var defaultPoint = default(Point); // Point with default values

        Console.WriteLine($"Default int: {defaultInt}, Default string: {defaultString}, Default Point: ({defaultPoint.X}, {defaultPoint.Y})");

        // 8. Improvements to Pattern Matching: Using 'and', 'or', and 'not' patterns
        
        object obj = new Random().Next(0, 100); 

        switch (obj)
        {
            case int number when number < 50:
                Console.WriteLine($"The number {number} is less than 50.");
                break;

            case int number when number >= 50 && number <= 75:
                Console.WriteLine($"The number {number} is between 50 and 75.");
                break;

            case int number when number > 75 || number == 100:
                Console.WriteLine($"The number {number} is greater than 75 or equal to 100.");
                break;

            case not null:
                Console.WriteLine("The object is not null and is of a different type.");
                break;

            default:
                Console.WriteLine("The object is null.");
                break;
        }

        //9. Improved Lambda Expressions
        Func<int, int> square = (x) => x * x; // Simplified syntax
        Console.WriteLine($"Square of 5: {square(5)}"); // Output: Square of 5: 25

        //10
        var user = new User { Name = null, Email = "user@example.com" };
        Console.WriteLine($"User Email: {user.Email}"); // Output: User Email: user@example.com
}
}



