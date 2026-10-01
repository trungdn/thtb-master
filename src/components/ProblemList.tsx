import React, { useState, useMemo } from 'react';
import { Problem, TopicId, Difficulty, UserProfile } from '../types';
import { TOPICS } from '../data/taxonomyData';
import { toggleBookmark } from '../utils/storage';
import { Search, Filter, CheckCircle2, Clock, Star, ArrowRight, Sparkles, BookOpen } from 'lucide-react';

interface ProblemListProps {
  problems: Problem[];
  profile: UserProfile;
  selectedTopicId: string | null;
  onSelectTopic: (topicId: string | null) => void;
  onSolveProblem: (problem: Problem) => void;
  onProfileChange: () => void;
}

export const ProblemList: React.FC<ProblemListProps> = ({
  problems,
  profile,
  selectedTopicId,
  onSelectTopic,
  onSolveProblem,
  onProfileChange
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'All'>('All');
  const [selectedStatus, setSelectedStatus] = useState<'All' | 'AC' | 'PARTIAL' | 'UNSOLVED' | 'BOOKMARKED'>('All');
  const [selectedYear, setSelectedYear] = useState<number | 'All'>('All');

  // Filtered problems
  const filteredProblems = useMemo(() => {
    return problems.filter(problem => {
      // Topic filter
      if (selectedTopicId && problem.topicId !== selectedTopicId) return false;

      // Difficulty filter
      if (selectedDifficulty !== 'All' && problem.difficulty !== selectedDifficulty) return false;

      // Year filter
      if (selectedYear !== 'All' && problem.year !== selectedYear) return false;

      // Status filter
      const isSolved = profile.solvedProblemIds.includes(problem.id);
      const isPartial = profile.partialProblemIds.includes(problem.id);
      const isBookmarked = profile.bookmarkedIds.includes(problem.id);

      if (selectedStatus === 'AC' && !isSolved) return false;
      if (selectedStatus === 'PARTIAL' && !isPartial) return false;
      if (selectedStatus === 'UNSOLVED' && (isSolved || isPartial)) return false;
      if (selectedStatus === 'BOOKMARKED' && !isBookmarked) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = problem.title.toLowerCase().includes(q);
        const matchCode = problem.code.toLowerCase().includes(q);
        const matchContest = problem.contest.toLowerCase().includes(q);
        const matchDesc = problem.description.toLowerCase().includes(q);
        if (!matchTitle && !matchCode && !matchContest && !matchDesc) return false;
      }

      return true;
    });
  }, [problems, profile, selectedTopicId, selectedDifficulty, selectedYear, selectedStatus, searchQuery]);

  const handleToggleBookmark = (e: React.MouseEvent, problemId: string) => {
    e.stopPropagation();
    toggleBookmark(problemId);
    onProfileChange();
  };

  const getDifficultyBadge = (diff: Difficulty) => {
    switch (diff) {
      case 'Dễ':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'Trung bình':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'Khó':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Search & Filter Header Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm theo tên bài, mã bài (CAKES, AKSEQ, CHIADAY...), hoặc từ khóa thuật toán..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          {/* Topic Pills */}
          <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            <button
              onClick={() => onSelectTopic(null)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedTopicId === null
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              Tất cả dạng bài ({problems.length})
            </button>
            {TOPICS.map(topic => (
              <button
                key={topic.id}
                onClick={() => onSelectTopic(topic.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                  selectedTopicId === topic.id
                    ? 'border-indigo-500 text-white shadow-md'
                    : 'border-transparent text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
                style={{
                  backgroundColor: selectedTopicId === topic.id ? topic.color : 'transparent'
                }}
              >
                {topic.shortName}
              </button>
            ))}
          </div>

          {/* Quick Selectors (Difficulty, Year, Status) */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Status Select */}
            <select
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value as any)}
              className="bg-slate-950 border border-slate-800 text-slate-300 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-indigo-500"
            >
              <option value="All">Mọi trạng thái</option>
              <option value="AC">✅ Đã AC ({profile.solvedProblemIds.length})</option>
              <option value="PARTIAL">🟡 Đang làm dở ({profile.partialProblemIds.length})</option>
              <option value="UNSOLVED">⚪ Chưa làm</option>
              <option value="BOOKMARKED">⭐ Đã lưu ({profile.bookmarkedIds.length})</option>
            </select>

            {/* Difficulty Select */}
            <select
              value={selectedDifficulty}
              onChange={e => setSelectedDifficulty(e.target.value as any)}
              className="bg-slate-950 border border-slate-800 text-slate-300 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-indigo-500"
            >
              <option value="All">Mọi độ khó</option>
              <option value="Dễ">Dễ</option>
              <option value="Trung bình">Trung bình</option>
              <option value="Khó">Khó</option>
            </select>

            {/* Year Select */}
            <select
              value={selectedYear}
              onChange={e => setSelectedYear(e.target.value === 'All' ? 'All' : Number(e.target.value))}
              className="bg-slate-950 border border-slate-800 text-slate-300 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-indigo-500"
            >
              <option value="All">Tất cả năm thi</option>
              <option value="2026">Năm 2026</option>
              <option value="2025">Năm 2025</option>
              <option value="2024">Năm 2024</option>
              <option value="2023">Năm 2023</option>
              <option value="2022">Năm 2022</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count & Active Filters Note */}
      <div className="flex items-center justify-between px-1 text-xs text-slate-400">
        <span>Hiển thị <strong>{filteredProblems.length}</strong> bài toán</span>
        {selectedTopicId && (
          <span className="text-indigo-400 font-semibold cursor-pointer hover:underline" onClick={() => onSelectTopic(null)}>
            Xóa bộ lọc dạng bài ✕
          </span>
        )}
      </div>

      {/* Problem Cards / List */}
      <div className="space-y-3">
        {filteredProblems.map(problem => {
          const isSolved = profile.solvedProblemIds.includes(problem.id);
          const isPartial = profile.partialProblemIds.includes(problem.id);
          const isBookmarked = profile.bookmarkedIds.includes(problem.id);
          const topic = TOPICS.find(t => t.id === problem.topicId);

          return (
            <div
              key={problem.id}
              onClick={() => onSolveProblem(problem)}
              className={`bg-slate-900 hover:bg-slate-800/80 border ${
                isSolved
                  ? 'border-emerald-500/30'
                  : isPartial
                  ? 'border-amber-500/30'
                  : 'border-slate-800 hover:border-slate-700'
              } rounded-xl p-4 sm:p-5 transition-all duration-200 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 group shadow-sm`}
            >
              {/* Left: Status Icon & Details */}
              <div className="flex items-start gap-3.5 min-w-0">
                <div className="mt-0.5">
                  {isSolved ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  ) : isPartial ? (
                    <Clock className="w-5 h-5 text-amber-400 flex-shrink-0" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-slate-700 flex-shrink-0" />
                  )}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-extrabold text-sm text-indigo-400 group-hover:text-indigo-300 transition-colors">
                      {problem.code}
                    </span>
                    <span className="font-bold text-sm text-slate-200">
                      {problem.title}
                    </span>
                    {problem.isAIGenerated && (
                      <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        <Sparkles className="w-3 h-3" />
                        AI Biến thể
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-400 flex-wrap">
                    <span>{problem.contest}</span>
                    <span>•</span>
                    <span className="text-slate-500">Năm {problem.year}</span>
                    <span>•</span>
                    <span className="text-slate-500">TL: {problem.timeLimit}</span>
                  </div>
                </div>
              </div>

              {/* Right: Topic Pill, Difficulty, Bookmark, Action Button */}
              <div className="flex items-center justify-between sm:justify-end gap-3 self-end sm:self-center flex-shrink-0">
                {/* Topic Pill */}
                {topic && (
                  <span
                    className="text-[11px] font-bold px-2.5 py-1 rounded-md border"
                    style={{
                      backgroundColor: topic.bgColor,
                      borderColor: topic.borderColor,
                      color: topic.color
                    }}
                  >
                    {topic.shortName}
                  </span>
                )}

                {/* Difficulty Badge */}
                <span
                  className={`text-[11px] font-bold px-2.5 py-1 rounded-md border ${getDifficultyBadge(
                    problem.difficulty
                  )}`}
                >
                  {problem.difficulty}
                </span>

                {/* Bookmark Button */}
                <button
                  onClick={e => handleToggleBookmark(e, problem.id)}
                  className={`p-2 rounded-lg transition-colors ${
                    isBookmarked
                      ? 'text-amber-400 hover:text-amber-300'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                  title={isBookmarked ? 'Bỏ lưu bài này' : 'Lưu vào danh sách yêu thích'}
                >
                  <Star className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400' : ''}`} />
                </button>

                {/* Solve Action Button */}
                <button
                  onClick={() => onSolveProblem(problem)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-800 group-hover:bg-indigo-600 text-slate-200 group-hover:text-white rounded-lg text-xs font-bold transition-all shadow-sm"
                >
                  <span>Làm bài</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          );
        })}

        {filteredProblems.length === 0 && (
          <div className="text-center py-16 bg-slate-900/60 border border-slate-800 rounded-2xl">
            <BookOpen className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h4 className="text-base font-bold text-slate-300 mb-1">Không tìm thấy bài toán nào</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Không có bài thi nào khớp với bộ lọc hoặc từ khóa tìm kiếm của bạn. Hãy thử chọn bộ lọc khác!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
