import React from "react";
import { Link } from "react-router-dom";
import { UserButton, useUser, SignInButton, SignUpButton } from "@clerk/clerk-react";

export default function Navbar() {
  const { isSignedIn } = useUser(); // Check if the user is logged in

  return (
    <nav className="w-full max-w-6xl mx-auto flex justify-between items-center py-5 px-6 md:px-8 border-b border-gray-200">
      {/* Logo */}
      <Link to="/" className="text-xl font-bold hover:text-gray-800">
        ChordSense
      </Link>

      {/* Menu */}
      <div className="hidden md:flex space-x-6 text-sm font-medium">
        <Link to="/learn" className="hover:text-gray-700">
          Learn
        </Link>
        <Link to="/upload" className="hover:text-gray-700">
          Upload
        </Link>
        <Link to="/collaborate" className="hover:text-gray-700">
          Ear Rot
        </Link>
        <Link to="/profile" className="hover:text-gray-700">
          Profile
        </Link>
      </div>

      {/* Auth Section */}
      <div>
        {isSignedIn ? (
          // If the user is logged in, show profile & logout
          <UserButton afterSignOutUrl="/" />
        ) : (
          // If the user is NOT logged in, show Sign In / Sign Up buttons
          <div className="flex gap-3">
            <SignInButton mode="modal">
              <button className="border border-gray-400 rounded-md px-4 py-1.5 text-sm hover:bg-gray-100">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="border border-gray-400 rounded-md px-4 py-1.5 text-sm hover:bg-gray-100">
                Sign Up
              </button>
            </SignUpButton>
          </div>
        )}
      </div>
    </nav>
  );
}
