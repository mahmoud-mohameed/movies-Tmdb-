import axiosClient from "./axiosClient";

// تصنيف ال categories الي افلام ومسلسلات
export const category = {
    movie: 'movie',
    tv: 'tv'
};

// تصنيف نوع الافلام الي ثلاثة
export const movieType = {
    upcoming: 'upcoming',
    popular: 'popular',
    top_rated: 'top_rated'
};

// تصنيف نوع المسلسلات الي ثلاثة
export const tvType = {
    popular: 'popular',
    top_rated: 'top_rated',
    on_the_air: 'on_the_air'
};

const tmdbApi = {
    // جلب قائمة الافلام
    getMoviesList: (type, params) => {
        const url = `movie/${movieType[type]}`;
        return axiosClient.get(url, { params });
    },
    // جلب قائمة المسلسلات
    getTvList: (type, params) => {
        const url = `tv/${tvType[type]}`;
        return axiosClient.get(url, { params });
    },
    // جلب مقاطع الفيديو
    getVideos: (cate, id) => {
        const url = `${category[cate]}/${id}/videos`;
        return axiosClient.get(url);
    },
    // البحث عن الافلام او المسلسلات
    search: (cate, params) => {
        const url = `search/${category[cate]}`;
        return axiosClient.get(url, { params });
    },
    // جلب تفاصيل الفيلم او المسلسل
    getDetails: (cate, id) => {
        const url = `${category[cate]}/${id}`;
        return axiosClient.get(url);
    },
    // جلب طاقم العمل
    credits: (cate, id) => {
        const url = `${category[cate]}/${id}/credits`;
        return axiosClient.get(url);
    },
    // جلب المحتوي المشابه
    similar: (cate, id) => {
        const url = `${category[cate]}/${id}/similar`;
        return axiosClient.get(url);
    }
};

export default tmdbApi;