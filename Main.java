import java.util.Optional;
import java.util.function.Function;

public class Main {
    // 1. Record: Легке створення immutable класів із вбудованою підтримкою equals/hashCode
    public record Point(int x, int y) {}

    // 2. Клас із обов'язковими полями через Builder
    public static class Address {
        private final String city;
        private final String country;

        private Address(Builder builder) {
            this.city = builder.city;
            this.country = builder.country;
        }

        public static class Builder {
            private String city;
            private String country;

            public Builder setCity(String city) {
                this.city = city;
                return this;
            }

            public Builder setCountry(String country) {
                this.country = country;
                return this;
            }

            public Address build() {
                if (city == null || country == null) {
                    throw new IllegalArgumentException("City and Country are required!");
                }
                return new Address(this);
            }
        }

        @Override
        public String toString() {
            return city + ", " + country;
        }
    }

    // 3. Клас із Nullable та Optional
    public static class User {
        private final String name;
        private final String email;

        public User(String name, String email) {
            this.name = name;
            this.email = email == null ? "default@example.com" : email;
        }

        public Optional<String> getName() {
            return Optional.ofNullable(name);
        }

        public String getEmail() {
            return email;
        }
    }

    public static void main(String[] args) {
        System.out.println("Hello, Java World!");

        // 1. Records
        Point point1 = new Point(10, 20);
        Point point2 = new Point(10, 20);
        System.out.println(point1.equals(point2)); // true

        // 2. Address через Builder
        Address address = new Address.Builder()
                .setCity("Paris")
                .setCountry("France")
                .build();
        System.out.println("Address: " + address);

        // 3. Optional та null-safe робота
        User user = new User(null, "user@example.com");
        user.getName().ifPresentOrElse(
                name -> System.out.println("User Name: " + name),
                () -> System.out.println("Name is not provided.")
        );
        System.out.println("User Email: " + user.getEmail());

        // 4. Switch Expressions та Pattern Matching
        Object obj = 42;

        switch (obj) {
            case Integer i when i < 50 -> System.out.println("The number " + i + " is less than 50.");
            case Integer i when i >= 50 && i <= 75 -> System.out.println("The number " + i + " is between 50 and 75.");
            case Integer i -> System.out.println("The number " + i + " is greater than 75.");
            case null -> System.out.println("The object is null.");
            default -> System.out.println("The object is of a different type.");
        }

        // 5. Лямбда-функції та функціональне програмування
        Function<Integer, Integer> square = x -> x * x;
        System.out.println("Square of 5: " + square.apply(5));

        // 6. Streams і колекції
        var numbers = java.util.List.of(1, 2, 3, 4, 5);
        var evenNumbers = numbers.stream()
                .filter(n -> n % 2 == 0)
                .toList();
        System.out.println("Even Numbers: " + evenNumbers);

        // 7. Модифікація об'єктів через "with-like" підхід
        var updatedPoint = new Point(point1.x(), 30); // Створюємо нову версію об'єкта
        System.out.println("Updated Point: " + updatedPoint);
    }
}
