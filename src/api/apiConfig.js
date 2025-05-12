const apiConfig={
    baseUrl: 'https://api.themoviedb.org/3/',   // الرابط الاساسي لل api من الموقع
    apiKey: '5142758c70e1bd04c3ebc3123ef0ec05', // ال key بتاع الاكونت بتاعي علي الموقع 

    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    // رابط الصورة بحجم 500 اقل جودة
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}


export default apiConfig; 