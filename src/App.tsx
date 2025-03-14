import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Congratulations from './pages/Congratulations';
import Welcome from './pages/Welcome';
import Wallet from './pages/Wallet';
import ThankYou from './pages/Thankyou'; // ✅ Import Thank You Page
import StarsBackground from './components/StarsBackground';
import { CoinsProvider } from './context/CoinsContext';

function App() {
  return (
    <BrowserRouter>
      <CoinsProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/congratulations" element={<Congratulations />} />
          <Route path="/welcome" element={
            <div className="min-h-screen bg-background overflow-hidden">
              <StarsBackground />
              <Header showPreRegister={false} />
              <Welcome />
              <Footer />
            </div>
          } />
          <Route path="/wallet" element={
            <div className="min-h-screen bg-background overflow-hidden">
              <StarsBackground />
              <Header showPreRegister={false} />
              <Wallet />
              <Footer />
            </div>
          } />
          <Route path="/thank-you" element={  /* ✅ Added Thank You Page */
            <div className="min-h-screen bg-background overflow-hidden">
              <StarsBackground />
              <Header showPreRegister={false} />
              <ThankYou />
              <Footer />
            </div>
          } />
          <Route path="/" element={
            <div className="min-h-screen bg-background overflow-hidden">
              <StarsBackground />
              <Header showPreRegister={true} />
              <Home />
              <Footer />
            </div>
          } />
        </Routes>
      </CoinsProvider>
    </BrowserRouter>
  );
}

export default App;
