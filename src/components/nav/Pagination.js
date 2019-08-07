// importing modules
import React from 'react';
import PropTypes from 'prop-types';

const pagination = props => (
    <div className="pagination__wrap">
        <button type="submit" onClick={() => props.handleMovies(1)} className="pagination__btn waves-effect waves-light">1</button>
        <button type="submit" onClick={() => props.handleMovies(2)} className="pagination__btn waves-effect waves-light">2</button>
        <button type="submit" onClick={() => props.handleMovies(3)} className="pagination__btn waves-effect waves-light">3</button>
        <button type="submit" onClick={() => props.handleMovies(4)} className="pagination__btn waves-effect waves-light">4</button>
        <button type="submit" onClick={() => props.handleMovies(5)} className="pagination__btn waves-effect waves-light">5</button>
    </div>
);

pagination.propTypes = {
    handleMovies: PropTypes.func
};

pagination.defaultProps = {
    handleMovies: () => {}
};

export default pagination;
