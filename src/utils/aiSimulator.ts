import { Problem, ChatMessage } from '../types';

export function getInitialSocraticGreeting(problem: Problem): string {
  return `Chào bạn! Thầy là **Trợ lý Gia sư Socratic** chuyên luyện thi Tin học trẻ Bảng B.

Thầy ở đây để đồng hành cùng bạn tư duy từng bước cho bài toán **${problem.code} - ${problem.title}**.

> 💡 **Quy tắc vàng của thầy**: Thầy sẽ **không đưa ngay code giải hoàn chỉnh**, vì điều đó sẽ làm mất cơ hội rèn luyện tư duy của bạn trong phòng thi! Thay vào đó, thầy sẽ đặt các câu hỏi gợi mở, hướng dẫn bạn từng nấc thang tư duy từ Subtask 1 tới thuật toán tối ưu.

👉 **Bắt đầu nhé**: Bạn đã đọc kỹ đề và phân tích xem bài này thuộc dạng thuật toán nào chưa? Bạn có thể bấm các gợi ý bên dưới hoặc hỏi thầy bất kỳ điều gì!`;
}

export function generateSocraticResponse(
  problem: Problem,
  userMessage: string,
  userCode: string,
  hintLevel?: number
): string {
  const msgLower = userMessage.toLowerCase();

  // If triggered by a specific hint level
  if (hintLevel) {
    const hint = problem.hints.find(h => h.level === hintLevel);
    if (hint) {
      return `### 🎯 Gợi ý Nấc ${hint.level}: ${hint.title}

❓ **Câu hỏi tư duy cho bạn:**
${hint.question}

🧭 **Chỉ dẫn phương pháp:**
${hint.guidance}

---
*Sau khi suy ngẫm câu hỏi trên, bạn đã có ý tưởng viết code cho phần này chưa? Hãy chia sẻ với thầy nhé!*`;
    }
  }

  // Check for common student questions
  if (msgLower.includes('subtask 1') || msgLower.includes('trâu') || msgLower.includes('ngây thơ') || msgLower.includes('vét cạn')) {
    const h2 = problem.hints.find(h => h.level === 2);
    return `### 🛡️ Chiến lược Vét cạn (Ăn chắc điểm Subtask 1)
Trong thi đấu Tin học trẻ, **"Ăn trâu"** là thuật ngữ quen thuộc chỉ **Thuật toán Vét cạn (Brute Force)** — tức là cách giải tự nhiên, thử hết mọi trường hợp để lấy trọn điểm cho các Subtask đầu tiên (khi $N$ còn nhỏ).

${h2 ? h2.guidance : 'Hãy thử tất cả các trường hợp có thể với 2 vòng lặp lồng nhau hoặc hàm đệ quy đơn giản. Khi $N$ nhỏ (ví dụ $N \\le 100$), độ phức tạp $O(N^2)$ hoàn toàn chạy kịp trong thời gian quy định 1.0s!'}

💡 **Chiến thuật phòng thi**: Đừng để bị 0 điểm! Cài xong cách vét cạn này giúp bạn nắm chắc 30% - 50% số điểm của bài trước khi bắt tay vào tối ưu.

*Bạn hãy thử viết mã giả cho cách duyệt vét cạn này xem nhé!*`;
  }

  if (msgLower.includes('tle') || msgLower.includes('chậm') || msgLower.includes('thời gian') || msgLower.includes('tối ưu')) {
    const h3 = problem.hints.find(h => h.level === 3);
    return `### ⚡ Phân tích TLE (Vượt quá thời gian)
Trong đề thi Bảng B, giới hạn thời gian thường là $1.0s$ (tương đương khoảng $10^8$ phép tính cơ bản).

- Bài toán này có ràng buộc $N$ lớn nhất là bao nhiêu?
- Nếu $N \\approx 10^5$, thuật toán $O(N^2)$ sẽ tốn $10^{10}$ phép tính $\\rightarrow$ Chắc chắn bị TLE!
- Ta cần đưa về $O(N)$ hoặc $O(N \\log N)$.

💡 **Điểm mấu chốt để tối ưu:**
${h3 ? h3.guidance : 'Hãy xem xét liệu có cấu trúc dữ liệu nào (mảng cộng dồn, hai con trỏ, hoặc chặt nhị phân) giúp giảm một vòng lặp không?'}

*Bạn có thấy tính chất đơn điệu hay giá trị tiền tố nào có thể tính trước không?*`;
  }

  if (msgLower.includes('wa') || msgLower.includes('sai') || msgLower.includes('wrong') || msgLower.includes('test case')) {
    const h5 = problem.hints.find(h => h.level === 5);
    return `### 🔍 Bắt bệnh Wrong Answer (WA)
Khi code của bạn chạy đúng test ví dụ nhưng nộp lên bị Wrong Answer, hãy tự kiểm tra danh sách các lỗi kinh điển sau:

1. **Tràn số 32-bit (Integer Overflow)**: Các biến tính tổng, tích có thể vượt quá $2 \\times 10^9$ không? Đã dùng \`long long\` chưa?
2. **Trường hợp biên (Edge Cases)**: Đã thử với $N = 1$, số âm, hoặc tất cả phần tử bằng nhau chưa?
3. **Khởi tạo biến**: Các biến \`min_val\` hay \`max_val\` ban đầu đã được gán giá trị vô cùng (\`INF = 1e18\` hoặc \`-1e18\`) đủ lớn chưa?

${h5 ? `\n⚠️ **Lưu ý riêng cho bài ${problem.code}:**\n` + h5.guidance : ''}

*Bạn thử kiểm tra lại các điểm trên trong code xem có chỗ nào chưa an toàn không?*`;
  }

  if (msgLower.includes('code') || msgLower.includes('đáp án') || msgLower.includes('cho em xin code') || msgLower.includes('giải hộ')) {
    return `🤖 **Thầy hiểu là bạn đang rất muốn xem code hoàn chỉnh!**

Tuy nhiên, nếu thầy đưa code ra ngay lúc này, bạn sẽ mất đi niềm vui tự tay chinh phục bài toán và kỹ năng phân tích độc lập khi bước vào phòng thi Tin học trẻ.

Thay vì xem code, hãy cho thầy biết:
1. Bạn đang vướng ở khâu **lên ý tưởng** hay khâu **cài đặt bằng C++/Python**?
2. Hãy bấm nút **"Gợi ý Nấc 3"** hoặc **"Gợi ý Nấc 4"** bên dưới để xem hướng dẫn thiết lập trạng thái thuật toán nhé!`;
  }

  // General response
  return `Thầy đã nhận được câu hỏi của bạn về bài **${problem.code}**.

Để giải quyết bài này, ta cần chú ý:
- Phân tích kỹ mẫu input/output đề bài cho.
- Nhận diện đúng dạng bài: **${problem.title}** thuộc chủ đề **${problem.topicId}**.

👉 Bạn có muốn thầy gợi ý về **Ý tưởng tối ưu (Nấc 3)** hay cách **Bắt bệnh lỗi (Nấc 5)** không?`;
}

export function generateSimilarProblem(original: Problem): Problem {
  const variantId = `var-${original.id}-${Date.now().toString().slice(-4)}`;
  
  // Variations based on original topic
  const stories = [
    {
      context: 'Cuộc thi Robocon trường học',
      char: 'Bảo và nhóm bạn tham gia lập trình robot tự hành',
      item: 'trạm sạc năng lượng'
    },
    {
      context: 'Lễ hội Đua thuyền truyền thống',
      char: 'Đội trưởng An cần điều phối các tay chèo vượt sóng',
      item: 'phao tiêu kiểm soát thời gian'
    },
    {
      context: 'Thám hiểm Vũ trụ',
      char: 'Phi hành gia Minh điều khiển tàu thăm dò không gian',
      item: 'thiên thạch phát tín hiệu'
    }
  ];

  const story = stories[Math.floor(Math.random() * stories.length)];

  return {
    id: variantId,
    code: `${original.code}_V2`,
    title: `${original.title} (Biến thể luyện tập)`,
    contest: `Luyện tập thích ứng - Cùng dạng với ${original.contest}`,
    year: 2026,
    topicId: original.topicId,
    difficulty: original.difficulty,
    timeLimit: original.timeLimit,
    memoryLimit: original.memoryLimit,
    description: `### 🚀 Bối cảnh bài toán: ${story.context}\n\n${story.char}. Trong quá trình thực hiện nhiệm vụ, họ gặp phải một thách thức liên quan đến các ${story.item}.\n\nBài toán yêu cầu tính toán cấu hình tối ưu tương tự nguyên lý của bài toán **${original.code}**:\n\n${original.description.replace(/Alice|An và Bình/g, story.char.split(' ')[0])}\n\n> 🎯 **Mục tiêu rèn luyện**: Hãy áp dụng trực tiếp thuật toán và tư duy bạn vừa học được ở bài gốc để chinh phục bài tập biến thể này!`,
    inputFormat: original.inputFormat,
    outputFormat: original.outputFormat,
    subtasks: original.subtasks,
    sampleTests: original.sampleTests,
    hints: original.hints,
    solutionIdea: `Áp dụng cùng mô hình thuật toán của bài gốc **${original.code}**: ${original.solutionIdea}`,
    solutionCodeCpp: original.solutionCodeCpp,
    solutionCodePy: original.solutionCodePy,
    templateCodeCpp: `// Bài tập biến thể của ${original.code}\n${original.templateCodeCpp}`,
    templateCodePy: `# Bài tập biến thể của ${original.code}\n${original.templateCodePy}`,
    isAIGenerated: true,
    originalProblemId: original.id
  };
}
