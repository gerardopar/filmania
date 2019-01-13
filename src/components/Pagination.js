import React from 'react';

const Pagination = (props) => (
    <div className="pagination__wrap">
        <button type="submit" onClick={(e) => props.handleMovies(e, 1)} className="pagination__btn waves-effect waves-light">1</button>
        <button type="submit" onClick={(e) => props.handleMovies(e, 2)} className="pagination__btn waves-effect waves-light">2</button>
        <button type="submit" onClick={(e) => props.handleMovies(e, 3)} className="pagination__btn waves-effect waves-light">3</button>
        <button type="submit" onClick={(e) => props.handleMovies(e, 4)} className="pagination__btn waves-effect waves-light">4</button>
        <button type="submit" onClick={(e) => props.handleMovies(e, 5)} className="pagination__btn waves-effect waves-light">5</button>
    </div>
);

export default Pagination;