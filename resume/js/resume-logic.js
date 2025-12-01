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
    const btnAskAi = document.getElementById('btnAskAi');
    const btnCloseChat = document.getElementById('btnCloseChat');
    const btnSendChat = document.getElementById('btnSendChat');
    
    // Global state for multiple resumes
    let resumes = [];
    let currentResumeId = null;
    
    // Chat state
    let chatHistory = [];
    
    // PDF.js worker configuration
    if (typeof pdfjsLib !== 'undefined') {
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
    }

    // Views & Overlays
    const modalOverlay = document.getElementById('modalOverlay');
    const toast = document.getElementById('toast');
    const viewMain = document.getElementById('viewMain');
    const viewUploadLoading = document.getElementById('viewUploadLoading');
    const viewLoading = document.getElementById('viewLoading');
    const viewReport = document.getElementById('viewReport');
    const viewPdfPreview = document.getElementById('viewPdfPreview');
    const viewEditResume = document.getElementById('viewEditResume');
    const viewAiChat = document.getElementById('viewAiChat');
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const suggestionDetailModal = document.getElementById('suggestionDetailModal');
    const btnCloseSuggestionDetail = document.getElementById('btnCloseSuggestionDetail');
    const btnApplySuggestion = document.getElementById('btnApplySuggestion');

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
            handlePdfUpload(file);
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
        renderResumePreview();
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
        saveResumeData();
        showToast('💾 Changes Saved', 1500);
        addHapticFeedback();
        setTimeout(() => {
            hideView(viewEditResume);
            updateUIToUploadedState('My Resume');
        }, 500);
    });
    
    // Open AI Chat
    btnAskAi?.addEventListener('click', () => {
        hideView(viewReport);
        showView(viewAiChat);
        addHapticFeedback();
    });
    
    btnCloseChat?.addEventListener('click', () => {
        hideView(viewAiChat);
        showView(viewReport);  // Return to report view
    });
    
    // Send Chat Message
    btnSendChat?.addEventListener('click', () => {
        sendChatMessage();
    });
    
    chatInput?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendChatMessage();
        }
    });
    
    // Suggestion Detail Modal
    btnCloseSuggestionDetail?.addEventListener('click', () => {
        hideView(suggestionDetailModal);
    });
    
    btnApplySuggestion?.addEventListener('click', () => {
        hideView(suggestionDetailModal);
        showToast('✅ Suggestion Saved', 1500);
        addHapticFeedback();
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
     * Handle PDF file upload
     */
    async function handlePdfUpload(file) {
        showView(viewUploadLoading);
        
        try {
            // Read PDF file
            const arrayBuffer = await file.arrayBuffer();
            
            // Create new resume object with PDF data
            const resumeId = 'resume_' + Date.now();
            const newResume = {
                id: resumeId,
                name: file.name,
                uploadDate: new Date(),
                score: 0,
                analyzed: false,
                data: null,
                pdfData: arrayBuffer,  // Store PDF binary data
                isPdf: true
            };
            
            // Add to resumes array
            resumes.push(newResume);
            currentResumeId = resumeId;
            
            setTimeout(() => {
                hideView(viewUploadLoading);
                showToast('✅ Upload Successful', 2000);
                
                // Switch header card content
                headerDefault?.classList.add('hidden');
                headerUploaded?.classList.remove('hidden');
                
                // Add resume card to horizontal scroll
                addResumeCard(newResume);
                
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
            }, 2000);
            
        } catch (error) {
            console.error('PDF Upload Error:', error);
            hideView(viewUploadLoading);
            showToast('❌ Upload Failed', 2000);
        }
    }
    
    /**
     * Simulate file upload process (for template)
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
     * Update main UI after file upload - supports multiple resumes
     */
    function updateUIToUploadedState(filename) {
        // Create new resume object
        const resumeId = 'resume_' + Date.now();
        const newResume = {
            id: resumeId,
            name: filename,
            uploadDate: new Date(),
            score: 0,
            analyzed: false,
            data: null
        };
        
        // Add to resumes array
        resumes.push(newResume);
        currentResumeId = resumeId;
        
        // Switch header card content
        headerDefault?.classList.add('hidden');
        headerUploaded?.classList.remove('hidden');
        
        // Add resume card to horizontal scroll
        addResumeCard(newResume);
        
        // Update preview for current resume
        updatePreviewForCurrentResume();
        
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
     * Add a resume card to the horizontal scroll
     */
    function addResumeCard(resume) {
        const container = document.querySelector('.h-scroll');
        if (!container) return;
        
        // Create card element
        const card = document.createElement('div');
        card.className = 'doc-card';
        card.dataset.resumeId = resume.id;
        
        // Add selected class if it's the current resume
        if (resume.id === currentResumeId) {
            card.classList.add('doc-card-selected');
        }
        
        const displayName = resume.name.length > 15 
            ? resume.name.substring(0, 12) + '...' 
            : resume.name;
        
        card.innerHTML = `
            <div style="display: flex; justify-content: space-between;">
                <i class="fas fa-file-pdf doc-icon"></i>
                <i class="fas fa-ellipsis-v" style="color: #ccc;"></i>
            </div>
            <div>
                <div style="font-size: 15px; font-weight: 700; margin-bottom: 4px; color: #1a1a1a;">${displayName}</div>
                <div style="font-size: 13px; color: #888;">Just now</div>
            </div>
        `;
        
        // Add click handler
        card.addEventListener('click', () => {
            selectResume(resume.id);
        });
        
        // Insert before the "Add New" button
        container.insertBefore(card, addResumeBtn);
        
        // Scroll to show the new card
        setTimeout(() => {
            card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }, 100);
    }
    
    /**
     * Select a resume and update UI
     */
    function selectResume(resumeId) {
        currentResumeId = resumeId;
        
        // Update card selection visuals
        document.querySelectorAll('.doc-card').forEach(card => {
            if (card.dataset.resumeId === resumeId) {
                card.classList.add('doc-card-selected');
            } else {
                card.classList.remove('doc-card-selected');
            }
        });
        
        // Update preview and main UI
        const resume = resumes.find(r => r.id === resumeId);
        if (resume) {
            updatePreviewForCurrentResume();
            
            // Update score display
            if (resume.analyzed) {
                if (mainScoreText) mainScoreText.textContent = resume.score;
                if (mainScoreBadge && resume.score > 0) {
                    const grade = resume.score >= 85 ? 'A' : resume.score >= 70 ? 'B' : 'C';
                    mainScoreBadge.innerHTML = `<span style="font-size: 32px; font-weight: 800;">${grade}</span>`;
                }
                if (lastUpdateText) {
                    const now = new Date();
                    const hours = now.getHours();
                    const minutes = String(now.getMinutes()).padStart(2, '0');
                    lastUpdateText.textContent = `UPDATED: ${hours}:${minutes}`;
                }
            } else {
                if (mainScoreText) mainScoreText.textContent = '0';
                if (mainScoreBadge) {
                    mainScoreBadge.innerHTML = '<span style="font-size: 32px;">-</span>';
                }
                if (lastUpdateText) lastUpdateText.textContent = 'NEVER ANALYZED';
            }
            
            addHapticFeedback();
        }
    }
    
    /**
     * Update preview for the current selected resume
     */
    function updatePreviewForCurrentResume() {
        const resume = resumes.find(r => r.id === currentResumeId);
        if (!resume) return;
        
        // This will be used when preview is opened
        // The actual rendering happens in renderResumePreview()
    }
    
    /**
     * Send chat message to AI
     */
    async function sendChatMessage() {
        const message = chatInput?.value.trim();
        if (!message) return;
        
        // Clear input
        chatInput.value = '';
        
        // Add user message to UI
        addChatMessage(message, 'user');
        
        // Show typing indicator
        showTypingIndicator();
        
        // Prepare chat history for API
        chatHistory.push({
            role: 'user',
            content: message
        });
        
        try {
            // Call Alibaba Cloud API
            const response = await callAlibabaCloudAPI(chatHistory);
            
            // Remove typing indicator
            removeTypingIndicator();
            
            // Add AI response to UI
            if (response) {
                addChatMessage(response, 'ai');
                chatHistory.push({
                    role: 'assistant',
                    content: response
                });
            }
        } catch (error) {
            console.error('AI Chat Error:', error);
            removeTypingIndicator();
            addChatMessage('Sorry, I encountered an issue. Please try again later.', 'ai');
        }
    }
    
    /**
     * Call Alibaba Cloud Qwen API
     */
    async function callAlibabaCloudAPI(messages) {
        const API_KEY = 'sk-d1a79240645449428802d0755537479c';
        const API_URL = 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions';
        
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: 'qwen-max',
                    messages: [
                        {
                            role: 'system',
                            content: 'You are a professional resume analysis assistant. Your task is to help users improve their resumes by providing specific advice and guidance. Please respond in English, maintaining a professional, friendly, and encouraging tone.'
                        },
                        ...messages
                    ],
                    stream: false
                })
            });
            
            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }
            
            const data = await response.json();
            return data.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
        } catch (error) {
            console.error('API Call Error:', error);
            throw error;
        }
    }
    
    /**
     * Add chat message to UI
     */
    function addChatMessage(content, sender) {
        if (!chatMessages) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `message message-${sender}`;
        
        if (sender === 'ai') {
            messageDiv.innerHTML = `
                <div class="avatar avatar-ai">🤖</div>
                <div class="bubble">${content}</div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="bubble">${content}</div>
                <div class="avatar avatar-user">👤</div>
            `;
        }
        
        chatMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    /**
     * Show typing indicator
     */
    function showTypingIndicator() {
        if (!chatMessages) return;
        
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message message-ai';
        typingDiv.id = 'typingIndicator';
        typingDiv.innerHTML = `
            <div class="avatar avatar-ai">🤖</div>
            <div class="typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        `;
        
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    /**
     * Remove typing indicator
     */
    function removeTypingIndicator() {
        const indicator = document.getElementById('typingIndicator');
        if (indicator) {
            indicator.remove();
        }
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

        const score = 72; // Mock score
        
        // Update current resume's analyzed status
        const resume = resumes.find(r => r.id === currentResumeId);
        if (resume) {
            resume.analyzed = true;
            resume.score = score;
            // Save to localStorage
            localStorage.setItem('allResumes', JSON.stringify(resumes));
        }

        // Animate score update
        animateScore(0, score, 1000);
        
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
                title: 'Add Quantifiable Achievements',
                desc: 'Include specific data like "Improved efficiency by 30%" to showcase impact',
                priority: 'high',
                detailContent: `
                    <h4 style="font-size: 16px; font-weight: 800; color: #1a1a1a; margin: 0 0 12px 0;">Why It Matters?</h4>
                    <p style="font-size: 14px; color: #555; line-height: 1.6; margin-bottom: 16px;">
                        Quantifiable achievements help recruiters quickly understand your actual contributions, making them more persuasive than vague descriptions.
                    </p>
                    <h4 style="font-size: 16px; font-weight: 800; color: #1a1a1a; margin: 0 0 12px 0;">Example Comparison</h4>
                    <div style="background: #ffe5e5; border-left: 4px solid #ff6b6b; padding: 12px; border-radius: 8px; margin-bottom: 12px;">
                        <div style="font-size: 12px; font-weight: 700; color: #ff6b6b; margin-bottom: 4px;">❌ Bad Example</div>
                        <div style="font-size: 14px; color: #555;">"Participated in team project development"</div>
                    </div>
                    <div style="background: #e5ffe5; border-left: 4px solid #00b894; padding: 12px; border-radius: 8px;">
                        <div style="font-size: 12px; font-weight: 700; color: #00b894; margin-bottom: 4px;">✅ Good Example</div>
                        <div style="font-size: 14px; color: #555;">"Optimized database queries, reduced page load time from 3s to 0.8s, increased user satisfaction by 45%"</div>
                    </div>
                `
            },
            {
                icon: '💼',
                title: 'Expand Project Experience',
                desc: 'Add details about your capstone or thesis projects',
                priority: 'medium',
                detailContent: `
                    <h4 style="font-size: 16px; font-weight: 800; color: #1a1a1a; margin: 0 0 12px 0;">Suggested Content</h4>
                    <ul style="margin: 0; padding-left: 20px; list-style: none;">
                        <li style="font-size: 14px; color: #555; line-height: 1.8; margin-bottom: 8px; position: relative; padding-left: 24px;">
                            <span style="position: absolute; left: 0; color: #667eea; font-weight: 700;">1.</span>
                            Project background and objectives
                        </li>
                        <li style="font-size: 14px; color: #555; line-height: 1.8; margin-bottom: 8px; position: relative; padding-left: 24px;">
                            <span style="position: absolute; left: 0; color: #667eea; font-weight: 700;">2.</span>
                            Technology stack (frontend, backend, database)
                        </li>
                        <li style="font-size: 14px; color: #555; line-height: 1.8; margin-bottom: 8px; position: relative; padding-left: 24px;">
                            <span style="position: absolute; left: 0; color: #667eea; font-weight: 700;">3.</span>
                            Your specific responsibilities and contributions
                        </li>
                        <li style="font-size: 14px; color: #555; line-height: 1.8; position: relative; padding-left: 24px;">
                            <span style="position: absolute; left: 0; color: #667eea; font-weight: 700;">4.</span>
                            Project outcomes (user count, performance metrics)
                        </li>
                    </ul>
                `
            },
            {
                icon: '📊',
                title: 'Add Technical Keywords',
                desc: 'Include keywords like React, Node.js, AWS to pass ATS screening',
                priority: 'medium',
                detailContent: `
                    <h4 style="font-size: 16px; font-weight: 800; color: #1a1a1a; margin: 0 0 12px 0;">Recommended Technologies</h4>
                    <div style="margin-bottom: 16px;">
                        <div style="font-size: 13px; font-weight: 700; color: #888; margin-bottom: 8px;">Frontend</div>
                        <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 12px;">
                            <span style="background: #667eea; color: white; padding: 6px 12px; border-radius: 12px; font-size: 13px; font-weight: 600;">React</span>
                            <span style="background: #667eea; color: white; padding: 6px 12px; border-radius: 12px; font-size: 13px; font-weight: 600;">Vue.js</span>
                            <span style="background: #667eea; color: white; padding: 6px 12px; border-radius: 12px; font-size: 13px; font-weight: 600;">TypeScript</span>
                        </div>
                        <div style="font-size: 13px; font-weight: 700; color: #888; margin-bottom: 8px;">Backend</div>
                        <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 12px;">
                            <span style="background: #00b894; color: white; padding: 6px 12px; border-radius: 12px; font-size: 13px; font-weight: 600;">Node.js</span>
                            <span style="background: #00b894; color: white; padding: 6px 12px; border-radius: 12px; font-size: 13px; font-weight: 600;">Python</span>
                            <span style="background: #00b894; color: white; padding: 6px 12px; border-radius: 12px; font-size: 13px; font-weight: 600;">Express</span>
                        </div>
                        <div style="font-size: 13px; font-weight: 700; color: #888; margin-bottom: 8px;">Cloud Services</div>
                        <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                            <span style="background: #fdcb6e; color: white; padding: 6px 12px; border-radius: 12px; font-size: 13px; font-weight: 600;">AWS</span>
                            <span style="background: #fdcb6e; color: white; padding: 6px 12px; border-radius: 12px; font-size: 13px; font-weight: 600;">Docker</span>
                            <span style="background: #fdcb6e; color: white; padding: 6px 12px; border-radius: 12px; font-size: 13px; font-weight: 600;">Git</span>
                        </div>
                    </div>
                `
            },
            {
                icon: '🎓',
                title: 'Highlight Your GPA',
                desc: 'Move education up - your 3.8 GPA is excellent!',
                priority: 'low',
                detailContent: `
                    <h4 style="font-size: 16px; font-weight: 800; color: #1a1a1a; margin: 0 0 12px 0;">Why Highlight It?</h4>
                    <p style="font-size: 14px; color: #555; line-height: 1.6; margin-bottom: 16px;">
                        A 3.8/4.0 GPA is considered excellent and is an important competitive advantage for recent graduates.
                    </p>
                    <h4 style="font-size: 16px; font-weight: 800; color: #1a1a1a; margin: 0 0 12px 0;">Optimization Tips</h4>
                    <div style="background: #f8f9ff; border-radius: 12px; padding: 16px;">
                        <p style="font-size: 14px; color: #555; line-height: 1.6; margin: 0;">
                            • Move education section higher in resume<br>
                            • Highlight GPA (use <strong>bold</strong>)<br>
                            • Add relevant honors and scholarships<br>
                            • List core courses (if relevant to target position)
                        </p>
                    </div>
                `
            }
        ];

        let html = '';
        suggestions.forEach((item, index) => {
            html += `
            <div class="suggestion-card" data-suggestion-index="${index}" style="animation: slideUp 0.3s ease ${index * 0.1}s backwards;">
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
                const index = parseInt(card.dataset.suggestionIndex);
                showSuggestionDetail(suggestions[index]);
                addHapticFeedback();
            });
        });
    }
    
    /**
     * Show suggestion detail modal
     */
    function showSuggestionDetail(suggestion) {
        const iconEl = document.getElementById('suggestionDetailIcon');
        const titleEl = document.getElementById('suggestionDetailTitle');
        const descEl = document.getElementById('suggestionDetailDesc');
        const contentEl = document.getElementById('suggestionDetailContent');
        
        if (iconEl) {
            iconEl.textContent = suggestion.icon;
            iconEl.className = '';
            iconEl.style.cssText = `
                width: 56px; 
                height: 56px; 
                border-radius: 16px; 
                display: flex; 
                align-items: center; 
                justify-content: center; 
                font-size: 32px;
                background: ${suggestion.priority === 'high' ? 'linear-gradient(135deg, #FFE5E5, #FFB3B3)' : 
                            suggestion.priority === 'medium' ? 'linear-gradient(135deg, #FFF9E6, #FFE5B3)' : 
                            'linear-gradient(135deg, #E8F4FD, #CDDAFD)'};
            `;
        }
        
        if (titleEl) titleEl.textContent = suggestion.title;
        if (descEl) descEl.textContent = suggestion.desc;
        if (contentEl) contentEl.innerHTML = suggestion.detailContent;
        
        showView(suggestionDetailModal);
    }

    /**
     * Save resume data to the current resume
     */
    function saveResumeData() {
        const resumeData = {
            name: document.getElementById('inputName')?.value || '',
            email: document.getElementById('inputEmail')?.value || '',
            phone: document.getElementById('inputPhone')?.value || '',
            location: document.getElementById('inputLocation')?.value || '',
            summary: document.getElementById('inputSummary')?.value || '',
            school: document.getElementById('inputSchool')?.value || '',
            degree: document.getElementById('inputDegree')?.value || '',
            gpa: document.getElementById('inputGpa')?.value || '',
            graduation: document.getElementById('inputGraduation')?.value || '',
            company: document.getElementById('inputCompany')?.value || '',
            position: document.getElementById('inputPosition')?.value || '',
            duration: document.getElementById('inputDuration')?.value || '',
            experience: document.getElementById('inputExperience')?.value || '',
            projectName: document.getElementById('inputProjectName')?.value || '',
            technologies: document.getElementById('inputTechnologies')?.value || '',
            project: document.getElementById('inputProject')?.value || '',
            languages: document.getElementById('inputLanguages')?.value || '',
            tools: document.getElementById('inputTools')?.value || ''
        };
        
        // Save to current resume
        const resume = resumes.find(r => r.id === currentResumeId);
        if (resume) {
            resume.data = resumeData;
        }
        
        // Also save all resumes to localStorage
        localStorage.setItem('allResumes', JSON.stringify(resumes));
        localStorage.setItem('currentResumeId', currentResumeId);
    }

    /**
     * Load resume data for the current resume
     */
    function loadResumeData() {
        const resume = resumes.find(r => r.id === currentResumeId);
        const data = resume?.data;
        
        if (data) {
            document.getElementById('inputName').value = data.name || '';
            document.getElementById('inputEmail').value = data.email || '';
            document.getElementById('inputPhone').value = data.phone || '';
            document.getElementById('inputLocation').value = data.location || '';
            document.getElementById('inputSummary').value = data.summary || '';
            document.getElementById('inputSchool').value = data.school || '';
            document.getElementById('inputDegree').value = data.degree || '';
            document.getElementById('inputGpa').value = data.gpa || '';
            document.getElementById('inputGraduation').value = data.graduation || '';
            document.getElementById('inputCompany').value = data.company || '';
            document.getElementById('inputPosition').value = data.position || '';
            document.getElementById('inputDuration').value = data.duration || '';
            document.getElementById('inputExperience').value = data.experience || '';
            document.getElementById('inputProjectName').value = data.projectName || '';
            document.getElementById('inputTechnologies').value = data.technologies || '';
            document.getElementById('inputProject').value = data.project || '';
            document.getElementById('inputLanguages').value = data.languages || '';
            document.getElementById('inputTools').value = data.tools || '';
            return data;
        }
        return null;
    }

    /**
     * Render real resume preview
     */
    async function renderResumePreview() {
        const resume = resumes.find(r => r.id === currentResumeId);
        const previewContainer = document.getElementById('resumePreviewContent');
        
        if (!previewContainer) return;
        
        // Check if it's a PDF resume
        if (resume && resume.isPdf && resume.pdfData) {
            await renderPdfPreview(resume.pdfData, previewContainer);
            return;
        }
        
        // Otherwise render template-based resume
        const data = loadResumeData();
        
        if (!data) {
            previewContainer.innerHTML = `<div style="text-align: center; padding: 40px 20px; color: #888;">
                <div style="font-size: 48px; margin-bottom: 16px;">📄</div>
                <div style="font-size: 15px; font-weight: 600;">No resume data yet</div>
                <div style="font-size: 13px; margin-top: 8px;">Create a resume to see the preview</div>
            </div>`;
            return;
        }

        // Generate real resume HTML
        let html = '';
        
        // Name Header
        if (data.name) {
            html += `<h1 style="font-size: 24px; font-weight: 800; margin: 0 0 4px 0; color: #1a1a1a;">${data.name}</h1>`;
        }
        
        // Contact Info
        let contactInfo = [];
        if (data.email) contactInfo.push(data.email);
        if (data.phone) contactInfo.push(data.phone);
        if (data.location) contactInfo.push(data.location);
        if (contactInfo.length > 0) {
            html += `<p style="font-size: 12px; color: #666; margin: 0 0 20px 0;">${contactInfo.join(' • ')}</p>`;
        }
        
        // Summary
        if (data.summary) {
            html += `<div style="margin-bottom: 20px;">
                <h2 style="font-size: 14px; font-weight: 800; color: #667eea; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 1px;">Summary</h2>
                <p style="font-size: 13px; color: #333; line-height: 1.6; margin: 0;">${data.summary.replace(/\n/g, '<br>')}</p>
            </div>`;
        }
        
        // Education
        if (data.school || data.degree) {
            html += `<div style="margin-bottom: 20px;">
                <h2 style="font-size: 14px; font-weight: 800; color: #667eea; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 1px;">Education</h2>`;
            if (data.school) {
                html += `<div style="font-size: 14px; font-weight: 700; color: #1a1a1a; margin-bottom: 4px;">${data.school}</div>`;
            }
            if (data.degree) {
                html += `<div style="font-size: 13px; color: #333; margin-bottom: 4px;">${data.degree}</div>`;
            }
            if (data.gpa || data.graduation) {
                let eduDetails = [];
                if (data.gpa) eduDetails.push(`GPA: ${data.gpa}`);
                if (data.graduation) eduDetails.push(data.graduation);
                html += `<div style="font-size: 12px; color: #666;">${eduDetails.join(' • ')}</div>`;
            }
            html += `</div>`;
        }
        
        // Experience
        if (data.company || data.position) {
            html += `<div style="margin-bottom: 20px;">
                <h2 style="font-size: 14px; font-weight: 800; color: #667eea; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 1px;">Experience</h2>`;
            if (data.position) {
                html += `<div style="font-size: 14px; font-weight: 700; color: #1a1a1a; margin-bottom: 4px;">${data.position}</div>`;
            }
            if (data.company) {
                html += `<div style="font-size: 13px; color: #333; margin-bottom: 4px;">${data.company}</div>`;
            }
            if (data.duration) {
                html += `<div style="font-size: 12px; color: #666; margin-bottom: 8px;">${data.duration}</div>`;
            }
            if (data.experience) {
                html += `<div style="font-size: 13px; color: #333; line-height: 1.6;">${data.experience.replace(/\n/g, '<br>')}</div>`;
            }
            html += `</div>`;
        }
        
        // Projects
        if (data.projectName || data.project) {
            html += `<div style="margin-bottom: 20px;">
                <h2 style="font-size: 14px; font-weight: 800; color: #667eea; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 1px;">Projects</h2>`;
            if (data.projectName) {
                html += `<div style="font-size: 14px; font-weight: 700; color: #1a1a1a; margin-bottom: 4px;">${data.projectName}</div>`;
            }
            if (data.technologies) {
                html += `<div style="font-size: 12px; color: #666; margin-bottom: 8px;">Technologies: ${data.technologies}</div>`;
            }
            if (data.project) {
                html += `<div style="font-size: 13px; color: #333; line-height: 1.6;">${data.project.replace(/\n/g, '<br>')}</div>`;
            }
            html += `</div>`;
        }
        
        // Skills
        if (data.languages || data.tools) {
            html += `<div style="margin-bottom: 20px;">
                <h2 style="font-size: 14px; font-weight: 800; color: #667eea; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 1px;">Skills</h2>`;
            if (data.languages) {
                html += `<div style="font-size: 13px; color: #333; margin-bottom: 6px;"><strong>Languages:</strong> ${data.languages}</div>`;
            }
            if (data.tools) {
                html += `<div style="font-size: 13px; color: #333;"><strong>Tools & Frameworks:</strong> ${data.tools}</div>`;
            }
            html += `</div>`;
        }
        
        // If no data at all, show placeholder
        if (!html) {
            html = `<div style="text-align: center; padding: 40px 20px; color: #888;">
                <div style="font-size: 48px; margin-bottom: 16px;">📄</div>
                <div style="font-size: 15px; font-weight: 600;">No resume data yet</div>
                <div style="font-size: 13px; margin-top: 8px;">Create a resume to see the preview</div>
            </div>`;
        }
        
        previewContainer.innerHTML = html;
    }
    
    /**
     * Render PDF preview using PDF.js
     */
    async function renderPdfPreview(pdfData, container) {
        try {
            // Clear container
            container.innerHTML = '<div style="text-align: center; padding: 20px; color: #888;"><div class="spinner"></div><div style="margin-top: 16px;">Loading PDF...</div></div>';
            
            // Check if PDF.js is available
            if (typeof pdfjsLib === 'undefined') {
                container.innerHTML = `<div style="text-align: center; padding: 40px 20px; color: #888;">
                    <div style="font-size: 48px; margin-bottom: 16px;">⚠️</div>
                    <div style="font-size: 15px; font-weight: 600;">PDF Library Not Loaded</div>
                    <div style="font-size: 13px; margin-top: 8px;">Cannot preview PDF</div>
                </div>`;
                return;
            }
            
            // Load PDF document
            const loadingTask = pdfjsLib.getDocument({ data: pdfData });
            const pdf = await loadingTask.promise;
            
            // Clear container
            container.innerHTML = '';
            container.style.padding = '0';
            
            // Render all pages
            for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                const page = await pdf.getPage(pageNum);
                
                // Create canvas for this page
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                
                // Set scale to fit mobile width (max 360px)
                const viewport = page.getViewport({ scale: 1 });
                const scale = Math.min(360 / viewport.width, 2); // Max scale of 2 for quality
                const scaledViewport = page.getViewport({ scale: scale });
                
                canvas.width = scaledViewport.width;
                canvas.height = scaledViewport.height;
                canvas.style.width = '100%';
                canvas.style.height = 'auto';
                canvas.style.marginBottom = pageNum < pdf.numPages ? '20px' : '0';
                canvas.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                canvas.style.borderRadius = '8px';
                
                // Render page
                const renderContext = {
                    canvasContext: context,
                    viewport: scaledViewport
                };
                
                await page.render(renderContext).promise;
                
                container.appendChild(canvas);
            }
            
        } catch (error) {
            console.error('PDF Render Error:', error);
            container.innerHTML = `<div style="text-align: center; padding: 40px 20px; color: #888;">
                <div style="font-size: 48px; margin-bottom: 16px;">❌</div>
                <div style="font-size: 15px; font-weight: 600;">PDF Loading Failed</div>
                <div style="font-size: 13px; margin-top: 8px;">${error.message}</div>
            </div>`;
        }
    }

    // ========================================
    // 4. INITIALIZATION
    // ========================================

    console.log('✅ Resume Center loaded successfully');
    console.log('📱 Device: iPhone 17 Pro Max (430 x 932)');
    
    // Load saved resumes from localStorage
    const savedResumes = localStorage.getItem('allResumes');
    const savedCurrentId = localStorage.getItem('currentResumeId');
    if (savedResumes) {
        resumes = JSON.parse(savedResumes);
        currentResumeId = savedCurrentId;
        
        // Restore UI state if we have resumes
        if (resumes.length > 0) {
            headerDefault?.classList.add('hidden');
            headerUploaded?.classList.remove('hidden');
            
            // Recreate all resume cards
            resumes.forEach(resume => {
                addResumeCard(resume);
            });
            
            // Update UI for current resume
            if (currentResumeId) {
                selectResume(currentResumeId);
            }
        }
    }
    
    // Load saved resume data when opening edit view
    btnEditResume?.addEventListener('click', () => {
        loadResumeData();
    });
    
    // Load data when using template
    actionTemplate?.addEventListener('click', () => {
        setTimeout(() => {
            loadResumeData();
        }, 100);
    });
    
    // Add smooth scroll behavior
    document.querySelector('.app-content')?.addEventListener('scroll', () => {
        // Can add scroll-based effects here
    });

});

