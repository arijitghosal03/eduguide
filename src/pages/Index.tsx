
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";
import WaitlistForm from "@/components/landing/WaitlistForm";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <Features />
      
      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-eduBlue to-eduPurple text-transparent bg-clip-text">
                Join Our Waitlist
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Be among the first to experience the future of personalized education
            </p>
          </div>
          
          <div className="max-w-md mx-auto">
            <WaitlistForm />
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-2">Want to see it in action?</p>
            <Link 
              to="/demo" 
              className="inline-flex items-center text-eduBlue hover:text-eduBlue-dark font-medium"
            >
              View our interactive demo <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
      
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
