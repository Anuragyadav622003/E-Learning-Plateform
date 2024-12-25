- [Frontend Documentation](./frontend/README.md)
- [Admin Panel Documentation](./admin-panel/README.md)
- [Backend Documentation](./backend/README.md)


# Peer-to-Peer Interview Feature for DSA Problem-Solving Platform

This guide provides step-by-step instructions to implement the **Peer-to-Peer Interview** feature with a **DSA Problem-Solving Compiler** on your e-learning platform. The feature enables peer-to-peer interaction, real-time code collaboration, and video/audio calls, allowing users to solve DSA problems together.

---

## Table of Contents

1. [Introduction](#introduction)
2. [Technologies Used](#technologies-used)
3. [Project Setup](#project-setup)
4. [Backend Implementation](#backend-implementation)
    - [Real-Time Communication](#real-time-communication)
    - [Compiler API Integration](#compiler-api-integration)
5. [Frontend Implementation](#frontend-implementation)
    - [Real-Time Code Collaboration with Monaco Editor](#real-time-code-collaboration-with-monaco-editor)
    - [Video/Audio Calling with WebRTC](#videoaudio-calling-with-webrtc)
    - [Problem Solving Interface](#problem-solving-interface)
6. [Testing and Deployment](#testing-and-deployment)
7. [Additional Enhancements](#additional-enhancements)

---

## Introduction

This implementation enables a peer-to-peer interview platform where users can solve DSA problems together. It includes real-time code collaboration, a video/audio calling feature for interviews, and the integration of a code compiler for immediate feedback.

---

## Technologies Used

- **Frontend**: React, Monaco Editor, WebRTC (or Twilio/Agora for video calls)
- **Backend**: Node.js, Express, Socket.IO, Judge0 API (for code compilation)
- **Real-Time Communication**: Socket.IO
- **Video/Audio Calls**: WebRTC (or Twilio/Agora)
- **Code Editor**: Monaco Editor
- **Code Compilation**: Judge0 API

---

## Project Setup

### Frontend Setup

1. **Create a React project**:

   ```bash
   npx create-react-app peer-to-peer-interview
   cd peer-to-peer-interview
Install dependencies:

bash
Copy code
npm install socket.io-client monaco-editor react-webcam twilio-video
Backend Setup
Create a Node.js project:

bash
Copy code
mkdir backend
cd backend
npm init -y
npm install express socket.io axios mongoose
Install Judge0 API for code compilation:

bash
Copy code
npm install axios
Backend Implementation
Real-Time Communication with Socket.IO
In backend/index.js, create the server and handle real-time communication using Socket.IO:

js
Copy code
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const axios = require('axios');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.json());

// Real-time Socket.IO connection
io.on('connection', (socket) => {
    console.log('New peer connected: ', socket.id);

    // Listen for joining room
    socket.on('joinRoom', (roomId) => {
        socket.join(roomId);
        console.log(`${socket.id} joined room ${roomId}`);
    });

    // Send code changes to all peers in the room
    socket.on('codeChange', (data) => {
        socket.to(data.roomId).emit('receiveCodeChange', data);
    });

    // Handle chat messages
    socket.on('sendMessage', (data) => {
        io.to(data.roomId).emit('receiveMessage', data);
    });

    socket.on('disconnect', () => {
        console.log('Peer disconnected:', socket.id);
    });
});

// Run server
server.listen(5000, () => {
    console.log('Server running on port 5000');
});
Compiler API Integration (Judge0 API)
Add a /compile endpoint to compile code using the Judge0 API:

js
Copy code
const compileCode = async (code, languageId) => {
    const response = await axios.post('https://api.judge0.com/submissions', {
        source_code: code,
        language_id: languageId,
    });

    const submissionId = response.data.token;

    // Wait for code execution result
    const result = await axios.get(`https://api.judge0.com/submissions/${submissionId}`);
    return result.data;
};

// Endpoint to compile user code
app.post('/compile', async (req, res) => {
    const { code, languageId } = req.body;
    try {
        const result = await compileCode(code, languageId);
        res.json(result);
    } catch (error) {
        res.status(500).send('Error compiling code');
    }
});
Frontend Implementation
Real-Time Code Collaboration with Monaco Editor
In frontend/src/CodeEditor.js, set up Monaco Editor and Socket.IO to sync code in real-time:

js
Copy code
import React, { useEffect, useRef } from 'react';
import MonacoEditor from 'react-monaco-editor';
import { io } from 'socket.io-client';

const CodeEditor = ({ roomId }) => {
    const editorRef = useRef(null);
    const socket = useRef(io('http://localhost:5000'));

    useEffect(() => {
        socket.current.emit('joinRoom', roomId);

        socket.current.on('receiveCodeChange', (data) => {
            if (editorRef.current) {
                editorRef.current.setValue(data.code);
            }
        });

        return () => {
            socket.current.disconnect();
        };
    }, [roomId]);

    const handleCodeChange = (newCode) => {
        socket.current.emit('codeChange', { roomId, code: newCode });
    };

    return (
        <MonacoEditor
            ref={editorRef}
            height="600px"
            language="javascript"
            theme="vs-dark"
            value=""
            onChange={handleCodeChange}
        />
    );
};

export default CodeEditor;
Video/Audio Calling with WebRTC
For WebRTC-based video/audio calling, create a component frontend/src/VideoCall.js:

js
Copy code
import React, { useEffect, useRef } from 'react';

const VideoCall = ({ roomId }) => {
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);

    useEffect(() => {
        const peerConnection = new RTCPeerConnection();

        // Get local video stream
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((stream) => {
                localVideoRef.current.srcObject = stream;
                stream.getTracks().forEach((track) => peerConnection.addTrack(track, stream));
            });

        // Set up ICE candidate handling, connection, and remote video rendering here

        return () => {
            peerConnection.close();
        };
    }, [roomId]);

    return (
        <div>
            <video ref={localVideoRef} autoPlay muted />
            <video ref={remoteVideoRef} autoPlay />
        </div>
    );
};

export default VideoCall;
Problem Solving Interface
In frontend/src/ProblemPage.js, display the problem and handle code compilation:

js
Copy code
import React, { useState } from 'react';
import axios from 'axios';

const ProblemPage = ({ problemId }) => {
    const [code, setCode] = useState('');
    const [output, setOutput] = useState('');

    const handleCompile = async () => {
        try {
            const response = await axios.post('http://localhost:5000/compile', { code, languageId: 63 }); // Example for JavaScript
            setOutput(response.data.stdout || response.data.stderr);
        } catch (error) {
            setOutput('Error compiling code.');
        }
    };

    return (
        <div>
            <h1>Problem: {problemId}</h1>
            <textarea value={code} onChange={(e) => setCode(e.target.value)} />
            <button onClick={handleCompile}>Run Code</button>
            <pre>{output}</pre>
        </div>
    );
};

export default ProblemPage;
Testing and Deployment
Frontend: Test the video call, code collaboration, and problem-solving interfaces.
Backend: Test the API for code compilation and real-time communication.
Deployment:
Frontend: Use platforms like Vercel or Netlify.
Backend: Use Heroku or Render to deploy your Express server.
Additional Enhancements
Session Recording: Use RecordRTC or the MediaRecorder API to record video/audio.
Feedback System: Allow users to rate and give feedback after each interview.
Analytics: Track session durations, problems solved, and user performance.
Peer Matching: Match peers based on skill level, preferred language, or problem type.
With these instructions and code snippets, you can successfully integrate a peer-to-peer interview system with a collaborative code editor and compiler into your e-learning platform.

yaml
Copy code

---

This `README.md` file contains all the necessary implementation details, code, and explanations for building a peer-to-peer interview system with a code compiler for your platform. You can use this as documentation in your project repository.






