export interface QuestionItem {
  id: string;
  subject: string;
  topic: string;
  levelNumber: number;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  type: string;
  title: string;
  prompt: string;
  codeSnippet: string | null;
  explanation: string;
  options: { text: string; isCorrect: boolean }[];
}

export const questionsData: QuestionItem[] = [
  // ==================== LEVEL 1 (10 Questions - Beginner Fundamentals) ====================
  {
    id: 'q-100-1',
    subject: 'C',
    topic: 'Variables & Data Types',
    levelNumber: 1,
    difficulty: 'EASY',
    type: 'CONCEPTUAL',
    title: 'C Primitive Data Types',
    prompt: 'Which of the following is the correct keyword for declaring a single character variable in C?',
    codeSnippet: null,
    explanation: 'In C programming, "char" is used to declare character variables.',
    options: [
      { text: 'chr', isCorrect: false },
      { text: 'char', isCorrect: true },
      { text: 'string', isCorrect: false },
      { text: 'Character', isCorrect: false }
    ]
  },
  {
    id: 'q-100-2',
    subject: 'C++',
    topic: 'Classes & Objects',
    levelNumber: 1,
    difficulty: 'EASY',
    type: 'CONCEPTUAL',
    title: 'C++ Class Access Specifiers',
    prompt: 'By default, what is the access specifier for members of a class in C++ if not specified?',
    codeSnippet: null,
    explanation: 'In C++, class members are private by default, whereas struct members are public by default.',
    options: [
      { text: 'public', isCorrect: false },
      { text: 'protected', isCorrect: false },
      { text: 'private', isCorrect: true },
      { text: 'friend', isCorrect: false }
    ]
  },
  {
    id: 'q-100-3',
    subject: 'Java',
    topic: 'Variables & Data Types',
    levelNumber: 1,
    difficulty: 'EASY',
    type: 'CONCEPTUAL',
    title: 'Java Primitive Default Value',
    prompt: 'What is the default value of an uninitialized boolean instance variable in Java?',
    codeSnippet: null,
    explanation: 'In Java, boolean instance fields default to false when initialized by the JVM.',
    options: [
      { text: 'true', isCorrect: false },
      { text: 'false', isCorrect: true },
      { text: '0', isCorrect: false },
      { text: 'null', isCorrect: false }
    ]
  },
  {
    id: 'q-100-4',
    subject: 'HTML',
    topic: 'Structure',
    levelNumber: 1,
    difficulty: 'EASY',
    type: 'CONCEPTUAL',
    title: 'HTML Boilerplate Document Type',
    prompt: 'Which tag specifies the document type and HTML version for modern web browsers?',
    codeSnippet: null,
    explanation: '<!DOCTYPE html> declares the document type as HTML5.',
    options: [
      { text: '<doctype html5>', isCorrect: false },
      { text: '<!DOCTYPE html>', isCorrect: true },
      { text: '<html version="5">', isCorrect: false },
      { text: '<xml doctype="html">', isCorrect: false }
    ]
  },
  {
    id: 'q-100-5',
    subject: 'SQL',
    topic: 'SELECT & WHERE',
    levelNumber: 1,
    difficulty: 'EASY',
    type: 'SQL_QUERY',
    title: 'Basic SQL Retrieval Query',
    prompt: 'Which SQL clause is used to filter records based on a specified condition?',
    codeSnippet: 'SELECT * FROM students ___ age >= 18;',
    explanation: 'The WHERE clause filters rows based on a boolean condition before grouping or sorting.',
    options: [
      { text: 'FILTER', isCorrect: false },
      { text: 'HAVING', isCorrect: false },
      { text: 'WHERE', isCorrect: true },
      { text: 'ORDER BY', isCorrect: false }
    ]
  },
  {
    id: 'q-100-6',
    subject: 'JavaScript',
    topic: 'Variables (let/const/var)',
    levelNumber: 1,
    difficulty: 'EASY',
    type: 'CONCEPTUAL',
    title: 'JavaScript Constant Declaration',
    prompt: 'Which keyword is used to declare a block-scoped variable that cannot be reassigned in JavaScript?',
    codeSnippet: null,
    explanation: 'const creates a block-scoped constant variable reference in ES6+ JavaScript.',
    options: [
      { text: 'var', isCorrect: false },
      { text: 'let', isCorrect: false },
      { text: 'const', isCorrect: true },
      { text: 'static', isCorrect: false }
    ]
  },
  {
    id: 'q-100-7',
    subject: 'Full Stack',
    topic: 'Client-Server Architecture',
    levelNumber: 1,
    difficulty: 'EASY',
    type: 'CONCEPTUAL',
    title: 'HTTP Client Request Protocols',
    prompt: 'Which HTTP method is primarily used to request data from a specified server resource without side effects?',
    codeSnippet: null,
    explanation: 'GET requests retrieve representation of data from the specified URI without modifying server state.',
    options: [
      { text: 'POST', isCorrect: false },
      { text: 'PUT', isCorrect: false },
      { text: 'GET', isCorrect: true },
      { text: 'DELETE', isCorrect: false }
    ]
  },
  {
    id: 'q-100-8',
    subject: 'C',
    topic: 'if/else & Operators',
    levelNumber: 1,
    difficulty: 'EASY',
    type: 'OUTPUT_PREDICTION',
    title: 'C Post-increment Operator',
    prompt: 'What is the output of the following C code snippet?',
    codeSnippet: '#include <stdio.h>\nint main() {\n    int x = 5;\n    printf("%d", x++);\n    return 0;\n}',
    explanation: 'The post-increment operator (x++) returns the current value (5) first and increments x to 6 afterward.',
    options: [
      { text: '4', isCorrect: false },
      { text: '5', isCorrect: true },
      { text: '6', isCorrect: false },
      { text: 'Compilation Error', isCorrect: false }
    ]
  },
  {
    id: 'q-100-9',
    subject: 'C++',
    topic: 'Constructors',
    levelNumber: 1,
    difficulty: 'EASY',
    type: 'CONCEPTUAL',
    title: 'C++ Default Constructor',
    prompt: 'What is true regarding constructors in C++?',
    codeSnippet: null,
    explanation: 'A constructor has the exact same name as the class and does not specify any return type, not even void.',
    options: [
      { text: 'It has a void return type', isCorrect: false },
      { text: 'It has the same name as the class and no return type', isCorrect: true },
      { text: 'It must be explicitly called using a pointer', isCorrect: false },
      { text: 'It is executed automatically when the program ends', isCorrect: false }
    ]
  },
  {
    id: 'q-100-10',
    subject: 'Full Stack',
    topic: 'Frontend vs Backend',
    levelNumber: 1,
    difficulty: 'EASY',
    type: 'CONCEPTUAL',
    title: 'Web Application Tiers',
    prompt: 'In a modern 3-tier web architecture, which layer executes directly inside the user\'s web browser?',
    codeSnippet: null,
    explanation: 'The presentation/client layer (Frontend) executes in the web browser using HTML, CSS, and JS.',
    options: [
      { text: 'Database Tier', isCorrect: false },
      { text: 'Presentation Tier (Frontend)', isCorrect: true },
      { text: 'Application Logic Tier', isCorrect: false },
      { text: 'Persistence Layer', isCorrect: false }
    ]
  },

  // ==================== LEVEL 2 (10 Questions - Beginner Fundamentals) ====================
  {
    id: 'q-100-11',
    subject: 'Java',
    topic: 'Arrays & Strings',
    levelNumber: 2,
    difficulty: 'EASY',
    type: 'CODE_ANALYSIS',
    title: 'Java String Immutability',
    prompt: 'What is the value of str after executing the following Java code?',
    codeSnippet: 'String str = "Hello";\nstr.concat(" World");\nSystem.out.println(str);',
    explanation: 'Strings in Java are immutable. concat() returns a new string, but str reference remains "Hello".',
    options: [
      { text: 'Hello World', isCorrect: false },
      { text: 'Hello', isCorrect: true },
      { text: 'null', isCorrect: false },
      { text: 'Compilation Error', isCorrect: false }
    ]
  },
  {
    id: 'q-100-12',
    subject: 'HTML',
    topic: 'Links & Images',
    levelNumber: 2,
    difficulty: 'EASY',
    type: 'CONCEPTUAL',
    title: 'HTML Anchor Attribute',
    prompt: 'Which attribute in an <a> tag specifies the destination URL of a hyperlink?',
    codeSnippet: null,
    explanation: 'The "href" attribute (hypertext reference) defines the target URL for hyperlinks.',
    options: [
      { text: 'src', isCorrect: false },
      { text: 'link', isCorrect: false },
      { text: 'href', isCorrect: true },
      { text: 'target', isCorrect: false }
    ]
  },
  {
    id: 'q-100-13',
    subject: 'SQL',
    topic: 'ORDER BY & Sorting',
    levelNumber: 2,
    difficulty: 'EASY',
    type: 'SQL_QUERY',
    title: 'SQL Sorting Keyword',
    prompt: 'Which clause is used in SQL to sort the query result set in descending order?',
    codeSnippet: 'SELECT * FROM products ORDER BY price ___;',
    explanation: 'DESC sorts records in descending order (ASC is default ascending).',
    options: [
      { text: 'DOWN', isCorrect: false },
      { text: 'REVERSE', isCorrect: false },
      { text: 'DESC', isCorrect: true },
      { text: 'SORT_DESC', isCorrect: false }
    ]
  },
  {
    id: 'q-100-14',
    subject: 'JavaScript',
    topic: 'Data Types',
    levelNumber: 2,
    difficulty: 'EASY',
    type: 'OUTPUT_PREDICTION',
    title: 'JavaScript typeof null Evaluation',
    prompt: 'What does the typeof operator return for typeof null in JavaScript?',
    codeSnippet: 'console.log(typeof null);',
    explanation: 'In JavaScript, typeof null returns "object" due to a historical bug retained for backward compatibility.',
    options: [
      { text: '"null"', isCorrect: false },
      { text: '"undefined"', isCorrect: false },
      { text: '"object"', isCorrect: true },
      { text: '"string"', isCorrect: false }
    ]
  },
  {
    id: 'q-100-15',
    subject: 'Full Stack',
    topic: 'REST APIs & Status Codes',
    levelNumber: 2,
    difficulty: 'EASY',
    type: 'CONCEPTUAL',
    title: 'HTTP Status Code 201 Created',
    prompt: 'Which HTTP response status code indicates that a request succeeded and led to the creation of a new resource?',
    codeSnippet: null,
    explanation: 'HTTP status 201 Created indicates successful request and resource creation on the server.',
    options: [
      { text: '200 OK', isCorrect: false },
      { text: '201 Created', isCorrect: true },
      { text: '204 No Content', isCorrect: false },
      { text: '301 Moved Permanently', isCorrect: false }
    ]
  },
  {
    id: 'q-100-16',
    subject: 'C',
    topic: 'Functions & Loops',
    levelNumber: 2,
    difficulty: 'EASY',
    type: 'OUTPUT_PREDICTION',
    title: 'C Loop Execution Bounds',
    prompt: 'How many times will the loop print "IT" in the following C code?',
    codeSnippet: '#include <stdio.h>\nint main() {\n    for(int i = 0; i < 5; i += 2) {\n        printf("IT ");\n    }\n    return 0;\n}',
    explanation: 'i starts at 0 (print), then 2 (print), then 4 (print). i becomes 6 and loop terminates. Printed 3 times.',
    options: [
      { text: '5 times', isCorrect: false },
      { text: '3 times', isCorrect: true },
      { text: '2 times', isCorrect: false },
      { text: 'Infinite loop', isCorrect: false }
    ]
  },
  {
    id: 'q-100-17',
    subject: 'C++',
    topic: 'Encapsulation & Abstraction',
    levelNumber: 2,
    difficulty: 'EASY',
    type: 'CONCEPTUAL',
    title: 'OOP Encapsulation Concept',
    prompt: 'Wrapping data fields and methods together into a single unit in object-oriented programming is known as:',
    codeSnippet: null,
    explanation: 'Encapsulation binds together code and the data it manipulates into a single unit (class).',
    options: [
      { text: 'Polymorphism', isCorrect: false },
      { text: 'Inheritance', isCorrect: false },
      { text: 'Encapsulation', isCorrect: true },
      { text: 'Abstraction', isCorrect: false }
    ]
  },
  {
    id: 'q-100-18',
    subject: 'Java',
    topic: 'Control Statements',
    levelNumber: 2,
    difficulty: 'EASY',
    type: 'CONCEPTUAL',
    title: 'Java Switch Statement Data Types',
    prompt: 'Which of the following data types is NOT supported in a standard Java switch statement (up to Java 7)?',
    codeSnippet: null,
    explanation: 'boolean expressions cannot be evaluated in a switch statement; only byte, short, char, int, String, and Enums are allowed.',
    options: [
      { text: 'int', isCorrect: false },
      { text: 'String', isCorrect: false },
      { text: 'char', isCorrect: false },
      { text: 'double', isCorrect: true }
    ]
  },
  {
    id: 'q-100-19',
    subject: 'JavaScript',
    topic: 'Arrow Functions',
    levelNumber: 2,
    difficulty: 'EASY',
    type: 'OUTPUT_PREDICTION',
    title: 'JavaScript Implicit Return',
    prompt: 'What does the following arrow function return?',
    codeSnippet: 'const add = (a, b) => a + b;\nconsole.log(add(3, 4));',
    explanation: 'Concise arrow functions without curly braces implicitly return the evaluated expression (3 + 4 = 7).',
    options: [
      { text: 'undefined', isCorrect: false },
      { text: '7', isCorrect: true },
      { text: 'null', isCorrect: false },
      { text: 'NaN', isCorrect: false }
    ]
  },
  {
    id: 'q-100-20',
    subject: 'Full Stack',
    topic: 'JSON Payload Format',
    levelNumber: 2,
    difficulty: 'EASY',
    type: 'CONCEPTUAL',
    title: 'JSON Valid Property Names',
    prompt: 'In valid JSON syntax, how must property names/keys be formatted?',
    codeSnippet: null,
    explanation: 'JSON specification (RFC 8259) strictly requires property keys to be enclosed in double quotes.',
    options: [
      { text: 'Unquoted strings', isCorrect: false },
      { text: 'Enclosed in single quotes (\')', isCorrect: false },
      { text: 'Enclosed in double quotes (")', isCorrect: true },
      { text: 'Prefixed with $ dollar sign', isCorrect: false }
    ]
  },

  // ==================== LEVEL 3 (10 Questions - Basic Programming) ====================
  {
    id: 'q-100-21',
    subject: 'C',
    topic: 'Arrays & Strings',
    levelNumber: 3,
    difficulty: 'EASY',
    type: 'OUTPUT_PREDICTION',
    title: 'C Null Terminator Character',
    prompt: 'What is the output of sizeof("Hello") in C on a standard platform?',
    codeSnippet: '#include <stdio.h>\nint main() {\n    printf("%lu", sizeof("Hello"));\n    return 0;\n}',
    explanation: '"Hello" consists of 5 letters plus 1 implicit null terminator (\'\\0\'), giving a total size of 6 bytes.',
    options: [
      { text: '5', isCorrect: false },
      { text: '6', isCorrect: true },
      { text: '4', isCorrect: false },
      { text: '8', isCorrect: false }
    ]
  },
  {
    id: 'q-100-22',
    subject: 'C++',
    topic: 'Inheritance',
    levelNumber: 3,
    difficulty: 'EASY',
    type: 'CONCEPTUAL',
    title: 'C++ Multiple Inheritance',
    prompt: 'Which feature in C++ allows a derived class to inherit directly from more than one base class?',
    codeSnippet: null,
    explanation: 'C++ supports Multiple Inheritance where a single class can inherit attributes/methods from multiple base classes.',
    options: [
      { text: 'Multilevel Inheritance', isCorrect: false },
      { text: 'Multiple Inheritance', isCorrect: true },
      { text: 'Hierarchical Inheritance', isCorrect: false },
      { text: 'Hybrid Interface', isCorrect: false }
    ]
  },
  {
    id: 'q-100-23',
    subject: 'Java',
    topic: 'Inheritance & super',
    levelNumber: 3,
    difficulty: 'EASY',
    type: 'CONCEPTUAL',
    title: 'Java Super Keyword Usage',
    prompt: 'Which Java keyword is used by a subclass constructor to invoke its immediate parent class constructor?',
    codeSnippet: null,
    explanation: 'super() is used inside a child class constructor to call the constructor of its parent class.',
    options: [
      { text: 'this()', isCorrect: false },
      { text: 'super()', isCorrect: true },
      { text: 'parent()', isCorrect: false },
      { text: 'base()', isCorrect: false }
    ]
  },
  {
    id: 'q-100-24',
    subject: 'HTML',
    topic: 'Tables & Forms',
    levelNumber: 3,
    difficulty: 'EASY',
    type: 'CONCEPTUAL',
    title: 'HTML Form Input Types',
    prompt: 'Which HTML5 input type provides built-in email format validation natively in browser forms?',
    codeSnippet: null,
    explanation: '<input type="email"> provides native pattern matching for email address formats.',
    options: [
      { text: '<input type="text">', isCorrect: false },
      { text: '<input type="email">', isCorrect: true },
      { text: '<input type="validate">', isCorrect: false },
      { text: '<input type="address">', isCorrect: false }
    ]
  },
  {
    id: 'q-100-25',
    subject: 'SQL',
    topic: 'Aggregate Functions & HAVING',
    levelNumber: 3,
    difficulty: 'EASY',
    type: 'SQL_QUERY',
    title: 'Filtering Grouped SQL Records',
    prompt: 'Which SQL clause is used to filter records AFTER an aggregation or GROUP BY operation has occurred?',
    codeSnippet: 'SELECT department_id, COUNT(*) FROM employees GROUP BY department_id ___ COUNT(*) > 5;',
    explanation: 'HAVING is used to filter aggregated group records, whereas WHERE filters individual rows prior to grouping.',
    options: [
      { text: 'WHERE', isCorrect: false },
      { text: 'HAVING', isCorrect: true },
      { text: 'LIKE', isCorrect: false },
      { text: 'FILTER BY', isCorrect: false }
    ]
  },
  {
    id: 'q-100-26',
    subject: 'JavaScript',
    topic: 'Array Methods (map/filter)',
    levelNumber: 3,
    difficulty: 'EASY',
    type: 'OUTPUT_PREDICTION',
    title: 'JavaScript Array.map Output',
    prompt: 'What is the output of the following JavaScript code?',
    codeSnippet: 'const nums = [1, 2, 3];\nconst doubled = nums.map(n => n * 2);\nconsole.log(doubled);',
    explanation: 'Array.map transforms every element according to the callback, producing [2, 4, 6].',
    options: [
      { text: '[1, 2, 3]', isCorrect: false },
      { text: '[2, 4, 6]', isCorrect: true },
      { text: '[2, 3, 4]', isCorrect: false },
      { text: '6', isCorrect: false }
    ]
  },
  {
    id: 'q-100-27',
    subject: 'Full Stack',
    topic: 'CRUD Operations',
    levelNumber: 3,
    difficulty: 'EASY',
    type: 'CONCEPTUAL',
    title: 'REST API Verbs Mapping',
    prompt: 'In RESTful architecture, which HTTP verb corresponds directly to the "Update" action in CRUD?',
    codeSnippet: null,
    explanation: 'PUT or PATCH HTTP methods are used to update existing resources in REST APIs.',
    options: [
      { text: 'POST', isCorrect: false },
      { text: 'GET', isCorrect: false },
      { text: 'PUT', isCorrect: true },
      { text: 'DELETE', isCorrect: false }
    ]
  },
  {
    id: 'q-100-28',
    subject: 'C',
    topic: 'Pointers Basics',
    levelNumber: 3,
    difficulty: 'EASY',
    type: 'OUTPUT_PREDICTION',
    title: 'C Pointer Dereferencing',
    prompt: 'What will be printed by the following C code?',
    codeSnippet: '#include <stdio.h>\nint main() {\n    int num = 10;\n    int *ptr = &num;\n    printf("%d", *ptr);\n    return 0;\n}',
    explanation: '*ptr dereferences pointer ptr and fetches the value stored at memory address &num (10).',
    options: [
      { text: 'Address of num', isCorrect: false },
      { text: '10', isCorrect: true },
      { text: '0', isCorrect: false },
      { text: 'Garbage Value', isCorrect: false }
    ]
  },
  {
    id: 'q-100-29',
    subject: 'C++',
    topic: 'Polymorphism & Virtual Functions',
    levelNumber: 3,
    difficulty: 'EASY',
    type: 'CONCEPTUAL',
    title: 'C++ Virtual Function Purpose',
    prompt: 'What keyword enables dynamic/runtime polymorphism (late binding) for member functions in C++?',
    codeSnippet: null,
    explanation: 'The "virtual" keyword instructs the compiler to perform dynamic dispatch using a VTable at runtime.',
    options: [
      { text: 'static', isCorrect: false },
      { text: 'override', isCorrect: false },
      { text: 'virtual', isCorrect: true },
      { text: 'dynamic', isCorrect: false }
    ]
  },
  {
    id: 'q-100-30',
    subject: 'Full Stack',
    topic: 'HTTP Status Code 500',
    levelNumber: 3,
    difficulty: 'EASY',
    type: 'CONCEPTUAL',
    title: 'HTTP Status Code 500 Error Class',
    prompt: 'What does an HTTP status code in the 5xx range (such as 500 Internal Server Error) signify?',
    codeSnippet: null,
    explanation: '5xx status codes indicate server-side processing errors when handling client requests.',
    options: [
      { text: 'Client side error', isCorrect: false },
      { text: 'Successful operation', isCorrect: false },
      { text: 'Server side error', isCorrect: true },
      { text: 'Redirection to new URI', isCorrect: false }
    ]
  },

  // ==================== LEVEL 4 (10 Questions - Basic to Intermediate) ====================
  {
    id: 'q-100-31',
    subject: 'Java',
    topic: 'Interfaces vs Abstract Classes',
    levelNumber: 4,
    difficulty: 'MEDIUM',
    type: 'CONCEPTUAL',
    title: 'Java Multiple Inheritance via Interfaces',
    prompt: 'How does Java achieve multiple inheritance of type behavior?',
    codeSnippet: null,
    explanation: 'Java does not support multiple class inheritance, but allows a class to implement multiple interfaces.',
    options: [
      { text: 'Extending multiple abstract classes', isCorrect: false },
      { text: 'Implementing multiple interfaces', isCorrect: true },
      { text: 'Using static inner classes', isCorrect: false },
      { text: 'Overloading main methods', isCorrect: false }
    ]
  },
  {
    id: 'q-100-32',
    subject: 'HTML',
    topic: 'Semantic HTML',
    levelNumber: 4,
    difficulty: 'MEDIUM',
    type: 'BEST_PRACTICE',
    title: 'Semantic HTML Elements',
    prompt: 'Which tag is a semantic HTML5 container specifically intended for independent, self-contained content like articles or blog posts?',
    codeSnippet: null,
    explanation: '<article> represents a self-contained composition intended to be independently distributable.',
    options: [
      { text: '<div class="post">', isCorrect: false },
      { text: '<section>', isCorrect: false },
      { text: '<article>', isCorrect: true },
      { text: '<aside>', isCorrect: false }
    ]
  },
  {
    id: 'q-100-33',
    subject: 'SQL',
    topic: 'JOIN Operations',
    levelNumber: 4,
    difficulty: 'MEDIUM',
    type: 'SQL_QUERY',
    title: 'SQL LEFT JOIN Behavior',
    prompt: 'What does a LEFT JOIN return between Table A (Left) and Table B (Right)?',
    codeSnippet: 'SELECT A.name, B.order_date FROM Customers A LEFT JOIN Orders B ON A.id = B.customer_id;',
    explanation: 'LEFT JOIN returns all records from Table A, and matched records from Table B (filling NULL for non-matches).',
    options: [
      { text: 'Only matching rows in both tables', isCorrect: false },
      { text: 'All rows from Table A and matching rows from Table B', isCorrect: true },
      { text: 'All rows from Table B and matching rows from Table A', isCorrect: false },
      { text: 'Unmatched rows only', isCorrect: false }
    ]
  },
  {
    id: 'q-100-34',
    subject: 'JavaScript',
    topic: 'Scope & Hoisting',
    levelNumber: 4,
    difficulty: 'MEDIUM',
    type: 'OUTPUT_PREDICTION',
    title: 'JavaScript Variable Hoisting',
    prompt: 'What is printed to the console when executing the following code?',
    codeSnippet: 'console.log(a);\nvar a = 10;',
    explanation: 'var declarations are hoisted to top of scope initialized with undefined before execution.',
    options: [
      { text: '10', isCorrect: false },
      { text: 'ReferenceError: a is not defined', isCorrect: false },
      { text: 'undefined', isCorrect: true },
      { text: 'null', isCorrect: false }
    ]
  },
  {
    id: 'q-100-35',
    subject: 'Full Stack',
    topic: 'Web Storage vs Cookies',
    levelNumber: 4,
    difficulty: 'MEDIUM',
    type: 'CONCEPTUAL',
    title: 'Browser LocalStorage Properties',
    prompt: 'Which client-side storage mechanism persists data across browser window tabs and survives browser restarts?',
    codeSnippet: null,
    explanation: 'localStorage data has no expiration date and persists until explicitly cleared via JS or browser storage clear.',
    options: [
      { text: 'sessionStorage', isCorrect: false },
      { text: 'localStorage', isCorrect: true },
      { text: 'HTTP Cookie without Max-Age', isCorrect: false },
      { text: 'JavaScript In-Memory Window Variable', isCorrect: false }
    ]
  },
  {
    id: 'q-100-36',
    subject: 'C',
    topic: 'Structures & Unions',
    levelNumber: 4,
    difficulty: 'MEDIUM',
    type: 'CONCEPTUAL',
    title: 'C Structure vs Union Memory',
    prompt: 'What is the primary difference between a struct and a union in C?',
    codeSnippet: null,
    explanation: 'In a struct, each member gets its own unique memory location; in a union, all members share the same memory space.',
    options: [
      { text: 'Struct cannot hold integers', isCorrect: false },
      { text: 'Union members share the same memory space', isCorrect: true },
      { text: 'Structs are allocated on heap while unions are on stack', isCorrect: false },
      { text: 'Unions cannot contain pointers', isCorrect: false }
    ]
  },
  {
    id: 'q-100-37',
    subject: 'C++',
    topic: 'Function Overloading',
    levelNumber: 4,
    difficulty: 'MEDIUM',
    type: 'CONCEPTUAL',
    title: 'C++ Function Overloading Rules',
    prompt: 'Which of the following conditions is required for valid function overloading in C++?',
    codeSnippet: null,
    explanation: 'Overloaded functions must differ in their parameter list (number, type, or order of parameters). Different return types alone are invalid.',
    options: [
      { text: 'Different return types only', isCorrect: false },
      { text: 'Different parameter lists (number or type of arguments)', isCorrect: true },
      { text: 'Must belong to different namespaces', isCorrect: false },
      { text: 'Must be defined inside inline header files', isCorrect: false }
    ]
  },
  {
    id: 'q-100-38',
    subject: 'Java',
    topic: 'Exception Handling',
    levelNumber: 4,
    difficulty: 'MEDIUM',
    type: 'CODE_ANALYSIS',
    title: 'Java finally Block Execution',
    prompt: 'What is guaranteed about the finally block in Java exception handling?',
    codeSnippet: 'try {\n    int res = 10 / 0;\n} catch (ArithmeticException e) {\n    System.out.print("Catch ");\n} finally {\n    System.out.print("Finally ");\n}',
    explanation: 'The finally block executes whether an exception is thrown or caught (unless System.exit() occurs). Output: Catch Finally',
    options: [
      { text: 'Executes only when no exception occurs', isCorrect: false },
      { text: 'Executes only when an exception occurs', isCorrect: false },
      { text: 'Executes regardless of whether an exception occurs or is caught', isCorrect: true },
      { text: 'Executes before the try block starts', isCorrect: false }
    ]
  },
  {
    id: 'q-100-39',
    subject: 'JavaScript',
    topic: 'DOM & Events',
    levelNumber: 4,
    difficulty: 'MEDIUM',
    type: 'CONCEPTUAL',
    title: 'JavaScript Event Delegation',
    prompt: 'What is Event Delegation in DOM manipulation?',
    codeSnippet: null,
    explanation: 'Event Delegation attaches a single event listener to a parent element to handle events on its child elements via event bubbling.',
    options: [
      { text: 'Cloning event handlers across multiple DOM nodes', isCorrect: false },
      { text: 'Attaching a single event listener to a parent element to handle child events via bubbling', isCorrect: true },
      { text: 'Preventing events from bubbling up the DOM tree', isCorrect: false },
      { text: 'Executing events synchronously in worker threads', isCorrect: false }
    ]
  },
  {
    id: 'q-100-40',
    subject: 'Full Stack',
    topic: 'Express.js Middleware',
    levelNumber: 4,
    difficulty: 'MEDIUM',
    type: 'CODE_ANALYSIS',
    title: 'Express.js next() Function Purpose',
    prompt: 'In Express.js middleware functions, what is the role of the next() parameter?',
    codeSnippet: 'app.use((req, res, next) => {\n    console.log("Middleware executed");\n    next();\n});',
    explanation: 'Calling next() passes control to the next middleware function in the stack.',
    options: [
      { text: 'Sends response to client', isCorrect: false },
      { text: 'Passes control to the next middleware function in the pipeline', isCorrect: true },
      { text: 'Restarts HTTP server connection', isCorrect: false },
      { text: 'Redirects request to database', isCorrect: false }
    ]
  },

  // ==================== LEVEL 5 (10 Questions - Intermediate) ====================
  {
    id: 'q-100-41',
    subject: 'C',
    topic: 'Dynamic Memory Allocation',
    levelNumber: 5,
    difficulty: 'MEDIUM',
    type: 'CONCEPTUAL',
    title: 'C Memory Allocation malloc vs calloc',
    prompt: 'What is the key difference between malloc() and calloc() in C memory management?',
    codeSnippet: null,
    explanation: 'calloc() allocates memory and initializes all bytes to zero, whereas malloc() leaves memory uninitialized with garbage values.',
    options: [
      { text: 'malloc allocates heap, calloc allocates stack', isCorrect: false },
      { text: 'calloc initializes allocated memory bytes to zero', isCorrect: true },
      { text: 'malloc takes two arguments, calloc takes one argument', isCorrect: false },
      { text: 'calloc cannot be freed with free()', isCorrect: false }
    ]
  },
  {
    id: 'q-100-42',
    subject: 'C++',
    topic: 'STL Vectors & Maps',
    levelNumber: 5,
    difficulty: 'MEDIUM',
    type: 'CONCEPTUAL',
    title: 'C++ std::map Internal Data Structure',
    prompt: 'What underlying data structure is typically used to implement std::map in the C++ Standard Template Library (STL)?',
    codeSnippet: null,
    explanation: 'std::map is typically implemented as a self-balancing Red-Black Binary Search Tree ensuring O(log N) operations.',
    options: [
      { text: 'Hash Table', isCorrect: false },
      { text: 'Red-Black Self-Balancing Tree', isCorrect: true },
      { text: 'Doubly Linked List', isCorrect: false },
      { text: 'Dynamic Array Buffer', isCorrect: false }
    ]
  },
  {
    id: 'q-100-43',
    subject: 'Java',
    topic: 'Collections Framework',
    levelNumber: 5,
    difficulty: 'MEDIUM',
    type: 'CONCEPTUAL',
    title: 'Java ArrayList vs LinkedList Access Complexity',
    prompt: 'What is the time complexity of element random access by index (get(i)) in ArrayList vs LinkedList in Java?',
    codeSnippet: null,
    explanation: 'ArrayList provides O(1) constant time index access via array backing; LinkedList requires O(N) traversal.',
    options: [
      { text: 'ArrayList: O(N), LinkedList: O(1)', isCorrect: false },
      { text: 'ArrayList: O(1), LinkedList: O(N)', isCorrect: true },
      { text: 'Both are O(1)', isCorrect: false },
      { text: 'Both are O(N)', isCorrect: false }
    ]
  },
  {
    id: 'q-100-44',
    subject: 'HTML',
    topic: 'HTML5 Form & Accessibility',
    levelNumber: 5,
    difficulty: 'MEDIUM',
    type: 'BEST_PRACTICE',
    title: 'HTML ARIA Accessibility Attributes',
    prompt: 'What does WAI-ARIA stand for in web accessibility and HTML design?',
    codeSnippet: null,
    explanation: 'WAI-ARIA stands for Web Accessibility Initiative - Accessible Rich Internet Applications.',
    options: [
      { text: 'Web Application Interaction & Responsive Responsive Interfaces', isCorrect: false },
      { text: 'Web Accessibility Initiative - Accessible Rich Internet Applications', isCorrect: true },
      { text: 'Wireless Access & Render Infrastructure Architecture', isCorrect: false },
      { text: 'Web Automation & Rendering Interoperability Association', isCorrect: false }
    ]
  },
  {
    id: 'q-100-45',
    subject: 'SQL',
    topic: 'Subqueries & Nested Queries',
    levelNumber: 5,
    difficulty: 'MEDIUM',
    type: 'SQL_QUERY',
    title: 'SQL Correlated Subquery',
    prompt: 'What defines a Correlated Subquery in SQL?',
    codeSnippet: 'SELECT e1.name FROM employees e1 WHERE e1.salary > (SELECT AVG(salary) FROM employees e2 WHERE e2.dept_id = e1.dept_id);',
    explanation: 'A correlated subquery evaluates once for each row processed by the outer query because it references columns from the outer query table.',
    options: [
      { text: 'A query that runs independently before outer query', isCorrect: false },
      { text: 'A subquery that references columns from outer query and evaluates for every outer row', isCorrect: true },
      { text: 'A subquery containing UNION ALL', isCorrect: false },
      { text: 'A subquery executed inside a view creation statement', isCorrect: false }
    ]
  },
  {
    id: 'q-100-46',
    subject: 'JavaScript',
    topic: 'Promises & Async/Await',
    levelNumber: 5,
    difficulty: 'MEDIUM',
    type: 'OUTPUT_PREDICTION',
    title: 'JavaScript Async Promise Execution Order',
    prompt: 'What will be logged to the console by the following script?',
    codeSnippet: 'console.log("A");\nPromise.resolve().then(() => console.log("B"));\nconsole.log("C");',
    explanation: 'Synchronous code logs "A" then "C". Promise callback is queued in Microtask Queue and executes after synchronous stack, logging "B". Output: A C B',
    options: [
      { text: 'A B C', isCorrect: false },
      { text: 'A C B', isCorrect: true },
      { text: 'B A C', isCorrect: false },
      { text: 'C B A', isCorrect: false }
    ]
  },
  {
    id: 'q-100-47',
    subject: 'Full Stack',
    topic: 'React Props vs State',
    levelNumber: 5,
    difficulty: 'MEDIUM',
    type: 'CONCEPTUAL',
    title: 'React Props Immutability',
    prompt: 'In React component architecture, how do props differ fundamentally from state?',
    codeSnippet: null,
    explanation: 'Props are read-only immutable inputs passed from parent components; state is internal mutable data managed within the component.',
    options: [
      { text: 'State is passed down from parent components; props are local', isCorrect: false },
      { text: 'Props are read-only inputs passed from parent; state is component-internal mutable data', isCorrect: true },
      { text: 'Props require Redux store; state requires Context API', isCorrect: false },
      { text: 'State cannot trigger component re-renders', isCorrect: false }
    ]
  },
  {
    id: 'q-100-48',
    subject: 'C',
    topic: 'Output Prediction',
    levelNumber: 5,
    difficulty: 'MEDIUM',
    type: 'OUTPUT_PREDICTION',
    title: 'C Pre-increment vs Post-increment in Expressions',
    prompt: 'What is the output of the following C program?',
    codeSnippet: '#include <stdio.h>\nint main() {\n    int a = 5, b;\n    b = ++a + a++;\n    printf("%d", b);\n    return 0;\n}',
    explanation: '++a increments a from 5 to 6. Expressions evaluation with sequence point yields 6 + 6 = 12 (and a becomes 7 after). Output: 12.',
    options: [
      { text: '10', isCorrect: false },
      { text: '11', isCorrect: false },
      { text: '12', isCorrect: true },
      { text: '13', isCorrect: false }
    ]
  },
  {
    id: 'q-100-49',
    subject: 'C++',
    topic: 'Pointers vs References',
    levelNumber: 5,
    difficulty: 'MEDIUM',
    type: 'CONCEPTUAL',
    title: 'C++ Reference Instantiation Rule',
    prompt: 'Which statement is TRUE regarding C++ references (&)?',
    codeSnippet: null,
    explanation: 'A C++ reference must be bound to an object upon declaration and cannot be reassigned to refer to another object or set to NULL.',
    options: [
      { text: 'References can be re-bound to another variable after initialization', isCorrect: false },
      { text: 'References can be assigned NULL', isCorrect: false },
      { text: 'References must be initialized upon declaration and cannot be null', isCorrect: true },
      { text: 'References require arithmetic syntax to access members', isCorrect: false }
    ]
  },
  {
    id: 'q-100-50',
    subject: 'Full Stack',
    topic: 'React useEffect Hook',
    levelNumber: 5,
    difficulty: 'MEDIUM',
    type: 'CODE_ANALYSIS',
    title: 'React useEffect Dependency Array',
    prompt: 'When does a React useEffect hook run if an empty dependency array ([]) is passed as the second argument?',
    codeSnippet: 'useEffect(() => {\n    fetchData();\n}, []);',
    explanation: 'An empty dependency array ([]) causes useEffect to run only once after the initial component mount.',
    options: [
      { text: 'On every single component re-render', isCorrect: false },
      { text: 'Only once after the initial component mount', isCorrect: true },
      { text: 'Only when props change', isCorrect: false },
      { text: 'Immediately before component unmounts', isCorrect: false }
    ]
  },

  // ==================== LEVEL 6 (10 Questions - Intermediate) ====================
  {
    id: 'q-100-51',
    subject: 'Java',
    topic: 'HashMap Internals',
    levelNumber: 6,
    difficulty: 'MEDIUM',
    type: 'CONCEPTUAL',
    title: 'Java HashMap Collision Handling',
    prompt: 'In Java 8+, what data structure does HashMap switch to when bucket chain size exceeds 8 (TREEIFY_THRESHOLD)?',
    codeSnippet: null,
    explanation: 'In Java 8, when a bucket linked list exceeds 8 items, HashMap converts the bucket into a Red-Black Tree to improve lookup from O(N) to O(log N).',
    options: [
      { text: 'Doubly Linked List', isCorrect: false },
      { text: 'Red-Black Balanced Tree', isCorrect: true },
      { text: 'B-Tree Index', isCorrect: false },
      { text: 'Array Matrix', isCorrect: false }
    ]
  },
  {
    id: 'q-100-52',
    subject: 'HTML',
    topic: 'HTML5 Form Attributes',
    levelNumber: 6,
    difficulty: 'MEDIUM',
    type: 'CONCEPTUAL',
    title: 'HTML Form enctype for File Uploads',
    prompt: 'Which enctype value must be set on an HTML <form> when submitting binary file inputs via POST?',
    codeSnippet: null,
    explanation: 'multipart/form-data is required for uploading binary files or text mixed with files via HTML form POST.',
    options: [
      { text: 'application/x-www-form-urlencoded', isCorrect: false },
      { text: 'multipart/form-data', isCorrect: true },
      { text: 'text/plain', isCorrect: false },
      { text: 'application/json', isCorrect: false }
    ]
  },
  {
    id: 'q-100-53',
    subject: 'SQL',
    topic: 'Primary vs Foreign Key Constraints',
    levelNumber: 6,
    difficulty: 'MEDIUM',
    type: 'CONCEPTUAL',
    title: 'SQL Foreign Key Referential Integrity',
    prompt: 'What constraint error is raised when deleting a row in a parent table that is referenced by rows in a child table with default FOREIGN KEY constraint?',
    codeSnippet: null,
    explanation: 'Referential integrity constraints prevent deleting parent rows if active child references exist without CASCADE rule.',
    options: [
      { text: 'Check Constraint Violation', isCorrect: false },
      { text: 'Foreign Key / Referential Integrity Violation', isCorrect: true },
      { text: 'Unique Key Duplication Exception', isCorrect: false },
      { text: 'Deadlock Lock Error', isCorrect: false }
    ]
  },
  {
    id: 'q-100-54',
    subject: 'JavaScript',
    topic: 'Fetch API & Error Handling',
    levelNumber: 6,
    difficulty: 'MEDIUM',
    type: 'CODE_ANALYSIS',
    title: 'JavaScript Fetch HTTP Error Status Handling',
    prompt: 'Does window.fetch() reject its returned Promise on an HTTP 404 Not Found response?',
    codeSnippet: 'fetch("/api/data")\n  .then(res => console.log("OK:", res.ok))\n  .catch(err => console.log("Catch:", err));',
    explanation: 'fetch() only rejects a Promise on network failure or request blocking. HTTP 404/500 resolve successfully with res.ok = false.',
    options: [
      { text: 'Yes, it rejects the Promise and triggers catch block', isCorrect: false },
      { text: 'No, it resolves the Promise successfully; res.ok will be false', isCorrect: true },
      { text: 'It throws a synchronous TypeError exception', isCorrect: false },
      { text: 'It automatically retries 3 times', isCorrect: false }
    ]
  },
  {
    id: 'q-100-55',
    subject: 'Full Stack',
    topic: 'JWT Authentication',
    levelNumber: 6,
    difficulty: 'MEDIUM',
    type: 'CONCEPTUAL',
    title: 'JSON Web Token (JWT) Structure',
    prompt: 'A JSON Web Token (JWT) consists of three dot-separated parts in which sequence?',
    codeSnippet: null,
    explanation: 'JWT format is Header.Payload.Signature encoded in Base64URL.',
    options: [
      { text: 'Header.Signature.Payload', isCorrect: false },
      { text: 'Header.Payload.Signature', isCorrect: true },
      { text: 'Payload.Header.Signature', isCorrect: false },
      { text: 'Signature.Payload.Header', isCorrect: false }
    ]
  },
  {
    id: 'q-100-56',
    subject: 'C',
    topic: 'Pointer Arithmetic',
    levelNumber: 6,
    difficulty: 'MEDIUM',
    type: 'OUTPUT_PREDICTION',
    title: 'C Pointer Addition Arithmetic',
    prompt: 'Assuming int is 4 bytes and ptr points to memory address 1000, what is the value of (ptr + 2)?',
    codeSnippet: '#include <stdio.h>\nint main() {\n    int arr[5] = {10, 20, 30, 40, 50};\n    int *ptr = arr; // assume &arr[0] == 1000\n    printf("%p", ptr + 2);\n    return 0;\n}',
    explanation: 'Pointer arithmetic increments address by (offset * sizeof(type)). 1000 + (2 * 4 bytes) = 1008.',
    options: [
      { text: '1002', isCorrect: false },
      { text: '1004', isCorrect: false },
      { text: '1008', isCorrect: true },
      { text: '1016', isCorrect: false }
    ]
  },
  {
    id: 'q-100-57',
    subject: 'C++',
    topic: 'Exception Handling in C++',
    levelNumber: 6,
    difficulty: 'MEDIUM',
    type: 'CONCEPTUAL',
    title: 'C++ Catch-All Handler Syntax',
    prompt: 'Which catch block syntax catches any uncaught exception type in C++?',
    codeSnippet: null,
    explanation: 'catch(...) is the universal catch-all handler in C++ exception handling.',
    options: [
      { text: 'catch(Exception e)', isCorrect: false },
      { text: 'catch(...)', isCorrect: true },
      { text: 'catch(all)', isCorrect: false },
      { text: 'catch(*)', isCorrect: false }
    ]
  },
  {
    id: 'q-100-58',
    subject: 'Java',
    topic: 'Multithreading',
    levelNumber: 6,
    difficulty: 'MEDIUM',
    type: 'CONCEPTUAL',
    title: 'Java Runnable vs Thread Execution',
    prompt: 'Which method must be called to start execution of a new background thread in Java?',
    codeSnippet: 'Thread t = new Thread(runnableTask);\n// How to start thread t?',
    explanation: 'Calling start() allocates a new call stack and invokes run() asynchronously. Calling run() directly runs on current thread.',
    options: [
      { text: 't.run()', isCorrect: false },
      { text: 't.start()', isCorrect: true },
      { text: 't.execute()', isCorrect: false },
      { text: 't.begin()', isCorrect: false }
    ]
  },
  {
    id: 'q-100-59',
    subject: 'JavaScript',
    topic: 'ES6 Destructuring & Spread',
    levelNumber: 6,
    difficulty: 'MEDIUM',
    type: 'OUTPUT_PREDICTION',
    title: 'JavaScript Object Spread Merge',
    prompt: 'What is the value of obj3 after executing the following ES6 code?',
    codeSnippet: 'const obj1 = { a: 1, b: 2 };\nconst obj2 = { b: 99, c: 3 };\nconst obj3 = { ...obj1, ...obj2 };\nconsole.log(obj3.b);',
    explanation: 'The spread operator shallow merges properties from left to right; obj2.b (99) overwrites obj1.b (2).',
    options: [
      { text: '2', isCorrect: false },
      { text: '99', isCorrect: true },
      { text: 'undefined', isCorrect: false },
      { text: 'SyntaxError', isCorrect: false }
    ]
  },
  {
    id: 'q-100-60',
    subject: 'Full Stack',
    topic: 'CORS & Web Security',
    levelNumber: 6,
    difficulty: 'MEDIUM',
    type: 'CONCEPTUAL',
    title: 'Cross-Origin Resource Sharing (CORS)',
    prompt: 'Which HTTP response header enables a backend server to allow frontend web applications from another domain to access its API resources?',
    codeSnippet: null,
    explanation: 'Access-Control-Allow-Origin controls cross-origin access permissions in browsers.',
    options: [
      { text: 'X-Frame-Options', isCorrect: false },
      { text: 'Access-Control-Allow-Origin', isCorrect: true },
      { text: 'Content-Security-Policy', isCorrect: false },
      { text: 'Strict-Transport-Security', isCorrect: false }
    ]
  },

  // ==================== LEVEL 7 (10 Questions - Intermediate to Advanced) ====================
  {
    id: 'q-100-61',
    subject: 'C',
    topic: 'Bitwise Operators',
    levelNumber: 7,
    difficulty: 'MEDIUM',
    type: 'OUTPUT_PREDICTION',
    title: 'C Bitwise XOR Operation',
    prompt: 'What is the output of the expression (5 ^ 3) in C?',
    codeSnippet: '#include <stdio.h>\nint main() {\n    printf("%d", 5 ^ 3);\n    return 0;\n}',
    explanation: '5 is 0101 in binary, 3 is 0011 in binary. Bitwise XOR (0101 ^ 0011) = 0110 in binary, which equals 6.',
    options: [
      { text: '1', isCorrect: false },
      { text: '2', isCorrect: false },
      { text: '6', isCorrect: true },
      { text: '8', isCorrect: false }
    ]
  },
  {
    id: 'q-100-62',
    subject: 'C++',
    topic: 'Copy Constructor & Deep Copy',
    levelNumber: 7,
    difficulty: 'MEDIUM',
    type: 'CONCEPTUAL',
    title: 'C++ Shallow vs Deep Copy Problem',
    prompt: 'Why is a custom Copy Constructor necessary for C++ classes containing dynamically allocated pointer members?',
    codeSnippet: null,
    explanation: 'Default copy constructors perform shallow copy (copying pointer addresses), leading to double-free errors when destructors run.',
    options: [
      { text: 'Default compiler copy prevents inheritance', isCorrect: false },
      { text: 'Shallow copying raw pointers causes multiple destructors to attempt freeing the same heap memory', isCorrect: true },
      { text: 'Pointers cannot be copied in C++', isCorrect: false },
      { text: 'Copy constructors increase compilation speed', isCorrect: false }
    ]
  },
  {
    id: 'q-100-63',
    subject: 'Java',
    topic: 'Memory Management (Stack vs Heap)',
    levelNumber: 7,
    difficulty: 'MEDIUM',
    type: 'CONCEPTUAL',
    title: 'Java Garbage Collection Eligibility',
    prompt: 'When does an object on the Java Heap Memory become eligible for Garbage Collection (GC)?',
    codeSnippet: null,
    explanation: 'An object becomes eligible for GC when it is no longer reachable from any active thread GC root reference.',
    options: [
      { text: 'As soon as its scope method ends execution', isCorrect: false },
      { text: 'When there are no active reference paths reaching the object from any GC Root', isCorrect: true },
      { text: 'When system RAM usage reaches 100%', isCorrect: false },
      { text: 'When System.gc() is invoked explicitly', isCorrect: false }
    ]
  },
  {
    id: 'q-100-64',
    subject: 'HTML',
    topic: 'HTML5 APIs',
    levelNumber: 7,
    difficulty: 'MEDIUM',
    type: 'CONCEPTUAL',
    title: 'HTML5 Canvas vs SVG Rendering',
    prompt: 'What is a key difference between HTML5 <canvas> and Inline SVG graphic rendering?',
    codeSnippet: null,
    explanation: '<canvas> is pixel-based raster rendering (immediate mode); SVG is XML vector-based (retained mode with DOM nodes for elements).',
    options: [
      { text: 'Canvas is vector-based; SVG is raster-based', isCorrect: false },
      { text: 'Canvas uses pixel-based raster rendering; SVG is DOM XML vector-based', isCorrect: true },
      { text: 'SVG cannot be styled with CSS', isCorrect: false },
      { text: 'Canvas elements support CSS hover pseudo-classes natively on sub-shapes', isCorrect: false }
    ]
  },
  {
    id: 'q-100-65',
    subject: 'SQL',
    topic: 'Database Normalization',
    levelNumber: 7,
    difficulty: 'MEDIUM',
    type: 'CONCEPTUAL',
    title: 'Third Normal Form (3NF) Requirement',
    prompt: 'What condition must a database table satisfy to comply with Third Normal Form (3NF)?',
    codeSnippet: null,
    explanation: '3NF requires that the table is in 2NF and contains no transitive functional dependencies (non-prime attributes depending on non-prime attributes).',
    options: [
      { text: 'Must contain composite primary keys only', isCorrect: false },
      { text: 'Must be in 2NF and eliminate transitive dependencies on non-primary key attributes', isCorrect: true },
      { text: 'Must store all records in single JSON document column', isCorrect: false },
      { text: 'Must have foreign key indexes on all tables', isCorrect: false }
    ]
  },
  {
    id: 'q-100-66',
    subject: 'JavaScript',
    topic: 'Event Loop & Microtask Queue',
    levelNumber: 7,
    difficulty: 'MEDIUM',
    type: 'OUTPUT_PREDICTION',
    title: 'JavaScript Event Loop Queue Priority',
    prompt: 'In Node.js/V8 Event Loop processing, what is executed first after the current synchronous stack finishes: Microtask Queue or Macrotask (Task) Queue?',
    codeSnippet: 'setTimeout(() => console.log("Timeout"), 0);\nPromise.resolve().then(() => console.log("Promise"));',
    explanation: 'Microtask Queue (Promises, process.nextTick) is processed completely before picking the next Macrotask (setTimeout). Output: Promise, Timeout.',
    options: [
      { text: 'Macrotask Queue (setTimeout) executes first', isCorrect: false },
      { text: 'Microtask Queue (Promises) executes first', isCorrect: true },
      { text: 'They execute in parallel across worker threads', isCorrect: false },
      { text: 'Execution order is non-deterministic', isCorrect: false }
    ]
  },
  {
    id: 'q-100-67',
    subject: 'Full Stack',
    topic: 'SQL Injection Prevention',
    levelNumber: 7,
    difficulty: 'MEDIUM',
    type: 'SECURITY',
    title: 'Preventing SQL Injection Attacks',
    prompt: 'What is the most effective engineering defense against SQL Injection vulnerabilities in backend web applications?',
    codeSnippet: null,
    explanation: 'Using Prepared Statements with Parameterized Queries separates SQL code from user data, preventing query structure manipulation.',
    options: [
      { text: 'Escaping single quotes with regex replace', isCorrect: false },
      { text: 'Using Prepared Statements / Parameterized Queries', isCorrect: true },
      { text: 'Converting queries to GET requests', isCorrect: false },
      { text: 'Storing database passwords in HTML comments', isCorrect: false }
    ]
  },
  {
    id: 'q-100-68',
    subject: 'C',
    topic: 'Recursion Stack',
    levelNumber: 7,
    difficulty: 'MEDIUM',
    type: 'CODE_ANALYSIS',
    title: 'C Recursion Base Case Absence',
    prompt: 'What runtime error occurs if a recursive C function lacks a proper terminating base condition?',
    codeSnippet: 'void recurse() {\n    recurse();\n}',
    explanation: 'Infinite recursion exhausts call stack frame memory leading to Stack Overflow runtime crash.',
    options: [
      { text: 'Heap OutOfMemoryError', isCorrect: false },
      { text: 'Stack Overflow Runtime Error / Segmentation Fault', isCorrect: true },
      { text: 'Compilation Syntax Error', isCorrect: false },
      { text: 'Buffer Underflow Warning', isCorrect: false }
    ]
  },
  {
    id: 'q-100-69',
    subject: 'C++',
    topic: 'Smart Pointers (std::unique_ptr)',
    levelNumber: 7,
    difficulty: 'MEDIUM',
    type: 'CONCEPTUAL',
    title: 'C++ std::unique_ptr Ownership Transfer',
    prompt: 'How is ownership of a managed object transferred from one std::unique_ptr to another in C++11?',
    codeSnippet: 'std::unique_ptr<int> p1 = std::make_unique<int>(42);\n// How to transfer ownership to p2?',
    explanation: 'std::unique_ptr cannot be copied (copy constructor deleted); ownership must be transferred using std::move().',
    options: [
      { text: 'std::unique_ptr<int> p2 = p1;', isCorrect: false },
      { text: 'std::unique_ptr<int> p2 = std::move(p1);', isCorrect: true },
      { text: 'std::unique_ptr<int> p2 = &p1;', isCorrect: false },
      { text: 'std::unique_ptr<int> p2 = p1.copy();', isCorrect: false }
    ]
  },
  {
    id: 'q-100-70',
    subject: 'Full Stack',
    topic: 'Password Hashing & Security',
    levelNumber: 7,
    difficulty: 'MEDIUM',
    type: 'SECURITY',
    title: 'Cryptographic Password Salting Purpose',
    prompt: 'Why is a cryptographic Salt added to user passwords before hashing them (e.g. using bcrypt or PBKDF2)?',
    codeSnippet: null,
    explanation: 'Salting prevents Rainbow Table lookups and ensures identical passwords produce distinct hash values.',
    options: [
      { text: 'To encrypt passwords so they can be decrypted back to plaintext', isCorrect: false },
      { text: 'To defeat precomputed Rainbow Table attacks and ensure identical passwords produce distinct hashes', isCorrect: true },
      { text: 'To shorten the length of the resulting hash string', isCorrect: false },
      { text: 'To speed up password verification latency', isCorrect: false }
    ]
  },

  // ==================== LEVEL 8 (10 Questions - Advanced) ====================
  {
    id: 'q-100-71',
    subject: 'Java',
    topic: 'String Pool & Memory',
    levelNumber: 8,
    difficulty: 'HARD',
    type: 'OUTPUT_PREDICTION',
    title: 'Java String Pool Operator Comparison',
    prompt: 'What will be printed by the following Java code snippet?',
    codeSnippet: 'String s1 = "Java";\nString s2 = "Java";\nString s3 = new String("Java");\nSystem.out.println((s1 == s2) + " " + (s1 == s3));',
    explanation: 's1 and s2 refer to the exact same String Pool literal (s1 == s2 is true). s3 creates a new object in Heap (s1 == s3 is false). Output: true false',
    options: [
      { text: 'true true', isCorrect: false },
      { text: 'true false', isCorrect: true },
      { text: 'false false', isCorrect: false },
      { text: 'false true', isCorrect: false }
    ]
  },
  {
    id: 'q-100-72',
    subject: 'SQL',
    topic: 'Complex JOINs & Aggregations',
    levelNumber: 8,
    difficulty: 'HARD',
    type: 'SQL_QUERY',
    title: 'SQL Aggregate Grouping Condition',
    prompt: 'Which query retrieves departments with an average salary exceeding 50000 alongside total employee count?',
    codeSnippet: 'SELECT dept_id, COUNT(*), AVG(salary) FROM employees ___ ___ > 50000;',
    explanation: 'GROUP BY dept_id HAVING AVG(salary) > 50000 filters aggregated groups.',
    options: [
      { text: 'WHERE AVG(salary) > 50000 GROUP BY dept_id', isCorrect: false },
      { text: 'GROUP BY dept_id HAVING AVG(salary) > 50000', isCorrect: true },
      { text: 'ORDER BY dept_id WHERE salary > 50000', isCorrect: false },
      { text: 'GROUP BY dept_id WHERE COUNT(*) > 50000', isCorrect: false }
    ]
  },
  {
    id: 'q-100-73',
    subject: 'JavaScript',
    topic: 'Closures & Lexical Scope',
    levelNumber: 8,
    difficulty: 'HARD',
    type: 'OUTPUT_PREDICTION',
    title: 'JavaScript Loop Closure with var vs let',
    prompt: 'What is printed to the console after 100ms when executing the following code?',
    codeSnippet: 'for (var i = 0; i < 3; i++) {\n    setTimeout(() => console.log(i), 100);\n}',
    explanation: 'var is function-scoped. By the time setTimeout callbacks execute, the single shared loop variable i has incremented to 3. Output: 3 3 3.',
    options: [
      { text: '0 1 2', isCorrect: false },
      { text: '3 3 3', isCorrect: true },
      { text: 'undefined undefined undefined', isCorrect: false },
      { text: '0 0 0', isCorrect: false }
    ]
  },
  {
    id: 'q-100-74',
    subject: 'Full Stack',
    topic: 'Node.js Non-Blocking Architecture',
    levelNumber: 8,
    difficulty: 'HARD',
    type: 'CONCEPTUAL',
    title: 'Node.js Event-Driven Architecture',
    prompt: 'How does Node.js handle high-concurrency I/O operations despite running main application JavaScript on a single thread?',
    codeSnippet: null,
    explanation: 'Node.js delegates asynchronous I/O operations to the underlying OS or libuv thread pool, receiving completion notifications on the Event Loop.',
    options: [
      { text: 'By spawning a new V8 engine process for every incoming HTTP connection', isCorrect: false },
      { text: 'By delegating non-blocking I/O to libuv event loop and thread pool asynchronously', isCorrect: true },
      { text: 'By converting all JS code to synchronous C++ binaries at startup', isCorrect: false },
      { text: 'By disabling garbage collection during active user sessions', isCorrect: false }
    ]
  },
  {
    id: 'q-100-75',
    subject: 'C',
    topic: 'Dynamic Memory Leaks',
    levelNumber: 8,
    difficulty: 'HARD',
    type: 'DEBUGGING',
    title: 'C Memory Leak Identification',
    prompt: 'Which utility tool is widely used on Linux systems to detect memory leaks and invalid heap accesses in compiled C programs?',
    codeSnippet: null,
    explanation: 'Valgrind (specifically the Memcheck tool) analyzes binary memory allocations to flag memory leaks and uninitialized memory access.',
    options: [
      { text: 'GDB', isCorrect: false },
      { text: 'Valgrind', isCorrect: true },
      { text: 'Make', isCorrect: false },
      { text: 'GCC', isCorrect: false }
    ]
  },
  {
    id: 'q-100-76',
    subject: 'C++',
    topic: 'Templates & Generic Programming',
    levelNumber: 8,
    difficulty: 'HARD',
    type: 'CODE_ANALYSIS',
    title: 'C++ Generic Function Template Syntax',
    prompt: 'Which line correctly declares a C++ function template returning the maximum of two values of generic type T?',
    codeSnippet: null,
    explanation: 'template <typename T> T getMax(T a, T b) defines a generic template function.',
    options: [
      { text: 'generic <class T> T getMax(T a, T b)', isCorrect: false },
      { text: 'template <typename T> T getMax(T a, T b)', isCorrect: true },
      { text: 'class T template getMax(T a, T b)', isCorrect: false },
      { text: 'void template<T> getMax(T a, T b)', isCorrect: false }
    ]
  },
  {
    id: 'q-100-77',
    subject: 'Java',
    topic: 'Custom Exceptions',
    levelNumber: 8,
    difficulty: 'HARD',
    type: 'CONCEPTUAL',
    title: 'Java Checked vs Unchecked Exceptions',
    prompt: 'Which class must a custom Exception extend in Java to be categorized as an Unchecked (Runtime) Exception?',
    codeSnippet: null,
    explanation: 'Custom unchecked exceptions must extend java.lang.RuntimeException (or its subclasses).',
    options: [
      { text: 'java.lang.Throwable', isCorrect: false },
      { text: 'java.lang.Exception', isCorrect: false },
      { text: 'java.lang.RuntimeException', isCorrect: true },
      { text: 'java.lang.Error', isCorrect: false }
    ]
  },
  {
    id: 'q-100-78',
    subject: 'JavaScript',
    topic: 'Prototype Chain',
    levelNumber: 8,
    difficulty: 'HARD',
    type: 'OUTPUT_PREDICTION',
    title: 'JavaScript Prototype Inheritance Lookup',
    prompt: 'What will be printed when executing the following code?',
    codeSnippet: 'function User(name) { this.name = name; }\nUser.prototype.role = "Learner";\nconst u = new User("Alice");\ndelete u.role;\nconsole.log(u.role);',
    explanation: 'u.role does not exist directly on instance u (delete has no effect on prototype). Lookup delegates up prototype chain to User.prototype.role ("Learner").',
    options: [
      { text: 'undefined', isCorrect: false },
      { text: '"Learner"', isCorrect: true },
      { text: 'TypeError', isCorrect: false },
      { text: 'null', isCorrect: false }
    ]
  },
  {
    id: 'q-100-79',
    subject: 'Full Stack',
    topic: 'Environment Variables & Security',
    levelNumber: 8,
    difficulty: 'HARD',
    type: 'BEST_PRACTICE',
    title: 'Secrets Management in Production',
    prompt: 'Why should production database passwords and secret JWT keys NEVER be hardcoded into git version control source files?',
    codeSnippet: null,
    explanation: 'Committing secrets into source control exposes credentials to unauthorized repository access and history leaks. They must be injected via environment variables.',
    options: [
      { text: 'It causes Next.js runtime compilation to slow down', isCorrect: false },
      { text: 'It exposes sensitive authorization credentials in git history and risks system compromise', isCorrect: true },
      { text: 'Git automatically redacts passwords in public repositories', isCorrect: false },
      { text: 'Secrets cannot be parsed as JSON strings', isCorrect: false }
    ]
  },
  {
    id: 'q-100-80',
    subject: 'Full Stack',
    topic: 'Git Branching & Merge Conflicts',
    levelNumber: 8,
    difficulty: 'HARD',
    type: 'CONCEPTUAL',
    title: 'Git Merge Conflict Resolution Flow',
    prompt: 'When Git flags a merge conflict between two branches, what sequence of actions resolves it properly?',
    codeSnippet: null,
    explanation: 'Conflict markers must be manually resolved in the file, then git add <file> stages the resolved file, followed by git commit.',
    options: [
      { text: 'git reset --hard followed by git push --force', isCorrect: false },
      { text: 'Manually resolve conflict markers in files -> git add -> git commit', isCorrect: true },
      { text: 'Delete .git directory and re-clone repository', isCorrect: false },
      { text: 'git checkout main -f', isCorrect: false }
    ]
  },

  // ==================== LEVEL 9 (10 Questions - Advanced Problem Solving) ====================
  {
    id: 'q-100-81',
    subject: 'C',
    topic: 'Double Pointers & Output Prediction',
    levelNumber: 9,
    difficulty: 'HARD',
    type: 'OUTPUT_PREDICTION',
    title: 'C Pointer to Pointer Evaluation',
    prompt: 'What is the output of the following C program?',
    codeSnippet: '#include <stdio.h>\nint main() {\n    int a = 20;\n    int *p = &a;\n    int **pp = &p;\n    **pp = 50;\n    printf("%d", a);\n    return 0;\n}',
    explanation: '**pp double dereferences to variable a and updates its value to 50. Output: 50.',
    options: [
      { text: '20', isCorrect: false },
      { text: '50', isCorrect: true },
      { text: 'Garbage Value', isCorrect: false },
      { text: 'Compilation Error', isCorrect: false }
    ]
  },
  {
    id: 'q-100-82',
    subject: 'C++',
    topic: 'Virtual Destructors',
    levelNumber: 9,
    difficulty: 'HARD',
    type: 'CONCEPTUAL',
    title: 'C++ Base Class Virtual Destructor Importance',
    prompt: 'Why must a polymorphic base class in C++ declare a virtual destructor?',
    codeSnippet: 'Base *ptr = new Derived();\ndelete ptr;',
    explanation: 'If a base class destructor is not virtual, executing "delete ptr" on a Base pointer to a Derived object only calls the Base destructor, causing undefined behavior and resource leaks.',
    options: [
      { text: 'To allow pure abstract class creation', isCorrect: false },
      { text: 'To ensure proper invocation of the Derived class destructor when deleting via a Base pointer', isCorrect: true },
      { text: 'To prevent copy constructors from running', isCorrect: false },
      { text: 'It is required by C++ syntax compiler rules', isCorrect: false }
    ]
  },
  {
    id: 'q-100-83',
    subject: 'Java',
    topic: 'Concurrency & Deadlocks',
    levelNumber: 9,
    difficulty: 'HARD',
    type: 'SCENARIO',
    title: 'Java Thread Deadlock Condition',
    prompt: 'Which set of 4 Coffman conditions must hold simultaneously for a Thread Deadlock to occur in Java concurrent programming?',
    codeSnippet: null,
    explanation: 'Deadlock requires: Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait.',
    options: [
      { text: 'Race condition, Livelock, Starvation, Thread Interruption', isCorrect: false },
      { text: 'Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait', isCorrect: true },
      { text: 'Volatile access, Atomic Integer, Lock Contention, Garbage Collection', isCorrect: false },
      { text: 'Reentrant Lock, Semaphore, Barrier, CountDownLatch', isCorrect: false }
    ]
  },
  {
    id: 'q-100-84',
    subject: 'JavaScript',
    topic: 'Currying & Composition',
    levelNumber: 9,
    difficulty: 'HARD',
    type: 'CODE_ANALYSIS',
    title: 'JavaScript Function Currying Output',
    prompt: 'What is returned by evaluating multiply(2)(3)(4) given the following curried function definition?',
    codeSnippet: 'const multiply = a => b => c => a * b * c;\nconsole.log(multiply(2)(3)(4));',
    explanation: 'Curried functions evaluate nested unary functions: 2 * 3 * 4 = 24.',
    options: [
      { text: '9', isCorrect: false },
      { text: '24', isCorrect: true },
      { text: 'NaN', isCorrect: false },
      { text: 'Function reference', isCorrect: false }
    ]
  },
  {
    id: 'q-100-85',
    subject: 'Full Stack',
    topic: 'Microservices Architecture',
    levelNumber: 9,
    difficulty: 'HARD',
    type: 'CONCEPTUAL',
    title: 'Monolithic vs Microservice Tradeoff',
    prompt: 'What is a major architectural challenge introduced when transitioning from a Monolith to Microservices?',
    codeSnippet: null,
    explanation: 'Microservices introduce distributed system complexity, requiring network fault tolerance, eventual consistency, and distributed tracing.',
    options: [
      { text: 'Inability to use SQL databases', isCorrect: false },
      { text: 'Increased operational complexity, network latency, and distributed data consistency management', isCorrect: true },
      { text: 'Frontend components can no longer render HTML', isCorrect: false },
      { text: 'Docker containers become unusable', isCorrect: false }
    ]
  },
  {
    id: 'q-100-86',
    subject: 'C',
    topic: 'File I/O & Buffers',
    levelNumber: 9,
    difficulty: 'HARD',
    type: 'CONCEPTUAL',
    title: 'C fflush(stdout) Purpose',
    prompt: 'What is the purpose of calling fflush(stdout) in C network or console programming?',
    codeSnippet: null,
    explanation: 'fflush(stdout) forces the output stream buffer to write its buffered contents immediately to the underlying device or terminal.',
    options: [
      { text: 'Clears input buffer for scanf', isCorrect: false },
      { text: 'Flushes and outputs any buffered data in stdout immediately', isCorrect: true },
      { text: 'Closes standard output file descriptor', isCorrect: false },
      { text: 'Allocates extra heap memory for printf', isCorrect: false }
    ]
  },
  {
    id: 'q-100-87',
    subject: 'C++',
    topic: 'RAII Pattern',
    levelNumber: 9,
    difficulty: 'HARD',
    type: 'CONCEPTUAL',
    title: 'C++ RAII Idiom',
    prompt: 'What does the RAII (Resource Acquisition Is Initialization) idiom guarantee in C++ software engineering?',
    codeSnippet: null,
    explanation: 'RAII ties resource lifecycle (files, memory, locks) to object lifetime, ensuring automatic cleanup when objects go out of scope.',
    options: [
      { text: 'All objects are initialized at compile-time', isCorrect: false },
      { text: 'Resources are bound to object lifetime so destructors automatically release them upon scope exit', isCorrect: true },
      { text: 'Garbage collector runs every 10 seconds', isCorrect: false },
      { text: 'Prevents template metaprogramming errors', isCorrect: false }
    ]
  },
  {
    id: 'q-100-88',
    subject: 'Java',
    topic: 'Generics & Wildcards',
    levelNumber: 9,
    difficulty: 'HARD',
    type: 'CONCEPTUAL',
    title: 'Java Generics Bounded Wildcard (PECS)',
    prompt: 'In Java Generics design principles, what does the mnemonic PECS stand for?',
    codeSnippet: null,
    explanation: 'PECS stands for Producer Extends, Consumer Super (use ? extends T for data sources, ? super T for data sinks).',
    options: [
      { text: 'Package Extends Class Structure', isCorrect: false },
      { text: 'Producer Extends, Consumer Super', isCorrect: true },
      { text: 'Private Encapsulated Class Scope', isCorrect: false },
      { text: 'Polymorphic Exception Control System', isCorrect: false }
    ]
  },
  {
    id: 'q-100-89',
    subject: 'JavaScript',
    topic: 'Debouncing vs Throttling',
    levelNumber: 9,
    difficulty: 'HARD',
    type: 'CONCEPTUAL',
    title: 'Debounce vs Throttle Functions',
    prompt: 'In high-frequency event handling (like window resize or search inputs), how does Debouncing differ from Throttling?',
    codeSnippet: null,
    explanation: 'Debouncing delays execution until events pause for N ms; Throttling limits execution to at most once per fixed time interval N ms.',
    options: [
      { text: 'Throttling delays execution until events stop; Debouncing rate-limits execution', isCorrect: false },
      { text: 'Debouncing delays execution until user pauses activity; Throttling enforces a maximum execution rate per time interval', isCorrect: true },
      { text: 'Both behave identically', isCorrect: false },
      { text: 'Debouncing runs on web workers only', isCorrect: false }
    ]
  },
  {
    id: 'q-100-90',
    subject: 'Full Stack',
    topic: 'API Rate Limiting',
    levelNumber: 9,
    difficulty: 'HARD',
    type: 'SCENARIO',
    title: 'Token Bucket Algorithm for Rate Limiting',
    prompt: 'Which algorithmic pattern is commonly used in Redis API Rate Limiting middleware to permit bursts while enforcing average request throughput?',
    codeSnippet: null,
    explanation: 'The Token Bucket algorithm adds tokens to a bucket at a fixed rate, allowing bursts up to bucket capacity.',
    options: [
      { text: 'Bubble Sort', isCorrect: false },
      { text: 'Token Bucket Algorithm', isCorrect: true },
      { text: 'Round Robin DNS', isCorrect: false },
      { text: 'LRU Cache Eviction', isCorrect: false }
    ]
  },

  // ==================== LEVEL 10 (10 Questions - Advanced Real-World Applications) ====================
  {
    id: 'q-100-91',
    subject: 'C',
    topic: 'Struct Padding & Alignment',
    levelNumber: 10,
    difficulty: 'HARD',
    type: 'OUTPUT_PREDICTION',
    title: 'C Structure Memory Alignment Padding',
    prompt: 'On a 64-bit architecture with 4-byte int and 8-byte pointer alignment, what is sizeof(struct Data)?',
    codeSnippet: '#include <stdio.h>\nstruct Data {\n    char c;\n    int i;\n    double d;\n};\nint main() {\n    printf("%lu", sizeof(struct Data));\n    return 0;\n}',
    explanation: 'char c (1 byte) + 3 padding bytes, int i (4 bytes) = 8 bytes. double d (8 bytes). Total aligned size = 16 bytes.',
    options: [
      { text: '13', isCorrect: false },
      { text: '16', isCorrect: true },
      { text: '24', isCorrect: false },
      { text: '32', isCorrect: false }
    ]
  },
  {
    id: 'q-100-92',
    subject: 'C++',
    topic: 'Move Semantics & Rvalues',
    levelNumber: 10,
    difficulty: 'HARD',
    type: 'CONCEPTUAL',
    title: 'C++11 Rvalue References (&&)',
    prompt: 'What primary problem do Move Semantics and Rvalue References (&&) solve in modern C++11?',
    codeSnippet: null,
    explanation: 'Move semantics eliminate expensive deep copies when transferring resources from temporary rvalue objects to lvalue targets.',
    options: [
      { text: 'Eliminates header file includes', isCorrect: false },
      { text: 'Avoids costly deep-copying of temporary objects by stealing resource pointers', isCorrect: true },
      { text: 'Replaces pointers with smart references', isCorrect: false },
      { text: 'Forces functions to run synchronously', isCorrect: false }
    ]
  },
  {
    id: 'q-100-93',
    subject: 'Java',
    topic: 'ConcurrentHashMap Internals',
    levelNumber: 10,
    difficulty: 'HARD',
    type: 'CONCEPTUAL',
    title: 'Java ConcurrentHashMap Lock Granularity',
    prompt: 'How does ConcurrentHashMap achieve high concurrency without locking the entire table during write operations in Java 8+?',
    codeSnippet: null,
    explanation: 'Java 8 ConcurrentHashMap uses fine-grained CAS (Compare-And-Swap) operations and synchronized lock nodes on individual bucket heads rather than locking table segments.',
    options: [
      { text: 'Locking the entire table object', isCorrect: false },
      { text: 'Fine-grained Compare-And-Swap (CAS) and per-bucket node locks', isCorrect: true },
      { text: 'Making all map instances immutable', isCorrect: false },
      { text: 'Disabling garbage collection on put()', isCorrect: false }
    ]
  },
  {
    id: 'q-100-94',
    subject: 'SQL',
    topic: 'B-Tree Indexing Internals',
    levelNumber: 10,
    difficulty: 'HARD',
    type: 'CONCEPTUAL',
    title: 'SQL Database B-Tree Index Lookup Complexity',
    prompt: 'Why are B-Tree indexes preferred over Hash indexes for relational database columns evaluated with range queries (e.g. BETWEEN or >)?',
    codeSnippet: null,
    explanation: 'B-Trees store keys in sorted order, enabling fast logarithmic sequential range scans; Hash indexes only support O(1) exact equality matches.',
    options: [
      { text: 'Hash indexes require 10x more storage', isCorrect: false },
      { text: 'B-Trees maintain sorted order allowing range scans (>, BETWEEN); Hash indexes only support exact equality (=)', isCorrect: true },
      { text: 'Hash indexes cause deadlocks', isCorrect: false },
      { text: 'B-Trees run inside CPU L1 cache', isCorrect: false }
    ]
  },
  {
    id: 'q-100-95',
    subject: 'JavaScript',
    topic: 'WeakMap & Garbage Collection',
    levelNumber: 10,
    difficulty: 'HARD',
    type: 'CONCEPTUAL',
    title: 'JavaScript WeakMap Key Garbage Collection',
    prompt: 'How does a WeakMap differ from a standard Map regarding memory leak management in JavaScript?',
    codeSnippet: null,
    explanation: 'WeakMap keys must be objects and are held weakly, allowing keys to be garbage collected if no other references exist, preventing memory leaks.',
    options: [
      { text: 'WeakMap stores values in IndexedDB', isCorrect: false },
      { text: 'WeakMap keys are weakly referenced objects, allowing key-value garbage collection when keys lose outer references', isCorrect: true },
      { text: 'WeakMap permits primitive strings as keys', isCorrect: false },
      { text: 'WeakMap supports synchronous iteration via for...of', isCorrect: false }
    ]
  },
  {
    id: 'q-100-96',
    subject: 'Full Stack',
    topic: 'Load Balancing & High Availability',
    levelNumber: 10,
    difficulty: 'HARD',
    type: 'SCENARIO',
    title: 'Sticky Sessions vs Stateless Load Balancing',
    prompt: 'In a scaled production deployment with multiple API server instances, why is Stateless JWT Session Architecture preferred over Server-Stored Sticky Sessions?',
    codeSnippet: null,
    explanation: 'Stateless JWTs allow any server instance to verify and process requests independently, enabling seamless horizontal scaling without session-affinity binding.',
    options: [
      { text: 'Stateless servers require no HTTPS certificates', isCorrect: false },
      { text: 'Stateless authentication allows any application server node to handle any request, simplifying horizontal scaling and fault tolerance', isCorrect: true },
      { text: 'Sticky sessions consume zero memory', isCorrect: false },
      { text: 'JWTs encrypt database tables automatically', isCorrect: false }
    ]
  },
  {
    id: 'q-100-97',
    subject: 'Full Stack',
    topic: 'Web Security (XSS & CSRF)',
    levelNumber: 10,
    difficulty: 'HARD',
    type: 'SECURITY',
    title: 'Cross-Site Scripting (XSS) Mitigation',
    prompt: 'Which security header instructs modern web browsers to block inline script execution and enforce strict trusted script source domains?',
    codeSnippet: null,
    explanation: 'Content-Security-Policy (CSP) headers prevent XSS by restricting allowed script sources and disallowing unsafe inline scripts.',
    options: [
      { text: 'X-XSS-Protection: 1', isCorrect: false },
      { text: 'Content-Security-Policy (CSP)', isCorrect: true },
      { text: 'Strict-Transport-Security (HSTS)', isCorrect: false },
      { text: 'X-Content-Type-Options: nosniff', isCorrect: false }
    ]
  },
  {
    id: 'q-100-98',
    subject: 'Full Stack',
    topic: 'Database Transactions & ACID',
    levelNumber: 10,
    difficulty: 'HARD',
    type: 'CONCEPTUAL',
    title: 'SQL Transaction Isolation Levels',
    prompt: 'Which SQL Transaction Isolation Level completely prevents Dirty Reads, Non-Repeatable Reads, and Phantom Reads?',
    codeSnippet: null,
    explanation: 'SERIALIZABLE is the highest isolation level, executing transactions sequentially to eliminate all read anomalies.',
    options: [
      { text: 'READ UNCOMMITTED', isCorrect: false },
      { text: 'READ COMMITTED', isCorrect: false },
      { text: 'REPEATABLE READ', isCorrect: false },
      { text: 'SERIALIZABLE', isCorrect: true }
    ]
  },
  {
    id: 'q-100-99',
    subject: 'Full Stack',
    topic: 'SSR vs CSR vs SSG Architecture',
    levelNumber: 10,
    difficulty: 'HARD',
    type: 'CONCEPTUAL',
    title: 'Next.js Rendering Strategies',
    prompt: 'Which rendering strategy in Next.js generates static HTML pages at build time and re-generates individual pages in the background on incoming requests without rebuilding the full app?',
    codeSnippet: null,
    explanation: 'Incremental Static Regeneration (ISR) enables updating static pages incrementally after build time.',
    options: [
      { text: 'Client-Side Rendering (CSR)', isCorrect: false },
      { text: 'Incremental Static Regeneration (ISR)', isCorrect: true },
      { text: 'Server-Side Rendering (SSR) per request', isCorrect: false },
      { text: 'Single Page Routing (SPA)', isCorrect: false }
    ]
  },
  {
    id: 'q-100-100',
    subject: 'Full Stack',
    topic: 'CI/CD & Zero-Downtime Deployment',
    levelNumber: 10,
    difficulty: 'HARD',
    type: 'BEST_PRACTICE',
    title: 'Blue-Green Deployment Strategy',
    prompt: 'How does Blue-Green Deployment ensure zero-downtime updates during production web app releases?',
    codeSnippet: null,
    explanation: 'Blue-Green maintains two identical environments; new version is deployed to idle Green env and load balancer router switches traffic seamlessly once health checks pass.',
    options: [
      { text: 'By stopping all servers for 5 minutes during build', isCorrect: false },
      { text: 'By running two identical environments and switching load balancer traffic to the newly updated green environment after health verification', isCorrect: true },
      { text: 'By forcing users to re-login every build', isCorrect: false },
      { text: 'By deploying code directly to master branch without testing', isCorrect: false }
    ]
  }
];
