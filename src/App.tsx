import React, { useState } from 'react';
import { Header } from './components/Header';
import { TopicCard } from './components/TopicCard';
import { ProblemList } from './components/ProblemList';
import { SkillRadar } from './components/SkillRadar';
import { ProblemWorkspace } from './components/ProblemWorkspace';
import { TheoryModal } from './components/TheoryModal';
import { ProfileModal } from './components/ProfileModal';
import { TOPICS } from './data/taxonomyData';
import { PROBLEMS } from './data/problemsData';
import { getUserProfile, getRadarTopicStats, getRecommendedProblem } from './utils/storage';
import { Problem, Topic } from './types';
import {
  Compass,
  Radar,
  ArrowRight,
  BookOpen,
  Sparkles,
  Trophy,
  Flame,
  CheckCircle2,
  Code2,
  Layers,
  GraduationCap
} from 'lucide-react';

export function App() {
  const [profile, setProfile] = useState(() => getUserProfile());
  const [activeView, setActiveView] = useState<'topics' | 'problems' | 'radar'>('topics');
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [activeProblem, setActiveProblem] = useState<Problem | null>(null);
  const [theoryTopic, setTheoryTopic] = useState<Topic | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Refresh user profile state
  const refreshProfile = () => {
    setProfile(getUserProfile());
  };

  const topicStats = getRadarTopicStats();
  const recommended = getRecommendedProblem();

  // If in active problem workspace, show workspace full-screen
  if (activeProblem) {
    return (
      <ProblemWorkspace
        problem={activeProblem}
        onBack={() => setActiveProblem(null)}
        onSelectProblem={p => setActiveProblem(p)}
        onProfileUpdate={refreshProfile}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Navigation Header */}
      <Header
        profile={profile}
        activeView={activeView}
        onSelectView={view => {
          if (view === 'theory') {
            setTheoryTopic(TOPICS[0]);
          } else {
            setActiveView(view);
          }
        }}
        onOpenProfile={() => setIsProfileOpen(true)}
        totalProblemsCount={PROBLEMS.length}
      />

      {/* Main Page Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* VIEW 1: TOPICS ROADMAP (DẠNG BÀI & LỘ TRÌNH) */}
        {activeView === 'topics' && (
          <div className="space-y-10 animate-fadeIn">
            {/* Hero Banner */}
            <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/25 p-6 sm:p-10 overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-bold mb-4">
                  <GraduationCap className="w-4 h-4" />
                  <span>Hội thi Tin học trẻ Toàn quốc • Bảng B (THCS)</span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                  Luyện thi Thuật toán theo{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">
                    Dạng bài & Cây kỹ năng
                  </span>
                </h1>

                <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                  Bóc tách và chuẩn hóa từ <strong>44 đề thi chính thức</strong> (2022 – 2026). Đo lường độ hoàn thiện
                  năng lực của học sinh trên biểu đồ Radar, kèm <strong>Gia sư AI Socratic</strong> định hướng tư duy từng bước mà không làm mất tính tự lập giải bài!
                </p>

                {/* 3 Core Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-6 border-t border-slate-800">
                  <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                    <Compass className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                    <span>8 Dạng bài phân loại chuẩn</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                    <Radar className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Radar đo lường độ thành thạo</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                    <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span>AI Socratic & Sinh biến thể</span>
                  </div>
                </div>

                {/* Quick Action Buttons */}
                <div className="flex items-center gap-3 mt-8 flex-wrap">
                  <button
                    onClick={() => setActiveView('radar')}
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-lg shadow-indigo-600/30 transition-all"
                  >
                    <Radar className="w-4 h-4" />
                    <span>Kiểm tra Radar Kỹ năng</span>
                  </button>

                  <button
                    onClick={() => setActiveView('problems')}
                    className="flex items-center gap-2 px-5 py-2.5 bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white font-bold text-xs sm:text-sm rounded-xl border border-slate-700 transition-all"
                  >
                    <BookOpen className="w-4 h-4 text-slate-400" />
                    <span>Xem toàn bộ 44 Đề thi</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Recommended Problem Section */}
            {recommended && (
              <div className="bg-slate-900 border border-slate-800 hover:border-indigo-500/30 rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-400 flex-shrink-0">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-0.5">
                      Gợi ý luyện tập ngay hôm nay
                    </div>
                    <div className="text-base sm:text-lg font-bold text-white">
                      {recommended.code} - {recommended.title}
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5 max-w-xl">
                      {recommended.contest} • Dạng {recommended.topicId} • Độ khó: {recommended.difficulty}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveProblem(recommended)}
                  className="flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/20 transition-all flex-shrink-0"
                >
                  <span>Bắt đầu làm bài</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* 8 Topics Grid */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-white">
                    8 Dạng Bài Cốt Lõi Tin Học Trẻ Bảng B
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Chọn một chủ đề để học lý thuyết hoặc luyện trực tiếp các bài thi trong kho đề
                  </p>
                </div>

                <button
                  onClick={() => setActiveView('problems')}
                  className="text-xs text-indigo-400 font-bold hover:text-indigo-300 flex items-center gap-1"
                >
                  <span>Xem tất cả ({PROBLEMS.length})</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {TOPICS.map(topic => {
                  const topicProblems = PROBLEMS.filter(p => p.topicId === topic.id);
                  const stat = topicStats.find(s => s.topicId === topic.id);
                  const solvedCount = stat ? stat.solvedCount : 0;
                  const mastery = stat ? stat.masteryScore : 0;

                  return (
                    <TopicCard
                      key={topic.id}
                      topic={topic}
                      solvedCount={solvedCount}
                      totalCount={topicProblems.length}
                      masteryScore={mastery}
                      onExploreTopic={topicId => {
                        setSelectedTopicId(topicId);
                        setActiveView('problems');
                      }}
                      onOpenTheory={t => setTheoryTopic(t)}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: ALL PROBLEMS (KHO ĐỀ THI) */}
        {activeView === 'problems' && (
          <ProblemList
            problems={PROBLEMS}
            profile={profile}
            selectedTopicId={selectedTopicId}
            onSelectTopic={setSelectedTopicId}
            onSolveProblem={p => setActiveProblem(p)}
            onProfileChange={refreshProfile}
          />
        )}

        {/* VIEW 3: SKILL RADAR (RADAR KỸ NĂNG) */}
        {activeView === 'radar' && (
          <SkillRadar
            onSelectTopic={topicId => {
              setSelectedTopicId(topicId);
              setActiveView('problems');
            }}
            onSolveProblem={p => setActiveProblem(p)}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900/80 border-t border-slate-800/80 py-8 px-4 sm:px-6 lg:px-8 text-xs text-slate-400 text-center space-y-2 mt-auto">
        <div className="flex items-center justify-center gap-2 font-bold text-slate-300">
          <Code2 className="w-4 h-4 text-indigo-400" />
          <span>THT-B Master • Nền tảng Luyện thi Tin học trẻ Bảng B (THCS)</span>
        </div>
        <p className="text-[11px] text-slate-500 max-w-md mx-auto">
          Dữ liệu bài tập được tổng hợp từ 44 đề thi chính thức của Hội thi Tin học trẻ Toàn quốc (2022 - 2026).
        </p>
      </footer>

      {/* Modals */}
      <TheoryModal
        topic={theoryTopic}
        onClose={() => setTheoryTopic(null)}
        onStartPracticing={topicId => {
          setTheoryTopic(null);
          setSelectedTopicId(topicId);
          setActiveView('problems');
        }}
      />

      <ProfileModal
        profile={profile}
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onProfileUpdate={refreshProfile}
        totalProblemsCount={PROBLEMS.length}
      />
    </div>
  );
}

export default App;
