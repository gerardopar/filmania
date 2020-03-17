import React from 'react';

const FilterBar = props => (
    <div className="filterBy">
    <div className="filterBy__container">
        <label htmlFor="title" className="filterBy__label">
            <input 
              onChange={props.handleUserInput}
              checked={props.sortBy === 'title'} 
              className="filterBy__checkbox" 
              type="checkbox" 
              id="title" 
              name="sortBy" 
              value="title"
            />
            Title
        </label>
        <label className="filterBy__label" htmlFor="release_date">
            <input 
              onChange={props.handleUserInput}
              checked={props.sortBy === 'release_date'} 
              type="checkbox" 
              id="release_date" 
              name="sortBy" 
              value="release_date"
            />
            Released
        </label>
        <label className="filterBy__label" htmlFor="vote_average">
            <input 
              onChange={props.handleUserInput}
              checked={props.sortBy === 'vote_average'} 
              type="checkbox"
              id="vote_average" 
              name="sortBy" 
              value="vote_average"
            />
            Rating
        </label>
    </div>
    </div>
);

export default FilterBar;
