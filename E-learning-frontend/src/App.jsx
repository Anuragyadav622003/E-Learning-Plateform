import React from 'react';
import Navbar from './route/Navbar';
import { BrowserRouter } from 'react-router-dom';
import ComponentsRouter from './route/ClientRoutes';
import { ToastContainer, toast } from "react-toastify";

function App() {
  return (<>
    <div>
     <BrowserRouter>
      <div className="min-h-screen flex flex-col w-screen">
          <Navbar />
          <ComponentsRouter />
      </div>
     </BrowserRouter>
   
    </div>
    <ToastContainer/>
    </>
  );
}

export default App;
