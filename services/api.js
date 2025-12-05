import axios from 'axios';

// Replace with your actual deployed backend URL or local IP for testing
// For Android Emulator, use 'http://10.0.2.2:5000'
// For Physical Device, use your computer's IP address e.g., 'http://192.168.1.X:5000'
const BASE_URL = 'http://10.0.2.2:5000/api/v1';

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

// Stress Analysis Endpoint
export const analyzeStress = async (imageFormData) => {
    try {
        const response = await api.post('/scan/analyze', imageFormData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Stress Analysis Error:', error);
        throw error;
    }
};

// Chat Endpoint
export const sendChatMessage = async (message, contextStressLevel) => {
    try {
        const response = await api.post('/chat/message', {
            message,
            context_stress_level: contextStressLevel,
        });
        return response.data;
    } catch (error) {
        console.error('Chat Error:', error);
        throw error;
    }
};

// Avatar Generation (Placeholder)
export const generateAvatar = async (imageFormData) => {
    try {
        const response = await api.post('/avatar/generate', imageFormData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Avatar Gen Error:', error);
        throw error;
    }
};

export default api;
