import React, { useState } from 'react';
import { UserProfile } from '../types';
import { saveUserProfile, logoutAccount } from '../utils/storage';
import { X, Trophy, Flame, Target, User, School, CheckCircle2, RotateCcw, Save, LogOut, Users, Sparkles } from 'lucide-react';

interface ProfileModalProps {
  profile: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onProfileUpdate: () => void;
  onOpenAuth: () => void;
  totalProblemsCount: number;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  profile,
  isOpen,
  onClose,
  onProfileUpdate,
  onOpenAuth,
  totalProblemsCount
}) => {
  if (!isOpen) return null;

  const isGuest = profile.id === 'guest';
  const [name, setName] = useState(profile.name);
  const [school, setSchool] = useState(profile.school);
  const [grade, setGrade] = useState(profile.grade);
  const [target, setTarget] = useState(profile.target);
  const [avatar, setAvatar] = useState(profile.avatar);
  const [isSaved, setIsSaved] = useState(false);

  const avatars = ['👨‍💻', '👩‍💻', '🚀', '⚡', '🏆', '⭐', '🧠', '🔥'];

  const handleSave = () => {
    const updated: UserProfile = {
      ...profile,
      name,
      school,
      grade,
      target,
      avatar
    };
    saveUserProfile(updated);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
    onProfileUpdate();
  };

  const handleLogout = () => {
    if (confirm('Bạn có chắc muốn đăng xuất khỏi tài khoản này?')) {
      logoutAccount();
      onProfileUpdate();
      onClose();
    }
  };

  const handleResetProgress = () => {
    if (confirm('Bạn có chắc muốn đặt lại toàn bộ tiến độ làm bài của tài khoản này không?')) {
      saveUserProfile({
        ...profile,
        solvedProblemIds: [],
        partialProblemIds: [],
        bookmarkedIds: [],
        submissions: [],
        aiChats: {}
      });
      onProfileUpdate();
      onClose();
    }
  };

  const solvedCount = profile.solvedProblemIds.length;
  const progressPercent = Math.round((solvedCount / totalProblemsCount) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-xl">
              {avatar}
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white">Hồ Sơ Học Sinh Tin Học Trẻ</h2>
              <p className="text-xs text-slate-400">Theo dõi thành tích & mục tiêu luyện thi Bảng B</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-center">
              <Trophy className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
              <div className="text-lg font-black text-white">{solvedCount} / {totalProblemsCount}</div>
              <div className="text-[10px] text-slate-400 font-semibold uppercase">Đã AC ({progressPercent}%)</div>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-center">
              <Flame className="w-4 h-4 text-amber-400 mx-auto mb-1" />
              <div className="text-lg font-black text-white">{profile.streak} ngày</div>
              <div className="text-[10px] text-slate-400 font-semibold uppercase">Chuỗi luyện tập</div>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-center">
              <CheckCircle2 className="w-4 h-4 text-blue-400 mx-auto mb-1" />
              <div className="text-lg font-black text-white">{profile.partialProblemIds.length}</div>
              <div className="text-[10px] text-slate-400 font-semibold uppercase">Làm một phần</div>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-center">
              <Target className="w-4 h-4 text-purple-400 mx-auto mb-1" />
              <div className="text-lg font-black text-white">{profile.submissions.length}</div>
              <div className="text-[10px] text-slate-400 font-semibold uppercase">Lần nộp code</div>
            </div>
          </div>

          {/* Edit Profile Form */}
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 space-y-4">
            <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
              Thông tin thí sinh
            </h4>

            {/* Choose Avatar */}
            <div>
              <label className="text-xs text-slate-400 mb-1.5 block font-semibold">Chọn biểu tượng đại diện</label>
              <div className="flex items-center gap-2 flex-wrap">
                {avatars.map((av, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setAvatar(av)}
                    className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg border transition-all ${
                      avatar === av ? 'border-indigo-500 bg-indigo-600/30' : 'border-slate-800 bg-slate-900'
                    }`}
                  >
                    {av}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-400 mb-1 block font-semibold">Họ và tên học sinh</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 mb-1 block font-semibold">Khối lớp (THCS)</label>
                <input
                  type="text"
                  value={grade}
                  onChange={e => setGrade(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 mb-1 block font-semibold">Trường học</label>
                <input
                  type="text"
                  value={school}
                  onChange={e => setSchool(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 mb-1 block font-semibold">Mục tiêu thi đấu</label>
                <input
                  type="text"
                  value={target}
                  onChange={e => setTarget(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Reset progress button */}
          <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
            <span>Tiến độ lưu an toàn trên trình duyệt này</span>
            <button
              onClick={handleResetProgress}
              className="text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Đặt lại tiến độ</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 px-6 py-4 border-t border-slate-800 bg-slate-950">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onOpenAuth();
              }}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-all"
            >
              <Users className="w-3.5 h-3.5 text-indigo-400" />
              <span>Đổi / Tạo tài khoản</span>
            </button>

            {!isGuest && (
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 rounded-xl transition-all"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Đăng xuất</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
            >
              Đóng
            </button>

            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-lg shadow-indigo-600/30 transition-all"
            >
              <Save className="w-4 h-4" />
              <span>{isSaved ? 'Đã lưu!' : 'Lưu thông tin'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
