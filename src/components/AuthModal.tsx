import React, { useState } from 'react';
import {
  getAllAccounts,
  registerAccount,
  loginAccount,
  switchAccount,
  isLoggedIn,
  saveUserProfile
} from '../utils/storage';
import { isSupabaseConnected, loginFromSupabase, registerToSupabase } from '../services/supabase';
import { UserProfile } from '../types';
import {
  X,
  UserPlus,
  LogIn,
  KeyRound,
  User,
  School,
  Target,
  Users,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  Database,
  Loader2
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: UserProfile) => void;
  initialTab?: 'register' | 'login';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onAuthSuccess,
  initialTab = 'register'
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'register' | 'login' | 'saved'>(initialTab);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Register Form States
  const [regUsername, setRegUsername] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regName, setRegName] = useState('');
  const [regSchool, setRegSchool] = useState('');
  const [regGrade, setRegGrade] = useState('Lớp 8');
  const [regTarget, setRegTarget] = useState('Giải Nhất Tin Học Trẻ Bảng B Toàn Quốc');
  const [regAvatar, setRegAvatar] = useState('👨‍💻');

  // Login Form States
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const savedAccounts = Object.values(getAllAccounts());
  const avatars = ['👨‍💻', '👩‍💻', '🚀', '⚡', '🏆', '⭐', '🧠', '🔥'];
  const grades = ['Lớp 6', 'Lớp 7', 'Lớp 8', 'Lớp 9'];
  const targetSuggestions = [
    'Giải Nhất Tin Học Trẻ Bảng B Toàn Quốc',
    'Vào Vòng Chung Kết Toàn Quốc',
    'Đạt Giải Khu Vực Miền Bắc / Trung / Nam',
    'Thành thạo Quy hoạch động & Chặt nhị phân'
  ];

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!regUsername.trim()) {
      setErrorMsg('Vui lòng nhập Tên đăng nhập!');
      return;
    }

    if (!regName.trim()) {
      setErrorMsg('Vui lòng nhập Họ và tên của bạn!');
      return;
    }

    setIsSubmitting(true);
    const res = registerAccount({
      username: regUsername,
      password: regPassword,
      name: regName,
      school: regSchool,
      grade: regGrade,
      target: regTarget,
      avatar: regAvatar
    });

    if (!res.success) {
      setErrorMsg(res.error || 'Đăng ký không thành công!');
      setIsSubmitting(false);
      return;
    }

    if (res.user && isSupabaseConnected()) {
      const cloudRes = await registerToSupabase(res.user);
      if (!cloudRes.success && cloudRes.error?.includes('đã có')) {
        setErrorMsg(cloudRes.error);
        setIsSubmitting(false);
        return;
      }
    }

    setIsSubmitting(false);
    if (res.user) {
      setSuccessMsg(`Chào mừng ${res.user.name}! Tài khoản của bạn đã được tạo thành công.`);
      setTimeout(() => {
        onAuthSuccess(res.user!);
        onClose();
      }, 700);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!loginUsername.trim()) {
      setErrorMsg('Vui lòng nhập Tên đăng nhập!');
      return;
    }

    setIsSubmitting(true);
    let res = loginAccount(loginUsername, loginPassword);

    // Nếu trên máy này chưa có tài khoản, tìm trên Cloud Supabase
    if (!res.success && isSupabaseConnected()) {
      const cloudRes = await loginFromSupabase(loginUsername, loginPassword);
      if (cloudRes.success && cloudRes.user) {
        saveUserProfile(cloudRes.user);
        res = { success: true, user: cloudRes.user };
      } else if (cloudRes.error) {
        setErrorMsg(cloudRes.error);
        setIsSubmitting(false);
        return;
      }
    }

    setIsSubmitting(false);
    if (!res.success) {
      setErrorMsg(res.error || 'Đăng nhập không thành công!');
    } else if (res.user) {
      setSuccessMsg(`Chào mừng bạn quay trở lại, ${res.user.name}!`);
      setTimeout(() => {
        onAuthSuccess(res.user!);
        onClose();
      }, 700);
    }
  };

  const handleQuickSwitch = (username: string) => {
    const success = switchAccount(username);
    if (success) {
      const user = getAllAccounts()[username];
      onAuthSuccess(user);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 text-white">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white">
                Tài Khoản Luyện Thi Tin Học Trẻ
              </h2>
              <p className="text-xs text-slate-400">
                Lưu trữ điểm số, đo lường Radar và theo dõi tiến độ thi đấu Bảng B
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-800 bg-slate-950/60 p-1.5 gap-1 px-4">
          <button
            type="button"
            onClick={() => {
              setActiveTab('register');
              setErrorMsg('');
              setSuccessMsg('');
            }}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'register'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            <span>Tạo tài khoản mới</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('login');
              setErrorMsg('');
              setSuccessMsg('');
            }}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'login'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <LogIn className="w-4 h-4" />
            <span>Đăng nhập</span>
          </button>

          {savedAccounts.length > 0 && (
            <button
              type="button"
              onClick={() => {
                setActiveTab('saved');
                setErrorMsg('');
                setSuccessMsg('');
              }}
              className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'saved'
                  ? 'bg-slate-800 text-white border border-slate-700'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Users className="w-4 h-4 text-emerald-400" />
              <span>Đổi tài khoản ({savedAccounts.length})</span>
            </button>
          )}
        </div>

        {/* Alert Messages */}
        {errorMsg && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2 animate-fadeIn">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-400" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Form Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm">
          {/* TAB 1: REGISTER */}
          {activeTab === 'register' && (
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 mb-1 block">
                    Tên đăng nhập <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="ví dụ: duc_anh_8a"
                    value={regUsername}
                    onChange={e => setRegUsername(e.target.value.toLowerCase().replace(/\s+/g, '_'))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono"
                    required
                  />
                  <span className="text-[10px] text-slate-500">Chữ thường, số hoặc gạch dưới</span>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 mb-1 block">
                    Mật khẩu / Mã PIN (tùy chọn)
                  </label>
                  <input
                    type="password"
                    placeholder="Để trống nếu không cần"
                    value={regPassword}
                    onChange={e => setRegPassword(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                  <span className="text-[10px] text-slate-500">Dùng để bảo vệ khi đăng nhập lại</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 mb-1 block">
                  Họ và tên học sinh <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="ví dụ: Nguyễn Đức Anh"
                  value={regName}
                  onChange={e => setRegName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 mb-1 block">
                    Trường học (THCS)
                  </label>
                  <input
                    type="text"
                    placeholder="ví dụ: THCS Lê Quý Đôn"
                    value={regSchool}
                    onChange={e => setRegSchool(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 mb-1 block">
                    Khối lớp
                  </label>
                  <select
                    value={regGrade}
                    onChange={e => setRegGrade(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    {grades.map(g => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Avatar Selector */}
              <div>
                <label className="text-xs font-semibold text-slate-300 mb-1.5 block">
                  Chọn biểu tượng đại diện
                </label>
                <div className="flex items-center gap-2 flex-wrap">
                  {avatars.map((av, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setRegAvatar(av)}
                      className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg border transition-all ${
                        regAvatar === av
                          ? 'border-indigo-500 bg-indigo-600/30 shadow-md'
                          : 'border-slate-800 bg-slate-950 hover:border-slate-700'
                      }`}
                    >
                      {av}
                    </button>
                  ))}
                </div>
              </div>

              {/* Target Selector */}
              <div>
                <label className="text-xs font-semibold text-slate-300 mb-1 block">
                  Mục tiêu rèn luyện
                </label>
                <input
                  type="text"
                  value={regTarget}
                  onChange={e => setRegTarget(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 mb-1.5"
                />
                <div className="flex flex-wrap gap-1">
                  {targetSuggestions.map((t, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setRegTarget(t)}
                      className="text-[10px] bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white px-2 py-0.5 rounded-md border border-slate-700/60"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-2 flex items-center justify-center gap-2 py-2.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-lg shadow-indigo-600/30 transition-all"
              >
                <span>Tạo Tài Khoản & Bắt Đầu Luyện Thi</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* TAB 2: LOGIN */}
          {activeTab === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 mb-1 block">
                  Tên đăng nhập
                </label>
                <input
                  type="text"
                  placeholder="Nhập tên đăng nhập của bạn"
                  value={loginUsername}
                  onChange={e => setLoginUsername(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 mb-1 block">
                  Mật khẩu / Mã PIN
                </label>
                <input
                  type="password"
                  placeholder="Nhập mật khẩu (nếu có)"
                  value={loginPassword}
                  onChange={e => setLoginPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 flex items-center justify-center gap-2 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-lg shadow-indigo-600/30 transition-all"
              >
                <LogIn className="w-4 h-4" />
                <span>Đăng Nhập</span>
              </button>

              {/* Quick switch helper */}
              {savedAccounts.length > 0 && (
                <div className="pt-4 border-t border-slate-800 text-center">
                  <span className="text-xs text-slate-400">
                    Hoặc chọn nhanh từ các tài khoản đã lưu trên máy này bên dưới:
                  </span>
                  <div className="mt-2 space-y-1.5">
                    {savedAccounts.map(acc => (
                      <button
                        key={acc.username}
                        type="button"
                        onClick={() => handleQuickSwitch(acc.username)}
                        className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 transition-all text-xs"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-base">{acc.avatar}</span>
                          <div className="text-left">
                            <div className="font-bold text-slate-200">{acc.name}</div>
                            <div className="text-[10px] text-slate-500">@{acc.username} • {acc.school}</div>
                          </div>
                        </div>
                        <span className="text-indigo-400 font-bold flex items-center gap-1 text-[11px]">
                          Vào học <ArrowRight className="w-3 h-3" />
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </form>
          )}

          {/* TAB 3: SAVED ACCOUNTS */}
          {activeTab === 'saved' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-400 leading-relaxed">
                Các tài khoản học sinh đã từng đăng nhập trên máy tính này. Bấm vào tài khoản của bạn để vào học ngay:
              </p>

              <div className="space-y-2">
                {savedAccounts.map(acc => (
                  <div
                    key={acc.username}
                    onClick={() => handleQuickSwitch(acc.username)}
                    className="flex items-center justify-between p-3 rounded-2xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 hover:border-indigo-500/50 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-xl">
                        {acc.avatar}
                      </div>
                      <div>
                        <div className="font-bold text-white group-hover:text-indigo-300 transition-colors">
                          {acc.name}
                        </div>
                        <div className="text-xs text-slate-400">
                          @{acc.username} • {acc.school} • {acc.grade}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right hidden sm:block">
                        <div className="text-xs font-bold text-emerald-400">
                          {acc.solvedProblemIds.length} bài AC
                        </div>
                        <div className="text-[10px] text-slate-500">{acc.streak} ngày streak</div>
                      </div>
                      <span className="p-2 rounded-lg bg-indigo-600/20 text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
