
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BookOpen, Brain, ClipboardCheck, Video } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative pt-28 pb-20 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-blue-50 to-white -z-10"></div>
      
      {/* Animated dots/circles background */}
      <div className="absolute top-0 right-0 w-1/3 h-1/2 opacity-20 -z-10">
        <div className="absolute top-20 right-20 w-40 h-40 rounded-full bg-eduBlue-light animate-pulse-slow" style={{ animationDelay: "0s" }}></div>
        <div className="absolute top-60 right-40 w-24 h-24 rounded-full bg-eduPurple animate-pulse-slow" style={{ animationDelay: "0.5s" }}></div>
        <div className="absolute top-32 right-80 w-16 h-16 rounded-full bg-eduOrange-light animate-pulse-slow" style={{ animationDelay: "1s" }}></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left mb-10 lg:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
              <span className="block">Empowering Education with</span>
              <span className="bg-gradient-to-r from-eduBlue to-eduPurple text-transparent bg-clip-text">
                AI-Guided Learning
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0">
              Personalized study plans, attention tracking, and AI assistance to help students reach their full potential.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="bg-gradient-to-r from-eduBlue to-eduPurple hover:opacity-90" asChild>
                <Link to="/register">Register Now</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/demo">Watch Demo</Link>
              </Button>
            </div>

            <div className="pt-6">
              <p className="text-sm text-gray-500 mb-2">Be the first to know when we launch</p>
              <div className="flex max-w-md mx-auto lg:mx-0">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-eduBlue"
                />
                <Button className="rounded-l-none bg-eduBlue hover:bg-eduBlue-dark">
                  Join Waitlist
                </Button>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 relative">
            <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100 transform hover-scale">
              <div className="aspect-video overflow-hidden relative">
                <img 
                  src="/placeholder.svg" 
                  alt="EduGuide AI Platform"
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-eduBlue/90 rounded-full flex items-center justify-center cursor-pointer hover:bg-eduBlue transition-colors">
                    <Video className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
