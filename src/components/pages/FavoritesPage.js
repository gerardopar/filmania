// * importing modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// * importing components
import Header from '../header/Header';
import Spinner from '../spinner/Spinner';
import Navigation from '../nav/Navigation';
import FavMovieItem from '../FavMovieItem';

class FavoritesPage extends Component {
    constructor(props) {
        super(props);

        this.state = { // initial state
            movies: []
        };
    }

    componentDidMount() {
        this.props.token ? this.handleFavMovies() : null;
    }

    handleMovieSearchSubmit = (e) => {
        e.preventDefault();
        const movieTitle = e.target.elements.title.value;
        if (movieTitle === '' || movieTitle.length === 0 || movieTitle === null || movieTitle === undefined) {
            console.log('no movie searched');
        } else {
            fetch('https://filmania-rest-api.herokuapp.com/movies/postMovieSearched', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                movieTitle
            })
        })
        .then(data => data.json())
        .then((movie) => {
            this.props.history.push(`/movie/${movie.movieId}`);
        })
        .catch(err => (err));
        }
    }

    handleFavMovies = () => {
        fetch('https://filmania-rest-api.herokuapp.com/movies/favorites', {
            headers: {
                Authorization: `Bearer ${this.props.token}`, // required to authenticate the user
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then((data) => {
            this.setState(({ movies: [...data.movies] }));
        })
        .catch((err) => {
            console.log(err);
        });
}
    

    handleDeleteMovie = (e, id) => {
        e.preventDefault();

        fetch('https://filmania-rest-api.herokuapp.com/movies/deleteFav', {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${this.props.token}`, // required to authenticate the user
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id
        })
        })
        .then((res) => {
            if (res.status === 422) {
            throw new Error('Validation failed.');
            }
            if (res.status !== 200 && res.status !== 201) {
            throw new Error('Could not authenticate you!');
            }
            return res.json();
        })
        .then(() => {
            this.setState(prevState => ({
                movies: prevState.movies.filter(movie => movie._id !== id)
            }));
        })
        .catch((err) => {
            console.log(err);
        });
    }

    render() {
        return (
            <div>
                <Header 
                  handleMovieSearchSubmit={this.handleMovieSearchSubmit}
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
                            : this.state.movies.map(movie => (
                                <FavMovieItem 
                                  handleDeleteMovie={this.handleDeleteMovie}
                                  {...movie}
                                  key={movie._id}
                                />
                            ))
                        }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

FavoritesPage.propTypes = {
    history: PropTypes.objectOf(PropTypes.any),
    token: PropTypes.string
};

FavoritesPage.defaultProps = {
    history: {},
    token: ''
};

export default FavoritesPage;
