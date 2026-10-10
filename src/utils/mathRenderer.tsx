import React from 'react';
import { marked } from 'marked';
import katex from 'katex';
import 'katex/dist/katex.min.css';

// Thiết lập renderer cho marked để xuất ra HTML tương thích hoàn hảo với giao diện Dark Mode
marked.use({
  gfm: true,
  breaks: true,
  renderer: {
    heading({ tokens, depth }: { tokens: any[]; depth: number }) {
      const text = this.parser.parseInline(tokens);
      if (depth === 1) {
        return `<h1 class="text-base sm:text-lg font-black text-white mt-4 mb-2 pb-1 border-b border-slate-800">${text}</h1>`;
      }
      if (depth === 2) {
        return `<h2 class="text-sm sm:text-base font-extrabold text-indigo-300 mt-3.5 mb-2">${text}</h2>`;
      }
      if (depth === 3) {
        return `<h3 class="text-xs sm:text-sm font-bold text-indigo-400 mt-3 mb-1.5 flex items-center gap-1.5">${text}</h3>`;
      }
      return `<h4 class="text-xs font-bold text-slate-200 mt-2 mb-1">${text}</h4>`;
    },
    codespan({ text }: { text: string }) {
      return `<code class="bg-slate-900 border border-slate-800 text-amber-300 px-1.5 py-0.5 rounded text-[11px] font-mono">${text}</code>`;
    },
    code({ text, lang }: { text: string; lang?: string }) {
      const language = lang || 'code';
      return `<div class="my-2.5 rounded-xl overflow-hidden border border-slate-800/90 bg-[#090d16] shadow-md">
        <div class="px-3 py-1 bg-slate-900/90 border-b border-slate-800 text-[10px] text-slate-400 uppercase font-mono tracking-wider flex items-center justify-between">
          <span>${language}</span>
        </div>
        <pre class="p-3 text-xs font-mono text-emerald-400 overflow-x-auto leading-relaxed"><code>${text}</code></pre>
      </div>`;
    },
    blockquote({ tokens }: { tokens: any[] }) {
      const body = this.parser.parse(tokens);
      return `<blockquote class="border-l-3 border-indigo-500 bg-indigo-950/25 pl-3.5 py-2 my-2.5 rounded-r-xl text-xs sm:text-sm text-slate-300 italic shadow-sm">${body}</blockquote>`;
    },
    list({ items, ordered }: { items: any[]; ordered: boolean }) {
      const tag = ordered ? 'ol' : 'ul';
      const listClass = ordered ? 'list-decimal ml-5 my-2 space-y-1' : 'list-disc ml-5 my-2 space-y-1';
      let body = '';
      for (const item of items) {
        body += `<li class="text-slate-300 leading-relaxed text-xs sm:text-sm pl-0.5">${this.parser.parse(item.tokens)}</li>`;
      }
      return `<${tag} class="${listClass}">${body}</${tag}>`;
    },
    hr() {
      return `<hr class="border-slate-800 my-3" />`;
    },
    strong({ tokens }: { tokens: any[] }) {
      return `<strong class="font-bold text-white">${this.parser.parseInline(tokens)}</strong>`;
    },
    paragraph({ tokens }: { tokens: any[] }) {
      return `<p class="my-1.5 leading-relaxed text-slate-200">${this.parser.parseInline(tokens)}</p>`;
    }
  }
});

interface MathTextProps {
  content: string;
  className?: string;
}

export const MathText: React.FC<MathTextProps> = ({ content, className = '' }) => {
  if (!content) return null;

  // 1. Tách công thức toán KaTeX ra trước khi chuyển qua Markdown parser để tránh xung đột ký tự LaTeX (_ * \)
  const mathBlocks: string[] = [];
  let processed = content.replace(/\$\$([\s\S]*?)\$\$/g, (_, math) => {
    const token = `__KATEX_BLOCK_${mathBlocks.length}__`;
    try {
      const rendered = katex.renderToString(math.trim(), { displayMode: true, throwOnError: false });
      mathBlocks.push(`<div class="my-3 py-1.5 px-3 bg-slate-900/60 rounded-xl border border-slate-800/80 overflow-x-auto text-center">${rendered}</div>`);
    } catch {
      mathBlocks.push(`<pre class="text-xs text-rose-400">${math}</pre>`);
    }
    return token;
  });

  const mathInlines: string[] = [];
  processed = processed.replace(/\$([^\$\n]+?)\$/g, (_, math) => {
    const token = `__KATEX_INLINE_${mathInlines.length}__`;
    try {
      const rendered = katex.renderToString(math.trim(), { displayMode: false, throwOnError: false });
      mathInlines.push(`<span class="inline-math px-1 py-0.5 rounded bg-slate-900/50 text-indigo-200 font-serif">${rendered}</span>`);
    } catch {
      mathInlines.push(`<span>${math}</span>`);
    }
    return token;
  });

  // 2. Parse Markdown sang HTML
  let html = marked.parse(processed) as string;

  // 3. Khôi phục lại các khối công thức toán KaTeX vào HTML hoàn chỉnh
  mathBlocks.forEach((renderedHtml, idx) => {
    html = html.replace(`__KATEX_BLOCK_${idx}__`, renderedHtml);
  });

  mathInlines.forEach((renderedHtml, idx) => {
    html = html.replace(`__KATEX_INLINE_${idx}__`, renderedHtml);
  });

  return (
    <div
      className={`markdown-math-content text-xs sm:text-sm leading-relaxed ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
