import kotlinx.coroutines.*

sealed class Result
data class Success(val data: String) : Result()
data class Failure(val error: String) : Result()

interface Printer {
    fun print()
}

class MyClass {
    companion object {
        const val CONSTANT = "This is constant"
    }
}

fun main() {
    data class Person(val name: String, val age: Int)
    val person = Person("John", 30)
    println(person)

    fun greet(name: String = "User") {
        println("Hello, $name!")
    }
    greet()
    greet("Alice")

    fun displayInfo(name: String, age: Int) {
        println("Name: $name, Age: $age")
    }
    displayInfo(name = "Bob", age = 25)

    val age = 25
    val greeting = "I am $age years old"
    println(greeting)

    val numbers = listOf(1, 2, 3, 4)
    val doubled = numbers.map { it * 2 }
    println(doubled)

    fun String.isPalindrome(): Boolean {
        return this == this.reversed()
    }
    println("racecar".isPalindrome())

    fun getLength(obj: Any): Int {
        if (obj is String) {
            return obj.length
        }
        return 0
    }
    println(getLength("Hello"))

    val result: Result = Success("Data loaded successfully")
    when (result) {
        is Success -> println(result.data)
        is Failure -> println(result.error)
    }

    fun safeLength(str: String?): Int {
        return str?.length ?: 0
    }
    println(safeLength(null))

    fun <T> List<T>.customMap(transform: (T) -> T): List<T> {
        val result = mutableListOf<T>()
        for (item in this) {
            result.add(transform(item))
        }
        return result
    }
    val customList = numbers.customMap { it * 3 }
    println(customList)

    runBlocking {
        launch {
            println("Coroutine is running!")
        }
    }

    val myPrinter = object : Printer {
        override fun print() {
            println("Printing from anonymous object")
        }
    }
    myPrinter.print()

    println(MyClass.CONSTANT)
}
