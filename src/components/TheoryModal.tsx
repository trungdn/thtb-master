import React, { useState } from 'react';
import { Topic } from '../types';
import { MathText } from '../utils/mathRenderer';
import { X, Copy, Check, BookOpen, Code2 } from 'lucide-react';

interface TheoryModalProps {
  topic: Topic | null;
  onClose: () => void;
  onStartPracticing: (topicId: string) => void;
}

export const TheoryModal: React.FC<TheoryModalProps> = ({
  topic,
  onClose,
  onStartPracticing
}) => {
  const [copied, setCopied] = useState(false);

  if (!topic) return null;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center border"
              style={{
                backgroundColor: topic.bgColor,
                borderColor: topic.borderColor,
                color: topic.color
              }}
            >
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white leading-tight">
                {topic.name}
              </h2>
              <div className="text-xs text-slate-400">
                Lý thuyết & Khung Template chuẩn Tin học trẻ Bảng B
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-200 text-sm leading-relaxed">
          <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800">
            <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1">
              Mô tả & Định hướng thi đấu
            </h4>
            <p className="text-xs text-slate-300">{topic.description}</p>
            <div className="mt-3 flex items-center gap-2">
              <span className="text-[11px] font-semibold text-slate-400">Tần suất xuất hiện:</span>
              <span className="text-xs font-bold text-amber-400">{topic.frequency}</span>
            </div>
          </div>

          {/* Core Theory Body */}
          <div className="bg-slate-950/70 p-5 rounded-2xl border border-slate-800 shadow-inner">
            <MathText content={topic.coreTheory} />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800 bg-slate-950">
          <button
            onClick={() => handleCopy(topic.coreTheory)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-all"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Đã sao chép!' : 'Sao chép lý thuyết'}</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onStartPracticing(topic.id);
            }}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-lg shadow-indigo-600/30 transition-all"
          >
            <span>Luyện các bài dạng này</span>
          </button>
        </div>
      </div>
    </div>
  );
};
