
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <span className="bg-gradient-to-r from-eduBlue to-eduPurple text-transparent bg-clip-text font-bold text-2xl">
              EduGuide
            </span>
            <span className="text-xs px-1.5 py-0.5 rounded bg-eduBlue text-white font-medium">AI</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/features" className="text-gray-600 hover:text-eduBlue transition-colors">
            Features
          </Link>
          <Link to="/about" className="text-gray-600 hover:text-eduBlue transition-colors">
            About
          </Link>
          <Link to="/contact" className="text-gray-600 hover:text-eduBlue transition-colors">
            Contact
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Button variant="outline" asChild>
            <Link to="/login">Log in</Link>
          </Button>
          <Button className="bg-gradient-to-r from-eduBlue to-eduPurple hover:opacity-90" asChild>
            <Link to="/register">Register</Link>
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={toggleMobileMenu}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden py-4 px-4 space-y-4 bg-white border-b border-gray-200 animate-fade-in">
          <Link to="/features" className="block py-2 text-gray-600 hover:text-eduBlue">
            Features
          </Link>
          <Link to="/about" className="block py-2 text-gray-600 hover:text-eduBlue">
            About
          </Link>
          <Link to="/contact" className="block py-2 text-gray-600 hover:text-eduBlue">
            Contact
          </Link>
          <div className="pt-2 flex flex-col space-y-3">
            <Button variant="outline" asChild className="w-full">
              <Link to="/login">Log in</Link>
            </Button>
            <Button className="w-full bg-gradient-to-r from-eduBlue to-eduPurple hover:opacity-90" asChild>
              <Link to="/register">Register</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
