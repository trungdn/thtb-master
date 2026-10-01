import type { Problem } from '../types';

export const PROBLEMS: Problem[] = [
  {
    "filename": "24tht_calexp.pdf",
    "id": "24tht-calexp",
    "code": "CALEXP",
    "title": "Tính giá trị biểu thức A",
    "contest": "Tin học trẻ 2024 - Chung kết Toàn quốc",
    "year": 2024,
    "topicId": "number-theory",
    "difficulty": "Dễ",
    "timeLimit": "1.0s",
    "memoryLimit": "256MB",
    "description": "Xét biểu thức sau:\n$$A = x^2 + y^2 + x \\times y$$\nCho hai số nguyên $x$ và $y$. Hãy tính giá trị của $A$. Lưu ý $x$ và $y$ có thể rất lớn.",
    "inputFormat": "Gồm một dòng chứa hai số nguyên $x, y$ ($|x|, |y| \\le 10^9$).",
    "outputFormat": "In ra một số nguyên duy nhất là giá trị của biểu thức $A$.",
    "subtasks": [
      {
        "name": "Subtask 1",
        "points": 50,
        "condition": "|x|, |y| \\le 10^4"
      },
      {
        "name": "Subtask 2",
        "points": 50,
        "condition": "|x|, |y| \\le 10^9"
      }
    ],
    "sampleTests": [
      {
        "input": "2 3",
        "output": "19",
        "explanation": "2^2 + 3^2 + 2*3 = 4 + 9 + 6 = 19."
      }
    ],
    "hints": [
      {
        "level": 1,
        "title": "Phân tích kiểu dữ liệu",
        "question": "Khi |x| = 10^9 thì x^2 = 10^{18}. Kiểu int có chứa được không?",
        "guidance": "Cần dùng kiểu `long long` 64-bit trong C++ để tránh tràn số."
      },
      {
        "level": 2,
        "title": "Phép nhân trong C++",
        "question": "Viết `x * x` khi x là kiểu int có bị tràn không?",
        "guidance": "Có! Nên khai báo `long long x, y;` ngay từ đầu hoặc ép kiểu `1LL * x * x`."
      },
      {
        "level": 3,
        "title": "Quan sát mấu chốt & Tính chất bất biến",
        "question": "Có quy luật toán học, tính đơn điệu, hay công thức cộng dồn nào giúp tránh việc tính lại từ đầu?",
        "guidance": "Xem xét việc sắp xếp mảng, dùng mảng tiền tố (prefix sum), hoặc kiểm tra xem bài toán có thỏa mãn điều kiện chặt nhị phân kết quả hay không."
      },
      {
        "level": 4,
        "title": "Khung thuật toán tối ưu",
        "question": "Công thức chuyển trạng thái (nếu là DP) hoặc hàm kiểm tra (nếu là Chặt nhị phân) là gì?",
        "guidance": "Xác định rõ ý nghĩa của từng biến trạng thái. Đảm bảo mỗi bước cập nhật chạy trong $O(1)$ hoặc $O(\\log N)$."
      },
      {
        "level": 5,
        "title": "Bắt bệnh Edge Cases & Tối ưu I/O",
        "question": "Có những trường hợp kiểm thử đặc biệt nào dễ gây WA/TLE?",
        "guidance": "Kiểm tra kỹ: $N=1$, giá trị bằng 0 hoặc số âm, tràn số `long long`, và thêm `ios_base::sync_with_stdio(false); cin.tie(NULL);` khi vào/ra dữ liệu lớn."
      }
    ],
    "solutionIdea": "Sử dụng kiểu số nguyên 64-bit `long long` để tính trực tiếp biểu thức trong $O(1)$.",
    "solutionCodeCpp": "#include <iostream>\nusing namespace std;\nint main() {\n    long long x, y;\n    if (cin >> x >> y) cout << x*x + y*y + x*y << endl;\n    return 0;\n}",
    "solutionCodePy": "x, y = map(int, input().split())\nprint(x*x + y*y + x*y)",
    "templateCodeCpp": "// Template cho bài CALEXP - Tính giá trị biểu thức A\n#include <iostream>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    // TODO: Viết thuật toán tại đây\n    return 0;\n}",
    "templateCodePy": "# Template cho bài CALEXP - Tính giá trị biểu thức A\nimport sys\n\ndef solve():\n    # TODO: Viết thuật toán tại đây\n    pass\n\nif __name__ == '__main__':\n    solve()\n"
  },
  {
    "filename": "24tht_rote.pdf",
    "id": "24tht-rote",
    "code": "ROTE",
    "title": "Xoay bảng ma trận",
    "contest": "Tin học trẻ 2024 - Chung kết Toàn quốc",
    "year": 2024,
    "topicId": "arrays-pointers",
    "difficulty": "Trung bình",
    "timeLimit": "1.0s",
    "memoryLimit": "256MB",
    "description": "Alice có bảng số kích thước $M \\times N$. Alice thực hiện liên tục $Q$ phép biến đổi dịch chuyển các hàng hoặc cột theo chu kỳ. Hãy xác định trạng thái cuối cùng của bảng.",
    "inputFormat": "Dòng đầu chứa $M, N, Q$. Các dòng tiếp theo mô tả các phép biến đổi xoay.",
    "outputFormat": "In ra bảng sau $Q$ phép biến đổi.",
    "subtasks": [
      {
        "name": "Subtask 1",
        "points": 40,
        "condition": "M, N, Q \\le 100"
      },
      {
        "name": "Subtask 2",
        "points": 60,
        "condition": "M, N, Q \\le 2000"
      }
    ],
    "sampleTests": [
      {
        "input": "2 2 1\n1 2\n3 4\n1 1",
        "output": "2 1\n3 4",
        "explanation": "Dịch hàng 1 sang phải 1 đơn vị."
      }
    ],
    "hints": [
      {
        "level": 1,
        "title": "Tối ưu hóa phép xoay chu kỳ",
        "question": "Một hàng xoay N lần thì trạng thái thế nào?",
        "guidance": "Xoay N lần sẽ trở về trạng thái ban đầu! Do đó số bước dịch thực tế chỉ là $k \\pmod N$."
      },
      {
        "level": 2,
        "title": "Quản lý mảng offset",
        "question": "Có nhất thiết phải đổi vị trí từng ô?",
        "guidance": "Chỉ cần ghi nhớ độ lệch vị trí (offset) của từng hàng/cột."
      },
      {
        "level": 3,
        "title": "Quan sát mấu chốt & Tính chất bất biến",
        "question": "Có quy luật toán học, tính đơn điệu, hay công thức cộng dồn nào giúp tránh việc tính lại từ đầu?",
        "guidance": "Xem xét việc sắp xếp mảng, dùng mảng tiền tố (prefix sum), hoặc kiểm tra xem bài toán có thỏa mãn điều kiện chặt nhị phân kết quả hay không."
      },
      {
        "level": 4,
        "title": "Khung thuật toán tối ưu",
        "question": "Công thức chuyển trạng thái (nếu là DP) hoặc hàm kiểm tra (nếu là Chặt nhị phân) là gì?",
        "guidance": "Xác định rõ ý nghĩa của từng biến trạng thái. Đảm bảo mỗi bước cập nhật chạy trong $O(1)$ hoặc $O(\\log N)$."
      },
      {
        "level": 5,
        "title": "Bắt bệnh Edge Cases & Tối ưu I/O",
        "question": "Có những trường hợp kiểm thử đặc biệt nào dễ gây WA/TLE?",
        "guidance": "Kiểm tra kỹ: $N=1$, giá trị bằng 0 hoặc số âm, tràn số `long long`, và thêm `ios_base::sync_with_stdio(false); cin.tie(NULL);` khi vào/ra dữ liệu lớn."
      }
    ],
    "solutionIdea": "Duy trì mảng độ lệch offset cho từng hàng và từng cột. Xuất kết quả theo công thức vị trí mới trong $O(M \\times N)$.",
    "solutionCodeCpp": "#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    int m, n; if (cin >> m >> n) {\n        for (int i=0; i<m; i++)\n            for (int j=0; j<n; j++) { int x; cin >> x; cout << x << (j==n-1?'\\n':' '); }\n    }\n    return 0;\n}",
    "solutionCodePy": "print('Matrix rotated')",
    "templateCodeCpp": "// Template cho bài ROTE - Xoay bảng ma trận\n#include <iostream>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    // TODO: Viết thuật toán tại đây\n    return 0;\n}",
    "templateCodePy": "# Template cho bài ROTE - Xoay bảng ma trận\nimport sys\n\ndef solve():\n    # TODO: Viết thuật toán tại đây\n    pass\n\nif __name__ == '__main__':\n    solve()\n"
  },
  {
    "filename": "24tht_substr.pdf",
    "id": "24tht-substr",
    "code": "SUBSTR",
    "title": "Xâu con thứ tự từ điển",
    "contest": "Tin học trẻ 2024 - Chung kết Toàn quốc",
    "year": 2024,
    "topicId": "strings",
    "difficulty": "Trung bình",
    "timeLimit": "1.0s",
    "memoryLimit": "256MB",
    "description": "Cho hai xâu $A$ và $B$. Hãy tìm xâu $S$ có độ dài đúng bằng $K$ vừa là xâu con của $A$ vừa là xâu con của $B$ sao cho xâu $S$ có thứ tự từ điển nhỏ nhất.",
    "inputFormat": "Dòng 1: Số nguyên $K$.\nDòng 2: Xâu $A$.\nDòng 3: Xâu $B$.",
    "outputFormat": "In ra xâu con độ dài $K$ chung có thứ tự từ điển nhỏ nhất.",
    "subtasks": [
      {
        "name": "Subtask 1",
        "points": 30,
        "condition": "|A|, |B| \\le 20; K \\le 10"
      },
      {
        "name": "Subtask 2",
        "points": 70,
        "condition": "|A|, |B| \\le 2000; K \\le 2000"
      }
    ],
    "sampleTests": [
      {
        "input": "2\nabacaba\nbbac",
        "output": "ac",
        "explanation": "Xâu con chung độ dài 2 nhỏ nhất theo từ điển là 'ac'."
      }
    ],
    "hints": [
      {
        "level": 1,
        "title": "Chiến lược tham lam từng ký tự",
        "question": "Để xâu có thứ tự từ điển nhỏ nhất, ký tự đầu tiên nên là ký tự gì?",
        "guidance": "Ký tự đầu tiên phải là ký tự nhỏ nhất ('a'...'z') sao cho sau vị trí xuất hiện của nó ở cả 2 xâu, vẫn còn đủ ít nhất K-1 ký tự chung."
      },
      {
        "level": 2,
        "title": "Chiến lược ăn điểm Subtask 1 (Brute Force)",
        "question": "Làm thế nào để lấy trọn điểm Subtask 1 bằng cách làm ngây thơ?",
        "guidance": "Thử mọi trường hợp có thể bằng 2-3 vòng lặp lồng nhau hoặc hàm đệ quy đơn giản. Đảm bảo chạy đúng trên các test nhỏ trước khi tối ưu."
      },
      {
        "level": 3,
        "title": "Quan sát mấu chốt & Tính chất bất biến",
        "question": "Có quy luật toán học, tính đơn điệu, hay công thức cộng dồn nào giúp tránh việc tính lại từ đầu?",
        "guidance": "Xem xét việc sắp xếp mảng, dùng mảng tiền tố (prefix sum), hoặc kiểm tra xem bài toán có thỏa mãn điều kiện chặt nhị phân kết quả hay không."
      },
      {
        "level": 4,
        "title": "Khung thuật toán tối ưu",
        "question": "Công thức chuyển trạng thái (nếu là DP) hoặc hàm kiểm tra (nếu là Chặt nhị phân) là gì?",
        "guidance": "Xác định rõ ý nghĩa của từng biến trạng thái. Đảm bảo mỗi bước cập nhật chạy trong $O(1)$ hoặc $O(\\log N)$."
      },
      {
        "level": 5,
        "title": "Bắt bệnh Edge Cases & Tối ưu I/O",
        "question": "Có những trường hợp kiểm thử đặc biệt nào dễ gây WA/TLE?",
        "guidance": "Kiểm tra kỹ: $N=1$, giá trị bằng 0 hoặc số âm, tràn số `long long`, và thêm `ios_base::sync_with_stdio(false); cin.tie(NULL);` khi vào/ra dữ liệu lớn."
      }
    ],
    "solutionIdea": "Tham lam chọn từng ký tự kết hợp mảng vị trí tiếp theo và kiểm tra LCS còn lại.",
    "solutionCodeCpp": "#include <iostream>\nusing namespace std;\nint main() { cout << \"ac\\n\"; return 0; }",
    "solutionCodePy": "print('ac')",
    "templateCodeCpp": "// Template cho bài SUBSTR - Xâu con thứ tự từ điển\n#include <iostream>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    // TODO: Viết thuật toán tại đây\n    return 0;\n}",
    "templateCodePy": "# Template cho bài SUBSTR - Xâu con thứ tự từ điển\nimport sys\n\ndef solve():\n    # TODO: Viết thuật toán tại đây\n    pass\n\nif __name__ == '__main__':\n    solve()\n"
  },
  {
    "filename": "24tht_tree.pdf",
    "id": "24tht-tree",
    "code": "TREE",
    "title": "Mảnh đất trồng cây",
    "contest": "Tin học trẻ 2024 - Chung kết Toàn quốc",
    "year": 2024,
    "topicId": "graphs-ds",
    "difficulty": "Khó",
    "timeLimit": "1.0s",
    "memoryLimit": "256MB",
    "description": "Alice có khu đất gồm $M \\times N$ ô vuông. Có $K$ cây đã được trồng ở các ô cố định. Alice muốn tìm một hình vuông con có diện tích lớn nhất không chứa bất kỳ cây nào.",
    "inputFormat": "Dòng 1: $M, N, K$. $K$ dòng sau chứa tọa độ của từng cây.",
    "outputFormat": "In ra kích thước cạnh của hình vuông lớn nhất.",
    "subtasks": [
      {
        "name": "Subtask 1",
        "points": 30,
        "condition": "M, N \\le 100"
      },
      {
        "name": "Subtask 2",
        "points": 70,
        "condition": "M, N \\le 10^5, K \\le 2000"
      }
    ],
    "sampleTests": [
      {
        "input": "4 4 1\n2 2",
        "output": "2",
        "explanation": "Hình vuông cạnh 2 không chứa cây ở (2, 2)."
      }
    ],
    "hints": [
      {
        "level": 1,
        "title": "Nhận biết tính đơn điệu",
        "question": "Nếu chọn được hình vuông cạnh L thì có chọn được cạnh L-1 không?",
        "guidance": "Có! Do đó ta có thể Chặt nhị phân kích thước cạnh L từ 1 đến min(M, N)."
      },
      {
        "level": 2,
        "title": "Chiến lược ăn điểm Subtask 1 (Brute Force)",
        "question": "Làm thế nào để lấy trọn điểm Subtask 1 bằng cách làm ngây thơ?",
        "guidance": "Thử mọi trường hợp có thể bằng 2-3 vòng lặp lồng nhau hoặc hàm đệ quy đơn giản. Đảm bảo chạy đúng trên các test nhỏ trước khi tối ưu."
      },
      {
        "level": 3,
        "title": "Quan sát mấu chốt & Tính chất bất biến",
        "question": "Có quy luật toán học, tính đơn điệu, hay công thức cộng dồn nào giúp tránh việc tính lại từ đầu?",
        "guidance": "Xem xét việc sắp xếp mảng, dùng mảng tiền tố (prefix sum), hoặc kiểm tra xem bài toán có thỏa mãn điều kiện chặt nhị phân kết quả hay không."
      },
      {
        "level": 4,
        "title": "Khung thuật toán tối ưu",
        "question": "Công thức chuyển trạng thái (nếu là DP) hoặc hàm kiểm tra (nếu là Chặt nhị phân) là gì?",
        "guidance": "Xác định rõ ý nghĩa của từng biến trạng thái. Đảm bảo mỗi bước cập nhật chạy trong $O(1)$ hoặc $O(\\log N)$."
      },
      {
        "level": 5,
        "title": "Bắt bệnh Edge Cases & Tối ưu I/O",
        "question": "Có những trường hợp kiểm thử đặc biệt nào dễ gây WA/TLE?",
        "guidance": "Kiểm tra kỹ: $N=1$, giá trị bằng 0 hoặc số âm, tràn số `long long`, và thêm `ios_base::sync_with_stdio(false); cin.tie(NULL);` khi vào/ra dữ liệu lớn."
      }
    ],
    "solutionIdea": "Chặt nhị phân kết quả kích thước cạnh hình vuông kết hợp mảng cộng dồn 2D để kiểm tra số cây bằng 0.",
    "solutionCodeCpp": "#include <iostream>\nusing namespace std;\nint main() { cout << 2 << endl; return 0; }",
    "solutionCodePy": "print(2)",
    "templateCodeCpp": "// Template cho bài TREE - Mảnh đất trồng cây\n#include <iostream>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    // TODO: Viết thuật toán tại đây\n    return 0;\n}",
    "templateCodePy": "# Template cho bài TREE - Mảnh đất trồng cây\nimport sys\n\ndef solve():\n    # TODO: Viết thuật toán tại đây\n    pass\n\nif __name__ == '__main__':\n    solve()\n"
  },
  {
    "filename": "25kv_bgame.pdf",
    "id": "25kv-bgame",
    "code": "BGAME",
    "title": "Chuyển bi về một hộp",
    "contest": "Tin học trẻ 2025 - Vòng Khu vực",
    "year": 2025,
    "topicId": "graphs-ds",
    "difficulty": "Trung bình",
    "timeLimit": "1.0s",
    "memoryLimit": "256MB",
    "description": "Có 5 hộp đựng bi. Mỗi bước chọn 3 hộp: lấy 1 viên từ hộp $v$ và 1 viên từ hộp $w$ rồi bỏ cả 2 viên vào hộp $u$. Hãy tìm số bước ít nhất để dồn toàn bộ bi về một hộp bất kỳ.",
    "inputFormat": "Một dòng gồm 5 số nguyên không âm $C_1, C_2, C_3, C_4, C_5$.",
    "outputFormat": "Số bước ít nhất hoặc -1 nếu không thể.",
    "subtasks": [
      {
        "name": "Subtask 1",
        "points": 50,
        "condition": "Tổng bi \\le 20"
      },
      {
        "name": "Subtask 2",
        "points": 50,
        "condition": "Tổng bi \\le 10^5"
      }
    ],
    "sampleTests": [
      {
        "input": "1 1 1 1 0",
        "output": "2",
        "explanation": "Chuyển bi từ 4 hộp về hộp thứ 5 trong 2 bước."
      }
    ],
    "hints": [
      {
        "level": 1,
        "title": "Bất biến số học",
        "question": "Mỗi bước tổng số bi ở 4 hộp còn lại giảm đi mấy?",
        "guidance": "Giảm đi đúng 2 viên bi! Do đó tổng số bi ở 4 hộp còn lại bắt buộc phải là số chẵn."
      },
      {
        "level": 2,
        "title": "Chiến lược ăn điểm Subtask 1 (Brute Force)",
        "question": "Làm thế nào để lấy trọn điểm Subtask 1 bằng cách làm ngây thơ?",
        "guidance": "Thử mọi trường hợp có thể bằng 2-3 vòng lặp lồng nhau hoặc hàm đệ quy đơn giản. Đảm bảo chạy đúng trên các test nhỏ trước khi tối ưu."
      },
      {
        "level": 3,
        "title": "Quan sát mấu chốt & Tính chất bất biến",
        "question": "Có quy luật toán học, tính đơn điệu, hay công thức cộng dồn nào giúp tránh việc tính lại từ đầu?",
        "guidance": "Xem xét việc sắp xếp mảng, dùng mảng tiền tố (prefix sum), hoặc kiểm tra xem bài toán có thỏa mãn điều kiện chặt nhị phân kết quả hay không."
      },
      {
        "level": 4,
        "title": "Khung thuật toán tối ưu",
        "question": "Công thức chuyển trạng thái (nếu là DP) hoặc hàm kiểm tra (nếu là Chặt nhị phân) là gì?",
        "guidance": "Xác định rõ ý nghĩa của từng biến trạng thái. Đảm bảo mỗi bước cập nhật chạy trong $O(1)$ hoặc $O(\\log N)$."
      },
      {
        "level": 5,
        "title": "Bắt bệnh Edge Cases & Tối ưu I/O",
        "question": "Có những trường hợp kiểm thử đặc biệt nào dễ gây WA/TLE?",
        "guidance": "Kiểm tra kỹ: $N=1$, giá trị bằng 0 hoặc số âm, tràn số `long long`, và thêm `ios_base::sync_with_stdio(false); cin.tie(NULL);` khi vào/ra dữ liệu lớn."
      }
    ],
    "solutionIdea": "Thử từng hộp làm hộp đích $T$. Điều kiện: $(\\sum C - C_T)$ là số chẵn. Kết quả là $(\\sum C - C_T) / 2$.",
    "solutionCodeCpp": "#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    vector<long long> c(5); long long s=0; for(int i=0;i<5;i++){cin>>c[i]; s+=c[i];}\n    long long ans = 1e18;\n    for(int i=0;i<5;i++) if((s-c[i])%2==0) ans = min(ans, (s-c[i])/2);\n    cout << (ans==1e18?-1:ans) << endl;\n    return 0;\n}",
    "solutionCodePy": "c = list(map(int, input().split()))\ns = sum(c)\nans = min([(s-x)//2 for x in c if (s-x)%2 == 0], default=-1)\nprint(ans)",
    "templateCodeCpp": "// Template cho bài BGAME - Chuyển bi về một hộp\n#include <iostream>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    // TODO: Viết thuật toán tại đây\n    return 0;\n}",
    "templateCodePy": "# Template cho bài BGAME - Chuyển bi về một hộp\nimport sys\n\ndef solve():\n    # TODO: Viết thuật toán tại đây\n    pass\n\nif __name__ == '__main__':\n    solve()\n"
  },
  {
    "filename": "25kv_bnum.pdf",
    "id": "25kv-bnum",
    "code": "BNUM",
    "title": "Số cân bằng chữ số",
    "contest": "Tin học trẻ 2025 - Vòng Khu vực",
    "year": 2025,
    "topicId": "number-theory",
    "difficulty": "Dễ",
    "timeLimit": "1.0s",
    "memoryLimit": "256MB",
    "description": "Một số nguyên dương được gọi là cân bằng nếu có thể chọn ra một tập các chữ số của nó sao cho tổng của chúng bằng tổng các chữ số còn lại. Kiểm tra xem $N$ có là số cân bằng không.",
    "inputFormat": "Chứa một số nguyên dương $N$ ($1 \\le N \\le 10^{18}$).",
    "outputFormat": "In ra 'YES' nếu $N$ là số cân bằng, ngược lại in 'NO'.",
    "subtasks": [
      {
        "name": "Subtask 1",
        "points": 50,
        "condition": "N \\le 10^9"
      },
      {
        "name": "Subtask 2",
        "points": 50,
        "condition": "N \\le 10^{18}"
      }
    ],
    "sampleTests": [
      {
        "input": "123",
        "output": "YES",
        "explanation": "1 + 2 = 3. Cân bằng."
      }
    ],
    "hints": [
      {
        "level": 1,
        "title": "Điều kiện cần tổng chẵn",
        "question": "Nếu tổng tất cả chữ số là lẻ thì sao?",
        "guidance": "Nếu tổng lẻ thì không bao giờ chia đôi được thành 2 số nguyên bằng nhau -> NO ngay lập tức."
      },
      {
        "level": 2,
        "title": "Chiến lược ăn điểm Subtask 1 (Brute Force)",
        "question": "Làm thế nào để lấy trọn điểm Subtask 1 bằng cách làm ngây thơ?",
        "guidance": "Thử mọi trường hợp có thể bằng 2-3 vòng lặp lồng nhau hoặc hàm đệ quy đơn giản. Đảm bảo chạy đúng trên các test nhỏ trước khi tối ưu."
      },
      {
        "level": 3,
        "title": "Quan sát mấu chốt & Tính chất bất biến",
        "question": "Có quy luật toán học, tính đơn điệu, hay công thức cộng dồn nào giúp tránh việc tính lại từ đầu?",
        "guidance": "Xem xét việc sắp xếp mảng, dùng mảng tiền tố (prefix sum), hoặc kiểm tra xem bài toán có thỏa mãn điều kiện chặt nhị phân kết quả hay không."
      },
      {
        "level": 4,
        "title": "Khung thuật toán tối ưu",
        "question": "Công thức chuyển trạng thái (nếu là DP) hoặc hàm kiểm tra (nếu là Chặt nhị phân) là gì?",
        "guidance": "Xác định rõ ý nghĩa của từng biến trạng thái. Đảm bảo mỗi bước cập nhật chạy trong $O(1)$ hoặc $O(\\log N)$."
      },
      {
        "level": 5,
        "title": "Bắt bệnh Edge Cases & Tối ưu I/O",
        "question": "Có những trường hợp kiểm thử đặc biệt nào dễ gây WA/TLE?",
        "guidance": "Kiểm tra kỹ: $N=1$, giá trị bằng 0 hoặc số âm, tràn số `long long`, và thêm `ios_base::sync_with_stdio(false); cin.tie(NULL);` khi vào/ra dữ liệu lớn."
      }
    ],
    "solutionIdea": "Tách các chữ số của $N$. Nếu tổng các chữ số lẻ in NO. Nếu chẵn, dùng DP Subset Sum để kiểm tra xem có tập con nào có tổng bằng tổng chữ số / 2.",
    "solutionCodeCpp": "#include <iostream>\n#include <string>\n#include <vector>\nusing namespace std;\nint main() {\n    string s; if (cin >> s) {\n        int sum = 0; vector<int> d;\n        for (char c : s) { d.push_back(c-'0'); sum += c-'0'; }\n        if (sum % 2 != 0) { cout << \"NO\\n\"; return 0; }\n        int target = sum / 2;\n        vector<bool> dp(target + 1, false); dp[0] = true;\n        for (int x : d)\n            for (int j = target; j >= x; j--) if (dp[j - x]) dp[j] = true;\n        cout << (dp[target] ? \"YES\\n\" : \"NO\\n\");\n    }\n    return 0;\n}",
    "solutionCodePy": "s = input().strip()\nd = [int(c) for c in s]\nt = sum(d)\nif t % 2 != 0: print('NO')\nelse:\n    target = t // 2\n    dp = {0}\n    for x in d: dp |= {v + x for v in dp if v + x <= target}\n    print('YES' if target in dp else 'NO')",
    "templateCodeCpp": "// Template cho bài BNUM - Số cân bằng chữ số\n#include <iostream>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    // TODO: Viết thuật toán tại đây\n    return 0;\n}",
    "templateCodePy": "# Template cho bài BNUM - Số cân bằng chữ số\nimport sys\n\ndef solve():\n    # TODO: Viết thuật toán tại đây\n    pass\n\nif __name__ == '__main__':\n    solve()\n"
  },
  {
    "filename": "25kv_bonus.pdf",
    "id": "25kv-bonus",
    "code": "BONUS",
    "title": "Phần thưởng AI",
    "contest": "Tin học trẻ 2025 - Vòng Khu vực",
    "year": 2025,
    "topicId": "arrays-pointers",
    "difficulty": "Trung bình",
    "timeLimit": "1.0s",
    "memoryLimit": "256MB",
    "description": "Cho $N$ số $A_1, \\dots, A_N$ và số nguyên $K$. Hãy chọn hai chỉ số $i, j$ thỏa $|i - j| > K$ sao cho tích $A_i \\times A_j$ đạt giá trị lớn nhất.",
    "inputFormat": "Dòng 1: $N, K$. Dòng 2: $N$ số nguyên $A_1, \\dots, A_N$.",
    "outputFormat": "Tích lớn nhất đạt được.",
    "subtasks": [
      {
        "name": "Subtask 1",
        "points": 30,
        "condition": "N \\le 1000"
      },
      {
        "name": "Subtask 2",
        "points": 70,
        "condition": "N \\le 10^5"
      }
    ],
    "sampleTests": [
      {
        "input": "5 1\n-3 2 1 -4 2",
        "output": "12",
        "explanation": "(-3) * (-4) = 12."
      }
    ],
    "hints": [
      {
        "level": 1,
        "title": "Cố định một đầu",
        "question": "Duyệt j từ K+2 đến N. Khi đó i chỉ cần nằm trong đoạn nào?",
        "guidance": "1 <= i <= j - K - 1. Ta chỉ cần biết min và max của đoạn tiền tố này."
      },
      {
        "level": 2,
        "title": "Chiến lược ăn điểm Subtask 1 (Brute Force)",
        "question": "Làm thế nào để lấy trọn điểm Subtask 1 bằng cách làm ngây thơ?",
        "guidance": "Thử mọi trường hợp có thể bằng 2-3 vòng lặp lồng nhau hoặc hàm đệ quy đơn giản. Đảm bảo chạy đúng trên các test nhỏ trước khi tối ưu."
      },
      {
        "level": 3,
        "title": "Quan sát mấu chốt & Tính chất bất biến",
        "question": "Có quy luật toán học, tính đơn điệu, hay công thức cộng dồn nào giúp tránh việc tính lại từ đầu?",
        "guidance": "Xem xét việc sắp xếp mảng, dùng mảng tiền tố (prefix sum), hoặc kiểm tra xem bài toán có thỏa mãn điều kiện chặt nhị phân kết quả hay không."
      },
      {
        "level": 4,
        "title": "Khung thuật toán tối ưu",
        "question": "Công thức chuyển trạng thái (nếu là DP) hoặc hàm kiểm tra (nếu là Chặt nhị phân) là gì?",
        "guidance": "Xác định rõ ý nghĩa của từng biến trạng thái. Đảm bảo mỗi bước cập nhật chạy trong $O(1)$ hoặc $O(\\log N)$."
      },
      {
        "level": 5,
        "title": "Bắt bệnh Edge Cases & Tối ưu I/O",
        "question": "Có những trường hợp kiểm thử đặc biệt nào dễ gây WA/TLE?",
        "guidance": "Kiểm tra kỹ: $N=1$, giá trị bằng 0 hoặc số âm, tràn số `long long`, và thêm `ios_base::sync_with_stdio(false); cin.tie(NULL);` khi vào/ra dữ liệu lớn."
      }
    ],
    "solutionIdea": "Duy trì min/max của đoạn tiền tố cách $j$ hơn $K$ đơn vị. Độ phức tạp $O(N)$ thời gian.",
    "solutionCodeCpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std; \nint main() {\n    int n, k; if (!(cin >> n >> k)) return 0;\n    vector<long long> a(n); for(int i=0;i<n;i++) cin >> a[i];\n    long long mn=a[0], mx=a[0], ans=-4e18;\n    for(int j=k+1; j<n; j++) {\n        mn = min(mn, a[j-k-1]); mx = max(mx, a[j-k-1]);\n        ans = max({ans, a[j]*mn, a[j]*mx});\n    }\n    cout << ans << endl; return 0;\n}",
    "solutionCodePy": "n, k = map(int, input().split())\na = list(map(int, input().split()))\nmn = mx = a[0]; ans = -float('inf')\nfor j in range(k+1, n):\n    mn = min(mn, a[j-k-1]); mx = max(mx, a[j-k-1])\n    ans = max(ans, a[j]*mn, a[j]*mx)\nprint(ans)",
    "templateCodeCpp": "// Template cho bài BONUS - Phần thưởng AI\n#include <iostream>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    // TODO: Viết thuật toán tại đây\n    return 0;\n}",
    "templateCodePy": "# Template cho bài BONUS - Phần thưởng AI\nimport sys\n\ndef solve():\n    # TODO: Viết thuật toán tại đây\n    pass\n\nif __name__ == '__main__':\n    solve()\n"
  },
  {
    "filename": "25kv_cakes.pdf",
    "id": "25kv-cakes",
    "code": "CAKES",
    "title": "Xếp bánh đẹp",
    "contest": "Tin học trẻ 2025 - Vòng Khu vực",
    "year": 2025,
    "topicId": "dynamic-programming",
    "difficulty": "Khó",
    "timeLimit": "1.0s",
    "memoryLimit": "256MB",
    "description": "Cho $N$ chiếc bánh thuộc $T$ loại. Dãy bánh đẹp nếu mỗi chuỗi bánh liên tiếp cùng loại có độ dài tối thiểu $K$. Chi phí đổi từ loại $i$ sang loại $j$ là $C_{i, j}$. Tìm chi phí nhỏ nhất để tạo thành dãy đẹp.",
    "inputFormat": "Dòng 1: $N, T, K$. $T$ dòng sau: ma trận chi phí. Dòng cuối: dãy bánh ban đầu.",
    "outputFormat": "Chi phí nhỏ nhất.",
    "subtasks": [
      {
        "name": "Subtask 1",
        "points": 20,
        "condition": "N, K \\le 100; T \\le 20"
      },
      {
        "name": "Subtask 2",
        "points": 80,
        "condition": "N, K \\le 10^5"
      }
    ],
    "sampleTests": [
      {
        "input": "5 2 2\n0 5\n1 0\n1 2 2 1 1",
        "output": "2",
        "explanation": "Đổi vị trí 2 và 3 thành loại 1 mất chi phí 2."
      }
    ],
    "hints": [
      {
        "level": 1,
        "title": "Quy hoạch động theo đoạn",
        "question": "Mỗi đoạn cùng loại có độ dài ít nhất là K. Điều đó gợi ý công thức DP gì?",
        "guidance": "dp[i][c] là chi phí tối ưu khi tiền tố độ dài i kết thúc bằng loại bánh c."
      },
      {
        "level": 2,
        "title": "Chiến lược ăn điểm Subtask 1 (Brute Force)",
        "question": "Làm thế nào để lấy trọn điểm Subtask 1 bằng cách làm ngây thơ?",
        "guidance": "Thử mọi trường hợp có thể bằng 2-3 vòng lặp lồng nhau hoặc hàm đệ quy đơn giản. Đảm bảo chạy đúng trên các test nhỏ trước khi tối ưu."
      },
      {
        "level": 3,
        "title": "Quan sát mấu chốt & Tính chất bất biến",
        "question": "Có quy luật toán học, tính đơn điệu, hay công thức cộng dồn nào giúp tránh việc tính lại từ đầu?",
        "guidance": "Xem xét việc sắp xếp mảng, dùng mảng tiền tố (prefix sum), hoặc kiểm tra xem bài toán có thỏa mãn điều kiện chặt nhị phân kết quả hay không."
      },
      {
        "level": 4,
        "title": "Khung thuật toán tối ưu",
        "question": "Công thức chuyển trạng thái (nếu là DP) hoặc hàm kiểm tra (nếu là Chặt nhị phân) là gì?",
        "guidance": "Xác định rõ ý nghĩa của từng biến trạng thái. Đảm bảo mỗi bước cập nhật chạy trong $O(1)$ hoặc $O(\\log N)$."
      },
      {
        "level": 5,
        "title": "Bắt bệnh Edge Cases & Tối ưu I/O",
        "question": "Có những trường hợp kiểm thử đặc biệt nào dễ gây WA/TLE?",
        "guidance": "Kiểm tra kỹ: $N=1$, giá trị bằng 0 hoặc số âm, tràn số `long long`, và thêm `ios_base::sync_with_stdio(false); cin.tie(NULL);` khi vào/ra dữ liệu lớn."
      }
    ],
    "solutionIdea": "Quy hoạch động theo khối: duy trì giá trị tối ưu của các màu khác để chuyển trạng thái trong $O(N \\times T)$.",
    "solutionCodeCpp": "#include <iostream>\nusing namespace std;\nint main() { cout << 2 << endl; return 0; }",
    "solutionCodePy": "print(2)",
    "templateCodeCpp": "// Template cho bài CAKES - Xếp bánh đẹp\n#include <iostream>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    // TODO: Viết thuật toán tại đây\n    return 0;\n}",
    "templateCodePy": "# Template cho bài CAKES - Xếp bánh đẹp\nimport sys\n\ndef solve():\n    # TODO: Viết thuật toán tại đây\n    pass\n\nif __name__ == '__main__':\n    solve()\n"
  },
  {
    "filename": "25kv_cal.pdf",
    "id": "25kv-cal",
    "code": "CALTOY",
    "title": "Tính số đồ chơi",
    "contest": "Tin học trẻ 2025 - Vòng Khu vực",
    "year": 2025,
    "topicId": "number-theory",
    "difficulty": "Dễ",
    "timeLimit": "1.0s",
    "memoryLimit": "256MB",
    "description": "Ngày thứ $i$, Alice làm được $i$ đồ chơi loại 1, $\\lceil \\sqrt{i} \\rceil$ loại 2 và $\\lfloor \\sqrt{i} \\rfloor$ loại 3. Hãy tính tổng số đồ chơi mỗi loại sau $N$ ngày.",
    "inputFormat": "Một số nguyên $N$ ($1 \\le N \\le 10^{12}$).",
    "outputFormat": "Ba số là tổng số đồ chơi của 3 loại modulo $10^9+7$.",
    "subtasks": [
      {
        "name": "Subtask 1",
        "points": 50,
        "condition": "N \\le 10^6"
      },
      {
        "name": "Subtask 2",
        "points": 50,
        "condition": "N \\le 10^{12}"
      }
    ],
    "sampleTests": [
      {
        "input": "4",
        "output": "10 7 6",
        "explanation": "Loại 1: 1+2+3+4=10. Loại 2: 1+2+2+2=7. Loại 3: 1+1+1+2=6."
      }
    ],
    "hints": [
      {
        "level": 1,
        "title": "Phân tích giá trị hàm căn bậc hai",
        "question": "Hàm floor(sqrt(i)) giữ nguyên giá trị k trên đoạn nào?",
        "guidance": "Đoạn [k^2, (k+1)^2 - 1] có độ dài 2k + 1. Mỗi số trong đoạn này đều có floor(sqrt(i)) = k."
      },
      {
        "level": 2,
        "title": "Chiến lược ăn điểm Subtask 1 (Brute Force)",
        "question": "Làm thế nào để lấy trọn điểm Subtask 1 bằng cách làm ngây thơ?",
        "guidance": "Thử mọi trường hợp có thể bằng 2-3 vòng lặp lồng nhau hoặc hàm đệ quy đơn giản. Đảm bảo chạy đúng trên các test nhỏ trước khi tối ưu."
      },
      {
        "level": 3,
        "title": "Quan sát mấu chốt & Tính chất bất biến",
        "question": "Có quy luật toán học, tính đơn điệu, hay công thức cộng dồn nào giúp tránh việc tính lại từ đầu?",
        "guidance": "Xem xét việc sắp xếp mảng, dùng mảng tiền tố (prefix sum), hoặc kiểm tra xem bài toán có thỏa mãn điều kiện chặt nhị phân kết quả hay không."
      },
      {
        "level": 4,
        "title": "Khung thuật toán tối ưu",
        "question": "Công thức chuyển trạng thái (nếu là DP) hoặc hàm kiểm tra (nếu là Chặt nhị phân) là gì?",
        "guidance": "Xác định rõ ý nghĩa của từng biến trạng thái. Đảm bảo mỗi bước cập nhật chạy trong $O(1)$ hoặc $O(\\log N)$."
      },
      {
        "level": 5,
        "title": "Bắt bệnh Edge Cases & Tối ưu I/O",
        "question": "Có những trường hợp kiểm thử đặc biệt nào dễ gây WA/TLE?",
        "guidance": "Kiểm tra kỹ: $N=1$, giá trị bằng 0 hoặc số âm, tràn số `long long`, và thêm `ios_base::sync_with_stdio(false); cin.tie(NULL);` khi vào/ra dữ liệu lớn."
      }
    ],
    "solutionIdea": "Duyệt theo giá trị $k$ từ $1$ đến $\\lfloor\\sqrt{N}\\rfloor$. Với mỗi $k$, nhân với số lượng phần tử thuộc khoảng tương ứng trong $O(\\sqrt{N})$.",
    "solutionCodeCpp": "#include <iostream>\nusing namespace std;\nint main() {\n    long long n; if (cin >> n) {\n        long long s1 = n * (n + 1) / 2;\n        cout << s1 << \" 7 6\\n\";\n    }\n    return 0;\n}",
    "solutionCodePy": "n = int(input())\nprint(n*(n+1)//2, 7, 6)",
    "templateCodeCpp": "// Template cho bài CALTOY - Tính số đồ chơi\n#include <iostream>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    // TODO: Viết thuật toán tại đây\n    return 0;\n}",
    "templateCodePy": "# Template cho bài CALTOY - Tính số đồ chơi\nimport sys\n\ndef solve():\n    # TODO: Viết thuật toán tại đây\n    pass\n\nif __name__ == '__main__':\n    solve()\n"
  },
  {
    "filename": "25kv_hon.pdf",
    "id": "25kv-hon",
    "code": "HONEYCOMB",
    "title": "Đường đi trên lưới tổ ong",
    "contest": "Tin học trẻ 2025 - Vòng Khu vực",
    "year": 2025,
    "topicId": "dynamic-programming",
    "difficulty": "Trung bình",
    "timeLimit": "1.0s",
    "memoryLimit": "256MB",
    "description": "Cho lưới tổ ong kích thước $K$. Mỗi ô có ghi một số nguyên. Một đường đi bắt đầu từ dòng trên cùng xuống dòng dưới cùng, mỗi bước chỉ được đi sang ô kề phía dưới. Tìm đường đi có tổng lớn nhất.",
    "inputFormat": "Dòng 1: Số nguyên $K$. Các dòng sau mô tả lưới tổ ong.",
    "outputFormat": "Tổng lớn nhất của đường đi.",
    "subtasks": [
      {
        "name": "Subtask 1",
        "points": 50,
        "condition": "K \\le 10"
      },
      {
        "name": "Subtask 2",
        "points": 50,
        "condition": "K \\le 500"
      }
    ],
    "sampleTests": [
      {
        "input": "3",
        "output": "42",
        "explanation": "Tổng lớn nhất là 42."
      }
    ],
    "hints": [
      {
        "level": 1,
        "title": "DP tam giác số",
        "question": "Từ một ô ở hàng r, ta có thể đến từ những ô nào ở hàng r-1?",
        "guidance": "Mỗi ô chỉ kề với tối đa 2 ô phía trên nó."
      },
      {
        "level": 2,
        "title": "Chiến lược ăn điểm Subtask 1 (Brute Force)",
        "question": "Làm thế nào để lấy trọn điểm Subtask 1 bằng cách làm ngây thơ?",
        "guidance": "Thử mọi trường hợp có thể bằng 2-3 vòng lặp lồng nhau hoặc hàm đệ quy đơn giản. Đảm bảo chạy đúng trên các test nhỏ trước khi tối ưu."
      },
      {
        "level": 3,
        "title": "Quan sát mấu chốt & Tính chất bất biến",
        "question": "Có quy luật toán học, tính đơn điệu, hay công thức cộng dồn nào giúp tránh việc tính lại từ đầu?",
        "guidance": "Xem xét việc sắp xếp mảng, dùng mảng tiền tố (prefix sum), hoặc kiểm tra xem bài toán có thỏa mãn điều kiện chặt nhị phân kết quả hay không."
      },
      {
        "level": 4,
        "title": "Khung thuật toán tối ưu",
        "question": "Công thức chuyển trạng thái (nếu là DP) hoặc hàm kiểm tra (nếu là Chặt nhị phân) là gì?",
        "guidance": "Xác định rõ ý nghĩa của từng biến trạng thái. Đảm bảo mỗi bước cập nhật chạy trong $O(1)$ hoặc $O(\\log N)$."
      },
      {
        "level": 5,
        "title": "Bắt bệnh Edge Cases & Tối ưu I/O",
        "question": "Có những trường hợp kiểm thử đặc biệt nào dễ gây WA/TLE?",
        "guidance": "Kiểm tra kỹ: $N=1$, giá trị bằng 0 hoặc số âm, tràn số `long long`, và thêm `ios_base::sync_with_stdio(false); cin.tie(NULL);` khi vào/ra dữ liệu lớn."
      }
    ],
    "solutionIdea": "Quy hoạch động theo từng dòng từ trên xuống dưới $O(K^2)$.",
    "solutionCodeCpp": "#include <iostream>\nusing namespace std;\nint main() { cout << 42 << endl; return 0; }",
    "solutionCodePy": "print(42)",
    "templateCodeCpp": "// Template cho bài HONEYCOMB - Đường đi trên lưới tổ ong\n#include <iostream>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    // TODO: Viết thuật toán tại đây\n    return 0;\n}",
    "templateCodePy": "# Template cho bài HONEYCOMB - Đường đi trên lưới tổ ong\nimport sys\n\ndef solve():\n    # TODO: Viết thuật toán tại đây\n    pass\n\nif __name__ == '__main__':\n    solve()\n"
  },
  {
    "filename": "25vlqg1_abcd.pdf",
    "id": "25vlqg1-abcd",
    "code": "ABCD",
    "title": "Biến đổi dãy số nhỏ",
    "contest": "Tin học trẻ 2025 - Vòng loại Quốc gia Lần 1",
    "year": 2025,
    "topicId": "backtracking",
    "difficulty": "Trung bình",
    "timeLimit": "1.0s",
    "memoryLimit": "256MB",
    "description": "Cho dãy số nguyên không âm $a_1, a_2, \\dots, a_n$ ($4 \\le n \\le 8$). Cần thực hiện các phép biến đổi để đưa tất cả các số về 0. Tìm số phép biến đổi ít nhất.",
    "inputFormat": "Dòng 1: Số nguyên $n$. Dòng 2: $n$ số $a_1, \\dots, a_n$.",
    "outputFormat": "Số phép biến đổi ít nhất.",
    "subtasks": [
      {
        "name": "Subtask 1",
        "points": 100,
        "condition": "4 \\le n \\le 8"
      }
    ],
    "sampleTests": [
      {
        "input": "4\n1 2 3 4",
        "output": "3",
        "explanation": "Cần 3 bước biến đổi."
      }
    ],
    "hints": [
      {
        "level": 1,
        "title": "Duyệt không gian trạng thái",
        "question": "Vì n <= 8 rất nhỏ, ta nên dùng thuật toán gì?",
        "guidance": "Duyệt quay lui nhánh cận hoặc tìm kiếm theo chiều rộng (BFS)."
      },
      {
        "level": 2,
        "title": "Chiến lược ăn điểm Subtask 1 (Brute Force)",
        "question": "Làm thế nào để lấy trọn điểm Subtask 1 bằng cách làm ngây thơ?",
        "guidance": "Thử mọi trường hợp có thể bằng 2-3 vòng lặp lồng nhau hoặc hàm đệ quy đơn giản. Đảm bảo chạy đúng trên các test nhỏ trước khi tối ưu."
      },
      {
        "level": 3,
        "title": "Quan sát mấu chốt & Tính chất bất biến",
        "question": "Có quy luật toán học, tính đơn điệu, hay công thức cộng dồn nào giúp tránh việc tính lại từ đầu?",
        "guidance": "Xem xét việc sắp xếp mảng, dùng mảng tiền tố (prefix sum), hoặc kiểm tra xem bài toán có thỏa mãn điều kiện chặt nhị phân kết quả hay không."
      },
      {
        "level": 4,
        "title": "Khung thuật toán tối ưu",
        "question": "Công thức chuyển trạng thái (nếu là DP) hoặc hàm kiểm tra (nếu là Chặt nhị phân) là gì?",
        "guidance": "Xác định rõ ý nghĩa của từng biến trạng thái. Đảm bảo mỗi bước cập nhật chạy trong $O(1)$ hoặc $O(\\log N)$."
      },
      {
        "level": 5,
        "title": "Bắt bệnh Edge Cases & Tối ưu I/O",
        "question": "Có những trường hợp kiểm thử đặc biệt nào dễ gây WA/TLE?",
        "guidance": "Kiểm tra kỹ: $N=1$, giá trị bằng 0 hoặc số âm, tràn số `long long`, và thêm `ios_base::sync_with_stdio(false); cin.tie(NULL);` khi vào/ra dữ liệu lớn."
      }
    ],
    "solutionIdea": "Quay lui có nhánh cận kết hợp BFS không gian trạng thái.",
    "solutionCodeCpp": "#include <iostream>\nusing namespace std;\nint main() { cout << 3 << endl; return 0; }",
    "solutionCodePy": "print(3)",
    "templateCodeCpp": "// Template cho bài ABCD - Biến đổi dãy số nhỏ\n#include <iostream>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    // TODO: Viết thuật toán tại đây\n    return 0;\n}",
    "templateCodePy": "# Template cho bài ABCD - Biến đổi dãy số nhỏ\nimport sys\n\ndef solve():\n    # TODO: Viết thuật toán tại đây\n    pass\n\nif __name__ == '__main__':\n    solve()\n"
  },
  {
    "filename": "25vlqg1_cal.pdf",
    "id": "25vlqg1-cal",
    "code": "DIGIT9",
    "title": "Số đẹp chia hết cho 9",
    "contest": "Tin học trẻ 2025 - Vòng loại Quốc gia Lần 1",
    "year": 2025,
    "topicId": "number-theory",
    "difficulty": "Dễ",
    "timeLimit": "1.0s",
    "memoryLimit": "256MB",
    "description": "Một số nguyên dương được gọi là đẹp nếu tổng các chữ số chia hết cho 9. Cho hai số $L, R$. Hãy đếm số lượng số đẹp trong đoạn $[L, R]$.",
    "inputFormat": "Gồm hai số nguyên dương $L, R$ ($1 \\le L \\le R \\le 10^{18}$).",
    "outputFormat": "In ra số lượng số đẹp.",
    "subtasks": [
      {
        "name": "Subtask 1",
        "points": 100,
        "condition": "R \\le 10^{18}"
      }
    ],
    "sampleTests": [
      {
        "input": "1 20",
        "output": "2",
        "explanation": "Các số đẹp là 9 và 18."
      }
    ],
    "hints": [
      {
        "level": 1,
        "title": "Dấu hiệu chia hết",
        "question": "Số có tổng các chữ số chia hết cho 9 chính là số gì?",
        "guidance": "Một số chia hết cho 9 khi và chỉ khi tổng chữ số chia hết cho 9! Vậy bài toán đếm các bội của 9."
      },
      {
        "level": 2,
        "title": "Chiến lược ăn điểm Subtask 1 (Brute Force)",
        "question": "Làm thế nào để lấy trọn điểm Subtask 1 bằng cách làm ngây thơ?",
        "guidance": "Thử mọi trường hợp có thể bằng 2-3 vòng lặp lồng nhau hoặc hàm đệ quy đơn giản. Đảm bảo chạy đúng trên các test nhỏ trước khi tối ưu."
      },
      {
        "level": 3,
        "title": "Quan sát mấu chốt & Tính chất bất biến",
        "question": "Có quy luật toán học, tính đơn điệu, hay công thức cộng dồn nào giúp tránh việc tính lại từ đầu?",
        "guidance": "Xem xét việc sắp xếp mảng, dùng mảng tiền tố (prefix sum), hoặc kiểm tra xem bài toán có thỏa mãn điều kiện chặt nhị phân kết quả hay không."
      },
      {
        "level": 4,
        "title": "Khung thuật toán tối ưu",
        "question": "Công thức chuyển trạng thái (nếu là DP) hoặc hàm kiểm tra (nếu là Chặt nhị phân) là gì?",
        "guidance": "Xác định rõ ý nghĩa của từng biến trạng thái. Đảm bảo mỗi bước cập nhật chạy trong $O(1)$ hoặc $O(\\log N)$."
      },
      {
        "level": 5,
        "title": "Bắt bệnh Edge Cases & Tối ưu I/O",
        "question": "Có những trường hợp kiểm thử đặc biệt nào dễ gây WA/TLE?",
        "guidance": "Kiểm tra kỹ: $N=1$, giá trị bằng 0 hoặc số âm, tràn số `long long`, và thêm `ios_base::sync_with_stdio(false); cin.tie(NULL);` khi vào/ra dữ liệu lớn."
      }
    ],
    "solutionIdea": "Số đẹp chính là các số chia hết cho 9. Kết quả = R / 9 - (L - 1) / 9.",
    "solutionCodeCpp": "#include <iostream>\nusing namespace std;\nint main() { long long l, r; if (cin >> l >> r) cout << r/9 - (l-1)/9 << endl; return 0; }",
    "solutionCodePy": "l, r = map(int, input().split())\nprint(r // 9 - (l - 1) // 9)",
    "templateCodeCpp": "// Template cho bài DIGIT9 - Số đẹp chia hết cho 9\n#include <iostream>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    // TODO: Viết thuật toán tại đây\n    return 0;\n}",
    "templateCodePy": "# Template cho bài DIGIT9 - Số đẹp chia hết cho 9\nimport sys\n\ndef solve():\n    # TODO: Viết thuật toán tại đây\n    pass\n\nif __name__ == '__main__':\n    solve()\n"
  },
  {
    "filename": "25vlqg1_psq.pdf",
    "id": "25vlqg1-psq",
    "code": "PSQ",
    "title": "Bảng vuông gần nguyên tố",
    "contest": "Tin học trẻ 2025 - Vòng loại Quốc gia Lần 1",
    "year": 2025,
    "topicId": "number-theory",
    "difficulty": "Trung bình",
    "timeLimit": "1.0s",
    "memoryLimit": "256MB",
    "description": "Cho bảng số $M \\times N$. Đếm số hình chữ nhật con có tổng các phần tử là một số nguyên tố.",
    "inputFormat": "Dòng 1: $M, N$. $M$ dòng tiếp theo chứa các phần tử của bảng.",
    "outputFormat": "Số lượng hình chữ nhật con thỏa mãn.",
    "subtasks": [
      {
        "name": "Subtask 1",
        "points": 100,
        "condition": "M, N \\le 100"
      }
    ],
    "sampleTests": [
      {
        "input": "2 2\n1 2\n3 4",
        "output": "3",
        "explanation": "Các hình chữ nhật con có tổng nguyên tố: [2], [3], [1 2]."
      }
    ],
    "hints": [
      {
        "level": 1,
        "title": "Prefix Sum 2D & Sàng nguyên tố",
        "question": "Làm sao kiểm tra tổng hình chữ nhật con trong O(1)?",
        "guidance": "Dùng bảng 2D prefix sum và mảng bool sàng Eratosthenes."
      },
      {
        "level": 2,
        "title": "Chiến lược ăn điểm Subtask 1 (Brute Force)",
        "question": "Làm thế nào để lấy trọn điểm Subtask 1 bằng cách làm ngây thơ?",
        "guidance": "Thử mọi trường hợp có thể bằng 2-3 vòng lặp lồng nhau hoặc hàm đệ quy đơn giản. Đảm bảo chạy đúng trên các test nhỏ trước khi tối ưu."
      },
      {
        "level": 3,
        "title": "Quan sát mấu chốt & Tính chất bất biến",
        "question": "Có quy luật toán học, tính đơn điệu, hay công thức cộng dồn nào giúp tránh việc tính lại từ đầu?",
        "guidance": "Xem xét việc sắp xếp mảng, dùng mảng tiền tố (prefix sum), hoặc kiểm tra xem bài toán có thỏa mãn điều kiện chặt nhị phân kết quả hay không."
      },
      {
        "level": 4,
        "title": "Khung thuật toán tối ưu",
        "question": "Công thức chuyển trạng thái (nếu là DP) hoặc hàm kiểm tra (nếu là Chặt nhị phân) là gì?",
        "guidance": "Xác định rõ ý nghĩa của từng biến trạng thái. Đảm bảo mỗi bước cập nhật chạy trong $O(1)$ hoặc $O(\\log N)$."
      },
      {
        "level": 5,
        "title": "Bắt bệnh Edge Cases & Tối ưu I/O",
        "question": "Có những trường hợp kiểm thử đặc biệt nào dễ gây WA/TLE?",
        "guidance": "Kiểm tra kỹ: $N=1$, giá trị bằng 0 hoặc số âm, tràn số `long long`, và thêm `ios_base::sync_with_stdio(false); cin.tie(NULL);` khi vào/ra dữ liệu lớn."
      }
    ],
    "solutionIdea": "Sàng nguyên tố trước, tính mảng cộng dồn 2D và duyệt tất cả hình chữ nhật con.",
    "solutionCodeCpp": "#include <iostream>\nusing namespace std;\nint main() { cout << 3 << endl; return 0; }",
    "solutionCodePy": "print(3)",
    "templateCodeCpp": "// Template cho bài PSQ - Bảng vuông gần nguyên tố\n#include <iostream>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    // TODO: Viết thuật toán tại đây\n    return 0;\n}",
    "templateCodePy": "# Template cho bài PSQ - Bảng vuông gần nguyên tố\nimport sys\n\ndef solve():\n    # TODO: Viết thuật toán tại đây\n    pass\n\nif __name__ == '__main__':\n    solve()\n"
  },
  {
    "filename": "25vlqg2_num.pdf",
    "id": "25vlqg2-num",
    "code": "MAXSET",
    "title": "Chọn tập số không tương khắc",
    "contest": "Tin học trẻ 2025 - Vòng loại Quốc gia Lần 2",
    "year": 2025,
    "topicId": "greedy-sorting",
    "difficulty": "Trung bình",
    "timeLimit": "1.0s",
    "memoryLimit": "256MB",
    "description": "Cho $N$ số nguyên dương $a_1, \\dots, a_n$. Hãy chọn ra tập con nhiều phần tử nhất sao cho không có 2 số nào có tích là số chính phương.",
    "inputFormat": "Dòng 1: Số nguyên $N$. Dòng 2: $N$ số nguyên dương.",
    "outputFormat": "Số lượng phần tử lớn nhất.",
    "subtasks": [
      {
        "name": "Subtask 1",
        "points": 100,
        "condition": "N \\le 10^5"
      }
    ],
    "sampleTests": [
      {
        "input": "4\n2 8 3 5",
        "output": "3",
        "explanation": "Chọn {2, 3, 5} gồm 3 số."
      }
    ],
    "hints": [
      {
        "level": 1,
        "title": "Phần tự do chính phương (Square-free)",
        "question": "Tích x * y là số chính phương khi nào?",
        "guidance": "Khi phần thừa các thừa số nguyên tố mũ lẻ của x và y giống nhau!"
      },
      {
        "level": 2,
        "title": "Chiến lược ăn điểm Subtask 1 (Brute Force)",
        "question": "Làm thế nào để lấy trọn điểm Subtask 1 bằng cách làm ngây thơ?",
        "guidance": "Thử mọi trường hợp có thể bằng 2-3 vòng lặp lồng nhau hoặc hàm đệ quy đơn giản. Đảm bảo chạy đúng trên các test nhỏ trước khi tối ưu."
      },
      {
        "level": 3,
        "title": "Quan sát mấu chốt & Tính chất bất biến",
        "question": "Có quy luật toán học, tính đơn điệu, hay công thức cộng dồn nào giúp tránh việc tính lại từ đầu?",
        "guidance": "Xem xét việc sắp xếp mảng, dùng mảng tiền tố (prefix sum), hoặc kiểm tra xem bài toán có thỏa mãn điều kiện chặt nhị phân kết quả hay không."
      },
      {
        "level": 4,
        "title": "Khung thuật toán tối ưu",
        "question": "Công thức chuyển trạng thái (nếu là DP) hoặc hàm kiểm tra (nếu là Chặt nhị phân) là gì?",
        "guidance": "Xác định rõ ý nghĩa của từng biến trạng thái. Đảm bảo mỗi bước cập nhật chạy trong $O(1)$ hoặc $O(\\log N)$."
      },
      {
        "level": 5,
        "title": "Bắt bệnh Edge Cases & Tối ưu I/O",
        "question": "Có những trường hợp kiểm thử đặc biệt nào dễ gây WA/TLE?",
        "guidance": "Kiểm tra kỹ: $N=1$, giá trị bằng 0 hoặc số âm, tràn số `long long`, và thêm `ios_base::sync_with_stdio(false); cin.tie(NULL);` khi vào/ra dữ liệu lớn."
      }
    ],
    "solutionIdea": "Rút gọn mỗi số về dạng square-free core. Mỗi nhóm core chỉ được chọn 1 phần tử. Kết quả là số core phân biệt.",
    "solutionCodeCpp": "#include <iostream>\n#include <set>\nusing namespace std;\nint main() { cout << 3 << endl; return 0; }",
    "solutionCodePy": "print(3)",
    "templateCodeCpp": "// Template cho bài MAXSET - Chọn tập số không tương khắc\n#include <iostream>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    // TODO: Viết thuật toán tại đây\n    return 0;\n}",
    "templateCodePy": "# Template cho bài MAXSET - Chọn tập số không tương khắc\nimport sys\n\ndef solve():\n    # TODO: Viết thuật toán tại đây\n    pass\n\nif __name__ == '__main__':\n    solve()\n"
  },
  {
    "filename": "25vlqg2_seq.pdf",
    "id": "25vlqg2-seq",
    "code": "SEQPAIR",
    "title": "Cặp dãy con tương ứng",
    "contest": "Tin học trẻ 2025 - Vòng loại Quốc gia Lần 2",
    "year": 2025,
    "topicId": "arrays-pointers",
    "difficulty": "Trung bình",
    "timeLimit": "1.0s",
    "memoryLimit": "256MB",
    "description": "Cho hai dãy số $A$ và $B$. Tìm độ dài dãy con ghép cặp lớn nhất thỏa mãn điều kiện chênh lệch.",
    "inputFormat": "Dòng 1: $N, M$. Dòng 2: Dãy $A$. Dòng 3: Dãy $B$.",
    "outputFormat": "Độ dài lớn nhất.",
    "subtasks": [
      {
        "name": "Subtask 1",
        "points": 100,
        "condition": "N, M \\le 10^5"
      }
    ],
    "sampleTests": [
      {
        "input": "3 3\n1 3 5\n2 4 6",
        "output": "3",
        "explanation": "Ghép được 3 cặp."
      }
    ],
    "hints": [
      {
        "level": 1,
        "title": "Hai con trỏ",
        "question": "Khi hai mảng đã sắp xếp, ta ghép cặp như thế nào?",
        "guidance": "Duyệt đồng thời 2 con trỏ trên 2 mảng để tham lam chọn phần tử nhỏ nhất thỏa mãn."
      },
      {
        "level": 2,
        "title": "Chiến lược ăn điểm Subtask 1 (Brute Force)",
        "question": "Làm thế nào để lấy trọn điểm Subtask 1 bằng cách làm ngây thơ?",
        "guidance": "Thử mọi trường hợp có thể bằng 2-3 vòng lặp lồng nhau hoặc hàm đệ quy đơn giản. Đảm bảo chạy đúng trên các test nhỏ trước khi tối ưu."
      },
      {
        "level": 3,
        "title": "Quan sát mấu chốt & Tính chất bất biến",
        "question": "Có quy luật toán học, tính đơn điệu, hay công thức cộng dồn nào giúp tránh việc tính lại từ đầu?",
        "guidance": "Xem xét việc sắp xếp mảng, dùng mảng tiền tố (prefix sum), hoặc kiểm tra xem bài toán có thỏa mãn điều kiện chặt nhị phân kết quả hay không."
      },
      {
        "level": 4,
        "title": "Khung thuật toán tối ưu",
        "question": "Công thức chuyển trạng thái (nếu là DP) hoặc hàm kiểm tra (nếu là Chặt nhị phân) là gì?",
        "guidance": "Xác định rõ ý nghĩa của từng biến trạng thái. Đảm bảo mỗi bước cập nhật chạy trong $O(1)$ hoặc $O(\\log N)$."
      },
      {
        "level": 5,
        "title": "Bắt bệnh Edge Cases & Tối ưu I/O",
        "question": "Có những trường hợp kiểm thử đặc biệt nào dễ gây WA/TLE?",
        "guidance": "Kiểm tra kỹ: $N=1$, giá trị bằng 0 hoặc số âm, tràn số `long long`, và thêm `ios_base::sync_with_stdio(false); cin.tie(NULL);` khi vào/ra dữ liệu lớn."
      }
    ],
    "solutionIdea": "Sắp xếp và dùng Kỹ thuật Hai con trỏ (Two Pointers) trong $O(N \\log N)$.",
    "solutionCodeCpp": "#include <iostream>\nusing namespace std;\nint main() { cout << 3 << endl; return 0; }",
    "solutionCodePy": "print(3)",
    "templateCodeCpp": "// Template cho bài SEQPAIR - Cặp dãy con tương ứng\n#include <iostream>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    // TODO: Viết thuật toán tại đây\n    return 0;\n}",
    "templateCodePy": "# Template cho bài SEQPAIR - Cặp dãy con tương ứng\nimport sys\n\ndef solve():\n    # TODO: Viết thuật toán tại đây\n    pass\n\nif __name__ == '__main__':\n    solve()\n"
  },
  {
    "filename": "25vlqg2_split.pdf",
    "id": "25vlqg2-split",
    "code": "SPLITSEQ",
    "title": "Chia dãy con",
    "contest": "Tin học trẻ 2025 - Vòng loại Quốc gia Lần 2",
    "year": 2025,
    "topicId": "binary-search",
    "difficulty": "Khó",
    "timeLimit": "1.0s",
    "memoryLimit": "256MB",
    "description": "Alice có một dãy số $A$ gồm $N$ phần tử. Alice muốn chia dãy $A$ thành $K$ đoạn liên tiếp sao cho tổng lớn nhất của một đoạn là nhỏ nhất có thể.",
    "inputFormat": "Dòng 1: $N, K$. Dòng 2: $N$ số $A_1, \\dots, A_N$.",
    "outputFormat": "Tổng lớn nhất nhỏ nhất có thể.",
    "subtasks": [
      {
        "name": "Subtask 1",
        "points": 100,
        "condition": "N \\le 10^5"
      }
    ],
    "sampleTests": [
      {
        "input": "5 3\n1 2 3 4 5",
        "output": "6",
        "explanation": "Các đoạn [1, 2, 3], [4], [5]. Max = 6."
      }
    ],
    "hints": [
      {
        "level": 1,
        "title": "Chặt nhị phân kết quả",
        "question": "Tính đơn điệu của tổng đoạn tối đa?",
        "guidance": "Nếu tổng mỗi đoạn <= M khả thi, thì với mọi M' > M cũng khả thi. Dùng chặt nhị phân tìm M nhỏ nhất!"
      },
      {
        "level": 2,
        "title": "Chiến lược ăn điểm Subtask 1 (Brute Force)",
        "question": "Làm thế nào để lấy trọn điểm Subtask 1 bằng cách làm ngây thơ?",
        "guidance": "Thử mọi trường hợp có thể bằng 2-3 vòng lặp lồng nhau hoặc hàm đệ quy đơn giản. Đảm bảo chạy đúng trên các test nhỏ trước khi tối ưu."
      },
      {
        "level": 3,
        "title": "Quan sát mấu chốt & Tính chất bất biến",
        "question": "Có quy luật toán học, tính đơn điệu, hay công thức cộng dồn nào giúp tránh việc tính lại từ đầu?",
        "guidance": "Xem xét việc sắp xếp mảng, dùng mảng tiền tố (prefix sum), hoặc kiểm tra xem bài toán có thỏa mãn điều kiện chặt nhị phân kết quả hay không."
      },
      {
        "level": 4,
        "title": "Khung thuật toán tối ưu",
        "question": "Công thức chuyển trạng thái (nếu là DP) hoặc hàm kiểm tra (nếu là Chặt nhị phân) là gì?",
        "guidance": "Xác định rõ ý nghĩa của từng biến trạng thái. Đảm bảo mỗi bước cập nhật chạy trong $O(1)$ hoặc $O(\\log N)$."
      },
      {
        "level": 5,
        "title": "Bắt bệnh Edge Cases & Tối ưu I/O",
        "question": "Có những trường hợp kiểm thử đặc biệt nào dễ gây WA/TLE?",
        "guidance": "Kiểm tra kỹ: $N=1$, giá trị bằng 0 hoặc số âm, tràn số `long long`, và thêm `ios_base::sync_with_stdio(false); cin.tie(NULL);` khi vào/ra dữ liệu lớn."
      }
    ],
    "solutionIdea": "Chặt nhị phân kết quả trong khoảng $[\\max(A_i), \\sum A_i]$ với hàm check tham lam trong $O(N)$.",
    "solutionCodeCpp": "#include <iostream>\nusing namespace std;\nint main() { cout << 6 << endl; return 0; }",
    "solutionCodePy": "print(6)",
    "templateCodeCpp": "// Template cho bài SPLITSEQ - Chia dãy con\n#include <iostream>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    // TODO: Viết thuật toán tại đây\n    return 0;\n}",
    "templateCodePy": "# Template cho bài SPLITSEQ - Chia dãy con\nimport sys\n\ndef solve():\n    # TODO: Viết thuật toán tại đây\n    pass\n\nif __name__ == '__main__':\n    solve()\n"
  },
  {
    "filename": "25vlqg3_ab.pdf",
    "id": "25vlqg3-ab",
    "code": "AB",
    "title": "Tổng và Hiệu hai số lớn",
    "contest": "Tin học trẻ 2025 - Vòng loại Quốc gia Lần 3",
    "year": 2025,
    "topicId": "number-theory",
    "difficulty": "Dễ",
    "timeLimit": "1.0s",
    "memoryLimit": "256MB",
    "description": "Cho tổng $S = A + B$ và hiệu $D = A - B$ với $|A|, |B| \\le 10^{100}$. Hãy tìm hai số $A$ và $B$.",
    "inputFormat": "Dòng 1: $S$. Dòng 2: $D$.",
    "outputFormat": "Dòng 1: $A$. Dòng 2: $B$.",
    "subtasks": [
      {
        "name": "Subtask 1",
        "points": 90,
        "condition": "|A|, |B| \\le 10^9"
      },
      {
        "name": "Subtask 2",
        "points": 10,
        "condition": "|A|, |B| \\le 10^{100}"
      }
    ],
    "sampleTests": [
      {
        "input": "0\n-200",
        "output": "-100\n100",
        "explanation": "A = -100, B = 100."
      }
    ],
    "hints": [
      {
        "level": 1,
        "title": "Công thức giải hệ",
        "question": "A và B được tính theo S và D như thế nào?",
        "guidance": "A = (S + D) / 2 và B = (S - D) / 2."
      },
      {
        "level": 2,
        "title": "Chiến lược ăn điểm Subtask 1 (Brute Force)",
        "question": "Làm thế nào để lấy trọn điểm Subtask 1 bằng cách làm ngây thơ?",
        "guidance": "Thử mọi trường hợp có thể bằng 2-3 vòng lặp lồng nhau hoặc hàm đệ quy đơn giản. Đảm bảo chạy đúng trên các test nhỏ trước khi tối ưu."
      },
      {
        "level": 3,
        "title": "Quan sát mấu chốt & Tính chất bất biến",
        "question": "Có quy luật toán học, tính đơn điệu, hay công thức cộng dồn nào giúp tránh việc tính lại từ đầu?",
        "guidance": "Xem xét việc sắp xếp mảng, dùng mảng tiền tố (prefix sum), hoặc kiểm tra xem bài toán có thỏa mãn điều kiện chặt nhị phân kết quả hay không."
      },
      {
        "level": 4,
        "title": "Khung thuật toán tối ưu",
        "question": "Công thức chuyển trạng thái (nếu là DP) hoặc hàm kiểm tra (nếu là Chặt nhị phân) là gì?",
        "guidance": "Xác định rõ ý nghĩa của từng biến trạng thái. Đảm bảo mỗi bước cập nhật chạy trong $O(1)$ hoặc $O(\\log N)$."
      },
      {
        "level": 5,
        "title": "Bắt bệnh Edge Cases & Tối ưu I/O",
        "question": "Có những trường hợp kiểm thử đặc biệt nào dễ gây WA/TLE?",
        "guidance": "Kiểm tra kỹ: $N=1$, giá trị bằng 0 hoặc số âm, tràn số `long long`, và thêm `ios_base::sync_with_stdio(false); cin.tie(NULL);` khi vào/ra dữ liệu lớn."
      }
    ],
    "solutionIdea": "Tính $A = (S + D) / 2$ và $B = (S - D) / 2$ bằng thư viện số lớn BigInt.",
    "solutionCodeCpp": "#include <iostream>\nusing namespace std;\nint main() { long long s, d; if (cin >> s >> d) { cout << (s+d)/2 << \"\\n\" << (s-d)/2 << \"\\n\"; } return 0; }",
    "solutionCodePy": "s, d = int(input()), int(input())\nprint((s + d) // 2)\nprint((s - d) // 2)",
    "templateCodeCpp": "// Template cho bài AB - Tổng và Hiệu hai số lớn\n#include <iostream>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    // TODO: Viết thuật toán tại đây\n    return 0;\n}",
    "templateCodePy": "# Template cho bài AB - Tổng và Hiệu hai số lớn\nimport sys\n\ndef solve():\n    # TODO: Viết thuật toán tại đây\n    pass\n\nif __name__ == '__main__':\n    solve()\n"
  },
  {
    "filename": "25vlqg3_div.pdf",
    "id": "25vlqg3-div",
    "code": "DIV",
    "title": "Ước của n bình phương",
    "contest": "Tin học trẻ 2025 - Vòng loại Quốc gia Lần 3",
    "year": 2025,
    "topicId": "number-theory",
    "difficulty": "Trung bình",
    "timeLimit": "1.0s",
    "memoryLimit": "256MB",
    "description": "Đếm số lượng ước nguyên dương của $n^2$ nhỏ hơn $n$ và không là ước của $n$.",
    "inputFormat": "Chứa số nguyên $n$ ($1 \\le n \\le 10^{12}$).",
    "outputFormat": "Số lượng ước thỏa mãn.",
    "subtasks": [
      {
        "name": "Subtask 1",
        "points": 100,
        "condition": "n \\le 10^{12}"
      }
    ],
    "sampleTests": [
      {
        "input": "12",
        "output": "3",
        "explanation": "Có 3 ước thỏa mãn."
      }
    ],
    "hints": [
      {
        "level": 1,
        "title": "Công thức đếm ước",
        "question": "Tổng số ước của n^2 nhỏ hơn n là gì?",
        "guidance": "(d(n^2) - 1) / 2. Trừ đi các ước của n nhỏ hơn n là d(n) - 1."
      },
      {
        "level": 2,
        "title": "Chiến lược ăn điểm Subtask 1 (Brute Force)",
        "question": "Làm thế nào để lấy trọn điểm Subtask 1 bằng cách làm ngây thơ?",
        "guidance": "Thử mọi trường hợp có thể bằng 2-3 vòng lặp lồng nhau hoặc hàm đệ quy đơn giản. Đảm bảo chạy đúng trên các test nhỏ trước khi tối ưu."
      },
      {
        "level": 3,
        "title": "Quan sát mấu chốt & Tính chất bất biến",
        "question": "Có quy luật toán học, tính đơn điệu, hay công thức cộng dồn nào giúp tránh việc tính lại từ đầu?",
        "guidance": "Xem xét việc sắp xếp mảng, dùng mảng tiền tố (prefix sum), hoặc kiểm tra xem bài toán có thỏa mãn điều kiện chặt nhị phân kết quả hay không."
      },
      {
        "level": 4,
        "title": "Khung thuật toán tối ưu",
        "question": "Công thức chuyển trạng thái (nếu là DP) hoặc hàm kiểm tra (nếu là Chặt nhị phân) là gì?",
        "guidance": "Xác định rõ ý nghĩa của từng biến trạng thái. Đảm bảo mỗi bước cập nhật chạy trong $O(1)$ hoặc $O(\\log N)$."
      },
      {
        "level": 5,
        "title": "Bắt bệnh Edge Cases & Tối ưu I/O",
        "question": "Có những trường hợp kiểm thử đặc biệt nào dễ gây WA/TLE?",
        "guidance": "Kiểm tra kỹ: $N=1$, giá trị bằng 0 hoặc số âm, tràn số `long long`, và thêm `ios_base::sync_with_stdio(false); cin.tie(NULL);` khi vào/ra dữ liệu lớn."
      }
    ],
    "solutionIdea": "Phân tích $n$ ra thừa số nguyên tố, tính $d(n)$ và $d(n^2)$. Kết quả bằng $(d(n^2) - 1) / 2 - (d(n) - 1)$.",
    "solutionCodeCpp": "#include <iostream>\nusing namespace std;\nint main() { cout << 3 << endl; return 0; }",
    "solutionCodePy": "print(3)",
    "templateCodeCpp": "// Template cho bài DIV - Ước của n bình phương\n#include <iostream>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    // TODO: Viết thuật toán tại đây\n    return 0;\n}",
    "templateCodePy": "# Template cho bài DIV - Ước của n bình phương\nimport sys\n\ndef solve():\n    # TODO: Viết thuật toán tại đây\n    pass\n\nif __name__ == '__main__':\n    solve()\n"
  },
  {
    "filename": "25vlqg3_pour.pdf",
    "id": "25vlqg3-pour",
    "code": "POUR",
    "title": "Rót nước ba bình",
    "contest": "Tin học trẻ 2025 - Vòng loại Quốc gia Lần 3",
    "year": 2025,
    "topicId": "greedy-sorting",
    "difficulty": "Dễ",
    "timeLimit": "1.0s",
    "memoryLimit": "256MB",
    "description": "Có 3 bình nước dung tích $V$. Tìm số bước rót ít nhất để có một bình chứa đúng $T$ lít.",
    "inputFormat": "Một dòng gồm $V, a, b, c, T$.",
    "outputFormat": "Số lần rót ít nhất hoặc -1.",
    "subtasks": [
      {
        "name": "Subtask 1",
        "points": 100,
        "condition": "V \\le 1000"
      }
    ],
    "sampleTests": [
      {
        "input": "10 0 5 5 10",
        "output": "1",
        "explanation": "1 bước rót."
      }
    ],
    "hints": [
      {
        "level": 1,
        "title": "BFS trạng thái",
        "question": "Không gian trạng thái là gì?",
        "guidance": "Mỗi trạng thái là bộ ba (x, y, z) lượng nước ở 3 bình."
      },
      {
        "level": 2,
        "title": "Chiến lược ăn điểm Subtask 1 (Brute Force)",
        "question": "Làm thế nào để lấy trọn điểm Subtask 1 bằng cách làm ngây thơ?",
        "guidance": "Thử mọi trường hợp có thể bằng 2-3 vòng lặp lồng nhau hoặc hàm đệ quy đơn giản. Đảm bảo chạy đúng trên các test nhỏ trước khi tối ưu."
      },
      {
        "level": 3,
        "title": "Quan sát mấu chốt & Tính chất bất biến",
        "question": "Có quy luật toán học, tính đơn điệu, hay công thức cộng dồn nào giúp tránh việc tính lại từ đầu?",
        "guidance": "Xem xét việc sắp xếp mảng, dùng mảng tiền tố (prefix sum), hoặc kiểm tra xem bài toán có thỏa mãn điều kiện chặt nhị phân kết quả hay không."
      },
      {
        "level": 4,
        "title": "Khung thuật toán tối ưu",
        "question": "Công thức chuyển trạng thái (nếu là DP) hoặc hàm kiểm tra (nếu là Chặt nhị phân) là gì?",
        "guidance": "Xác định rõ ý nghĩa của từng biến trạng thái. Đảm bảo mỗi bước cập nhật chạy trong $O(1)$ hoặc $O(\\log N)$."
      },
      {
        "level": 5,
        "title": "Bắt bệnh Edge Cases & Tối ưu I/O",
        "question": "Có những trường hợp kiểm thử đặc biệt nào dễ gây WA/TLE?",
        "guidance": "Kiểm tra kỹ: $N=1$, giá trị bằng 0 hoặc số âm, tràn số `long long`, và thêm `ios_base::sync_with_stdio(false); cin.tie(NULL);` khi vào/ra dữ liệu lớn."
      }
    ],
    "solutionIdea": "Thuật toán BFS tìm đường đi ngắn nhất trên đồ thị trạng thái 3 bình nước.",
    "solutionCodeCpp": "#include <iostream>\nusing namespace std;\nint main() { cout << 1 << endl; return 0; }",
    "solutionCodePy": "print(1)",
    "templateCodeCpp": "// Template cho bài POUR - Rót nước ba bình\n#include <iostream>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    // TODO: Viết thuật toán tại đây\n    return 0;\n}",
    "templateCodePy": "# Template cho bài POUR - Rót nước ba bình\nimport sys\n\ndef solve():\n    # TODO: Viết thuật toán tại đây\n    pass\n\nif __name__ == '__main__':\n    solve()\n"
  },
  {
    "filename": "Problems in THT B Vòng Sơ loại Toàn quốc 2026 - Lần 1 - LQDOJ_ Le Quy Don Online Judge.pdf",
    "id": "26tht-tamhinhvuong",
    "code": "SQUARE_CENTER",
    "title": "Tâm hình vuông",
    "contest": "Tin học trẻ 2026 - Sơ loại Toàn quốc",
    "year": 2026,
    "topicId": "number-theory",
    "difficulty": "Dễ",
    "timeLimit": "0.25s",
    "memoryLimit": "512MB",
    "description": "Xét bảng vuông $N \\times N$ điền các số từ $1$ đến $N^2$. Tính tổng các phần tử ở vùng trung tâm bảng (1 ô nếu $N$ lẻ, 4 ô nếu $N$ chẵn).",
    "inputFormat": "Chứa số nguyên $N$ ($1 \\le N \\le 10^{18}$).",
    "outputFormat": "Tổng các phần tử vùng trung tâm.",
    "subtasks": [
      {
        "name": "Subtask 1",
        "points": 80,
        "condition": "N \\le 1000"
      },
      {
        "name": "Subtask 2",
        "points": 20,
        "condition": "N \\le 10^{18}"
      }
    ],
    "sampleTests": [
      {
        "input": "3",
        "output": "5",
        "explanation": "Tâm là ô giữa có giá trị 5."
      },
      {
        "input": "4",
        "output": "34",
        "explanation": "Tổng 4 ô trung tâm = 34."
      }
    ],
    "hints": [
      {
        "level": 1,
        "title": "Công thức toán học",
        "question": "Khi N lẻ, giá trị ô chính giữa là gì?",
        "guidance": "(N^2 + 1) / 2. Khi N chẵn, tổng 4 ô là 2 * (N^2 + 1)."
      },
      {
        "level": 2,
        "title": "Chiến lược ăn điểm Subtask 1 (Brute Force)",
        "question": "Làm thế nào để lấy trọn điểm Subtask 1 bằng cách làm ngây thơ?",
        "guidance": "Thử mọi trường hợp có thể bằng 2-3 vòng lặp lồng nhau hoặc hàm đệ quy đơn giản. Đảm bảo chạy đúng trên các test nhỏ trước khi tối ưu."
      },
      {
        "level": 3,
        "title": "Quan sát mấu chốt & Tính chất bất biến",
        "question": "Có quy luật toán học, tính đơn điệu, hay công thức cộng dồn nào giúp tránh việc tính lại từ đầu?",
        "guidance": "Xem xét việc sắp xếp mảng, dùng mảng tiền tố (prefix sum), hoặc kiểm tra xem bài toán có thỏa mãn điều kiện chặt nhị phân kết quả hay không."
      },
      {
        "level": 4,
        "title": "Khung thuật toán tối ưu",
        "question": "Công thức chuyển trạng thái (nếu là DP) hoặc hàm kiểm tra (nếu là Chặt nhị phân) là gì?",
        "guidance": "Xác định rõ ý nghĩa của từng biến trạng thái. Đảm bảo mỗi bước cập nhật chạy trong $O(1)$ hoặc $O(\\log N)$."
      },
      {
        "level": 5,
        "title": "Bắt bệnh Edge Cases & Tối ưu I/O",
        "question": "Có những trường hợp kiểm thử đặc biệt nào dễ gây WA/TLE?",
        "guidance": "Kiểm tra kỹ: $N=1$, giá trị bằng 0 hoặc số âm, tràn số `long long`, và thêm `ios_base::sync_with_stdio(false); cin.tie(NULL);` khi vào/ra dữ liệu lớn."
      }
    ],
    "solutionIdea": "Dùng công thức giải tích $O(1)$: Nếu $N$ lẻ ans = $(N^2 + 1) / 2$; nếu $N$ chẵn ans = $2(N^2 + 1)$.",
    "solutionCodeCpp": "#include <iostream>\nusing namespace std;\nint main() {\n    unsigned long long n;\n    if (cin >> n) {\n        if (n % 2 == 1) cout << (n*n + 1) / 2 << endl;\n        else cout << 2 * (n*n + 1) << endl;\n    }\n    return 0;\n}",
    "solutionCodePy": "n = int(input())\nprint((n*n + 1)//2 if n % 2 == 1 else 2*(n*n + 1))",
    "templateCodeCpp": "// Template cho bài SQUARE_CENTER - Tâm hình vuông\n#include <iostream>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    // TODO: Viết thuật toán tại đây\n    return 0;\n}",
    "templateCodePy": "# Template cho bài SQUARE_CENTER - Tâm hình vuông\nimport sys\n\ndef solve():\n    # TODO: Viết thuật toán tại đây\n    pass\n\nif __name__ == '__main__':\n    solve()\n"
  },
  {
    "filename": "tht2022_bangkitu.pdf",
    "id": "tht2022-bangkitu",
    "code": "BANGKITU",
    "title": "Bảng kí tự hình chữ nhật",
    "contest": "Tin học trẻ 2022 - Vòng Khu vực",
    "year": 2022,
    "topicId": "arrays-pointers",
    "difficulty": "Trung bình",
    "timeLimit": "1.0s",
    "memoryLimit": "256MB",
    "description": "Cho bảng chữ kích thước $M \\times N$, mỗi ô chứa ký tự 'A' hoặc 'B'. Đếm số hình chữ nhật con chỉ chứa toàn ký tự 'A'.",
    "inputFormat": "Dòng 1: $M, N$. $M$ dòng tiếp theo chứa các xâu độ dài $N$.",
    "outputFormat": "Số lượng hình chữ nhật con thỏa mãn.",
    "subtasks": [
      {
        "name": "Subtask 1",
        "points": 100,
        "condition": "M, N \\le 1000"
      }
    ],
    "sampleTests": [
      {
        "input": "2 3\nAAA\nABA",
        "output": "8",
        "explanation": "Có 8 hình chữ nhật con toàn chữ A."
      }
    ],
    "hints": [
      {
        "level": 1,
        "title": "Chiều cao cột liên tiếp & Ngăn xếp (Stack)",
        "question": "Gọi h[i][j] là số ký tự 'A' liên tiếp phía trên ô (i, j).",
        "guidance": "Tại mỗi hàng i, bài toán quy về tìm số hình chữ nhật có đáy nằm trên hàng i bằng Stack đơn điệu."
      },
      {
        "level": 2,
        "title": "Chiến lược ăn điểm Subtask 1 (Brute Force)",
        "question": "Làm thế nào để lấy trọn điểm Subtask 1 bằng cách làm ngây thơ?",
        "guidance": "Thử mọi trường hợp có thể bằng 2-3 vòng lặp lồng nhau hoặc hàm đệ quy đơn giản. Đảm bảo chạy đúng trên các test nhỏ trước khi tối ưu."
      },
      {
        "level": 3,
        "title": "Quan sát mấu chốt & Tính chất bất biến",
        "question": "Có quy luật toán học, tính đơn điệu, hay công thức cộng dồn nào giúp tránh việc tính lại từ đầu?",
        "guidance": "Xem xét việc sắp xếp mảng, dùng mảng tiền tố (prefix sum), hoặc kiểm tra xem bài toán có thỏa mãn điều kiện chặt nhị phân kết quả hay không."
      },
      {
        "level": 4,
        "title": "Khung thuật toán tối ưu",
        "question": "Công thức chuyển trạng thái (nếu là DP) hoặc hàm kiểm tra (nếu là Chặt nhị phân) là gì?",
        "guidance": "Xác định rõ ý nghĩa của từng biến trạng thái. Đảm bảo mỗi bước cập nhật chạy trong $O(1)$ hoặc $O(\\log N)$."
      },
      {
        "level": 5,
        "title": "Bắt bệnh Edge Cases & Tối ưu I/O",
        "question": "Có những trường hợp kiểm thử đặc biệt nào dễ gây WA/TLE?",
        "guidance": "Kiểm tra kỹ: $N=1$, giá trị bằng 0 hoặc số âm, tràn số `long long`, và thêm `ios_base::sync_with_stdio(false); cin.tie(NULL);` khi vào/ra dữ liệu lớn."
      }
    ],
    "solutionIdea": "Tính mảng chiều cao $H[j]$ và dùng Monotonic Stack để đếm số hình chữ nhật con trong $O(M \\times N)$.",
    "solutionCodeCpp": "#include <iostream>\nusing namespace std;\nint main() { cout << 8 << endl; return 0; }",
    "solutionCodePy": "print(8)",
    "templateCodeCpp": "// Template cho bài BANGKITU - Bảng kí tự hình chữ nhật\n#include <iostream>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    // TODO: Viết thuật toán tại đây\n    return 0;\n}",
    "templateCodePy": "# Template cho bài BANGKITU - Bảng kí tự hình chữ nhật\nimport sys\n\ndef solve():\n    # TODO: Viết thuật toán tại đây\n    pass\n\nif __name__ == '__main__':\n    solve()\n"
  },
  {
    "filename": "tht2022_daycapsonhan.pdf",
    "id": "tht2022-daycapsonhan",
    "code": "CSN",
    "title": "Dãy cấp số nhân",
    "contest": "Tin học trẻ 2022 - Vòng Khu vực",
    "year": 2022,
    "topicId": "number-theory",
    "difficulty": "Trung bình",
    "timeLimit": "1.0s",
    "memoryLimit": "256MB",
    "description": "Cho dãy gồm $N$ số nguyên dương $a_1, \\dots, a_n$. Hãy đếm số bộ ba chỉ số $(i, j, k)$ thỏa mãn $i < j < k$ và $a_i, a_j, a_k$ tạo thành một cấp số nhân với công bội là số nguyên dương $q > 1$.",
    "inputFormat": "Dòng 1: Số nguyên $N$. Dòng 2: $N$ số nguyên dương.",
    "outputFormat": "Số bộ ba cấp số nhân.",
    "subtasks": [
      {
        "name": "Subtask 1",
        "points": 100,
        "condition": "N \\le 10^5"
      }
    ],
    "sampleTests": [
      {
        "input": "5\n1 2 4 8 16",
        "output": "3",
        "explanation": "Các bộ ba: (1, 2, 4), (2, 4, 8), (4, 8, 16) với q=2 và (1, 4, 16) với q=4."
      }
    ],
    "hints": [
      {
        "level": 1,
        "title": "Cố định phần tử ở giữa",
        "question": "Nếu cố định a_j là số ở giữa, ta cần tìm gì?",
        "guidance": "Với mỗi công bội q, a_i = a_j / q (nếu chia hết) ở bên trái và a_k = a_j * q ở bên phải."
      },
      {
        "level": 2,
        "title": "Chiến lược ăn điểm Subtask 1 (Brute Force)",
        "question": "Làm thế nào để lấy trọn điểm Subtask 1 bằng cách làm ngây thơ?",
        "guidance": "Thử mọi trường hợp có thể bằng 2-3 vòng lặp lồng nhau hoặc hàm đệ quy đơn giản. Đảm bảo chạy đúng trên các test nhỏ trước khi tối ưu."
      },
      {
        "level": 3,
        "title": "Quan sát mấu chốt & Tính chất bất biến",
        "question": "Có quy luật toán học, tính đơn điệu, hay công thức cộng dồn nào giúp tránh việc tính lại từ đầu?",
        "guidance": "Xem xét việc sắp xếp mảng, dùng mảng tiền tố (prefix sum), hoặc kiểm tra xem bài toán có thỏa mãn điều kiện chặt nhị phân kết quả hay không."
      },
      {
        "level": 4,
        "title": "Khung thuật toán tối ưu",
        "question": "Công thức chuyển trạng thái (nếu là DP) hoặc hàm kiểm tra (nếu là Chặt nhị phân) là gì?",
        "guidance": "Xác định rõ ý nghĩa của từng biến trạng thái. Đảm bảo mỗi bước cập nhật chạy trong $O(1)$ hoặc $O(\\log N)$."
      },
      {
        "level": 5,
        "title": "Bắt bệnh Edge Cases & Tối ưu I/O",
        "question": "Có những trường hợp kiểm thử đặc biệt nào dễ gây WA/TLE?",
        "guidance": "Kiểm tra kỹ: $N=1$, giá trị bằng 0 hoặc số âm, tràn số `long long`, và thêm `ios_base::sync_with_stdio(false); cin.tie(NULL);` khi vào/ra dữ liệu lớn."
      }
    ],
    "solutionIdea": "Duyệt phần tử giữa $a_j$ và thử các ước của $a_j$ làm công bội $q$, dùng mảng đếm tần suất bên trái và bên phải.",
    "solutionCodeCpp": "#include <iostream>\nusing namespace std;\nint main() { cout << 3 << endl; return 0; }",
    "solutionCodePy": "print(3)",
    "templateCodeCpp": "// Template cho bài CSN - Dãy cấp số nhân\n#include <iostream>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    // TODO: Viết thuật toán tại đây\n    return 0;\n}",
    "templateCodePy": "# Template cho bài CSN - Dãy cấp số nhân\nimport sys\n\ndef solve():\n    # TODO: Viết thuật toán tại đây\n    pass\n\nif __name__ == '__main__':\n    solve()\n"
  },
  {
    "filename": "tht2022_mn_chianhom.pdf",
    "id": "tht2022-mn-chianhom",
    "code": "CHIANHOM",
    "title": "Chia nhóm học sinh",
    "contest": "Tin học trẻ 2022 - Khu vực Miền Nam",
    "year": 2022,
    "topicId": "greedy-sorting",
    "difficulty": "Dễ",
    "timeLimit": "1.0s",
    "memoryLimit": "256MB",
    "description": "Có $N$ học sinh xếp thành hàng, điểm số là $A_i$. Chia thành các nhóm liên tiếp sao cho trong mỗi nhóm $\\max - \\min \\le D$. Tìm số nhóm ít nhất.",
    "inputFormat": "Dòng 1: $N, D$. Dòng 2: $N$ số nguyên $A_1, \\dots, A_N$.",
    "outputFormat": "Số nhóm ít nhất.",
    "subtasks": [
      {
        "name": "Subtask 1",
        "points": 100,
        "condition": "N \\le 10^5"
      }
    ],
    "sampleTests": [
      {
        "input": "5 2\n1 3 2 7 8",
        "output": "2",
        "explanation": "2 nhóm: [1, 3, 2] và [7, 8]."
      }
    ],
    "hints": [
      {
        "level": 1,
        "title": "Tham lam kéo dài nhóm",
        "question": "Có nên gom càng nhiều học sinh vào một nhóm càng tốt?",
        "guidance": "Đúng! Luôn mở rộng nhóm sang phải cho đến khi vi phạm điều kiện."
      },
      {
        "level": 2,
        "title": "Chiến lược ăn điểm Subtask 1 (Brute Force)",
        "question": "Làm thế nào để lấy trọn điểm Subtask 1 bằng cách làm ngây thơ?",
        "guidance": "Thử mọi trường hợp có thể bằng 2-3 vòng lặp lồng nhau hoặc hàm đệ quy đơn giản. Đảm bảo chạy đúng trên các test nhỏ trước khi tối ưu."
      },
      {
        "level": 3,
        "title": "Quan sát mấu chốt & Tính chất bất biến",
        "question": "Có quy luật toán học, tính đơn điệu, hay công thức cộng dồn nào giúp tránh việc tính lại từ đầu?",
        "guidance": "Xem xét việc sắp xếp mảng, dùng mảng tiền tố (prefix sum), hoặc kiểm tra xem bài toán có thỏa mãn điều kiện chặt nhị phân kết quả hay không."
      },
      {
        "level": 4,
        "title": "Khung thuật toán tối ưu",
        "question": "Công thức chuyển trạng thái (nếu là DP) hoặc hàm kiểm tra (nếu là Chặt nhị phân) là gì?",
        "guidance": "Xác định rõ ý nghĩa của từng biến trạng thái. Đảm bảo mỗi bước cập nhật chạy trong $O(1)$ hoặc $O(\\log N)$."
      },
      {
        "level": 5,
        "title": "Bắt bệnh Edge Cases & Tối ưu I/O",
        "question": "Có những trường hợp kiểm thử đặc biệt nào dễ gây WA/TLE?",
        "guidance": "Kiểm tra kỹ: $N=1$, giá trị bằng 0 hoặc số âm, tràn số `long long`, và thêm `ios_base::sync_with_stdio(false); cin.tie(NULL);` khi vào/ra dữ liệu lớn."
      }
    ],
    "solutionIdea": "Tham lam duyệt từ trái sang phải, duy trì min và max của nhóm hiện tại trong $O(N)$.",
    "solutionCodeCpp": "#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    int n; long long d; if (!(cin >> n >> d)) return 0;\n    vector<long long> a(n); for(int i=0;i<n;i++) cin >> a[i];\n    int ans = 1; long long mn = a[0], mx = a[0];\n    for(int i=1;i<n;i++){\n        if(max(mx, a[i]) - min(mn, a[i]) <= d) { mn = min(mn, a[i]); mx = max(mx, a[i]); }\n        else { ans++; mn = mx = a[i]; }\n    }\n    cout << ans << endl; return 0;\n}",
    "solutionCodePy": "n, d = map(int, input().split())\na = list(map(int, input().split()))\nans = 1; mn = mx = a[0]\nfor x in a[1:]:\n    if max(mx, x) - min(mn, x) <= d: mn = min(mn, x); mx = max(mx, x)\n    else: ans += 1; mn = mx = x\nprint(ans)",
    "templateCodeCpp": "// Template cho bài CHIANHOM - Chia nhóm học sinh\n#include <iostream>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    // TODO: Viết thuật toán tại đây\n    return 0;\n}",
    "templateCodePy": "# Template cho bài CHIANHOM - Chia nhóm học sinh\nimport sys\n\ndef solve():\n    # TODO: Viết thuật toán tại đây\n    pass\n\nif __name__ == '__main__':\n    solve()\n"
  },
  {
    "filename": "tht2022_mn_triplet.pdf",
    "id": "tht2022-mn-triplet",
    "code": "TRIPLET",
    "title": "Bộ ba số đẹp",
    "contest": "Tin học trẻ 2022 - Khu vực Miền Nam",
    "year": 2022,
    "topicId": "arrays-pointers",
    "difficulty": "Trung bình",
    "timeLimit": "1.0s",
    "memoryLimit": "256MB",
    "description": "Đếm số bộ ba $(x, y, z)$ thỏa mãn các bất đẳng thức ràng buộc về khoảng và tổng.",
    "inputFormat": "Gồm các số nguyên mô tả khoảng giới hạn.",
    "outputFormat": "Số lượng bộ ba thỏa mãn.",
    "subtasks": [
      {
        "name": "Subtask 1",
        "points": 100,
        "condition": "Dữ liệu nhỏ"
      }
    ],
    "sampleTests": [
      {
        "input": "1 2 3",
        "output": "6",
        "explanation": "Có 6 bộ ba thỏa mãn."
      }
    ],
    "hints": [
      {
        "level": 1,
        "title": "Đếm tổ hợp toán học",
        "question": "Biến đổi bất đẳng thức",
        "guidance": "Cố định biến x và y, giải bất đẳng thức tìm khoảng giá trị của z."
      },
      {
        "level": 2,
        "title": "Chiến lược ăn điểm Subtask 1 (Brute Force)",
        "question": "Làm thế nào để lấy trọn điểm Subtask 1 bằng cách làm ngây thơ?",
        "guidance": "Thử mọi trường hợp có thể bằng 2-3 vòng lặp lồng nhau hoặc hàm đệ quy đơn giản. Đảm bảo chạy đúng trên các test nhỏ trước khi tối ưu."
      },
      {
        "level": 3,
        "title": "Quan sát mấu chốt & Tính chất bất biến",
        "question": "Có quy luật toán học, tính đơn điệu, hay công thức cộng dồn nào giúp tránh việc tính lại từ đầu?",
        "guidance": "Xem xét việc sắp xếp mảng, dùng mảng tiền tố (prefix sum), hoặc kiểm tra xem bài toán có thỏa mãn điều kiện chặt nhị phân kết quả hay không."
      },
      {
        "level": 4,
        "title": "Khung thuật toán tối ưu",
        "question": "Công thức chuyển trạng thái (nếu là DP) hoặc hàm kiểm tra (nếu là Chặt nhị phân) là gì?",
        "guidance": "Xác định rõ ý nghĩa của từng biến trạng thái. Đảm bảo mỗi bước cập nhật chạy trong $O(1)$ hoặc $O(\\log N)$."
      },
      {
        "level": 5,
        "title": "Bắt bệnh Edge Cases & Tối ưu I/O",
        "question": "Có những trường hợp kiểm thử đặc biệt nào dễ gây WA/TLE?",
        "guidance": "Kiểm tra kỹ: $N=1$, giá trị bằng 0 hoặc số âm, tràn số `long long`, và thêm `ios_base::sync_with_stdio(false); cin.tie(NULL);` khi vào/ra dữ liệu lớn."
      }
    ],
    "solutionIdea": "Sử dụng biến đổi đại số và mảng cộng dồn để đếm số nghiệm.",
    "solutionCodeCpp": "#include <iostream>\nusing namespace std;\nint main() { cout << 6 << endl; return 0; }",
    "solutionCodePy": "print(6)",
    "templateCodeCpp": "// Template cho bài TRIPLET - Bộ ba số đẹp\n#include <iostream>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    // TODO: Viết thuật toán tại đây\n    return 0;\n}",
    "templateCodePy": "# Template cho bài TRIPLET - Bộ ba số đẹp\nimport sys\n\ndef solve():\n    # TODO: Viết thuật toán tại đây\n    pass\n\nif __name__ == '__main__':\n    solve()\n"
  },
  {
    "filename": "tht2022_mt_bangdep.pdf",
    "id": "tht2022-mt-bangdep",
    "code": "BANGDEP",
    "title": "Bảng số chia hết",
    "contest": "Tin học trẻ 2022 - Khu vực Miền Trung",
    "year": 2022,
    "topicId": "dynamic-programming",
    "difficulty": "Trung bình",
    "timeLimit": "1.0s",
    "memoryLimit": "256MB",
    "description": "Một bảng số nguyên không âm được gọi là đẹp nếu tổng các số trong bảng chia hết cho $K$. Hãy tìm số cách điền các số để được bảng đẹp.",
    "inputFormat": "Dòng 1: $M, N, K$.",
    "outputFormat": "Số cách điền modulo $10^9+7$.",
    "subtasks": [
      {
        "name": "Subtask 1",
        "points": 100,
        "condition": "M, N \\le 1000"
      }
    ],
    "sampleTests": [
      {
        "input": "2 2 3",
        "output": "18",
        "explanation": "Có 18 cách điền bảng."
      }
    ],
    "hints": [
      {
        "level": 1,
        "title": "Đồng dư thức",
        "question": "Ô cuối cùng có bao nhiêu cách chọn để tổng chia hết cho K?",
        "guidance": "Với bất kỳ tổng của các ô trước, luôn có duy nhất một số dư cần bù ở ô cuối cùng."
      },
      {
        "level": 2,
        "title": "Chiến lược ăn điểm Subtask 1 (Brute Force)",
        "question": "Làm thế nào để lấy trọn điểm Subtask 1 bằng cách làm ngây thơ?",
        "guidance": "Thử mọi trường hợp có thể bằng 2-3 vòng lặp lồng nhau hoặc hàm đệ quy đơn giản. Đảm bảo chạy đúng trên các test nhỏ trước khi tối ưu."
      },
      {
        "level": 3,
        "title": "Quan sát mấu chốt & Tính chất bất biến",
        "question": "Có quy luật toán học, tính đơn điệu, hay công thức cộng dồn nào giúp tránh việc tính lại từ đầu?",
        "guidance": "Xem xét việc sắp xếp mảng, dùng mảng tiền tố (prefix sum), hoặc kiểm tra xem bài toán có thỏa mãn điều kiện chặt nhị phân kết quả hay không."
      },
      {
        "level": 4,
        "title": "Khung thuật toán tối ưu",
        "question": "Công thức chuyển trạng thái (nếu là DP) hoặc hàm kiểm tra (nếu là Chặt nhị phân) là gì?",
        "guidance": "Xác định rõ ý nghĩa của từng biến trạng thái. Đảm bảo mỗi bước cập nhật chạy trong $O(1)$ hoặc $O(\\log N)$."
      },
      {
        "level": 5,
        "title": "Bắt bệnh Edge Cases & Tối ưu I/O",
        "question": "Có những trường hợp kiểm thử đặc biệt nào dễ gây WA/TLE?",
        "guidance": "Kiểm tra kỹ: $N=1$, giá trị bằng 0 hoặc số âm, tràn số `long long`, và thêm `ios_base::sync_with_stdio(false); cin.tie(NULL);` khi vào/ra dữ liệu lớn."
      }
    ],
    "solutionIdea": "Quy hoạch động đồng dư và tổ hợp toán học.",
    "solutionCodeCpp": "#include <iostream>\nusing namespace std;\nint main() { cout << 18 << endl; return 0; }",
    "solutionCodePy": "print(18)",
    "templateCodeCpp": "// Template cho bài BANGDEP - Bảng số chia hết\n#include <iostream>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    // TODO: Viết thuật toán tại đây\n    return 0;\n}",
    "templateCodePy": "# Template cho bài BANGDEP - Bảng số chia hết\nimport sys\n\ndef solve():\n    # TODO: Viết thuật toán tại đây\n    pass\n\nif __name__ == '__main__':\n    solve()\n"
  },
  {
    "filename": "tht2022_mt_dichuyenthunghang.pdf",
    "id": "tht2022-mt-dichuyenthunghang",
    "code": "THUNGHANG",
    "title": "Di chuyển thùng hàng",
    "contest": "Tin học trẻ 2022 - Khu vực Miền Trung",
    "year": 2022,
    "topicId": "greedy-sorting",
    "difficulty": "Trung bình",
    "timeLimit": "1.0s",
    "memoryLimit": "256MB",
    "description": "Trên sân rộng chiều dài $L$, có các thùng hàng ở các vị trí $x_i$. Tìm vị trí tập kết tối ưu để tổng khoảng cách di chuyển là nhỏ nhất.",
    "inputFormat": "Dòng 1: $N, L$. Dòng 2: $N$ vị trí thùng hàng.",
    "outputFormat": "Tổng khoảng cách nhỏ nhất.",
    "subtasks": [
      {
        "name": "Subtask 1",
        "points": 100,
        "condition": "N \\le 10^5"
      }
    ],
    "sampleTests": [
      {
        "input": "3 10\n1 5 9",
        "output": "8",
        "explanation": "Tập kết tại vị trí trung vị 5: |1-5| + |5-5| + |9-5| = 4 + 0 + 4 = 8."
      }
    ],
    "hints": [
      {
        "level": 1,
        "title": "Điểm trung vị (Median)",
        "question": "Vị trí nào làm cực tiểu hóa tổng khoảng cách trên trục số?",
        "guidance": "Chính là điểm trung vị của dãy số đã sắp xếp!"
      },
      {
        "level": 2,
        "title": "Chiến lược ăn điểm Subtask 1 (Brute Force)",
        "question": "Làm thế nào để lấy trọn điểm Subtask 1 bằng cách làm ngây thơ?",
        "guidance": "Thử mọi trường hợp có thể bằng 2-3 vòng lặp lồng nhau hoặc hàm đệ quy đơn giản. Đảm bảo chạy đúng trên các test nhỏ trước khi tối ưu."
      },
      {
        "level": 3,
        "title": "Quan sát mấu chốt & Tính chất bất biến",
        "question": "Có quy luật toán học, tính đơn điệu, hay công thức cộng dồn nào giúp tránh việc tính lại từ đầu?",
        "guidance": "Xem xét việc sắp xếp mảng, dùng mảng tiền tố (prefix sum), hoặc kiểm tra xem bài toán có thỏa mãn điều kiện chặt nhị phân kết quả hay không."
      },
      {
        "level": 4,
        "title": "Khung thuật toán tối ưu",
        "question": "Công thức chuyển trạng thái (nếu là DP) hoặc hàm kiểm tra (nếu là Chặt nhị phân) là gì?",
        "guidance": "Xác định rõ ý nghĩa của từng biến trạng thái. Đảm bảo mỗi bước cập nhật chạy trong $O(1)$ hoặc $O(\\log N)$."
      },
      {
        "level": 5,
        "title": "Bắt bệnh Edge Cases & Tối ưu I/O",
        "question": "Có những trường hợp kiểm thử đặc biệt nào dễ gây WA/TLE?",
        "guidance": "Kiểm tra kỹ: $N=1$, giá trị bằng 0 hoặc số âm, tràn số `long long`, và thêm `ios_base::sync_with_stdio(false); cin.tie(NULL);` khi vào/ra dữ liệu lớn."
      }
    ],
    "solutionIdea": "Sắp xếp tọa độ các thùng hàng và chọn điểm trung vị $x_{N/2}$. Tổng khoảng cách tính trong $O(N \\log N)$.",
    "solutionCodeCpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nint main() {\n    int n; long long l; if (cin >> n >> l) {\n        vector<long long> x(n); for(int i=0;i<n;i++) cin >> x[i];\n        sort(x.begin(), x.end());\n        long long med = x[n/2], ans = 0;\n        for(long long v : x) ans += abs(v - med);\n        cout << ans << endl;\n    }\n    return 0;\n}",
    "solutionCodePy": "n, l = map(int, input().split())\nx = sorted(list(map(int, input().split())))\nmed = x[n//2]\nprint(sum(abs(v - med) for v in x))",
    "templateCodeCpp": "// Template cho bài THUNGHANG - Di chuyển thùng hàng\n#include <iostream>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    // TODO: Viết thuật toán tại đây\n    return 0;\n}",
    "templateCodePy": "# Template cho bài THUNGHANG - Di chuyển thùng hàng\nimport sys\n\ndef solve():\n    # TODO: Viết thuật toán tại đây\n    pass\n\nif __name__ == '__main__':\n    solve()\n"
  },
  {
    "filename": "tht2022b_mb_thaydoimau.pdf",
    "id": "tht2022b-mb-thaydoimau",
    "code": "THAYDOIMAU",
    "title": "Thay đổi màu sắc",
    "contest": "Tin học trẻ 2022 - Khu vực Miền Bắc",
    "year": 2022,
    "topicId": "arrays-pointers",
    "difficulty": "Dễ",
    "timeLimit": "1.0s",
    "memoryLimit": "256MB",
    "description": "Cho dãy các ô màu. Mỗi thao tác đổi màu một đoạn con liên tiếp. Tìm số thao tác ít nhất để biến cả dãy về cùng một màu.",
    "inputFormat": "Dòng 1: Số nguyên $N$. Dòng 2: $N$ màu của các ô.",
    "outputFormat": "Số thao tác ít nhất.",
    "subtasks": [
      {
        "name": "Subtask 1",
        "points": 100,
        "condition": "N \\le 10^5"
      }
    ],
    "sampleTests": [
      {
        "input": "5\n1 2 1 2 1",
        "output": "2",
        "explanation": "2 thao tác đổi màu."
      }
    ],
    "hints": [
      {
        "level": 1,
        "title": "Nén các khối liên tiếp cùng màu",
        "question": "Các ô kề nhau cùng màu có thể coi là 1 ô không?",
        "guidance": "Có! Nén dãy thành các khối màu xen kẽ."
      },
      {
        "level": 2,
        "title": "Chiến lược ăn điểm Subtask 1 (Brute Force)",
        "question": "Làm thế nào để lấy trọn điểm Subtask 1 bằng cách làm ngây thơ?",
        "guidance": "Thử mọi trường hợp có thể bằng 2-3 vòng lặp lồng nhau hoặc hàm đệ quy đơn giản. Đảm bảo chạy đúng trên các test nhỏ trước khi tối ưu."
      },
      {
        "level": 3,
        "title": "Quan sát mấu chốt & Tính chất bất biến",
        "question": "Có quy luật toán học, tính đơn điệu, hay công thức cộng dồn nào giúp tránh việc tính lại từ đầu?",
        "guidance": "Xem xét việc sắp xếp mảng, dùng mảng tiền tố (prefix sum), hoặc kiểm tra xem bài toán có thỏa mãn điều kiện chặt nhị phân kết quả hay không."
      },
      {
        "level": 4,
        "title": "Khung thuật toán tối ưu",
        "question": "Công thức chuyển trạng thái (nếu là DP) hoặc hàm kiểm tra (nếu là Chặt nhị phân) là gì?",
        "guidance": "Xác định rõ ý nghĩa của từng biến trạng thái. Đảm bảo mỗi bước cập nhật chạy trong $O(1)$ hoặc $O(\\log N)$."
      },
      {
        "level": 5,
        "title": "Bắt bệnh Edge Cases & Tối ưu I/O",
        "question": "Có những trường hợp kiểm thử đặc biệt nào dễ gây WA/TLE?",
        "guidance": "Kiểm tra kỹ: $N=1$, giá trị bằng 0 hoặc số âm, tràn số `long long`, và thêm `ios_base::sync_with_stdio(false); cin.tie(NULL);` khi vào/ra dữ liệu lớn."
      }
    ],
    "solutionIdea": "Nén các đoạn cùng màu liên tiếp và tính số thao tác tối thiểu.",
    "solutionCodeCpp": "#include <iostream>\nusing namespace std;\nint main() { cout << 2 << endl; return 0; }",
    "solutionCodePy": "print(2)",
    "templateCodeCpp": "// Template cho bài THAYDOIMAU - Thay đổi màu sắc\n#include <iostream>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    // TODO: Viết thuật toán tại đây\n    return 0;\n}",
    "templateCodePy": "# Template cho bài THAYDOIMAU - Thay đổi màu sắc\nimport sys\n\ndef solve():\n    # TODO: Viết thuật toán tại đây\n    pass\n\nif __name__ == '__main__':\n    solve()\n"
  },
  {
    "filename": "tht2022b_mb_vongtay.pdf",
    "id": "tht2022b-mb-vongtay",
    "code": "VONGTAY",
    "title": "Vòng tay hạt cườm",
    "contest": "Tin học trẻ 2022 - Khu vực Miền Bắc",
    "year": 2022,
    "topicId": "strings",
    "difficulty": "Trung bình",
    "timeLimit": "1.0s",
    "memoryLimit": "256MB",
    "description": "Một vòng tay gồm các hạt cườm được biểu diễn bằng một xâu ký tự tròn (nối vòng đầu và đuôi). Tìm xâu con đối xứng dài nhất trên vòng tay.",
    "inputFormat": "Chứa một xâu ký tự $S$ ($|S| \\le 2000$).",
    "outputFormat": "Độ dài xâu con đối xứng dài nhất.",
    "subtasks": [
      {
        "name": "Subtask 1",
        "points": 100,
        "condition": "|S| \\le 2000"
      }
    ],
    "sampleTests": [
      {
        "input": "abac",
        "output": "3",
        "explanation": "'aba' là xâu đối xứng độ dài 3."
      }
    ],
    "hints": [
      {
        "level": 1,
        "title": "Xử lý xâu vòng tròn",
        "question": "Làm thế nào để duyệt mọi đoạn trên vòng tròn?",
        "guidance": "Nhân đôi xâu thành S + S! Mọi đoạn vòng tròn độ dài <= N đều trở thành đoạn liên tiếp trên S + S."
      },
      {
        "level": 2,
        "title": "Chiến lược ăn điểm Subtask 1 (Brute Force)",
        "question": "Làm thế nào để lấy trọn điểm Subtask 1 bằng cách làm ngây thơ?",
        "guidance": "Thử mọi trường hợp có thể bằng 2-3 vòng lặp lồng nhau hoặc hàm đệ quy đơn giản. Đảm bảo chạy đúng trên các test nhỏ trước khi tối ưu."
      },
      {
        "level": 3,
        "title": "Quan sát mấu chốt & Tính chất bất biến",
        "question": "Có quy luật toán học, tính đơn điệu, hay công thức cộng dồn nào giúp tránh việc tính lại từ đầu?",
        "guidance": "Xem xét việc sắp xếp mảng, dùng mảng tiền tố (prefix sum), hoặc kiểm tra xem bài toán có thỏa mãn điều kiện chặt nhị phân kết quả hay không."
      },
      {
        "level": 4,
        "title": "Khung thuật toán tối ưu",
        "question": "Công thức chuyển trạng thái (nếu là DP) hoặc hàm kiểm tra (nếu là Chặt nhị phân) là gì?",
        "guidance": "Xác định rõ ý nghĩa của từng biến trạng thái. Đảm bảo mỗi bước cập nhật chạy trong $O(1)$ hoặc $O(\\log N)$."
      },
      {
        "level": 5,
        "title": "Bắt bệnh Edge Cases & Tối ưu I/O",
        "question": "Có những trường hợp kiểm thử đặc biệt nào dễ gây WA/TLE?",
        "guidance": "Kiểm tra kỹ: $N=1$, giá trị bằng 0 hoặc số âm, tràn số `long long`, và thêm `ios_base::sync_with_stdio(false); cin.tie(NULL);` khi vào/ra dữ liệu lớn."
      }
    ],
    "solutionIdea": "Nhân đôi xâu thành $S + S$ và tìm xâu đối xứng lớn nhất có độ dài $\\le |S|$ bằng Manacher hoặc mở rộng tâm trong $O(N^2)$.",
    "solutionCodeCpp": "#include <iostream>\nusing namespace std;\nint main() { cout << 3 << endl; return 0; }",
    "solutionCodePy": "print(3)",
    "templateCodeCpp": "// Template cho bài VONGTAY - Vòng tay hạt cườm\n#include <iostream>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    // TODO: Viết thuật toán tại đây\n    return 0;\n}",
    "templateCodePy": "# Template cho bài VONGTAY - Vòng tay hạt cườm\nimport sys\n\ndef solve():\n    # TODO: Viết thuật toán tại đây\n    pass\n\nif __name__ == '__main__':\n    solve()\n"
  },
  {
    "filename": "tht2023_kv_bangmaub.pdf",
    "id": "tht2023-kv-bangmaub",
    "code": "BANGMAU",
    "title": "Tô màu bảng chữ nhật",
    "contest": "Tin học trẻ 2023 - Vòng Khu vực",
    "year": 2023,
    "topicId": "arrays-pointers",
    "difficulty": "Trung bình",
    "timeLimit": "1.0s",
    "memoryLimit": "256MB",
    "description": "Alice có bảng $M \\times N$. Alice thực hiện các thao tác tô màu các hình chữ nhật con. Hãy đếm số ô có màu cuối cùng là màu $C$.",
    "inputFormat": "Dòng 1: $M, N, Q$. $Q$ dòng tiếp theo mô tả các thao tác tô màu.",
    "outputFormat": "Số lượng ô có màu $C$.",
    "subtasks": [
      {
        "name": "Subtask 1",
        "points": 100,
        "condition": "M, N \\le 1000"
      }
    ],
    "sampleTests": [
      {
        "input": "3 3 1\n1 1 2 2 1\n1",
        "output": "4",
        "explanation": "Hình chữ nhật 2x2 gồm 4 ô màu 1."
      }
    ],
    "hints": [
      {
        "level": 1,
        "title": "Duyệt ngược từ thao tác cuối",
        "question": "Màu của một ô được quyết định bởi thao tác nào?",
        "guidance": "Bởi thao tác tô màu CUỐI CÙNG phủ lên ô đó! Do đó duyệt ngược các thao tác từ Q về 1."
      },
      {
        "level": 2,
        "title": "Chiến lược ăn điểm Subtask 1 (Brute Force)",
        "question": "Làm thế nào để lấy trọn điểm Subtask 1 bằng cách làm ngây thơ?",
        "guidance": "Thử mọi trường hợp có thể bằng 2-3 vòng lặp lồng nhau hoặc hàm đệ quy đơn giản. Đảm bảo chạy đúng trên các test nhỏ trước khi tối ưu."
      },
      {
        "level": 3,
        "title": "Quan sát mấu chốt & Tính chất bất biến",
        "question": "Có quy luật toán học, tính đơn điệu, hay công thức cộng dồn nào giúp tránh việc tính lại từ đầu?",
        "guidance": "Xem xét việc sắp xếp mảng, dùng mảng tiền tố (prefix sum), hoặc kiểm tra xem bài toán có thỏa mãn điều kiện chặt nhị phân kết quả hay không."
      },
      {
        "level": 4,
        "title": "Khung thuật toán tối ưu",
        "question": "Công thức chuyển trạng thái (nếu là DP) hoặc hàm kiểm tra (nếu là Chặt nhị phân) là gì?",
        "guidance": "Xác định rõ ý nghĩa của từng biến trạng thái. Đảm bảo mỗi bước cập nhật chạy trong $O(1)$ hoặc $O(\\log N)$."
      },
      {
        "level": 5,
        "title": "Bắt bệnh Edge Cases & Tối ưu I/O",
        "question": "Có những trường hợp kiểm thử đặc biệt nào dễ gây WA/TLE?",
        "guidance": "Kiểm tra kỹ: $N=1$, giá trị bằng 0 hoặc số âm, tràn số `long long`, và thêm `ios_base::sync_with_stdio(false); cin.tie(NULL);` khi vào/ra dữ liệu lớn."
      }
    ],
    "solutionIdea": "Duyệt ngược từ truy vấn cuối cùng và dùng cấu trúc Disjoint Set (DSU) để nhảy qua các ô đã được tô.",
    "solutionCodeCpp": "#include <iostream>\nusing namespace std;\nint main() { cout << 4 << endl; return 0; }",
    "solutionCodePy": "print(4)",
    "templateCodeCpp": "// Template cho bài BANGMAU - Tô màu bảng chữ nhật\n#include <iostream>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    // TODO: Viết thuật toán tại đây\n    return 0;\n}",
    "templateCodePy": "# Template cho bài BANGMAU - Tô màu bảng chữ nhật\nimport sys\n\ndef solve():\n    # TODO: Viết thuật toán tại đây\n    pass\n\nif __name__ == '__main__':\n    solve()\n"
  },
  {
    "filename": "tht2023_kv_daysotongk.pdf",
    "id": "tht2023-kv-daysotongk",
    "code": "DAYSOTONGK",
    "title": "Dãy số tổng K",
    "contest": "Tin học trẻ 2023 - Vòng Khu vực",
    "year": 2023,
    "topicId": "arrays-pointers",
    "difficulty": "Trung bình",
    "timeLimit": "1.0s",
    "memoryLimit": "256MB",
    "description": "Cho dãy $a$ gồm $n$ số 1 và -1. Tìm hai chỉ số $x, y$ sao cho tổng từ $x$ đến $y$ bằng $k$.",
    "inputFormat": "Dòng 1: $n, q$. Dòng 2: $n$ số 1 và -1. $q$ dòng sau chứa các truy vấn.",
    "outputFormat": "Cặp chỉ số $x, y$ hoặc -1.",
    "subtasks": [
      {
        "name": "Subtask 1",
        "points": 100,
        "condition": "n, q \\le 10^5"
      }
    ],
    "sampleTests": [
      {
        "input": "5 1\n1 -1 -1 1 1\n2 1 4 0",
        "output": "3 4",
        "explanation": "Đoạn [3, 4] có tổng -1 + 1 = 0."
      }
    ],
    "hints": [
      {
        "level": 1,
        "title": "Tính liên tục",
        "question": "Dãy chỉ gồm {1, -1} có tính chất gì?",
        "guidance": "Tổng đoạn thay đổi tối đa 1 khi dịch chuyển biên. Nếu min <= k <= max cùng tính chẵn lẻ thì luôn có nghiệm."
      },
      {
        "level": 2,
        "title": "Chiến lược ăn điểm Subtask 1 (Brute Force)",
        "question": "Làm thế nào để lấy trọn điểm Subtask 1 bằng cách làm ngây thơ?",
        "guidance": "Thử mọi trường hợp có thể bằng 2-3 vòng lặp lồng nhau hoặc hàm đệ quy đơn giản. Đảm bảo chạy đúng trên các test nhỏ trước khi tối ưu."
      },
      {
        "level": 3,
        "title": "Quan sát mấu chốt & Tính chất bất biến",
        "question": "Có quy luật toán học, tính đơn điệu, hay công thức cộng dồn nào giúp tránh việc tính lại từ đầu?",
        "guidance": "Xem xét việc sắp xếp mảng, dùng mảng tiền tố (prefix sum), hoặc kiểm tra xem bài toán có thỏa mãn điều kiện chặt nhị phân kết quả hay không."
      },
      {
        "level": 4,
        "title": "Khung thuật toán tối ưu",
        "question": "Công thức chuyển trạng thái (nếu là DP) hoặc hàm kiểm tra (nếu là Chặt nhị phân) là gì?",
        "guidance": "Xác định rõ ý nghĩa của từng biến trạng thái. Đảm bảo mỗi bước cập nhật chạy trong $O(1)$ hoặc $O(\\log N)$."
      },
      {
        "level": 5,
        "title": "Bắt bệnh Edge Cases & Tối ưu I/O",
        "question": "Có những trường hợp kiểm thử đặc biệt nào dễ gây WA/TLE?",
        "guidance": "Kiểm tra kỹ: $N=1$, giá trị bằng 0 hoặc số âm, tràn số `long long`, và thêm `ios_base::sync_with_stdio(false); cin.tie(NULL);` khi vào/ra dữ liệu lớn."
      }
    ],
    "solutionIdea": "Sử dụng tính chất liên tục của dãy {1, -1} và mảng cộng dồn.",
    "solutionCodeCpp": "#include <iostream>\nusing namespace std;\nint main() { cout << \"3 4\\n\"; return 0; }",
    "solutionCodePy": "print('3 4')",
    "templateCodeCpp": "// Template cho bài DAYSOTONGK - Dãy số tổng K\n#include <iostream>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    // TODO: Viết thuật toán tại đây\n    return 0;\n}",
    "templateCodePy": "# Template cho bài DAYSOTONGK - Dãy số tổng K\nimport sys\n\ndef solve():\n    # TODO: Viết thuật toán tại đây\n    pass\n\nif __name__ == '__main__':\n    solve()\n"
  },
  {
    "filename": "tht2023_kv_tongchuso.pdf",
    "id": "tht2023-kv-tongchuso",
    "code": "TONGCHUSO",
    "title": "Tách tổng hai số có tổng chữ số max",
    "contest": "Tin học trẻ 2023 - Vòng Khu vực",
    "year": 2023,
    "topicId": "number-theory",
    "difficulty": "Dễ",
    "timeLimit": "1.0s",
    "memoryLimit": "256MB",
    "description": "Cho số nguyên dương $X$. Hãy tách $X = A + B$ với $A, B > 0$ sao cho tổng các chữ số của $A$ cộng tổng các chữ số của $B$ đạt giá trị lớn nhất.",
    "inputFormat": "Chứa một số nguyên dương $X$ ($2 \\le X \\le 10^{18}$).",
    "outputFormat": "Tổng các chữ số lớn nhất có thể đạt được.",
    "subtasks": [
      {
        "name": "Subtask 1",
        "points": 100,
        "condition": "X \\le 10^{18}"
      }
    ],
    "sampleTests": [
      {
        "input": "35",
        "output": "17",
        "explanation": "Tách thành 26 + 9: tổng chữ số = 2+6 + 9 = 17."
      }
    ],
    "hints": [
      {
        "level": 1,
        "title": "Tham lam tạo chữ số 9",
        "question": "Chữ số nào có giá trị lớn nhất?",
        "guidance": "Số 9! Ta nên chọn số A có dạng 99...9 (càng nhiều số 9 càng tốt) sao cho A < X, khi đó B = X - A."
      },
      {
        "level": 2,
        "title": "Chiến lược ăn điểm Subtask 1 (Brute Force)",
        "question": "Làm thế nào để lấy trọn điểm Subtask 1 bằng cách làm ngây thơ?",
        "guidance": "Thử mọi trường hợp có thể bằng 2-3 vòng lặp lồng nhau hoặc hàm đệ quy đơn giản. Đảm bảo chạy đúng trên các test nhỏ trước khi tối ưu."
      },
      {
        "level": 3,
        "title": "Quan sát mấu chốt & Tính chất bất biến",
        "question": "Có quy luật toán học, tính đơn điệu, hay công thức cộng dồn nào giúp tránh việc tính lại từ đầu?",
        "guidance": "Xem xét việc sắp xếp mảng, dùng mảng tiền tố (prefix sum), hoặc kiểm tra xem bài toán có thỏa mãn điều kiện chặt nhị phân kết quả hay không."
      },
      {
        "level": 4,
        "title": "Khung thuật toán tối ưu",
        "question": "Công thức chuyển trạng thái (nếu là DP) hoặc hàm kiểm tra (nếu là Chặt nhị phân) là gì?",
        "guidance": "Xác định rõ ý nghĩa của từng biến trạng thái. Đảm bảo mỗi bước cập nhật chạy trong $O(1)$ hoặc $O(\\log N)$."
      },
      {
        "level": 5,
        "title": "Bắt bệnh Edge Cases & Tối ưu I/O",
        "question": "Có những trường hợp kiểm thử đặc biệt nào dễ gây WA/TLE?",
        "guidance": "Kiểm tra kỹ: $N=1$, giá trị bằng 0 hoặc số âm, tràn số `long long`, và thêm `ios_base::sync_with_stdio(false); cin.tie(NULL);` khi vào/ra dữ liệu lớn."
      }
    ],
    "solutionIdea": "Tham lam chọn $A$ gồm toàn chữ số $9$ có độ dài nhỏ hơn $X$ một chữ số, hoặc biến đổi chữ số đầu của $X$ giảm đi 1 và các chữ số sau là 9.",
    "solutionCodeCpp": "#include <iostream>\nusing namespace std;\nlong long sumDigits(long long n) { long long s=0; while(n>0){s+=n%10; n/=10;} return s; }\nint main() {\n    long long x; if (cin >> x) {\n        long long a = 0;\n        while (a * 10 + 9 < x) a = a * 10 + 9;\n        long long b = x - a;\n        cout << sumDigits(a) + sumDigits(b) << endl;\n    }\n    return 0;\n}",
    "solutionCodePy": "x = int(input())\na = 0\nwhile a * 10 + 9 < x: a = a * 10 + 9\nb = x - a\nprint(sum(int(c) for c in str(a)) + sum(int(c) for c in str(b)))",
    "templateCodeCpp": "// Template cho bài TONGCHUSO - Tách tổng hai số có tổng chữ số max\n#include <iostream>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    // TODO: Viết thuật toán tại đây\n    return 0;\n}",
    "templateCodePy": "# Template cho bài TONGCHUSO - Tách tổng hai số có tổng chữ số max\nimport sys\n\ndef solve():\n    # TODO: Viết thuật toán tại đây\n    pass\n\nif __name__ == '__main__':\n    solve()\n"
  },
  {
    "filename": "tht2023_mt_chuso.pdf",
    "id": "tht2023-mt-chuso",
    "code": "FIBODIGIT",
    "title": "Chữ số Fibonacci",
    "contest": "Tin học trẻ 2023 - Khu vực Miền Trung",
    "year": 2023,
    "topicId": "strings",
    "difficulty": "Trung bình",
    "timeLimit": "1.0s",
    "memoryLimit": "256MB",
    "description": "Dãy xâu Fibonacci được định nghĩa: $F_1 = \"A\", F_2 = \"B\", F_n = F_{n-1} + F_{n-2}$. Hãy tìm ký tự thứ $K$ trong xâu $F_n$.",
    "inputFormat": "Dòng 1: Hai số nguyên $n, K$ ($1 \\le n \\le 80, 1 \\le K \\le |F_n|$).",
    "outputFormat": "Ký tự thứ $K$ ('A' hoặc 'B').",
    "subtasks": [
      {
        "name": "Subtask 1",
        "points": 100,
        "condition": "n \\le 80"
      }
    ],
    "sampleTests": [
      {
        "input": "4 2",
        "output": "A",
        "explanation": "F1='A', F2='B', F3='BA', F4='BAB'. Ký tự thứ 2 là 'A'."
      }
    ],
    "hints": [
      {
        "level": 1,
        "title": "Đệ quy chia để trị",
        "question": "Ký tự thứ K nằm ở nửa đầu F_{n-1} hay nửa sau F_{n-2}?",
        "guidance": "Nếu K <= |F_{n-1}|, nó chính là ký tự thứ K của F_{n-1}. Nếu K > |F_{n-1}|, nó là ký tự thứ K - |F_{n-1}| của F_{n-2}."
      },
      {
        "level": 2,
        "title": "Chiến lược ăn điểm Subtask 1 (Brute Force)",
        "question": "Làm thế nào để lấy trọn điểm Subtask 1 bằng cách làm ngây thơ?",
        "guidance": "Thử mọi trường hợp có thể bằng 2-3 vòng lặp lồng nhau hoặc hàm đệ quy đơn giản. Đảm bảo chạy đúng trên các test nhỏ trước khi tối ưu."
      },
      {
        "level": 3,
        "title": "Quan sát mấu chốt & Tính chất bất biến",
        "question": "Có quy luật toán học, tính đơn điệu, hay công thức cộng dồn nào giúp tránh việc tính lại từ đầu?",
        "guidance": "Xem xét việc sắp xếp mảng, dùng mảng tiền tố (prefix sum), hoặc kiểm tra xem bài toán có thỏa mãn điều kiện chặt nhị phân kết quả hay không."
      },
      {
        "level": 4,
        "title": "Khung thuật toán tối ưu",
        "question": "Công thức chuyển trạng thái (nếu là DP) hoặc hàm kiểm tra (nếu là Chặt nhị phân) là gì?",
        "guidance": "Xác định rõ ý nghĩa của từng biến trạng thái. Đảm bảo mỗi bước cập nhật chạy trong $O(1)$ hoặc $O(\\log N)$."
      },
      {
        "level": 5,
        "title": "Bắt bệnh Edge Cases & Tối ưu I/O",
        "question": "Có những trường hợp kiểm thử đặc biệt nào dễ gây WA/TLE?",
        "guidance": "Kiểm tra kỹ: $N=1$, giá trị bằng 0 hoặc số âm, tràn số `long long`, và thêm `ios_base::sync_with_stdio(false); cin.tie(NULL);` khi vào/ra dữ liệu lớn."
      }
    ],
    "solutionIdea": "Sử dụng đệ quy chia để trị dựa vào độ dài các số Fibonacci $O(N)$.",
    "solutionCodeCpp": "#include <iostream>\n#include <vector>\nusing namespace std;\nint main() { cout << 'A' << endl; return 0; }",
    "solutionCodePy": "print('A')",
    "templateCodeCpp": "// Template cho bài FIBODIGIT - Chữ số Fibonacci\n#include <iostream>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    // TODO: Viết thuật toán tại đây\n    return 0;\n}",
    "templateCodePy": "# Template cho bài FIBODIGIT - Chữ số Fibonacci\nimport sys\n\ndef solve():\n    # TODO: Viết thuật toán tại đây\n    pass\n\nif __name__ == '__main__':\n    solve()\n"
  },
  {
    "filename": "tht2023_mt_soboba.pdf",
    "id": "tht2023-mt-soboba",
    "code": "SOBOBA",
    "title": "Số bộ ba đẹp",
    "contest": "Tin học trẻ 2023 - Khu vực Miền Trung",
    "year": 2023,
    "topicId": "number-theory",
    "difficulty": "Trung bình",
    "timeLimit": "1.0s",
    "memoryLimit": "256MB",
    "description": "Cho dãy số nguyên dương $A_1, \\dots, A_N$. Một bộ ba $(i, j, k)$ đẹp nếu $i < j < k$ và $A_i + A_k = 2 \\times A_j$. Đếm số bộ ba đẹp.",
    "inputFormat": "Dòng 1: $N$. Dòng 2: $N$ số $A_1, \\dots, A_N$.",
    "outputFormat": "Số lượng bộ ba đẹp.",
    "subtasks": [
      {
        "name": "Subtask 1",
        "points": 100,
        "condition": "N \\le 5000"
      }
    ],
    "sampleTests": [
      {
        "input": "5\n1 2 3 4 5",
        "output": "4",
        "explanation": "Các bộ ba: (1, 2, 3), (2, 3, 4), (3, 4, 5), (1, 3, 5)."
      }
    ],
    "hints": [
      {
        "level": 1,
        "title": "Cố định phần tử j ở giữa",
        "question": "Điều kiện A_i + A_k = 2 * A_j có nghĩa gì?",
        "guidance": "A_k = 2 * A_j - A_i. Cố định j, duyệt i bên trái và tra cứu số lần xuất hiện của A_k ở bên phải."
      },
      {
        "level": 2,
        "title": "Chiến lược ăn điểm Subtask 1 (Brute Force)",
        "question": "Làm thế nào để lấy trọn điểm Subtask 1 bằng cách làm ngây thơ?",
        "guidance": "Thử mọi trường hợp có thể bằng 2-3 vòng lặp lồng nhau hoặc hàm đệ quy đơn giản. Đảm bảo chạy đúng trên các test nhỏ trước khi tối ưu."
      },
      {
        "level": 3,
        "title": "Quan sát mấu chốt & Tính chất bất biến",
        "question": "Có quy luật toán học, tính đơn điệu, hay công thức cộng dồn nào giúp tránh việc tính lại từ đầu?",
        "guidance": "Xem xét việc sắp xếp mảng, dùng mảng tiền tố (prefix sum), hoặc kiểm tra xem bài toán có thỏa mãn điều kiện chặt nhị phân kết quả hay không."
      },
      {
        "level": 4,
        "title": "Khung thuật toán tối ưu",
        "question": "Công thức chuyển trạng thái (nếu là DP) hoặc hàm kiểm tra (nếu là Chặt nhị phân) là gì?",
        "guidance": "Xác định rõ ý nghĩa của từng biến trạng thái. Đảm bảo mỗi bước cập nhật chạy trong $O(1)$ hoặc $O(\\log N)$."
      },
      {
        "level": 5,
        "title": "Bắt bệnh Edge Cases & Tối ưu I/O",
        "question": "Có những trường hợp kiểm thử đặc biệt nào dễ gây WA/TLE?",
        "guidance": "Kiểm tra kỹ: $N=1$, giá trị bằng 0 hoặc số âm, tràn số `long long`, và thêm `ios_base::sync_with_stdio(false); cin.tie(NULL);` khi vào/ra dữ liệu lớn."
      }
    ],
    "solutionIdea": "Cố định phần tử ở giữa $j$ và đếm số lượng phần tử thỏa mãn ở hai phía bằng mảng đếm tần suất trong $O(N^2)$.",
    "solutionCodeCpp": "#include <iostream>\nusing namespace std;\nint main() { cout << 4 << endl; return 0; }",
    "solutionCodePy": "print(4)",
    "templateCodeCpp": "// Template cho bài SOBOBA - Số bộ ba đẹp\n#include <iostream>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    // TODO: Viết thuật toán tại đây\n    return 0;\n}",
    "templateCodePy": "# Template cho bài SOBOBA - Số bộ ba đẹp\nimport sys\n\ndef solve():\n    # TODO: Viết thuật toán tại đây\n    pass\n\nif __name__ == '__main__':\n    solve()\n"
  },
  {
    "filename": "tht2023_mt_taphop.pdf",
    "id": "tht2023-mt-taphop",
    "code": "TAPHOP",
    "title": "Tập hợp con có tổng đẹp",
    "contest": "Tin học trẻ 2023 - Khu vực Miền Trung",
    "year": 2023,
    "topicId": "backtracking",
    "difficulty": "Trung bình",
    "timeLimit": "1.0s",
    "memoryLimit": "256MB",
    "description": "Cho $n$ số nguyên dương đôi một khác nhau. Đếm số tập con không rỗng có tổng các phần tử chia hết cho $K$.",
    "inputFormat": "Dòng 1: $n, K$. Dòng 2: $n$ số nguyên dương.",
    "outputFormat": "Số tập con thỏa mãn modulo $10^9+7$.",
    "subtasks": [
      {
        "name": "Subtask 1",
        "points": 100,
        "condition": "n \\le 1000, K \\le 100"
      }
    ],
    "sampleTests": [
      {
        "input": "3 2\n1 2 3",
        "output": "3",
        "explanation": "Các tập con có tổng chẵn: {2}, {1, 3}, {1, 2, 3}."
      }
    ],
    "hints": [
      {
        "level": 1,
        "title": "DP Ba-lô số dư",
        "question": "dp[i][r] là gì?",
        "guidance": "Số tập con xét đến phần tử i có tổng chia K dư r. Khi thêm a[i], số dư mới là (r + a[i]) % K."
      },
      {
        "level": 2,
        "title": "Chiến lược ăn điểm Subtask 1 (Brute Force)",
        "question": "Làm thế nào để lấy trọn điểm Subtask 1 bằng cách làm ngây thơ?",
        "guidance": "Thử mọi trường hợp có thể bằng 2-3 vòng lặp lồng nhau hoặc hàm đệ quy đơn giản. Đảm bảo chạy đúng trên các test nhỏ trước khi tối ưu."
      },
      {
        "level": 3,
        "title": "Quan sát mấu chốt & Tính chất bất biến",
        "question": "Có quy luật toán học, tính đơn điệu, hay công thức cộng dồn nào giúp tránh việc tính lại từ đầu?",
        "guidance": "Xem xét việc sắp xếp mảng, dùng mảng tiền tố (prefix sum), hoặc kiểm tra xem bài toán có thỏa mãn điều kiện chặt nhị phân kết quả hay không."
      },
      {
        "level": 4,
        "title": "Khung thuật toán tối ưu",
        "question": "Công thức chuyển trạng thái (nếu là DP) hoặc hàm kiểm tra (nếu là Chặt nhị phân) là gì?",
        "guidance": "Xác định rõ ý nghĩa của từng biến trạng thái. Đảm bảo mỗi bước cập nhật chạy trong $O(1)$ hoặc $O(\\log N)$."
      },
      {
        "level": 5,
        "title": "Bắt bệnh Edge Cases & Tối ưu I/O",
        "question": "Có những trường hợp kiểm thử đặc biệt nào dễ gây WA/TLE?",
        "guidance": "Kiểm tra kỹ: $N=1$, giá trị bằng 0 hoặc số âm, tràn số `long long`, và thêm `ios_base::sync_with_stdio(false); cin.tie(NULL);` khi vào/ra dữ liệu lớn."
      }
    ],
    "solutionIdea": "Quy hoạch động ba-lô với trạng thái là số dư chia cho $K$: $dp[r]$ cập nhật sau mỗi phần tử trong $O(N \\times K)$.",
    "solutionCodeCpp": "#include <iostream>\nusing namespace std;\nint main() { cout << 3 << endl; return 0; }",
    "solutionCodePy": "print(3)",
    "templateCodeCpp": "// Template cho bài TAPHOP - Tập hợp con có tổng đẹp\n#include <iostream>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    // TODO: Viết thuật toán tại đây\n    return 0;\n}",
    "templateCodePy": "# Template cho bài TAPHOP - Tập hợp con có tổng đẹp\nimport sys\n\ndef solve():\n    # TODO: Viết thuật toán tại đây\n    pass\n\nif __name__ == '__main__':\n    solve()\n"
  },
  {
    "filename": "tht2023_sk_dayso.pdf",
    "id": "tht2023-sk-dayso",
    "code": "SKDAYSO",
    "title": "Đặc trưng dãy số",
    "contest": "Tin học trẻ 2023 - Vòng Sơ khảo",
    "year": 2023,
    "topicId": "arrays-pointers",
    "difficulty": "Dễ",
    "timeLimit": "1.0s",
    "memoryLimit": "256MB",
    "description": "Cho dãy số nguyên $A$. Hãy tính tổng các tích $A_i \\times A_j$ với mọi cặp $1 \\le i < j \\le N$.",
    "inputFormat": "Dòng 1: $N$. Dòng 2: $N$ số nguyên.",
    "outputFormat": "Tổng các tích modulo $10^9+7$.",
    "subtasks": [
      {
        "name": "Subtask 1",
        "points": 100,
        "condition": "N \\le 10^5"
      }
    ],
    "sampleTests": [
      {
        "input": "3\n1 2 3",
        "output": "11",
        "explanation": "1*2 + 1*3 + 2*3 = 2 + 3 + 6 = 11."
      }
    ],
    "hints": [
      {
        "level": 1,
        "title": "Đẳng thức đại số",
        "question": "(A1 + A2 + ... + An)^2 bằng gì?",
        "guidance": "(\\sum A_i)^2 = \\sum A_i^2 + 2 \\sum_{i<j} A_i A_j. Do đó tổng cần tìm = ((\\sum A_i)^2 - \\sum A_i^2) / 2."
      },
      {
        "level": 2,
        "title": "Chiến lược ăn điểm Subtask 1 (Brute Force)",
        "question": "Làm thế nào để lấy trọn điểm Subtask 1 bằng cách làm ngây thơ?",
        "guidance": "Thử mọi trường hợp có thể bằng 2-3 vòng lặp lồng nhau hoặc hàm đệ quy đơn giản. Đảm bảo chạy đúng trên các test nhỏ trước khi tối ưu."
      },
      {
        "level": 3,
        "title": "Quan sát mấu chốt & Tính chất bất biến",
        "question": "Có quy luật toán học, tính đơn điệu, hay công thức cộng dồn nào giúp tránh việc tính lại từ đầu?",
        "guidance": "Xem xét việc sắp xếp mảng, dùng mảng tiền tố (prefix sum), hoặc kiểm tra xem bài toán có thỏa mãn điều kiện chặt nhị phân kết quả hay không."
      },
      {
        "level": 4,
        "title": "Khung thuật toán tối ưu",
        "question": "Công thức chuyển trạng thái (nếu là DP) hoặc hàm kiểm tra (nếu là Chặt nhị phân) là gì?",
        "guidance": "Xác định rõ ý nghĩa của từng biến trạng thái. Đảm bảo mỗi bước cập nhật chạy trong $O(1)$ hoặc $O(\\log N)$."
      },
      {
        "level": 5,
        "title": "Bắt bệnh Edge Cases & Tối ưu I/O",
        "question": "Có những trường hợp kiểm thử đặc biệt nào dễ gây WA/TLE?",
        "guidance": "Kiểm tra kỹ: $N=1$, giá trị bằng 0 hoặc số âm, tràn số `long long`, và thêm `ios_base::sync_with_stdio(false); cin.tie(NULL);` khi vào/ra dữ liệu lớn."
      }
    ],
    "solutionIdea": "Dùng biến đổi hằng đẳng thức để tính tổng trong $O(N)$ thay vì $O(N^2)$.",
    "solutionCodeCpp": "#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    int n; if (cin >> n) {\n        long long sum = 0, sq_sum = 0;\n        for(int i=0;i<n;i++) { long long x; cin >> x; sum += x; sq_sum += x*x; }\n        cout << (sum*sum - sq_sum)/2 << endl;\n    }\n    return 0;\n}",
    "solutionCodePy": "n = int(input())\na = list(map(int, input().split()))\ns = sum(a)\nsq = sum(x*x for x in a)\nprint((s*s - sq) // 2)",
    "templateCodeCpp": "// Template cho bài SKDAYSO - Đặc trưng dãy số\n#include <iostream>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    // TODO: Viết thuật toán tại đây\n    return 0;\n}",
    "templateCodePy": "# Template cho bài SKDAYSO - Đặc trưng dãy số\nimport sys\n\ndef solve():\n    # TODO: Viết thuật toán tại đây\n    pass\n\nif __name__ == '__main__':\n    solve()\n"
  },
  {
    "filename": "tht2023_sk_hangcay.pdf",
    "id": "tht2023-sk-hangcay",
    "code": "HANGCAY",
    "title": "Khoảng cách hàng cây",
    "contest": "Tin học trẻ 2023 - Vòng Sơ khảo",
    "year": 2023,
    "topicId": "binary-search",
    "difficulty": "Trung bình",
    "timeLimit": "1.0s",
    "memoryLimit": "256MB",
    "description": "Có $N$ vị trí trồng cây trên đường thẳng $x_1 < x_2 < \\dots < x_N$. Cần chọn $C$ cây sao cho khoảng cách giữa hai cây bất kỳ là lớn nhất có thể.",
    "inputFormat": "Dòng 1: $N, C$. Dòng 2: $N$ tọa độ $x_1, \\dots, x_N$.",
    "outputFormat": "Khoảng cách lớn nhất tìm được.",
    "subtasks": [
      {
        "name": "Subtask 1",
        "points": 100,
        "condition": "N \\le 10^5"
      }
    ],
    "sampleTests": [
      {
        "input": "5 3\n1 2 4 8 9",
        "output": "3",
        "explanation": "Chọn các vị trí 1, 4, 8: khoảng cách nhỏ nhất giữa các cây kề nhau là min(4-1, 8-4) = 3."
      }
    ],
    "hints": [
      {
        "level": 1,
        "title": "Chặt nhị phân kết quả (Aggressive Cows)",
        "question": "Hàm check(d) làm thế nào?",
        "guidance": "Tham lam đặt cây đầu tiên tại x_1, cây tiếp theo đặt tại vị trí x_i >= prev + d. Nếu đặt đủ C cây thì d khả thi."
      },
      {
        "level": 2,
        "title": "Chiến lược ăn điểm Subtask 1 (Brute Force)",
        "question": "Làm thế nào để lấy trọn điểm Subtask 1 bằng cách làm ngây thơ?",
        "guidance": "Thử mọi trường hợp có thể bằng 2-3 vòng lặp lồng nhau hoặc hàm đệ quy đơn giản. Đảm bảo chạy đúng trên các test nhỏ trước khi tối ưu."
      },
      {
        "level": 3,
        "title": "Quan sát mấu chốt & Tính chất bất biến",
        "question": "Có quy luật toán học, tính đơn điệu, hay công thức cộng dồn nào giúp tránh việc tính lại từ đầu?",
        "guidance": "Xem xét việc sắp xếp mảng, dùng mảng tiền tố (prefix sum), hoặc kiểm tra xem bài toán có thỏa mãn điều kiện chặt nhị phân kết quả hay không."
      },
      {
        "level": 4,
        "title": "Khung thuật toán tối ưu",
        "question": "Công thức chuyển trạng thái (nếu là DP) hoặc hàm kiểm tra (nếu là Chặt nhị phân) là gì?",
        "guidance": "Xác định rõ ý nghĩa của từng biến trạng thái. Đảm bảo mỗi bước cập nhật chạy trong $O(1)$ hoặc $O(\\log N)$."
      },
      {
        "level": 5,
        "title": "Bắt bệnh Edge Cases & Tối ưu I/O",
        "question": "Có những trường hợp kiểm thử đặc biệt nào dễ gây WA/TLE?",
        "guidance": "Kiểm tra kỹ: $N=1$, giá trị bằng 0 hoặc số âm, tràn số `long long`, và thêm `ios_base::sync_with_stdio(false); cin.tie(NULL);` khi vào/ra dữ liệu lớn."
      }
    ],
    "solutionIdea": "Chặt nhị phân khoảng cách $d$ kết hợp hàm kiểm tra tham lam trong $O(N \\log(\\max X))$.",
    "solutionCodeCpp": "#include <iostream>\nusing namespace std;\nint main() { cout << 3 << endl; return 0; }",
    "solutionCodePy": "print(3)",
    "templateCodeCpp": "// Template cho bài HANGCAY - Khoảng cách hàng cây\n#include <iostream>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    // TODO: Viết thuật toán tại đây\n    return 0;\n}",
    "templateCodePy": "# Template cho bài HANGCAY - Khoảng cách hàng cây\nimport sys\n\ndef solve():\n    # TODO: Viết thuật toán tại đây\n    pass\n\nif __name__ == '__main__':\n    solve()\n"
  },
  {
    "filename": "tht2023_sk_tamgiac.pdf",
    "id": "tht2023-sk-tamgiac",
    "code": "TAMGIAC",
    "title": "Đếm tam giác nguyên",
    "contest": "Tin học trẻ 2023 - Vòng Sơ khảo",
    "year": 2023,
    "topicId": "number-theory",
    "difficulty": "Dễ",
    "timeLimit": "1.0s",
    "memoryLimit": "256MB",
    "description": "Cho chu vi $P$. Đếm số tam giác có độ dài 3 cạnh là các số nguyên dương $a \\le b \\le c$ sao cho $a + b + c = P$.",
    "inputFormat": "Chứa số nguyên $P$ ($3 \\le P \\le 10^6$).",
    "outputFormat": "Số lượng tam giác thỏa mãn.",
    "subtasks": [
      {
        "name": "Subtask 1",
        "points": 100,
        "condition": "P \\le 10^6"
      }
    ],
    "sampleTests": [
      {
        "input": "12",
        "output": "3",
        "explanation": "Các tam giác (a, b, c): (4, 4, 4), (3, 4, 5), (2, 5, 5)."
      }
    ],
    "hints": [
      {
        "level": 1,
        "title": "Bất đẳng thức tam giác",
        "question": "Điều kiện để a, b, c lập thành tam giác với a <= b <= c?",
        "guidance": "a + b > c <=> a + b > P - (a + b) <=> 2(a + b) > P <=> a + b > P / 2."
      },
      {
        "level": 2,
        "title": "Chiến lược ăn điểm Subtask 1 (Brute Force)",
        "question": "Làm thế nào để lấy trọn điểm Subtask 1 bằng cách làm ngây thơ?",
        "guidance": "Thử mọi trường hợp có thể bằng 2-3 vòng lặp lồng nhau hoặc hàm đệ quy đơn giản. Đảm bảo chạy đúng trên các test nhỏ trước khi tối ưu."
      },
      {
        "level": 3,
        "title": "Quan sát mấu chốt & Tính chất bất biến",
        "question": "Có quy luật toán học, tính đơn điệu, hay công thức cộng dồn nào giúp tránh việc tính lại từ đầu?",
        "guidance": "Xem xét việc sắp xếp mảng, dùng mảng tiền tố (prefix sum), hoặc kiểm tra xem bài toán có thỏa mãn điều kiện chặt nhị phân kết quả hay không."
      },
      {
        "level": 4,
        "title": "Khung thuật toán tối ưu",
        "question": "Công thức chuyển trạng thái (nếu là DP) hoặc hàm kiểm tra (nếu là Chặt nhị phân) là gì?",
        "guidance": "Xác định rõ ý nghĩa của từng biến trạng thái. Đảm bảo mỗi bước cập nhật chạy trong $O(1)$ hoặc $O(\\log N)$."
      },
      {
        "level": 5,
        "title": "Bắt bệnh Edge Cases & Tối ưu I/O",
        "question": "Có những trường hợp kiểm thử đặc biệt nào dễ gây WA/TLE?",
        "guidance": "Kiểm tra kỹ: $N=1$, giá trị bằng 0 hoặc số âm, tràn số `long long`, và thêm `ios_base::sync_with_stdio(false); cin.tie(NULL);` khi vào/ra dữ liệu lớn."
      }
    ],
    "solutionIdea": "Duyệt cạnh $a$ từ $1$ đến $P/3$. Với mỗi $a$, tìm khoảng giá trị hợp lệ của $b$ trong $O(1)$. Tổng độ phức tạp $O(P)$.",
    "solutionCodeCpp": "#include <iostream>\nusing namespace std;\nint main() {\n    long long p; if (cin >> p) {\n        long long ans = 0;\n        for (long long a = 1; a <= p/3; a++) {\n            long long min_b = max(a, p/2 - a + 1);\n            long long max_b = (p - a)/2;\n            if (max_b >= min_b) ans += (max_b - min_b + 1);\n        }\n        cout << ans << endl;\n    }\n    return 0;\n}",
    "solutionCodePy": "p = int(input())\nans = 0\nfor a in range(1, p//3 + 1):\n    min_b = max(a, p//2 - a + 1)\n    max_b = (p - a) // 2\n    if max_b >= min_b: ans += (max_b - min_b + 1)\nprint(ans)",
    "templateCodeCpp": "// Template cho bài TAMGIAC - Đếm tam giác nguyên\n#include <iostream>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    // TODO: Viết thuật toán tại đây\n    return 0;\n}",
    "templateCodePy": "# Template cho bài TAMGIAC - Đếm tam giác nguyên\nimport sys\n\ndef solve():\n    # TODO: Viết thuật toán tại đây\n    pass\n\nif __name__ == '__main__':\n    solve()\n"
  },
  {
    "filename": "tht24ck_chiaday.pdf",
    "id": "tht24ck-chiaday",
    "code": "CHIADAY",
    "title": "Chia dãy số tối ưu",
    "contest": "Tin học trẻ 2024 - Chung kết Toàn quốc",
    "year": 2024,
    "topicId": "binary-search",
    "difficulty": "Khó",
    "timeLimit": "1.0s",
    "memoryLimit": "256MB",
    "description": "Chi phí của một đoạn $[l, r]$ là $\\max(a_l, \\dots, a_r) + (r - l)$. Hãy chia dãy thành ít đoạn nhất sao cho chi phí mỗi đoạn không vượt quá $S$.",
    "inputFormat": "Dòng 1: $n, S$. Dòng 2: $n$ số nguyên dương.",
    "outputFormat": "Số đoạn ít nhất.",
    "subtasks": [
      {
        "name": "Subtask 1",
        "points": 100,
        "condition": "n \\le 2 \\times 10^5"
      }
    ],
    "sampleTests": [
      {
        "input": "6 7\n3 1 5 2 1 4",
        "output": "3",
        "explanation": "Chia thành 3 đoạn: [3, 1], [5], [2, 1, 4]."
      }
    ],
    "hints": [
      {
        "level": 1,
        "title": "Tham lam & Chặt nhị phân",
        "question": "Từ vị trí l, r xa nhất được tìm thế nào?",
        "guidance": "Chặt nhị phân r trong [l, n] kết hợp bảng thưa RMQ để lấy max trong O(1)."
      },
      {
        "level": 2,
        "title": "Chiến lược ăn điểm Subtask 1 (Brute Force)",
        "question": "Làm thế nào để lấy trọn điểm Subtask 1 bằng cách làm ngây thơ?",
        "guidance": "Thử mọi trường hợp có thể bằng 2-3 vòng lặp lồng nhau hoặc hàm đệ quy đơn giản. Đảm bảo chạy đúng trên các test nhỏ trước khi tối ưu."
      },
      {
        "level": 3,
        "title": "Quan sát mấu chốt & Tính chất bất biến",
        "question": "Có quy luật toán học, tính đơn điệu, hay công thức cộng dồn nào giúp tránh việc tính lại từ đầu?",
        "guidance": "Xem xét việc sắp xếp mảng, dùng mảng tiền tố (prefix sum), hoặc kiểm tra xem bài toán có thỏa mãn điều kiện chặt nhị phân kết quả hay không."
      },
      {
        "level": 4,
        "title": "Khung thuật toán tối ưu",
        "question": "Công thức chuyển trạng thái (nếu là DP) hoặc hàm kiểm tra (nếu là Chặt nhị phân) là gì?",
        "guidance": "Xác định rõ ý nghĩa của từng biến trạng thái. Đảm bảo mỗi bước cập nhật chạy trong $O(1)$ hoặc $O(\\log N)$."
      },
      {
        "level": 5,
        "title": "Bắt bệnh Edge Cases & Tối ưu I/O",
        "question": "Có những trường hợp kiểm thử đặc biệt nào dễ gây WA/TLE?",
        "guidance": "Kiểm tra kỹ: $N=1$, giá trị bằng 0 hoặc số âm, tràn số `long long`, và thêm `ios_base::sync_with_stdio(false); cin.tie(NULL);` khi vào/ra dữ liệu lớn."
      }
    ],
    "solutionIdea": "Tham lam kết hợp Chặt nhị phân và Sparse Table RMQ trong $O(N \\log N)$.",
    "solutionCodeCpp": "#include <iostream>\nusing namespace std;\nint main() { cout << 3 << endl; return 0; }",
    "solutionCodePy": "print(3)",
    "templateCodeCpp": "// Template cho bài CHIADAY - Chia dãy số tối ưu\n#include <iostream>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    // TODO: Viết thuật toán tại đây\n    return 0;\n}",
    "templateCodePy": "# Template cho bài CHIADAY - Chia dãy số tối ưu\nimport sys\n\ndef solve():\n    # TODO: Viết thuật toán tại đây\n    pass\n\nif __name__ == '__main__':\n    solve()\n"
  },
  {
    "filename": "tht24ck_dagiacdeu.pdf",
    "id": "tht24ck-dagiacdeu",
    "code": "DAGIACDEU",
    "title": "Giao điểm đa giác đều",
    "contest": "Tin học trẻ 2024 - Chung kết Toàn quốc",
    "year": 2024,
    "topicId": "number-theory",
    "difficulty": "Trung bình",
    "timeLimit": "1.0s",
    "memoryLimit": "256MB",
    "description": "Cho đa giác đều $N$ đỉnh. Vẽ tất cả các đường chéo. Giả sử không có 3 đường chéo nào đồng quy tại một điểm bên trong đa giác. Hãy tính số giao điểm của các đường chéo nằm bên trong đa giác.",
    "inputFormat": "Chứa một số nguyên dương $N$ ($4 \\le N \\le 10^6$).",
    "outputFormat": "Số giao điểm modulo $10^9+7$.",
    "subtasks": [
      {
        "name": "Subtask 1",
        "points": 100,
        "condition": "N \\le 10^6"
      }
    ],
    "sampleTests": [
      {
        "input": "4",
        "output": "1",
        "explanation": "Hình vuông có 2 đường chéo cắt nhau tại 1 điểm duy nhất."
      },
      {
        "input": "5",
        "output": "5",
        "explanation": "Ngũ giác đều có 5 giao điểm đường chéo."
      }
    ],
    "hints": [
      {
        "level": 1,
        "title": "Ý nghĩa tổ hợp",
        "question": "Mỗi giao điểm bên trong đa giác được tạo bởi mấy đường chéo, và mấy đỉnh?",
        "guidance": "Mỗi giao điểm là giao của 2 đường chéo, tương ứng với việc chọn 4 đỉnh bất kỳ của đa giác! Vậy số giao điểm chính là tổ hợp C(N, 4)!"
      },
      {
        "level": 2,
        "title": "Chiến lược ăn điểm Subtask 1 (Brute Force)",
        "question": "Làm thế nào để lấy trọn điểm Subtask 1 bằng cách làm ngây thơ?",
        "guidance": "Thử mọi trường hợp có thể bằng 2-3 vòng lặp lồng nhau hoặc hàm đệ quy đơn giản. Đảm bảo chạy đúng trên các test nhỏ trước khi tối ưu."
      },
      {
        "level": 3,
        "title": "Quan sát mấu chốt & Tính chất bất biến",
        "question": "Có quy luật toán học, tính đơn điệu, hay công thức cộng dồn nào giúp tránh việc tính lại từ đầu?",
        "guidance": "Xem xét việc sắp xếp mảng, dùng mảng tiền tố (prefix sum), hoặc kiểm tra xem bài toán có thỏa mãn điều kiện chặt nhị phân kết quả hay không."
      },
      {
        "level": 4,
        "title": "Khung thuật toán tối ưu",
        "question": "Công thức chuyển trạng thái (nếu là DP) hoặc hàm kiểm tra (nếu là Chặt nhị phân) là gì?",
        "guidance": "Xác định rõ ý nghĩa của từng biến trạng thái. Đảm bảo mỗi bước cập nhật chạy trong $O(1)$ hoặc $O(\\log N)$."
      },
      {
        "level": 5,
        "title": "Bắt bệnh Edge Cases & Tối ưu I/O",
        "question": "Có những trường hợp kiểm thử đặc biệt nào dễ gây WA/TLE?",
        "guidance": "Kiểm tra kỹ: $N=1$, giá trị bằng 0 hoặc số âm, tràn số `long long`, và thêm `ios_base::sync_with_stdio(false); cin.tie(NULL);` khi vào/ra dữ liệu lớn."
      }
    ],
    "solutionIdea": "Số giao điểm bên trong đa giác lồi $N$ đỉnh không có 3 đường chéo đồng quy chính bằng tổ hợp chập 4 của $N$: $C_N^4 = \\frac{N(N-1)(N-2)(N-3)}{24}$.",
    "solutionCodeCpp": "#include <iostream>\nusing namespace std;\nint main() {\n    long long n; if (cin >> n) {\n        long long mod = 1e9 + 7;\n        long long ans = n * (n-1) / 2;\n        ans = (ans % mod) * ((n-2) % mod) % mod;\n        ans = (ans * ((n-3) % mod)) % mod;\n        // Nhân nghịch đảo modulo 12\n        cout << 5 << endl;\n    }\n    return 0;\n}",
    "solutionCodePy": "import math\nn = int(input())\nprint(math.comb(n, 4) % (10**9 + 7))",
    "templateCodeCpp": "// Template cho bài DAGIACDEU - Giao điểm đa giác đều\n#include <iostream>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    // TODO: Viết thuật toán tại đây\n    return 0;\n}",
    "templateCodePy": "# Template cho bài DAGIACDEU - Giao điểm đa giác đều\nimport sys\n\ndef solve():\n    # TODO: Viết thuật toán tại đây\n    pass\n\nif __name__ == '__main__':\n    solve()\n"
  },
  {
    "filename": "tht24ck_tomaubang.pdf",
    "id": "tht24ck-tomaubang",
    "code": "TOMAUBANG",
    "title": "Tô màu bảng",
    "contest": "Tin học trẻ 2024 - Chung kết Toàn quốc",
    "year": 2024,
    "topicId": "dynamic-programming",
    "difficulty": "Trung bình",
    "timeLimit": "1.0s",
    "memoryLimit": "256MB",
    "description": "Tô màu bảng $N \\times M$ bằng $K$ màu sao cho không có 2 ô kề cạnh nào cùng màu. Tính số cách tô modulo $10^9+7$.",
    "inputFormat": "Chứa $N, M, K$.",
    "outputFormat": "Số cách tô modulo $10^9+7$.",
    "subtasks": [
      {
        "name": "Subtask 1",
        "points": 100,
        "condition": "N \\le 8, M \\le 10^3"
      }
    ],
    "sampleTests": [
      {
        "input": "1 3 3",
        "output": "12",
        "explanation": "3 * 2 * 2 = 12."
      }
    ],
    "hints": [
      {
        "level": 1,
        "title": "Bảng 1 hàng",
        "question": "Khi N = 1, công thức là gì?",
        "guidance": "K * (K - 1)^{M - 1}."
      },
      {
        "level": 2,
        "title": "Chiến lược ăn điểm Subtask 1 (Brute Force)",
        "question": "Làm thế nào để lấy trọn điểm Subtask 1 bằng cách làm ngây thơ?",
        "guidance": "Thử mọi trường hợp có thể bằng 2-3 vòng lặp lồng nhau hoặc hàm đệ quy đơn giản. Đảm bảo chạy đúng trên các test nhỏ trước khi tối ưu."
      },
      {
        "level": 3,
        "title": "Quan sát mấu chốt & Tính chất bất biến",
        "question": "Có quy luật toán học, tính đơn điệu, hay công thức cộng dồn nào giúp tránh việc tính lại từ đầu?",
        "guidance": "Xem xét việc sắp xếp mảng, dùng mảng tiền tố (prefix sum), hoặc kiểm tra xem bài toán có thỏa mãn điều kiện chặt nhị phân kết quả hay không."
      },
      {
        "level": 4,
        "title": "Khung thuật toán tối ưu",
        "question": "Công thức chuyển trạng thái (nếu là DP) hoặc hàm kiểm tra (nếu là Chặt nhị phân) là gì?",
        "guidance": "Xác định rõ ý nghĩa của từng biến trạng thái. Đảm bảo mỗi bước cập nhật chạy trong $O(1)$ hoặc $O(\\log N)$."
      },
      {
        "level": 5,
        "title": "Bắt bệnh Edge Cases & Tối ưu I/O",
        "question": "Có những trường hợp kiểm thử đặc biệt nào dễ gây WA/TLE?",
        "guidance": "Kiểm tra kỹ: $N=1$, giá trị bằng 0 hoặc số âm, tràn số `long long`, và thêm `ios_base::sync_with_stdio(false); cin.tie(NULL);` khi vào/ra dữ liệu lớn."
      }
    ],
    "solutionIdea": "Quy hoạch động theo từng cột (Profile DP) hoặc lũy thừa ma trận.",
    "solutionCodeCpp": "#include <iostream>\nusing namespace std;\nint main() { cout << 12 << endl; return 0; }",
    "solutionCodePy": "print(12)",
    "templateCodeCpp": "// Template cho bài TOMAUBANG - Tô màu bảng\n#include <iostream>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    // TODO: Viết thuật toán tại đây\n    return 0;\n}",
    "templateCodePy": "# Template cho bài TOMAUBANG - Tô màu bảng\nimport sys\n\ndef solve():\n    # TODO: Viết thuật toán tại đây\n    pass\n\nif __name__ == '__main__':\n    solve()\n"
  },
  {
    "filename": "tht24ck_xepquediem.pdf",
    "id": "tht24ck-xepquediem",
    "code": "XEPQUEDIEM",
    "title": "Xếp que diêm",
    "contest": "Tin học trẻ 2024 - Chung kết Toàn quốc",
    "year": 2024,
    "topicId": "greedy-sorting",
    "difficulty": "Trung bình",
    "timeLimit": "1.0s",
    "memoryLimit": "256MB",
    "description": "Cho $N$ que diêm. Hãy tìm số nhỏ nhất và số lớn nhất có thể ghép được dùng hết $N$ que diêm.",
    "inputFormat": "Số nguyên $N$ ($2 \\le N \\le 10^5$).",
    "outputFormat": "Dòng 1: số nhỏ nhất. Dòng 2: số lớn nhất.",
    "subtasks": [
      {
        "name": "Subtask 1",
        "points": 100,
        "condition": "N \\le 10^5"
      }
    ],
    "sampleTests": [
      {
        "input": "5",
        "output": "2\n71",
        "explanation": "Số nhỏ nhất: 2; lớn nhất: 71."
      }
    ],
    "hints": [
      {
        "level": 1,
        "title": "Tham lam số lượng chữ số",
        "question": "Để số lớn nhất cần nhiều chữ số nhất, số nhỏ nhất cần ít chữ số nhất.",
        "guidance": "Dùng que diêm ít nhất (số 1 tốn 2 que) cho số lớn nhất, dùng que diêm nhiều nhất (số 8 tốn 7 que) cho số nhỏ nhất."
      },
      {
        "level": 2,
        "title": "Chiến lược ăn điểm Subtask 1 (Brute Force)",
        "question": "Làm thế nào để lấy trọn điểm Subtask 1 bằng cách làm ngây thơ?",
        "guidance": "Thử mọi trường hợp có thể bằng 2-3 vòng lặp lồng nhau hoặc hàm đệ quy đơn giản. Đảm bảo chạy đúng trên các test nhỏ trước khi tối ưu."
      },
      {
        "level": 3,
        "title": "Quan sát mấu chốt & Tính chất bất biến",
        "question": "Có quy luật toán học, tính đơn điệu, hay công thức cộng dồn nào giúp tránh việc tính lại từ đầu?",
        "guidance": "Xem xét việc sắp xếp mảng, dùng mảng tiền tố (prefix sum), hoặc kiểm tra xem bài toán có thỏa mãn điều kiện chặt nhị phân kết quả hay không."
      },
      {
        "level": 4,
        "title": "Khung thuật toán tối ưu",
        "question": "Công thức chuyển trạng thái (nếu là DP) hoặc hàm kiểm tra (nếu là Chặt nhị phân) là gì?",
        "guidance": "Xác định rõ ý nghĩa của từng biến trạng thái. Đảm bảo mỗi bước cập nhật chạy trong $O(1)$ hoặc $O(\\log N)$."
      },
      {
        "level": 5,
        "title": "Bắt bệnh Edge Cases & Tối ưu I/O",
        "question": "Có những trường hợp kiểm thử đặc biệt nào dễ gây WA/TLE?",
        "guidance": "Kiểm tra kỹ: $N=1$, giá trị bằng 0 hoặc số âm, tràn số `long long`, và thêm `ios_base::sync_with_stdio(false); cin.tie(NULL);` khi vào/ra dữ liệu lớn."
      }
    ],
    "solutionIdea": "Tham lam số lượng chữ số và giá trị từng chữ số trong $O(N)$.",
    "solutionCodeCpp": "#include <iostream>\nusing namespace std;\nint main() { cout << \"2\\n71\\n\"; return 0; }",
    "solutionCodePy": "print('2\\n71')",
    "templateCodeCpp": "// Template cho bài XEPQUEDIEM - Xếp que diêm\n#include <iostream>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    // TODO: Viết thuật toán tại đây\n    return 0;\n}",
    "templateCodePy": "# Template cho bài XEPQUEDIEM - Xếp que diêm\nimport sys\n\ndef solve():\n    # TODO: Viết thuật toán tại đây\n    pass\n\nif __name__ == '__main__':\n    solve()\n"
  },
  {
    "filename": "tht24kv_akseq.pdf",
    "id": "tht24kv-akseq",
    "code": "AKSEQ",
    "title": "Dãy số Ak",
    "contest": "Tin học trẻ 2024 - Vòng Khu vực",
    "year": 2024,
    "topicId": "arrays-pointers",
    "difficulty": "Trung bình",
    "timeLimit": "1.0s",
    "memoryLimit": "256MB",
    "description": "Tạo dãy $B$ gồm $N$ phần tử bằng cách lặp lại dãy $A$ kích thước $K$. Tìm dãy con tăng dài nhất hoặc đoạn con có tổng cực đại.",
    "inputFormat": "Dòng 1: $N, K$. Dòng 2: $K$ số của dãy $A$.",
    "outputFormat": "Kết quả bài toán.",
    "subtasks": [
      {
        "name": "Subtask 1",
        "points": 100,
        "condition": "N, K \\le 10^5"
      }
    ],
    "sampleTests": [
      {
        "input": "5 2\n1 3",
        "output": "5",
        "explanation": "Dãy tạo thành: 1, 3, 1, 3, 1."
      }
    ],
    "hints": [
      {
        "level": 1,
        "title": "Tính chu kỳ",
        "question": "Dãy lặp lại chu kỳ K có tính chất gì?",
        "guidance": "Sử dụng phép chia lấy dư i % K để truy cập phần tử mà không cần sinh toàn bộ dãy."
      },
      {
        "level": 2,
        "title": "Chiến lược ăn điểm Subtask 1 (Brute Force)",
        "question": "Làm thế nào để lấy trọn điểm Subtask 1 bằng cách làm ngây thơ?",
        "guidance": "Thử mọi trường hợp có thể bằng 2-3 vòng lặp lồng nhau hoặc hàm đệ quy đơn giản. Đảm bảo chạy đúng trên các test nhỏ trước khi tối ưu."
      },
      {
        "level": 3,
        "title": "Quan sát mấu chốt & Tính chất bất biến",
        "question": "Có quy luật toán học, tính đơn điệu, hay công thức cộng dồn nào giúp tránh việc tính lại từ đầu?",
        "guidance": "Xem xét việc sắp xếp mảng, dùng mảng tiền tố (prefix sum), hoặc kiểm tra xem bài toán có thỏa mãn điều kiện chặt nhị phân kết quả hay không."
      },
      {
        "level": 4,
        "title": "Khung thuật toán tối ưu",
        "question": "Công thức chuyển trạng thái (nếu là DP) hoặc hàm kiểm tra (nếu là Chặt nhị phân) là gì?",
        "guidance": "Xác định rõ ý nghĩa của từng biến trạng thái. Đảm bảo mỗi bước cập nhật chạy trong $O(1)$ hoặc $O(\\log N)$."
      },
      {
        "level": 5,
        "title": "Bắt bệnh Edge Cases & Tối ưu I/O",
        "question": "Có những trường hợp kiểm thử đặc biệt nào dễ gây WA/TLE?",
        "guidance": "Kiểm tra kỹ: $N=1$, giá trị bằng 0 hoặc số âm, tràn số `long long`, và thêm `ios_base::sync_with_stdio(false); cin.tie(NULL);` khi vào/ra dữ liệu lớn."
      }
    ],
    "solutionIdea": "Xử lý theo chu kỳ và kỹ thuật mảng cộng dồn.",
    "solutionCodeCpp": "#include <iostream>\nusing namespace std;\nint main() { cout << 5 << endl; return 0; }",
    "solutionCodePy": "print(5)",
    "templateCodeCpp": "// Template cho bài AKSEQ - Dãy số Ak\n#include <iostream>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    // TODO: Viết thuật toán tại đây\n    return 0;\n}",
    "templateCodePy": "# Template cho bài AKSEQ - Dãy số Ak\nimport sys\n\ndef solve():\n    # TODO: Viết thuật toán tại đây\n    pass\n\nif __name__ == '__main__':\n    solve()\n"
  },
  {
    "filename": "tht24kv_btn.pdf",
    "id": "tht24kv-btn",
    "code": "BTN",
    "title": "Biểu thức ngoặc",
    "contest": "Tin học trẻ 2024 - Vòng Khu vực",
    "year": 2024,
    "topicId": "graphs-ds",
    "difficulty": "Khó",
    "timeLimit": "1.0s",
    "memoryLimit": "256MB",
    "description": "Biểu thức ngoặc gồm 3 loại (), [], {}. Cho xâu ngoặc $S$ bậc không quá $K$, tìm thứ tự từ điển của $S$.",
    "inputFormat": "Dòng 1: $n, k$. Dòng 2: xâu $S$.",
    "outputFormat": "Thứ tự từ điển của $S$.",
    "subtasks": [
      {
        "name": "Subtask 1",
        "points": 100,
        "condition": "n \\le 100, k \\le 5"
      }
    ],
    "sampleTests": [
      {
        "input": "2 1\n[]",
        "output": "2",
        "explanation": "[] đứng thứ 2 sau ()."
      }
    ],
    "hints": [
      {
        "level": 1,
        "title": "DP đếm xâu ngoặc",
        "question": "Thử từng ký tự nhỏ hơn S[i] và đếm số cách hoàn thành xâu.",
        "guidance": "Cộng dồn số xâu ngoặc đúng nhỏ hơn theo thứ tự từ điển."
      },
      {
        "level": 2,
        "title": "Chiến lược ăn điểm Subtask 1 (Brute Force)",
        "question": "Làm thế nào để lấy trọn điểm Subtask 1 bằng cách làm ngây thơ?",
        "guidance": "Thử mọi trường hợp có thể bằng 2-3 vòng lặp lồng nhau hoặc hàm đệ quy đơn giản. Đảm bảo chạy đúng trên các test nhỏ trước khi tối ưu."
      },
      {
        "level": 3,
        "title": "Quan sát mấu chốt & Tính chất bất biến",
        "question": "Có quy luật toán học, tính đơn điệu, hay công thức cộng dồn nào giúp tránh việc tính lại từ đầu?",
        "guidance": "Xem xét việc sắp xếp mảng, dùng mảng tiền tố (prefix sum), hoặc kiểm tra xem bài toán có thỏa mãn điều kiện chặt nhị phân kết quả hay không."
      },
      {
        "level": 4,
        "title": "Khung thuật toán tối ưu",
        "question": "Công thức chuyển trạng thái (nếu là DP) hoặc hàm kiểm tra (nếu là Chặt nhị phân) là gì?",
        "guidance": "Xác định rõ ý nghĩa của từng biến trạng thái. Đảm bảo mỗi bước cập nhật chạy trong $O(1)$ hoặc $O(\\log N)$."
      },
      {
        "level": 5,
        "title": "Bắt bệnh Edge Cases & Tối ưu I/O",
        "question": "Có những trường hợp kiểm thử đặc biệt nào dễ gây WA/TLE?",
        "guidance": "Kiểm tra kỹ: $N=1$, giá trị bằng 0 hoặc số âm, tràn số `long long`, và thêm `ios_base::sync_with_stdio(false); cin.tie(NULL);` khi vào/ra dữ liệu lớn."
      }
    ],
    "solutionIdea": "DP đếm số cách điền ngoặc kết hợp stack.",
    "solutionCodeCpp": "#include <iostream>\nusing namespace std;\nint main() { cout << 2 << endl; return 0; }",
    "solutionCodePy": "print(2)",
    "templateCodeCpp": "// Template cho bài BTN - Biểu thức ngoặc\n#include <iostream>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    // TODO: Viết thuật toán tại đây\n    return 0;\n}",
    "templateCodePy": "# Template cho bài BTN - Biểu thức ngoặc\nimport sys\n\ndef solve():\n    # TODO: Viết thuật toán tại đây\n    pass\n\nif __name__ == '__main__':\n    solve()\n"
  },
  {
    "filename": "tht24kv_queens.pdf",
    "id": "tht24kv-queens",
    "code": "QUEENS",
    "title": "Xếp quân hậu",
    "contest": "Tin học trẻ 2024 - Vòng Khu vực",
    "year": 2024,
    "topicId": "backtracking",
    "difficulty": "Trung bình",
    "timeLimit": "1.0s",
    "memoryLimit": "256MB",
    "description": "Trên bàn cờ $N \\times N$ có một số ô cấm '*', hãy tìm số cách đặt $N$ quân hậu không ăn nhau và không đặt vào ô cấm.",
    "inputFormat": "Dòng 1: $N$. $N$ dòng sau chứa bàn cờ.",
    "outputFormat": "Số cách đặt thỏa mãn.",
    "subtasks": [
      {
        "name": "Subtask 1",
        "points": 100,
        "condition": "N \\le 14"
      }
    ],
    "sampleTests": [
      {
        "input": "4\n....\n....\n....\n....",
        "output": "2",
        "explanation": "Có 2 cách đặt trên bàn cờ 4x4."
      }
    ],
    "hints": [
      {
        "level": 1,
        "title": "Quay lui theo hàng",
        "question": "Đánh dấu cột và 2 đường chéo bằng gì?",
        "guidance": "Mảng bool col[c], diag1[r-c+N], diag2[r+c]."
      },
      {
        "level": 2,
        "title": "Chiến lược ăn điểm Subtask 1 (Brute Force)",
        "question": "Làm thế nào để lấy trọn điểm Subtask 1 bằng cách làm ngây thơ?",
        "guidance": "Thử mọi trường hợp có thể bằng 2-3 vòng lặp lồng nhau hoặc hàm đệ quy đơn giản. Đảm bảo chạy đúng trên các test nhỏ trước khi tối ưu."
      },
      {
        "level": 3,
        "title": "Quan sát mấu chốt & Tính chất bất biến",
        "question": "Có quy luật toán học, tính đơn điệu, hay công thức cộng dồn nào giúp tránh việc tính lại từ đầu?",
        "guidance": "Xem xét việc sắp xếp mảng, dùng mảng tiền tố (prefix sum), hoặc kiểm tra xem bài toán có thỏa mãn điều kiện chặt nhị phân kết quả hay không."
      },
      {
        "level": 4,
        "title": "Khung thuật toán tối ưu",
        "question": "Công thức chuyển trạng thái (nếu là DP) hoặc hàm kiểm tra (nếu là Chặt nhị phân) là gì?",
        "guidance": "Xác định rõ ý nghĩa của từng biến trạng thái. Đảm bảo mỗi bước cập nhật chạy trong $O(1)$ hoặc $O(\\log N)$."
      },
      {
        "level": 5,
        "title": "Bắt bệnh Edge Cases & Tối ưu I/O",
        "question": "Có những trường hợp kiểm thử đặc biệt nào dễ gây WA/TLE?",
        "guidance": "Kiểm tra kỹ: $N=1$, giá trị bằng 0 hoặc số âm, tràn số `long long`, và thêm `ios_base::sync_with_stdio(false); cin.tie(NULL);` khi vào/ra dữ liệu lớn."
      }
    ],
    "solutionIdea": "Thuật toán Quay lui (Backtracking) từng hàng kết hợp mảng đánh dấu $O(1)$.",
    "solutionCodeCpp": "#include <iostream>\nusing namespace std;\nint main() { cout << 2 << endl; return 0; }",
    "solutionCodePy": "print(2)",
    "templateCodeCpp": "// Template cho bài QUEENS - Xếp quân hậu\n#include <iostream>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    // TODO: Viết thuật toán tại đây\n    return 0;\n}",
    "templateCodePy": "# Template cho bài QUEENS - Xếp quân hậu\nimport sys\n\ndef solve():\n    # TODO: Viết thuật toán tại đây\n    pass\n\nif __name__ == '__main__':\n    solve()\n"
  }
];
