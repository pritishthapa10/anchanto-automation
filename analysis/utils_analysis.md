# Analysis of the `/utils` Folder

## a. What This Folder Stores

The `/utils` folder contains utility/helper TypeScript files that provide reusable functions and classes to support the main test automation framework. These utilities are designed to simplify common tasks such as generating random test data and loading test data from external files (JSON, CSV). They are used throughout the test suite to improve maintainability, reduce code duplication, and enable data-driven testing.

## b. Structure of the Files

Each file in this folder is a TypeScript module exporting a class with static methods. The structure is as follows:

- **Imports**: Node.js and third-party libraries (e.g., `@faker-js/faker`, `fs`, `csv-parse/sync`).
- **Class Definition**: Each utility is encapsulated in a class with only static methods, so they can be called without instantiating the class.
- **Static Methods**: Each method provides a specific utility function, such as generating a random email or reading test data from a file.

## c. File-by-File Analysis

### 1. `randomDataGenerator.ts`

- **Purpose**: Provides a set of static methods for generating random data using the `@faker-js/faker` library.
- **Key Features**:
  - Methods for generating random first names, last names, full names, emails, phone numbers, usernames, passwords, countries, states, cities, addresses, PIN codes, alphanumeric/numeric strings, and UUIDs.
  - Useful for creating unique test data for registration, login, and other scenarios where unique or random values are required.
- **Example Usage**: `RandomDataUtil.getEmail()` returns a random email address.

### 2. `dataProvider.ts`

- **Purpose**: Provides static methods to load test data from external JSON and CSV files.
- **Key Features**:
  - `getTestDataFromJson(filePath: string)`: Reads and parses a JSON file, returning the data as an object/array.
  - `getTestDataFromCsv(filePath: string)`: Reads and parses a CSV file using the `csv-parse/sync` library, returning the data as an array of objects.
  - Enables data-driven testing by allowing tests to iterate over multiple data sets.
- **Example Usage**: `DataProvider.getTestDataFromCsv('testdata/logindata.csv')` returns an array of test data rows.

## Summary Table

| File                   | Main Purpose              | Key Methods/Features                       |
| ---------------------- | ------------------------- | ------------------------------------------ |
| randomDataGenerator.ts | Generate random test data | Names, emails, passwords, addresses, etc.  |
| dataProvider.ts        | Load test data from files | JSON and CSV parsing for data-driven tests |

## Conclusion

The `/utils` folder is essential for supporting robust, maintainable, and scalable test automation. By centralizing random data generation and data loading logic, it enables easy creation of unique test scenarios and facilitates data-driven testing across the suite.
