import React from 'react';
import { getRadarTopicStats, getRecommendedProblem, TopicStat } from '../utils/storage';
import { Problem } from '../types';
import { Trophy, AlertCircle, ArrowRight, Sparkles, CheckCircle2, TrendingUp, Compass } from 'lucide-react';

interface SkillRadarProps {
  onSelectTopic: (topicId: string) => void;
  onSolveProblem: (problem: Problem) => void;
}

export const SkillRadar: React.FC<SkillRadarProps> = ({ onSelectTopic, onSolveProblem }) => {
  const stats: TopicStat[] = getRadarTopicStats();
  const recommended = getRecommendedProblem();

  // Radar geometry calculations
  const size = 360;
  const center = size / 2;
  const radius = size * 0.38;
  const numAxes = stats.length; // 8 axes

  const getCoordinates = (index: number, valueRatio: number) => {
    // Angle in radians, offset so first axis is at top (-PI/2)
    const angle = (index * 2 * Math.PI) / numAxes - Math.PI / 2;
    const r = radius * valueRatio;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle)
    };
  };

  // Generate web rings (20%, 40%, 60%, 80%, 100%)
  const rings = [0.2, 0.4, 0.6, 0.8, 1.0];

  // Polygon points for student mastery scores
  const studentPoints = stats.map((stat, i) => {
    // scale 0 -> 100 to 0.1 -> 1.0 (min radius 0.1 for visibility)
    const ratio = Math.max(0.1, stat.masteryScore / 100);
    const { x, y } = getCoordinates(i, ratio);
    return `${x},${y}`;
  }).join(' ');

  const averageMastery = Math.round(
    stats.reduce((acc, curr) => acc + curr.masteryScore, 0) / (stats.length || 1)
  );

  const weakestTopic = [...stats].sort((a, b) => a.masteryScore - b.masteryScore)[0];
  const strongestTopic = [...stats].sort((a, b) => b.masteryScore - a.masteryScore)[0];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Overview Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/20 rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Compass className="w-4 h-4" />
              <span>Bản Đồ Năng Lực Thuật Toán</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Độ Hoàn Thiện Kỹ Năng Bảng B
            </h1>
            <p className="mt-2 text-sm text-slate-300 max-w-2xl leading-relaxed">
              Hệ thống tự động chấm điểm và đo lường độ thành thạo của bạn trên 8 dạng toán cốt lõi 
              của đề thi Tin học trẻ Bảng B (THCS). Giúp bạn phát hiện ngay điểm yếu để bồi dưỡng kịp thời!
            </p>
          </div>

          <div className="flex items-center gap-6 bg-slate-900/80 border border-indigo-500/30 p-4 rounded-xl backdrop-blur-sm self-start md:self-center">
            <div className="text-center">
              <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
                {averageMastery}%
              </div>
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mt-0.5">
                Chỉ Số Tổng Hợp
              </div>
            </div>
            <div className="h-10 w-[1px] bg-slate-800" />
            <div className="text-center">
              <div className="text-3xl font-black text-emerald-400">
                {stats.reduce((acc, c) => acc + c.solvedCount, 0)}
              </div>
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mt-0.5">
                Bài Đã AC
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Radar Chart & Diagnostic Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Radar Chart Visual */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center shadow-xl relative">
          <div className="w-full flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-slate-200 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-indigo-400" />
              <span>Biểu Đồ Radar 8 Dạng Bài</span>
            </h3>
            <span className="text-xs text-slate-400 font-medium">Bấm vào tên dạng bài để xem bài tập</span>
          </div>

          <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center">
            <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full overflow-visible">
              {/* Concentric rings */}
              {rings.map((ring, idx) => {
                const ringPoints = stats.map((_, i) => {
                  const { x, y } = getCoordinates(i, ring);
                  return `${x},${y}`;
                }).join(' ');
                return (
                  <polygon
                    key={idx}
                    points={ringPoints}
                    fill="none"
                    stroke="#334155"
                    strokeWidth="1"
                    strokeDasharray={idx === rings.length - 1 ? 'none' : '3,3'}
                    opacity={0.6}
                  />
                );
              })}

              {/* Axis lines */}
              {stats.map((_, i) => {
                const { x, y } = getCoordinates(i, 1.0);
                return (
                  <line
                    key={i}
                    x1={center}
                    y1={center}
                    x2={x}
                    y2={y}
                    stroke="#334155"
                    strokeWidth="1"
                  />
                );
              })}

              {/* Student mastery polygon */}
              <polygon
                points={studentPoints}
                fill="rgba(99, 102, 241, 0.35)"
                stroke="#818cf8"
                strokeWidth="2.5"
                className="transition-all duration-700 ease-out"
              />

              {/* Data points */}
              {stats.map((stat, i) => {
                const ratio = Math.max(0.1, stat.masteryScore / 100);
                const { x, y } = getCoordinates(i, ratio);
                return (
                  <circle
                    key={i}
                    cx={x}
                    cy={y}
                    r="5"
                    fill={stat.color}
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    className="hover:r-7 transition-all cursor-pointer"
                    onClick={() => onSelectTopic(stat.topicId)}
                  >
                    <title>{`${stat.name}: ${stat.masteryScore}%`}</title>
                  </circle>
                );
              })}

              {/* Labels on outer perimeter */}
              {stats.map((stat, i) => {
                const labelCoord = getCoordinates(i, 1.18);
                const isLeft = labelCoord.x < center - 10;
                const isRight = labelCoord.x > center + 10;
                const textAnchor = isLeft ? 'end' : isRight ? 'start' : 'middle';

                return (
                  <g key={i} className="cursor-pointer group" onClick={() => onSelectTopic(stat.topicId)}>
                    <text
                      x={labelCoord.x}
                      y={labelCoord.y}
                      fill={stat.color}
                      fontSize="11"
                      fontWeight="bold"
                      textAnchor={textAnchor}
                      alignmentBaseline="middle"
                      className="group-hover:fill-white transition-colors"
                    >
                      {stat.shortName}
                    </text>
                    <text
                      x={labelCoord.x}
                      y={labelCoord.y + 13}
                      fill="#94a3b8"
                      fontSize="9.5"
                      fontWeight="600"
                      textAnchor={textAnchor}
                      alignmentBaseline="middle"
                    >
                      {stat.masteryScore}%
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Diagnostic & Action Cards */}
        <div className="lg:col-span-5 space-y-6">
          {/* Smart Recommendation Card */}
          {recommended && (
            <div className="bg-gradient-to-br from-indigo-950/70 to-slate-900 border border-indigo-500/40 rounded-2xl p-6 shadow-xl relative overflow-hidden">
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Gợi ý thích ứng từ AI</span>
              </div>
              <h4 className="text-lg font-bold text-white mb-1">
                Luyện bài tiếp theo để nâng điểm!
              </h4>
              <p className="text-xs text-slate-300 mb-4">
                Dựa trên dạng bài bạn đang có điểm thành thạo thấp nhất (<strong>{weakestTopic?.name}</strong>), 
                hãy giải bài toán này để lấp đầy lỗ hổng kiến thức:
              </p>

              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 mb-4">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-extrabold text-sm text-indigo-300">{recommended.code}</span>
                  <span className="text-[11px] px-2 py-0.5 rounded-full font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {recommended.difficulty}
                  </span>
                </div>
                <div className="font-bold text-slate-200 text-sm">{recommended.title}</div>
                <div className="text-xs text-slate-400 mt-1">{recommended.contest}</div>
              </div>

              <button
                onClick={() => onSolveProblem(recommended)}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/30 transition-all"
              >
                <span>Vào làm bài này ngay</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Strong & Weak Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-900 border border-emerald-500/20 rounded-xl p-4">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold mb-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>Thế mạnh lớn nhất</span>
              </div>
              <div className="font-extrabold text-slate-200 text-sm">{strongestTopic?.name}</div>
              <div className="text-xs text-emerald-400 font-bold mt-1">Đạt {strongestTopic?.masteryScore}% thành thạo</div>
            </div>

            <div className="bg-slate-900 border border-amber-500/20 rounded-xl p-4">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold mb-1">
                <AlertCircle className="w-4 h-4" />
                <span>Cần rèn luyện thêm</span>
              </div>
              <div className="font-extrabold text-slate-200 text-sm">{weakestTopic?.name}</div>
              <div className="text-xs text-amber-400 font-bold mt-1">Mới đạt {weakestTopic?.masteryScore}% thành thạo</div>
            </div>
          </div>
        </div>
      </div>

      {/* 8 Topic Breakdown List */}
      <div>
        <h3 className="text-lg font-bold text-slate-200 mb-4 flex items-center gap-2">
          <span>Chi tiết độ hoàn thiện theo từng Dạng bài</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map(stat => (
            <div
              key={stat.topicId}
              onClick={() => onSelectTopic(stat.topicId)}
              className="bg-slate-900 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-700 rounded-xl p-4 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-sm text-slate-200 group-hover:text-indigo-300 transition-colors">
                  {stat.name}
                </span>
                <span className="text-xs font-bold" style={{ color: stat.color }}>
                  {stat.masteryScore}%
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden mb-2">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${stat.masteryScore}%`, backgroundColor: stat.color }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
                <span>{stat.solvedCount} / {stat.totalProblems} bài AC</span>
                <span className="text-indigo-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                  Xem bài <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
