const sortMovies = (arr, sortByType) => {
    let sortedArr = [];

    if (sortByType === 'release_date') {
        sortedArr = arr.sort((a, b) => ((new Date(a[sortByType]) < new Date(b[sortByType])) ? 1 : -1));
    }

    if (sortByType === 'title') {
        sortedArr = arr.sort((a, b) => ((a[sortByType] > b[sortByType]) ? 1 : -1));
    } 

    if (sortByType === 'vote_average') {
        sortedArr = arr.sort((a, b) => ((a[sortByType] < b[sortByType]) ? 1 : -1));
    } 

    return sortedArr;
};

export default sortMovies;
