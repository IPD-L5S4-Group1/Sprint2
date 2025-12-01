/**
 * Resume Prototype Logic (Fixed & Complete)
 * Strictly adheres to Style Library classes and IDs
 * English Language Version
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Element Selection ---
    const addResumeBtn = document.getElementById('addResumeBtn');
    const actionCancel = document.getElementById('actionCancel');
    const actionUploadPdf = document.getElementById('actionUploadPdf');
    const actionTemplate = document.getElementById('actionTemplate');
    
    const btnAiDiagnosis = document.getElementById('btnAiDiagnosis');
    const btnReturnToMain = document.getElementById('btnReturnToMain');
    const btnPreviewPdf = document.getElementById('btnPreviewPdf');
    const btnClosePreview = document.getElementById('btnClosePreview');
    const btnEditResume = document.getElementById('btnEditResume');
    const btnCloseEdit = document.getElementById('btnCloseEdit');
    const btnSaveResume = document.getElementById('btnSaveResume');
    const btnCloseReport = document.getElementById('btnCloseReport');

    // Views & Modals
    const modalOverlay = document.getElementById('modalOverlay');
    const toast = document.getElementById('toast');
    
    const viewMain = document.getElementById('viewMain');
    const viewUploadLoading = document.getElementById('viewUploadLoading');
    const viewLoading = document.getElementById('viewLoading');
    const viewReport = document.getElementById('viewReport');
    const viewPdfPreview = document.getElementById('viewPdfPreview');
    const viewEditResume = document.getElementById('viewEditResume');

    // State Elements
    const headerDefault = document.getElementById('headerDefaultContent');
    const headerUploaded = document.getElementById('headerUploadedContent');
    const uploadedFileItem = document.getElementById('uploadedFileItem');
    const suggestionsEmpty = document.getElementById('suggestionsEmpty');
    const suggestionsList = document.getElementById('suggestionsList');
    
    const mainScoreText = document.getElementById('mainScoreText');
    const mainScoreBadge = document.getElementById('mainScoreBadge');
    const lastUpdateText = document.getElementById('lastUpdateText');
    const suggestionCount = document.getElementById('suggestionCount');
    const uploadedFileName = document.getElementById('uploadedFileName');

    // Loading Elements
    const progressBar = document.getElementById('progressBar');
    const loadingText = document.getElementById('loadingText');
    const progressPercent = document.getElementById('progressPercent');
    const fileInput = document.getElementById('fileInput');

    // --- 2. Interaction Logic ---

    // [Action] Open "New Resume" Modal (FIXED)
    if (addResumeBtn) {
        addResumeBtn.addEventListener('click', () => {
            // 使用 helper 函数，确保移除 .hidden 类
            showView(modalOverlay); 
        });
    }

    // [Action] Close Modal
    if (actionCancel) {
        actionCancel.addEventListener('click', () => {
            hideView(modalOverlay);
        });
    }

    // [Action] Select "Upload PDF"
    if (actionUploadPdf) {
        actionUploadPdf.addEventListener('click', () => {
            if (fileInput) fileInput.click();
        });
    }
    
    // [Action] Select "Use Template"
    if (actionTemplate) {
        actionTemplate.addEventListener('click', () => {
             hideView(modalOverlay);
             // Simulate opening edit view directly
             showView(viewEditResume);
             showToast('Template Loaded');
        });
    }

    // [Event] File Selected
    if (fileInput) {
        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                hideView(modalOverlay);
                simulateUploadProcess(file.name);
            }
            // Reset input
            fileInput.value = '';
        });
    }

    // [Action] Start AI Diagnosis
    if (btnAiDiagnosis) {
        btnAiDiagnosis.addEventListener('click', () => {
            startAiDiagnosis();
        });
    }

    // [Action] Close Report (Done)
    if (btnReturnToMain) {
        btnReturnToMain.addEventListener('click', () => {
            closeReportAndSyncData();
        });
    }
    
    if (btnCloseReport) {
        btnCloseReport.addEventListener('click', () => {
            hideView(viewReport);
        });
    }

    // [Action] Preview PDF
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

    // [Action] Edit Resume
    if (btnEditResume) {
        btnEditResume.addEventListener('click', () => {
            hideView(viewPdfPreview);
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
            showToast('Changes Saved', 1500);
            setTimeout(() => {
                hideView(viewEditResume);
            }, 500);
        });
    }

    // --- 3. Core Functions ---

    // [Helper] Show View - Removes hidden class AND sets display flex
    function showView(view) {
        if (view) {
            view.classList.remove('hidden');
            view.style.display = 'flex';
        }
    }

    // [Helper] Hide View - Adds hidden class AND sets display none
    function hideView(view) {
        if (view) {
            view.classList.add('hidden');
            view.style.display = 'none';
        }
    }

    function showToast(message, duration = 2000) {
        if (!toast) return;
        toast.innerHTML = `<i class="fas fa-check-circle" style="margin-right:6px"></i> ${message}`;
        showView(toast); // Use helper
        toast.style.display = 'block'; // Override flex for toast
        toast.style.animation = 'slideUp 0.3s ease';
        
        setTimeout(() => {
            hideView(toast);
        }, duration);
    }

    // Simulate File Upload
    function simulateUploadProcess(filename) {
        showView(viewUploadLoading);

        setTimeout(() => {
            hideView(viewUploadLoading);
            showToast('Upload Successful');
            updateUIToUploadedState(filename);
        }, 2000);
    }

    // Update Main UI after Upload
    function updateUIToUploadedState(filename) {
        // 1. Switch Header Card content
        if (headerDefault) headerDefault.classList.add('hidden');
        if (headerUploaded) headerUploaded.classList.remove('hidden');
        
        // 2. Show File in Horizontal List
        if (uploadedFileItem) {
            showView(uploadedFileItem); // Use helper
            // Update filename display
            if (uploadedFileName) {
                let name = filename.length > 15 ? filename.substring(0, 12) + '...' : filename;
                uploadedFileName.textContent = name;
            }
        }
        
        // 3. Reset Suggestions
        if (suggestionsEmpty) suggestionsEmpty.classList.remove('hidden');
        if (suggestionsList) {
            suggestionsList.innerHTML = '';
            suggestionsList.classList.add('hidden');
        }
        if (suggestionCount) suggestionCount.classList.add('hidden');
        
        // 4. Reset Score
        if (mainScoreText) mainScoreText.textContent = '0';
        if (mainScoreBadge) {
            mainScoreBadge.innerHTML = '<span style="font-size: 20px; font-weight: 800;">-</span><span style="font-size: 10px;">GRADE</span>';
            mainScoreBadge.style.borderColor = 'rgba(255,255,255,0.4)';
            mainScoreBadge.style.backgroundColor = 'rgba(255,255,255,0.15)';
        }
        if (lastUpdateText) lastUpdateText.textContent = 'UPDATED: NEVER';
    }

    // Simulate AI Analysis
    function startAiDiagnosis() {
        showView(viewLoading);

        if (progressBar) progressBar.style.width = '0%';
        if (progressPercent) progressPercent.textContent = '0%';

        let progress = 0;
        const interval = setInterval(() => {
            progress += 2;
            if (progressBar) progressBar.style.width = `${progress}%`;
            if (progressPercent) progressPercent.textContent = `${progress}%`;

            if (loadingText) {
                if (progress === 10) loadingText.textContent = "Initializing AI Agent...";
                if (progress === 30) loadingText.textContent = "Parsing Resume Structure...";
                if (progress === 50) loadingText.textContent = "Identifying Key Skills...";
                if (progress === 70) loadingText.textContent = "Comparing with Job Market...";
                if (progress === 90) loadingText.textContent = "Generating Suggestions...";
            }

            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    hideView(viewLoading);
                    showView(viewReport);
                }, 500);
            }
        }, 60);
    }

    // Generate Suggestions & Update Score
    function closeReportAndSyncData() {
        hideView(viewReport);

        // 1. Update Score to 72 (B)
        if (mainScoreText) mainScoreText.textContent = "72";
        
        if (mainScoreBadge) {
            const color = '#0984E3'; 
            mainScoreBadge.innerHTML = `
                <span style="font-size: 28px; font-weight: 800; color: ${color};">B</span>
                <span style="font-size: 10px; color: ${color}; font-weight: 600;">GOOD</span>
            `;
            mainScoreBadge.style.backgroundColor = 'white';
        }

        // 2. Update Timestamp
        if (lastUpdateText) {
            const now = new Date();
            lastUpdateText.textContent = `UPDATED: ${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
        }

        // 3. Inject Suggestions
        if (suggestionsEmpty) suggestionsEmpty.classList.add('hidden');
        if (suggestionsList) suggestionsList.classList.remove('hidden');
        if (suggestionCount) {
            suggestionCount.textContent = '4';
            suggestionCount.classList.remove('hidden');
        }

        const suggestionItems = [
            {
                icon: '⚡',
                title: 'Missing Quantifiable Data',
                desc: 'Recruiters prefer metrics. Add numbers like "Increased sales by 20%".',
                color: 'linear-gradient(135deg, #FFF9E6 0%, #FFF3CD 100%)'
            },
            {
                icon: '💼',
                title: 'Add Project Experience',
                desc: 'Your experience section is light. Add your recent capstone project.',
                color: 'linear-gradient(135deg, #E8F4FD 0%, #D6EAF8 100%)'
            },
            {
                icon: '📊',
                title: 'Skill Keywords Missing',
                desc: 'Missing key terms: "React", "Agile", "CI/CD". Add them to pass ATS.',
                color: 'linear-gradient(135deg, #E8F4FD 0%, #D6EAF8 100%)'
            },
            {
                icon: '🎓',
                title: 'Highlight Education',
                desc: 'Your GPA is a strength. Move Education section to the top.',
                color: 'linear-gradient(135deg, #E8F4FD 0%, #D6EAF8 100%)'
            }
        ];

        let html = '';
        suggestionItems.forEach(item => {
            html += `
            <div class="option-card mb-sm" style="background: ${item.color}; border: none; border-radius: 16px; padding: 16px;">
                <span class="option-icon" style="font-size: 20px; width: 36px; height: 36px; background: rgba(255,255,255,0.5); border-radius: 8px;">${item.icon}</span>
                <div class="option-content">
                    <div class="option-title" style="font-size: 14px; font-weight: 700; color: #333; margin-bottom: 4px;">${item.title}</div>
                    <div class="option-desc" style="font-size: 12px; color: #666; line-height: 1.4;">${item.desc}</div>
                </div>
                <i class="fas fa-chevron-right" style="color: rgba(0,0,0,0.2); font-size: 12px;"></i>
            </div>
            `;
        });

        if (suggestionsList) suggestionsList.innerHTML = html;
        
        showToast("Analysis Synced", 2000);
    }

});