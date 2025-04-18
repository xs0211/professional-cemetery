// 导航栏组件 - 统一版本
class NavComponent {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    // 高亮当前导航项
    highlightCurrentNav() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('nav a');
        
        navLinks.forEach(link => {
            // 获取链接的href属性
            const linkHref = link.getAttribute('href');
            // 检查当前页面路径是否与链接的href匹配（忽略查询参数和锚点）
            if (linkHref === currentPage || currentPage.startsWith(linkHref.split('?')[0].split('#')[0])) {
                // 移除默认的灰色文本和悬停效果
                link.classList.remove('text-gray-300', 'hover:text-orange-500');
                // 添加选中状态样式 - 文字颜色和字体粗细
                link.classList.add('text-orange-500', 'font-semibold');
            }
        });
    }

    // 检查登录状态
    checkLoginStatus() {
        const authContainer = document.getElementById('nav-auth');
        if (!authContainer) {
            console.error('nav-auth element not found');
            return false;
        }

        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const userEmail = localStorage.getItem('userEmail');
        const userName = localStorage.getItem('userName') || '用户';

        if (isLoggedIn && userEmail) {
            // 用户已登录 - 显示用户信息
            const userInitial = userName.charAt(0).toUpperCase();
            authContainer.innerHTML = `
                <div class="relative group">
                    <a href="profile.html" class="flex items-center space-x-2 text-gray-300 hover:text-orange-500 transition duration-300">
                        <div class="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-orange-500 font-bold">
                            ${userInitial}
                        </div>
                        <span class="hidden md:inline">${userName}</span>
                    </a>
                    <div class="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 hidden group-hover:block z-10">
                        <a href="profile.html" class="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">个人主页</a>
                        <a href="#" id="logout-btn" class="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">退出登录</a>
                    </div>
                </div>
            `;
            
            // 添加退出登录功能
            document.getElementById('logout-btn').addEventListener('click', (e) => {
                e.preventDefault();
                this.handleLogout();
            });
        } else {
            // 用户未登录 - 显示登录按钮
            authContainer.innerHTML = `
                <button id="show-auth-modal" class="py-2 px-4 text-white rounded-md hover:opacity-90 transition duration-300 text-sm tracking-wide" style="background: linear-gradient(135deg, #E85002 0%, #3b82f6 100%);">
                    账户登录
                </button>
            `;
            
            // 添加登录按钮点击事件
            const showAuthModalBtn = document.getElementById('show-auth-modal');
            if (showAuthModalBtn && typeof window.showModal === 'function') {
                // 清除所有可能的事件监听器
                const newBtn = showAuthModalBtn.cloneNode(true);
                showAuthModalBtn.parentNode.replaceChild(newBtn, showAuthModalBtn);
                
                // 添加新的事件监听器
                newBtn.addEventListener('click', () => {
                    window.showModal();
                    // 确保显示登录表单
                    const loginTabBtn = document.getElementById('login-tab-btn');
                    if (loginTabBtn) loginTabBtn.click();
                });
            }
        }
    }

    // 处理退出登录
    handleLogout() {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userName');
        window.location.reload();
    }

    // 初始化模态框事件
    async initModalEvents() {
        const loaded = await this.loadModalComponent();
        if (!loaded) return;

        const modal = document.getElementById('auth-modal');
        const closeModal = document.getElementById('close-modal');
        const loginTabBtn = document.getElementById('login-tab-btn');
        const registerTabBtn = document.getElementById('register-tab-btn');
        const loginForm = document.getElementById('login-form');
        const registerForm = document.getElementById('register-form');
        const loginBtn = document.getElementById('login-btn');
        const registerBtn = document.getElementById('register-btn');

        // 显示模态框函数
        window.showModal = () => {
            modal.style.display = 'block';
            setTimeout(() => modal.classList.add('show'), 10);
        };

        // 隐藏模态框函数
        window.hideModal = () => {
            modal.classList.remove('show');
            setTimeout(() => modal.style.display = 'none', 300);
        };

        // 点击模态框背景关闭
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) window.hideModal();
            });
        }

        // 关闭按钮事件
        if (closeModal) {
            closeModal.addEventListener('click', window.hideModal);
        }

        // 切换登录/注册表单
        if (loginTabBtn) {
            loginTabBtn.addEventListener('click', () => {
                loginForm.classList.remove('hidden');
                registerForm.classList.add('hidden');
                loginTabBtn.classList.add('text-orange-500', 'border-orange-500');
                loginTabBtn.classList.remove('text-gray-400', 'border-transparent');
                registerTabBtn.classList.add('text-gray-400', 'border-transparent');
                registerTabBtn.classList.remove('text-orange-500', 'border-orange-500');
            });
        }

        if (registerTabBtn) {
            registerTabBtn.addEventListener('click', () => {
                registerForm.classList.remove('hidden');
                loginForm.classList.add('hidden');
                registerTabBtn.classList.add('text-orange-500', 'border-orange-500');
                registerTabBtn.classList.remove('text-gray-400', 'border-transparent');
                loginTabBtn.classList.add('text-gray-400', 'border-transparent');
                loginTabBtn.classList.remove('text-orange-500', 'border-orange-500');
            });
        }

        // 登录按钮事件
        if (loginBtn) {
            loginBtn.addEventListener('click', this.handleLogin.bind(this));
        }

        // 注册按钮事件
        if (registerBtn) {
            registerBtn.addEventListener('click', this.handleRegister.bind(this));
        }
    }

    // 加载模态框组件
    loadModalComponent() {
        return fetch('modal-component.html')
            .then(response => response.text())
            .then(html => {
                document.body.insertAdjacentHTML('beforeend', html);
                return true;
            })
            .catch(error => {
                console.error('加载模态框组件失败:', error);
                return false;
            });
    }

    // 处理登录
    handleLogin() {
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        if (!email || !password) {
            alert('请填写邮箱和密码');
            return;
        }
        
        // 模拟登录成功
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userName', email.split('@')[0]);
        
        // 隐藏模态框并刷新页面
        if (typeof window.hideModal === 'function') {
            window.hideModal();
        }
        location.reload();
    }
    
    // 处理注册
    handleRegister() {
        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm-password').value;
        const agreeTerms = document.getElementById('agree-terms').checked;
        
        if (!name || !email || !password || !confirmPassword) {
            alert('请填写所有必填字段');
            return;
        }
        
        if (password !== confirmPassword) {
            alert('两次输入的密码不一致');
            return;
        }
        
        if (!agreeTerms) {
            alert('请同意隐私协议和使用条款');
            return;
        }
        
        // 模拟注册成功
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userName', name);
        
        // 隐藏模态框并刷新页面
        if (typeof window.hideModal === 'function') {
            window.hideModal();
        }
        location.reload();
    }

    // 初始化所有导航功能
    async initNavFunctions() {
        try {
            const navContainer = document.getElementById('nav-container');
            
            if (!navContainer) {
                // 创建nav-container如果不存在
                const newNavContainer = document.createElement('div');
                newNavContainer.id = 'nav-container';
                document.body.insertBefore(newNavContainer, document.body.firstChild);
            } else if (navContainer.innerHTML.trim() !== '') {
                // 如果导航栏容器已有内容，只初始化功能，不重新加载HTML
                this.highlightCurrentNav();
                await this.initModalEvents();
                this.checkLoginStatus();
                return;
            }
            
            // 加载导航栏HTML
            const response = await fetch('nav-component.html');
            const html = await response.text();
            document.getElementById('nav-container').innerHTML = html;
            
            // 初始化功能
            this.highlightCurrentNav();
            
            // 先加载模态框组件，再初始化其他功能
            await this.initModalEvents();
            this.checkLoginStatus();
        } catch (error) {
            console.error('初始化导航栏失败:', error);
        }
    }

    // 添加事件监听器
    setupEventListeners() {
        // 使用标志变量避免重复初始化
        let isInitialized = false;
        
        const initOnce = () => {
            if (!isInitialized) {
                this.initNavFunctions();
                isInitialized = true;
            }
        };
        
        document.addEventListener('DOMContentLoaded', initOnce);
        document.addEventListener('navLoaded', initOnce);
    }
}

// 创建导航组件实例
new NavComponent();
