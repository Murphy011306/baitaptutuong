# 🎮 Decision Making Games - Bộ Game Việt Nam

Dự án này bao gồm 2 game:

1. **Papers, Please: Việt Nam** - Game đưa ra quyết định
2. **Tổng Khởi Nghĩa** - Game RTS (Real-time Strategy)

---

## 📋 Papers, Please: Việt Nam

### 🎮 Cách Chạy Game

### Cách 1: Mở trực tiếp file HTML (Đơn giản nhất)

1. Tìm file `index.html` trong thư mục dự án
2. Double-click vào file `index.html` 
3. Hoặc right-click → "Open with" → Chọn trình duyệt (Chrome, Firefox, Edge...)
4. Game sẽ tự động mở trong trình duyệt

### Cách 2: Sử dụng Python HTTP Server (Khuyến nghị)

Nếu bạn có Python 3:

```bash
cd /home/lad/Projects/decision-makinggame
python3 -m http.server 8000
```

Sau đó mở trình duyệt và truy cập:
```
http://localhost:8000
```

Để dừng server, nhấn `Ctrl + C` trong terminal.

### Cách 3: Sử dụng Node.js http-server

Nếu bạn có Node.js và đã cài `http-server`:

```bash
cd /home/lad/Projects/decision-makinggame
npx http-server -p 8000
```

Sau đó mở trình duyệt và truy cập:
```
http://localhost:8000
```

### Cách 4: Sử dụng Live Server (VS Code)

Nếu bạn dùng VS Code:

1. Cài extension "Live Server"
2. Right-click vào file `index.html`
3. Chọn "Open with Live Server"
4. Game sẽ tự động mở trong trình duyệt

## 🎯 Cách Chơi

1. **Bắt đầu**: Nhấn nút "Bắt đầu" ở màn hình chào mừng

2. **Xét duyệt tài liệu**:
   - Đọc thông tin của người xin vào căn cứ
   - Chú ý các dấu hiệu đáng ngờ (màu vàng)
   - Chọn một trong 3 hành động:
     - ✅ **Chấp nhận**: Cho phép người hợp pháp vào
     - ❌ **Từ chối**: Từ chối người không hợp lệ
     - 🚨 **Bắt giữ**: Bắt giữ gián điệp

3. **Phân bổ tài nguyên**:
   - Điều chỉnh slider cho 4 loại tài nguyên:
     - 🏥 Y tế
     - 🛡️ An ninh
     - 🍞 Lương thực
     - 🔧 Cơ sở hạ tầng
   - Tổng tài nguyên không được vượt quá số có
   - Nhấn "Xác nhận phân bổ"

4. **Quyết định tình huống**:
   - Đọc tình huống đặc biệt
   - Chọn một trong các phương án
   - Mỗi quyết định ảnh hưởng đến điểm số và tài nguyên

5. **Hoàn thành**: Chơi qua 7 ngày để xem kết thúc!

## 🎲 Tính Năng

- ✅ Xét duyệt tài liệu và phát hiện gián điệp
- 📊 Phân bổ tài nguyên hạn chế
- 🎯 Quyết định tình huống đặc biệt
- 📈 Hệ thống điểm số và thống kê
- 🎬 Nhiều ending khác nhau dựa trên quyết định
- 📱 Giao diện responsive, đẹp mắt

---

## 🎖️ Tổng Khởi Nghĩa - RTS Game

### 🎮 Cách Chạy Game

Mở file `rts-game.html` trong trình duyệt (tương tự như Papers, Please)

### 🎯 Cách Chơi

1. **Thu thập tài nguyên**:
   - Dân công (👷) sẽ tự động thu thập lương thực (🌾), gỗ (🪵), sắt (⚙️) từ các nguồn tài nguyên trên bản đồ
   - Click vào nguồn tài nguyên để điều khiển dân công đến đó

2. **Xây dựng căn cứ**:
   - Nhấn nút xây dựng ở sidebar bên trái
   - Chọn vị trí trên bản đồ để xây
   - Các tòa nhà:
     - 🏠 **Nhà ở**: Tăng dân số tối đa (+5)
     - 🏛️ **Trường huấn luyện**: Tuyển du kích và bộ đội
     - 🔧 **Xưởng vũ khí**: Tuyển pháo binh
     - 🏥 **Bệnh viện**: Chữa trị đơn vị
     - 🔬 **Trung tâm nghiên cứu**: Nghiên cứu công nghệ

3. **Tuyển quân**:
   - Xây các tòa nhà cần thiết
   - Nhấn nút tuyển quân (cần có tòa nhà tương ứng)
   - Các đơn vị:
     - 👷 **Dân công**: Thu thập tài nguyên (50 lương thực)
     - 🔫 **Du kích**: Tấn công nhanh, yếu (60 lương thực, 20 gỗ)
     - 🪖 **Bộ đội chủ lực**: Mạnh, chậm (100 lương thực, 40 gỗ, 30 sắt)
     - 💣 **Pháo binh**: Tầm xa, sát thương cao (80 lương thực, 60 gỗ, 100 sắt)

4. **Nghiên cứu công nghệ**:
   - Xây Trung tâm nghiên cứu
   - Nghiên cứu để nâng cấp:
     - **Vũ khí cải tiến**: Tăng sát thương +50%
     - **Giáp bảo vệ**: Tăng HP +30%
     - **Tuyển anh hùng**: Mở khóa anh hùng

5. **Anh hùng** (Sau khi nghiên cứu):
   - ⭐ **Võ Nguyên Giáp**: HP 300, Tấn công 60, Tầm 100
   - ⭐ **Hoàng Văn Thụ**: HP 250, Tấn công 50, Tầm 80, Nhanh hơn

6. **Chiến đấu**:
   - Kẻ địch sẽ xuất hiện từ bên phải bản đồ sau 30 giây
   - Các đơn vị sẽ tự động tấn công kẻ địch trong tầm
   - Bảo vệ các tòa nhà của bạn!

### 🎲 Tính Năng

- ✅ Thu thập tài nguyên tự động
- 🏗️ Xây dựng căn cứ với 5 loại tòa nhà
- ⚔️ Tuyển và chỉ huy 4 loại đơn vị + 2 anh hùng
- 🔬 Hệ thống nghiên cứu công nghệ
- 🤖 AI địch tự động tấn công (Quân Pháp, Nhật, Mỹ)
- 🎯 Chiến đấu real-time
- 📊 Hệ thống dân số và quản lý tài nguyên

### 💡 Mẹo Chơi

- 🌾 **Ưu tiên thu thập tài nguyên**: Tạo nhiều dân công để thu thập nhanh
- 🏠 **Xây nhà sớm**: Tăng dân số để có thể tuyển nhiều quân
- 🏛️ **Xây trường huấn luyện sớm**: Để bắt đầu tuyển quân phòng thủ
- 🔬 **Nghiên cứu công nghệ**: Nâng cấp vũ khí và giáp để chiến đấu hiệu quả hơn
- ⭐ **Tuyển anh hùng**: Anh hùng rất mạnh, có thể thay đổi cục diện trận đánh
- 🛡️ **Bảo vệ căn cứ**: Nếu tất cả tòa nhà bị phá hủy, bạn sẽ thua!

---

## 📁 Cấu Trúc File

```
decision-makinggame/
├── index.html          # Papers, Please - HTML chính
├── styles.css          # Papers, Please - CSS
├── game.js             # Papers, Please - JavaScript
├── rts-game.html       # Tổng Khởi Nghĩa - HTML chính
├── rts-styles.css      # Tổng Khởi Nghĩa - CSS
├── rts-game.js         # Tổng Khởi Nghĩa - JavaScript
└── README.md           # File hướng dẫn này
```

## 🐛 Xử Lý Lỗi

Nếu game không chạy:

1. **Kiểm tra console**: Mở Developer Tools (F12) và xem có lỗi không
2. **Kiểm tra file**: Đảm bảo tất cả file (index.html, styles.css, game.js) ở cùng thư mục
3. **Kiểm tra trình duyệt**: Thử với trình duyệt khác (Chrome, Firefox, Edge)
4. **Dùng HTTP Server**: Nếu mở trực tiếp không được, thử dùng Python HTTP Server (Cách 2)

## 💡 Mẹo Chơi

- ⚠️ Chú ý các dấu hiệu đáng ngờ: ID không hợp lệ, giấy tờ thiếu, lý do không hợp lý
- 🎯 Bắt giữ gián điệp cho điểm cao nhất (+30 điểm)
- ⚖️ Cân bằng phân bổ tài nguyên để đạt điểm tốt
- 🤔 Suy nghĩ kỹ trước khi quyết định trong tình huống đặc biệt

Chúc bạn chơi vui vẻ! 🎮

