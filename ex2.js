// 1. Оголошення змінних
let greeting = "Hello, JavaScript!";
const number = 42;
var pi = 3.14159;

// 2. Функції
function add(a, b) {
    return a + b;
}

// 3. Умовні оператори
function checkEvenOdd(n) {
    if (n % 2 === 0) {
        return "Even";
    } else {
        return "Odd";
    }
}

// 4. Цикли (for та while)
for (let i = 0; i < 3; i++) {
    console.log(`Loop iteration ${i}`);
}

let count = 0;
while (count < 3) {
    console.log(`While loop count: ${count}`);
    count++;
}

const fruits = ["Apple", "Banana", "Cherry"];
for (let fruit of fruits) {
    console.log(fruit);
}

// 5. Анонімні функції (Arrow functions)
const multiply = (x, y) => x * y;
console.log("Multiplication using arrow function:", multiply(3, 4));

// 6. Масиви та метод map (аналог спискових включень)
const squares = [1, 2, 3, 4, 5].map(x => x * x);
console.log("Squares:", squares);

// 7. Об'єкти (схожі на словники)
let person = {
    name: "Alice",
    age: 25,
    introduce() {
        return `My name is ${this.name} and I am ${this.age} years old.`;
    }
};
console.log(person.introduce());

// 8. Обробка виключень (try-catch)
try {
    let result = 10 / 0;
    if (!isFinite(result)) throw new Error("Cannot divide by zero");
} catch (error) {
    console.log("Error:", error.message);
} finally {
    console.log("finally block!");
}

// 9. Класи та об'єкти
class Animal {
    constructor(name) {
        this.name = name;
    }

    speak() {
        return `${this.name} makes a sound`;
    }
}

let animal = new Animal("Dog");
console.log(animal.speak());

// 10. Робота з промісами (Promises)
const fetchData = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Data fetched!");
        }, 1000);
    });
};

fetchData().then(data => console.log(data));
