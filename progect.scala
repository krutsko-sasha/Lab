// 1. Оголошення змінних (val - незмінні, var - змінні)
val greeting: String = "Hello, Scala!"
var number: Int = 42
val pi: Double = 3.14159

// 2. Функції з параметрами та типами
def add(a: Int, b: Int): Int = a + b

// 3. Умовні оператори (if-else як вираз)
def checkEvenOdd(n: Int): String = if (n % 2 == 0) "Even" else "Odd"

// 4. Цикли (for та while)
def loopExamples(): Unit = {
  for (i <- 0 until 3) {
    println(s"For loop iteration $i")
  }

  var count = 0
  while (count < 3) {
    println(s"While loop count: $count")
    count += 1
  }
}

// 5. Лямбда-функції (анонімні функції)
def lambdaExample(): Unit = {
  val multiply: (Int, Int) => Int = (x, y) => x * y
  println(s"Multiplication using lambda: ${multiply(3, 4)}")
}

// 6. Колекції та map/filter/reduce
def collectionExample(): Unit = {
  val squares = (1 to 5).map(x => x * x)
  println(s"Squares: ${squares.mkString(", ")}")
}

// 7. Класи з параметрами-конструкторами та методами
class Person(val name: String, val age: Int) {
  def introduce(): String = s"My name is $name and I am $age years old."
}

def classExample(): Unit = {
  val person = new Person("Alice", 25)
  println(person.introduce())
}

// 8. Обробка виключень
def exceptionHandling(): Unit = {
  try {
    val result = 10 / 0
  } catch {
    case ex: ArithmeticException => println(s"Error: ${ex.getMessage}")
  }
}

// 9. Наслідування та поліморфізм
abstract class Animal {
  def speak(): String
}

class Dog extends Animal {
  override def speak(): String = "Woof!"
}

def inheritanceExample(): Unit = {
  val dog: Animal = new Dog
  println(dog.speak())
}

// 10. Робота з файлами
import scala.io.Source
import java.io.PrintWriter

def fileExample(): Unit = {
  val fileName = "example.txt"
  val writer = new PrintWriter(fileName)
  writer.write("Hello, this is an example file!")
  writer.close()

  val content = Source.fromFile(fileName).getLines.mkString("\n")
  println(s"File content: $content")

  new java.io.File(fileName).delete()
}

// Головна функція для виклику всіх прикладів
@main def runExamples(): Unit = {
  println(greeting)
  println(s"Addition: ${add(5, 3)}")
  println(s"Check if number is even or odd: ${checkEvenOdd(number)}")

  loopExamples()
  lambdaExample()
  collectionExample()
  classExample()
  exceptionHandling()
  inheritanceExample()
  fileExample()
}
