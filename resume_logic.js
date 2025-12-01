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

    // New Buttons
    const btnCloseEdit = document.getElementById('btnCloseEdit');
    const btnSaveResume = document.getElementById('btnSaveResume');

    // Views & Modals
    const modalOverlay = document.getElementById('modalOverlay');
    const toast = document.getElementById('toast');
    const viewMain = document.getElementById('viewMain');
    const viewLoading = document.getElementById('viewLoading');
    const viewReport = document.getElementById('viewReport');
    const viewPdfPreview = document.getElementById('viewPdfPreview');

    // New Views
    const viewUploadLoading = document.getElementById('viewUploadLoading');
    const viewEditResume = document.getElementById('viewEditResume');

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

    // 6. Handle PDF Preview Interactions
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

    // 7. Handle Edit Resume Interactions
    if (btnEditResume) {
        btnEditResume.addEventListener('click', () => {
            // If coming from preview, we might want to close preview or keep it in stack.
            // For simplicity, let's just show edit view on top.
            showView(viewEditResume);
        });
    }

    if (btnCloseEdit) {
        btnCloseEdit.addEventListener('click', () => {
            hideView(viewEditResume);
        });
    }

    if (btnSaveResume) {
        btnSaveResume.addEventListener('click', () => {
            showToast('简历已保存', 1500);
            setTimeout(() => {
                hideView(viewEditResume);
            }, 500);
        });
    }

    // --- Helper Functions ---

    // View Helper
    function showView(viewElement) {
        if (!viewElement) return;
        viewElement.classList.remove('hidden');
        viewElement.style.display = 'flex';
    }

    function hideView(viewElement) {
        if (!viewElement) return;
        viewElement.classList.add('hidden');
        viewElement.style.display = 'none';
    }

    function simulateUploadProcess() {
        // Show Upload Loading View
        showView(viewUploadLoading);

        // Simulate progress
        setTimeout(() => {
            hideView(viewUploadLoading);
            showToast('上传成功！', 1500);
            updateUIToUploadedState();
        }, 2000);
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
        uploadedFileItem.classList.add('d-flex'); // Ensure flex display
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

        // Sync Data to Main Page
        mainScoreText.textContent = "72";
        mainScoreBadge.textContent = "良好";
        mainScoreBadge.style.borderColor = "#667eea";
        mainScoreBadge.style.background = "white";
        mainScoreBadge.style.color = "#667eea";
        mainScoreBadge.style.fontWeight = "bold";

        suggestionsEmpty.classList.add('hidden');
        suggestionsList.classList.remove('hidden');

        // Inject Suggestions using Style Library 'option-card' component
        const suggestionsHTML = `
            <!-- Suggestion 1 -->
            <div class="option-card mb-sm">
                <div class="option-icon" style="background: rgba(245, 127, 23, 0.1); color: #f57f17; border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
                    <i class="fas fa-bolt"></i>
                </div>
                <div class="option-content">
                    <div class="option-title" style="font-size: 14px;">期望薪资过高</div>
                    <div class="option-desc" style="font-size: 12px;">成都应届测试岗薪资虚高</div>
                </div>
                <i class="fas fa-chevron-right" style="color: #ccc; font-size: 12px;"></i>
            </div>

            <!-- Suggestion 2 -->
            <div class="option-card mb-sm">
                <div class="option-icon" style="background: rgba(33, 150, 243, 0.1); color: #2196f3; border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
                    <i class="fas fa-briefcase"></i>
                </div>
                <div class="option-content">
                    <div class="option-title" style="font-size: 14px;">补充实习或项目经历</div>
                    <div class="option-desc" style="font-size: 12px;">应届生需展示实践经验</div>
                </div>
                <i class="fas fa-chevron-right" style="color: #ccc; font-size: 12px;"></i>
            </div>

            <!-- Suggestion 3 -->
            <div class="option-card mb-sm">
                <div class="option-icon" style="background: rgba(255, 152, 0, 0.1); color: #ff9800; border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
                    <i class="fas fa-chart-bar"></i>
                </div>
                <div class="option-content">
                    <div class="option-title" style="font-size: 14px;">缺少技能与工具描述</div>
                    <div class="option-desc" style="font-size: 12px;">未体现测试技术能力</div>
                </div>
                <i class="fas fa-chevron-right" style="color: #ccc; font-size: 12px;"></i>
            </div>
        `;

        suggestionsList.innerHTML = suggestionsHTML;
        showToast("分析结果已同步", 2000);
    }

});
