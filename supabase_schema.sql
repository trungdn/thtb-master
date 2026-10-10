-- ==============================================================================
-- SCHEMA CƠ SỞ DỮ LIỆU LUYỆN THI TIN HỌC TRẺ BẢNG B (SUPABASE)
-- Hướng dẫn: Copy toàn bộ nội dung file này dán vào SQL Editor trên Supabase Dashboard và bấm RUN.
-- ==============================================================================

-- 1. BẢNG HỒ SƠ HỌC SINH (profiles)
create table if not exists public.profiles (
  id text primary key,
  username text unique not null,
  password text default '',
  name text not null,
  school text default 'Chưa cập nhật',
  grade text default 'Lớp 8',
  target text default 'Rèn luyện Tin Học Trẻ Bảng B',
  avatar text default '👨‍💻',
  streak integer default 1,
  last_active_date date default current_date,
  solved_problem_ids text[] default array[]::text[],
  partial_problem_ids text[] default array[]::text[],
  bookmarked_ids text[] default array[]::text[],
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 2. BẢNG LỊCH SỬ NỘP BÀI & CHẤM ĐIỂM (submissions)
create table if not exists public.submissions (
  id text primary key,
  username text not null,
  problem_id text not null,
  language text not null,
  code text not null,
  status text not null,
  score integer default 0,
  max_score integer default 100,
  subtask_results jsonb default '[]'::jsonb,
  created_at timestamptz default now()
);

-- Chỉ mục tìm kiếm nhanh theo username và problem_id
create index if not exists idx_submissions_username on public.submissions(username);
create index if not exists idx_submissions_problem on public.submissions(problem_id);
create index if not exists idx_profiles_username on public.profiles(username);

-- 3. BẬT BẢO MẬT ROW LEVEL SECURITY (RLS) VÀ TẠO POLICIES CHO PHÉP WEB APP TRUY CẬP
alter table public.profiles enable row level security;
alter table public.submissions enable row level security;

-- Cho phép đọc hồ sơ học sinh và bảng xếp hạng
drop policy if exists "Cho phép đọc profiles" on public.profiles;
create policy "Cho phép đọc profiles" on public.profiles for select using (true);

-- Cho phép học sinh đăng ký tài khoản mới
drop policy if exists "Cho phép tạo profiles" on public.profiles;
create policy "Cho phép tạo profiles" on public.profiles for insert with check (true);

-- Cho phép học sinh cập nhật bài giải & điểm số của mình
drop policy if exists "Cho phép cập nhật profiles" on public.profiles;
create policy "Cho phép cập nhật profiles" on public.profiles for update using (true);

-- Cho phép xem lịch sử nộp bài
drop policy if exists "Cho phép đọc submissions" on public.submissions;
create policy "Cho phép đọc submissions" on public.submissions for select using (true);

-- Cho phép lưu bài nộp mới
drop policy if exists "Cho phép ghi submissions" on public.submissions;
create policy "Cho phép ghi submissions" on public.submissions for insert with check (true);
