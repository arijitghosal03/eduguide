
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-eduBlue-dark to-eduPurple text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Transform Your Learning Experience?
        </h2>
        <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
          Join thousands of students, parents, and teachers who are already using EduGuide AI to achieve better educational outcomes.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-white text-eduBlue-dark hover:bg-gray-100"
            asChild
          >
            <Link to="/register">Get Started Today</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white/10"
            asChild
          >
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
