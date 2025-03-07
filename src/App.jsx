import { useState } from 'react'
import './App.css'
import './index.css'
import AddRoom from './components/room/AddRoom'
import EditRoom from './components/room/EditRoom'
import ExistingRooms from './components/room/ExistingRooms'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/home/Home'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import RoomListing from './components/room/RoomListing'
import Admin from './components/admin/Admin'
import Checkout from './components/bookings/Checkout'
import BookingSuccess from './components/bookings/BookingSuccess'
import Bookings from './components/bookings/Bookings'
import FindMyBooking from './components/bookings/FindMyBooking'
import Login from './components/auth/Login'
import Registration from './components/auth/Registration'
import Profile from './components/auth/Profile'
import { AuthProvider } from './components/auth/AuthProvider'
import RequireAuth from './components/auth/RequireAuth'


function App() {

  return (
    <AuthProvider>
      <main>
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/edit-room/:roomId' element={<EditRoom />} />
            <Route path='/existing-rooms' element={<ExistingRooms />} />
            <Route path='/add-room' element={<AddRoom />} />

            <Route path='/book-room/:roomId' element={
              <RequireAuth>
                <Checkout />
              </RequireAuth>
            } />

            <Route path='/browse-all-rooms' element={<RoomListing />} />
            <Route path='/admin' element={<Admin />} />
            <Route path='/booking-success' element={<BookingSuccess />} />
            <Route path='/existing-bookings' element={<Bookings />} />
            <Route path='/find-booking' element={<FindMyBooking />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Registration />} />
            <Route path='/profile/:userId' element={<Profile />} />
            <Route path='/logout' element={<FindMyBooking />} />
          </Routes>
        </Router>
        <Footer />
      </main>
    </AuthProvider>
  )
}

export default App
