/**
 * Resume Prototype Logic
 * Handles interactions for the Resume Center mobile prototype
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Elements ---
    // Buttons
    const addResumeBtn = document.getElementById('addResumeBtn');
    const actionCancel = document.getElementById('actionCancel');
    const actionUploadPdf = document.getElementById('actionUploadPdf');
    const btnAiDiagnosis = document.getElementById('btnAiDiagnosis');
    const btnReturnToMain = document.getElementById('btnReturnToMain');
    const btnPreviewPdf = document.getElementById('btnPreviewPdf');
    const btnClosePreview = document.getElementById('btnClosePreview');
    const btnEditResume = document.getElementById('btnEditResume');
    
    // Views & Modals
    const modalOverlay = document.getElementById('modalOverlay');
    const toast = document.getElementById('toast');
    const viewMain = document.getElementById('viewMain');
    const viewLoading = document.getElementById('viewLoading');
    const viewReport = document.getElementById('viewReport');
    const viewPdfPreview = document.getElementById('viewPdfPreview');
    
    // State Elements (Main View)
    const headerDefault = document.getElementById('headerDefaultContent');
    const headerUploaded = document.getElementById('headerUploadedContent');
    const uploadedFileItem = document.getElementById('uploadedFileItem');
    const suggestionsEmpty = document.getElementById('suggestionsEmpty');
    const suggestionsList = document.getElementById('suggestionsList');
    const mainScoreText = document.getElementById('mainScoreText');
    const mainScoreBadge = document.getElementById('mainScoreBadge');
    
    // Loading Elements
    const progressBar = document.getElementById('progressBar');
    const loadingText = document.getElementById('loadingText');

    // --- Event Listeners ---

    // 1. Open Action Sheet
    if (addResumeBtn) {
        addResumeBtn.addEventListener('click', () => {
            modalOverlay.style.display = 'flex';
        });
    }

    // 2. Close Action Sheet
    if (actionCancel) {
        actionCancel.addEventListener('click', () => {
            modalOverlay.style.display = 'none';
        });
    }

    // Close on overlay click
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.style.display = 'none';
        }
    });

    // 3. Handle "Upload PDF" Action
    if (actionUploadPdf) {
        actionUploadPdf.addEventListener('click', () => {
            modalOverlay.style.display = 'none';
            simulateUploadProcess();
        });
    }

    // 4. Handle "AI Diagnosis" Action
    if (btnAiDiagnosis) {
        btnAiDiagnosis.addEventListener('click', () => {
            startAiDiagnosis();
        });
    }

    // 5. Handle "Return to Main" Action
    if (btnReturnToMain) {
        btnReturnToMain.addEventListener('click', () => {
            closeReportAndSyncData();
        });
    }

    // 6. Handle PDF Preview Interactions (Task 5)
    if (btnPreviewPdf) {
        btnPreviewPdf.addEventListener('click', () => {
            showView(viewPdfPreview);
        });
    }

    if (btnClosePreview) {
        btnClosePreview.addEventListener('click', () => {
            hideView(viewPdfPreview);
        });
    }

    if (btnEditResume) {
        btnEditResume.addEventListener('click', () => {
            showToast('进入编辑模式...', 1500);
        });
    }

    // --- Helper Functions ---

    // View Helper (Fix for Display Logic)
    function showView(viewElement) {
        viewElement.classList.remove('hidden');
        viewElement.style.display = 'flex';
    }

    function hideView(viewElement) {
        viewElement.classList.add('hidden');
        viewElement.style.display = 'none';
    }

    function simulateUploadProcess() {
        showToast('正在上传...', 1500);
        setTimeout(() => {
            showToast('上传成功！', 1500);
            updateUIToUploadedState();
        }, 1500);
    }

    function showToast(message, duration = 2000) {
        toast.innerHTML = `<i class="fas fa-info-circle"></i> ${message}`;
        toast.style.display = 'block';
        setTimeout(() => {
            toast.style.display = 'none';
        }, duration);
    }

    function updateUIToUploadedState() {
        headerDefault.classList.add('hidden');
        headerUploaded.classList.remove('hidden');
        headerUploaded.classList.add('d-flex');
        addResumeBtn.style.display = 'none'; 
        uploadedFileItem.classList.remove('hidden'); 
    }

    function startAiDiagnosis() {
        // Switch to Loading View
        showView(viewLoading);
        
        // Reset Progress
        progressBar.style.width = '0%';
        
        // Simulate Progress Steps
        let progress = 0;
        const interval = setInterval(() => {
            progress += 5;
            progressBar.style.width = `${progress}%`;
            
            if (progress === 30) loadingText.textContent = "正在解析简历结构...";
            if (progress === 60) loadingText.textContent = "正在对比岗位要求...";
            if (progress === 90) loadingText.textContent = "正在生成优化建议...";

            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    // Switch to Report View
                    hideView(viewLoading);
                    showView(viewReport);
                }, 500);
            }
        }, 150); // Total ~3 seconds
    }

    function closeReportAndSyncData() {
        // Switch back to Main View
        hideView(viewReport);
        
        // Sync Data to Main Page (Scenario 6)
        mainScoreText.textContent = "72";
        mainScoreBadge.textContent = "良好";
        mainScoreBadge.style.borderColor = "#667eea";
        mainScoreBadge.style.background = "white";
        mainScoreBadge.style.color = "#667eea";
        mainScoreBadge.style.fontWeight = "bold";

        suggestionsEmpty.classList.add('hidden');
        suggestionsList.classList.remove('hidden');
        
        // Inject Suggestions (Mock Data)
        const suggestionsHTML = `
            <div style="background: #fff8e1; padding: 16px; border-radius: 30px; margin-bottom: 12px; display: flex; align-items: center; justify-content: space-between;">
                <div class="d-flex align-center">
                    <div style="width: 32px; height: 32px; background: rgba(245, 127, 23, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
                        <i class="fas fa-bolt" style="color: #f57f17;"></i>
                    </div>
                    <div>
                        <div style="font-weight: 600; font-size: 14px; color: #333;">期望薪资过高</div>
                        <div style="font-size: 12px; color: #666;">成都应届测试岗薪资虚高</div>
                    </div>
                </div>
                <i class="fas fa-chevron-right" style="color: #ccc; font-size: 12px;"></i>
            </div>

            <div style="background: #e3f2fd; padding: 16px; border-radius: 30px; margin-bottom: 12px; display: flex; align-items: center; justify-content: space-between;">
                <div class="d-flex align-center">
                    <div style="width: 32px; height: 32px; background: rgba(33, 150, 243, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
                        <i class="fas fa-briefcase" style="color: #2196f3;"></i>
                    </div>
                    <div>
                        <div style="font-weight: 600; font-size: 14px; color: #333;">补充实习或项目经历</div>
                        <div style="font-size: 12px; color: #666;">应届生需展示实践经验</div>
                    </div>
                </div>
                <i class="fas fa-chevron-right" style="color: #ccc; font-size: 12px;"></i>
            </div>

             <div style="background: #fff3e0; padding: 16px; border-radius: 30px; margin-bottom: 12px; display: flex; align-items: center; justify-content: space-between;">
                <div class="d-flex align-center">
                    <div style="width: 32px; height: 32px; background: rgba(255, 152, 0, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
                        <i class="fas fa-chart-bar" style="color: #ff9800;"></i>
                    </div>
                    <div>
                        <div style="font-weight: 600; font-size: 14px; color: #333;">缺少技能与工具描述</div>
                        <div style="font-size: 12px; color: #666;">未体现测试技术能力</div>
                    </div>
                </div>
                <i class="fas fa-chevron-right" style="color: #ccc; font-size: 12px;"></i>
            </div>
        `;
        
        suggestionsList.innerHTML = suggestionsHTML;
        showToast("分析结果已同步", 2000);
    }

});
