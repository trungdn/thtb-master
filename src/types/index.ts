export type TopicId = 
  | 'number-theory'
  | 'arrays-pointers'
  | 'binary-search'
  | 'dynamic-programming'
  | 'greedy-sorting'
  | 'strings'
  | 'backtracking'
  | 'graphs-ds';

export type Difficulty = 'Dễ' | 'Trung bình' | 'Khó';

export interface Topic {
  id: TopicId;
  name: string;
  shortName: string;
  description: string;
  frequency: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: string;
  coreTheory: string;
  level: 'Cơ bản' | 'Trung bình' | 'Nâng cao';
  tags: string[];
}

export interface Subtask {
  name: string;
  points: number;
  condition: string;
}

export interface SampleTest {
  input: string;
  output: string;
  explanation?: string;
}

export interface SocraticHint {
  level: 1 | 2 | 3 | 4 | 5;
  title: string;
  question: string;
  guidance: string;
  codeSnippet?: string;
}

export interface Problem {
  id: string;
  code: string;
  title: string;
  contest: string;
  year: number;
  topicId: TopicId;
  difficulty: Difficulty;
  timeLimit: string;
  memoryLimit: string;
  description: string;
  inputFormat: string;
  outputFormat: string;
  subtasks: Subtask[];
  sampleTests: SampleTest[];
  hints: SocraticHint[];
  solutionIdea: string;
  solutionCodeCpp: string;
  solutionCodePy: string;
  templateCodeCpp: string;
  templateCodePy: string;
  isAIGenerated?: boolean;
  originalProblemId?: string;
  filename?: string;
}

export interface SubtaskResult {
  subtaskId: string;
  passed: boolean;
  score: number;
  maxScore: number;
  details?: string;
}

export interface UserSubmission {
  id: string;
  problemId: string;
  language: 'cpp' | 'python';
  code: string;
  status: 'AC' | 'WA' | 'TLE' | 'MLE' | 'CE' | 'PARTIAL';
  score: number;
  maxScore: number;
  timestamp: number;
  executionTimeMs?: number;
  memoryKb?: number;
  subtaskResults: SubtaskResult[];
}

export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  school: string;
  grade: string;
  target: string;
  streak: number;
  lastActiveDate: string;
  solvedProblemIds: string[];
  partialProblemIds: string[];
  bookmarkedIds: string[];
  submissions: UserSubmission[];
  aiChats: Record<string, ChatMessage[]>;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  hintLevel?: number;
}
