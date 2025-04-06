import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useAuthStore } from "@/store/authStore";
import { fireToast } from "@/utils/toast";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const { needsProfileCompletion, authError, firebaseRegistration } =
    useAuthStore();

  // If Auth Error
  useEffect(() => {
    if (!authError) return;
    fireToast({ message: authError, type: "error" });
  }, [authError]);

  // If Profile needs completion
  useEffect(() => {
    if (needsProfileCompletion === null) return;
    if (needsProfileCompletion == true) {
      setTimeout(() => {
        navigate("/student-details");
      }, 3000);
    }
  }, [needsProfileCompletion]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    if (!name || !email || !password || !confirmPassword) {
      fireToast({ message: "Please fill in all fields", type: "error" });

      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      fireToast({ message: "Passwords do not match", type: "error" });
      setLoading(false);
    }

    // Actual Auth
    const isRegSuccess = await firebaseRegistration(email, password);

    if (isRegSuccess) {
      fireToast({ message: "Sucecessfully Signed Up", type: "success" });
    }

    setLoading(false);

    // window.location.href = "/student-details";
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="container max-w-md mx-auto flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full bg-white rounded-lg shadow-md px-8 py-8 mb-4">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center justify-center">
              <span className="bg-gradient-to-r from-eduBlue to-eduPurple text-transparent bg-clip-text font-bold text-2xl">
                EduGuide
              </span>
              <span className="text-xs px-1.5 py-0.5 rounded bg-eduBlue text-white font-medium ml-1">
                AI
              </span>
            </Link>
            <h1 className="text-2xl font-bold mt-6 mb-2">Create an account</h1>
            <p className="text-gray-600">
              Start your educational journey with EduGuide AI
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full name
              </label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name..."
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address..."
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm password
              </label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-eduBlue to-eduPurple hover:opacity-90"
                disabled={loading}
              >
                {loading ? "Creating account..." : "Create account"}
              </Button>
            </div>

            <p className="text-xs text-center text-gray-500 mt-4">
              By creating an account, you agree to our{" "}
              <Link to="/terms" className="text-eduBlue hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-eduBlue hover:underline">
                Privacy Policy
              </Link>
            </p>
          </form>
        </div>

        <p className="text-center text-gray-600 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-eduBlue hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
