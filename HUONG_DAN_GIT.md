# Hướng dẫn đẩy code lên Git (GitHub/GitLab)

## Bước 1: Đã hoàn thành ✅
- ✅ Đã khởi tạo Git repository (`git init`)
- ✅ Đã tạo file `.gitignore`
- ✅ Đã add tất cả files (`git add .`)
- ✅ Đã commit (`git commit`)

## Bước 2: Tạo repository trên GitHub/GitLab

### Nếu dùng GitHub:
1. Đăng nhập vào [GitHub.com](https://github.com)
2. Click nút **"+"** ở góc trên bên phải → chọn **"New repository"**
3. Đặt tên repository (ví dụ: `decision-makinggame` hoặc `tong-khoi-nghia-game`)
4. **KHÔNG** tích vào "Initialize with README" (vì đã có code rồi)
5. Click **"Create repository"**

### Nếu dùng GitLab:
1. Đăng nhập vào [GitLab.com](https://gitlab.com)
2. Click nút **"New project"** hoặc **"Create project"**
3. Chọn **"Create blank project"**
4. Đặt tên project
5. Click **"Create project"**

## Bước 3: Kết nối với remote repository

Sau khi tạo repository, bạn sẽ thấy URL như:
- `https://github.com/username/repository-name.git` (HTTPS)
- `git@github.com:username/repository-name.git` (SSH)

### Thêm remote repository:

```bash
# Thay YOUR_USERNAME và YOUR_REPO_NAME bằng thông tin của bạn
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Hoặc nếu dùng SSH:
# git remote add origin git@github.com:YOUR_USERNAME/YOUR_REPO_NAME.git
```

### Kiểm tra remote đã thêm:
```bash
git remote -v
```

## Bước 4: Đẩy code lên

### Đổi tên branch thành main (nếu cần):
```bash
git branch -M main
```

### Đẩy code lên:
```bash
git push -u origin main
```

Nếu bạn đang dùng branch `master`:
```bash
git push -u origin master
```

## Bước 5: Xác thực (nếu cần)

- **HTTPS**: GitHub/GitLab sẽ yêu cầu username và password (hoặc Personal Access Token)
- **SSH**: Cần cấu hình SSH key trước

### Tạo Personal Access Token (GitHub):
1. Vào Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token
3. Chọn quyền `repo`
4. Copy token và dùng làm password khi push

## Các lệnh Git hữu ích:

### Xem trạng thái:
```bash
git status
```

### Xem lịch sử commit:
```bash
git log
```

### Thêm file mới:
```bash
git add ten-file.html
git commit -m "Thêm file mới"
git push
```

### Cập nhật code từ remote:
```bash
git pull
```

### Xem các branch:
```bash
git branch
```

## Lưu ý:

1. **Lần đầu push**: Dùng `git push -u origin main` (hoặc `master`)
2. **Các lần sau**: Chỉ cần `git push`
3. **Commit message**: Nên viết rõ ràng, mô tả thay đổi
4. **Không commit**: File nhạy cảm (password, API keys) - đã có trong `.gitignore`

## Ví dụ workflow hàng ngày:

```bash
# 1. Xem thay đổi
git status

# 2. Thêm file đã sửa
git add .

# 3. Commit với message
git commit -m "Sửa lỗi di chuyển đơn vị"

# 4. Đẩy lên
git push
```

## Troubleshooting:

### Lỗi "remote origin already exists":
```bash
git remote remove origin
git remote add origin YOUR_NEW_URL
```

### Lỗi "failed to push some refs":
```bash
git pull origin main --rebase
git push
```

### Xem remote hiện tại:
```bash
git remote -v
```

