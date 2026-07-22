'use client';

import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, Bookmark, EyeOff, Settings, Maximize2, Bot, 
  Send, X, Play, Upload, ArrowLeft, Sparkles, Lightbulb, 
  Gauge, Bug, TestTubes, Brain 
} from 'lucide-react';
import Editor from '@monaco-editor/react';
import { runCode, submitCode } from '@/services/mock-runner';
import { getMockAssistantResponse } from '@/services/mock-ai';
import { MOCK_QUESTIONS } from '@/lib/constants';
import Link from 'next/link';

interface QuestionSolverPageProps {
  params: {
    id: string;
  };
}

interface ExecutionResult {
  status: string;
  runtime?: string;
  memory?: string;
  output?: string;
  passed?: number;
  total?: number;
}

interface AiMessage {
  sender: 'ai' | 'user';
  text: string;
}

export default function QuestionSolverPage({ params }: QuestionSolverPageProps) {
  const [question, setQuestion] = useState(MOCK_QUESTIONS[0]);
  const [code, setCode] = useState<string>(`class Solution:\n    def trap(self, height: List[int]) -> int:\n        # Initialize pointers\n        left, right = 0, len(height) - 1\n        left_max, right_max = 0, 0\n        water = 0\n        \n        while left < right:\n            if height[left] < height[right]:\n                if height[left] >= left_max:\n                    left_max = height[left]\n                else:\n                    water += left_max - height[left]\n                left += 1\n            else:\n                if height[right] >= right_max:\n                    right_max = height[right]\n                else:\n                    water += right_max - height[right]\n                right -= 1\n        \n        return water`);
  const [language, setLanguage] = useState('python');
  const theme = 'vs-dark';
  const fontSize = 14;
  const [activeConsoleTab, setActiveConsoleTab] = useState('Console');
  const [executionResult, setExecutionResult] = useState<ExecutionResult | null>(null);
  const [aiDrawerOpen, setAiDrawerOpen] = useState(false);
  const [aiMessages, setAiMessages] = useState<AiMessage[]>([
    { sender: 'ai', text: 'Welcome! I am your AI assistant. How can I help you with this problem?' }
  ]);
  const [aiInput, setAiInput] = useState('');

  useEffect(() => {
    const q = MOCK_QUESTIONS.find(q => q.id === params.id) || MOCK_QUESTIONS[0];
    setQuestion(q);
  }, [params.id]);

  const handleRun = async () => {
    setExecutionResult({ status: 'Running...' });
    setActiveConsoleTab('Console');
    const res = await runCode(code, language) as ExecutionResult;
    setExecutionResult(res);
  };

  const handleSubmit = async () => {
    setExecutionResult({ status: 'Submitting...' });
    setActiveConsoleTab('Result');
    const res = await submitCode(code, language) as ExecutionResult;
    setExecutionResult(res);
  };

  const handleAiAction = async (action: string) => {
    setAiMessages(prev => [...prev, { sender: 'user', text: action }]);
    const res = await getMockAssistantResponse(action, question.title);
    setAiMessages(prev => [...prev, { sender: 'ai', text: res.content }]);
  };

  const handleSendAiMessage = async () => {
    if (!aiInput.trim()) return;
    const msg = aiInput;
    setAiInput('');
    setAiMessages(prev => [...prev, { sender: 'user', text: msg }]);
    const res = await getMockAssistantResponse(msg, question.title);
    setAiMessages(prev => [...prev, { sender: 'ai', text: res.content }]);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background text-on-surface overflow-hidden">
      {/* TOP NAV BAR */}
      <header className="h-14 border-b border-white/5 flex items-center justify-between px-4 bg-surface-container shrink-0">
        <div className="flex items-center space-x-4">
          <Link href="/explore" className="text-on-surface-variant hover:text-primary transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <span className="font-headline-sm font-semibold text-primary">PrepForge AI</span>
          <div className="flex items-center text-body-sm text-on-surface-variant">
            <span className="opacity-60">Algorithms</span>
            <ChevronRight className="w-4 h-4 mx-1 opacity-60" />
            <span>{question.category}</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="px-3 py-1 rounded-full bg-primary-container text-on-primary-container text-label-md font-semibold text-xs">
            Pro Active
          </div>
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-background font-bold">
            U
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        {/* LEFT PANEL */}
        <div className="w-1/2 border-r border-white/5 flex flex-col bg-background relative overflow-y-auto">
          <div className="p-6 pb-24">
            <div className="flex items-center space-x-3 mb-2">
              <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                question.difficulty === 'Easy' ? 'bg-green-500/10 text-green-400' :
                question.difficulty === 'Medium' ? 'bg-yellow-500/10 text-yellow-400' :
                'bg-red-500/10 text-red-400'
              }`}>
                {question.difficulty}
              </span>
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold">{question.id}. {question.title}</h1>
              <button className="text-on-surface-variant hover:text-primary transition-colors">
                <Bookmark className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {question.companies?.map(company => (
                <span key={company} className="px-3 py-1 rounded-full bg-surface-container-highest text-sm">
                  {company}
                </span>
              ))}
            </div>

            <div className="text-body-md text-on-surface-variant space-y-4 mb-8">
              <p>{question.description}</p>
            </div>

            <div className="bg-surface-container p-4 rounded-lg border border-white/5 mb-6">
              <h3 className="font-semibold mb-2">Example 1:</h3>
              <div className="font-code text-sm space-y-2">
                <p><span className="text-on-surface-variant">Input:</span> <code>{question.exampleInput}</code></p>
                <p><span className="text-on-surface-variant">Output:</span> <code>{question.exampleOutput}</code></p>
                <p><span className="text-on-surface-variant">Explanation:</span> <code>{question.exampleExplanation}</code></p>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="font-semibold mb-2">Constraints:</h3>
              <ul className="list-disc list-inside font-code text-sm text-on-surface-variant space-y-1">
                {question.constraints?.map((c, i) => (
                  <li key={i}><code>{c}</code></li>
                ))}
              </ul>
            </div>

            <div className="flex items-center space-x-3 p-4 rounded-lg bg-surface-container border border-white/5 text-on-surface-variant">
              <EyeOff className="w-5 h-5 text-secondary" />
              <span className="text-sm">48 hidden test cases remaining</span>
            </div>
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
            <button 
              onClick={() => setAiDrawerOpen(true)}
              className="flex items-center space-x-2 bg-primary text-background px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-primary/90 transition-all hover:scale-105"
            >
              <Bot className="w-5 h-5" />
              <span>Explain with AI</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] bg-background/20 uppercase">Beta</span>
            </button>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-1/2 flex flex-col bg-[#1e1e1e]">
          {/* Editor Header */}
          <div className="h-14 border-b border-white/5 bg-surface-container flex items-center justify-between px-4 shrink-0">
            <div className="flex items-center space-x-2">
              <select 
                className="bg-surface-container-highest border border-white/10 rounded px-2 py-1 text-sm outline-none focus:border-primary"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="python">Python3</option>
                <option value="javascript">JavaScript</option>
                <option value="typescript">TypeScript</option>
                <option value="java">Java</option>
                <option value="cpp">C++</option>
                <option value="go">Go</option>
                <option value="rust">Rust</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1.5 text-xs text-on-surface-variant">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span>Auto-saving</span>
              </div>
              <button className="text-on-surface-variant hover:text-on-surface">
                <Settings className="w-4 h-4" />
              </button>
              <button className="text-on-surface-variant hover:text-on-surface">
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Monaco Editor */}
          <div className="flex-grow relative">
            <Editor
              height="100%"
              language={language}
              theme={theme}
              value={code}
              onChange={(val) => setCode(val || '')}
              options={{
                minimap: { enabled: false },
                fontSize,
                fontFamily: 'Geist Mono, monospace',
                scrollBeyondLastLine: false,
                wordWrap: 'on'
              }}
            />
          </div>

          {/* Console / Results */}
          <div className="h-48 border-t border-white/10 bg-surface-container flex flex-col shrink-0 transition-all">
            <div className="flex items-center px-2 pt-2 border-b border-white/5">
              {['Console', 'Testcase', 'Result'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveConsoleTab(tab)}
                  className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                    activeConsoleTab === tab 
                      ? 'border-primary text-primary' 
                      : 'border-transparent text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            
            <div className="flex-grow p-4 overflow-y-auto font-code text-sm">
              {activeConsoleTab === 'Console' && (
                <div>
                  {!executionResult ? (
                    <div className="text-on-surface-variant">Run code to see console output...</div>
                  ) : (
                    <div>
                      <div className={`font-bold mb-2 ${
                        executionResult.status === 'Accepted' ? 'text-green-400' : 'text-primary'
                      }`}>
                        {executionResult.status}
                      </div>
                      {executionResult.runtime && <div className="text-on-surface-variant">Runtime: {executionResult.runtime}</div>}
                      {executionResult.memory && <div className="text-on-surface-variant">Memory: {executionResult.memory}</div>}
                      {executionResult.output && (
                        <div className="mt-2 p-2 bg-black/50 rounded">
                          <span className="opacity-50">Output:</span><br/>
                          {executionResult.output}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
              {activeConsoleTab === 'Testcase' && (
                <div className="space-y-4">
                  <div className="flex flex-col space-y-2">
                    <label className="text-xs font-semibold text-on-surface-variant">height =</label>
                    <input type="text" className="bg-surface-container-highest text-on-surface px-3 py-2 rounded outline-none border border-transparent focus:border-white/10" defaultValue="[0,1,0,2,1,0,1,3,2,1,2,1]" />
                  </div>
                </div>
              )}
              {activeConsoleTab === 'Result' && (
                <div>
                  {!executionResult ? (
                    <div className="text-on-surface-variant">Submit code to see results...</div>
                  ) : (
                    <div>
                      <div className={`text-lg font-bold mb-2 ${
                        executionResult.status === 'Accepted' ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {executionResult.status}
                      </div>
                      {executionResult.passed !== undefined && (
                        <div className="mb-4">
                          Passed {executionResult.passed} / {executionResult.total} test cases
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="h-14 border-t border-white/5 flex items-center justify-end px-4 space-x-3 bg-background">
              <button onClick={handleRun} className="flex items-center space-x-2 px-4 py-1.5 rounded-md bg-surface-container-highest hover:bg-white/10 text-sm font-medium transition-colors">
                <Play className="w-4 h-4" />
                <span>Run</span>
              </button>
              <button onClick={handleSubmit} className="flex items-center space-x-2 px-4 py-1.5 rounded-md bg-primary text-background hover:bg-primary/90 text-sm font-semibold transition-colors">
                <Upload className="w-4 h-4" />
                <span>Submit</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* AI ASSISTANT DRAWER */}
      <div className={`fixed inset-y-0 right-0 w-[400px] bg-surface-container-highest border-l border-white/10 shadow-2xl transition-transform duration-300 flex flex-col z-50 ${
        aiDrawerOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="h-16 border-b border-white/5 flex items-center justify-between px-4 shrink-0 bg-background/50 backdrop-blur-md">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center text-primary">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-semibold text-sm">AI Assistant</h2>
              <p className="text-xs text-on-surface-variant">Contextual Analysis</p>
            </div>
          </div>
          <button onClick={() => setAiDrawerOpen(false)} className="text-on-surface-variant hover:text-on-surface">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-4 space-y-4">
          {aiMessages.map((msg, i) => (
            <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                msg.sender === 'user' 
                  ? 'bg-primary text-background rounded-tr-sm' 
                  : 'bg-surface-container rounded-tl-sm text-on-surface border border-white/5'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-white/5 bg-background">
          <div className="grid grid-cols-2 gap-2 mb-4">
            {[
              { label: 'Explain Problem', icon: Lightbulb },
              { label: 'Give Hint', icon: Sparkles },
              { label: 'Time Complexity', icon: Gauge },
              { label: 'Debug Code', icon: Bug },
              { label: 'Suggest Optimization', icon: Brain },
              { label: 'Generate Test Cases', icon: TestTubes },
            ].map(action => (
              <button 
                key={action.label}
                onClick={() => handleAiAction(action.label)}
                className="flex items-center space-x-2 text-xs bg-surface-container hover:bg-surface-container-highest px-3 py-2 rounded-lg border border-white/5 transition-colors"
              >
                <action.icon className="w-3.5 h-3.5 text-primary" />
                <span>{action.label}</span>
              </button>
            ))}
          </div>

          <div className="relative">
            <input 
              type="text"
              value={aiInput}
              onChange={(e) => setAiInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendAiMessage()}
              placeholder="Ask anything about this problem..."
              className="w-full bg-surface-container-highest text-on-surface border border-white/10 rounded-full pl-4 pr-12 py-3 text-sm outline-none focus:border-primary"
            />
            <button 
              onClick={handleSendAiMessage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-primary text-background hover:scale-105 transition-transform"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
