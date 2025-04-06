
import { Brain, BookOpen, ClipboardCheck, Video, Users, Lock } from "lucide-react";

const features = [
  {
    icon: <BookOpen className="w-10 h-10 text-eduBlue" />,
    title: "Intelligent Study Planning",
    description: "AI-powered study plans adapt to your learning style and pace, prioritizing subjects based on importance and upcoming exams."
  },
  {
    icon: <Video className="w-10 h-10 text-eduPurple" />,
    title: "Attention Tracking",
    description: "Advanced webcam analytics ensure focus during study sessions, providing feedback to improve concentration over time."
  },
  {
    icon: <ClipboardCheck className="w-10 h-10 text-eduGreen" />,
    title: "Assignment Management",
    description: "Organize, prioritize, and track assignments across all subjects with automated reminders and progress tracking."
  },
  {
    icon: <Brain className="w-10 h-10 text-eduOrange" />,
    title: "AI Learning Assistant",
    description: "Get personalized explanations, summaries, and learning resources tailored to your specific subjects and learning challenges."
  },
  {
    icon: <Users className="w-10 h-10 text-eduBlue-dark" />,
    title: "Parent-Teacher Connection",
    description: "Real-time progress updates and insights for parents and teachers to provide timely support and guidance."
  },
  {
    icon: <Lock className="w-10 h-10 text-eduPurple-dark" />,
    title: "Safe Learning Environment",
    description: "Secure platform with parental controls and privacy protection designed specifically for educational purposes."
  }
];

const Features = () => {
  return (
    <section id="features" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-eduBlue to-eduPurple text-transparent bg-clip-text">
              Powerful Features
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tools designed to enhance the learning experience and improve educational outcomes
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="feature-card bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 flex-grow">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
