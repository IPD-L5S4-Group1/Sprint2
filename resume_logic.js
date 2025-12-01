/**
 * Resume Prototype Logic
 * Handles interactions for the Resume Center mobile prototype
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Elements ---
    const addResumeBtn = document.getElementById('addResumeBtn');
    const modalOverlay = document.getElementById('modalOverlay');
    const actionCancel = document.getElementById('actionCancel');
    const actionUploadPdf = document.getElementById('actionUploadPdf');
    const toast = document.getElementById('toast');
    
    // State Elements
    const headerDefault = document.getElementById('headerDefaultContent');
    const headerUploaded = document.getElementById('headerUploadedContent');
    const uploadedFileItem = document.getElementById('uploadedFileItem');
    
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
            // Hide modal first
            modalOverlay.style.display = 'none';
            
            // Simulate File Selection & Upload Process
            simulateUploadProcess();
        });
    }

    // --- Helper Functions ---

    function simulateUploadProcess() {
        // 1. Show Loading Toast (reusing simple toast for now, could be improved)
        showToast('正在上传...', 2000);

        // 2. After delay, update UI to "Uploaded" state
        setTimeout(() => {
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
        // 1. Transform Header Card
        headerDefault.classList.add('hidden');
        headerUploaded.classList.remove('hidden');
        headerUploaded.classList.add('d-flex');

        // 2. Transform Middle Section
        addResumeBtn.style.display = 'none'; // Hide the big add button
        uploadedFileItem.classList.remove('hidden'); // Show the file list item
        
        // Note: Bottom section remains empty until AI Diagnosis
    }

});

