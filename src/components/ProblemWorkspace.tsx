import React, { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import confetti from 'canvas-confetti';
import { Problem, UserSubmission, ChatMessage } from '../types';
import { TOPICS } from '../data/taxonomyData';
import { MathText } from '../utils/mathRenderer';
import { runSampleTests, submitCodeForGrading, RunResult } from '../utils/judgeRunner';
import { getProblemChat, saveProblemChat, getUserProfile, toggleBookmark } from '../utils/storage';
import { generateSocraticResponse, getInitialSocraticGreeting, generateSimilarProblem } from '../utils/aiSimulator';
import {
  ArrowLeft,
  Play,
  Send,
  RotateCcw,
  Star,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  Bot,
  User,
  Copy,
  Check,
  Code2,
  BookOpen,
  HelpCircle,
  FileCode,
  Layers,
  FileText,
  AlertTriangle,
  Lightbulb
} from 'lucide-react';

interface ProblemWorkspaceProps {
  problem: Problem;
  onBack: () => void;
  onSelectProblem: (problem: Problem) => void;
  onProfileUpdate: () => void;
}

export const ProblemWorkspace: React.FC<ProblemWorkspaceProps> = ({
  problem,
  onBack,
  onSelectProblem,
  onProfileUpdate
}) => {
  const topic = TOPICS.find(t => t.id === problem.topicId);

  // Tabs for left and right panes
  const [leftTab, setLeftTab] = useState<'statement' | 'subtasks' | 'theory' | 'editorial'>('statement');
  const [rightTab, setRightTab] = useState<'editor' | 'socratic' | 'generator' | 'submissions'>('editor');

  // Code editor states - Mặc định Python 3
  const [language, setLanguage] = useState<'cpp' | 'python'>('python');
  const [code, setCode] = useState<string>(
    language === 'python' ? problem.templateCodePy : problem.templateCodeCpp
  );

  // When language changes, update starter code if untouched
  const handleLanguageChange = (newLang: 'cpp' | 'python') => {
    setLanguage(newLang);
    setCode(newLang === 'python' ? problem.templateCodePy : problem.templateCodeCpp);
  };

  // Execution & Grading states
  const [isRunning, setIsRunning] = useState(false);
  const [runResult, setRunResult] = useState<RunResult | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Socratic Chat states
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Load chat history or create initial greeting
  useEffect(() => {
    const existing = getProblemChat(problem.id);
    if (existing.length > 0) {
      setChatMessages(existing);
    } else {
      const greeting: ChatMessage = {
        id: 'msg-0',
        sender: 'assistant',
        content: getInitialSocraticGreeting(problem),
        timestamp: Date.now()
      };
      setChatMessages([greeting]);
      saveProblemChat(problem.id, [greeting]);
    }
  }, [problem.id]);

  // Scroll to bottom of chat
  useEffect(() => {
    if (rightTab === 'socratic') {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, rightTab]);

  // AI Generator state
  const [generatedVariant, setGeneratedVariant] = useState<Problem | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // User profile check for bookmarks and submission history
  const profile = getUserProfile();
  const isBookmarked = profile.bookmarkedIds.includes(problem.id);
  const isSolved = profile.solvedProblemIds.includes(problem.id);
  const problemSubmissions = profile.submissions.filter(s => s.problemId === problem.id);

  // Actions: Run Samples
  const handleRunSample = () => {
    setIsRunning(true);
    setTimeout(() => {
      const res = runSampleTests(problem, code, language);
      setRunResult(res);
      setIsRunning(false);
    }, 400);
  };

  // Actions: Submit for grading
  const handleSubmit = () => {
    setIsRunning(true);
    setTimeout(() => {
      const res = submitCodeForGrading(problem, code, language);
      setRunResult(res);
      setIsRunning(false);
      onProfileUpdate();

      if (res.status === 'AC') {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }, 600);
  };

  // Actions: Send chat message
  const handleSendMessage = (textToSend?: string, hintLevel?: number) => {
    const text = textToSend || chatInput.trim();
    if (!text && !hintLevel) return;

    const userMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      content: text || `Xin thầy gợi ý Nấc ${hintLevel}!`,
      timestamp: Date.now(),
      hintLevel
    };

    const newChat = [...chatMessages, userMsg];
    setChatMessages(newChat);
    if (!textToSend) setChatInput('');

    // Simulate AI response
    setTimeout(() => {
      const replyContent = generateSocraticResponse(problem, text, code, hintLevel);
      const aiReply: ChatMessage = {
        id: 'msg-' + (Date.now() + 1),
        sender: 'assistant',
        content: replyContent,
        timestamp: Date.now() + 1,
        hintLevel
      };
      const updatedChat = [...newChat, aiReply];
      setChatMessages(updatedChat);
      saveProblemChat(problem.id, updatedChat);
    }, 500);
  };

  // Actions: Generate similar problem
  const handleGenerateVariant = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const variant = generateSimilarProblem(problem);
      setGeneratedVariant(variant);
      setIsGenerating(false);
    }, 800);
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-slate-950 text-slate-100 overflow-hidden">
      {/* Top Problem Header Bar */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between gap-4 flex-shrink-0 z-20">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Quay lại</span>
          </button>

          <div className="h-5 w-[1px] bg-slate-800 hidden sm:block" />

          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-extrabold text-sm text-indigo-400">{problem.code}</span>
              <span className="font-bold text-sm text-slate-200 truncate">{problem.title}</span>
              {isSolved && (
                <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-md">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Đã AC
                </span>
              )}
            </div>
            <div className="text-[11px] text-slate-400 flex items-center gap-2 flex-wrap">
              <span>{problem.contest}</span>
              <span>•</span>
              <span className="text-slate-500">TL: {problem.timeLimit}</span>
              <span>•</span>
              <span className="text-slate-500">ML: {problem.memoryLimit}</span>
            </div>
          </div>
        </div>

        {/* Right Header Controls */}
        <div className="flex items-center gap-2">
          {topic && (
            <span
              className="hidden md:inline-block text-xs font-bold px-2.5 py-1 rounded-md border"
              style={{
                backgroundColor: topic.bgColor,
                borderColor: topic.borderColor,
                color: topic.color
              }}
            >
              {topic.shortName}
            </span>
          )}

          <button
            onClick={() => {
              toggleBookmark(problem.id);
              onProfileUpdate();
            }}
            className={`p-2 rounded-lg border border-slate-700 transition-colors ${
              isBookmarked ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' : 'bg-slate-800 text-slate-400'
            }`}
            title="Lưu vào danh sách yêu thích"
          >
            <Star className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main Split Layout: 50% Left Problem Statement, 50% Right Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 min-h-0 divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
        {/* LEFT PANE: Problem Statement, Subtasks, Theory, Editorial */}
        <div className="lg:col-span-6 flex flex-col h-full bg-slate-900/50 min-h-0">
          {/* Left Navigation Tabs */}
          <div className="flex items-center gap-1 p-2 bg-slate-900 border-b border-slate-800 overflow-x-auto flex-shrink-0">
            <button
              onClick={() => setLeftTab('statement')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                leftTab === 'statement'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-indigo-400" />
              <span>Đề bài</span>
            </button>

            <button
              onClick={() => setLeftTab('subtasks')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                leftTab === 'subtasks'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-emerald-400" />
              <span>Subtasks & Điểm ({problem.subtasks.length})</span>
            </button>

            <button
              onClick={() => setLeftTab('theory')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                leftTab === 'theory'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-blue-400" />
              <span>Lý thuyết liên quan</span>
            </button>

            <button
              onClick={() => setLeftTab('editorial')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                leftTab === 'editorial'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
              <span>Phân tích & Lời giải</span>
            </button>
          </div>

          {/* Left Content Area */}
          <div className="flex-1 p-5 sm:p-6 overflow-y-auto space-y-6 text-sm text-slate-300 min-h-0">
            {leftTab === 'statement' && (
              <div className="space-y-6">
                {/* Description */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2">
                    Mô tả bài toán
                  </h4>
                  <MathText content={problem.description} className="text-slate-200 text-sm leading-relaxed" />
                </div>

                {/* Input Format */}
                <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Dữ liệu vào (Input)
                  </h4>
                  <MathText content={problem.inputFormat} className="text-slate-300 text-xs sm:text-sm" />
                </div>

                {/* Output Format */}
                <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Kết quả ra (Output)
                  </h4>
                  <MathText content={problem.outputFormat} className="text-slate-300 text-xs sm:text-sm" />
                </div>

                {/* Sample Tests */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                    Ví dụ minh họa
                  </h4>
                  {problem.sampleTests.map((test, idx) => (
                    <div key={idx} className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
                      <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-800 text-xs">
                        {/* Input Box */}
                        <div className="p-3">
                          <div className="flex items-center justify-between text-slate-400 font-semibold mb-1.5">
                            <span>Input ví dụ {idx + 1}</span>
                            <button
                              onClick={() => copyToClipboard(test.input, idx)}
                              className="text-slate-500 hover:text-slate-300 transition-colors p-1"
                              title="Sao chép input"
                            >
                              {copiedIndex === idx ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                          <pre className="font-mono text-slate-200 whitespace-pre-wrap">{test.input}</pre>
                        </div>

                        {/* Output Box */}
                        <div className="p-3 bg-slate-950/40">
                          <div className="text-slate-400 font-semibold mb-1.5">Output ví dụ {idx + 1}</div>
                          <pre className="font-mono text-emerald-400 whitespace-pre-wrap">{test.output}</pre>
                        </div>
                      </div>

                      {test.explanation && (
                        <div className="px-3 py-2 bg-slate-900/60 border-t border-slate-800 text-xs text-slate-400">
                          <span className="font-semibold text-slate-300">Giải thích: </span>
                          {test.explanation}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* PDF Filename Reference */}
                {problem.filename && (
                  <div className="pt-2 text-[11px] text-slate-500 flex items-center gap-1.5">
                    <FileCode className="w-3.5 h-3.5" />
                    <span>Nguồn đề gốc: <code>dethi/{problem.filename}</code></span>
                  </div>
                )}
              </div>
            )}

            {leftTab === 'subtasks' && (
              <div className="space-y-4">
                <div className="bg-indigo-950/30 border border-indigo-500/20 p-4 rounded-xl text-xs text-indigo-300">
                  <h4 className="font-bold text-sm text-indigo-200 mb-1">Cơ chế chấm điểm theo Subtask</h4>
                  Trong kỳ thi Tin học trẻ, bạn không nhất thiết phải làm thuật toán tối ưu full điểm ngay từ đầu. Hãy ưu tiên cài đặt thuật toán Vét cạn (Brute Force) để "ăn chắc" trọn vẹn điểm số của các Subtask đầu (thường chiếm 30 - 50% số điểm) trước khi suy nghĩ thuật toán tối ưu!
                </div>

                <div className="space-y-3">
                  {problem.subtasks.map((sub, idx) => (
                    <div key={idx} className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-sm text-slate-200">{sub.name}</div>
                        <div className="text-xs text-slate-400 mt-0.5">
                          Điều kiện: <code className="text-amber-300">{sub.condition}</code>
                        </div>
                      </div>
                      <div className="px-3 py-1 rounded-lg bg-indigo-500/10 text-indigo-400 font-extrabold text-sm border border-indigo-500/30">
                        {sub.points} điểm
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {leftTab === 'theory' && topic && (
              <div className="space-y-4">
                <div className="bg-slate-950/70 p-5 rounded-2xl border border-slate-800 shadow-inner">
                  <MathText content={topic.coreTheory} />
                </div>
              </div>
            )}

            {leftTab === 'editorial' && (
              <div className="space-y-5">
                <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-xl text-xs text-amber-300 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>
                    Chỉ nên xem lời giải chi tiết sau khi bạn đã cố gắng suy nghĩ ít nhất 15-20 phút hoặc đã AC bài toán!
                  </span>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2">
                    Ý tưởng thuật toán chuẩn
                  </h4>
                  <p className="text-sm text-slate-200 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800">
                    {problem.solutionIdea}
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                      Mã nguồn Python 3 tham khảo
                    </h4>
                    <span className="text-[10px] text-indigo-300 font-semibold bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/30">
                      Khuyên dùng Bảng B
                    </span>
                  </div>
                  <pre className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs font-mono text-indigo-300 overflow-x-auto whitespace-pre">
                    {problem.solutionCodePy}
                  </pre>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Mã nguồn C++ tham khảo
                  </h4>
                  <pre className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs font-mono text-emerald-400 overflow-x-auto whitespace-pre">
                    {problem.solutionCodeCpp}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT PANE: Code Editor / Socratic AI / Problem Variant Generator */}
        <div className="lg:col-span-6 flex flex-col h-full bg-slate-950 min-h-0">
          {/* Right Navigation Tabs & Toolbar */}
          <div className="flex items-center justify-between px-3 py-2 bg-slate-900 border-b border-slate-800 flex-shrink-0">
            {/* View Tabs */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setRightTab('editor')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  rightTab === 'editor'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>Code Editor</span>
              </button>

              <button
                onClick={() => setRightTab('socratic')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  rightTab === 'socratic'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Bot className="w-3.5 h-3.5 text-amber-400" />
                <span>Gia sư Socratic AI</span>
              </button>

              <button
                onClick={() => setRightTab('generator')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  rightTab === 'generator'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>Sinh bài tương tự</span>
              </button>
            </div>

            {/* Language Selector (When in editor tab) */}
            {rightTab === 'editor' && (
              <div className="flex items-center gap-2">
                <select
                  value={language}
                  onChange={e => handleLanguageChange(e.target.value as any)}
                  className="bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-lg px-2.5 py-1 focus:outline-none font-semibold cursor-pointer"
                >
                  <option value="python">🐍 Python 3 (Mặc định)</option>
                  <option value="cpp">⚡ C++20</option>
                </select>

                <button
                  onClick={() =>
                    setCode(language === 'python' ? problem.templateCodePy : problem.templateCodeCpp)
                  }
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                  title="Khôi phục mã mẫu ban đầu"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* RIGHT TAB 1: Monaco Code Editor & Test Runner */}
          {rightTab === 'editor' && (
            <div className="flex-1 flex flex-col min-h-0">
              <div className="flex-1 min-h-[300px]">
                <Editor
                  height="100%"
                  language={language === 'cpp' ? 'cpp' : 'python'}
                  theme="vs-dark"
                  value={code}
                  onChange={value => setCode(value || '')}
                  options={{
                    fontSize: 13,
                    fontFamily: "'Fira Code', 'Courier New', monospace",
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    lineNumbers: 'on',
                    tabSize: 4
                  }}
                />
              </div>

              {/* Bottom Test Result Drawer & Action Buttons */}
              <div className="bg-slate-900 border-t border-slate-800 p-3 flex-shrink-0">
                {/* Result display if run */}
                {runResult && (
                  <div className="mb-3 p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-2 max-h-48 overflow-y-auto">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {runResult.status === 'AC' ? (
                          <span className="flex items-center gap-1 font-bold text-emerald-400">
                            <CheckCircle2 className="w-4 h-4" />
                            Accepted (AC)
                          </span>
                        ) : runResult.status === 'PARTIAL' ? (
                          <span className="flex items-center gap-1 font-bold text-amber-400">
                            <Clock className="w-4 h-4" />
                            Đạt một phần ({runResult.totalScore}/{runResult.maxScore} điểm)
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 font-bold text-rose-400">
                            <XCircle className="w-4 h-4" />
                            {runResult.status === 'WA' ? 'Wrong Answer (WA)' : runResult.status}
                          </span>
                        )}
                      </div>
                      <span className="text-slate-400 font-medium">
                        {runResult.executionTimeMs}ms • {runResult.memoryMb}MB
                      </span>
                    </div>

                    {runResult.compilerMessage && (
                      <div className="text-rose-400 font-mono text-[11px] whitespace-pre-wrap">
                        {runResult.compilerMessage}
                      </div>
                    )}

                    {/* Subtask scores breakdown */}
                    {runResult.subtaskResults.length > 0 && (
                      <div className="space-y-1.5 pt-1 border-t border-slate-800">
                        {runResult.subtaskResults.map((sub, i) => (
                          <div key={i} className="flex items-center justify-between text-[11px]">
                            <span className="text-slate-300 font-medium">{sub.subtaskId}</span>
                            <span className="text-slate-400">{sub.details}</span>
                            <span className={sub.passed ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
                              {sub.score}/{sub.maxScore} đ
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Sample test results */}
                    {runResult.sampleTestResults.length > 0 && (
                      <div className="space-y-1 pt-1 border-t border-slate-800">
                        {runResult.sampleTestResults.map(st => (
                          <div key={st.testIndex} className="flex items-center justify-between text-[11px]">
                            <span className="text-slate-300">Test ví dụ #{st.testIndex}</span>
                            <span className={st.passed ? 'text-emerald-400 font-bold' : 'text-rose-400'}>
                              {st.passed ? 'Chính xác' : 'Sai kết quả (WA)'}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center justify-between gap-3">
                  <button
                    onClick={handleRunSample}
                    disabled={isRunning}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl border border-slate-700 transition-all disabled:opacity-50"
                  >
                    <Play className="w-3.5 h-3.5 text-indigo-400 fill-indigo-400" />
                    <span>Chạy thử Test ví dụ</span>
                  </button>

                  <button
                    onClick={handleSubmit}
                    disabled={isRunning}
                    className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-emerald-600/30 transition-all disabled:opacity-50"
                  >
                    <span>{isRunning ? 'Đang chấm điểm...' : 'Nộp bài chấm điểm (Submit)'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* RIGHT TAB 2: AI Socratic Tutor Chat */}
          {rightTab === 'socratic' && (
            <div className="flex-1 flex flex-col min-h-0 bg-slate-950">
              {/* Socratic Ladder Quick Chips */}
              <div className="p-3 bg-slate-900 border-b border-slate-800 flex-shrink-0">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Bot className="w-3.5 h-3.5 text-amber-400" />
                  <span>Thang gợi ý Socratic 5 bậc (Không spoil đáp án)</span>
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {[1, 2, 3, 4, 5].map(lvl => (
                    <button
                      key={lvl}
                      onClick={() => handleSendMessage(undefined, lvl)}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white border border-slate-700 transition-all"
                    >
                      {lvl === 1 && '1️⃣ Ràng buộc & Thời gian'}
                      {lvl === 2 && '2️⃣ Vét cạn (Ăn điểm Subtask 1)'}
                      {lvl === 3 && '3️⃣ Điểm mấu chốt tối ưu'}
                      {lvl === 4 && '4️⃣ Thiết lập trạng thái'}
                      {lvl === 5 && '5️⃣ Bắt bệnh Edge cases'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Messages Stream */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4 min-h-0 text-xs sm:text-sm">
                {chatMessages.map(msg => (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-2.5 ${
                      msg.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {msg.sender === 'assistant' && (
                      <div className="w-7 h-7 rounded-lg bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center flex-shrink-0 mt-0.5 text-indigo-300">
                        <Bot className="w-4 h-4" />
                      </div>
                    )}

                    <div
                      className={`max-w-[85%] rounded-2xl p-3.5 leading-relaxed shadow-sm ${
                        msg.sender === 'user'
                          ? 'bg-indigo-600 text-white rounded-tr-none'
                          : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'
                      }`}
                    >
                      <MathText content={msg.content} />
                    </div>

                    {msg.sender === 'user' && (
                      <div className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center flex-shrink-0 mt-0.5 text-slate-300">
                        <User className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                ))}
                <div ref={chatBottomRef} />
              </div>

              {/* Chat Input Bar */}
              <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2 flex-shrink-0">
                <input
                  type="text"
                  placeholder="Hỏi thầy: 'Tại sao bị TLE?', 'Gợi ý cách tiếp cận'..."
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
                <button
                  onClick={() => handleSendMessage()}
                  className="p-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-md transition-all"
                  title="Gửi câu hỏi"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* RIGHT TAB 3: AI Problem Variant Generator */}
          {rightTab === 'generator' && (
            <div className="flex-1 p-5 overflow-y-auto space-y-6 min-h-0 bg-slate-950">
              <div className="bg-gradient-to-r from-purple-950/60 to-indigo-950/60 border border-purple-500/30 p-5 rounded-2xl">
                <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-wider mb-2">
                  <Sparkles className="w-4 h-4" />
                  <span>AI Problem Generator</span>
                </div>
                <h3 className="text-base font-extrabold text-white mb-1">
                  Sinh bài tập biến thể cùng dạng bài
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  Hệ thống AI sẽ tạo một bài toán mới có <strong>cùng mô hình thuật toán</strong> với bài{' '}
                  <strong>{problem.code}</strong>, nhưng thay đổi bối cảnh, câu chuyện và ràng buộc để giúp bạn thử thách sự thấu hiểu bản chất bài toán!
                </p>

                <button
                  onClick={handleGenerateVariant}
                  disabled={isGenerating}
                  className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-purple-600/30 transition-all disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{isGenerating ? 'AI đang sinh đề bài mới...' : 'Sinh bài toán biến thể mới'}</span>
                </button>
              </div>

              {generatedVariant && (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 animate-fadeIn">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div>
                      <div className="text-xs font-extrabold text-purple-400">{generatedVariant.code}</div>
                      <div className="text-sm font-bold text-white">{generatedVariant.title}</div>
                    </div>
                    <button
                      onClick={() => onSelectProblem(generatedVariant)}
                      className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-all shadow-md"
                    >
                      Làm bài này ngay
                    </button>
                  </div>

                  <div className="text-xs text-slate-300 space-y-2">
                    <MathText content={generatedVariant.description} />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
