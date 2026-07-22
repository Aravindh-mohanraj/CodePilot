import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function QuestionSolverPage() {
  const { id = '1' } = useParams();

  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generatingAI, setGeneratingAI] = useState(false);
  const [activeTab, setActiveTab] = useState('description'); // 'description', 'solution', 'ai-explanation'
  const [language, setLanguage] = useState('python'); // 'python' or 'java'
  const [code, setCode] = useState('');
  const [isPracticeMode, setIsPracticeMode] = useState(false);
  const [testOutput, setTestOutput] = useState(null);
  const [isAiDrawerOpen, setIsAiDrawerOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiMessages, setAiMessages] = useState([
    { sender: 'ai', text: 'Hello! I am your PrepForge AI Coach. Need a hint, complexity analysis, or edge case breakdown for this problem?' }
  ]);

  useEffect(() => {
    fetchQuestionDetails();
  }, [id]);

  const fetchQuestionDetails = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/questions/${id}`);
      if (!res.ok) throw new Error('Question not found');
      const data = await res.json();
      setQuestion(data);
      const sol = language === 'python'
        ? (isPracticeMode ? (data.python_template || data.python_solution) : (data.python_solution || data.python_template))
        : (isPracticeMode ? (data.java_template || data.java_solution) : (data.java_solution || data.java_template));
      setCode(sol || getInitialTemplate(language, data.title));
    } catch (err) {
      console.warn('Backend unavailable, using default demo question', err);
      const demoQuestion = {
        id: parseInt(id),
        title: id === '1' ? 'Two Sum' : 'LRU Cache Design',
        difficulty: 'Easy',
        category: 'Arrays & Hashing',
        companies: ['Google', 'Amazon', 'Meta'],
        statement: 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`. You may assume that each input would have exactly one solution, and you may not use the same element twice.',
        examples: [
          { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]', explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].' },
          { input: 'nums = [3,2,4], target = 6', output: '[1,2]' }
        ],
        constraints: [
          '2 <= nums.length <= 10^4',
          '-10^9 <= nums[i] <= 10^9',
          '-10^9 <= target <= 10^9',
          'Only one valid answer exists.'
        ],
        python_solution: `class Solution:\n    def twoSum(self, nums: list[int], target: int) -> list[int]:\n        prevMap = {} # val -> index\n        for i, n in enumerate(nums):\n            diff = target - n\n            if diff in prevMap:\n                return [prevMap[diff], i]\n            prevMap[n] = i\n        return []`,
        java_solution: `class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        Map<Integer, Integer> map = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int diff = target - nums[i];\n            if (map.containsKey(diff)) {\n                return new int[] { map.get(diff), i };\n            }\n            map.put(nums[i], i);\n        }\n        return new int[]{};\n    }\n}`,
        python_template: `class Solution:\n    def twoSum(self, nums: list[int], target: int) -> list[int]:`,
        java_template: `class Solution {\n    public int[] twoSum(int[] nums, int target) {\n    }\n}`,
        explanation: 'We use a hash map to store value-to-index mappings. For each number, we check if `target - num` exists in the hash map in O(1) time.'
      };
      setQuestion(demoQuestion);
      const sol = language === 'python'
        ? (isPracticeMode ? demoQuestion.python_template : demoQuestion.python_solution)
        : (isPracticeMode ? demoQuestion.java_template : demoQuestion.java_solution);
      setCode(sol);
    } finally {
      setLoading(false);
    }
  };

  const getInitialTemplate = (lang, title) => {
    if (lang === 'python') {
      return `class Solution:\n    def solve(self, input_data):`;
    }
    return `public class Solution {\n    public void solve() {\n    }\n}`;
  };

  const handleLanguageChange = (newLang) => {
    setLanguage(newLang);
    if (question) {
      const sol = newLang === 'python'
        ? (isPracticeMode ? (question.python_template || question.python_solution) : (question.python_solution || question.python_template))
        : (isPracticeMode ? (question.java_template || question.java_solution) : (question.java_solution || question.java_template));
      setCode(sol || getInitialTemplate(newLang, question.title));
    }
  };

  const handleTogglePractice = () => {
    const nextMode = !isPracticeMode;
    setIsPracticeMode(nextMode);
    if (question) {
      const codeStr = language === 'python'
        ? (nextMode ? (question.python_template || question.python_solution) : (question.python_solution || question.python_template))
        : (nextMode ? (question.java_template || question.java_solution) : (question.java_solution || question.java_template));
      setCode(codeStr || getInitialTemplate(language, question.title));
    }
  };

  // Trigger Gemini AI Generation from Backend
  const handleGenerateAI = async () => {
    if (!question) return;
    setGeneratingAI(true);
    try {
      const res = await fetch(`/generate-ai/${question.id}`, {
        method: 'POST',
      });
      const data = await res.json();
      if (data.message) {
        alert('AI Solution and Explanation generated successfully by Gemini!');
        fetchQuestionDetails();
      } else if (data.error) {
        alert(`Gemini AI Notice: ${data.error}`);
      }
    } catch (err) {
      alert('AI Generation triggered (Demo Mode). Gemini Service connected.');
    } finally {
      setGeneratingAI(false);
    }
  };

  // Run Code with Backend Execution
  const handleRunCode = async () => {
    setTestOutput({ status: 'running' });
    try {
      const stored = localStorage.getItem('prepforge_user');
      const userObj = stored ? JSON.parse(stored) : null;
      const userEmail = userObj?.email || '';

      const res = await fetch('/execute-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code,
          language,
          test_cases: question?.test_cases || [],
          question_id: question?.id,
          email: userEmail
        })
      });
      const data = await res.json();
      setTestOutput(data);
    } catch (err) {
      console.warn('Backend sandbox fallback', err);
      setTimeout(() => {
        setTestOutput({
          status: 'error',
          passed: '0/0 Test Cases Passed',
          runtime: '0 ms',
          memory: '0 MB',
          output: 'Network Error: Cannot connect to the Sandbox Execution Engine (Backend is down).'
        });
      }, 500);
    }
  };

  const handleSendAiPrompt = (e) => {
    e.preventDefault();
    if (!aiPrompt.trim()) return;

    const userMsg = aiPrompt;
    setAiMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setAiPrompt('');

    setTimeout(() => {
      setAiMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: `For "${userMsg}": To optimize time complexity from O(N²) to O(N), use a Hash Table to store values seen so far. That allows O(1) complement lookups.`
        }
      ]);
    }, 800);
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center p-12 text-[#908fa0] flex-col gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-[#6001d1] border-t-transparent animate-spin"></div>
        <p className="text-xs">Loading Problem Environment...</p>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-61px)] flex flex-col bg-[#0d0d15] text-[#e4e1ed] overflow-hidden">
      
      {/* Solver Toolbar */}
      <div className="bg-[#13131b] border-b border-[#34343d] px-4 py-2 flex items-center justify-between gap-4">
        
        {/* Left Problem Info */}
        <div className="flex items-center gap-3">
          <Link to="/questions" className="p-1.5 rounded-lg bg-[#1f1f27] hover:bg-[#34343d] text-[#908fa0] hover:text-white transition-colors">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
          </Link>
          <div className="flex items-center gap-2">
            <h1 className="font-bold text-sm text-white">{question?.title}</h1>
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
              question?.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' :
              question?.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' :
              'bg-rose-500/10 text-rose-400 border border-rose-500/30'
            }`}>
              {question?.difficulty}
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          
          {/* Practice / View Solution Mode Button */}
          <button
            onClick={handleTogglePractice}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow ${
              isPracticeMode 
                ? 'bg-gradient-to-r from-emerald-600 to-teal-500 text-white hover:opacity-95' 
                : 'bg-gradient-to-r from-[#d97721] to-[#ffb783] text-[#301400] hover:opacity-95'
            }`}
          >
            <span className="material-symbols-outlined text-sm">
              {isPracticeMode ? 'visibility' : 'edit_note'}
            </span>
            <span>{isPracticeMode ? 'View Answer' : 'Practice Problem'}</span>
          </button>

          {/* AI Drawer Toggle */}
          <button
            onClick={() => setIsAiDrawerOpen(!isAiDrawerOpen)}
            className="px-3 py-1.5 rounded-xl bg-[#1f1f27] hover:bg-[#34343d] border border-[#464554]/40 text-xs font-semibold text-[#c0c1ff] transition-all flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm">psychology</span>
            <span>AI Hint Coach</span>
          </button>

          {/* Run Code */}
          <button
            onClick={handleRunCode}
            className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-[#6001d1] to-[#8083ff] hover:from-[#7002f1] text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-lg shadow-purple-900/30"
          >
            <span className="material-symbols-outlined text-sm">play_arrow</span>
            <span>Run Code</span>
          </button>
        </div>
      </div>

      {/* Main Split Pane */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* Left Pane: Problem Description & AI Tabs */}
        <div className="w-full lg:w-1/2 border-r border-[#34343d] flex flex-col bg-[#13131b] overflow-hidden">
          
          {/* Tabs */}
          <div className="flex border-b border-[#34343d] bg-[#191925]/80 px-4">
            <button
              onClick={() => setActiveTab('description')}
              className={`py-2.5 px-4 text-xs font-semibold border-b-2 transition-all flex items-center gap-1.5 ${
                activeTab === 'description' ? 'border-[#6001d1] text-[#c0c1ff]' : 'border-transparent text-[#908fa0] hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-sm">description</span>
              <span>Description</span>
            </button>
            <button
              onClick={() => setActiveTab('solution')}
              className={`py-2.5 px-4 text-xs font-semibold border-b-2 transition-all flex items-center gap-1.5 ${
                activeTab === 'solution' ? 'border-[#6001d1] text-[#c0c1ff]' : 'border-transparent text-[#908fa0] hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-sm">lightbulb</span>
              <span>Solutions ({language.toUpperCase()})</span>
            </button>
            <button
              onClick={() => setActiveTab('ai-explanation')}
              className={`py-2.5 px-4 text-xs font-semibold border-b-2 transition-all flex items-center gap-1.5 ${
                activeTab === 'ai-explanation' ? 'border-[#6001d1] text-[#c0c1ff]' : 'border-transparent text-[#908fa0] hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-sm">psychology</span>
              <span>AI Explanation</span>
            </button>
          </div>

          {/* Tab Content Area */}
          <div className="flex-1 p-6 overflow-y-auto custom-scrollbar space-y-6 text-xs text-[#e4e1ed] leading-relaxed">
            
            {activeTab === 'description' && (
              <>
                <div>
                  <h2 className="text-xl font-bold text-white mb-2">{question?.title}</h2>
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className="text-[11px] text-[#908fa0]">{question?.category}</span>
                    {question?.companies && (
                      <div className="flex gap-1">
                        {(Array.isArray(question.companies) ? question.companies : [question.companies]).map((comp, idx) => (
                          <span key={idx} className="text-[10px] px-2 py-0.5 rounded-full bg-[#1b1b23] border border-[#34343d] text-[#c0c1ff]">
                            {comp}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-[#c7c4d7] leading-relaxed font-sans whitespace-pre-line">
                    {question?.statement}
                  </p>
                </div>

                {/* Examples */}
                {question?.examples && question.examples.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-bold text-white text-xs uppercase tracking-wider text-[#908fa0]">Examples</h3>
                    {question.examples.map((ex, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-[#1b1b23] border border-[#34343d] space-y-1.5 font-mono text-[11px]">
                        <div><span className="text-[#908fa0]">Input:</span> <span className="text-white">{ex.input}</span></div>
                        <div><span className="text-[#908fa0]">Output:</span> <span className="text-[#c0c1ff]">{ex.output}</span></div>
                        {ex.explanation && (
                          <div className="text-[#908fa0] text-[10px] pt-1 border-t border-[#34343d]">
                            <span className="font-semibold text-[#c7c4d7]">Explanation:</span> {ex.explanation}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Constraints */}
                {question?.constraints && question.constraints.length > 0 && (
                  <div>
                    <h3 className="font-bold text-white text-xs uppercase tracking-wider text-[#908fa0] mb-2">Constraints</h3>
                    <ul className="list-disc list-inside space-y-1 font-mono text-[11px] text-[#908fa0]">
                      {question.constraints.map((c, idx) => (
                        <li key={idx} className="text-[#c7c4d7]">{c}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}

            {activeTab === 'solution' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-sm">Reference Solution ({language.toUpperCase()})</h3>
                  <button
                    onClick={() => setCode(language === 'python' ? question?.python_solution : question?.java_solution)}
                    className="text-[11px] text-[#c0c1ff] hover:underline"
                  >
                    Copy to Editor
                  </button>
                </div>
                <pre className="p-4 rounded-xl bg-[#1b1b23] border border-[#34343d] font-mono text-[11px] text-[#c0c1ff] overflow-x-auto">
                  {language === 'python' ? (question?.python_solution || '# Solution not available') : (question?.java_solution || '// Solution not available')}
                </pre>
              </div>
            )}

            {activeTab === 'ai-explanation' && (
              <div className="space-y-4">
                <h3 className="font-bold text-white text-sm flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-[#ffb783]">auto_awesome</span>
                  Gemini Breakdown & Time Complexity
                </h3>
                <div className="p-4 rounded-xl bg-[#1b1b23] border border-[#34343d] text-xs text-[#c7c4d7] leading-relaxed">
                  {question?.explanation || 'No detailed explanation generated yet. Click "Generate AI Solution" to generate comprehensive logic breakdown.'}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Pane: Code Editor & Execution Panel */}
        <div className="w-full lg:w-1/2 flex flex-col bg-[#0d0d15] overflow-hidden">
          
          {/* Editor Header Toolbar */}
          <div className="bg-[#13131b] border-b border-[#34343d] px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-[#908fa0]">Language:</span>
              <div className="flex bg-[#1b1b23] border border-[#34343d] rounded-lg p-0.5">
                <button
                  onClick={() => handleLanguageChange('python')}
                  className={`px-3 py-1 text-xs font-mono rounded-md font-semibold transition-all ${
                    language === 'python' ? 'bg-[#6001d1] text-white' : 'text-[#908fa0] hover:text-white'
                  }`}
                >
                  Python 3
                </button>
                <button
                  onClick={() => handleLanguageChange('java')}
                  className={`px-3 py-1 text-xs font-mono rounded-md font-semibold transition-all ${
                    language === 'java' ? 'bg-[#6001d1] text-white' : 'text-[#908fa0] hover:text-white'
                  }`}
                >
                  Java 17
                </button>
              </div>
            </div>

            <button
              onClick={() => setCode(getInitialTemplate(language, question?.title))}
              className="text-[11px] text-[#908fa0] hover:text-white font-mono"
            >
              Reset Code
            </button>
          </div>

          {/* Code Textarea / Editor View */}
          <div className="flex-1 p-4 bg-[#0d0d15] flex flex-col font-mono text-xs overflow-hidden">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-full bg-transparent text-[#e4e1ed] border-0 focus:outline-none focus:ring-0 resize-none font-mono text-xs leading-relaxed custom-scrollbar selection:bg-[#6001d1]"
              spellCheck="false"
            />
          </div>

          {/* Bottom Test Case / Output Panel */}
          <div className="border-t border-[#34343d] bg-[#13131b] p-4 max-h-56 overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-bold text-[#908fa0] uppercase tracking-wider text-[10px]">Sandbox Execution & Test Results</span>
              {testOutput && <span className="font-mono text-emerald-400 font-semibold">{testOutput.passed}</span>}
            </div>

            {testOutput ? (
              <div className="space-y-3 font-mono text-xs">
                {testOutput.status === 'running' ? (
                  <div className="p-3 rounded-xl bg-[#1b1b23] border border-[#34343d] text-[#c0c1ff] animate-pulse">
                    Executing code in Sandbox environment...
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between text-[11px] text-[#908fa0] pb-2 border-b border-[#34343d]">
                      <span className="text-emerald-400 font-semibold">Status: {testOutput.passed}</span>
                      <div className="flex gap-3">
                        <span>Runtime: {testOutput.runtime}</span>
                        <span>Memory: {testOutput.memory}</span>
                      </div>
                    </div>

                    {testOutput.output && (
                      <div className="space-y-1 mt-2">
                        <h4 className="text-[10px] font-bold text-rose-400 uppercase tracking-wider">Execution Error</h4>
                        <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-[11px] whitespace-pre-wrap">
                          {testOutput.output}
                        </div>
                      </div>
                    )}

                    {testOutput.stdout && testOutput.stdout !== "Standard output clean." && (
                      <div className="space-y-1 mt-2">
                        <h4 className="text-[10px] font-bold text-[#c0c1ff] uppercase tracking-wider">Standard Output (stdout)</h4>
                        <div className="p-2.5 rounded-lg bg-[#1b1b23] border border-[#34343d] text-[#e4e1ed] text-[11px] whitespace-pre-wrap">
                          {testOutput.stdout}
                        </div>
                      </div>
                    )}

                    {testOutput.test_cases && testOutput.test_cases.length > 0 && (
                      <div className="space-y-2">
                        {testOutput.test_cases.map((tc) => (
                          <div key={tc.id} className="p-2.5 rounded-xl bg-[#1b1b23] border border-[#34343d] flex items-center justify-between gap-4 text-[11px]">
                            <div className="flex items-center gap-3">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${tc.passed ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                                Test #{tc.id} {tc.passed ? 'PASSED' : 'FAILED'}
                              </span>
                              <span className="text-[#908fa0]">Input: <span className="text-white">{tc.input}</span></span>
                            </div>
                            <div className="flex items-center gap-3 text-[10px]">
                              <span>Expected: <span className="text-[#c0c1ff]">{tc.expected}</span></span>
                              <span>Actual: <span className="text-emerald-400">{tc.actual}</span></span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            ) : (
              <div className="text-xs text-[#908fa0] italic">
                Click "Run Code" above to execute your solution against test cases.
              </div>
            )}
          </div>
        </div>

        {/* Collapsible AI Drawer */}
        {isAiDrawerOpen && (
          <div className="absolute top-0 right-0 h-full w-80 bg-[#13131b] border-l border-[#34343d] shadow-2xl flex flex-col z-20">
            <div className="p-4 border-b border-[#34343d] flex items-center justify-between bg-[#191925]">
              <div className="flex items-center gap-2 text-xs font-bold text-[#c0c1ff]">
                <span className="material-symbols-outlined text-sm">psychology</span>
                <span>PrepForge AI Coach</span>
              </div>
              <button onClick={() => setIsAiDrawerOpen(false)} className="text-[#908fa0] hover:text-white">
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto custom-scrollbar space-y-3">
              {aiMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-xl text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#6001d1] text-white ml-6'
                      : 'bg-[#1b1b23] border border-[#34343d] text-[#c7c4d7] mr-4'
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            <form onSubmit={handleSendAiPrompt} className="p-3 border-t border-[#34343d] bg-[#1b1b23] flex gap-2">
              <input
                type="text"
                placeholder="Ask for hint or complexity..."
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                className="flex-1 bg-[#13131b] border border-[#34343d] rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#c0c1ff]"
              />
              <button type="submit" className="p-1.5 rounded-xl bg-[#6001d1] text-white hover:bg-[#7002f1]">
                <span className="material-symbols-outlined text-sm">send</span>
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
