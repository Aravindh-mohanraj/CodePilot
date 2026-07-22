"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Editor from '@monaco-editor/react';
import {
  Timer,
  Flag,
  ChevronLeft,
  ChevronRight,
  Play,
  Upload,
  AlertTriangle,
  Trophy,
  TrendingUp,
  Target,
  ArrowLeft,
  RotateCcw,
  X,
  CheckCircle2,
  Clock,
  Brain,
  Loader2,
  Code2
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

// Mock Services Types and Functions
interface InterviewQuestion {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  constraints: string[];
  exampleIO: { input: string; output: string }[];
  defaultCode: Record<string, string>;
}

interface InterviewSession {
  id: string;
  companyName: string;
  timeLimit: number; // in minutes
  questions: InterviewQuestion[];
}

interface InterviewResult {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeTaken: number;
  strengths: string[];
  areasForImprovement: string[];
  feedback: string;
}

// Mock Data
const MOCK_QUESTIONS: InterviewQuestion[] = [
  {
    id: 'q1',
    title: 'Two Sum',
    difficulty: 'Easy',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.',
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.'
    ],
    exampleIO: [
      { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]' },
      { input: 'nums = [3,2,4], target = 6', output: '[1,2]' }
    ],
    defaultCode: {
      python: 'def twoSum(nums, target):\n    # Write your code here\n    pass',
      javascript: 'function twoSum(nums, target) {\n    // Write your code here\n}'
    }
  },
  {
    id: 'q2',
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    description: 'Given a string s, find the length of the longest substring without repeating characters.',
    constraints: [
      '0 <= s.length <= 5 * 10^4',
      's consists of English letters, digits, symbols and spaces.'
    ],
    exampleIO: [
      { input: 's = "abcabcbb"', output: '3' },
      { input: 's = "bbbbb"', output: '1' }
    ],
    defaultCode: {
      python: 'def lengthOfLongestSubstring(s):\n    # Write your code here\n    pass',
      javascript: 'function lengthOfLongestSubstring(s) {\n    // Write your code here\n}'
    }
  }
];

const createMockInterview = async (company: string): Promise<InterviewSession> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 'sess-123',
        companyName: company,
        timeLimit: 45,
        questions: MOCK_QUESTIONS
      });
    }, 1000);
  });
};

const evaluateInterview = async (session: InterviewSession, answers: Map<number, string>, timeTakenSeconds: number): Promise<InterviewResult> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        score: 85,
        totalQuestions: session.questions.length,
        correctAnswers: answers.size > 0 ? 1 : 0, // Mocked logic
        timeTaken: timeTakenSeconds,
        strengths: ['Algorithm Optimization', 'Code Structure', 'Problem Solving'],
        areasForImprovement: ['Edge Case Handling', 'Time Complexity Analysis'],
        feedback: 'Solid performance overall. You identified the optimal approaches quickly. Be sure to walk through edge cases explicitly before writing code.'
      });
    }, 1500);
  });
};

const formatTime = (totalSeconds: number) => {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
};

export default function InterviewPage() {
  const router = useRouter();
  
  const [session, setSession] = useState<InterviewSession | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Map<number, string>>(new Map());
  const [flagged, setFlagged] = useState<Set<number>>(new Set());
  const [notes, setNotes] = useState<Map<number, string>>(new Map());
  
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [results, setResults] = useState<InterviewResult | null>(null);
  const [language, setLanguage] = useState('python');
  
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState<string>('Console output will appear here...');

  const initialTimeLimit = session ? session.timeLimit * 60 : 0;

  // Initialize
  useEffect(() => {
    let mounted = true;
    createMockInterview('Google').then((sess) => {
      if (mounted) {
        setSession(sess);
        setTimeRemaining(sess.timeLimit * 60);
      }
    });
    return () => { mounted = false; };
  }, []);

  // Timer logic
  useEffect(() => {
    if (!session || isFinished) return;

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleEndInterview(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [session, isFinished]);

  const handleEndInterview = async (autoEnded = false) => {
    if (!session) return;
    setIsFinished(true);
    setShowConfirmDialog(false);
    setIsEvaluating(true);
    
    const timeTaken = initialTimeLimit - timeRemaining;
    const res = await evaluateInterview(session, answers, timeTaken);
    setResults(res);
    setIsEvaluating(false);
  };

  const currentQuestion = session?.questions[currentQuestionIndex];
  
  const handleCodeChange = (value: string | undefined) => {
    if (value !== undefined) {
      setAnswers(prev => {
        const newAnswers = new Map(prev);
        newAnswers.set(currentQuestionIndex, value);
        return newAnswers;
      });
    }
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setNotes(prev => {
      const newNotes = new Map(prev);
      newNotes.set(currentQuestionIndex, val);
      return newNotes;
    });
  };

  const toggleFlag = () => {
    setFlagged(prev => {
      const next = new Set(prev);
      if (next.has(currentQuestionIndex)) {
        next.delete(currentQuestionIndex);
      } else {
        next.add(currentQuestionIndex);
      }
      return next;
    });
  };

  const handleRun = () => {
    setConsoleOutput('Running code...\nStatus: Success\nOutput matches expected example.');
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-[#13131b] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-[#c0c1ff] animate-spin" />
          <p className="text-[#c7c4d7] font-body-md">Initializing interview environment...</p>
        </div>
      </div>
    );
  }

  const isLowTime = timeRemaining < 300; // < 5 mins

  return (
    <div className="min-h-screen bg-[#13131b] flex flex-col text-[#e4e1ed] overflow-hidden">
      {/* 1. Header Bar */}
      <header className="sticky top-0 z-10 h-16 bg-[#1f1f27]/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#8083ff]/20 flex items-center justify-center text-[#c0c1ff]">
            <Code2 className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-headline-sm text-[#e4e1ed]">Mock Interview</h1>
            <p className="font-label-md text-[#c7c4d7]">{session.companyName} Session</p>
          </div>
        </div>

        <div className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1f1f27] border border-white/5 ${isLowTime ? 'text-[#ffb4ab] border-[#ffb4ab]/30' : 'text-[#c0c1ff]'}`}>
          <Timer className="w-5 h-5" />
          <span className="font-code text-lg font-bold tracking-wider">{formatTime(timeRemaining)}</span>
        </div>

        <div className="flex items-center gap-6">
          <span className="font-body-sm text-[#c7c4d7]">
            Question {currentQuestionIndex + 1} of {session.questions.length}
          </span>
          <button
            onClick={() => setShowConfirmDialog(true)}
            className="px-4 py-2 bg-[#ffb4ab]/10 text-[#ffb4ab] hover:bg-[#ffb4ab]/20 rounded-lg font-label-md transition-colors border border-[#ffb4ab]/20"
            disabled={isFinished}
          >
            End Interview
          </button>
        </div>
      </header>

      {/* 2. Main Content */}
      <main className="flex-1 flex overflow-hidden">
        {/* Left Panel */}
        <div className="w-1/2 flex flex-col border-r border-white/5 bg-[#13131b] overflow-hidden">
          {/* Question Navigator */}
          <div className="p-4 border-b border-white/5 flex gap-2 overflow-x-auto no-scrollbar shrink-0">
            {session.questions.map((q, idx) => {
              const isCurrent = idx === currentQuestionIndex;
              const isAnswered = answers.has(idx) && answers.get(idx)!.trim().length > 0;
              const isFlagged = flagged.has(idx);

              let btnClass = "w-10 h-10 rounded-lg font-code font-bold flex items-center justify-center transition-all shrink-0 ";
              if (isCurrent) {
                btnClass += "bg-[#c0c1ff] text-[#0d0096]";
              } else if (isFlagged) {
                btnClass += "bg-[#ffb783]/20 text-[#ffb783] border border-[#ffb783]/30";
              } else if (isAnswered) {
                btnClass += "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30";
              } else {
                btnClass += "bg-[#1f1f27] text-[#c7c4d7] border border-white/5 hover:bg-[#34343d]";
              }

              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentQuestionIndex(idx)}
                  className={btnClass}
                  title={`Question ${idx + 1}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          {/* Question Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {currentQuestion && (
              <>
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      currentQuestion.difficulty === 'Easy' ? 'bg-emerald-500/20 text-emerald-400' :
                      currentQuestion.difficulty === 'Medium' ? 'bg-amber-500/20 text-amber-400' :
                      'bg-[#ffb4ab]/20 text-[#ffb4ab]'
                    }`}>
                      {currentQuestion.difficulty}
                    </span>
                    <button 
                      onClick={toggleFlag}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                        flagged.has(currentQuestionIndex) 
                          ? 'bg-[#ffb783]/20 text-[#ffb783]' 
                          : 'bg-[#1f1f27] text-[#c7c4d7] hover:text-[#e4e1ed]'
                      }`}
                    >
                      <Flag className="w-4 h-4" />
                      {flagged.has(currentQuestionIndex) ? 'Flagged' : 'Flag'}
                    </button>
                  </div>
                  <h2 className="font-headline-sm text-2xl mb-4">{currentQuestion.title}</h2>
                  <div className="font-body-md text-[#c7c4d7] leading-relaxed whitespace-pre-line mb-6">
                    {currentQuestion.description}
                  </div>
                  
                  <div className="space-y-4 mb-8">
                    <h3 className="font-label-md text-[#e4e1ed] uppercase tracking-wider">Example I/O</h3>
                    {currentQuestion.exampleIO.map((ex, i) => (
                      <div key={i} className="bg-[#1f1f27]/60 rounded-lg p-4 font-code text-sm border border-white/5 space-y-2">
                        <div><span className="text-[#c0c1ff]">Input:</span> {ex.input}</div>
                        <div><span className="text-[#c0c1ff]">Output:</span> {ex.output}</div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-label-md text-[#e4e1ed] uppercase tracking-wider">Constraints</h3>
                    <ul className="list-disc list-inside space-y-2 font-code text-sm text-[#c7c4d7] bg-[#1f1f27]/40 p-4 rounded-lg border border-white/5">
                      {currentQuestion.constraints.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/5">
                  <h3 className="font-label-md text-[#e4e1ed] uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Brain className="w-4 h-4" /> Scratchpad / Notes
                  </h3>
                  <textarea
                    value={notes.get(currentQuestionIndex) || ''}
                    onChange={handleNotesChange}
                    placeholder="Write your thoughts, edge cases, or pseudo-code here..."
                    className="w-full h-32 bg-[#1f1f27]/40 border border-white/10 rounded-lg p-4 font-body-sm text-[#e4e1ed] focus:outline-none focus:border-[#c0c1ff]/50 resize-none"
                  />
                </div>
              </>
            )}
          </div>

          {/* Navigation Controls */}
          <div className="p-4 border-t border-white/5 bg-[#1f1f27]/30 flex items-center justify-between shrink-0">
            <button
              onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
              disabled={currentQuestionIndex === 0}
              className="flex items-center gap-2 px-4 py-2 text-[#c7c4d7] hover:text-[#e4e1ed] disabled:opacity-50 disabled:hover:text-[#c7c4d7]"
            >
              <ChevronLeft className="w-5 h-5" /> Previous
            </button>
            <button
              onClick={() => setCurrentQuestionIndex(Math.min(session.questions.length - 1, currentQuestionIndex + 1))}
              disabled={currentQuestionIndex === session.questions.length - 1}
              className="flex items-center gap-2 px-4 py-2 text-[#c7c4d7] hover:text-[#e4e1ed] disabled:opacity-50 disabled:hover:text-[#c7c4d7]"
            >
              Next <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Right Panel - Editor */}
        <div className="w-1/2 flex flex-col bg-[#13131b]">
          <div className="h-14 border-b border-white/5 bg-[#1f1f27]/50 flex items-center justify-between px-4 shrink-0">
            <div className="flex gap-2">
              {(['python', 'javascript'] as const).map(lang => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-3 py-1.5 rounded-md font-label-md text-sm transition-colors ${
                    language === lang 
                      ? 'bg-[#c0c1ff]/10 text-[#c0c1ff]' 
                      : 'text-[#c7c4d7] hover:text-[#e4e1ed] hover:bg-[#34343d]/50'
                  }`}
                >
                  {lang.charAt(0).toUpperCase() + lang.slice(1)}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={handleRun}
                className="flex items-center gap-2 px-4 py-1.5 bg-[#34343d] hover:bg-[#4a4a56] text-[#e4e1ed] rounded-lg font-label-md transition-colors"
              >
                <Play className="w-4 h-4 text-emerald-400" /> Run Code
              </button>
              <button className="flex items-center gap-2 px-4 py-1.5 bg-[#c0c1ff] hover:bg-[#a6a7ff] text-[#0d0096] rounded-lg font-label-md transition-colors">
                <Upload className="w-4 h-4" /> Submit
              </button>
            </div>
          </div>
          
          <div className="flex-1 relative border-b border-white/5">
            {currentQuestion && (
              <Editor
                height="100%"
                language={language}
                theme="vs-dark"
                value={answers.get(currentQuestionIndex) ?? (currentQuestion.defaultCode[language] || '')}
                onChange={handleCodeChange}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                  padding: { top: 16 },
                  scrollBeyondLastLine: false,
                  smoothScrolling: true,
                  contextmenu: false,
                }}
              />
            )}
          </div>

          <div className="h-48 bg-[#0a0a0f] flex flex-col shrink-0">
            <div className="px-4 py-2 border-b border-white/5 flex items-center justify-between text-[#c7c4d7] bg-[#1f1f27]/30">
              <span className="font-label-md text-sm">Console Output</span>
            </div>
            <div className="p-4 font-code text-sm text-[#e4e1ed] overflow-y-auto whitespace-pre-wrap">
              {consoleOutput}
            </div>
          </div>
        </div>
      </main>

      {/* Overlays */}
      <AnimatePresence>
        {showConfirmDialog && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#1f1f27] border border-white/10 rounded-2xl p-6 max-w-md w-full shadow-2xl"
            >
              <div className="flex items-center gap-4 mb-4 text-[#ffb4ab]">
                <AlertTriangle className="w-8 h-8" />
                <h2 className="font-headline-sm text-xl text-[#e4e1ed]">End Interview?</h2>
              </div>
              <p className="text-[#c7c4d7] mb-8 font-body-md">
                Are you sure you want to end the interview early? You will not be able to change your answers once submitted.
              </p>
              <div className="flex justify-end gap-3">
                <button 
                  onClick={() => setShowConfirmDialog(false)}
                  className="px-4 py-2 rounded-lg font-label-md text-[#c7c4d7] hover:bg-[#34343d] transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => handleEndInterview(false)}
                  className="px-4 py-2 rounded-lg font-label-md bg-[#ffb4ab] text-[#690005] hover:bg-[#ffb4ab]/90 transition-colors"
                >
                  End Interview
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {isEvaluating && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-4"
          >
            <Loader2 className="w-12 h-12 text-[#c0c1ff] animate-spin mb-6" />
            <h2 className="font-headline-sm text-2xl text-[#e4e1ed] mb-2">Analyzing Performance</h2>
            <p className="text-[#c7c4d7] font-body-md">Evaluating code quality, accuracy, and efficiency...</p>
          </motion.div>
        )}

        {results && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 bg-[#13131b]/95 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto"
          >
            <div className="max-w-3xl w-full bg-[#1f1f27]/40 border border-white/10 rounded-3xl p-8 shadow-2xl my-8">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-3xl font-headline-sm text-[#e4e1ed] mb-2">Interview Results</h2>
                  <p className="text-[#c7c4d7]">Session with {session.companyName}</p>
                </div>
                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-[#c0c1ff]/10 border-4 border-[#c0c1ff]">
                  <span className="text-2xl font-bold text-[#c0c1ff]">{results.score}%</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-[#34343d]/50 rounded-xl p-4 border border-white/5 flex items-center gap-4">
                  <div className="p-3 bg-emerald-500/20 rounded-lg text-emerald-400"><CheckCircle2 className="w-6 h-6" /></div>
                  <div>
                    <div className="text-sm text-[#c7c4d7]">Correct</div>
                    <div className="text-xl font-bold text-[#e4e1ed]">{results.correctAnswers} / {results.totalQuestions}</div>
                  </div>
                </div>
                <div className="bg-[#34343d]/50 rounded-xl p-4 border border-white/5 flex items-center gap-4">
                  <div className="p-3 bg-[#c0c1ff]/20 rounded-lg text-[#c0c1ff]"><Clock className="w-6 h-6" /></div>
                  <div>
                    <div className="text-sm text-[#c7c4d7]">Time Taken</div>
                    <div className="text-xl font-bold text-[#e4e1ed]">{formatTime(results.timeTaken)}</div>
                  </div>
                </div>
                <div className="bg-[#34343d]/50 rounded-xl p-4 border border-white/5 flex items-center gap-4">
                  <div className="p-3 bg-[#ffb783]/20 rounded-lg text-[#ffb783]"><Trophy className="w-6 h-6" /></div>
                  <div>
                    <div className="text-sm text-[#c7c4d7]">Overall Rating</div>
                    <div className="text-xl font-bold text-[#e4e1ed]">{results.score >= 80 ? 'Strong Hire' : results.score >= 60 ? 'Hire' : 'No Hire'}</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#1f1f27] rounded-xl p-6 border border-emerald-500/20">
                  <h3 className="flex items-center gap-2 text-emerald-400 font-label-md mb-4 uppercase tracking-wider">
                    <TrendingUp className="w-4 h-4" /> Strengths
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {results.strengths.map((s, i) => (
                      <span key={i} className="px-3 py-1 bg-emerald-500/10 text-emerald-300 text-sm rounded-full border border-emerald-500/20">{s}</span>
                    ))}
                  </div>
                </div>
                <div className="bg-[#1f1f27] rounded-xl p-6 border border-[#ffb783]/20">
                  <h3 className="flex items-center gap-2 text-[#ffb783] font-label-md mb-4 uppercase tracking-wider">
                    <Target className="w-4 h-4" /> Areas to Improve
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {results.areasForImprovement.map((s, i) => (
                      <span key={i} className="px-3 py-1 bg-[#ffb783]/10 text-[#ffb783] text-sm rounded-full border border-[#ffb783]/20">{s}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-[#8083ff]/10 rounded-xl p-6 border border-[#8083ff]/30 mb-8">
                <h3 className="flex items-center gap-2 text-[#c0c1ff] font-label-md mb-3 uppercase tracking-wider">
                  <Brain className="w-4 h-4" /> AI Feedback
                </h3>
                <p className="text-[#e4e1ed] leading-relaxed">
                  {results.feedback}
                </p>
              </div>

              <div className="flex justify-end gap-4">
                <button 
                  onClick={() => window.location.reload()}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-label-md text-[#c7c4d7] bg-[#34343d] hover:bg-[#4a4a56] transition-colors"
                >
                  <RotateCcw className="w-5 h-5" /> Try Again
                </button>
                <button 
                  onClick={() => router.push('/dashboard')}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-label-md bg-[#c0c1ff] text-[#0d0096] hover:bg-[#a6a7ff] transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" /> Back to Dashboard
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
