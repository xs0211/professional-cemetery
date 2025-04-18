# 导航栏组件使用说明

## 概述

本项目实现了一个可复用的导航栏组件，包含以下功能：

- 统一的导航栏外观和交互
- 自动高亮当前页面的导航项
- 登录/注册模态框
- 用户登录状态管理
- 用户头像和下拉菜单

## 文件结构

- `nav-include.html` - 导航栏HTML结构和样式
- `nav-component.js` - 导航栏交互功能脚本
- `load-nav.js` - 导航栏加载器脚本

## 如何在页面中使用

### 1. 在HTML文件的`<head>`部分添加导航栏加载器脚本

```html
<!-- 导航栏组件加载器 -->
<script src="load-nav.js"></script>
```

### 2. 在HTML文件的`<body>`开始处添加导航栏容器

```html
<!-- 导航栏容器 -->
<div id="nav-container"></div>
```

### 3. 确保以下文件存在于项目根目录

- `nav-include.html`
- `nav-component.js`
- `load-nav.js`

## 工作原理

1. 当页面加载时，`load-nav.js`脚本会查找ID为`nav-container`的元素
2. 脚本使用fetch API加载`nav-include.html`的内容并插入到容器中
3. 导航栏加载完成后，`nav-component.js`脚本会自动执行以下操作：
   - 根据当前页面URL高亮对应的导航项
   - 检查用户登录状态并更新UI
   - 初始化模态框和登录/注册功能

## 自定义导航项

如需添加或修改导航项，请编辑`nav-include.html`文件中的导航链接部分：

```html
<div class="flex items-center space-x-4">
    <a href="index.html" id="nav-home" class="py-4 px-2 text-gray-300 hover:text-orange-500 transition duration-300 text-sm tracking-wide">首页</a>
    <a href="ranking.html" id="nav-ranking" class="py-4 px-2 text-gray-300 hover:text-orange-500 transition duration-300 text-sm tracking-wide">排行榜</a>
    <!-- 添加新的导航项 -->
</div>
```

如需支持新导航项的高亮，请在`nav-component.js`文件的`highlightCurrentNav`函数中添加相应的逻辑。

## 用户认证

当前实现使用localStorage模拟用户登录状态，实际项目中应替换为真实的后端认证系统。