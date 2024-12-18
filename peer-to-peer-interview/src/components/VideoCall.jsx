import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');  // Connect to backend server

function VideoCall() {
  const [hasJoined, setHasJoined] = useState(false);
  const [partnerId, setPartnerId] = useState('');
  const [paired, setPaired] = useState(false);

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const localStreamRef = useRef(null);

  useEffect(() => {
    // Get user media (camera and microphone)
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        localStreamRef.current = stream;
        localVideoRef.current.srcObject = stream;
      })
      .catch((error) => {
        console.error('Error accessing media devices:', error);
      });

    // Listen for events from Socket.IO
    socket.on('paired', (data) => {
      setPaired(true);
      setPartnerId(data.partnerId);
    });

    socket.on('offer', handleOffer);
    socket.on('answer', handleAnswer);
    socket.on('ice-candidate', handleNewICECandidate);
    socket.on('partner-disconnected', () => {
      alert('Your partner has disconnected.');
      setPaired(false);
    });

    return () => {
      socket.off('paired');
      socket.off('offer');
      socket.off('answer');
      socket.off('ice-candidate');
      socket.off('partner-disconnected');
    };
  }, []);

  const handleAssign = () => {
    socket.emit('assignToCall', partnerId); // Emit the event to pair with another user
  };

  const handleOffer = (offer) => {
    peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(offer))
      .then(() => peerConnectionRef.current.createAnswer())
      .then((answer) => peerConnectionRef.current.setLocalDescription(answer))
      .then(() => {
        socket.emit('answer', peerConnectionRef.current.localDescription);
      });
  };

  const handleAnswer = (answer) => {
    peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(answer));
  };

  const handleNewICECandidate = (candidate) => {
    peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(candidate));
  };

  const startCall = () => {
    // Initialize WebRTC peer connection
    peerConnectionRef.current = new RTCPeerConnection({
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' }, // Google STUN server
      ],
    });

    // Add tracks from local stream
    localStreamRef.current.getTracks().forEach((track) => {
      peerConnectionRef.current.addTrack(track, localStreamRef.current);
    });

    // Create an offer
    peerConnectionRef.current.createOffer()
      .then((offer) => {
        return peerConnectionRef.current.setLocalDescription(offer);
      })
      .then(() => {
        socket.emit('offer', peerConnectionRef.current.localDescription);
      })
      .catch((error) => console.error('Error starting the call:', error));

    // Handle remote stream when available
    peerConnectionRef.current.ontrack = (event) => {
      remoteVideoRef.current.srcObject = event.streams[0];
    };
  };

  return (
    <div>
      <h2>Video Call</h2>
      <input
        type="text"
        value={partnerId}
        onChange={(e) => setPartnerId(e.target.value)}
        placeholder="Enter partner ID"
      />
      <button onClick={handleAssign} disabled={paired}>
        Assign to Call
      </button>

      <div>
        <video ref={localVideoRef} autoPlay muted style={{ width: '300px' }} />
        {paired && <video ref={remoteVideoRef} autoPlay style={{ width: '300px' }} />}
      </div>

      {paired && !hasJoined && (
        <button onClick={startCall}>
          Start Call
        </button>
      )}
    </div>
  );
}

export default VideoCall;
