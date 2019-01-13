// * importing modules
import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
// * importing components
import Header from './Header';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import Spinner from './Spinner';
import Navigation from './Navigation';
import FavMovieItem from './FavMovieItem';

class FavoritesPage extends Component {
    constructor(props){
        super(props);

        this.state = { // initial state
            movies: [],
            filteredMovies: [],
            page: 1,
            showSignupModal: false
        };

        this.handleFavMovies = this.handleFavMovies.bind(this);
        this.handleDeleteMovie = this.handleDeleteMovie.bind(this);

        this.handleMovieSearch = this.handleMovieSearch.bind(this);
        this.handleMovieSearchSubmit = this.handleMovieSearchSubmit.bind(this);
        this.handleSignupModal = this.handleSignupModal.bind(this);
        this.handleSignup = this.handleSignup.bind(this);
        this.handleHomePage = this.handleHomePage.bind(this);
    }

    componentDidMount(){
        this.props.token ? this.handleFavMovies() : null;
    }

    // method: handles user signup
    handleSignup(e){
        e.preventDefault();
        fetch(`http://localhost:3000/signup`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: e.target.elements.email.value,
            password: e.target.elements.password.value,
            movies: []
        })
        })
        .then(res => {
            if (res.status === 422) {
            throw new Error(
                "Validation failed. Make sure the email address isn't used yet!"
            );
            }
            if (res.status !== 200 && res.status !== 201) {
            console.log('Error!');
            throw new Error('Creating a user failed!');
            }
            return res.json();
        })
        .then(result => {
            console.log(result);
            this.setState({ showSignupModal: false });
        })
        .catch((err) => console.log(err));
    }

    handleMovieSearch(e){
        e.preventDefault();
        let movieSearched = e.target.value.trim().toUpperCase(); // onchange user input

        const filteredMovies = this.state.movies.filter((movie) => {
            return movie.title.toLowerCase().includes(movieSearched.toLowerCase());
        }); 

        this.setState(() => ({
            filteredMovies: filteredMovies // set the filtered movies array
        }));
    }

    handleMovieSearchSubmit(e){
        e.preventDefault();
        let movie_title = e.target.elements.title.value;
        if(movie_title === '' || movie_title.length === 0 || movie_title === null || movie_title === undefined) {
            console.log('no movie searched');
        } else {

        fetch(`https://api.themoviedb.org/3/search/movie?api_key=35d4df93498d535a82e07c079691b79c&language=en-US&query=${movie_title}&page=1&include_adult=false`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((data) => {
            return data.json();
        })
        .then((movie) => {
            const movieId = movie.results[0].id;
            this.props.history.push(`/movie/${movieId}`);
        })
        .catch((err) => (err));
        
        }
    }

    handleFavMovies(){
        fetch(`http://localhost:3000/movies/favorites`, {
            headers: {
                Authorization: 'Bearer ' + this.props.token, // required to authenticate the user
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            return res.json();
        })
        .then((data) => {
            console.log(data);
            this.setState(({ movies: [...data.movies] }));
        })
        .catch((err) => {
            console.log(err);
        })
}

    handleSignupModal(){
        this.setState(() => ({
            showSignupModal: !this.state.showSignupModal
        }));
    }

    handleHomePage(){
        this.props.history.push('/');
        console.log('heading home!');
    }

    handleDeleteMovie(e, id){
        e.preventDefault();

        fetch(`http://localhost:3000/movies/deleteFav`, {
        method: 'DELETE',
        headers: {
            Authorization: 'Bearer ' + this.props.token, // required to authenticate the user
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id
        })
        })
        .then(res => {
            if (res.status === 422) {
            throw new Error('Validation failed.');
            }
            if (res.status !== 200 && res.status !== 201) {
            throw new Error('Could not authenticate you!');
            }
            return res.json();
        })
        .then((result) => {
            console.log(result);
            
            this.setState((prevState) => ({
                movies: prevState.movies.filter((movie) => movie._id !== id)
            }))
        })
        .catch(err => {
            console.log(err);
        });
    }

    render(){
        return (
            
            <div>
            <ReactCSSTransitionGroup
                transitionName="trans"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}>
                {
                    this.props.showLoginModal 
                        ? <LoginModal
                            handleLoginModal={this.props.handleLoginModal}/> 
                        : null
                }
            </ReactCSSTransitionGroup>
            <ReactCSSTransitionGroup
                transitionName="trans"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}>
                {
                    this.state.showSignupModal 
                        ? <SignupModal 
                            handleSignup={this.handleSignup}
                            handleSignupModal={this.handleSignupModal}/> 
                        : null
                }
            </ReactCSSTransitionGroup>
                <Header 
                    handleSignupModal={this.handleSignupModal} 
                    handleMovieSearchSubmit={this.handleMovieSearchSubmit}
                    handleMovieSearch={this.handleMovieSearch}
                    handleHomePage={this.handleHomePage}
                    />
                <div className="layout">
                    <div className="layout__col--one z-depth-5">
                        <Navigation />
                    </div>
                    <div className="layout__col--two z-depth-5">
                        <div className="movieList__wrap z-depth-5">
                        {
                            this.state.movies.length === 0 
                                ? <Spinner />
                                : this.state.movies.map((moviesList, index) => (
                                    <FavMovieItem 
                                    handleDeleteMovie={this.handleDeleteMovie}
                                    {...moviesList}
                                    key={index}
                                    /> ))
                        }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default FavoritesPage;