# Baraka Machinery

Premium used excavators export website. Built for Middle East, Africa, and Southeast Asia markets.

## Tech
- Static HTML/CSS/JS
- API route for contact form (Vercel Serverless Function)
- Google Fonts (Playfair Display + Inter)

## Quick Deploy (2 minutes)

### Option A: Deploy to Vercel (Recommended)

**方法一：直接拖拽（最简单）**
1. 打开 https://vercel.com，用 GitHub 或邮箱注册
2. 点击 "Add New → Project"
3. 选 "Import Third-Party Git Repository → Deploy without Git"
4. 直接把 `baraka-machinery` 文件夹拖进去
5. 点 "Deploy"，等几十秒就上线了 ✅

**方法二：通过 GitHub 部署**
1. 把 `baraka-machinery` 文件夹推送到你的 GitHub 仓库
2. 打开 https://vercel.com
3. 点击 "Add New → Project"
4. 选择你的 GitHub 仓库
5. 点 "Deploy"

### Option B: Deploy to Netlify
1. 打开 https://app.netlify.com
2. 把 `baraka-machinery` 文件夹拖进去
3. 自动部署完成

### 部署后设置
1. 在 Vercel/Netlify 控制台设置自定义域名（如 baraka-machinery.com）
2. 域名推荐：GoDaddy / Namecheap / 阿里云

## Contact Form Setup

### 方法一：Vercel API（已配置好）
表单目前配置为提交到 `/api/contact` 后端接口。
部署后会自动工作，但默认只记录日志不会发送邮件。
要真正发邮件，在 Vercel 项目设置 → Environment Variables 添加：
- `CONTACT_EMAIL`: kaige899@gmail.com
- `SMTP_HOST`: smtp.gmail.com
- `SMTP_PORT`: 587
- `SMTP_USER`: kaige899@gmail.com
- `SMTP_PASS`: [你的 Gmail 应用专用密码]

### 方法二：Formspree（更简单，无需后端）
如果想立刻用表单，最快的方式是用 Formspree：
1. 打开 https://formspree.io 注册免费账号
2. 创建一个新表单，得到 Form ID（类似 `xyzabc`）
3. 修改 `contact.html` 中的 `<form>` 标签，加上 `action="https://formspree.io/f/你的ID"`
4. 删掉 `js/main.js` 里的 fetch 逻辑，改用 Formspree 的默认提交

## Replace Images

所有产品图片目前用的是 Unsplash 公共图。
要替换成真实机器照片：

1. 把你的机器照片放入 `images/` 文件夹（如 `cat-320d.jpg`）
2. 修改 `js/main.js` 中的 `machines` 数组，把每个机器的 `image` 路径改为本地路径
   例如：`image: 'images/cat-320d.jpg'`

## File Structure
```
baraka-machinery/
├── index.html         # 首页
├── inventory.html     # 产品目录
├── about.html         # 关于我们
├── contact.html       # 联系我们（含表单）
├── css/style.css      # 样式
├── js/main.js         # 交互逻辑
├── api/contact.js     # 联系表单 API（Vercel 后端）
├── vercel.json        # Vercel 配置
├── package.json       # 项目配置
└── .env.example       # 环境变量示例
```
# baraka-machinery
