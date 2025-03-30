import React from 'react';
import Navbar from './route/Navbar';
import { BrowserRouter } from 'react-router-dom';
import ComponentsRouter from './route/ClientRoutes';
import { ToastContainer, toast } from "react-toastify";
import { AuthProvider } from './context/context';


function App() {
  return (<>
  <AuthProvider>
    <div>
     <BrowserRouter>
      <div className="min-h-screen flex flex-col w-screen">
          <Navbar />
          <ComponentsRouter />
      </div>
     </BrowserRouter>
   
    </div>
    <ToastContainer/>
    </AuthProvider>
    </>
  );
}

export default App;
