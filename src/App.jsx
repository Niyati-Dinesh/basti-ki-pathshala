// frontend/src/App.jsx
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; // Import Toaster
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import RegistrationForm from './pages/RegistrationForm';
import AdminView from './pages/AdminView';

function App() {
  return (
    <>
      <div className="min-h-screen bg-gray-100 font-sans">
        <Navbar />

        {/* This is where your toasts will appear */}
        {/* You can customize position, duration, etc. here or in individual toast calls */}
        <Toaster
          position="top-center" // Adjust position as desired (top-left, top-right, bottom-center, etc.)
          reverseOrder={false}
          toastOptions={{
            // Default options for all toasts
            duration: 3000, // How long toasts are visible
            style: {
              background: '#fff',
              color: '#333',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#10B981', // green-500
                secondary: '#fff',
              },
            },
            error: {
              duration: 5000, // Longer duration for errors
              iconTheme: {
                primary: '#EF4444', // red-500
                secondary: '#fff',
              },
            },
          }}
        />

        {/* Page Content */}
        <main className="container mx-auto p-6">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/admin" element={<AdminView />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;