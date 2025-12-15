import request from '@/utils/request';

/**
 * Resume Detail Interface (Stored in MongoDB)
 */
export interface ResumeDetail {
  skills: string[];
  education?: any[];
  projects?: any[];
  rawContent?: string;
}

/**
 * Resume Interface (Main Entity in MySQL)
 */
export interface Resume {
  resumeId?: number;
  userId: number;
  title: string;
  targetJob: string;
  fileUrl: string;
  status?: string;
  mongoDocId?: string;
  detail: ResumeDetail; // Nested document for MongoDB
}

/**
 * Create Resume API
 * @param data Resume Data
 */
export const createResumeApi = (data: Resume) => {
  return request<Resume>({
    url: '/api/resumes',
    method: 'POST',
    data,
  });
};

/**
 * Get Resume API
 * @param resumeId Resume ID
 */
export const getResumeApi = (resumeId: number) => {
  return request<Resume>({
    url: `/api/resumes/${resumeId}`,
    method: 'GET',
  });
};

/**
 * Get User Resumes API
 * @param userId User ID
 */
export const getUserResumesApi = (userId: number) => {
  return request<Resume[]>({
    url: `/api/resumes/user/${userId}`,
    method: 'GET',
  });
};

