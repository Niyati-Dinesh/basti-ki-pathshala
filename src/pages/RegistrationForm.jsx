// frontend/src/pages/RegistrationForm.jsx
import React, { useState } from 'react';
import toast from 'react-hot-toast'; // Import toast for notifications

function RegistrationForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    interest: '',
    resume: '', // This will hold the URL/path
    whythisjob: ''
  });
  const [errors, setErrors] = useState({}); // State to hold validation errors from backend
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator during submission

  // Handles input changes and clears associated error messages
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error for the specific field when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior (page reload)
    setErrors({});      // Clear previous validation errors
    setIsLoading(true); // Set loading state to true

    try {
      // Send form data to your backend API
      const response = await fetch('http://localhost:5000/api/routes/register', { // IMPORTANT: Use your backend's correct port (7777) and route prefix (/api/routes)
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Specify that we are sending JSON data
        },
        body: JSON.stringify(formData), // Convert form data to JSON string
      });

      const data = await response.json(); // Parse the JSON response from the backend

      if (response.ok) {
        // If the response status is 200-299 (success)
        toast.success(data.message || 'Registration successful!'); // Show success toast notification
        // Clear the form fields after successful submission
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          interest: '',
          resume: '',
          whythisjob: ''
        });
      } else {
        // If the response status is not OK (e.g., 400 Bad Request, 500 Internal Server Error)
        if (data.errors && Array.isArray(data.errors)) {
          // If backend sent specific validation errors (from express-validator)
          const newErrors = {};
          data.errors.forEach(err => {
            newErrors[err.path] = err.msg; // Map errors to their respective fields
          });
          setErrors(newErrors); // Update state to display field-specific errors
          toast.error('Please correct the errors in the form.'); // Show a general error toast
        } else {
          // Handle other types of backend errors (e.g., duplicate email error, server-side issues)
          toast.error(data.message || 'Registration failed. Please try again.'); // Show backend's error message
        }
      }
    } catch (error) {
      // Catch network errors or issues with the fetch request itself
      console.error('Error during registration:', error);
      toast.error('Network error or server is unreachable. Please check your internet connection or try again later.');
    } finally {
      setIsLoading(false); // Always reset loading state after request is complete
    }
  };

  // Helper function to render field-specific error messages
  const renderFieldError = (fieldName) => {
    return errors[fieldName] && (
      <p className="text-red-600 text-sm mt-1 font-medium italic">{errors[fieldName]}</p>
    );
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 md:p-10 rounded-xl shadow-2xl my-8 border border-gray-200">
      <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-8 text-center">
        Join Our Team
      </h2>
      <p className="text-center text-gray-600 mb-8 text-lg">
        Register to become an Intern or Volunteer at Basti Ki Pathshala.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
        {/* Full Name Input */}
        <div>
          <label htmlFor="fullName" className="block text-gray-700 text-base font-semibold mb-2">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="John Doe"
            required
          />
          {renderFieldError('fullName')}
        </div>

        {/* Email Input */}
        <div>
          <label htmlFor="email" className="block text-gray-700 text-base font-semibold mb-2">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="john.doe@example.com"
            required
          />
          {renderFieldError('email')}
        </div>

        {/* Phone Number Input */}
        <div>
          <label htmlFor="phone" className="block text-gray-700 text-base font-semibold mb-2">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="+91 98765 43210"
            required
          />
          {renderFieldError('phone')}
        </div>

        {/* Interested In Select */}
        <div>
          <label htmlFor="interest" className="block text-gray-700 text-base font-semibold mb-2">Interested In</label>
          <select
            id="interest"
            name="interest"
            value={formData.interest}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 bg-white appearance-none pr-8 ${errors.interest ? 'border-red-500' : 'border-gray-300'}`}
            required
          >
            <option value="">Select an option</option>
            <option value="Intern">Intern</option>
            <option value="Volunteer">Volunteer</option>
          </select>
          {renderFieldError('interest')}
        </div>

        {/* Resume URL Input */}
        <div>
          <label htmlFor="resume" className="block text-gray-700 text-base font-semibold mb-2">Resume URL</label>
          <input
            type="url"
            id="resume"
            name="resume"
            value={formData.resume}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ${errors.resume ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="e.g., https://yourdrive.com/your-resume.pdf"
            required
          />
          {renderFieldError('resume')}
          <p className="text-gray-500 text-sm mt-2">
            * Please provide a public link to your resume (e.g., Google Drive, Dropbox, or a personal website).
          </p>
        </div>

        {/* Why this job? Textarea (Optional) */}
        <div>
          <label htmlFor="whythisjob" className="block text-gray-700 text-base font-semibold mb-2">Why are you interested in this position? <span className="text-gray-500 text-sm">(Optional)</span></label>
          <textarea
            id="whythisjob"
            name="whythisjob"
            value={formData.whythisjob}
            onChange={handleChange}
            rows="4"
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ${errors.whythisjob ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Tell us about your motivation, skills, and how you can contribute..."
          ></textarea>
          {renderFieldError('whythisjob')}
        </div>

        {/* Submit Button */}
        <div className="flex justify-center pt-4">
          <button
            type="submit"
            className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            disabled={isLoading} // Disable button when submitting
          >
            {isLoading ? (
              <>
                {/* Loading Spinner SVG */}
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </>
            ) : (
              'Submit Application'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegistrationForm;