---
title: E-quanaocongnhan
author: John Doe
date: 2022-01-01
---

# E-quanaocongnhan

## I. Hướng dẫn set up
1. Tải repository về máy
2. Cài đặt .env.developement:
    - `NEXTAUTH_URL`="http://localhost:3000"
    - `DATABASE_URL`="postgresql://postgres@localhost:5432/local_db"
3. Cài đặt .env.local
    - `NEXT_PUBLIC_DOMAIN`: domain cho deployment
    - `NEXTAUTH_SECRET`: Hashing key cho chứng thực
4. Cài đặt prisma:
    - Khởi tạo postgres service trước.
    - `npx prisma init`: Tạo schema (mặc định là Postgres)
    - `npx prisma db push`: Kiểm tra kết nối
    - `npx prisma generate`: Tạo prisma client
    - `npx prisma migrate dev`: Push change to database
5. Khởi chạy developement:
    - `npm run dev` hoặc build `docker-compose.dev.yml`
## II. Hướng dẫn set up cho deployment

## III. Hướng dẫn đăng sản phẩm hàng loạt
1. Vào `/admin` ( Đăng nhập nếu chưa được xác thực )
2. Tải file mẫu về qua đường link `/api/san-pham/download`. VD: https://quanaocongnhan.com/api/san-pham/download
3. Chỉnh sửa file excel
4. Cập nhật danh mục sản phẩm
    - Vào mục "Danh mục"
    - Chọn file excel ( Đảm bảo có worksheet "Category" giống file mẫu)
    - Tải file excel lên
5. Cập nhật sản phẩm
    - Vào mục "Sản phẩm"
    - Chọn file excel ( Đảm bảo có worksheet "Product" giống file mẫu)
    - Tải file excel lên
    - Chọn các hình ảnh cần upload ( phải đúng định dạng .webp)
    - Tải hình ảnh sản phẩm lên

<strong>Hình ảnh sản phẩm (webp*)</strong> được ở thư mục _images/san-pham/[slug].webp <br/>
<strong>Mô tả sản phẩm (Markdown)</strong> được ở thư mục _posts/san-pham/[slug].md

### IV. Hướng dẫn chỉnh sửa sản phẩm / danh mục trong Excel:
1. Danh mục:
    - `Slug`: Đường link danh mục. VD: quan-ao-cong-nhan
    - `Name`: Tên danh mục. VD Quần áo công nhân
    - `Parent Slug`: Đường link thư mục cha ( Để trống nếu không có )
2. Sản phẩm:
    - `Slug`: Đường link sản phẩm. VD: ao-co-khi-ack01
    - `Name`: Tên sản phẩm. VD: Áo cơ khí ACK01
    - `SKU`: VD: ACK01
    - `Price`: Giá. VD: 75000 (Không có dấu "." hoặc ",")
    - `Image`: đường link hình ảnh trong thư mục. VD Hình ảnh ở thư mục _images/san-pham/ao-co-khi-ack01.webp thì đường link là "ao-co-khi-ack01.webp"
    - `Short Description`: Mô tả ngắn
    - `Long Description`: Đường link đến phải markdown. VD Markdown ở thư mục _posts/san-pham/ao-co-khi-ack01.md thì đường link là "ao-co-khi-ack01.md"
    - `Category`: Danh mục sản phẩm