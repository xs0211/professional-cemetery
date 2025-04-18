// assessment.html页面修复脚本
document.addEventListener('DOMContentLoaded', function() {
    // 检查是否已经有导航栏内容
    const navContainer = document.getElementById('nav-container');
    
    // 如果导航栏容器已经有内容，阻止nav-component.js再次加载导航栏
    if (navContainer && navContainer.innerHTML.trim() !== '') {
        // 创建一个自定义事件，通知nav-component.js导航栏已加载
        const event = new CustomEvent('navLoaded');
        document.dispatchEvent(event);
        
        // 移除已有的导航栏内容，让nav-component.js正确加载
        navContainer.innerHTML = '';
    }
    
    // 确保表单和样式正确应用
    // 修复单选按钮样式
    document.querySelectorAll('.custom-radio').forEach(radio => {
        radio.addEventListener('change', function() {
            // 移除所有同名单选按钮的选中样式
            document.querySelectorAll(`input[name="${this.name}"] + label span:first-child`).forEach(span => {
                span.classList.remove('bg-blue-500');
                span.classList.remove('border-blue-500');
            });
            
            // 添加当前选中单选按钮的样式
            if (this.checked) {
                const span = this.nextElementSibling.querySelector('span:first-child');
                span.classList.add('bg-blue-500');
                span.classList.add('border-blue-500');
            }
        });
    });
});