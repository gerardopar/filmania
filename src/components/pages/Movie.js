// * importing modules
import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// * importing components
import Header from '../header/Header';
import LoginModal from '../modals/LoginModal';
import SignupModal from '../modals/SignupModal';
import Navigation from '../nav/Navigation';
import MovieDetails from '../MovieDetails';
import Spinner from '../spinner/Spinner';

class Movie extends Component {
    constructor(props){
        super(props);

        this.state = {
            movie_backdrop: '',
            movie_genres: [],
            movie_overview: '',
            movie_id: '',
            movie_length: '',
            movie_poster: '',
            movie_rdate: '',
            movie_title: '',
            movie_trailer: '',
            movie_rating: '',
            related_movies: [],
            hidden: true,
            showSignupModal: false,
            Errors: {
                signup: null
            }
        };

        this.handleSignupModal = this.handleSignupModal.bind(this);
        this.handleSignup = this.handleSignup.bind(this);
        this.handleGetMovieDetails = this.handleGetMovieDetails.bind(this);
        this.handleSimiliarMovies = this.handleSimiliarMovies.bind(this);
        this.handleRedirectHome = this.handleRedirectHome.bind(this);
        this.handleAddMovieToFav = this.handleAddMovieToFav.bind(this);
        this.handleHomePage = this.handleHomePage.bind(this);
    }

    componentDidMount(){
        this.handleGetMovieDetails();
        this.handleSimiliarMovies();
    }

    // method: handles user signup
    handleSignup(e){
        e.preventDefault();
        fetch(`https://filmania-rest-api.herokuapp.com/signup`, {
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
                "Validation failed. Email already in use!"
            );
            }
            if (res.status !== 200 && res.status !== 201) {
            console.log('Error!');
            throw new Error('Creating a user failed!');
            }
            return res.json();
        })
        .then(result => {
            this.setState({ showSignupModal: false });
        })
        .catch((err) => {
            console.log(err);
            this.setState({ Errors: { signup: err.message } });
        });
    }

    handleGetMovieDetails(){

        // get params id
        const movieId = this.props.match.params.id;

        fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=35d4df93498d535a82e07c079691b79c&language=en-US`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((data) => {
            return data.json();
        })
        .then((movie) => {
            this.setState(() => ({
                movie_backdrop: `https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`,
                movie_id: movie.id,
                movie_length: movie.runtime,
                movie_overview: movie.overview,
                movie_poster: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
                movie_rating: movie.vote_average,
                movie_rdate: movie.release_date,
                movie_title: movie.title,
            }));
            movie.genres.forEach((movie) => {
                this.setState(() => ({
                    movie_genres: this.state.movie_genres.concat(` - ${movie.name}`)
                }));
            })

            fetch(`http://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=35d4df93498d535a82e07c079691b79c`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
            })
            .then((data) => {
                return data.json();
            })
            .then((trailer) => {
                this.setState(() => ({
                    movie_trailer: `https://www.youtube.com/embed/${trailer.results[0].key}`
                }));
            })
            .catch((err) => {
                console.log(err)
            })

        })
        .catch((err) => {
            console.log(err);
        })
    }

    handleSimiliarMovies(){

        const movieId = this.props.match.params.id;

        fetch(`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=35d4df93498d535a82e07c079691b79c&language=en-US&page=1`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((data) => {
            return data.json();
        })
        .then((movies) => {
            
            this.setState(() => ({
                related_movies: [...movies.results]
            }));
        })
        .catch((err) => {
            console.log(err)
        });
    }

    handleSignupModal(){
        this.setState(() => ({
            showSignupModal: !this.state.showSignupModal
        }));
    }

    handleRedirectHome(){
        this.props.history.push('/');
    }

    handleAddMovieToFav(e, id, poster, title, rating){
        e.preventDefault();

        const movieToAdd = {
            movie_id: id,
            movie_poster: poster,
            movie_title: title,
            movie_rating: rating
        }

        e.preventDefault();
        fetch(`https://filmania-rest-api.herokuapp.com/movies/addToFav`, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + this.props.token, // required to authenticate the user
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                movieToAdd: movieToAdd
            })
        })
        .then((data) => {
            return data.json();
        })
        .then((data) => {
            // console.log(data);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    handleHomePage(){
        this.props.history.push('/');
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
                                signupError={this.state.Errors.signup}
                                handleSignup={this.handleSignup}
                                handleSignupModal={this.handleSignupModal}/> 
                            : null
                    }
                </ReactCSSTransitionGroup>
                <Header 
                    isAuth={this.props.isAuth}
                    hidden={this.state.hidden}
                    handleLogout={this.props.handleLogout}
                    handleLoginModal={this.props.handleLoginModal} 
                    handleSignupModal={this.handleSignupModal} 
                    handleHomePage={this.handleHomePage}
                    />
                <div className="layout">
                    <div className="layout__col--one z-depth-5">
                        <Navigation />
                    </div>
                    <div className="layout__col--two z-depth-5">
                        {
                            this.state.movie_title.length === 0 
                                ? <Spinner /> 
                                : <MovieDetails 
                                    handleAddMovieToFav={this.handleAddMovieToFav}
                                    handleRedirectHome={this.handleRedirectHome}
                                    hidden={this.state.hidden}
                                    {...this.state}/>
                        }
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default Movie;