/**
 * Main Script for Style Library
 * Handles interactions like Navbar toggle and dynamic behaviors
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Navbar Toggle Logic
    const navbarToggler = document.getElementById('navbarToggler');
    const navbarMenu = document.getElementById('navbarMenu');

    if (navbarToggler && navbarMenu) {
        navbarToggler.addEventListener('click', () => {
            navbarMenu.classList.toggle('active');
            
            // Optional: Animate hamburger icon (transform to X)
            const spans = navbarToggler.querySelectorAll('span');
            if (navbarMenu.classList.contains('active')) {
                // Simple animation logic if needed
            }
        });
    }

    // 2. Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navbarMenu.classList.remove('active');
            }
        });
    });

    // 3. Tabs Interaction Logic
    const allTabGroups = document.querySelectorAll('[data-tabs]');
    
    allTabGroups.forEach(tabGroup => {
        const tabButtons = tabGroup.querySelectorAll('.tab-btn');
        const tabContents = tabGroup.querySelectorAll('.tab-content');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.getAttribute('data-tab');
                
                // Remove active class from all buttons and contents in this group
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked button and corresponding content
                button.classList.add('active');
                const targetContent = tabGroup.querySelector(`[data-content="${targetTab}"]`);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });
    });

    // Future: Add logic for Career Map or Chat interactions here
    console.log('Style Library Loaded Successfully');
});

// 3. Toast Notification
function showToast(type = 'default') {
    const toast = document.createElement('div');
    toast.className = `toast ${type === 'success' ? 'toast-success' : type === 'error' ? 'toast-error' : ''}`;
    
    const messages = {
        default: '这是一条普通提示消息',
        success: '操作成功！',
        error: '操作失败，请重试'
    };
    
    toast.textContent = messages[type] || messages.default;
    document.body.appendChild(toast);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        toast.style.animation = 'slideDown 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// 4. Modal Dialog
function showModal() {
    const modalHTML = `
        <div class="modal-overlay" onclick="closeModal(event)">
            <div class="modal" onclick="event.stopPropagation()">
                <div class="modal-header">确认操作</div>
                <div class="modal-body">
                    您确定要执行此操作吗？此操作将不可撤销。
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" onclick="closeModal()">取消</button>
                    <button class="btn btn-primary" onclick="closeModal()">确认</button>
                </div>
            </div>
        </div>
    `;
    
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = modalHTML;
    document.body.appendChild(modalContainer.firstElementChild);
}

function closeModal(event) {
    if (!event || event.target.classList.contains('modal-overlay')) {
        document.querySelector('.modal-overlay')?.remove();
    }
}

// Add slideDown animation for toast removal
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from { opacity: 1; transform: translate(-50%, 0); }
        to { opacity: 0; transform: translate(-50%, 20px); }
    }
`;
document.head.appendChild(style);
