import React, { useState, useEffect } from 'react';
import { UserProfile, UserSubmission } from '../types';
import { PROBLEMS } from '../data/problemsData';
import {
  fetchAllStudentsForTeacher,
  fetchStudentSubmissions,
  isSupabaseConnected,
  getSupabaseConfig,
  saveSupabaseConfig,
  clearSupabaseConfig
} from '../services/supabase';
import { getAllAccounts } from '../utils/storage';
import {
  Users,
  Trophy,
  Flame,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  Code2,
  RefreshCw,
  Database,
  ExternalLink,
  ChevronRight,
  X,
  FileCode,
  ShieldCheck,
  AlertTriangle,
  School,
  Sparkles
} from 'lucide-react';

interface TeacherDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProblem?: (problemId: string) => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  isOpen,
  onClose,
  onSelectProblem
}) => {
  if (!isOpen) return null;

  const [students, setStudents] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<UserProfile | null>(null);
  const [studentSubmissions, setStudentSubmissions] = useState<UserSubmission[]>([]);
  const [isLoadingSubs, setIsLoadingSubs] = useState(false);
  const [viewingSubmission, setViewingSubmission] = useState<UserSubmission | null>(null);

  // Cấu hình Supabase nhanh
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const currentConfig = getSupabaseConfig();
  const [supabaseUrl, setSupabaseUrl] = useState(currentConfig?.url || '');
  const [supabaseKey, setSupabaseKey] = useState(currentConfig?.anonKey || '');
  const [configSuccess, setConfigSuccess] = useState(false);

  const isConnected = isSupabaseConnected();

  // Load danh sách học sinh
  const loadStudents = async () => {
    setIsLoading(true);
    if (isSupabaseConnected()) {
      const res = await fetchAllStudentsForTeacher();
      if (res.success && res.students.length > 0) {
        setStudents(res.students);
        setIsLoading(false);
        return;
      }
    }

    // Nếu chưa có Supabase hoặc chưa có dữ liệu cloud, nạp tài khoản lưu trên máy local
    const localAccounts = Object.values(getAllAccounts()).filter(a => a.id !== 'guest');
    localAccounts.sort((a, b) => b.solvedProblemIds.length - a.solvedProblemIds.length);
    setStudents(localAccounts);
    setIsLoading(false);
  };

  useEffect(() => {
    loadStudents();
  }, [isConnected]);

  // Khi chọn 1 học sinh để xem chi tiết
  const handleSelectStudent = async (st: UserProfile) => {
    setSelectedStudent(st);
    setViewingSubmission(null);
    setIsLoadingSubs(true);

    if (isSupabaseConnected()) {
      const subs = await fetchStudentSubmissions(st.username);
      setStudentSubmissions(subs);
    } else {
      setStudentSubmissions(st.submissions || []);
    }
    setIsLoadingSubs(false);
  };

  const handleSaveConfig = () => {
    if (!supabaseUrl.trim() || !supabaseKey.trim()) {
      alert('Vui lòng nhập cả Supabase URL và Anon Key!');
      return;
    }
    saveSupabaseConfig(supabaseUrl, supabaseKey);
    setConfigSuccess(true);
    setTimeout(() => {
      setConfigSuccess(false);
      setIsConfigOpen(false);
      loadStudents();
    }, 1200);
  };

  const filteredStudents = students.filter(st => {
    const q = searchQuery.toLowerCase();
    return (
      st.name.toLowerCase().includes(q) ||
      st.username.toLowerCase().includes(q) ||
      st.school.toLowerCase().includes(q) ||
      st.grade.toLowerCase().includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-6xl h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-white">
                  Quản Trị Lớp Học & Bảng Vàng Thành Tích
                </h2>
                {isConnected ? (
                  <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    Supabase Cloud Live
                  </span>
                ) : (
                  <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                    <Database className="w-3 h-3" />
                    Chế độ Local Device
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400">
                Theo dõi tiến độ giải 44 đề thi, bài nộp và mã nguồn của từng học sinh
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsConfigOpen(!isConfigOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all border border-slate-700"
            >
              <Database className="w-3.5 h-3.5 text-indigo-400" />
              <span>{isConnected ? 'Cấu hình DB' : 'Kết nối Cloud DB'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Cấu hình Supabase Collapsible */}
        {isConfigOpen && (
          <div className="bg-indigo-950/40 border-b border-indigo-500/30 p-4 sm:p-5 text-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="font-bold text-white flex items-center gap-2">
                <Database className="w-4 h-4 text-indigo-400" />
                <span>Cấu hình kết nối Supabase Cloud Database</span>
              </div>
              <span className="text-[11px] text-indigo-300">
                Miễn phí 100% • Dữ liệu đồng bộ cho mọi học sinh trên toàn quốc
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-slate-300 mb-1 block font-semibold">Supabase Project URL</label>
                <input
                  type="text"
                  placeholder="https://xyzcompany.supabase.co"
                  value={supabaseUrl}
                  onChange={e => setSupabaseUrl(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="text-slate-300 mb-1 block font-semibold">Supabase Anon Public Key</label>
                <input
                  type="password"
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                  value={supabaseKey}
                  onChange={e => setSupabaseKey(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <p className="text-[11px] text-slate-400">
                File tạo bảng SQL đã có sẵn tại: <code className="text-indigo-400 bg-slate-900 px-1.5 py-0.5 rounded">supabase_schema.sql</code>
              </p>
              <div className="flex items-center gap-2">
                {currentConfig && (
                  <button
                    onClick={() => {
                      clearSupabaseConfig();
                      setSupabaseUrl('');
                      setSupabaseKey('');
                      loadStudents();
                    }}
                    className="px-3 py-1.5 text-xs text-rose-400 hover:text-rose-300"
                  >
                    Ngắt kết nối
                  </button>
                )}
                <button
                  onClick={handleSaveConfig}
                  className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold shadow-md shadow-indigo-600/30"
                >
                  {configSuccess ? 'Đã lưu kết nối!' : 'Lưu & Kết nối ngay'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area: Split 2 cột */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* CỘT TRÁI: DANH SÁCH HỌC SINH */}
          <div className="w-full md:w-5/12 border-r border-slate-800 flex flex-col bg-slate-950/40">
            {/* Thanh tìm kiếm & thống kê */}
            <div className="p-4 border-b border-slate-800 space-y-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Tìm học sinh theo tên, trường, lớp..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Tổng số: <strong className="text-white">{filteredStudents.length}</strong> học sinh</span>
                <button
                  onClick={loadStudents}
                  disabled={isLoading}
                  className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300 font-semibold"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                  <span>Làm mới</span>
                </button>
              </div>
            </div>

            {/* List học sinh */}
            <div className="flex-1 overflow-y-auto divide-y divide-slate-800/60">
              {filteredStudents.length === 0 ? (
                <div className="p-8 text-center text-slate-500 text-xs">
                  Không tìm thấy học sinh nào phù hợp.
                </div>
              ) : (
                filteredStudents.map((st, index) => {
                  const isSelected = selectedStudent?.username === st.username;
                  const solvedCount = st.solvedProblemIds?.length || 0;
                  const percent = Math.round((solvedCount / PROBLEMS.length) * 100);

                  return (
                    <div
                      key={st.username}
                      onClick={() => handleSelectStudent(st)}
                      className={`p-4 flex items-center justify-between cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-indigo-600/15 border-l-4 border-indigo-500'
                          : 'hover:bg-slate-900/60'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {/* Huy hiệu thứ hạng */}
                        <div className="w-6 text-center font-black text-xs">
                          {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                        </div>

                        <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-lg flex-shrink-0">
                          {st.avatar || '👨‍💻'}
                        </div>

                        <div>
                          <div className="font-bold text-white text-xs sm:text-sm flex items-center gap-1.5">
                            <span>{st.name}</span>
                            <span className="text-[10px] text-slate-500 font-normal">@{st.username}</span>
                          </div>
                          <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                            <span>{st.school}</span>
                            <span>•</span>
                            <span className="text-indigo-400 font-medium">{st.grade}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-xs font-black text-emerald-400 flex items-center justify-end gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>{solvedCount}/{PROBLEMS.length} AC</span>
                        </div>
                        <div className="text-[10px] text-amber-400 font-bold flex items-center justify-end gap-1 mt-0.5">
                          <Flame className="w-3 h-3 fill-amber-400" />
                          <span>{st.streak} ngày</span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* CỘT PHẢI: CHI TIẾT BÀI LÀM & CODE CỦA HỌC SINH ĐƯỢC CHỌN */}
          <div className="flex-1 flex flex-col bg-slate-900/40 overflow-hidden">
            {selectedStudent ? (
              <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header chi tiết học sinh */}
                <div className="p-5 border-b border-slate-800 bg-slate-950/60">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-2xl">
                        {selectedStudent.avatar}
                      </div>
                      <div>
                        <h3 className="text-base font-black text-white">{selectedStudent.name}</h3>
                        <p className="text-xs text-slate-400">
                          @{selectedStudent.username} • {selectedStudent.school} • {selectedStudent.grade}
                        </p>
                        <p className="text-[11px] text-indigo-400 font-semibold mt-0.5">
                          🎯 Mục tiêu: {selectedStudent.target}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-center">
                      <div className="bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
                        <div className="text-xs text-slate-400 font-semibold">Đã hoàn thành</div>
                        <div className="text-base font-black text-emerald-400">
                          {selectedStudent.solvedProblemIds?.length || 0} bài
                        </div>
                      </div>
                      <div className="bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
                        <div className="text-xs text-slate-400 font-semibold">Chuỗi Streak</div>
                        <div className="text-base font-black text-amber-400">
                          {selectedStudent.streak} ngày
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submissions & Code Inspector */}
                <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                  {/* Danh sách bài nộp của học sinh này */}
                  <div className="w-full md:w-5/12 border-r border-slate-800 overflow-y-auto p-4 space-y-2">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Lịch sử nộp bài ({studentSubmissions.length})
                    </div>

                    {isLoadingSubs ? (
                      <div className="p-6 text-center text-slate-500 text-xs">
                        Đang tải danh sách bài nộp...
                      </div>
                    ) : studentSubmissions.length === 0 ? (
                      <div className="p-6 text-center text-slate-500 text-xs">
                        Học sinh chưa có bài nộp nào được lưu.
                      </div>
                    ) : (
                      studentSubmissions.map(sub => {
                        const prob = PROBLEMS.find(p => p.id === sub.problemId);
                        const isSelectedSub = viewingSubmission?.id === sub.id;

                        return (
                          <div
                            key={sub.id}
                            onClick={() => setViewingSubmission(sub)}
                            className={`p-3 rounded-xl border transition-all cursor-pointer text-xs ${
                              isSelectedSub
                                ? 'bg-indigo-600/20 border-indigo-500'
                                : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-bold text-white truncate max-w-[160px]">
                                {prob ? `${prob.code} - ${prob.title}` : sub.problemId}
                              </span>
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-black ${
                                  sub.status === 'AC'
                                    ? 'bg-emerald-500/10 text-emerald-400'
                                    : 'bg-amber-500/10 text-amber-400'
                                }`}
                              >
                                {sub.status} ({sub.score}đ)
                              </span>
                            </div>

                            <div className="flex items-center justify-between text-[11px] text-slate-400">
                              <span className="uppercase font-mono text-[10px] text-indigo-400">{sub.language}</span>
                              <span>{new Date(sub.timestamp).toLocaleString('vi-VN')}</span>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>

                  {/* Chi tiết mã nguồn nộp bài */}
                  <div className="flex-1 flex flex-col bg-slate-950 overflow-hidden">
                    {viewingSubmission ? (
                      <div className="flex-1 flex flex-col overflow-hidden">
                        <div className="p-3 border-b border-slate-800 bg-slate-900/80 flex items-center justify-between">
                          <div className="flex items-center gap-2 text-xs">
                            <FileCode className="w-4 h-4 text-indigo-400" />
                            <span className="font-bold text-white">Mã nguồn bài nộp</span>
                            <span className="text-slate-400 font-mono text-[11px]">
                              ({viewingSubmission.language.toUpperCase()})
                            </span>
                          </div>
                          <div className="text-xs font-bold text-emerald-400">
                            Điểm: {viewingSubmission.score}/{viewingSubmission.maxScore}
                          </div>
                        </div>

                        <div className="flex-1 p-4 overflow-auto font-mono text-xs text-slate-200 bg-[#0b101b] leading-relaxed selection:bg-indigo-500/30">
                          <pre>{viewingSubmission.code}</pre>
                        </div>
                      </div>
                    ) : (
                      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center text-slate-500">
                        <Code2 className="w-10 h-10 text-slate-700 mb-2" />
                        <div className="text-xs font-semibold">Chọn một bài nộp ở cột bên trái</div>
                        <div className="text-[11px] text-slate-600">để xem chi tiết mã nguồn học sinh đã viết</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-500">
                <Users className="w-12 h-12 text-slate-700 mb-3" />
                <h4 className="text-sm font-bold text-slate-400">Chọn một học sinh từ danh sách bên trái</h4>
                <p className="text-xs text-slate-600 max-w-sm mt-1">
                  Thầy cô có thể xem tiến độ hoàn thành các chuyên đề, lịch sử nộp bài và trực tiếp kiểm tra code giải thuật của học sinh.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
