// frontend/src/pages/AdminView.jsx
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast'; // Import toast for notifications

function AdminView() {
  // Check localStorage for authentication status on initial load
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAdminAuthenticated') === 'true'
  );
  const [username, setUsername] = useState(''); // State for username input
  const [password, setPassword] = useState(''); // State for password input
  const [authError, setAuthError] = useState(''); // State for authentication errors (from backend)

  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true); // Initial loading state for applicants fetch
  const [fetchError, setFetchError] = useState(null); // Separate error for fetching applicants

  // Function to handle login submission to backend
  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError(''); // Clear previous auth errors
    toast.dismiss(); // Dismiss any existing toasts

    try {
      const response = await fetch('http://localhost:5000/api/auth/admin/login', { // NEW AUTH ENDPOINT
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsAuthenticated(true);
        localStorage.setItem('isAdminAuthenticated', 'true'); // Store authentication status
        toast.success(data.message);
      } else {
        setAuthError(data.message || 'Login failed. Please try again.');
        toast.error(data.message || 'Login failed.');
      }
    } catch (error) {
      console.error('Login request error:', error);
      setAuthError('Network error. Could not connect to the server.');
      toast.error('Network error during login.');
    } finally {
      setUsername(''); // Clear inputs
      setPassword('');
    }
  };

  // Effect to fetch applicants ONLY when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const fetchApplicants = async () => {
        setLoading(true); // Set loading for applicant data
        setFetchError(null); // Clear previous fetch errors
        try {
          const response = await fetch('http://localhost:5000/api/routes/applicants'); // Existing applicant endpoint
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setApplicants(data);
        } catch (err) {
          setFetchError('Failed to fetch applicants. Please ensure the backend is running and accessible.');
          console.error('Error fetching applicants:', err);
          toast.error('Failed to load applicant data.');
        } finally {
          setLoading(false);
        }
      };
      fetchApplicants();
    } else {
      setLoading(false); // If not authenticated, not loading applicant data
      setApplicants([]); // Clear applicants if somehow logged out
    }
  }, [isAuthenticated]); // Rerun this effect when isAuthenticated changes

  // Logout function
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAdminAuthenticated'); // Remove authentication status
    setApplicants([]); // Clear applicant data on logout
    toast('Logged out from Admin view.', { icon: '👋' });
  };

  // --- Conditional Rendering based on Authentication ---

  // Render login form if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-xl my-10 border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Admin Login</h2>
        <p className="text-center text-gray-600 mb-6">Enter credentials to view applicants.</p>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 ${authError ? 'border-red-500' : ''}`}
              required
              autoComplete="username"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 ${authError ? 'border-red-500' : ''}`}
              required
              autoComplete="current-password"
            />
            {authError && <p className="text-red-500 text-xs italic mt-2">{authError}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  // Render applicant data if authenticated
  if (loading) {
    return (
      <div className="text-center py-10">
        <p className="text-xl text-gray-700">Loading applicants...</p>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mt-4"></div>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="text-center py-10 text-red-600 text-xl">
        {fetchError}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow-lg my-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Registered Applicants</h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
        >
          Logout
        </button>
      </div>

      {applicants.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">No applicants registered yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Full Name</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Email</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Phone</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Interest</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Resume</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Why this job?</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Reg. Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {applicants.map((applicant) => (
                <tr key={applicant._id} className="hover:bg-gray-50">
                  <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-900">{applicant.fullName}</td>
                  <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-900">{applicant.email}</td>
                  <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-900">{applicant.phone}</td>
                  <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-900">{applicant.interest}</td>
                  <td className="py-4 px-6 whitespace-nowrap text-sm text-blue-600 hover:underline">
                    <a href={applicant.resume} target="_blank" rel="noopener noreferrer">View Resume</a>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-900 max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">
                     {applicant.whythisjob || '-'}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">
                    {new Date(applicant.registrationDate).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminView;