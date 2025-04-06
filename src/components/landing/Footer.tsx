
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <span className="bg-gradient-to-r from-eduBlue to-eduPurple text-transparent bg-clip-text font-bold text-2xl">
                EduGuide
              </span>
              <span className="text-xs px-1.5 py-0.5 rounded bg-eduBlue text-white font-medium ml-2">
                AI
              </span>
            </div>
            <p className="text-gray-600 mb-4">
              Empowering students with AI-guided learning experiences tailored to their individual needs.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/features" className="text-gray-600 hover:text-eduBlue transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-600 hover:text-eduBlue transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/demo" className="text-gray-600 hover:text-eduBlue transition-colors">
                  Demo
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-eduBlue transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/team" className="text-gray-600 hover:text-eduBlue transition-colors">
                  Team
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-eduBlue transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-eduBlue transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-eduBlue transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} EduGuide AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
