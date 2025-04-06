import {
  Assignment,
  Message,
  StudySession,
  Subject,
  User,
} from "../models/types";

export const currentUser: User = {
  id: "u1",
  name: " Arijit Ghosal",
  email: "arijitghosal393@email.com",
  role: "student",
  grade: "10th Grade",
  school: "DAV High School",
  avatar: "/assets/images/avatar.png",
};

export const subjects: Subject[] = [
  {
    id: "s1",
    name: "Mathematics",
    color: "#4361EE",
    tags: ["school", "important", "exam-prep"],
    progress: 68,
    icon: "calculator",
  },
  {
    id: "s2",
    name: "Physics",
    color: "#3A0CA3",
    tags: ["tuition", "advanced", "lab-work"],
    progress: 45,
    icon: "atom",
  },
  {
    id: "s3",
    name: "English Literature",
    color: "#7209B7",
    tags: ["school", "essay", "reading"],
    progress: 72,
    icon: "book-open",
  },
  {
    id: "s4",
    name: "Computer Science",
    color: "#4CC9F0",
    tags: ["project", "coding", "self-study"],
    progress: 89,
    icon: "code",
  },
  {
    id: "s5",
    name: "History",
    color: "#F48C06",
    tags: ["school", "research", "presentation"],
    progress: 34,
    icon: "landmark",
  },
  {
    id: "s6",
    name: "Chemistry",
    color: "#2DC653",
    tags: ["school", "lab-work", "quiz-prep"],
    progress: 52,
    icon: "flask",
  },
];

export const assignments: Assignment[] = [
  {
    id: "a1",
    title: "Linear Equations Problem Set",
    subjectId: "s1",
    dueDate: "2025-04-15",
    status: "pending",
    description: "Complete problems 1-20 in Chapter 5. Show all work.",
  },
  {
    id: "a2",
    title: "Force and Motion Lab Report",
    subjectId: "s2",
    dueDate: "2025-04-10",
    status: "submitted",
    description:
      "Write a lab report on our pendulum experiment including data tables and calculations.",
  },
  {
    id: "a3",
    title: "Shakespeare Essay",
    subjectId: "s3",
    dueDate: "2025-04-20",
    status: "graded",
    grade: "A-",
    description:
      "1500-word analysis of themes in Hamlet, with at least 5 citations.",
  },
  {
    id: "a4",
    title: "Python Programming Assignment",
    subjectId: "s4",
    dueDate: "2025-04-12",
    status: "pending",
    description:
      "Create a command-line application that demonstrates object-oriented programming principles.",
  },
  {
    id: "a5",
    title: "World War II Research Paper",
    subjectId: "s5",
    dueDate: "2025-04-30",
    status: "pending",
    description:
      "Research paper on a specific aspect of WWII with primary and secondary sources.",
  },
];

export const studySessions: StudySession[] = [
  {
    id: "ss1",
    subjectId: "s1",
    startTime: "2025-04-05T14:00:00",
    endTime: "2025-04-05T15:30:00",
    duration: 90,
    attentionScore: 85,
  },
  {
    id: "ss2",
    subjectId: "s2",
    startTime: "2025-04-04T16:00:00",
    endTime: "2025-04-04T17:15:00",
    duration: 75,
    attentionScore: 92,
  },
  {
    id: "ss3",
    subjectId: "s3",
    startTime: "2025-04-03T18:30:00",
    endTime: "2025-04-03T19:45:00",
    duration: 75,
    attentionScore: 78,
  },
  {
    id: "ss4",
    subjectId: "s4",
    startTime: "2025-04-02T20:00:00",
    endTime: "2025-04-02T22:00:00",
    duration: 120,
    attentionScore: 95,
  },
];

export const chatMessages: Message[] = [
  {
    id: "m1",
    sender: "user",
    content: "Hi, can you help me with my math homework?",
    timestamp: "2025-04-05T14:30:00",
  },
  {
    id: "m2",
    sender: "assistant",
    content:
      "Of course, Alex! I see you're working on linear equations. What specific part are you struggling with?",
    timestamp: "2025-04-05T14:30:10",
  },
  {
    id: "m3",
    sender: "user",
    content:
      "I don't understand how to solve for x when there are fractions involved.",
    timestamp: "2025-04-05T14:31:00",
  },
  {
    id: "m4",
    sender: "assistant",
    content:
      "No problem! Let's work through this step-by-step. With fractions, the first step is usually to multiply all terms by the least common multiple (LCM) of the denominators to eliminate the fractions. Would you like me to show you an example?",
    timestamp: "2025-04-05T14:31:30",
  },
  {
    id: "m5",
    sender: "user",
    content: "Yes, please!",
    timestamp: "2025-04-05T14:32:00",
  },
  {
    id: "m6",
    sender: "assistant",
    content:
      "Great! Let's say we have the equation: (x/3) + (2x/5) = 4. The LCM of 3 and 5 is 15. We multiply each term by 15: 15 × (x/3) + 15 × (2x/5) = 15 × 4. This gives us: 5x + 6x = 60, which simplifies to 11x = 60, and finally x = 60/11 or approximately 5.45. Does that make sense?",
    timestamp: "2025-04-05T14:33:00",
  },
];

export const weeklyStudyData = [
  { day: "Mon", hours: 2.5 },
  { day: "Tue", hours: 3.0 },
  { day: "Wed", hours: 1.5 },
  { day: "Thu", hours: 4.0 },
  { day: "Fri", hours: 2.0 },
  { day: "Sat", hours: 3.5 },
  { day: "Sun", hours: 1.0 },
];

export const subjectDistributionData = [
  { subject: "Mathematics", hours: 8, color: "#4361EE" },
  { subject: "Physics", hours: 6, color: "#3A0CA3" },
  { subject: "English", hours: 5, color: "#7209B7" },
  { subject: "Computer Science", hours: 7, color: "#4CC9F0" },
  { subject: "History", hours: 3, color: "#F48C06" },
  { subject: "Chemistry", hours: 4, color: "#2DC653" },
];
