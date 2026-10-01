import type { Topic } from '../types';

export const TOPICS: Topic[] = [
  {
    id: 'number-theory',
    name: 'Số học & Toán rời rạc',
    shortName: 'Số học',
    description: 'Số nguyên tố, Sàng Eratosthenes, UCLN/BCNN, phân tích thừa số, đồng dư thức, số lớn (BigNum) và quy luật dãy số.',
    frequency: '25% đề thi',
    color: '#3B82F6',
    bgColor: 'rgba(59, 130, 246, 0.1)',
    borderColor: 'rgba(59, 130, 246, 0.3)',
    icon: 'Binary',
    level: 'Cơ bản',
    tags: ['Sàng nguyên tố', 'Ước số', 'Đồng dư', 'BigNum', 'Toán tổ hợp'],
    coreTheory: `### 1. Số nguyên tố & Sàng Eratosthenes
- **Kiểm tra nguyên tố căn bậc hai**: Một số nguyên dương $N$ là số nguyên tố nếu không chia hết cho bất kỳ số nào từ $2$ đến $\\lfloor\\sqrt{N}\\rfloor$. Độ phức tạp: $O(\\sqrt{N})$.
- **Sàng Eratosthenes**: Sàng các số nguyên tố tới $10^6$ hoặc $10^7$ trong thời gian $O(N \\log \\log N)$.
\`\`\`cpp
const int MAXN = 1000000;
bool is_prime[MAXN + 1];
void sieve() {
    fill(is_prime, is_prime + MAXN + 1, true);
    is_prime[0] = is_prime[1] = false;
    for (int p = 2; p * p <= MAXN; p++) {
        if (is_prime[p]) {
            for (int i = p * p; i <= MAXN; i += p)
                is_prime[i] = false;
        }
    }
}
\`\`\`

### 2. Ước chung lớn nhất & Đồng dư
- Thuật toán Euclid: $\\gcd(a, b) = \\gcd(b, a \\pmod b)$. Trong C++ dùng \`std::__gcd(a, b)\`.
- Phép toán chia có dư với số lớn:
  - $(A + B) \\pmod M = (A \\pmod M + B \\pmod M) \\pmod M$
  - $(A \\times B) \\pmod M = ((A \\pmod M) \\times (B \\pmod M)) \\pmod M$

### 3. Số lớn (BigNum)
Rất hay gặp trong các bài vòng sơ loại bảng B: xử lý các số có tới $100$ đến $10^5$ chữ số bằng chuỗi ký tự \`string\`.`
  },
  {
    id: 'arrays-pointers',
    name: 'Mảng, Tiền tố & Hai con trỏ',
    shortName: 'Mảng & Con trỏ',
    description: 'Mảng cộng dồn (Prefix Sum 1D/2D), Mảng hiệu (Difference Array), Cửa sổ trượt (Sliding Window), Kỹ thuật Hai con trỏ.',
    frequency: '20% đề thi',
    color: '#10B981',
    bgColor: 'rgba(16, 185, 129, 0.1)',
    borderColor: 'rgba(16, 185, 129, 0.3)',
    icon: 'Layers',
    level: 'Cơ bản',
    tags: ['Prefix Sum', 'Hai con trỏ', 'Sliding Window', 'Mảng hiệu'],
    coreTheory: `### 1. Mảng cộng dồn 1D & 2D
- **1D Prefix Sum**: $pref[i] = pref[i-1] + a[i]$.
  - Tổng đoạn $[L, R]$ tính trong $O(1)$: $Sum(L, R) = pref[R] - pref[L-1]$.
- **2D Prefix Sum**: Tính tổng hình chữ nhật con từ $(x_1, y_1)$ đến $(x_2, y_2)$ trong $O(1)$:
  $$Sum = pref[x_2][y_2] - pref[x_1-1][y_2] - pref[x_2][y_1-1] + pref[x_1-1][y_1-1]$$

### 2. Kỹ thuật Hai con trỏ (Two Pointers)
Thường áp dụng khi mảng đã sắp xếp hoặc cần tìm đoạn liên tiếp thỏa mãn điều kiện đơn điệu:
\`\`\`cpp
int left = 0;
long long current_sum = 0;
for (int right = 0; right < n; right++) {
    current_sum += a[right];
    while (current_sum > K && left <= right) {
        current_sum -= a[left];
        left++;
    }
    // Cập nhật kết quả tại đây
}
\`\`\``
  },
  {
    id: 'binary-search',
    name: 'Chặt nhị phân & Tìm kiếm',
    shortName: 'Chặt nhị phân',
    description: 'Chặt nhị phân trên mảng đã sắp xếp và Chặt nhị phân tìm kết quả tối ưu (Binary Search on Answer) - Vũ khí phân loại bảng B.',
    frequency: '15% đề thi',
    color: '#8B5CF6',
    bgColor: 'rgba(139, 92, 246, 0.1)',
    borderColor: 'rgba(139, 92, 246, 0.3)',
    icon: 'Search',
    level: 'Trung bình',
    tags: ['Chặt nhị phân kết quả', 'lower_bound', 'Tối ưu hóa', 'Tính đơn điệu'],
    coreTheory: `### 1. Dấu hiệu nhận biết Chặt nhị phân kết quả
- Đề bài yêu cầu: *"Tìm giá trị $X$ nhỏ nhất sao cho..."* hoặc *"Tìm giá trị $X$ lớn nhất sao cho..."*.
- Ràng buộc kết quả nằm trong khoảng $[L, R]$ với không gian nghiệm đơn điệu:
  - Nếu giá trị $mid$ thỏa mãn thì mọi giá trị lớn hơn (hoặc nhỏ hơn) cũng thỏa mãn.
  - Hàm kiểm tra tính khả thi \`check(mid)\` chạy được trong $O(N)$ hoặc $O(N \\log N)$.

\`\`\`cpp
bool check(long long mid) {
    // Kiểm tra xem mid có thỏa mãn yêu cầu đề bài không
    return true; // hoặc false
}

long long low = 1, high = 1e18, ans = -1;
while (low <= high) {
    long long mid = low + (high - low) / 2;
    if (check(mid)) {
        ans = mid;
        high = mid - 1; // Tìm giá trị nhỏ nhất
    } else {
        low = mid + 1;
    }
}
\`\`\``
  },
  {
    id: 'dynamic-programming',
    name: 'Quy hoạch động (DP)',
    shortName: 'Quy hoạch động',
    description: 'DP 1D, Dãy con tăng dài nhất (LIS), Ba-lô (Knapsack 0/1), DP lưới ô vuông 2D và DP đếm số cách.',
    frequency: '15% đề thi',
    color: '#EC4899',
    bgColor: 'rgba(236, 72, 153, 0.1)',
    borderColor: 'rgba(236, 72, 153, 0.3)',
    icon: 'Cpu',
    level: 'Trung bình',
    tags: ['Knapsack', 'LIS', 'DP Lưới', 'DP Tiền tố', 'DP Đếm'],
    coreTheory: `### 1. Bản chất của Quy hoạch động
1. **Bài toán con gối nhau**: Lời giải bài toán lớn được ghép từ các bài toán con nhỏ hơn đã giải trước đó.
2. **Cấu trúc con tối ưu**: Nghiệm tối ưu của bài toán chứa nghiệm tối ưu của các bài toán con.

### 2. Các mô hình DP kinh điển bảng B:
- **Dãy con tăng dài nhất (LIS)**:
  - $dp[i]$: Độ dài dãy con tăng dài nhất kết thúc tại vị trí $i$.
  - Công thức: $dp[i] = \\max(dp[j] + 1)$ với mọi $j < i$ và $a[j] < a[i]$.
  - Tối ưu $O(N \\log N)$ bằng mảng đơn điệu kết hợp \`lower_bound\`.
- **Bài toán Ba-lô (0/1 Knapsack)**:
  - $dp[w]$: Giá trị lớn nhất đạt được với khối lượng túi bằng $w$.
  - $dp[w] = \\max(dp[w], dp[w - weight[i]] + value[i])$.
- **DP trên lưới ô vuông**:
  - $dp[i][j] = \\min(dp[i-1][j], dp[i][j-1]) + cost[i][j]$.`
  },
  {
    id: 'greedy-sorting',
    name: 'Thuật toán Tham lam (Greedy)',
    shortName: 'Tham lam',
    description: 'Chiến lược chọn phương án tối ưu cục bộ tại từng bước, sắp xếp với comparator tùy biến, bài toán chọn đoạn không giao nhau.',
    frequency: '10% đề thi',
    color: '#F59E0B',
    bgColor: 'rgba(245, 158, 11, 0.1)',
    borderColor: 'rgba(245, 158, 11, 0.3)',
    icon: 'Sparkles',
    level: 'Cơ bản',
    tags: ['Sắp xếp', 'Comparator', 'Chọn đoạn', 'Tối ưu cục bộ'],
    coreTheory: `### 1. Nguyên lý Tham lam
- Tại mỗi bước, đưa ra lựa chọn có vẻ tốt nhất ở thời điểm hiện tại mà không cần xét lại các bước sau.
- Điều kiện cần: Bài toán phải có tính chất lựa chọn tham lam (Greedy Choice Property) dẫn đến nghiệm tối ưu toàn cục.

### 2. Bài toán chọn đoạn (Interval Scheduling)
- Đề bài: Cho $N$ công việc với thời gian $[L_i, R_i]$, hãy chọn nhiều công việc nhất sao cho không trùng nhau.
- Chiến lược: Sắp xếp các đoạn theo **thời điểm kết thúc $R_i$ tăng dần**. Luôn ưu tiên chọn công việc kết thúc sớm nhất.`
  },
  {
    id: 'strings',
    name: 'Xử lý Xâu ký tự (Strings)',
    shortName: 'Xâu ký tự',
    description: 'Xâu đối xứng (Palindrome), xâu con, tần suất ký tự, biến đổi xâu và xử lý biểu thức số học.',
    frequency: '8% đề thi',
    color: '#06B6D4',
    bgColor: 'rgba(6, 182, 212, 0.1)',
    borderColor: 'rgba(6, 182, 212, 0.3)',
    icon: 'FileText',
    level: 'Cơ bản',
    tags: ['Palindrome', 'Xâu con', 'Tần suất', 'ASCII', 'Chuẩn hóa'],
    coreTheory: `### 1. Các thao tác xâu cơ bản trong C++
- \`std::string s;\`
- Chiều dài: \`s.length()\` hoặc \`s.size()\`
- Cắt xâu con: \`s.substr(pos, len)\`
- Tìm kiếm ký tự: \`s.find(target)\`

### 2. Xâu đối xứng (Palindrome)
- Kiểm tra tính đối xứng hai con trỏ từ ngoài vào trong:
\`\`\`cpp
bool isPalindrome(const string &s) {
    int l = 0, r = s.size() - 1;
    while (l < r) {
        if (s[l] != s[r]) return false;
        l++; r--;
    }
    return true;
}
\`\`\``
  },
  {
    id: 'backtracking',
    name: 'Duyệt vét cạn & Quay lui',
    shortName: 'Quay lui',
    description: 'Sinh hoán vị, tổ hợp, tập con, bài toán N quân hậu và kỹ thuật quay lui có tỉa nhánh cận để đạt trọn điểm subtask.',
    frequency: '5% đề thi',
    color: '#EF4444',
    bgColor: 'rgba(239, 68, 68, 0.1)',
    borderColor: 'rgba(239, 68, 68, 0.3)',
    icon: 'CornerDownRight',
    level: 'Trung bình',
    tags: ['Sinh hoán vị', 'Tổ hợp', 'Quay lui', 'Nhánh cận', 'Vét cạn'],
    coreTheory: `### 1. Khung mẫu Thuật toán Quay lui
\`\`\`cpp
void backtrack(int step) {
    if (step > N) {
        // Đã xây dựng xong một cấu hình hoàn chỉnh
        updateSolution();
        return;
    }
    for (int candidate : validChoices(step)) {
        applyChoice(candidate);
        if (isFeasible()) { // Tỉa nhánh cận nếu không khả thi
            backtrack(step + 1);
        }
        revertChoice(candidate); // Hoàn tác lựa chọn
    }
}
\`\`\``
  },
  {
    id: 'graphs-ds',
    name: 'Cấu trúc dữ liệu & Đồ thị cơ bản',
    shortName: 'Đồ thị & CTDL',
    description: 'Ngăn xếp (Stack ngoặc đúng), Hàng đợi ưu tiên (Priority Queue), BFS/DFS trên lưới ô vuông, Cây Fenwick (BIT).',
    frequency: '2% đề thi',
    color: '#6366F1',
    bgColor: 'rgba(99, 102, 241, 0.1)',
    borderColor: 'rgba(99, 102, 241, 0.3)',
    icon: 'Network',
    level: 'Nâng cao',
    tags: ['Stack', 'Queue', 'BFS Lưới', 'Cây Fenwick (BIT)'],
    coreTheory: `### 1. Ngăn xếp (Stack) kiểm tra ngoặc
- Đẩy dấu mở \`(\`, \`[\`, \`{\` vào stack.
- Khi gặp dấu đóng, kiểm tra đỉnh stack có tương ứng loại ngoặc không. Nếu có thì \`pop()\`, ngược lại xâu không hợp lệ.

### 2. BFS Loang trên Lưới ô vuông
- 4 hướng di chuyển: \`dx[] = {-1, 1, 0, 0}\`, \`dy[] = {0, 0, -1, 1}\`.
- Dùng \`std::queue<pair<int, int>>\` để tìm đường đi ngắn nhất.`
  }
];
