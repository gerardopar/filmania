/* eslint-disable */ 
const genreRedirectPath = (genre) => {
    const movieGenre = genre.toLowerCase();
    if (movieGenre === 'thriller' || movieGenre === 'action' || movieGenre === 'crime') {
        return '/thriller';
    } 
    if (movieGenre === 'animation' || movieGenre === 'family' || movieGenre === 'music') { 
        return '/animation';
    } 
    if (movieGenre === 'comedy') { 
        return '/comedy';
    } 
    if (movieGenre === 'adventure') { 
        return '/adventure';
    } 
    if (movieGenre === 'fantasy') { 
        return '/fantasy';
    } 
    if (movieGenre === 'documentary') { 
        return '/documentary';
    } 
    if (movieGenre === 'drama') { 
        return '/drama';
    } 
    if (movieGenre === 'science fiction') { 
        return '/scienceFiction';
    } 
    if (movieGenre === 'horror' || movieGenre === 'mystery') { 
        return '/horror';
    }
};

export { genreRedirectPath as default }; 
