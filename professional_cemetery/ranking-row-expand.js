/**
 * 排行榜行点击展开详情功能
 * 用于修复排行榜页面点击单行数据无法展开的问题
 */

// 确保在DOM完全加载后执行
window.addEventListener('load', function() {
    initializeRowExpandFunctionality();
});

// 初始化行点击展开功能
function initializeRowExpandFunctionality() {
    // 获取所有职业行元素（排除详情行）
    // 使用更精确的选择器，确保能选中所有表格中的数据行
    const jobRows = document.querySelectorAll('tbody tr:not([id^="job-"]):not([id^="low-job-"]):not([id^="extinct-job-"])');
    
    console.log('找到排行榜行元素数量:', jobRows.length);
    
    if (jobRows.length === 0) {
        // 如果没有找到行元素，可能是选择器问题，尝试更宽松的选择器
        console.log('未找到排行榜行元素，尝试备用选择器');
        setTimeout(function() {
            const alternativeRows = document.querySelectorAll('tbody tr');
            console.log('备用选择器找到行元素数量:', alternativeRows.length);
            
            // 过滤掉详情行
            const filteredRows = Array.from(alternativeRows).filter(row => {
                return !row.id || !(row.id.startsWith('job-') || row.id.startsWith('low-job-') || row.id.startsWith('extinct-job-'));
            });
            
            console.log('过滤后的行元素数量:', filteredRows.length);
            attachEventListeners(filteredRows);
        }, 500);
    } else {
        // 找到了行元素，直接添加事件监听器
        attachEventListeners(jobRows);
    }
}

// 为行元素添加事件监听器
function attachEventListeners(rows) {
    rows.forEach(row => {
        // 移除可能已存在的事件监听器，避免重复
        const newRow = row.cloneNode(true);
        row.parentNode.replaceChild(newRow, row);
        
        newRow.addEventListener('click', function(e) {
            // 如果点击的是查看详情按钮，不执行行点击事件，避免冲突
            if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
                return;
            }
            
            // 获取当前行的排名数字
            const rowId = this.cells[0].textContent.trim();
            console.log('点击了行，ID:', rowId);
            
            // 根据当前所在的表格区域确定前缀
            let prefix = 'job-';
            const parentTable = this.closest('table');
            const parentSection = parentTable ? parentTable.closest('[id]') : null;
            
            if (parentSection) {
                if (parentSection.id === 'low-risk-content') {
                    prefix = 'low-job-';
                } else if (parentSection.id === 'extinct-content') {
                    prefix = 'extinct-job-';
                }
            }
            
            // 移除前导零并构建详情行ID
            const detailsId = prefix + rowId.replace(/^0+/, '');
            console.log('尝试展开详情行:', detailsId);
            const detailsRow = document.getElementById(detailsId);
            
            if (detailsRow) {
                // 切换详情行的显示/隐藏状态
                detailsRow.classList.toggle('hidden');
                console.log('详情行状态切换成功');
                
                // 添加高亮效果到当前行
                this.classList.toggle('bg-gray-750');
                
                // 关闭其他已展开的详情行
                const allDetailRows = document.querySelectorAll(`tr[id^="${prefix}"]`);
                allDetailRows.forEach(detailRow => {
                    if (detailRow.id !== detailsId && !detailRow.classList.contains('hidden')) {
                        detailRow.classList.add('hidden');
                        
                        // 查找并移除其他行的高亮效果
                        rows.forEach(parentRow => {
                            const parentRowId = parentRow.cells[0].textContent.trim().replace(/^0+/, '');
                            if (detailRow.id === prefix + parentRowId) {
                                parentRow.classList.remove('bg-gray-750');
                            }
                        });
                    }
                });
            } else {
                console.log('未找到对应的详情行');
            }
        });
        
        // 添加鼠标悬停效果和指针样式
        newRow.classList.add('cursor-pointer');
        newRow.style.cursor = 'pointer';
    });
    
    // 添加CSS样式以确保正确的视觉效果
    if (!document.getElementById('ranking-row-styles')) {
        const style = document.createElement('style');
        style.id = 'ranking-row-styles';
        style.textContent = `
            tbody tr:not([id^="job-"]):not([id^="low-job-"]):not([id^="extinct-job-"]):hover {
                background-color: rgba(75, 85, 99, 0.5);
            }
            .bg-gray-750 {
                background-color: rgba(55, 65, 81, 0.8);
            }
            .cursor-pointer {
                cursor: pointer;
            }
        `;
        document.head.appendChild(style);
    }
}