import React from 'react';
import { Trophy, Flame, BookOpen, Layers, Radar, Code2, UserPlus, LogIn, ChevronDown } from 'lucide-react';
import type { UserProfile } from '../types';

interface HeaderProps {
  profile: UserProfile;
  activeView: 'topics' | 'problems' | 'radar';
  onSelectView: (view: 'topics' | 'problems' | 'radar') => void;
  onOpenProfile: () => void;
  onOpenAuth: () => void;
  totalProblemsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  profile,
  activeView,
  onSelectView,
  onOpenProfile,
  onOpenAuth,
  totalProblemsCount
}) => {
  const isGuest = profile.id === 'guest';
  const solvedCount = profile.solvedProblemIds.length;
  const progressPercent = Math.round((solvedCount / totalProblemsCount) * 100);

  return (
    <header className="sticky top-0 z-50 bg-[#0f172a]/95 backdrop-blur-md border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Platform Name */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onSelectView('topics')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                  THT-B Master
                </span>
                <span className="px-2 py-0.5 text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/30 rounded-full">
                  Bảng B (THCS)
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">Luyện thi theo Dạng bài & Cây kỹ năng</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/80 p-1.5 rounded-xl border border-slate-800">
            <button
              onClick={() => onSelectView('topics')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeView === 'topics'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Dạng bài & Lộ trình</span>
            </button>

            <button
              onClick={() => onSelectView('problems')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeView === 'problems'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Kho Đề Thi ({totalProblemsCount})</span>
            </button>

            <button
              onClick={() => onSelectView('radar')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeView === 'radar'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Radar className="w-4 h-4" />
              <span>Radar Kỹ năng</span>
            </button>
          </nav>

          {/* User Stats & Profile Widget */}
          <div className="flex items-center gap-3">
            {/* Streak Counter (chỉ hiện khi đã đăng nhập) */}
            {!isGuest && (
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/25 rounded-lg text-amber-400 text-xs font-bold" title="Số ngày luyện tập liên tục">
                <Flame className="w-4 h-4 text-amber-400 fill-amber-400 animate-pulse" />
                <span>{profile.streak} ngày</span>
              </div>
            )}

            {/* Solved Progress */}
            {!isGuest && (
              <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-slate-900 border border-slate-800 rounded-lg text-xs">
                <Trophy className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-semibold text-slate-200">{solvedCount} / {totalProblemsCount}</span>
                <span className="text-[10px] text-emerald-400 font-bold">({progressPercent}%)</span>
              </div>
            )}

            {/* If Guest: Login/Register button */}
            {isGuest ? (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-indigo-600/20"
              >
                <UserPlus className="w-4 h-4" />
                <span>Đăng ký / Đăng nhập</span>
              </button>
            ) : (
              /* If Logged in: Student Profile Button */
              <button
                onClick={onOpenProfile}
                className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/80 transition-all text-xs font-semibold text-slate-200"
              >
                <span className="text-base">{profile.avatar}</span>
                <div className="hidden md:block text-left">
                  <div className="text-xs font-bold leading-tight">{profile.name}</div>
                  <div className="text-[10px] text-slate-400 leading-tight">@{profile.username} • {profile.grade}</div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-0.5 hidden sm:block" />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
