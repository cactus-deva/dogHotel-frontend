
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Footer from './components/Footer';
import Register from './pages/user/Register';
import Login from './pages/user/Login';
import Profile from './pages/user/Profile';
import Booking from './pages/user/Booking';
import Service from './pages/Service'
import Contact from './pages/Contact';
import Dog from './pages/user/Dog';
import { LoadingProvider } from "./context/LoadingContext.tsx";
import Review from './pages/user/Review.tsx';

function App() {

  return (
    <Router>
      <Header />
      <LoadingProvider>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login/>} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/booking' element={<Booking />} />
        <Route path='/service' element={<Service/>} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/dog' element={<Dog />}  />
        <Route path='/review' element={<Review />} />
      </Routes>
      </LoadingProvider>
      <Footer />
    </Router>
  );
}

export default App;
