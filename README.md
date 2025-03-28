# 职业墓场 (Professional Cemetery)

## 项目概述

"职业墓场"是一个专注于AI时代职业发展趋势分析的网站，帮助用户了解自己的职业在未来可能面临的AI替代风险，并提供相应的职业发展建议。

## 功能特点

- **职业搜索**：用户可以搜索特定职业，查看该职业的AI替代风险分析
- **职业排行榜**：展示高风险、低风险和已消亡的职业排行
- **职业风险测评**：通过回答一系列问题，评估用户当前职业的AI替代风险
- **个人主页**：用户可以查看自己的测评历史记录
- **用户系统**：支持用户注册、登录和个人信息管理

## 技术栈

- 前端：HTML5, CSS3 (Tailwind CSS), JavaScript
- 存储：LocalStorage (客户端存储用户数据和测评记录)
- 动画：Animate.css
- 响应式设计：适配各种屏幕尺寸的设备

## 页面说明

- **首页 (index.html)**：网站主页，提供职业搜索、热门职业展示和用户评价
- **职业排行榜 (ranking.html)**：展示不同风险级别的职业排行
- **职业测评 (assessment.html)**：提供职业风险测评问卷
- **测评结果 (assessment_result.html)**：展示测评结果和职业发展建议
- **搜索结果 (query_result.html)**：展示特定职业的详细分析
- **个人主页 (profile.html)**：用户个人信息和测评历史
- **登录/注册 (login.html, register.html)**：用户账号管理

## 本地运行

1. 克隆本仓库到本地
2. 使用现代浏览器打开 `index.html` 文件
3. 无需安装其他依赖，所有外部库都通过CDN加载

## 数据存储

本项目使用浏览器的LocalStorage存储用户数据和测评记录，包括：

- 用户登录状态 (`isLoggedIn`)
- 用户邮箱 (`userEmail`)
- 用户名称 (`userName`)
- 测评记录 (`assessmentRecords`)

## 项目特色

1. **直观的风险评估**：通过可视化图表直观展示职业风险
2. **个性化建议**：根据测评结果提供针对性的职业发展建议
3. **响应式设计**：在各种设备上都能获得良好的用户体验
4. **无后端设计**：纯前端实现，无需服务器支持，便于部署和使用

## 未来计划

- 增加更多职业数据和分析
- 添加职业技能推荐功能
- 实现社区讨论功能
- 提供更详细的行业报告

## 贡献指南

欢迎对本项目提出建议或贡献代码。请遵循以下步骤：

1. Fork 本仓库
2. 创建您的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 Pull Request

## 许可证

本项目采用 MIT 许可证 - 详情请参阅 LICENSE 文件

## 联系方式

项目维护者：您的名字 - 您的邮箱

项目链接：[https://github.com/yourusername/professional-cemetery](https://github.com/yourusername/professional-cemetery) 