const coursesData = [
  {
    id: 1,
    title: "Introduction to Web Development",
    description: "Learn the basics of HTML, CSS, and JavaScript, and start your journey into web development.",
    instructor: "John Doe",
    rating: 4.5,
    image: "https://thumbs.dreamstime.com/b/programming-web-banner-best-languages-technology-process-software-development-156829872.jpg",
    modules: [
      {
        id: 1,
        title: "Getting Started",
        subtitle: [
          {
            sid: 1,
            stitle: "What is Web Development?",
            videoUrl: "https://www.youtube.com/watch?v=1Rs2ND1ryYc",
            content: `
### What is Web Development?
Web development is the process of building and maintaining websites. It includes:
- **Frontend Development**: Everything users see on their browser (HTML, CSS, JavaScript).
- **Backend Development**: Server-side logic and database interactions.

### Key Points to Learn:
- **Frontend**: Learn how to create beautiful and interactive web pages.
- **Backend**: Learn how servers, APIs, and databases work together to make websites dynamic.
- **Tools**: Understand the basics of version control systems like Git and popular IDEs like VS Code.
`,
          },
          {
            sid: 2,
            stitle: "Setting up Tools",
            videoUrl: "https://www.youtube.com/watch?v=gnkrDse9QKc",
            content: `
### Setting Up Your Development Environment:
To start developing websites, you’ll need:
1. **Code Editor**: Install VS Code or Sublime Text for writing code.
2. **Web Browser**: Use Google Chrome with developer tools enabled.
3. **Version Control**: Install Git to track changes in your projects.
4. **Live Server**: Use a tool like Live Server for real-time preview.

### Hands-on Activity:
- Install VS Code and create a simple "Hello, World!" HTML file.
- Run the file in your browser and inspect the elements using Chrome DevTools.
`,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Advanced JavaScript",
    description: "Delve deeper into JavaScript and learn how to write efficient and scalable code.",
    instructor: "Jane Smith",
    rating: 4.7,
    image: "https://bairesdev.mo.cloudinary.net/blog/2023/08/What-Is-JavaScript-Used-For.jpg?tx=w_384",
    modules: [
      {
        id: 1,
        title: "JavaScript Fundamentals",
        subtitle: [
          {
            sid: 1,
            stitle: "Variables and Scopes",
            videoUrl: "https://www.youtube.com/watch?v=upDLs1sn7g4",
            content: `
### JavaScript Variables:
Variables store data. JavaScript uses **var**, **let**, and **const**:
- **var**: Function-scoped (avoid using in modern JS).
- **let**: Block-scoped, can be reassigned.
- **const**: Block-scoped, cannot be reassigned.

### Scopes in JavaScript:
1. **Global Scope**: Accessible everywhere.
2. **Function Scope**: Accessible only inside a function.
3. **Block Scope**: Variables declared with let/const within {}.
`,
          },
          {
            sid: 2,
            stitle: "Functions and Closures",
            videoUrl: "1JsJx1x35c0",
            content: `
### JavaScript Functions:
Functions perform tasks or calculate values. There are several types:
1. **Function Declaration**: \`function sayHello() {}\`
2. **Function Expression**: \`const sayHello = function() {}\`
3. **Arrow Functions**: \`const sayHello = () => {}\`

### Closures:
A closure is a function that remembers its lexical scope even when executed outside of it.
`,
          },
        ],
      },
    ],
  },
  {
    id: 7,
    title: "Node.js Essentials",
    description: "Understand the basics of Node.js to build scalable server-side applications.",
    instructor: "Michael Brown",
    rating: 4.6,
    image: "https://th.bing.com/th/id/OIP.dJw_f9aVwuHM-OCMe-UMBgHaEK?rs=1&pid=ImgDetMain",
    modules: [
      {
        id: 1,
        title: "Introduction to Node.js",
        subtitle: [
          {
            sid: 1,
            stitle: "Setting up Node.js",
            videoUrl: "ohIAiuHMKMI",
            content: "Install Node.js and create your first application...",
          },
        ],
      },
    ],
  },
  

  {
    id: 3,
    title: "React for Beginners",
    description: "Learn the basics of React, including components, state, and props, to build modern web applications.",
    instructor: "Alice Johnson",
    rating: 4.8,
    image: "https://th.bing.com/th/id/OIP.FfFMBaA_sroMDCWBKhJhcAAAAA?rs=1&pid=ImgDetMain",
    modules: [
      {
        id: 1,
        title: "React Basics",
        subtitle: [
          {
            sid: 1,
            stitle: "What is React?",
            videoUrl: "-mJFZp84TIY",
            content: "React is a JavaScript library for building user interfaces...",
          },
        ],
      },
    ],
  },
  {
    id: 4,
    title: "Node.js Essentials",
    description: "Understand the basics of Node.js to build scalable server-side applications.",
    instructor: "Michael Brown",
    rating: 4.6,
    image: "https://th.bing.com/th/id/OIP.dJw_f9aVwuHM-OCMe-UMBgHaEK?rs=1&pid=ImgDetMain",
    modules: [
      {
        id: 1,
        title: "Introduction to Node.js",
        subtitle: [
          {
            sid: 1,
            stitle: "Setting up Node.js",
            videoUrl: "ohIAiuHMKMI",
            content: "Install Node.js and create your first application...",
          },
        ],
      },
    ],
  },
  
  {
    id: 5,
    title: "Python Programming",
    description: "Start your journey into programming with Python, a versatile and beginner-friendly language.",
    instructor: "Sarah Green",
    rating: 4.9,
    image: "https://thumbs.dreamstime.com/b/python-programming-colorful-plexus-design-python-language-programming-banner-colorful-plexus-design-software-technology-166200238.jpg",
    modules: [
      {
        id: 1,
        title: "Getting Started with Python",
        subtitle: [
          {
            sid: 1,
            stitle: "Installing Python",
            videoUrl: "vLqTf2b6GZw",
            content: "Learn how to install Python and set up your development environment...",
          },
        ],
      },
    ],
  },
 
  {
    id: 8,
    title: "Node.js Essentials",
    description: "Understand the basics of Node.js to build scalable server-side applications.",
    instructor: "Michael Brown",
    rating: 4.6,
    image: "https://th.bing.com/th/id/OIP.dJw_f9aVwuHM-OCMe-UMBgHaEK?rs=1&pid=ImgDetMain",
    modules: [
      {
        id: 1,
        title: "Introduction to Node.js",
        subtitle: [
          {
            sid: 1,
            stitle: "Setting up Node.js",
            videoUrl: "ohIAiuHMKMI",
            content: "Install Node.js and create your first application...",
          },
        ],
      },
    ],
  },
  

  {
    id: 6,
    title: "Database Design",
    description: "Master database concepts and learn to design efficient and normalized databases.",
    instructor: "David Lee",
    rating: 4.7,
    image: "https://miro.medium.com/v2/resize:fit:1358/1*Xt6K_i5UlFC2CLrgbBPbwQ.png",
    modules: [
      {
        id: 1,
        title: "Database Fundamentals",
        subtitle: [
          {
            sid: 1,
            stitle: "What is a Database?",
            videoUrl: "Ht6DnuU96MI",
            content: "Understand what databases are and how they store information...",
          },
        ],
      },
    ],
  },
];

export default coursesData;
