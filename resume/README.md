# 📱 Resume Center - Mobile Prototype

高级移动端简历管理原型，采用 iPhone 17 Pro Max 尺寸设计。

![Version](https://img.shields.io/badge/version-2.0-blue)
![Device](https://img.shields.io/badge/device-iPhone%2017%20Pro%20Max-purple)
![Status](https://img.shields.io/badge/status-Prototype-green)

## ✨ 特性

- 🎨 **现代化设计** - 采用渐变色、玻璃态效果和流畅动画
- 📱 **iPhone 17 Pro Max** - 430 x 932 像素，支持 Dynamic Island
- 🤖 **AI 分析模拟** - 简历智能评分和建议系统
- 💎 **高级交互** - 触觉反馈、平滑过渡和微动画
- 📊 **可视化评分** - 直观的分数展示和等级系统
- 🎯 **优先级建议** - 彩色编码的改进建议

## 📁 项目结构

```
resume/
├── index.html              # 主 HTML 文件（干净简洁）
├── css/
│   ├── mobile-frame.css   # 手机模拟器外壳样式
│   └── resume-custom.css  # Resume 功能自定义样式
├── js/
│   └── resume-logic.js    # 交互逻辑和动画
└── README.md              # 本文档
```

## 🚀 快速开始

### 1. 打开原型

直接在浏览器中打开 `index.html`：

```bash
# 使用本地服务器（推荐）
cd resume
python3 -m http.server 8000

# 或者使用 VS Code Live Server
# 右键 index.html -> Open with Live Server
```

然后访问：`http://localhost:8000`

### 2. 功能演示流程

**基础流程：**
1. 点击 "New Resume" 创建简历
2. 选择 "Upload PDF" 或 "Use Template"
3. 上传完成后点击 "AI Analyze" 
4. 查看分析报告和建议
5. 使用 "Preview" 和 "Edit" 功能

**完整功能：**
- ✅ 简历上传（模拟）
- ✅ AI 分析进度条
- ✅ 评分展示（0-100分，A-F等级）
- ✅ 优先级建议（高/中/低）
- ✅ PDF 预览
- ✅ 简历编辑界面
- ✅ Toast 通知提示

## 🎨 设计规范

### 设备规格

| 属性 | 值 |
|------|-----|
| 设备型号 | iPhone 17 Pro Max |
| 屏幕尺寸 | 430 x 932 px |
| 圆角半径 | 55px |
| Dynamic Island | 125 x 37 px |

### 配色方案

```css
/* 主色调 - 紫色渐变 */
--primary: linear-gradient(135deg, #667eea, #764ba2);

/* 功能色 */
--gold: linear-gradient(135deg, #FFD700, #FFA500);    /* 积分 */
--high-priority: linear-gradient(135deg, #FFE5E5, #FFB3B3);  /* 高优先级 */
--medium-priority: linear-gradient(135deg, #FFF9E6, #FFE5B3); /* 中优先级 */
--low-priority: linear-gradient(135deg, #E8F4FD, #CDDAFD);    /* 低优先级 */
```

### 交互规范

- **按钮最小高度**: 52px（符合苹果 HIG 标准）
- **触摸反馈**: `transform: scale(0.97)`
- **动画时长**: 0.3s (标准), 0.2s (快速)
- **卡片间距**: 12px (小), 24px (标准), 32px (大)

## 🔧 技术细节

### 依赖项

- **Style Library** - 基础组件库（相对引用 `../Style_Library/`）
- **Font Awesome 6.4.0** - 图标库
- **无其他依赖** - 纯 HTML/CSS/JavaScript

### 浏览器兼容性

- ✅ Chrome 88+ 
- ✅ Safari 14+
- ✅ Firefox 85+
- ✅ Edge 88+

需要支持：
- CSS Variables
- CSS Grid & Flexbox
- `backdrop-filter` (玻璃态效果)
- ES6 JavaScript

## 📝 自定义指南

### 修改颜色主题

编辑 `css/resume-custom.css`：

```css
/* 修改主色调 */
.hero-card {
    background: linear-gradient(135deg, #你的颜色1, #你的颜色2) !important;
}

.page-title {
    background: linear-gradient(135deg, #你的颜色1, #你的颜色2);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
```

### 修改手机尺寸

编辑 `css/mobile-frame.css`：

```css
.mobile-wrapper {
    width: 393px;   /* iPhone 15 Pro */
    height: 852px;
}
```

### 添加新建议类型

编辑 `js/resume-logic.js` 的 `generateSuggestions()` 函数：

```javascript
const suggestions = [
    {
        icon: '🚀',
        title: '你的标题',
        desc: '你的描述',
        priority: 'high' // 或 'medium', 'low'
    },
    // ... 更多建议
];
```

## 🎯 User Story 映射

本原型对应的 User Story：

> **作为** 求职学生  
> **我想要** 在移动端快速上传和分析我的简历  
> **以便** 获得 AI 驱动的优化建议并提高求职成功率

**关键场景：**
1. ✅ 移动端简历上传（PDF）
2. ✅ AI 智能分析和评分
3. ✅ 分级建议展示（按优先级）
4. ✅ 简历预览和编辑
5. ✅ 积分系统展示

## 📊 性能优化

- **CSS 分离** - 模块化加载，便于维护
- **动画优化** - 使用 `transform` 和 `opacity`（GPU 加速）
- **懒加载** - 建议列表按需生成
- **无图片依赖** - 使用 Emoji 和图标字体

## 🐛 已知限制

- ⚠️ 本原型为**静态演示**，无后端集成
- ⚠️ PDF 上传为**模拟功能**，未实际解析
- ⚠️ AI 分析为**前端动画**，无真实 AI 调用
- ⚠️ 数据不会持久化保存

## 🔮 未来扩展方向

- [ ] 集成真实的 PDF 解析 API
- [ ] 连接后端 AI 分析服务
- [ ] 添加更多简历模板
- [ ] 支持简历导出（PDF/Word）
- [ ] 实现简历版本历史
- [ ] 添加求职追踪功能

## 📄 许可证

本原型仅供教育和演示用途。

---

**开发团队**: IPD L5S4 Group 1  
**更新日期**: 2025-12-01  
**联系方式**: [项目仓库](https://github.com/your-repo)

## 🎉 致谢

- Style Library - 提供基础组件
- Font Awesome - 图标支持
- Apple HIG - 设计指导

