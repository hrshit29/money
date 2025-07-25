import React, { useState, useMemo } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Transaction from './components/Transaction';
import Orb from './components/Orb';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import Income from './pages/Income';
import Expenses from './pages/Expenses';
import { useGlobalContext } from './context/GlobalContext';
import { useAuth } from './hooks/useAuth';
import Login from './components/login';
import Signup from './components/signup';
import { useTheme } from './context/ThemeContext';

const App: React.FC = () => {
  const [active, setActive] = useState<number>(1);
  const { user } = useAuth();
  const { theme } = useTheme();
  useGlobalContext(); 

  const orbMemo = useMemo(() => <Orb />, []);

  const renderPage = () => {
    switch (active) {
      case 1: return <Dashboard />;
      case 2: return <Transaction />;
      case 3: return <Income />;
      case 4: return <Expenses />;
      default: return <Dashboard />;
    }
  };

  return (
    <div
      className={`min-h-screen w-full relative overflow-x-hidden ${
        theme === 'light' ? 'bg-white/80' : 'bg-gray-900'
      }`}
    >
      <Routes>
        {user ? (
          <>
            <Route
              path="/"
              element={
                <>
                  {orbMemo}
                  <div className="flex min-h-screen">
                    <Navigation active={active} setActive={setActive} />
                    <main className="flex-1 border-2 backdrop-blur-md rounded-3xl overflow-x-hidden shadow-lg bg-white/80 border-white dark:bg-gray-800/80 dark:border-gray-700">
                      {renderPage()}
                    </main>
                  </div>
                </>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        )}
      </Routes>
    </div>
  );
};

export default App;

