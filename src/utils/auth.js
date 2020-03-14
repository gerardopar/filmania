import moment from 'moment';

export const setToken = (userId, token) => {
    const date = Date.now(); // new token date
    const dateAdded = moment(date).format('MMMM Do YYYY, h:mm:ss a'); // token creation date
    const dateAhead = moment(date).add(1, 'h'); // token life
    const dateToBeRemoved = moment(dateAhead._d).format('MMMM Do YYYY, h:mm:ss a'); // token remove date
    localStorage.setItem('tokenCreated', dateAdded);
    localStorage.setItem('tokenExpires', dateToBeRemoved);
    localStorage.setItem('isAuth', true);
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
};

export const removeToken = () => {
    localStorage.removeItem('tokenCreated');
    localStorage.removeItem('tokenExpires');
    localStorage.removeItem('isAuth');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
};
