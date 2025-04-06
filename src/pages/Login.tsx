
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    
    // Simulate login API call
    setTimeout(() => {
      setLoading(false);
      // For demo purposes, redirect to home
      window.location.href = "/home";
    }, 1000);
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
            <h1 className="text-2xl font-bold mt-6 mb-2">Welcome back</h1>
            <p className="text-gray-600">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Link to="/forgot-password" className="text-sm text-eduBlue hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                {loading ? "Signing in..." : "Sign in"}
              </Button>
            </div>
          </form>
        </div>

        <p className="text-center text-gray-600 text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-eduBlue hover:underline">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
