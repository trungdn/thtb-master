# ⚡ THT-B Master — Nền Tảng Luyện Thi Tin Học Trẻ Bảng B (THCS)

> **Hệ thống luyện thi chuyên sâu theo Dạng bài & Cây kỹ năng (Skill Tree)**  
> Chuẩn hóa từ hơn 44 đề thi chính thức Hội thi Tin học trẻ Toàn quốc (2022 – 2026), tích hợp Biểu đồ Radar theo dõi năng lực, Trợ lý Socratic AI sư phạm và AI Generator sinh bài tập tương tự.

---

## 🌟 Điểm nổi bật của nền tảng

1. **Phân loại theo 8 Dạng bài cốt lõi (Không chia theo năm):**
   - 🔢 **Số học & Toán rời rạc** (Sàng Eratosthenes, UCLN/BCNN, đồng dư thức, số lớn BigNum...)
   - 📊 **Mảng, Tiền tố & Hai con trỏ** (Prefix Sum 1D/2D, Sliding Window, Two Pointers...)
   - 🔍 **Chặt nhị phân & Tìm kiếm** (Chặt nhị phân tìm kết quả tối ưu - Binary Search on Answer...)
   - 💻 **Quy hoạch động (DP)** (DP 1D, LIS, Knapsack 0/1, DP lưới ô vuông, DP khối liên tiếp...)
   - ⚡ **Thuật toán Tham lam (Greedy) & Sắp xếp** (Custom comparator, chọn đoạn...)
   - 🔤 **Xử lý Xâu ký tự (Strings)** (Palindrome, xâu con đối xứng, tần suất...)
   - ♟️ **Duyệt toàn bộ & Quay lui** (Sinh hoán vị, tập con, bài toán N quân hậu nhánh cận...)
   - 🕸️ **Cấu trúc dữ liệu & Đồ thị cơ bản** (Ngăn xếp ngoặc, BFS lưới, Cây Fenwick BIT...)

2. **Biểu đồ Radar Năng Lực 8 Trục (Interactive Spider Chart):**
   - Đo lường độ hoàn thiện kỹ năng của học sinh theo từng chủ đề dựa trên điểm các Subtask đã nộp.
   - Tự động chẩn đoán điểm yếu nhất và đề xuất bài tập khắc phục phù hợp.

3. **Gia sư Socratic AI (Không đưa đáp án trực tiếp):**
   - Hướng dẫn học sinh tư duy qua **Thang hỗ trợ 5 nấc**:
     - *Nấc 1*: Phân tích ràng buộc & độ phức tạp $O(N)$
     - *Nấc 2*: Cách trâu lấy điểm Subtask 1
     - *Nấc 3*: Điểm quan sát mấu chốt để tối ưu
     - *Nấc 4*: Thiết lập trạng thái thuật toán / mã giả
     - *Nấc 5*: Bắt bệnh Edge Cases (tràn số, $N=1$, WA/TLE)

4. **AI Problem Generator (Sinh đề tương tự):**
   - Chỉ với 1 click, AI tự động sinh bài toán biến thể cùng dạng bài nhưng đổi ngữ cảnh sinh động để học sinh rèn luyện tư duy độc lập.

5. **Trình soạn thảo Monaco Editor & Trình chấm điểm Subtask:**
   - Hỗ trợ **C++20** và **Python 3**.
   - Render công thức toán học sắc nét với **KaTeX**.
   - Tự động chấm điểm từng Subtask và bắn pháo hoa khi đạt AC!

---

## 🚀 Hướng dẫn cài đặt & Chạy trên máy

### Yêu cầu môi trường
- [Node.js](https://nodejs.org/) (phiên bản 18+ trở lên)
- Trình duyệt Chrome / Safari / Edge

### Cài đặt và khởi chạy:
```bash
# 1. Cài đặt các thư viện phụ thuộc
npm install

# 2. Khởi chạy máy chủ phát triển
npm run dev
```

Mở trình duyệt truy cập: **`http://localhost:5173/`**

### Đóng gói sản phẩm (Production Build):
```bash
npm run build
npm run preview
```

---

## 📂 Cấu trúc thư mục

```
thtb/
├── dethi/                 # Kho 44 file đề thi PDF gốc (2022 - 2026)
├── src/
│   ├── components/        # Các thành phần giao diện (Header, Radar, Workspace, ProblemList...)
│   ├── data/              # Dữ liệu 44 bài toán và phân loại 8 Dạng bài
│   │   ├── problemsData.ts
│   │   └── taxonomyData.ts
│   ├── types/             # Định nghĩa kiểu dữ liệu TypeScript
│   ├── utils/             # Trình chấm test case, Socratic AI simulator, localStorage...
│   ├── App.tsx            # Luồng ứng dụng chính
│   └── main.tsx
└── package.json
```

---

*Dành tặng các thầy cô và học sinh tham gia Hội thi Tin học trẻ Bảng B (THCS).*
