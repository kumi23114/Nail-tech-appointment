# 美甲師預約系統

一個完整的美甲師預約管理系統，包含客戶預約、美甲師管理、自動可用性檢查和即時通知功能。

## 功能特色

### 🎨 客戶功能
- **線上預約**：24小時隨時預約美甲服務
- **自動可用性檢查**：實時檢查美甲師可用時間
- **服務選擇**：多種美甲服務供選擇
- **預約確認**：即時收到預約確認通知

### 💅 美甲師功能
- **工作面板**：查看和管理個人預約
- **狀態管理**：標記預約完成或取消
- **在線狀態**：顯示美甲師在線/離線狀態
- **即時通知**：收到新預約通知

### 📊 管理功能
- **數據統計**：查看預約、營收等統計數據
- **美甲師管理**：管理美甲師信息和服務
- **預約管理**：查看所有預約記錄
- **系統監控**：實時監控系統狀態

### 🔔 通知系統
- **Socket.IO 實時通知**：新預約、狀態更新等即時通知
- **郵件通知**：可配置 SMTP 郵件通知
- **Toast 通知**：用戶友好的界面通知

## 技術架構

### 後端 (Node.js + Express)
- **Express.js**：Web 框架
- **Socket.IO**：實時通信
- **Moment.js**：時間處理
- **Nodemailer**：郵件發送
- **UUID**：唯一標識符生成

### 前端 (React)
- **React 18**：用戶界面框架
- **React Router**：路由管理
- **Axios**：HTTP 客戶端
- **React DatePicker**：日期選擇器
- **React Toastify**：通知組件
- **Lucide React**：圖標庫

## 安裝和運行

### 前置要求
- Node.js (版本 14 或更高)
- npm 或 yarn

### 安裝步驟

1. **克隆項目**
```bash
git clone <repository-url>
cd nail-tech-appointment
```

2. **安裝後端依賴**
```bash
npm install
```

3. **安裝前端依賴**
```bash
cd client
npm install
cd ..
```

4. **啟動開發服務器**

**選項 1：分別啟動**
```bash
# 啟動後端服務器 (端口 5000)
npm run dev

# 新終端窗口，啟動前端開發服務器 (端口 3000)
cd client
npm start
```

**選項 2：使用腳本**
```bash
# 同時啟動前後端
npm run dev
```

5. **訪問應用**
- 前端：http://localhost:3000
- 後端 API：http://localhost:5000

## 項目結構

```
nail-tech-appointment/
├── server.js              # 後端主文件
├── package.json           # 後端依賴
├── README.md             # 項目說明
└── client/               # 前端 React 應用
    ├── public/           # 靜態文件
    ├── src/              # 源代碼
    │   ├── components/   # React 組件
    │   ├── pages/        # 頁面組件
    │   ├── App.js        # 主應用組件
    │   └── index.js      # 入口文件
    └── package.json      # 前端依賴
```

## API 端點

### 美甲師管理
- `GET /api/techs` - 獲取所有美甲師
- `POST /api/techs` - 創建新美甲師

### 服務管理
- `GET /api/services` - 獲取所有服務
- `POST /api/services` - 創建新服務

### 預約管理
- `GET /api/appointments` - 獲取預約列表
- `POST /api/appointments` - 創建新預約
- `PUT /api/appointments/:id` - 更新預約狀態
- `DELETE /api/appointments/:id` - 取消預約

### 可用性檢查
- `POST /api/check-availability` - 檢查時間可用性

## 配置說明

### 郵件通知配置
在 `server.js` 中配置 SMTP 設置：

```javascript
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-app-password'
  }
});
```

### 環境變量
創建 `.env` 文件：

```env
PORT=5000
NODE_ENV=development
```

## 使用說明

### 客戶預約流程
1. 訪問首頁，點擊「立即預約」
2. 填寫個人信息
3. 選擇美甲師和服務
4. 選擇日期和可用時間
5. 提交預約申請
6. 收到預約確認通知

### 美甲師工作流程
1. 登入美甲師面板
2. 查看今日預約
3. 管理預約狀態（確認/完成/取消）
4. 接收新預約通知

### 管理員操作
1. 登入管理員面板
2. 查看系統統計數據
3. 管理美甲師和服務
4. 監控預約情況

## 開發說明

### 添加新功能
1. 在後端添加新的 API 端點
2. 在前端創建對應的組件
3. 更新路由配置
4. 測試功能

### 自定義樣式
- 修改 `client/src/index.css` 全局樣式
- 在各組件中使用內聯樣式或 styled-components

### 數據庫集成
目前使用內存存儲，可集成 MongoDB、MySQL 等數據庫：

```javascript
// 示例：MongoDB 集成
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nail-tech');
```

## 部署

### 生產環境構建
```bash
# 構建前端
cd client
npm run build

# 啟動生產服務器
npm start
```

### Docker 部署
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN cd client && npm install && npm run build
EXPOSE 5000
CMD ["npm", "start"]
```

## 貢獻

歡迎提交 Issue 和 Pull Request！

## 授權

MIT License

## 聯繫

如有問題，請聯繫開發團隊。
