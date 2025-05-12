import axios from 'axios';
import queryString from 'query-string';
import apiConfig from './apiConfig';

const axiosClient = axios.create({
    baseURL: apiConfig.baseUrl, // الرابط الأساسي لكل الطلبات
    headers: {
        'Content-Type': 'application/json' // التأكد من إرسال البيانات كـ JSON
    },
    // تمرير الـ api_key تلقائيًا مع كل طلب
    paramsSerializer: params => queryString.stringify(
        Object.fromEntries(
            Object.entries({ ...params, api_key: apiConfig.apiKey }).filter(([_, v]) => v != null)
        )
    )
});

//  تعديل الطلبات قبل إرسالها
axiosClient.interceptors.request.use(
    async (config) => {
        if (!config.params) {
            config.params = {};
        }
        if (!config.params.api_key) {
            config.params.api_key = apiConfig.apiKey;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

//  تحسين معالجة الاستجابات
axiosClient.interceptors.response.use(
    (response) => response?.data ?? response, // إرجاع `data` فقط لو موجودة
    (error) => {
        console.error("API Error:", error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default axiosClient;