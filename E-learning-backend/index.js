import express, { response, urlencoded } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import cookieParser from 'cookie-parser';
import connectDB from './db.js';
import userRoutes from './src/routers/UserRouter.js';
import quizzRoutes from './src/routers/QuizzRouter.js';
import dashboardRoutes from './src/routers/AdminRouter.js';
import  authorizRouter  from './src/routers/AuthorizRouter.js';
//upload images



dotenv.config();
connectDB();


const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser(process.env.COOKIE_SECRET || 'your-default-secret'));
app.use(express.urlencoded());



app.get('/',(req,res)=>{
  res.send('hello world')
});


//authorizarion for each action
app.use('/api/authorize',authorizRouter); 


app.use('/api/user',userRoutes);
app.use('/api/quizz',quizzRoutes);

// Admin

// Admin Dashboard routes
 app.use('/admin',dashboardRoutes);
// app.use('/admin/create')





//code execution 
const JDoodleClientID = 'e7b06eab4696ece7f653aa623bb7a6af'; // Replace with your JDoodle client ID
const JDoodleClientSecret = 'b2308d0ba981ea3b496139726ab62a22340175c2ca21de6bf8c0242c696a5489'; // Replace with your JDoodle client secret
const JDoodleAPIURL = 'https://api.jdoodle.com/v1/execute';

// Middleware
app.get("/execute",async (req, res)=>{
res.send('execute');
});

// POST endpoint to execute code

app.post('/execute', async (req, res) => {
    const { language, code, input } = req.body;
    console.log(req.body);

    if (!language || !code) {
        return res.status(400).json({ error: 'Language and code are required' });
    }

    // Set up the request payload for JDoodle
    const payload = {
        clientId: JDoodleClientID,
        clientSecret: JDoodleClientSecret,
        script: code,
        language: language,
        versionIndex: "0", // default version, can adjust as per the JDoodle API docs
        stdin: input || "", // Input to provide to the code (optional)
    };

    try {
        const response = await axios.post(JDoodleAPIURL, payload);
        res.json(response.data);  // Send back JDoodle response (output or error)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error executing code' });
    }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
