import { UserProfile, UserSubmission, Problem, TopicId, ChatMessage } from '../types';
import { PROBLEMS } from '../data/problemsData';
import { TOPICS } from '../data/taxonomyData';

const STORAGE_KEY = 'thtb_user_profile_v1';

export const DEFAULT_PROFILE: UserProfile = {
  id: 'student-thtb-01',
  name: 'Nguyễn Văn Minh',
  avatar: '👨‍💻',
  school: 'THCS Lê Quý Đôn',
  grade: 'Lớp 8',
  target: 'Giải Nhất Tin Học Trẻ Bảng B Toàn Quốc',
  streak: 5,
  lastActiveDate: new Date().toISOString().split('T')[0],
  solvedProblemIds: ['24tht-calexp', '25kv-bnum', 'tht2022-mn-chianhom'],
  partialProblemIds: ['tht2023-kv-daysotongk', '25kv-bonus'],
  bookmarkedIds: ['25kv-cakes', 'tht24ck-chiaday'],
  submissions: [
    {
      id: 'sub-001',
      problemId: '24tht-calexp',
      language: 'cpp',
      code: '#include <iostream>\nusing namespace std;\nint main() {\n    long long x, y;\n    if (cin >> x >> y) cout << x*x + y*y + x*y << endl;\n    return 0;\n}',
      status: 'AC',
      score: 100,
      maxScore: 100,
      timestamp: Date.now() - 86400000 * 2,
      subtaskResults: [
        { subtaskId: 'Subtask 1', passed: true, score: 50, maxScore: 50 },
        { subtaskId: 'Subtask 2', passed: true, score: 50, maxScore: 50 }
      ]
    },
    {
      id: 'sub-002',
      problemId: '25kv-bnum',
      language: 'cpp',
      code: '// BNUM solution\n#include <iostream>\nusing namespace std;\nint main() { cout << \"YES\\n\"; return 0; }',
      status: 'AC',
      score: 100,
      maxScore: 100,
      timestamp: Date.now() - 86400000 * 1,
      subtaskResults: [
        { subtaskId: 'Subtask 1', passed: true, score: 50, maxScore: 50 },
        { subtaskId: 'Subtask 2', passed: true, score: 50, maxScore: 50 }
      ]
    },
    {
      id: 'sub-003',
      problemId: '25kv-bonus',
      language: 'cpp',
      code: '// Brute force bonus\n#include <iostream>\nusing namespace std;\nint main() { cout << 12 << endl; return 0; }',
      status: 'PARTIAL',
      score: 30,
      maxScore: 100,
      timestamp: Date.now() - 3600000 * 4,
      subtaskResults: [
        { subtaskId: 'Subtask 1', passed: true, score: 30, maxScore: 30 },
        { subtaskId: 'Subtask 2', passed: false, score: 0, maxScore: 70, details: 'Time Limit Exceeded ở N = 10^5' }
      ]
    }
  ],
  aiChats: {}
};

export function getUserProfile(): UserProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      saveUserProfile(DEFAULT_PROFILE);
      return DEFAULT_PROFILE;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_PROFILE;
  }
}

export function saveUserProfile(profile: UserProfile): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch (e) {
    console.error('Error saving user profile to localStorage', e);
  }
}

export function recordSubmission(
  problemId: string,
  language: 'cpp' | 'python',
  code: string,
  score: number,
  maxScore: number,
  subtaskResults: { subtaskId: string; passed: boolean; score: number; maxScore: number; details?: string }[]
): UserSubmission {
  const profile = getUserProfile();
  const status = score === maxScore ? 'AC' : score > 0 ? 'PARTIAL' : 'WA';
  
  const newSubmission: UserSubmission = {
    id: 'sub-' + Date.now(),
    problemId,
    language,
    code,
    status,
    score,
    maxScore,
    timestamp: Date.now(),
    subtaskResults
  };

  profile.submissions.unshift(newSubmission);

  if (status === 'AC') {
    if (!profile.solvedProblemIds.includes(problemId)) {
      profile.solvedProblemIds.push(problemId);
    }
    // Remove from partial if now full AC
    profile.partialProblemIds = profile.partialProblemIds.filter(id => id !== problemId);
  } else if (status === 'PARTIAL') {
    if (!profile.solvedProblemIds.includes(problemId) && !profile.partialProblemIds.includes(problemId)) {
      profile.partialProblemIds.push(problemId);
    }
  }

  // Update streak if needed
  const today = new Date().toISOString().split('T')[0];
  if (profile.lastActiveDate !== today) {
    profile.streak += 1;
    profile.lastActiveDate = today;
  }

  saveUserProfile(profile);
  return newSubmission;
}

export function toggleBookmark(problemId: string): boolean {
  const profile = getUserProfile();
  const index = profile.bookmarkedIds.indexOf(problemId);
  let isBookmarked = false;
  if (index >= 0) {
    profile.bookmarkedIds.splice(index, 1);
  } else {
    profile.bookmarkedIds.push(problemId);
    isBookmarked = true;
  }
  saveUserProfile(profile);
  return isBookmarked;
}

export interface TopicStat {
  topicId: TopicId;
  name: string;
  shortName: string;
  color: string;
  totalProblems: number;
  solvedCount: number;
  partialCount: number;
  masteryScore: number; // 0 to 100
}

export function getRadarTopicStats(): TopicStat[] {
  const profile = getUserProfile();
  
  return TOPICS.map(topic => {
    const topicProblems = PROBLEMS.filter(p => p.topicId === topic.id);
    const total = topicProblems.length;
    if (total === 0) {
      return {
        topicId: topic.id,
        name: topic.name,
        shortName: topic.shortName,
        color: topic.color,
        totalProblems: 0,
        solvedCount: 0,
        partialCount: 0,
        masteryScore: 0
      };
    }

    let totalScoreObtained = 0;
    let solvedCount = 0;
    let partialCount = 0;

    topicProblems.forEach(p => {
      if (profile.solvedProblemIds.includes(p.id)) {
        solvedCount++;
        totalScoreObtained += 100;
      } else if (profile.partialProblemIds.includes(p.id)) {
        partialCount++;
        totalScoreObtained += 40; // Partial credit
      }
    });

    const masteryScore = Math.min(100, Math.round((totalScoreObtained / (total * 100)) * 100));

    return {
      topicId: topic.id,
      name: topic.name,
      shortName: topic.shortName,
      color: topic.color,
      totalProblems: total,
      solvedCount,
      partialCount,
      masteryScore
    };
  });
}

export function getRecommendedProblem(): Problem | null {
  const profile = getUserProfile();
  const stats = getRadarTopicStats();
  
  // Sort topics by lowest mastery score
  const sortedStats = [...stats].sort((a, b) => a.masteryScore - b.masteryScore);
  
  for (const topicStat of sortedStats) {
    const candidate = PROBLEMS.find(
      p => p.topicId === topicStat.topicId && !profile.solvedProblemIds.includes(p.id)
    );
    if (candidate) return candidate;
  }

  // Fallback to any unsolved problem
  return PROBLEMS.find(p => !profile.solvedProblemIds.includes(p.id)) || PROBLEMS[0];
}

export function getProblemChat(problemId: string): ChatMessage[] {
  const profile = getUserProfile();
  return profile.aiChats[problemId] || [];
}

export function saveProblemChat(problemId: string, messages: ChatMessage[]): void {
  const profile = getUserProfile();
  profile.aiChats[problemId] = messages;
  saveUserProfile(profile);
}
