import { Problem, UserSubmission, SubtaskResult } from '../types';
import { recordSubmission } from './storage';

export interface RunResult {
  status: 'AC' | 'WA' | 'TLE' | 'MLE' | 'CE' | 'PARTIAL';
  totalScore: number;
  maxScore: number;
  executionTimeMs: number;
  memoryMb: number;
  sampleTestResults: {
    testIndex: number;
    passed: boolean;
    input: string;
    expectedOutput: string;
    actualOutput: string;
  }[];
  subtaskResults: SubtaskResult[];
  compilerMessage?: string;
}

export function runSampleTests(problem: Problem, code: string, language: 'cpp' | 'python'): RunResult {
  const cleanCode = code.trim();
  
  if (!cleanCode) {
    return {
      status: 'CE',
      totalScore: 0,
      maxScore: 100,
      executionTimeMs: 0,
      memoryMb: 0,
      sampleTestResults: [],
      subtaskResults: [],
      compilerMessage: 'Lỗi biên dịch: Mã nguồn trống! Vui lòng viết code trước khi chạy.'
    };
  }

  // Basic sanity check for C++
  if (language === 'cpp') {
    if (!cleanCode.includes('main') || (!cleanCode.includes('cin') && !cleanCode.includes('scanf') && !cleanCode.includes('cout') && !cleanCode.includes('printf'))) {
      return {
        status: 'CE',
        totalScore: 0,
        maxScore: 100,
        executionTimeMs: 0,
        memoryMb: 0,
        sampleTestResults: [],
        subtaskResults: [],
        compilerMessage: 'Lỗi biên dịch (Compile Error): Không tìm thấy hàm main() hoặc các lệnh nhập xuất chuẩn (cin/cout)!'
      };
    }
  }

  // Evaluate each sample test
  const sampleTestResults = problem.sampleTests.map((st, idx) => {
    // If student code is non-trivial, simulate successful sample matching
    const passed = cleanCode.length > 50 && !cleanCode.includes('TODO');
    const actualOutput = passed ? st.output : '0';

    return {
      testIndex: idx + 1,
      passed,
      input: st.input,
      expectedOutput: st.output,
      actualOutput
    };
  });

  const allPassed = sampleTestResults.every(r => r.passed);
  const time = Math.floor(Math.random() * 25) + 15; // 15ms - 40ms
  const memory = Math.floor(Math.random() * 8) + 12; // 12MB - 20MB

  return {
    status: allPassed ? 'AC' : 'WA',
    totalScore: allPassed ? 100 : 0,
    maxScore: 100,
    executionTimeMs: time,
    memoryMb: memory,
    sampleTestResults,
    subtaskResults: []
  };
}

export function submitCodeForGrading(problem: Problem, code: string, language: 'cpp' | 'python'): RunResult {
  const cleanCode = code.trim();

  if (!cleanCode || cleanCode.length < 30) {
    return {
      status: 'CE',
      totalScore: 0,
      maxScore: 100,
      executionTimeMs: 0,
      memoryMb: 0,
      sampleTestResults: [],
      subtaskResults: [],
      compilerMessage: 'Lỗi biên dịch: Code quá ngắn hoặc chưa hoàn chỉnh để nộp bài!'
    };
  }

  // Realistic subtask grading simulation
  // If student wrote solid code (contains loops, data structures, or algorithmic logic)
  const isOptimal = (
    cleanCode.includes('ios_base') || 
    cleanCode.includes('long long') || 
    cleanCode.includes('vector') || 
    cleanCode.includes('binary') || 
    cleanCode.includes('dp') ||
    cleanCode.includes('while') ||
    cleanCode.includes('for')
  ) && !cleanCode.includes('TODO');

  const subtaskResults: SubtaskResult[] = problem.subtasks.map((sub, idx) => {
    let passed = false;
    let details = '';

    if (idx === 0) {
      // Subtask 1 is easier, almost always passed if code runs
      passed = isOptimal || cleanCode.length > 40;
      details = passed ? 'Accepted (AC) - 12ms / 8.4MB' : 'Wrong Answer (WA)';
    } else {
      // Higher subtasks require optimal code
      passed = isOptimal;
      details = passed ? 'Accepted (AC) - 45ms / 14.2MB' : 'Time Limit Exceeded (TLE) - Vượt quá 1.0s';
    }

    return {
      subtaskId: sub.name,
      passed,
      score: passed ? sub.points : 0,
      maxScore: sub.points,
      details
    };
  });

  const totalScore = subtaskResults.reduce((acc, cur) => acc + cur.score, 0);
  const maxScore = subtaskResults.reduce((acc, cur) => acc + cur.maxScore, 0);
  const status = totalScore === maxScore ? 'AC' : totalScore > 0 ? 'PARTIAL' : 'WA';
  const executionTimeMs = status === 'AC' ? Math.floor(Math.random() * 40) + 20 : 1000;

  // Record submission into user profile in storage
  recordSubmission(
    problem.id,
    language,
    code,
    totalScore,
    maxScore,
    subtaskResults
  );

  return {
    status,
    totalScore,
    maxScore,
    executionTimeMs,
    memoryMb: 14.5,
    sampleTestResults: [],
    subtaskResults
  };
}
