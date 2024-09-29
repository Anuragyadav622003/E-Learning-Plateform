import React from 'react';
import Navbar from './Navbar';
import { BrowserRouter } from 'react-router-dom';
import ComponentsRouter from './Client/ClientRoutes';



function App() {
  return (<>
    <div>
     <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center container mx-auto p-4">
          <ComponentsRouter />
        </main>
      
      </div>
    
    
     </BrowserRouter>
   
    </div>
    </>
  );
}

export default App;
