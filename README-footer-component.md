# 页脚组件使用说明

## 概述

页脚组件是一个可重用的页面元素，用于在所有页面底部显示统一的页脚信息。类似于导航栏组件，它可以轻松地集成到任何页面中，并提供一致的用户体验。

## 使用方法

### 1. 添加必要的脚本和容器

在每个HTML页面中，添加以下代码：

```html
<!-- 在页面底部添加页脚容器 -->
<div id="footer-container"></div>

<!-- 加载页脚组件脚本 -->
<script src="footer-component.js"></script>
```

### 2. 删除现有的页脚代码

如果页面中已有页脚代码，请将其删除，例如：

```html
<!-- 删除这段代码 -->
<footer class="bg-gray-800 border-t border-gray-700 mt-16 py-6">
    <div class="max-w-6xl mx-auto px-4 text-center text-gray-400">
        <p>© 2023 AI职业墓场. 保留所有权利.</p>
    </div>
</footer>
```

### 3. 确保脚本正确加载

确保`footer-component.js`和`footer-component.html`文件位于网站根目录下，以便正确加载。

## 自定义

如果需要修改页脚内容或样式，只需编辑`footer-component.html`文件，所有页面的页脚将自动更新。

## 注意事项

- 页脚组件会自动适应不同的页面主题（深色/浅色）
- 确保在页面底部添加页脚容器，通常在`</body>`标签之前
- 如果页脚没有正确显示，请检查控制台是否有错误信息