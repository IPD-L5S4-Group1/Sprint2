<template>
  <view class="container">
    <!-- Header -->
    <view class="header">
      <text class="title">Sprint 2 Demo</text>
      <text class="subtitle">MySQL + MongoDB Dual Write</text>
    </view>

    <!-- Area A: Create Resume -->
    <view class="card">
      <view class="card-header">
        <text class="card-title">1. Write Data (Create)</text>
      </view>
      <view class="form-item">
        <text class="label">Title (MySQL):</text>
        <input class="input" v-model="form.title" placeholder="e.g., Java Engineer" />
      </view>
      <view class="form-item">
        <text class="label">Target Job (MySQL):</text>
        <input class="input" v-model="form.targetJob" placeholder="e.g., Backend Dev" />
      </view>
      <view class="form-item">
        <text class="label">Skills (MongoDB):</text>
        <input class="input" v-model="skillInput" placeholder="Comma separated (e.g., Java, Vue)" />
      </view>
      <button class="btn-primary" @click="handleSubmit" :loading="loading">Submit to DB</button>
    </view>

    <!-- Area B: Read Result -->
    <view class="card" v-if="createdResumeId">
      <view class="card-header">
        <text class="card-title">2. Read Data (Retrieve)</text>
      </view>
      <view class="result-info">
        <text>Created ID: {{ createdResumeId }}</text>
      </view>
      <button class="btn-secondary" @click="handleQuery">Query from DB (ID: {{ createdResumeId }})</button>
      
      <!-- API Response Display -->
      <view class="json-box" v-if="queryResult">
        <text class="json-content">{{ JSON.stringify(queryResult, null, 2) }}</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { createResumeApi, getResumeApi, type Resume } from '@/api/resume';

const loading = ref(false);
const createdResumeId = ref<number | null>(null);
const queryResult = ref<Resume | null>(null);

// Form Data
const form = ref({
  title: 'My Resume v1',
  targetJob: 'Java Developer',
});
const skillInput = ref('Java, Spring Boot, MySQL');

// Submit Handler
const handleSubmit = async () => {
  if (!form.value.title || !form.value.targetJob) {
    uni.showToast({ title: 'Please fill fields', icon: 'none' });
    return;
  }

  loading.value = true;
  try {
    // Construct Payload
    const payload: Resume = {
      userId: 1, // Mock User ID
      title: form.value.title,
      targetJob: form.value.targetJob,
      fileUrl: 'http://mock.url/resume.pdf',
      detail: {
        skills: skillInput.value.split(',').map(s => s.trim()),
        education: [{ school: 'Demo University', degree: 'Bachelor' }], // Mock Data
        rawContent: 'This is a raw content stored in MongoDB...'
      }
    };

    const res = await createResumeApi(payload);
    console.log('Create Success:', res);
    
    createdResumeId.value = res.resumeId || null;
    uni.showToast({ title: 'Created Success!', icon: 'success' });
    
    // Reset Query Result
    queryResult.value = null;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

// Query Handler
const handleQuery = async () => {
  if (!createdResumeId.value) return;
  
  uni.showLoading({ title: 'Loading...' });
  try {
    const res = await getResumeApi(createdResumeId.value);
    console.log('Query Success:', res);
    queryResult.value = res;
    uni.showToast({ title: 'Query Success', icon: 'none' });
  } catch (error) {
    console.error(error);
  } finally {
    uni.hideLoading();
  }
};
</script>

<style>
.container {
  padding: 20px;
  background-color: #f5f7fa;
  min-height: 100vh;
}

.header {
  margin-bottom: 20px;
  text-align: center;
}

.title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  display: block;
}

.subtitle {
  font-size: 14px;
  color: #666;
  margin-top: 5px;
  display: block;
}

.card {
  background-color: #fff;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.card-header {
  margin-bottom: 15px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.card-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.form-item {
  margin-bottom: 15px;
}

.label {
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
  display: block;
}

.input {
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 10px;
  font-size: 14px;
  background-color: #fff;
  width: 100%;
  box-sizing: border-box;
  /* Ensure input is clickable */
  position: relative; 
  z-index: 1;
  height: 44px; /* Explicit height */
}


.btn-primary {
  background-color: #007aff;
  color: #fff;
  border-radius: 6px;
  margin-top: 10px;
}

.btn-secondary {
  background-color: #34c759;
  color: #fff;
  border-radius: 6px;
  margin-top: 10px;
}

.result-info {
  margin-bottom: 10px;
  font-size: 14px;
  color: #333;
}

.json-box {
  background-color: #2d2d2d;
  color: #fff;
  padding: 15px;
  border-radius: 6px;
  margin-top: 15px;
  overflow-x: auto;
  min-height: 100px;
}

.json-content {
  font-family: monospace;
  font-size: 12px;
  white-space: pre-wrap;
  word-break: break-all;
}
</style>
