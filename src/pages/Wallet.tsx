import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCoins } from '../context/CoinsContext';

const Wallet: React.FC = () => {
  const navigate = useNavigate();
  const { coins, setCoins } = useCoins();
  const [step, setStep] = useState<'coupon' | 'upi' | 'confirmation'>('coupon');
  const [couponCode, setCouponCode] = useState('');
  const [upiId, setUpiId] = useState('');
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      navigate('/');
    }
  }, [navigate]);

  const validateUPI = (upi: string) => /^[a-zA-Z0-9.\-_]{2,}@[a-zA-Z]{2,}$/.test(upi);

  const handleNext = () => {
    if (couponCode.trim() === 'CHIRAG123') {
      setError('');
      setStep('upi');
    } else {
      setError('Invalid Coupon Code');
    }
  };

  const handleRedeem = async () => {
    if (!validateUPI(upiId.trim())) {
      setError('Enter a valid UPI ID');
      return;
    }

    // Immediately show confirmation UI
    setCoins(0);
    setStep('confirmation');

    const appsScriptUrl = process.env.REACT_APP_APPS_SCRIPT_URL; // Get URL from env variable

    if (!appsScriptUrl) {
      setError('Apps Script URL not configured.');
      return;
    }

    try {
      const response = await fetch(appsScriptUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: 'dummyPassword',
          upiId: upiId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update UPI ID.');
      }

      const result = await response.json();
      console.log(result);
    } catch (err) {
      console.error('Error updating UPI ID:', err);
      setError('An error occurred during redemption.');
    }
  };

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/5 backdrop-blur-md rounded-2xl p-8 space-y-8"
      >
        <div className="text-center space-y-2">
          <h2 className="text-5xl font-bold text-white font-avenir">Your Balance</h2>
          <p className="text-3xl font-bold text-primary font-avenir">{coins}F Coins</p>
          <p className="text-1xl text-gray-400 font-avenir">" 500 F Coins = 250₹ "</p>
        </div>

        {step === 'coupon' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-white font-avenir">Coupon Code</label>
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Enter coupon code"
                className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/10 text-white 
                  placeholder-white/50 font-avenir focus:border-primary focus:ring-2 
                  focus:ring-primary focus:ring-opacity-50 focus:outline-none"
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
            <button
              onClick={handleNext}
              className="w-full bg-primary text-white py-3 rounded-full font-bold 
                hover:bg-button-hover transition-colors duration-200 font-avenir"
            >
              Next
            </button>
          </motion.div>
        )}

        {step === 'upi' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-white font-avenir">UPI ID</label>
              <input
                type="text"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="Enter your UPI ID"
                className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/10 text-white 
                  placeholder-white/50 font-avenir focus:border-primary focus:ring-2 
                  focus:ring-primary focus:ring-opacity-50 focus:outline-none"
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
            <button
              onClick={handleRedeem}
              className="w-full bg-primary text-white py-3 rounded-full font-bold 
                hover:bg-button-hover transition-colors duration-200 font-avenir"
            >
              Redeem
            </button>
          </motion.div>
        )}

        {step === 'confirmation' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-white font-avenir">
            <p>Your Balance <strong>0F Coins</strong></p>
            <p> </p>
            <p>Your redemption request has been submitted.</p>
            <p>It will be processed within 24 hours.</p>
            <button
              onClick={() => navigate('/thank-you')}
              className="mt-4 bg-secondary text-white py-2 px-6 rounded-lg font-semibold 
                hover:bg-secondary-dark transition-all duration-200"
            >
              Close
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Wallet;