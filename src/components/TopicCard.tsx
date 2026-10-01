import React from 'react';
import { Topic } from '../types';
import { BookOpen, Code, ArrowRight, CheckCircle2 } from 'lucide-react';

interface TopicCardProps {
  topic: Topic;
  solvedCount: number;
  totalCount: number;
  masteryScore: number;
  onExploreTopic: (topicId: string) => void;
  onOpenTheory: (topic: Topic) => void;
}

export const TopicCard: React.FC<TopicCardProps> = ({
  topic,
  solvedCount,
  totalCount,
  masteryScore,
  onExploreTopic,
  onOpenTheory
}) => {
  return (
    <div className="bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 flex flex-col justify-between group">
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between mb-4">
          <span
            className="text-xs font-bold px-2.5 py-1 rounded-full border"
            style={{
              backgroundColor: topic.bgColor,
              borderColor: topic.borderColor,
              color: topic.color
            }}
          >
            {topic.shortName}
          </span>

          <span className="text-[11px] font-semibold text-slate-400 bg-slate-800/80 px-2.5 py-0.5 rounded-full border border-slate-700/60">
            {topic.frequency}
          </span>
        </div>

        {/* Topic Name & Description */}
        <h3 className="text-lg font-extrabold text-white group-hover:text-indigo-300 transition-colors mb-2">
          {topic.name}
        </h3>
        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
          {topic.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {topic.tags.slice(0, 4).map((tag, idx) => (
            <span
              key={idx}
              className="text-[10px] font-medium bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      <div>
        {/* Mastery Progress Bar */}
        <div className="mb-4 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
          <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
            <span className="text-slate-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Đã hoàn thành</span>
            </span>
            <span className="text-slate-200">
              <strong className="text-white">{solvedCount}</strong> / {totalCount} bài ({masteryScore}%)
            </span>
          </div>
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${masteryScore}%`,
                backgroundColor: topic.color
              }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onOpenTheory(topic)}
            className="flex items-center justify-center gap-1.5 py-2 px-3 bg-slate-800 hover:bg-slate-700/80 text-slate-200 hover:text-white rounded-xl text-xs font-bold transition-all border border-slate-700/60"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Lý thuyết</span>
          </button>

          <button
            onClick={() => onExploreTopic(topic.id)}
            className="flex items-center justify-center gap-1.5 py-2 px-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-indigo-600/20"
          >
            <span>Luyện {totalCount} bài</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
