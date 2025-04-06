
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { chatMessages } from "@/data/mockData";
import { Message } from "@/models/types";
import { Send } from "lucide-react";
import { useState } from "react";

const AIAssistant = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>(chatMessages);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    // Add user message
    const newUserMessage: Message = {
      id: `m${messages.length + 1}`,
      sender: "user",
      content: input,
      timestamp: new Date().toISOString(),
    };

    setMessages([...messages, newUserMessage]);
    setInput("");

    // Simulate AI response after a short delay
    setTimeout(() => {
      const newAIMessage: Message = {
        id: `m${messages.length + 2}`,
        sender: "assistant",
        content:
          "I'm your Study assistant. I can help answer questions about your subjects, summarize topics, or provide learning resources. What would you like help with today?",
        timestamp: new Date().toISOString(),
      };
      setMessages((prevMessages) => [...prevMessages, newAIMessage]);
    }, 1000);
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Card className="border border-gray-200 flex flex-col h-[400px]">
      <CardHeader className="py-3 px-4 border-b border-gray-200">
        <h3 className="font-semibold text-lg">Assistant</h3>
      </CardHeader>
      <ScrollArea className="flex-1">
        <CardContent className="p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] px-4 py-2 rounded-lg ${
                  message.sender === "user"
                    ? "bg-eduBlue text-white rounded-tr-none"
                    : "bg-gray-100 text-gray-800 rounded-tl-none"
                }`}
              >
                <p>{message.content}</p>
                <span className={`text-xs mt-1 block text-right ${
                  message.sender === "user" ? "text-blue-100" : "text-gray-500"
                }`}>
                  {formatTime(message.timestamp)}
                </span>
              </div>
            </div>
          ))}
        </CardContent>
      </ScrollArea>
      <CardFooter className="p-4 border-t border-gray-200">
        <div className="flex w-full gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask something..."
            className="flex-1 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-eduBlue focus:border-transparent"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
          />
          <Button onClick={handleSendMessage} className="bg-eduBlue">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AIAssistant;
