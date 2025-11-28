# 🎖️ Hướng Dẫn Chơi Game "Tổng Khởi Nghĩa"

## 🚀 Cách Chạy Game

### Cách 1: Mở trực tiếp (Đơn giản nhất)
- Double-click vào file `rts-game.html`
- Hoặc right-click → "Open with" → Chọn trình duyệt

### Cách 2: Dùng HTTP Server
```bash
python3 -m http.server 8000
```
Sau đó mở: `http://localhost:8000/rts-game.html`

---

## 🎮 Hướng Dẫn Chơi

### Bước 1: Bắt đầu
- Game tự động bắt đầu khi mở
- Bạn có 2 nhà ở ban đầu và một số tài nguyên

### Bước 2: Thu thập tài nguyên
1. **Tuyển Dân công**:
   - Click nút "👷 Dân công" ở sidebar bên trái
   - Cần: 50 lương thực
   - Dân công sẽ tự động đi thu thập tài nguyên từ các nguồn trên bản đồ

2. **Nguồn tài nguyên**:
   - 🌾 **Lương thực**: Các điểm màu xanh lá trên bản đồ
   - 🪵 **Gỗ**: Các điểm màu nâu
   - ⚙️ **Sắt**: Các điểm màu xám

### Bước 3: Xây dựng căn cứ

**Các tòa nhà có thể xây:**

1. **🏠 Nhà ở** (50 lương thực, 30 gỗ)
   - Tăng dân số tối đa +5
   - Cần để tuyển thêm quân

2. **🏛️ Trường huấn luyện** (100 lương thực, 80 gỗ, 20 sắt)
   - Tuyển Du kích và Bộ đội chủ lực
   - Xây sớm để có quân phòng thủ

3. **🔧 Xưởng vũ khí** (80 lương thực, 100 gỗ, 50 sắt)
   - Tuyển Pháo binh
   - Cần nhiều sắt

4. **🏥 Bệnh viện** (60 lương thực, 70 gỗ, 10 sắt)
   - Chữa trị đơn vị bị thương

5. **🔬 Trung tâm nghiên cứu** (150 lương thực, 120 gỗ, 80 sắt)
   - Nghiên cứu công nghệ
   - Cần để mở khóa anh hùng

**Cách xây:**
1. Click nút xây dựng ở sidebar bên trái
2. Click vào vị trí trên bản đồ muốn xây
3. Đợi tòa nhà hoàn thành (có thanh tiến độ)

### Bước 4: Tuyển quân

**Các đơn vị:**

1. **👷 Dân công** (50 lương thực)
   - Thu thập tài nguyên
   - Không chiến đấu
   - Tạo nhiều để thu thập nhanh

2. **🔫 Du kích** (60 lương thực, 20 gỗ)
   - Cần: Trường huấn luyện
   - Tấn công nhanh, yếu
   - Tốc độ cao

3. **🪖 Bộ đội chủ lực** (100 lương thực, 40 gỗ, 30 sắt)
   - Cần: Trường huấn luyện
   - Mạnh, chậm
   - Xương sống của quân đội

4. **💣 Pháo binh** (80 lương thực, 60 gỗ, 100 sắt)
   - Cần: Xưởng vũ khí
   - Tầm xa, sát thương cao
   - Yếu ở gần

**Cách tuyển:**
1. Xây tòa nhà tương ứng
2. Click nút tuyển quân ở sidebar
3. Đơn vị sẽ xuất hiện sau vài giây

### Bước 5: Nghiên cứu công nghệ

**Các công nghệ:**

1. **Vũ khí cải tiến** (200 lương thực, 150 gỗ, 100 sắt)
   - Tăng sát thương +50%
   - Nghiên cứu sớm để chiến đấu hiệu quả

2. **Giáp bảo vệ** (150 lương thực, 200 gỗ, 150 sắt)
   - Tăng HP +30%
   - Giúp đơn vị sống sót lâu hơn

3. **Tuyển anh hùng** (300 lương thực, 250 gỗ, 200 sắt)
   - Mở khóa menu anh hùng
   - Cho phép tuyển Võ Nguyên Giáp và Hoàng Văn Thụ

**Cách nghiên cứu:**
1. Xây Trung tâm nghiên cứu
2. Click nút nghiên cứu
3. Đợi 10 giây để hoàn thành

### Bước 6: Tuyển Anh hùng (Sau khi nghiên cứu)

1. **⭐ Võ Nguyên Giáp** (500 lương thực, 300 gỗ, 200 sắt)
   - HP: 300
   - Tấn công: 60
   - Tầm: 100
   - Rất mạnh!

2. **⭐ Hoàng Văn Thụ** (400 lương thực, 250 gỗ, 150 sắt)
   - HP: 250
   - Tấn công: 50
   - Tầm: 80
   - Nhanh hơn Võ Nguyên Giáp

### Bước 7: Chiến đấu

- **Kẻ địch sẽ xuất hiện sau 30 giây** từ bên phải bản đồ
- Các đơn vị sẽ **tự động tấn công** khi kẻ địch trong tầm
- **Bảo vệ căn cứ**: Nếu tất cả tòa nhà bị phá hủy → THUA!

**Các loại kẻ địch:**
- 🇫🇷 **Lính Pháp**: HP 100, Tấn công 25
- 🇯🇵 **Lính Nhật**: HP 80, Tấn công 20 (nhanh)
- 🇺🇸 **Lính Mỹ**: HP 150, Tấn công 35 (mạnh nhất)

---

## 💡 Mẹo Chơi

1. **Ưu tiên thu thập tài nguyên**:
   - Tạo 3-4 dân công ngay từ đầu
   - Thu thập đủ tài nguyên trước khi kẻ địch đến

2. **Xây nhà sớm**:
   - Tăng dân số để có thể tuyển nhiều quân
   - Mỗi nhà tăng +5 dân số

3. **Xây trường huấn luyện sớm**:
   - Bắt đầu tuyển quân phòng thủ
   - Tuyển 2-3 du kích và 1-2 bộ đội chủ lực

4. **Nghiên cứu công nghệ**:
   - Nghiên cứu "Vũ khí cải tiến" sớm
   - Sau đó nghiên cứu "Giáp bảo vệ"
   - Cuối cùng nghiên cứu "Tuyển anh hùng"

5. **Tuyển anh hùng**:
   - Anh hùng rất mạnh, có thể thay đổi cục diện
   - Tuyển 1-2 anh hùng để phòng thủ tốt hơn

6. **Pháo binh**:
   - Tuyển 2-3 pháo binh để tấn công từ xa
   - Đặt pháo binh phía sau, bộ đội phía trước

7. **Bảo vệ căn cứ**:
   - Đặt quân xung quanh căn cứ
   - Không để kẻ địch tiếp cận tòa nhà

---

## 🎯 Mục Tiêu

- **Sống sót** qua các đợt tấn công của kẻ địch
- **Bảo vệ** tất cả tòa nhà
- **Xây dựng** căn cứ mạnh mẽ
- **Phát triển** công nghệ và quân đội

---

## ⌨️ Điều Khiển

- **Click chuột trái**: Chọn đơn vị/tòa nhà
- **Click vào nút**: Xây dựng, tuyển quân, nghiên cứu
- **Click trên bản đồ**: Xây tòa nhà (khi đã chọn nút xây)
- **⏸️ Tạm dừng**: Dừng game
- **⚡ Tốc độ**: Thay đổi tốc độ game (1x, 2x, 0.5x)

---

Chúc bạn chơi vui vẻ! 🎮

