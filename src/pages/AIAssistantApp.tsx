import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, User, Bot, Paperclip, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import Sidebar from '@/components/dashboard/Sidebar';

function AIAssistantApp() {
  const [messages, setMessages] = useState<
    { id: number; content: string; sender: string; timestamp: string; files?: File[] }[]
  >([
    { 
      id: 1, 
      content: "Hello! I'm your assistant. How can I help you today?", 
      sender: "ai", 
      timestamp: new Date().toISOString(),
      files: []
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [files, setFiles] = useState([]);
  const messagesEndRef = useRef(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Sample API call function
  const callChatAPI = async (userMessage, attachedFiles) => {
    setIsLoading(true);
    
    // In a real implementation, you would send a request to your AI API
    // Here we simulate an API call with a timeout
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Sample response based on user input
      let aiResponse = "I understand you're asking about ";
      
      if (userMessage.toLowerCase().includes("hello") || userMessage.toLowerCase().includes("hi")) {
        aiResponse = "Hello there! How can I assist you today?";
      } else if (userMessage.toLowerCase().includes("help")) {
        aiResponse = "I'm here to help! You can ask me questions, request information, or get assistance with various tasks.";
      } else if (userMessage.toLowerCase().includes("weather")) {
        aiResponse = "I don't have access to real-time weather data, but I can help you understand weather patterns or direct you to reliable weather services.";
      } else if (userMessage.toLowerCase().includes("time")) {
        aiResponse = `The current time is ${new Date().toLocaleTimeString()}.`;
      } else {
        aiResponse = `Thanks for your message. I'll do my best to help with: "${userMessage}"`;
      }
      
      // Handle files if any
      if (attachedFiles.length > 0) {
        aiResponse += ` I see you've attached ${attachedFiles.length} file(s). In a real implementation, I would process these files and respond accordingly.`;
      }
      
      return aiResponse;
    } catch (error) {
      console.error("Error calling API:", error);
      return "I'm sorry, I encountered an error processing your request. Please try again.";
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() && files.length === 0) return;

    // Add user message to chat
    const userMessage = {
      id: messages.length + 1,
      content: input.trim(),
      sender: "user",
      timestamp: new Date().toISOString(),
      files: [...files]
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setFiles([]);
    
    // Get AI response
    const response = await callChatAPI(input, files);
    
    // Add AI response to chat
    const aiMessage = {
      id: messages.length + 2,
      content: response,
      sender: "ai",
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, aiMessage]);
  };

  const handleFileUpload = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (fileToRemove) => {
    setFiles(files.filter(file => file !== fileToRemove));
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}

      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-blue-600">Assistant</h1>
          <p className="text-sm text-gray-500">Your Study companion</p>
        </div>
        
        <div className="flex-1 overflow-auto p-4">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Recent Conversations</h2>
          <div className="space-y-1">
            <button className="w-full text-left px-3 py-2 rounded-md bg-blue-50 text-blue-700 font-medium text-sm">
              Current Chat
            </button>
           
          </div>
          
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-6 mb-2">Tools</h2>
          <div className="space-y-1">
            <Sidebar />
          </div>
        </div>
        
        
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
              <Bot size={20} />
            </div>
            <div>
              <h2 className="font-medium">AI Assistant</h2>
              <p className="text-xs text-gray-500">Gemini-API powered assistant</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
           
          </div>
        </header>
        
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-blue-50 to-white">
          <div className="max-w-4xl mx-auto space-y-4">
            {messages.map(message => (
              <div 
                key={message.id} 
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] rounded-lg p-4 ${
                    message.sender === 'user' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white border border-gray-200 text-gray-800'
                  }`}
                >
                  <div className="flex items-center mb-1">
                    <div 
                      className={`h-6 w-6 rounded-full flex items-center justify-center mr-2 ${
                        message.sender === 'user' 
                          ? 'bg-blue-500' 
                          : 'bg-blue-100 text-blue-600'
                      }`}
                    >
                      {message.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
                    </div>
                    <span className="text-sm font-medium">
                      {message.sender === 'user' ? 'You' : 'AI Assistant'}
                    </span>
                    <span className="text-xs opacity-70 ml-2">
                      {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className={`whitespace-pre-wrap text-sm ${message.sender === 'user' ? 'text-white' : 'text-gray-800'}`}>
                    {message.content}
                  </p>
                  
                  {/* Display files if any */}
                  {message.files && message.files.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {message.files.map((file, index) => (
                        <div key={index} className="flex items-center bg-opacity-20 bg-black rounded p-1 text-xs">
                          <Paperclip size={12} className="mr-1" />
                          <span className="truncate">{file.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-lg p-4 max-w-[80%]">
                  <div className="flex items-center space-x-2">
                    <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <Bot size={14} />
                    </div>
                    <div className="flex space-x-1">
                      <div className="h-2 w-2 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="h-2 w-2 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '200ms' }}></div>
                      <div className="h-2 w-2 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '400ms' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        {/* Message Input */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSendMessage} className="relative">
              {files.length > 0 && (
                <div className="mb-2 flex flex-wrap gap-2">
                  {files.map((file, index) => (
                    <div key={index} className="bg-gray-100 rounded-full px-3 py-1 flex items-center text-sm">
                      <Paperclip size={14} className="mr-1 text-gray-500" />
                      <span className="truncate max-w-[150px]">{file.name}</span>
                      <button 
                        type="button" 
                        onClick={() => removeFile(file)}
                        className="ml-1 text-gray-500 hover:text-gray-700"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 p-3 focus:outline-none"
                />
                <label className="p-2 text-gray-500 hover:text-gray-700 cursor-pointer">
                  <Paperclip size={18} />
                  <input 
                    type="file" 
                    multiple 
                    className="hidden" 
                    onChange={handleFileUpload} 
                  />
                </label>
                <button 
                  type="submit" 
                  className="bg-blue-600 hover:bg-blue-700 text-white p-3"
                  disabled={isLoading || (!input.trim() && files.length === 0)}
                >
                  <Send size={18} />
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                AI Assistant can provide information, draft content, answer questions, and more.
              </p>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AIAssistantApp;