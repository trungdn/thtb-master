import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { UserProfile, UserSubmission } from '../types';

// Hỗ trợ cả biến môi trường Vercel (VITE_*) lẫn cấu hình nhập tay trực tiếp trên giao diện
const LOCAL_CONFIG_KEY = 'thtb_supabase_config';

export interface SupabaseConfig {
  url: string;
  anonKey: string;
}

export function getSupabaseConfig(): SupabaseConfig | null {
  // 1. Kiểm tra biến môi trường Vite (.env hoặc Vercel Environment Variables)
  const envUrl = import.meta.env.VITE_SUPABASE_URL;
  const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (envUrl && envKey && !envUrl.includes('your-project')) {
    return { url: envUrl, anonKey: envKey };
  }

  // 2. Kiểm tra cấu hình do thầy/học sinh nhập trực tiếp trong giao diện cài đặt
  try {
    const local = localStorage.getItem(LOCAL_CONFIG_KEY);
    if (local) {
      const parsed = JSON.parse(local);
      if (parsed.url && parsed.anonKey) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Lỗi đọc supabase config từ local', e);
  }

  return null;
}

export function saveSupabaseConfig(url: string, anonKey: string): void {
  try {
    localStorage.setItem(LOCAL_CONFIG_KEY, JSON.stringify({ url: url.trim(), anonKey: anonKey.trim() }));
  } catch (e) {
    console.error('Lỗi lưu supabase config', e);
  }
}

export function clearSupabaseConfig(): void {
  try {
    localStorage.removeItem(LOCAL_CONFIG_KEY);
  } catch (e) {
    console.error('Lỗi xóa supabase config', e);
  }
}

// Khởi tạo Supabase client (singleton)
let supabaseClient: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  const config = getSupabaseConfig();
  if (!config) return null;

  if (!supabaseClient) {
    supabaseClient = createClient(config.url, config.anonKey);
  }
  return supabaseClient;
}

export function isSupabaseConnected(): boolean {
  return Boolean(getSupabase());
}

/** Chuyển đổi dữ liệu bảng Supabase sang UserProfile */
function mapRowToUserProfile(row: any): UserProfile {
  return {
    id: row.id,
    username: row.username,
    password: row.password || '',
    name: row.name,
    school: row.school || 'Chưa cập nhật',
    grade: row.grade || 'Lớp 8',
    target: row.target || 'Rèn luyện Tin Học Trẻ Bảng B',
    avatar: row.avatar || '👨‍💻',
    streak: row.streak || 1,
    lastActiveDate: row.last_active_date || new Date().toISOString().split('T')[0],
    createdAt: row.created_at ? new Date(row.created_at).getTime() : Date.now(),
    solvedProblemIds: row.solved_problem_ids || [],
    partialProblemIds: row.partial_problem_ids || [],
    bookmarkedIds: row.bookmarked_ids || [],
    submissions: [], // Sẽ load riêng khi cần
    aiChats: {}
  };
}

/** Đăng ký học sinh mới lên Supabase */
export async function registerToSupabase(profile: UserProfile): Promise<{ success: boolean; error?: string }> {
  const supabase = getSupabase();
  if (!supabase) return { success: false, error: 'Chưa cấu hình Supabase Cloud Database' };

  try {
    // Kiểm tra xem username đã tồn tại chưa
    const { data: existing } = await supabase
      .from('profiles')
      .select('username')
      .eq('username', profile.username)
      .maybeSingle();

    if (existing) {
      return { success: false, error: 'Tên đăng nhập này đã có học sinh sử dụng trên hệ thống toàn quốc!' };
    }

    const { error } = await supabase.from('profiles').insert({
      id: profile.id,
      username: profile.username,
      password: profile.password || '',
      name: profile.name,
      school: profile.school,
      grade: profile.grade,
      target: profile.target,
      avatar: profile.avatar,
      streak: profile.streak,
      last_active_date: profile.lastActiveDate,
      solved_problem_ids: profile.solvedProblemIds,
      partial_problem_ids: profile.partialProblemIds,
      bookmarked_ids: profile.bookmarkedIds
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Lỗi kết nối Supabase' };
  }
}

/** Đăng nhập học sinh từ Supabase */
export async function loginFromSupabase(
  username: string,
  password?: string
): Promise<{ success: boolean; error?: string; user?: UserProfile }> {
  const supabase = getSupabase();
  if (!supabase) return { success: false, error: 'Chưa cấu hình Supabase Cloud Database' };

  try {
    const cleanUsername = username.trim().toLowerCase();
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('username', cleanUsername)
      .maybeSingle();

    if (error) {
      return { success: false, error: error.message };
    }

    if (!data) {
      return { success: false, error: 'Không tìm thấy tài khoản học sinh này trên hệ thống!' };
    }

    if (data.password && data.password !== password) {
      return { success: false, error: 'Mật khẩu không chính xác. Vui lòng kiểm tra lại!' };
    }

    // Tải kèm submissions của học sinh
    const { data: subsData } = await supabase
      .from('submissions')
      .select('*')
      .eq('username', cleanUsername)
      .order('created_at', { ascending: false });

    const userProfile = mapRowToUserProfile(data);
    if (subsData) {
      userProfile.submissions = subsData.map(s => ({
        id: s.id,
        problemId: s.problem_id,
        language: s.language as 'cpp' | 'python',
        code: s.code,
        status: s.status as any,
        score: s.score,
        maxScore: s.max_score,
        timestamp: new Date(s.created_at).getTime(),
        subtaskResults: s.subtask_results || []
      }));
    }

    return { success: true, user: userProfile };
  } catch (err: any) {
    return { success: false, error: err.message || 'Lỗi kết nối Supabase' };
  }
}

/** Đồng bộ cập nhật hồ sơ (bài giải, chuỗi ngày) lên Supabase */
export async function syncProfileToSupabase(profile: UserProfile): Promise<boolean> {
  const supabase = getSupabase();
  if (!supabase || profile.id === 'guest') return false;

  try {
    const { error } = await supabase
      .from('profiles')
      .update({
        name: profile.name,
        school: profile.school,
        grade: profile.grade,
        target: profile.target,
        avatar: profile.avatar,
        streak: profile.streak,
        last_active_date: profile.lastActiveDate,
        solved_problem_ids: profile.solvedProblemIds,
        partial_problem_ids: profile.partialProblemIds,
        bookmarked_ids: profile.bookmarkedIds,
        updated_at: new Date().toISOString()
      })
      .eq('username', profile.username);

    if (error) {
      console.warn('Lỗi syncProfileToSupabase:', error.message);
      return false;
    }
    return true;
  } catch (e) {
    console.warn('Lỗi kết nối syncProfileToSupabase:', e);
    return false;
  }
}

/** Lưu bài nộp mới lên bảng submissions của Supabase */
export async function recordSubmissionToSupabase(
  username: string,
  submission: UserSubmission
): Promise<boolean> {
  const supabase = getSupabase();
  if (!supabase || username === 'khach') return false;

  try {
    const { error } = await supabase.from('submissions').insert({
      id: submission.id,
      username: username,
      problem_id: submission.problemId,
      language: submission.language,
      code: submission.code,
      status: submission.status,
      score: submission.score,
      max_score: submission.maxScore,
      subtask_results: submission.subtaskResults,
      created_at: new Date(submission.timestamp).toISOString()
    });

    if (error) {
      console.warn('Lỗi recordSubmissionToSupabase:', error.message);
      return false;
    }
    return true;
  } catch (e) {
    console.warn('Lỗi kết nối recordSubmissionToSupabase:', e);
    return false;
  }
}

/** [Dành cho Giáo viên / Admin]: Lấy danh sách toàn bộ học sinh để theo dõi */
export async function fetchAllStudentsForTeacher(): Promise<{
  success: boolean;
  students: UserProfile[];
  error?: string;
}> {
  const supabase = getSupabase();
  if (!supabase) {
    return { success: false, students: [], error: 'Chưa cấu hình kết nối Supabase Cloud' };
  }

  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return { success: false, students: [], error: error.message };
    }

    const students = (data || []).map(row => mapRowToUserProfile(row));
    // Sắp xếp theo số lượng bài AC nhiều nhất lên đầu
    students.sort((a, b) => b.solvedProblemIds.length - a.solvedProblemIds.length);

    return { success: true, students };
  } catch (err: any) {
    return { success: false, students: [], error: err.message || 'Lỗi kết nối Supabase' };
  }
}

/** [Dành cho Giáo viên / Admin]: Xem lịch sử nộp bài & xem code của 1 học sinh */
export async function fetchStudentSubmissions(username: string): Promise<UserSubmission[]> {
  const supabase = getSupabase();
  if (!supabase) return [];

  try {
    const { data, error } = await supabase
      .from('submissions')
      .select('*')
      .eq('username', username)
      .order('created_at', { ascending: false });

    if (error || !data) return [];

    return data.map(s => ({
      id: s.id,
      problemId: s.problem_id,
      language: s.language as 'cpp' | 'python',
      code: s.code,
      status: s.status as any,
      score: s.score,
      maxScore: s.max_score,
      timestamp: new Date(s.created_at).getTime(),
      subtaskResults: s.subtask_results || []
    }));
  } catch {
    return [];
  }
}
