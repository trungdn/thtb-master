import React from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface MathTextProps {
  content: string;
  className?: string;
}

export const MathText: React.FC<MathTextProps> = ({ content, className = '' }) => {
  // Replace $$...$$ and $...$ with KaTeX rendered HTML
  const renderMathContent = (text: string) => {
    if (!text) return '';

    // First replace block math $$...$$
    let formatted = text.replace(/\$\$([\s\S]*?)\$\$/g, (_, math) => {
      try {
        return `<div class="my-2 py-1 overflow-x-auto text-center">${katex.renderToString(math.trim(), { displayMode: true, throwOnError: false })}</div>`;
      } catch {
        return math;
      }
    });

    // Then replace inline math $...$
    formatted = formatted.replace(/\$([^\$\n]+?)\$/g, (_, math) => {
      try {
        return `<span class="inline-math px-0.5">${katex.renderToString(math.trim(), { displayMode: false, throwOnError: false })}</span>`;
      } catch {
        return math;
      }
    });

    // Replace linebreaks with <br/> or paragraphs
    formatted = formatted.replace(/\n\n/g, '<div class="h-3"></div>').replace(/\n/g, '<br/>');

    return formatted;
  };

  return (
    <div
      className={`leading-relaxed ${className}`}
      dangerouslySetInnerHTML={{ __html: renderMathContent(content) }}
    />
  );
};
