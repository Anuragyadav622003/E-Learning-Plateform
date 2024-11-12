import React from 'react';
import AdminRoute from './routes/AdminRoute';
import FinalDashboard from './assets/Carts/FinalDashboard';
import ImageCarousel from './pages/dashboard/Carosoul';
import './App.css'

function App() {
  return (
    <div>
      <AdminRoute/>
      <FinalDashboard/>
      <ImageCarousel/>
     
    </div>
  )
}

export default App