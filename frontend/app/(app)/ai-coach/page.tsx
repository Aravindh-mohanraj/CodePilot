"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Bot,
  Send,
  Zap,
  MessageSquare,
  Terminal,
  Brain,
  Copy,
  Check,
  Plus,
  History,
  Bookmark,
  TrendingUp,
  ShieldAlert,
  RefreshCw,
  Sparkles,
  Target,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { getMockAIResponse, getSuggestedPrompts } from "@/services/mock-ai";

interface ChatMessage {
  id: string;
  role: "user" | "ai";
  content: string;
  timestamp: string;
}

type DemoState = "normal" | "loading" | "empty" | "error";

export default function AICoachPage() {
  const messageIdCounter = useRef(0);
  const getNextId = () => {
    messageIdCounter.current += 1;
    return `msg-${messageIdCounter.current}`;
  };

  const [demoState, setDemoState] = useState<DemoState>("normal");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "ai",
      content: "Hello! I'm your PrepForge AI Coach. How can I help you prepare today?",
      timestamp: "12:00 PM",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (text: string = inputValue) => {
    if (!text.trim() || isTyping) return;

    const newUserMessage: ChatMessage = {
      id: getNextId(),
      role: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      const response = await getMockAIResponse(text);
      
      const newAiMessage: ChatMessage = {
        id: response.id,
        role: "ai",
        content: response.content,
        timestamp: response.timestamp,
      };

      setMessages((prev) => [...prev, newAiMessage]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsTyping(false);
    }
  };

  const handleCopy = (id: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const startNewConversation = () => {
    setMessages([
      {
        id: getNextId(),
        role: "ai",
        content: "Hello! I'm your PrepForge AI Coach. How can I help you prepare today?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  // Simple Markdown Renderer
  const renderMarkdown = (content: string) => {
    const parts = content.split(/(\`\`\`[\s\S]*?\`\`\`)/g);
    
    return parts.map((part, index) => {
      if (part.startsWith('\`\`\`') && part.endsWith('\`\`\`')) {
        const codeContent = part.replace(/^\`\`\`(\w+)?\n/, '').replace(/\n\`\`\`$/, '');
        return (
          <div key={index} className="my-3 relative group">
            <div className="absolute right-2 top-2 z-10">
              <button
                onClick={() => navigator.clipboard.writeText(codeContent)}
                className="p-1.5 bg-surface-container-highest/80 hover:bg-surface-container-highest rounded text-on-surface-variant hover:text-on-surface transition-colors backdrop-blur-md"
                title="Copy code"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
            <pre className="p-4 rounded-xl bg-[#13131b] overflow-x-auto border border-white/10 text-sm font-code text-on-surface">
              <code>{codeContent}</code>
            </pre>
          </div>
        );
      }
      
      // Basic formatting (bold, italic, list)
      const formattedText = part
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\n- (.*?)(?=\n|$)/g, '<br/>• $1');
        
      // Use dangerouslySetInnerHTML for simplicity in this mock
      return (
        <span 
          key={index} 
          dangerouslySetInnerHTML={{ __html: formattedText.replace(/\n/g, '<br/>') }}
        />
      );
    });
  };

  return (
    <div className="flex h-screen w-full bg-background text-on-surface overflow-hidden">
      {/* Main Chat Area */}
      <div className="flex flex-col flex-1 h-full relative">
        {/* Header / State Switcher (Demo Only) */}
        <div className="absolute top-0 left-0 right-0 z-20 flex justify-between items-center p-4 bg-background/80 backdrop-blur-md border-b border-white/5">
          <div className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-primary" />
            <h1 className="font-headline-sm text-lg font-bold">AI Coach</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <select
              value={demoState}
              onChange={(e) => setDemoState(e.target.value as DemoState)}
              className="bg-surface-container text-body-sm text-on-surface-variant px-3 py-1.5 rounded-lg border border-white/10 outline-none focus:border-primary/50"
            >
              <option value="normal">Normal</option>
              <option value="loading">Loading</option>
              <option value="empty">Empty</option>
              <option value="error">Error</option>
            </select>
            <button
              onClick={startNewConversation}
              className="flex items-center gap-2 px-3 py-1.5 bg-surface-container hover:bg-surface-container-highest rounded-lg text-body-sm transition-colors border border-white/10"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">New Chat</span>
            </button>
          </div>
        </div>

        {/* Chat History Area */}
        <div className="flex-1 overflow-y-auto pt-20 pb-40 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto flex flex-col gap-6">
            
            {demoState === "loading" && (
              <div className="flex flex-col gap-6">
                {[1, 2].map((i) => (
                  <div key={i} className={`flex gap-4 ${i % 2 === 0 ? "flex-row-reverse self-end" : ""}`}>
                    <div className="w-10 h-10 rounded-full bg-surface-container animate-pulse shrink-0" />
                    <div className="w-64 h-24 rounded-2xl bg-surface-container animate-pulse" />
                  </div>
                ))}
              </div>
            )}

            {demoState === "empty" && (
              <div className="flex flex-col items-center justify-center h-full text-center mt-20">
                <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center mb-4">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-headline-sm mb-2">Start a conversation</h2>
                <p className="text-body-md text-on-surface-variant max-w-md">
                  Ask me anything about your prep, interview questions, or coding concepts.
                </p>
              </div>
            )}

            {demoState === "error" && (
              <div className="flex flex-col items-center justify-center h-full text-center mt-20">
                <div className="w-16 h-16 rounded-full bg-error/10 flex items-center justify-center mb-4">
                  <ShieldAlert className="w-8 h-8 text-error" />
                </div>
                <h2 className="text-headline-sm mb-2">Connection Error</h2>
                <p className="text-body-md text-on-surface-variant max-w-md mb-6">
                  We couldn&apos;t reach the AI service. Please check your connection and try again.
                </p>
                <button
                  onClick={() => setDemoState("normal")}
                  className="flex items-center gap-2 px-6 py-2.5 bg-surface-container hover:bg-surface-container-highest rounded-xl transition-colors text-body-md font-medium"
                >
                  <RefreshCw className="w-5 h-5" />
                  Try Again
                </button>
              </div>
            )}

            {demoState === "normal" && (
              <AnimatePresence>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse self-end" : "self-start"} w-full md:max-w-[85%]`}
                  >
                    {/* Avatar */}
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                        msg.role === "ai"
                          ? "bg-primary-container text-on-primary-container"
                          : "bg-surface-container-highest text-on-surface"
                      }`}
                    >
                      {msg.role === "ai" ? <Bot className="w-5 h-5" /> : <span className="font-bold text-sm">AR</span>}
                    </div>

                    {/* Bubble */}
                    <div className={`flex flex-col gap-1 max-w-full ${msg.role === "user" ? "items-end" : "items-start"}`}>
                      <div
                        className={`px-5 py-3.5 text-body-md ${
                          msg.role === "user"
                            ? "bg-primary text-background rounded-2xl rounded-tr-sm"
                            : "bg-[#1f1f27]/70 backdrop-blur-xl border border-white/5 rounded-2xl rounded-tl-sm text-on-surface"
                        }`}
                      >
                        {msg.role === "ai" ? renderMarkdown(msg.content) : msg.content}
                      </div>

                      <div className="flex items-center gap-3 px-1 mt-0.5">
                        <span className="text-label-md text-on-surface-variant/60">{msg.timestamp}</span>
                        {msg.role === "ai" && (
                          <button
                            onClick={() => handleCopy(msg.id, msg.content)}
                            className="text-on-surface-variant/60 hover:text-on-surface-variant transition-colors"
                          >
                            {copiedId === msg.id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}

            {/* Typing Indicator */}
            {isTyping && demoState === "normal" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4 self-start">
                <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shrink-0">
                  <Bot className="w-5 h-5" />
                </div>
                <div className="bg-[#1f1f27]/70 backdrop-blur-xl border border-white/5 rounded-2xl rounded-tl-sm px-5 py-4 flex items-center gap-1.5 h-[52px]">
                  <motion.div
                    className="w-1.5 h-1.5 bg-on-surface-variant rounded-full"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                  />
                  <motion.div
                    className="w-1.5 h-1.5 bg-on-surface-variant rounded-full"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                  />
                  <motion.div
                    className="w-1.5 h-1.5 bg-on-surface-variant rounded-full"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                  />
                </div>
              </motion.div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Footer / Input Area */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-background via-background/90 to-transparent pt-10">
          <div className="max-w-4xl mx-auto flex flex-col gap-3">
            
            {/* Suggested Prompts */}
            {demoState !== "loading" && demoState !== "error" && messages.length <= 1 && !isTyping && (
              <div className="flex flex-wrap gap-2 mb-2">
                {getSuggestedPrompts().map((promptText, index) => {
                  const Icons = [Zap, Terminal, MessageSquare, Brain, Sparkles, Target];
                  const Icon = Icons[index % Icons.length];
                  return (
                    <button
                      key={promptText}
                      onClick={() => handleSendMessage(promptText)}
                      className="flex items-center gap-2 px-4 py-2 bg-[#1f1f27]/70 backdrop-blur-xl border border-white/5 rounded-full text-sm hover:bg-surface-container transition-colors cursor-pointer text-on-surface"
                    >
                      <Icon className="w-4 h-4 text-primary" />
                      {promptText}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Input Bar */}
            <div className="bg-gradient-to-r from-primary/20 via-secondary/20 to-tertiary/20 p-[1px] rounded-2xl">
              <div className="flex items-center gap-3 bg-surface-container-highest/90 backdrop-blur-2xl rounded-2xl px-4 py-3">
                <Brain className="w-5 h-5 text-primary shrink-0" />
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Ask PrepForge AI anything..."
                  className="flex-1 bg-transparent outline-none text-body-md placeholder:text-on-surface-variant/50"
                  disabled={isTyping || demoState === "loading" || demoState === "error"}
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputValue.trim() || isTyping || demoState === "loading" || demoState === "error"}
                  className="w-10 h-10 flex items-center justify-center bg-primary text-background rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <p className="text-center text-label-md text-on-surface-variant/50">
              AI Coach can make mistakes. Consider verifying important information.
            </p>
          </div>
        </div>
      </div>

      {/* Right Sidebar (Hidden on mobile) */}
      <div className="hidden xl:flex flex-col w-80 h-full bg-[#1f1f27]/40 backdrop-blur-xl border-l border-white/5 shrink-0 overflow-y-auto">
        <div className="p-6 flex flex-col gap-8">
          
          {/* Practice History */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-headline-sm text-sm font-semibold flex items-center gap-2">
                <History className="w-4 h-4 text-secondary" />
                Recent Sessions
              </h3>
            </div>
            <div className="flex flex-col gap-3">
              {[
                { title: "React Hooks Deep Dive", time: "2 hours ago" },
                { title: "System Design Basics", time: "Yesterday" },
                { title: "Mock Interview: Frontend", time: "3 days ago" },
              ].map((item, i) => (
                <button key={i} className="flex flex-col items-start p-3 rounded-xl hover:bg-surface-container transition-colors border border-transparent hover:border-white/5 text-left">
                  <span className="text-body-sm font-medium">{item.title}</span>
                  <span className="text-label-md text-on-surface-variant">{item.time}</span>
                </button>
              ))}
            </div>
          </section>

          {/* Saved Explanations */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-headline-sm text-sm font-semibold flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-tertiary" />
                Saved Answers
              </h3>
            </div>
            <div className="flex flex-col gap-3">
              {[
                { title: "Event Loop Visualization", type: "Concept" },
                { title: "Binary Tree Traversal", type: "Code snippet" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-surface-container/50 border border-white/5 group cursor-pointer hover:bg-surface-container transition-colors">
                  <div className="flex flex-col">
                    <span className="text-body-sm font-medium line-clamp-1">{item.title}</span>
                    <span className="text-label-md text-on-surface-variant">{item.type}</span>
                  </div>
                  <Bookmark className="w-4 h-4 text-on-surface-variant group-hover:text-tertiary transition-colors" />
                </div>
              ))}
            </div>
          </section>

          {/* Weekly Goal */}
          <section className="mt-auto">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-primary/20 text-primary">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-body-sm font-semibold">Weekly Goal</h4>
                  <p className="text-label-md text-on-surface-variant">4/5 sessions completed</p>
                </div>
              </div>
              <div className="w-full h-1.5 bg-background rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: "80%" }} />
              </div>
            </div>
          </section>
          
        </div>
      </div>
    </div>
  );
}
