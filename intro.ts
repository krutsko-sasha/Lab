// 1. simple types
// number type 
let userId = 33453.3
userId.toFixed()
console.log(userId)

//boolean type
let isLoggedIn: boolean = false


// 2. special types
//any type
let hero: any;

function getHero(){
    return "Superman";
}
hero = getHero()

// never type
type Fruit = "Apple" | "Banana" | "Orange";

function describeFruit(fruit: Fruit): string {
  switch (fruit) {
    case "Apple":
      return "This is an Apple!";
    case "Banana":
      return "This is a Banana!";
    case "Orange":
      return "This is an Orange!";
    default:
      const exhaustiveCheck: never = fruit; 
      return exhaustiveCheck;
  }
}

// Output: "This is an Apple!"
console.log(describeFruit("Apple"));

//unknown type
function handleUnknown(input: unknown) {
    if (typeof input === "string") {
      console.log(input.toUpperCase());
    } else if (typeof input === "number") {
      console.log(input.toFixed(2));
    } else {
      console.log("Input is neither a string nor a number.");
    }
  }
  
  handleUnknown("TypeScript"); 
  handleUnknown(3.14159);      
  handleUnknown(true);       


//3. functions
function add(a: number, b: number): number {
    return a + b;
  }
  
  console.log(add(5, 3));

// 4. Interfaces
interface Person {
    name: string;
    age: number;
    greet(): void;
  }
  
  const user: Person = {
    name: "John",
    age: 30,
    greet() {
      console.log(`Hello, my name is ${this.name}`);
    },
  };
  
  user.greet();

  // 5. Arrrays
let numbers: number[] = [1, 2, 3, 4, 5];

let fruits: string[] = ["Apple", "Banana", "Orange"];

console.log(numbers[0]);
console.log(fruits[1]);  

// 6. tuples
// Define a tuple type for student details
type Student = [string, number, number[]]; // [name, age, grades]

function createStudent(name: string, age: number, grades: number[]): Student {
    return [name, age, grades];
}

// Function to calculate the average grade of a student
function calculateAverageGrade(student: Student): number {
    const grades = student[2]; // Access grades using tuple indexing
    const total = grades.reduce((sum, grade) => sum + grade, 0);
    return total / grades.length;
}

function displayStudentInfo(student: Student): void {
    const [name, age, grades] = student; // Destructure tuple
    const averageGrade = calculateAverageGrade(student);
    
    console.log(`Name: ${name}`);
    console.log(`Age: ${age}`);
    console.log(`Grades: ${grades.join(", ")}`);
    console.log(`Average Grade: ${averageGrade.toFixed(2)}`);
}

const students: Student[] = [
    createStudent("Alice", 20, [88, 92, 95]),
    createStudent("Bob", 22, [76, 85, 90]),
    createStudent("Charlie", 21, [100, 100, 100]),
];

students.forEach(displayStudentInfo);

// 7. enum
enum Day {
    Sunday = "Sunday",
    Monday = "Monday",
    Tuesday = "Tuesday",
    Wednesday = "Wednesday",
    Thursday = "Thursday",
    Friday = "Friday",
    Saturday = "Saturday",
}

function getDayMessage(day: Day): string {
    switch (day) {
        case Day.Sunday:
            return "It's Sunday! Time to relax.";
        case Day.Monday:
            return "It's Monday! Back to work.";
        case Day.Tuesday:
            return "It's Tuesday! Keep going.";
        case Day.Wednesday:
            return "It's Wednesday! Halfway through the week.";
        case Day.Thursday:
            return "It's Thursday! Almost the weekend.";
        case Day.Friday:
            return "It's Friday! The weekend is near.";
        case Day.Saturday:
            return "It's Saturday! Enjoy your day off.";
        default:
            return "Unknown day!";
    }
}

const today: Day = Day.Wednesday;
console.log(getDayMessage(today));

// 8. union types
// Define types for rectangle and circle
type Rectangle = {
    shape: "rectangle";
    width: number;
    height: number;
};

type Circle = {
    shape: "circle";
    radius: number;
};

// Union type for Shape
type Shape = Rectangle | Circle;

function calculateArea(shape: Shape): number {
    if (shape.shape === "rectangle") {
        return shape.width * shape.height;
    } else if (shape.shape === "circle") {
        return Math.PI * shape.radius * shape.radius; 
    }
    throw new Error("Unknown shape type");
}

const myRectangle: Rectangle = { shape: "rectangle", width: 10, height: 5 };
const myCircle: Circle = { shape: "circle", radius: 7 };

console.log(`Area of Rectangle: ${calculateArea(myRectangle)}`); 
console.log(`Area of Circle: ${calculateArea(myCircle)}`);       

// 9. Ts casting

// Define an interface for a User
interface User {
    id: number;
    name: string;
    email: string;
}

// A function that returns a user object as a plain object
function getUser(): any {
    return {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        extraField: "This should not be here", // Extra field
    };
}

const userFromApi: any = getUser();

const newUser: User = userFromApi as User;

console.log(`User ID: ${newUser.id}`); 
console.log(`User Name: ${newUser.name}`); 
console.log(`User Email: ${newUser.email}`); 

//10. Generics
// ----------------- generic function
function getFirstElement<T>(arr: T[]): T | undefined {
    return arr[0];
}

const numberArray = [1, 2, 3, 4, 5];
const firstNumber = getFirstElement(numberArray);
console.log(`First number: ${firstNumber}`); 

const stringArray = ["apple", "banana", "cherry"];
const firstString = getFirstElement(stringArray);
console.log(`First string: ${firstString}`); 

//-------------------------- generic class
class Stack<T> {
    private items: T[] = [];

    push(item: T): void {
        this.items.push(item);
    }

    pop(): T | undefined {
        return this.items.pop();
    }

    peek(): T | undefined {
        return this.items[this.items.length - 1];
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }
}

const numberStack = new Stack<number>();
numberStack.push(1);
numberStack.push(2);
console.log(`Popped from number stack: ${numberStack.pop()}`); 

const stringStack = new Stack<string>();
stringStack.push("hello");
stringStack.push("world");
console.log(`Top of string stack: ${stringStack.peek()}`); 