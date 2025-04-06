
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'parent' | 'teacher';
  grade?: string;
  school?: string;
  avatar?: string;
}

export interface Subject {
  id: string;
  name: string;
  color: string;
  tags: string[];
  progress: number;
  icon: string;
}

export interface Assignment {
  id: string;
  title: string;
  subjectId: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded';
  grade?: string;
  description: string;
  attachments?: string[];
}

export interface StudySession {
  id: string;
  subjectId: string;
  startTime: string;
  endTime: string;
  duration: number;
  attentionScore: number;
}

export interface Message {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
}
