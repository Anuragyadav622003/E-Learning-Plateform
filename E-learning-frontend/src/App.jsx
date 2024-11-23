import React from 'react';
import Navbar from './route/Navbar';
import { BrowserRouter } from 'react-router-dom';
import ComponentsRouter from './route/ClientRoutes';


function App() {
  return (<>
    <div>
     <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
          <ComponentsRouter />
      </div>
     </BrowserRouter>
   
    </div>
    </>
  );
}

export default App;
