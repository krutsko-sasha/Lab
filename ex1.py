# 1. Оголошення змінних
greeting = "Hello, Python!"
number = 42
pi = 3.14159
print(greeting, number, pi)

# 2. Функції
def add(a, b):
    return a + b

# 3. Умовні оператори
def check_even_odd(n):
    if n % 2 == 0:
        return "Even"
    else:
        return "Odd"

# 4. Цикли (for та while)
for i in range(3):
    print(f"Loop iteration {i}")

count = 0
while count < 3:
    print(f"While loop count: {count}")
    count += 1

# 5. Анонімні функції (lambda)
multiply = lambda x, y: x * y
print("Multiplication using lambda:", multiply(3, 4))

# 6. Спискові включення (list comprehension)
squares = [x**2 for x in range(5)]
print("Squares:", squares)

# 7. Робота з масивами (списками) та словниками
my_list = [1, 2, 3, 4]
my_list.append(5)
my_list.pop()
my_list.remove(2)

my_dict = {"name": "Alice", "age": 25}
my_dict["city"] = "New York"
print(my_dict["name"])

# 8. Обробка виключень (exceptions)
try:
    result = 10 / 0
except ZeroDivisionError:
    result = "Cannot divide by zero"
finally:
    print("finally block!")
print("Division result:", result)

# 9. Класи та об'єкти
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def introduce(self):
        return f"My name is {self.name} and I am {self.age} years old."

person = Person("Alice", 30)
print(person.introduce())

# 10. Робота з файлами
with open("example.txt", "w") as file:
    file.write("Hello, this is python!")
with open("example.txt", "r") as file:
    content = file.read()
print("File content:", content)
