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

#### 🐍 Mẫu Python 3:
\`\`\`python
import math

def is_prime(n):
    if n < 2:
        return False
    for i in range(2, math.isqrt(n) + 1):
        if n % i == 0:
            return False
    return True

# Sàng Eratosthenes tới MAXN
MAXN = 1000000
is_p = [True] * (MAXN + 1)
is_p[0] = is_p[1] = False
for p in range(2, math.isqrt(MAXN) + 1):
    if is_p[p]:
        for i in range(p * p, MAXN + 1, p):
            is_p[i] = False
\`\`\`

#### ⚡ Mẫu C++:
\`\`\`cpp
const int MAXN = 1000000;
bool is_p[MAXN + 1];
void sieve() {
    fill(is_p, is_p + MAXN + 1, true);
    is_p[0] = is_p[1] = false;
    for (int p = 2; p * p <= MAXN; p++) {
        if (is_p[p]) {
            for (int i = p * p; i <= MAXN; i += p) is_p[i] = false;
        }
    }
}
\`\`\`

### 2. Ước chung lớn nhất & Đồng dư
- **Python**: Dùng thư viện có sẵn \`import math; g = math.gcd(a, b)\`.
- **C++**: Dùng \`std::__gcd(a, b)\`.
- **Đồng dư thức với số lớn**:
  - $(A + B) \\pmod M = (A \\pmod M + B \\pmod M) \\pmod M$
  - $(A \\times B) \\pmod M = ((A \\pmod M) \\times (B \\pmod M)) \\pmod M$

### 3. Số lớn (BigNum)
> 💡 **Ưu thế tuyệt đối của Python**: Kiểu số nguyên \`int\` trong Python tự động hỗ trợ số lớn vô hạn chữ số mà không bị tràn số! Học sinh dùng Python có thể tính $2^{1000}$ hoặc cộng trừ nhân chia số hàng trăm chữ số trực tiếp.`
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
    coreTheory: `### 1. Mảng cộng dồn (Prefix Sum 1D & 2D)
- **1D Prefix Sum**: $pref[i] = pref[i-1] + a[i]$.
  - Tổng đoạn $[L, R]$ tính trong $O(1)$: $Sum(L, R) = pref[R] - pref[L-1]$.

#### 🐍 Mẫu Python 3:
\`\`\`python
# Khởi tạo mảng cộng dồn 1D
pref = [0] * (n + 1)
for i in range(n):
    pref[i + 1] = pref[i] + a[i]

# Truy vấn tổng đoạn [L, R] (1-indexed) trong O(1):
def query_sum(L, R):
    return pref[R] - pref[L - 1]
\`\`\`

### 2. Kỹ thuật Hai con trỏ (Two Pointers)
Thường áp dụng khi mảng đã sắp xếp hoặc cần tìm đoạn con liên tiếp thỏa mãn điều kiện đơn điệu:

#### 🐍 Mẫu Python 3:
\`\`\`python
left = 0
current_sum = 0
ans = 0

for right in range(n):
    current_sum += a[right]
    while current_sum > K and left <= right:
        current_sum -= a[left]
        left += 1
    # Đoạn [left, right] hiện tại có tổng <= K
    ans = max(ans, right - left + 1)
\`\`\`

#### ⚡ Mẫu C++:
\`\`\`cpp
int left = 0;
long long current_sum = 0;
for (int right = 0; right < n; right++) {
    current_sum += a[right];
    while (current_sum > K && left <= right) {
        current_sum -= a[left++];
    }
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
- Ràng buộc nghiệm nằm trong khoảng $[L, R]$ có tính đơn điệu:
  - Nếu giá trị $mid$ thỏa mãn thì mọi giá trị lớn hơn (hoặc nhỏ hơn) cũng thỏa mãn.
  - Hàm kiểm tra tính khả thi \`check(mid)\` chạy được trong $O(N)$.

#### 🐍 Mẫu Python 3:
\`\`\`python
def check(mid):
    # Kiểm tra mid có thỏa mãn yêu cầu đề bài hay không
    return True

low, high = 1, 10**18
ans = -1
while low <= high:
    mid = (low + high) // 2
    if check(mid):
        ans = mid
        high = mid - 1  # Tìm giá trị nhỏ nhất
    else:
        low = mid + 1
print(ans)
\`\`\`

> 💡 **Mẹo Python**: Dùng thư viện \`bisect\` để tìm kiếm phần tử trên mảng đã sắp xếp:
\`\`\`python
import bisect
pos = bisect.bisect_left(arr, x)  # Tương đương lower_bound trong C++
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

#### 🐍 Mẫu Python 3: Dãy con tăng dài nhất (LIS)
\`\`\`python
# LIS cơ bản O(N^2)
dp = [1] * n
for i in range(n):
    for j in range(i):
        if a[j] < a[i]:
            dp[i] = max(dp[i], dp[j] + 1)
print(max(dp))
\`\`\`

#### 🐍 Mẫu Python 3: Ba-lô 0/1 (Knapsack)
\`\`\`python
# dp[w]: Giá trị lớn nhất với sức chứa w
dp = [0] * (W + 1)
for weight, value in items:
    for w in range(W, weight - 1, -1):
        dp[w] = max(dp[w], dp[w - weight] + value)
print(dp[W])
\`\`\`

#### 🐍 Mẫu Python 3: DP Lưới ô vuông 2D
\`\`\`python
# dp[i][j] = min(dp[i-1][j], dp[i][j-1]) + cost[i][j]
\`\`\``
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
- Chiến lược: Sắp xếp các đoạn theo **thời điểm kết thúc $R_i$ tăng dần**.

#### 🐍 Mẫu Python 3:
\`\`\`python
# Sắp xếp danh sách các đoạn (start, end) theo end tăng dần
intervals.sort(key=lambda x: x[1])

count = 0
last_end = -float('inf')
for start, end in intervals:
    if start >= last_end:
        count += 1
        last_end = end
print("Số đoạn chọn được nhiều nhất:", count)
\`\`\``
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
    coreTheory: `### 1. Các thao tác xâu siêu mạnh trong Python
- **Đảo ngược chuỗi (Kiểm tra Palindrome)**: \`s == s[::-1]\` (cực kỳ ngắn gọn so với C++!).
- **Độ dài**: \`len(s)\`
- **Cắt xâu con**: \`s[start:end]\`
- **Đếm số lần xuất hiện**: \`s.count('a')\`
- **Tách từ theo dấu cách**: \`s.split()\`
- **Mã ASCII**: \`ord('A') = 65\`, \`chr(65) = 'A'\`

#### 🐍 Mẫu Python 3:
\`\`\`python
# Kiểm tra xâu đối xứng (Palindrome)
def is_palindrome(s):
    return s == s[::-1]

# Đếm tần suất ký tự
freq = {}
for ch in s:
    freq[ch] = freq.get(ch, 0) + 1
\`\`\`

#### ⚡ Mẫu C++:
\`\`\`cpp
bool isPalindrome(const string &s) {
    int l = 0, r = s.size() - 1;
    while (l < r) {
        if (s[l++] != s[r--]) return false;
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

#### 🐍 Mẫu Python 3:
\`\`\`python
def backtrack(step):
    if step == N:
        # Đã xây dựng xong một cấu hình hoàn chỉnh
        update_solution()
        return
    for choice in get_valid_choices(step):
        apply_choice(choice)
        if is_feasible():  # Tỉa nhánh cận nếu không khả thi
            backtrack(step + 1)
        revert_choice(choice)  # Hoàn tác lựa chọn
\`\`\`

> 💡 **Thư viện sinh hoán vị & tổ hợp sẵn trong Python**:
\`\`\`python
from itertools import permutations, combinations
# Sinh tất cả hoán vị của danh sách
perms = list(permutations([1, 2, 3]))
# Sinh tất cả tổ hợp chập 2
combs = list(combinations([1, 2, 3], 2))
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
    coreTheory: `### 1. Ngăn xếp (Stack) kiểm tra ngoặc đúng trong Python
\`\`\`python
def is_valid_brackets(s):
    stack = []
    pairs = {')': '(', ']': '[', '}': '{'}
    for ch in s:
        if ch in '([{':
            stack.append(ch)
        elif ch in ')]}':
            if not stack or stack[-1] != pairs[ch]:
                return False
            stack.pop()
    return len(stack) == 0
\`\`\`

### 2. BFS Loang trên Lưới ô vuông trong Python
\`\`\`python
from collections import deque

dx = [-1, 1, 0, 0]
dy = [0, 0, -1, 1]

queue = deque([(start_x, start_y)])
visited = set([(start_x, start_y)])

while queue:
    x, y = queue.popleft()
    for i in range(4):
        nx, ny = x + dx[i], y + dy[i]
        if 0 <= nx < rows and 0 <= ny < cols and (nx, ny) not in visited:
            visited.add((nx, ny))
            queue.append((nx, ny))
\`\`\``
  }
];
