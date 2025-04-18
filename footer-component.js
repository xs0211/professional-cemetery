// 页脚组件 - 统一版本
class FooterComponent {
    constructor() {
        this.init();
    }

    init() {
        // 获取页脚容器
        const footerContainer = document.getElementById('footer-container');
        if (!footerContainer) {
            console.error('footer-container element not found');
            return;
        }

        // 加载页脚HTML内容
        this.loadFooterContent(footerContainer);
    }

    // 加载页脚内容
    async loadFooterContent(container) {
        try {
            // 获取页脚组件HTML
            const response = await fetch('footer-component.html');
            if (!response.ok) {
                throw new Error(`Failed to load footer component: ${response.status}`);
            }
            
            const html = await response.text();
            container.innerHTML = html;
            
            // 在页脚加载完成后执行其他初始化操作
            this.setupEventListeners();
        } catch (error) {
            console.error('Error loading footer component:', error);
            // 加载失败时显示简单的备用页脚
            container.innerHTML = `
                <footer class="border-t border-gray-700 mt-16 py-6">
                    <div class="max-w-6xl mx-auto px-4 text-center text-gray-400">
                        <p>© 2023 AI职业墓场. 保留所有权利.</p>
                    </div>
                </footer>
            `;
        }
    }

    // 设置事件监听器
    setupEventListeners() {
        // 可以在这里添加页脚中的交互功能
        // 例如订阅表单提交、链接点击统计等
    }
}

// 当DOM加载完成后初始化页脚组件
document.addEventListener('DOMContentLoaded', function() {
    // 检查页脚容器是否存在
    if (document.getElementById('footer-container')) {
        new FooterComponent();
    }
});

// 如果页面是通过动态加载的方式加载的，可以直接初始化
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    if (document.getElementById('footer-container')) {
        new FooterComponent();
    }
} else {
    // 否则等待DOM加载完成
    document.addEventListener('DOMContentLoaded', function() {
        if (document.getElementById('footer-container')) {
            new FooterComponent();
        }
    });
}