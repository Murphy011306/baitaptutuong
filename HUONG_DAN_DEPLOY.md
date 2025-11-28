# 🚀 Hướng Dẫn Deploy Game Lên Web

## Cách 1: GitHub Pages (Miễn phí, Dễ nhất) ⭐⭐⭐

### Bước 1: Tạo repository trên GitHub

1. Đăng nhập vào [GitHub.com](https://github.com)
2. Click nút **"New"** hoặc **"+"** → **"New repository"**
3. Đặt tên repository (ví dụ: `decision-making-game`)
4. Chọn **Public** (để miễn phí)
5. **KHÔNG** tích "Initialize with README"
6. Click **"Create repository"**

### Bước 2: Upload code lên GitHub

**Cách A: Dùng GitHub Desktop (Dễ nhất)**
1. Tải [GitHub Desktop](https://desktop.github.com/)
2. Cài đặt và đăng nhập
3. File → Add Local Repository → Chọn thư mục `decision-makinggame`
4. Commit message: "Initial commit"
5. Publish repository

**Cách B: Dùng Git command line**
```bash
cd /home/lad/Projects/decision-makinggame
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/TEN_USERNAME/TEN_REPO.git
git push -u origin main
```

### Bước 3: Bật GitHub Pages

1. Vào repository trên GitHub
2. Click **Settings** (tab trên cùng)
3. Scroll xuống phần **Pages** (sidebar trái)
4. Ở **Source**, chọn **"main"** branch
5. Click **Save**
6. Đợi 1-2 phút, link sẽ là: `https://TEN_USERNAME.github.io/TEN_REPO/`

### Bước 4: Tạo file index.html chính

Tạo file `index.html` ở root để chọn game:

```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Decision Making Games</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }
        .container {
            background: white;
            border-radius: 20px;
            padding: 40px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
            text-align: center;
            max-width: 600px;
        }
        h1 {
            color: #1e3c72;
            margin-bottom: 30px;
            font-size: 2.5em;
        }
        .game-card {
            background: #f8f9fa;
            border: 2px solid #dee2e6;
            border-radius: 15px;
            padding: 30px;
            margin: 20px 0;
            transition: all 0.3s ease;
            cursor: pointer;
        }
        .game-card:hover {
            border-color: #667eea;
            transform: translateY(-5px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }
        .game-card h2 {
            color: #1e3c72;
            margin-bottom: 15px;
        }
        .game-card p {
            color: #666;
            line-height: 1.6;
        }
        .btn {
            display: inline-block;
            padding: 15px 30px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-decoration: none;
            border-radius: 8px;
            font-weight: bold;
            margin-top: 15px;
            transition: all 0.3s ease;
        }
        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎮 Decision Making Games</h1>
        <p style="color: #666; margin-bottom: 30px;">Chọn game để chơi:</p>
        
        <div class="game-card" onclick="window.location.href='index.html'">
            <h2>📋 Papers, Please: Việt Nam</h2>
            <p>Game đưa ra quyết định - Xét duyệt tài liệu và phát hiện gián điệp</p>
            <a href="index.html" class="btn">Chơi ngay</a>
        </div>
        
        <div class="game-card" onclick="window.location.href='rts-game.html'">
            <h2>🎖️ Tổng Khởi Nghĩa</h2>
            <p>Game RTS - Xây dựng căn cứ, tuyển quân và chiến đấu với kẻ địch</p>
            <a href="rts-game.html" class="btn">Chơi ngay</a>
        </div>
    </div>
</body>
</html>
```

---

## Cách 2: Netlify (Miễn phí, Link đẹp) ⭐⭐⭐

### Bước 1: Tạo tài khoản
1. Vào [Netlify.com](https://netlify.com)
2. Đăng ký bằng GitHub (dễ nhất)

### Bước 2: Deploy
1. Click **"Add new site"** → **"Deploy manually"**
2. Kéo thả thư mục `decision-makinggame` vào
3. Hoặc dùng **"Deploy from Git"** nếu đã có GitHub repo
4. Netlify tự động tạo link: `https://random-name-123.netlify.app`

### Bước 3: Đổi tên (tùy chọn)
1. Site settings → Change site name
2. Đổi thành tên bạn muốn: `https://ten-game.netlify.app`

---

## Cách 3: Vercel (Miễn phí, Nhanh) ⭐⭐

### Bước 1: Tạo tài khoản
1. Vào [Vercel.com](https://vercel.com)
2. Đăng ký bằng GitHub

### Bước 2: Deploy
1. Click **"Add New Project"**
2. Import từ GitHub hoặc upload folder
3. Click **Deploy**
4. Link: `https://ten-game.vercel.app`

---

## Cách 4: Surge.sh (Miễn phí, Đơn giản) ⭐⭐

### Bước 1: Cài đặt
```bash
npm install -g surge
```

### Bước 2: Deploy
```bash
cd /home/lad/Projects/decision-makinggame
surge
```
- Nhập email và password (tạo tài khoản mới)
- Chọn domain: `ten-game.surge.sh`
- Xong!

---

## 📋 So Sánh Các Cách

| Cách | Ưu điểm | Nhược điểm | Link mẫu |
|------|---------|-----------|----------|
| **GitHub Pages** | Miễn phí, dễ, tích hợp Git | Link dài | `user.github.io/repo` |
| **Netlify** | Link đẹp, tự động deploy | Cần tài khoản | `ten-game.netlify.app` |
| **Vercel** | Nhanh, hiện đại | Cần tài khoản | `ten-game.vercel.app` |
| **Surge.sh** | Đơn giản, nhanh | Link có .surge.sh | `ten-game.surge.sh` |

---

## 🎯 Khuyến Nghị

**Nếu bạn mới bắt đầu**: Dùng **GitHub Pages** (dễ nhất, miễn phí)

**Nếu muốn link đẹp**: Dùng **Netlify** (link ngắn, đẹp)

---

## 📝 Lưu Ý

1. **Đảm bảo tất cả file trong cùng thư mục**
2. **Test game trước khi deploy** (mở file HTML trong browser)
3. **Link sẽ công khai** - ai cũng có thể truy cập
4. **Có thể đổi tên domain** (một số dịch vụ cho phép)

---

## 🚀 Bắt Đầu Ngay

Tôi khuyến nghị dùng **GitHub Pages** vì:
- ✅ Miễn phí 100%
- ✅ Dễ setup
- ✅ Tích hợp với Git
- ✅ Không giới hạn bandwidth

Bạn muốn tôi giúp setup GitHub Pages không?


