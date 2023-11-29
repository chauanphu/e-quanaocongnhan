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

<strong>Hình ảnh sản phẩm (.png, webp*, .jpg)</strong> được ở thư mục _images/san-pham/[slug].[ex] <br/>
<strong>Mô tả sản phẩm (Markdown)</strong> được ở thư mục _posts_/san-pham/[slug].md