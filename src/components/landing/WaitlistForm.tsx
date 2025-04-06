
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Check } from "lucide-react";

const WaitlistForm = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      toast({
        title: "Success!",
        description: "You've been added to our waitlist.",
      });
    }, 1000);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
      {submitted ? (
        <div className="text-center py-6">
          <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <Check className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-xl font-bold mb-2">You're on the list!</h3>
          <p className="text-gray-600">
            Thank you for your interest in EduGuide AI. We'll notify you when we launch.
          </p>
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-6 text-center">
            Join Our Waitlist
          </h2>
          <p className="text-gray-600 mb-6 text-center">
            Be the first to know when we launch. Early access members receive special features.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-eduBlue"
                placeholder="you@example.com"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-eduBlue to-eduPurple"
              disabled={loading}
            >
              {loading ? "Processing..." : "Join Waitlist"}
            </Button>
          </form>
        </>
      )}
    </div>
  );
};

export default WaitlistForm;
