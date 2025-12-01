/**
 * Resume Center - Mobile Prototype Logic
 * Enhanced with smooth animations and modern interactions
 * @version 2.0
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ========================================
    // 1. ELEMENT REFERENCES
    // ========================================
    
    // Buttons
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

    // Views & Overlays
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

    // ========================================
    // 2. EVENT LISTENERS
    // ========================================

    // Open "New Resume" Modal
    addResumeBtn?.addEventListener('click', () => {
        showView(modalOverlay);
        addHapticFeedback();
    });

    // Close Modal
    actionCancel?.addEventListener('click', () => {
        hideView(modalOverlay);
    });

    // Select "Upload PDF"
    actionUploadPdf?.addEventListener('click', () => {
        fileInput?.click();
        addHapticFeedback();
    });
    
    // Select "Use Template"
    actionTemplate?.addEventListener('click', () => {
        hideView(modalOverlay);
        showView(viewEditResume);
        showToast('✨ Template Loaded', 1500);
        addHapticFeedback();
    });

    // File Selected
    fileInput?.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            hideView(modalOverlay);
            simulateUploadProcess(file.name);
        }
        fileInput.value = ''; // Reset input
    });

    // Start AI Diagnosis
    btnAiDiagnosis?.addEventListener('click', () => {
        startAiDiagnosis();
        addHapticFeedback();
    });

    // Close Report
    btnReturnToMain?.addEventListener('click', () => {
        closeReportAndSyncData();
    });
    
    btnCloseReport?.addEventListener('click', () => {
        hideView(viewReport);
    });

    // Preview PDF
    btnPreviewPdf?.addEventListener('click', () => {
        showView(viewPdfPreview);
    });

    btnClosePreview?.addEventListener('click', () => {
        hideView(viewPdfPreview);
    });

    // Edit Resume
    btnEditResume?.addEventListener('click', () => {
        hideView(viewPdfPreview);
        showView(viewEditResume);
    });

    btnCloseEdit?.addEventListener('click', () => {
        hideView(viewEditResume);
    });

    btnSaveResume?.addEventListener('click', () => {
        showToast('💾 Changes Saved', 1500);
        addHapticFeedback();
        setTimeout(() => {
            hideView(viewEditResume);
        }, 500);
    });

    // ========================================
    // 3. CORE FUNCTIONS
    // ========================================

    /**
     * Show a view with animation
     */
    function showView(view) {
        if (view) {
            view.classList.remove('hidden');
            view.style.display = 'flex';
            // Trigger animation
            requestAnimationFrame(() => {
                view.style.opacity = '1';
            });
        }
    }

    /**
     * Hide a view with animation
     */
    function hideView(view) {
        if (view) {
            view.style.opacity = '0';
            setTimeout(() => {
                view.classList.add('hidden');
                view.style.display = 'none';
            }, 200);
        }
    }

    /**
     * Show toast notification
     */
    function showToast(message, duration = 2000) {
        if (!toast) return;
        
        toast.innerHTML = message;
        toast.classList.remove('hidden');
        toast.style.display = 'block';
        
        setTimeout(() => {
            toast.classList.add('hidden');
            toast.style.display = 'none';
        }, duration);
    }

    /**
     * Simulate haptic feedback (visual only)
     */
    function addHapticFeedback() {
        // Visual feedback - can be extended with Vibration API
        // navigator.vibrate is supported on mobile
        if ('vibrate' in navigator) {
            navigator.vibrate(10);
        }
    }

    /**
     * Simulate file upload process
     */
    function simulateUploadProcess(filename) {
        showView(viewUploadLoading);

        setTimeout(() => {
            hideView(viewUploadLoading);
            showToast('✅ Upload Successful', 2000);
            updateUIToUploadedState(filename);
        }, 2000);
    }

    /**
     * Update main UI after file upload
     */
    function updateUIToUploadedState(filename) {
        // Switch header card content
        headerDefault?.classList.add('hidden');
        headerUploaded?.classList.remove('hidden');
        
        // Show file in horizontal list
        if (uploadedFileItem) {
            uploadedFileItem.classList.remove('hidden');
            uploadedFileItem.style.display = 'flex';
            
            // Update filename display
            if (uploadedFileName) {
                let name = filename.length > 15 
                    ? filename.substring(0, 12) + '...' 
                    : filename;
                uploadedFileName.textContent = name;
            }
        }
        
        // Reset suggestions
        suggestionsEmpty?.classList.remove('hidden');
        if (suggestionsList) {
            suggestionsList.innerHTML = '';
            suggestionsList.classList.add('hidden');
        }
        suggestionCount?.classList.add('hidden');
        
        // Reset score
        if (mainScoreText) mainScoreText.textContent = '0';
        if (mainScoreBadge) {
            mainScoreBadge.innerHTML = '<span style="font-size: 32px;">-</span>';
        }
        if (lastUpdateText) lastUpdateText.textContent = 'NEVER ANALYZED';
    }

    /**
     * Simulate AI analysis with progress bar
     */
    function startAiDiagnosis() {
        showView(viewLoading);

        if (progressBar) progressBar.style.width = '0%';
        if (progressPercent) progressPercent.textContent = '0%';

        let progress = 0;
        const interval = setInterval(() => {
            progress += 2;
            
            if (progressBar) progressBar.style.width = `${progress}%`;
            if (progressPercent) progressPercent.textContent = `${progress}%`;

            // Update loading messages
            if (loadingText) {
                if (progress === 10) loadingText.textContent = "🔍 Scanning document structure...";
                if (progress === 30) loadingText.textContent = "📝 Extracting key information...";
                if (progress === 50) loadingText.textContent = "🎯 Identifying skills...";
                if (progress === 70) loadingText.textContent = "📊 Comparing with best practices...";
                if (progress === 90) loadingText.textContent = "✨ Generating suggestions...";
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

    /**
     * Close report and sync data to main view
     */
    function closeReportAndSyncData() {
        hideView(viewReport);

        // Animate score update
        animateScore(0, 72, 1000);
        
        // Update score badge
        if (mainScoreBadge) {
            mainScoreBadge.innerHTML = `
                <span style="font-size: 32px; font-weight: 800;">B</span>
            `;
            mainScoreBadge.style.borderColor = 'rgba(255,255,255,0.5)';
        }

        // Update timestamp
        if (lastUpdateText) {
            const now = new Date();
            const hours = now.getHours();
            const minutes = String(now.getMinutes()).padStart(2, '0');
            lastUpdateText.textContent = `UPDATED: ${hours}:${minutes}`;
        }

        // Show suggestions
        suggestionsEmpty?.classList.add('hidden');
        suggestionsList?.classList.remove('hidden');
        
        if (suggestionCount) {
            suggestionCount.textContent = '4';
            suggestionCount.classList.remove('hidden');
        }

        // Generate suggestion cards
        generateSuggestions();
        
        showToast('📊 Analysis Complete!', 2000);
    }

    /**
     * Animate score counter
     */
    function animateScore(start, end, duration) {
        if (!mainScoreText) return;
        
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                current = end;
                clearInterval(timer);
            }
            mainScoreText.textContent = Math.floor(current);
        }, 16);
    }

    /**
     * Generate suggestion cards with priority
     */
    function generateSuggestions() {
        if (!suggestionsList) return;

        const suggestions = [
            {
                icon: '⚡',
                title: 'Add Quantifiable Results',
                desc: 'Include metrics like "Increased efficiency by 30%" to demonstrate impact.',
                priority: 'high'
            },
            {
                icon: '💼',
                title: 'Expand Project Section',
                desc: 'Your experience is light. Add your capstone project details.',
                priority: 'medium'
            },
            {
                icon: '📊',
                title: 'Include Key Technologies',
                desc: 'Add: React, Node.js, AWS. These keywords help pass ATS filters.',
                priority: 'medium'
            },
            {
                icon: '🎓',
                title: 'Highlight Your GPA',
                desc: 'Move your education section higher - your 3.8 GPA is impressive!',
                priority: 'low'
            }
        ];

        let html = '';
        suggestions.forEach((item, index) => {
            html += `
            <div class="suggestion-card" style="animation: slideUp 0.3s ease ${index * 0.1}s backwards;">
                <div class="suggestion-icon priority-${item.priority}">
                    ${item.icon}
                </div>
                <div style="flex: 1;">
                    <div style="font-size: 15px; font-weight: 700; color: #1a1a1a; margin-bottom: 4px;">
                        ${item.title}
                    </div>
                    <div style="font-size: 13px; color: #666; line-height: 1.5;">
                        ${item.desc}
                    </div>
                </div>
                <i class="fas fa-chevron-right" style="color: #ccc; font-size: 14px;"></i>
            </div>
            `;
        });

        suggestionsList.innerHTML = html;

        // Add click handlers to suggestion cards
        document.querySelectorAll('.suggestion-card').forEach(card => {
            card.addEventListener('click', () => {
                showToast('💡 Tip saved to notebook', 1500);
                addHapticFeedback();
            });
        });
    }

    // ========================================
    // 4. INITIALIZATION
    // ========================================

    console.log('✅ Resume Center loaded successfully');
    console.log('📱 Device: iPhone 17 Pro Max (430 x 932)');
    
    // Add smooth scroll behavior
    document.querySelector('.app-content')?.addEventListener('scroll', () => {
        // Can add scroll-based effects here
    });

});

