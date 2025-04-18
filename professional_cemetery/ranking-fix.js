/**
 * 排行榜页面修复脚本
 * 用于修复排行榜页面登录按钮不显示的问题
 * 
 * 修复内容：
 * 1. 将关键函数移到全局作用域，确保它们可以在任何地方被访问
 * 2. 确保事件监听器在DOM元素加载完成后正确绑定
 * 3. 避免与页面内嵌JavaScript中的函数冲突
 * 4. 添加错误处理和元素存在性检查
 */

// 全局定义模态框相关函数，确保它们在任何地方都可以被访问
let modal, loginTabBtn, registerTabBtn, loginForm, registerForm, closeModal, loginBtn, registerBtn, navAuthElement;

// 显示模态框
window.showModal = function() {
    if (!modal) {
        modal = document.getElementById('auth-modal');
        if (!modal) return;
    }
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    document.body.style.overflow = 'hidden'; // 防止背景滚动
    
    // 确保表单容器可以滚动
    const tabContainer = document.querySelector('.tab-container');
    if (tabContainer) {
        tabContainer.style.maxHeight = 'calc(90vh - 200px)';
        tabContainer.style.overflowY = 'auto';
    }
}

// 隐藏模态框
function hideModal() {
    if (!modal) {
        modal = document.getElementById('auth-modal');
        if (!modal) return;
    }
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // 恢复背景滚动
    }, 300);
}

// 显示登录表单
function showLoginForm() {
    if (!loginTabBtn || !registerTabBtn || !loginForm || !registerForm) return;
    loginTabBtn.classList.add('text-orange-500', 'border-b-2', 'border-orange-500');
    loginTabBtn.classList.remove('text-gray-400');
    registerTabBtn.classList.add('text-gray-400');
    registerTabBtn.classList.remove('text-orange-500', 'border-b-2', 'border-orange-500');
    
    loginForm.classList.remove('hidden');
    registerForm.classList.add('hidden');
}

// 显示注册表单
function showRegisterForm() {
    if (!loginTabBtn || !registerTabBtn || !loginForm || !registerForm) return;
    registerTabBtn.classList.add('text-orange-500', 'border-b-2', 'border-orange-500');
    registerTabBtn.classList.remove('text-gray-400');
    loginTabBtn.classList.add('text-gray-400');
    loginTabBtn.classList.remove('text-orange-500', 'border-b-2', 'border-orange-500');
    
    registerForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
}

// 初始化函数，在DOM加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 等待导航栏加载完成后再执行
    document.addEventListener('navLoaded', function() {
        // 获取所有需要的DOM元素
        modal = document.getElementById('auth-modal');
        loginTabBtn = document.getElementById('login-tab-btn');
        registerTabBtn = document.getElementById('register-tab-btn');
        loginForm = document.getElementById('login-form');
        registerForm = document.getElementById('register-form');
        closeModal = document.getElementById('close-modal');
        loginBtn = document.getElementById('login-btn');
        registerBtn = document.getElementById('register-btn');
        navAuthElement = document.getElementById('nav-auth');
        
        // 如果导航栏元素不存在，则不执行后续代码
        if (!navAuthElement) {
            console.error('导航栏认证元素不存在，请检查导航栏是否正确加载');
            return;
        }
        
        // 使用全局定义的showModal函数，不再在这里定义
        
        // 使用全局定义的showLoginForm和showRegisterForm函数，不再在这里定义
        
        // 检查用户是否已登录
        window.checkLoginStatus = function() {
            if (!navAuthElement) {
                navAuthElement = document.getElementById('nav-auth');
                if (!navAuthElement) return;
            }
            
            const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
            const userEmail = localStorage.getItem('userEmail');
            const userName = localStorage.getItem('userName') || '用户';
            
            if (isLoggedIn && userEmail) {
                // 用户已登录，显示用户头像和下拉菜单
                const userInitial = userName.charAt(0).toUpperCase();
                navAuthElement.innerHTML = `
                    <div class="relative group">
                        <a href="profile.html" class="flex items-center space-x-2 py-2 px-2 text-gray-300 font-semibold hover:text-orange-500 transition duration-300">
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
                const logoutBtn = document.getElementById('logout-btn');
                if (logoutBtn) {
                    logoutBtn.addEventListener('click', function(e) {
                        e.preventDefault();
                        localStorage.removeItem('isLoggedIn');
                        localStorage.removeItem('userEmail');
                        localStorage.removeItem('userName');
                        window.location.reload();
                    });
                }
            } else {
                // 用户未登录，显示登录按钮
                navAuthElement.innerHTML = `
                    <button id="show-auth-modal" class="py-2 px-4 text-white rounded-md hover:opacity-90 transition duration-300 text-sm tracking-wide" style="background: linear-gradient(135deg, #E85002 0%, #3b82f6 100%);">
                        账户登录
                    </button>
                `;
                
                // 添加显示模态框的事件
                const showAuthModalBtn = document.getElementById('show-auth-modal');
                if (showAuthModalBtn) {
                    // 清除所有可能的事件监听器
                    const newBtn = showAuthModalBtn.cloneNode(true);
                    showAuthModalBtn.parentNode.replaceChild(newBtn, showAuthModalBtn);
                    newBtn.addEventListener('click', window.showModal);
                    console.log('登录按钮事件已重新绑定');
                }
            }
        }
        
        checkLoginStatus();
        
        // 绑定事件
        if (loginTabBtn && registerTabBtn && closeModal) {
            // 移除可能存在的旧事件监听器，避免重复绑定
            loginTabBtn.removeEventListener('click', showLoginForm);
            registerTabBtn.removeEventListener('click', showRegisterForm);
            closeModal.removeEventListener('click', hideModal);
            
            // 添加新的事件监听器
            loginTabBtn.addEventListener('click', showLoginForm);
            registerTabBtn.addEventListener('click', showRegisterForm);
            closeModal.addEventListener('click', hideModal);
            
            // 点击模态框背景关闭
            if (modal) {
                modal.addEventListener('click', function(e) {
                    if (e.target === modal) {
                        hideModal();
                    }
                });
            }
        }
        
        // 登录功能
        if (loginBtn) {
            // 移除可能存在的旧事件监听器
            loginBtn.removeEventListener('click', handleLogin);
            
            // 添加新的事件监听器
            loginBtn.addEventListener('click', handleLogin);
        }
        
        // 登录处理函数
        function handleLogin() {
            const email = document.getElementById('login-email')?.value || '';
            const password = document.getElementById('login-password')?.value || '';
            const remember = document.getElementById('remember-me')?.checked || false;
            
            // 这里是简单的模拟登录，实际应用中应该有后端验证
            if (email && password) {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userEmail', email);
                localStorage.setItem('userName', email.split('@')[0]);
                
                // 生成随机头像颜色
                const colors = ['bg-blue-100', 'bg-green-100', 'bg-purple-100', 'bg-pink-100', 'bg-indigo-100'];
                const textColors = ['text-blue-600', 'text-green-600', 'text-purple-600', 'text-pink-600', 'text-indigo-600'];
                const randomIndex = Math.floor(Math.random() * colors.length);
                
                localStorage.setItem('userAvatarColor', colors[randomIndex]);
                localStorage.setItem('userAvatarTextColor', textColors[randomIndex]);
                
                // 隐藏模态框并刷新页面以显示登录状态
                hideModal();
                setTimeout(() => {
                    window.location.reload();
                }, 300);
            }
        }
        
        // 如果存在注册按钮，也添加事件监听
        if (registerBtn) {
            // 移除可能存在的旧事件监听器
            registerBtn.removeEventListener('click', handleRegister);
            
            // 添加新的事件监听器
            registerBtn.addEventListener('click', handleRegister);
        }
        
        // 注册处理函数
        function handleRegister() {
            const name = document.getElementById('register-name')?.value || '';
            const email = document.getElementById('register-email')?.value || '';
            const password = document.getElementById('register-password')?.value || '';
            
            // 简单的模拟注册，实际应用中应该有后端验证
            if (name && email && password) {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userEmail', email);
                localStorage.setItem('userName', name);
                
                // 生成随机头像颜色
                const colors = ['bg-blue-100', 'bg-green-100', 'bg-purple-100', 'bg-pink-100', 'bg-indigo-100'];
                const textColors = ['text-blue-600', 'text-green-600', 'text-purple-600', 'text-pink-600', 'text-indigo-600'];
                const randomIndex = Math.floor(Math.random() * colors.length);
                
                localStorage.setItem('userAvatarColor', colors[randomIndex]);
                localStorage.setItem('userAvatarTextColor', textColors[randomIndex]);
                
                // 隐藏模态框并刷新页面以显示登录状态
                hideModal();
                setTimeout(() => {
                    window.location.reload();
                }, 300);
            }
        }
    });
}); // 关闭DOMContentLoaded事件监听器