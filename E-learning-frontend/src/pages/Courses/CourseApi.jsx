// const coursesData = [
//   {
//     id: 1,
//     title: "Introduction to Web Development",
//     description: "Learn the basics of HTML, CSS, and JavaScript, and start your journey into web development.",
//     instructor: "John Doe",
//     category: "Web Development",
//     price: 20,
//     difficulty: "Beginner",
//     rating: 4.5,
//     image: "https://thumbs.dreamstime.com/b/programming-web-banner-best-languages-technology-process-software-development-156829872.jpg",
//     modules: [
//       {
//         id: 1,
//         title: "Getting Started",
//         subtitle: [
//           {
//             sid: 1,
//             stitle: "What is Web Development?",
//             videoUrl: "https://www.youtube.com/watch?v=1Rs2ND1ryYc",
//             content: `
// ### What is Web Development?
// Web development is the process of building and maintaining websites. It includes:
// - **Frontend Development**: Everything users see on their browser (HTML, CSS, JavaScript).
// - **Backend Development**: Server-side logic and database interactions.

// ### Key Points to Learn:
// - **Frontend**: Learn how to create beautiful and interactive web pages.
// - **Backend**: Learn how servers, APIs, and databases work together to make websites dynamic.
// - **Tools**: Understand the basics of version control systems like Git and popular IDEs like VS Code.
// `,
//           },
//           {
//             sid: 2,
//             stitle: "Setting up Tools",
//             videoUrl: "https://www.youtube.com/watch?v=gnkrDse9QKc",
//             content: `
// ### Setting Up Your Development Environment:
// To start developing websites, you’ll need:
// 1. **Code Editor**: Install VS Code or Sublime Text for writing code.
// 2. **Web Browser**: Use Google Chrome with developer tools enabled.
// 3. **Version Control**: Install Git to track changes in your projects.
// 4. **Live Server**: Use a tool like Live Server for real-time preview.

// ### Hands-on Activity:
// - Install VS Code and create a simple "Hello, World!" HTML file.
// - Run the file in your browser and inspect the elements using Chrome DevTools.
// `,
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: 2,
//     title: "Advanced JavaScript",
//     description: "Delve deeper into JavaScript and learn how to write efficient and scalable code.",
//     instructor: "Jane Smith",
//     category: "Programming",
//     price: 50,
//     rating: 4.7,
//     difficulty: "Advanced",
//     image: "https://bairesdev.mo.cloudinary.net/blog/2023/08/What-Is-JavaScript-Used-For.jpg?tx=w_384",
//     modules: [
//       {
//         id: 1,
//         title: "JavaScript Fundamentals",
//         subtitle: [
//           {
//             sid: 1,
//             stitle: "Variables and Scopes",
//             videoUrl: "https://www.youtube.com/watch?v=upDLs1sn7g4",
//             content: `
// ### JavaScript Variables:
// Variables store data. JavaScript uses **var**, **let**, and **const**:
// - **var**: Function-scoped (avoid using in modern JS).
// - **let**: Block-scoped, can be reassigned.
// - **const**: Block-scoped, cannot be reassigned.

// ### Scopes in JavaScript:
// 1. **Global Scope**: Accessible everywhere.
// 2. **Function Scope**: Accessible only inside a function.
// 3. **Block Scope**: Variables declared with let/const within {}.
// `,
//           },
//           {
//             sid: 2,
//             stitle: "Functions and Closures",
//             videoUrl: "1JsJx1x35c0",
//             content: `
// ### JavaScript Functions:
// Functions perform tasks or calculate values. There are several types:
// 1. **Function Declaration**: \`function sayHello() {}\`
// 2. **Function Expression**: \`const sayHello = function() {}\`
// 3. **Arrow Functions**: \`const sayHello = () => {}\`

// ### Closures:
// A closure is a function that remembers its lexical scope even when executed outside of it.
// `,
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: 7,
//     title: "Node.js Essentials",
//     description: "Understand the basics of Node.js to build scalable server-side applications.",
//     instructor: "Michael Brown",
//     category: "Web Development",
//     price: 20,
//     difficulty: "Beginner",
//     rating: 4.6,
//     image: "https://th.bing.com/th/id/OIP.dJw_f9aVwuHM-OCMe-UMBgHaEK?rs=1&pid=ImgDetMain",
//     modules: [
//       {
//         id: 1,
//         title: "Introduction to Node.js",
//         subtitle: [
//           {
//             sid: 1,
//             stitle: "Setting up Node.js",
//             videoUrl: "ohIAiuHMKMI",
//             content: "Install Node.js and create your first application...",
//           },
//         ],
//       },
//     ],
//   },
  

//   {
//     id: 3,
//     title: "React for Beginners",
//     description: "Learn the basics of React, including components, state, and props, to build modern web applications.",
//     instructor: "Alice Johnson",
//     category: "Web Development",
//     difficulty: "Beginner",
//     price: 20,
//     rating: 4.8,
//     image: "https://th.bing.com/th/id/OIP.FfFMBaA_sroMDCWBKhJhcAAAAA?rs=1&pid=ImgDetMain",
//     modules: [
//       {
//         id: 1,
//         title: "React Basics",
//         subtitle: [
//           {
//             sid: 1,
//             stitle: "What is React?",
//             videoUrl: "-mJFZp84TIY",
//             content: "React is a JavaScript library for building user interfaces...",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: 4,
//     title: "Node.js Essentials",
//     description: "Understand the basics of Node.js to build scalable server-side applications.",
//     instructor: "Michael Brown",
//     category: "Web Development",
//     difficulty: "Beginner",
//     price: 20,
//     rating: 4.6,
//     image: "https://th.bing.com/th/id/OIP.dJw_f9aVwuHM-OCMe-UMBgHaEK?rs=1&pid=ImgDetMain",
//     modules: [
//       {
//         id: 1,
//         title: "Introduction to Node.js",
//         subtitle: [
//           {
//             sid: 1,
//             stitle: "Setting up Node.js",
//             videoUrl: "ohIAiuHMKMI",
//             content: "Install Node.js and create your first application...",
//           },
//         ],
//       },
//     ],
//   },
  
//   {
//     id: 5,
//     title: "Python Programming",
//     description: "Start your journey into programming with Python, a versatile and beginner-friendly language.",
//     instructor: "Sarah Green",
//     category: "Programming",
//     difficulty: "Advanced",
//     price: 50,
//     rating: 4.9,
//     image: "https://thumbs.dreamstime.com/b/python-programming-colorful-plexus-design-python-language-programming-banner-colorful-plexus-design-software-technology-166200238.jpg",
//     modules: [
//       {
//         id: 1,
//         title: "Getting Started with Python",
//         subtitle: [
//           {
//             sid: 1,
//             stitle: "Installing Python",
//             videoUrl: "vLqTf2b6GZw",
//             content: "Learn how to install Python and set up your development environment...",
//           },
//         ],
//       },
//     ],
//   },
 
//   {
//     id: 8,
//     title: "Node.js Essentials",
//     description: "Understand the basics of Node.js to build scalable server-side applications.",
//     instructor: "Michael Brown",
//     difficulty: "Beginner",
//     price: 20,
//     rating: 4.6,
//     image: "https://th.bing.com/th/id/OIP.dJw_f9aVwuHM-OCMe-UMBgHaEK?rs=1&pid=ImgDetMain",
//     modules: [
//       {
//         id: 1,
//         title: "Introduction to Node.js",
//         subtitle: [
//           {
//             sid: 1,
//             stitle: "Setting up Node.js",
//             videoUrl: "ohIAiuHMKMI",
//             content: "Install Node.js and create your first application...",
//           },
//         ],
//       },
//     ],
//   },
  

//   {
//     id: 6,
//     title: "Database Design",
//     description: "Master database concepts and learn to design efficient and normalized databases.",
//     instructor: "David Lee",
//     category: "Programming",
//     price: 50,
  
//     difficulty: "Advanced",
//     rating: 4.7,
//     image: "https://miro.medium.com/v2/resize:fit:1358/1*Xt6K_i5UlFC2CLrgbBPbwQ.png",
//     modules: [
//       {
//         id: 1,
//         title: "Database Fundamentals",
//         subtitle: [
//           {
//             sid: 1,
//             stitle: "What is a Database?",
//             videoUrl: "Ht6DnuU96MI",
//             content: "Understand what databases are and how they store information...",
//           },
//         ],
//       },
//     ],
//   },
// ];



const coursesData = [
  {
    title: "Introduction to Web Development",
    description: "Learn the basics of HTML, CSS, and JavaScript, and start your journey into web development.",
    instructor: "ObjectId('60d5f9b5fc13ae1d5c001b23')", 
    category: "Web Development",
    price: 20,
    thumbnail: "https://thumbs.dreamstime.com/b/programming-web-banner-best-languages-technology-process-software-development-156829872.jpg",
    duration: "15 hours",
    level: "Beginner",
    rating: 4.6,
    language: "English",
    modules: [
      {
        id: 1,
        title: "Introduction to HTML",
        lessons: [
          {
            sid: 1,
            stitle: "HTML Basics",
            videoUrl: "html_basics_video",
            content: "Learn the basic structure of an HTML document.",
          },
          {
            sid: 2,
            stitle: "HTML Forms and Inputs",
            videoUrl: "html_forms_video",
            content: "Understand how to create forms and collect user inputs.",
          },
        ],
      },
      {
        id: 2,
        title: "Introduction to CSS",
        lessons: [
          {
            sid: 1,
            stitle: "CSS Selectors and Properties",
            videoUrl: "css_selectors_video",
            content: "Learn how to style elements using CSS.",
          },
        ],
      },
    ],
  },
  {
    title: "Advanced JavaScript",
    description: "Delve deeper into JavaScript and learn how to write efficient and scalable code.",
    instructor: "ObjectId('60d5f9b5fc13ae1d5c001b24')",
    category: "Programming",
    price: 50,
    thumbnail: "https://bairesdev.mo.cloudinary.net/blog/2023/08/What-Is-JavaScript-Used-For.jpg?tx=w_384",
    duration: "20 hours",
    level: "Advanced",
    language: "English",
    rating: 4.0,
    modules: [
      {
        id: 1,
        title: "JavaScript Fundamentals",
        lessons: [
          {
            sid: 1,
            stitle: "Variables and Data Types",
            videoUrl: "js_variables_video",
            content: "Learn about variables, data types, and scope in JavaScript.",
          },
          {
            sid: 2,
            stitle: "Functions and Closures",
            videoUrl: "js_functions_video",
            content: "Understand functions, closures, and how they work in JavaScript.",
          },
        ],
      },
    ],
  },
  {
    title: "Node.js Essentials",
    description: "Understand the basics of Node.js to build scalable server-side applications.",
    instructor: "ObjectId('60d5f9b5fc13ae1d5c001b25')",
    category: "Web Development",
    price: 20,
    rating: 4.0,
    thumbnail: "https://th.bing.com/th/id/OIP.dJw_f9aVwuHM-OCMe-UMBgHaEK?rs=1&pid=ImgDetMain",
    duration: "12 hours",
    level: "Beginner",
    language: "English",
    modules: [
      {
        id: 1,
        title: "Getting Started with Node.js",
        lessons: [
          {
            sid: 1,
            stitle: "Installing Node.js",
            videoUrl: "node_installation_video",
            content: "Learn how to install and set up Node.js.",
          },
          {
            sid: 2,
            stitle: "Understanding the Event Loop",
            videoUrl: "node_eventloop_video",
            content: "Understand how the Node.js event loop works.",
          },
        ],
      },
    ],
  },
  {
    title: "React for Beginners",
    description: "Learn the basics of React, including components, state, and props, to build modern web applications.",
    instructor: "ObjectId('60d5f9b5fc13ae1d5c001b26')",
    category: "Web Development",
    price: 20,
    rating: 3.0,
    thumbnail: "https://th.bing.com/th/id/OIP.FfFMBaA_sroMDCWBKhJhcAAAAA?rs=1&pid=ImgDetMain",
    duration: "18 hours",
    level: "Beginner",
    language: "English",
    modules: [
      {
        id: 1,
        title: "Introduction to React",
        lessons: [
          {
            sid: 1,
            stitle: "Understanding Components",
            videoUrl: "react_components_video",
            content: "Learn about React components and how to use them.",
          },
        ],
      },
    ],
  },
  {
    title: "Python Programming",
    description: "Start your journey into programming with Python, a versatile and beginner-friendly language.",
    instructor: "ObjectId('60d5f9b5fc13ae1d5c001b27')",
    category: "Programming",
    price: 50,
    rating: 4.0,
    thumbnail: "https://thumbs.dreamstime.com/b/python-programming-colorful-plexus-design-python-language-programming-banner-colorful-plexus-design-software-technology-166200238.jpg",
    duration: "25 hours",
    level: "Advanced",
    language: "English",
    modules: [
      {
        id: 1,
        title: "Python Basics",
        lessons: [
          {
            sid: 1,
            stitle: "Variables and Data Types",
            videoUrl: "python_variables_video",
            content: "Learn how variables and data types work in Python.",
          },
        ],
      },
    ],
  },
  {
    title: "Database Design",
    description: "Master database concepts and learn to design efficient and normalized databases.",
    instructor: "ObjectId('60d5f9b5fc13ae1d5c001b28')",
    category: "Programming",
    price: 50,
    thumbnail: "https://miro.medium.com/v2/resize:fit:1358/1*Xt6K_i5UlFC2CLrgbBPbwQ.png",
    duration: "22 hours",
    level: "Advanced",
    language: "English",
    rating: 2.0,
    modules: [
      {
        id: 1,
        title: "Database Fundamentals",
        lessons: [
          {
            sid: 1,
            stitle: "Understanding Relational Databases",
            videoUrl: "database_basics_video",
            content: "Learn about relational databases and normalization.",
          },
        ],
      },
    ],
  },
  {
    title: "Mobile App Development with Flutter",
    description: "Learn how to develop cross-platform mobile apps using Flutter.",
    instructor: "ObjectId('60d5f9b5fc13ae1d5c001b29')",
    category: "Mobile Development",
    price: 40,
    rating: 3.0,
    thumbnail: "https://images.unsplash.com/photo-1601695063586-29969c8d85a6",
    duration: "30 hours",
    level: "Intermediate",
    language: "English",
    modules: [
      {
        id: 1,
        title: "Getting Started with Flutter",
        lessons: [
          {
            sid: 1,
            stitle: "Setting Up Flutter",
            videoUrl: "flutter_setup_video",
            content: "Learn how to set up Flutter on your system.",
          },
        ],
      },
    ],
  },
  {
    title: "Full Stack Web Development",
    description: "Become a full stack web developer by learning both frontend and backend development.",
    instructor: "ObjectId('60d5f9b5fc13ae1d5c001b30')",
    category: "Web Development",
    price: 100,
    rating: 4.0,
    thumbnail: "https://images.unsplash.com/photo-1561948957-1f2c9d6e9f5c",
    duration: "50 hours",
    level: "Advanced",
    language: "English",
    modules: [
      {
        id: 1,
        title: "Frontend Development",
        lessons: [
          {
            sid: 1,
            stitle: "HTML and CSS Basics",
            videoUrl: "frontend_basics_video",
            content: "Learn HTML and CSS basics for frontend development.",
          },
        ],
      },
      {
        id: 2,
        title: "Backend Development",
        lessons: [
          {
            sid: 1,
            stitle: "Node.js and Express",
            videoUrl: "backend_basics_video",
            content: "Learn how to build the backend with Node.js and Express.",
          },
        ],
      },
    ],
  },
];

// export default coursesData;



export default coursesData;


import axios from 'axios';
import Base_Url from '../../Base_Url';
export  const getAllCourses = async()=>{
    try {

       const response =  await axios.get(`${Base_Url}/api/courses/AllCourses`);
      
     
       return response.data;
    } catch (error) {
        console.log('error in getQuizzes',error);
        throw new Error(error);
    }
}



