# EduGuide - AI-Powered Study Management Platform

EduGuide is an innovative AI-powered web application designed to bridge the gap between students, parents, and teachers by providing a comprehensive study management platform with intelligent monitoring and assistance features.



## 🚀 Features

### For Students
- **Personalized Dashboard**: Easy access to subjects, assignments, and study resources
- **Study Session Management**: Create and follow customized study schedules
- **Subject Organization**: Categories with tags (tuition, school, urgent, easy, etc.)
- **Learning Resources**: Access to YouTube videos, PDF materials, and online meetings
- **AI-Generated Summaries**: Quick revision materials automatically generated
- **Assignments & Assessments**: Track performance with timed assignments
- **AI Chat Assistant**: Get help with subjects and navigate the app with ease

### For Parents & Teachers
- **Progress Tracking**: Monitor student's learning progress and achievements
- **Assignment Creation**: Create custom assignments or use AI-generated ones
- **Study Monitoring**: View detailed reports on study time and performance
- **AI Insights**: Receive AI-generated insights about student's strengths and areas for improvement
- **Presence Monitoring**: Track student's attention and engagement during study sessions

### Advanced Features
- **Face Detection**: Uses webcam to ensure student presence during study sessions
- **Screen Monitoring**: Tracks student's screen activity during designated study time
- **Personalized AI Assistant**: AI chatbot fine-tuned to each student's learning data

## 📱 Application Architecture

### Tech Stack
- **Frontend**: Vite + React
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Backend & Authentication**: Firebase
- **Face Detection**: Face-api.js
- **AI Assistant**: Custom implementation

### Application Flow
1. Student registers with personal details (age, class, subjects, school, exams)
2. Profile setup and customization
3. Dashboard access with subject categorization
4. For each subject:
   - **Learn**: Access video content, PDFs, and live meetings
   - **Revise**: View AI-generated chapter summaries
   - **Assignment**: Complete timed tasks and track performance

### UI Structure
- **Landing Page**: Navbar, features showcase, registration CTA, waitlist form
- **Student Homepage**: Quick access dashboard with profile button
- **Subject Pages**: Learn, Revise, and Assignment sections
- **Profile Page**: Personal details, progress statistics, settings
- **AI Assistant Interface**: Chat interface accessible throughout the app

## 🔮 Future Developments
- **Peer Collaboration**: Chat with classmates for collaborative learning
- **Project Assistance**: AI-guided research with relevant articles and resources

## 🛠️ Installation & Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/eduguide.git

# Navigate to project directory
cd eduguide

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your Firebase configuration

# Run the development server
npm run dev
```

## 📦 Dependencies

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.18.0",
    "zustand": "^4.4.6",
    "firebase": "^10.5.2",
    "face-api.js": "^0.22.2",
    "tailwindcss": "^3.3.5",
    "react-icons": "^4.11.0",
    "chart.js": "^4.4.0",
    "react-chartjs-2": "^5.2.0",
    "react-webcam": "^7.2.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.1.1",
    "vite": "^4.5.0",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.31"
  }
}
```

## 🔐 Firebase Configuration

The application uses Firebase for authentication, database, and storage. Configure your Firebase project and update the environment variables accordingly.

```javascript
// src/config/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
```

## 🔄 Project Structure

```
eduguide/
├── public/
│   ├── favicon.ico
│   └── assets/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── subjects/
│   │   ├── monitoring/
│   │   └── ai-assistant/
│   ├── pages/
│   │   ├── Landing.jsx
│   │   ├── Auth.jsx
│   │   ├── StudentHome.jsx
│   │   ├── SubjectView.jsx
│   │   ├── Profile.jsx
│   │   └── ParentDashboard.jsx
│   ├── store/
│   │   ├── authStore.js
│   │   ├── subjectStore.js
│   │   └── progressStore.js
│   ├── utils/
│   │   ├── faceDetection.js
│   │   ├── screenMonitoring.js
│   │   └── aiHelpers.js
│   ├── services/
│   │   ├── firebase/
│   │   └── ai/
│   ├── App.jsx
│   └── main.jsx
├── .env.example
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 📊 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Contact

For any inquiries or support, please reach out to [your-email@example.com](mailto:your-email@example.com)
