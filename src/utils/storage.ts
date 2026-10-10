import { UserProfile, UserSubmission, Problem, TopicId, ChatMessage } from '../types';
import { PROBLEMS } from '../data/problemsData';
import { TOPICS } from '../data/taxonomyData';

const ACCOUNTS_KEY = 'thtb_accounts_v2';
const ACTIVE_USERNAME_KEY = 'thtb_active_username_v2';

export const GUEST_PROFILE: UserProfile = {
  id: 'guest',
  username: 'khach',
  name: 'Học viên Khách',
  avatar: '👤',
  school: 'Chưa cập nhật',
  grade: 'Lớp 8',
  target: 'Rèn luyện Tin Học Trẻ Bảng B',
  streak: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
  solvedProblemIds: [],
  partialProblemIds: [],
  bookmarkedIds: [],
  submissions: [],
  aiChats: {}
};

export const SAMPLE_ACCOUNT: UserProfile = {
  id: 'user-sample-01',
  username: 'demo_thcs',
  name: 'Nguyễn Văn Minh',
  avatar: '👨‍💻',
  school: 'THCS Lê Quý Đôn',
  grade: 'Lớp 8',
  target: 'Giải Nhất Tin Học Trẻ Bảng B Toàn Quốc',
  streak: 5,
  lastActiveDate: new Date().toISOString().split('T')[0],
  createdAt: Date.now() - 86400000 * 10,
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

/** Lấy danh sách tất cả tài khoản đã lưu trên máy */
export function getAllAccounts(): Record<string, UserProfile> {
  try {
    const raw = localStorage.getItem(ACCOUNTS_KEY);
    if (!raw) {
      // Khởi tạo sẵn tài khoản mẫu demo để học sinh tham khảo nếu muốn
      const initial: Record<string, UserProfile> = {
        [SAMPLE_ACCOUNT.username]: SAMPLE_ACCOUNT
      };
      localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch {
    return { [SAMPLE_ACCOUNT.username]: SAMPLE_ACCOUNT };
  }
}

/** Lưu danh sách tài khoản */
function saveAllAccounts(accounts: Record<string, UserProfile>): void {
  try {
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
  } catch (e) {
    console.error('Lỗi lưu danh sách tài khoản vào localStorage', e);
  }
}

/** Lấy tên đăng nhập của tài khoản đang active */
export function getActiveUsername(): string | null {
  try {
    return localStorage.getItem(ACTIVE_USERNAME_KEY);
  } catch {
    return null;
  }
}

/** Đặt tài khoản đang active */
export function setActiveUsername(username: string | null): void {
  try {
    if (username) {
      localStorage.setItem(ACTIVE_USERNAME_KEY, username);
    } else {
      localStorage.removeItem(ACTIVE_USERNAME_KEY);
    }
  } catch (e) {
    console.error('Lỗi đặt active username', e);
  }
}

/** Kiểm tra đã đăng nhập chưa */
export function isLoggedIn(): boolean {
  const activeUser = getActiveUsername();
  if (!activeUser) return false;
  const accounts = getAllAccounts();
  return Boolean(accounts[activeUser]);
}

/** Lấy hồ sơ người dùng hiện tại (nếu chưa đăng nhập, trả về GUEST_PROFILE) */
export function getUserProfile(): UserProfile {
  const activeUsername = getActiveUsername();
  const accounts = getAllAccounts();

  if (activeUsername && accounts[activeUsername]) {
    return accounts[activeUsername];
  }

  // Nếu chưa đăng nhập, thử tìm tài khoản đầu tiên hoặc trả về Guest
  return GUEST_PROFILE;
}

/** Lưu cập nhật hồ sơ người dùng hiện tại */
export function saveUserProfile(profile: UserProfile): void {
  const accounts = getAllAccounts();
  accounts[profile.username] = profile;
  saveAllAccounts(accounts);
  setActiveUsername(profile.username);
}

/** Đăng ký tài khoản mới */
export function registerAccount(data: {
  username: string;
  password?: string;
  name: string;
  school: string;
  grade: string;
  target: string;
  avatar: string;
}): { success: boolean; error?: string; user?: UserProfile } {
  const cleanUsername = data.username.trim().toLowerCase();
  if (!cleanUsername) {
    return { success: false, error: 'Tên đăng nhập không được để trống!' };
  }
  if (!/^[a-z0-9_]{3,20}$/.test(cleanUsername)) {
    return {
      success: false,
      error: 'Tên đăng nhập từ 3-20 ký tự, chỉ gồm chữ thường không dấu, số và gạch dưới (_).'
    };
  }

  const accounts = getAllAccounts();
  if (accounts[cleanUsername]) {
    return { success: false, error: 'Tên đăng nhập này đã tồn tại trên thiết bị. Vui lòng chọn tên khác!' };
  }

  const newProfile: UserProfile = {
    id: 'user-' + Date.now(),
    username: cleanUsername,
    password: data.password || '',
    name: data.name.trim() || cleanUsername,
    school: data.school.trim() || 'Chưa cập nhật',
    grade: data.grade || 'Lớp 8',
    target: data.target.trim() || 'Rèn luyện Tin Học Trẻ Bảng B',
    avatar: data.avatar || '👨‍💻',
    streak: 1,
    lastActiveDate: new Date().toISOString().split('T')[0],
    createdAt: Date.now(),
    solvedProblemIds: [],
    partialProblemIds: [],
    bookmarkedIds: [],
    submissions: [],
    aiChats: {}
  };

  accounts[cleanUsername] = newProfile;
  saveAllAccounts(accounts);
  setActiveUsername(cleanUsername);

  return { success: true, user: newProfile };
}

/** Đăng nhập tài khoản */
export function loginAccount(
  username: string,
  password?: string
): { success: boolean; error?: string; user?: UserProfile } {
  const cleanUsername = username.trim().toLowerCase();
  const accounts = getAllAccounts();
  const user = accounts[cleanUsername];

  if (!user) {
    return { success: false, error: 'Không tìm thấy tài khoản với tên đăng nhập này!' };
  }

  if (user.password && user.password !== password) {
    return { success: false, error: 'Mật khẩu không chính xác. Vui lòng thử lại!' };
  }

  // Cập nhật streak nếu đăng nhập ngày mới
  const today = new Date().toISOString().split('T')[0];
  if (user.lastActiveDate !== today) {
    user.streak += 1;
    user.lastActiveDate = today;
    saveUserProfile(user);
  }

  setActiveUsername(cleanUsername);
  return { success: true, user };
}

/** Đăng xuất về chế độ Guest */
export function logoutAccount(): void {
  setActiveUsername(null);
}

/** Chuyển đổi nhanh tài khoản */
export function switchAccount(username: string): boolean {
  const accounts = getAllAccounts();
  if (accounts[username]) {
    setActiveUsername(username);
    return true;
  }
  return false;
}

/** Ghi nhận bài nộp */
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
    profile.partialProblemIds = profile.partialProblemIds.filter(id => id !== problemId);
  } else if (status === 'PARTIAL') {
    if (!profile.solvedProblemIds.includes(problemId) && !profile.partialProblemIds.includes(problemId)) {
      profile.partialProblemIds.push(problemId);
    }
  }

  const today = new Date().toISOString().split('T')[0];
  if (profile.lastActiveDate !== today) {
    profile.streak += 1;
    profile.lastActiveDate = today;
  }

  saveUserProfile(profile);
  return newSubmission;
}

/** Đánh dấu yêu thích bài tập */
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
  masteryScore: number;
}

/** Thống kê độ thành thạo 8 dạng bài cho tài khoản hiện tại */
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
        totalScoreObtained += 40;
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

/** Gợi ý bài tiếp theo dựa trên dạng bài yếu nhất của tài khoản hiện tại */
export function getRecommendedProblem(): Problem | null {
  const profile = getUserProfile();
  const stats = getRadarTopicStats();

  const sortedStats = [...stats].sort((a, b) => a.masteryScore - b.masteryScore);

  for (const topicStat of sortedStats) {
    const candidate = PROBLEMS.find(
      p => p.topicId === topicStat.topicId && !profile.solvedProblemIds.includes(p.id)
    );
    if (candidate) return candidate;
  }

  return PROBLEMS.find(p => !profile.solvedProblemIds.includes(p.id)) || PROBLEMS[0];
}

/** Lưu và lấy lịch sử chat Socratic của tài khoản */
export function getProblemChat(problemId: string): ChatMessage[] {
  const profile = getUserProfile();
  return profile.aiChats[problemId] || [];
}

export function saveProblemChat(problemId: string, messages: ChatMessage[]): void {
  const profile = getUserProfile();
  profile.aiChats[problemId] = messages;
  saveUserProfile(profile);
}
