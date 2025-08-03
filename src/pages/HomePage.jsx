// frontend/src/pages/HomePage.jsx
import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="bg-gray-100 min-h-[calc(100vh-80px)]">
      {" "}
      {/* Adjusted min-height to account for navbar */}
      {/* Hero Section with Background Image */}
      <section className="relative text-white py-20 px-4 md:px-8 overflow-hidden shadow-xl  ">
        {/* Background Image Layer */}
        <div
          className="absolute inset-0 bg-cover bg-center" // Ensure image covers and is centered
          style={{ backgroundImage: "url('/hero.jpg')" }}
        >
          {/* Optional: Overlay for better text readability */}
          <div className="absolute inset-0 bg-black opacity-50"></div>{" "}
          {/* Adjust opacity as needed (e.g., 30, 40, 60) */}
        </div>

        {/* Content Layer (text and buttons) */}
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between relative z-10">
          <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 animate-fadeInUp drop-shadow-lg">
              Empowering Futures, One Step at a Time
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed animate-fadeInUp delay-200">
              Join Basti Ki Pathshala in our mission to uplift communities
              through education and support.
            </p>
            <div className="flex justify-center md:justify-start space-x-4 animate-fadeInUp delay-400">
              <Link
                to="/register"
                className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-yellow-400 font-bold rounded-full shadow-xl hover:bg-white/20 transition duration-300 transform hover:scale-105 text-lg"
              >
                Become an Intern/Volunteer
              </Link>

              <a
                href="https://bastikipathshala.org/donate/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-green-400 font-bold rounded-full shadow-xl hover:bg-white/20 transition duration-300 transform hover:scale-105 text-lg"
              >
                Support Our Cause
              </a>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center md:justify-end">
           
          </div>
        </div>
      </section>
      {/* About Section */}
      <section className="py-16 px-4 md:px-8 bg-white shadow-inner">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-8">
            Our Mission
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto mb-10">
            Basti Ki Pathshala is dedicated to providing quality education and
            essential resources to underserved children and communities. We
            believe in fostering an environment where every individual has the
            opportunity to learn, grow, and achieve their full potential,
            breaking cycles of poverty through knowledge and empowerment.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mt-12">
            <div className="p-6 bg-blue-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-2xl font-bold text-blue-700 mb-4">
                Quality Education
              </h3>
              <p className="text-gray-600">
                Providing access to comprehensive learning programs, skilled
                educators, and modern educational tools.
              </p>
            </div>
            <div className="p-6 bg-green-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-2xl font-bold text-green-700 mb-4">
                Community Support
              </h3>
              <p className="text-gray-600">
                Building stronger communities through health initiatives,
                vocational training, and social welfare programs.
              </p>
            </div>
            <div className="p-6 bg-purple-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-2xl font-bold text-purple-700 mb-4">
                Sustainable Impact
              </h3>
              <p className="text-gray-600">
                Creating lasting change by empowering individuals to become
                self-reliant and contribute to society.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Optional: Call to Action at the bottom */}
      <section className="py-16 px-4 md:px-8 bg-blue-900/10 text-center">
        <div className="container mx-auto">
          <h2 className="text-4xl font-extrabold text-blue-900 mb-6">
            Make a Difference Today!
          </h2>
          <p className="text-xl text-blue-800 mb-10">
            Your involvement, whether as an intern, volunteer, or donor,
            directly impacts lives.
          </p>
          <div className="flex justify-center space-x-6">
            <Link
              to="/register"
              className="px-8 py-4 bg-blue-600 text-white font-bold rounded-full shadow-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105 text-lg"
            >
              Join Us
            </Link>
            <a
              href="https://bastikipathshala.org/donate/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4  bg-green-800 text-white font-bold rounded-full shadow-lg hover:bg-green-700 hover:text-white transition duration-300 transform hover:scale-105 text-lg"
            >
              Donate Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
