import React from 'react';
import { NavLink } from 'react-router-dom';
import RouteContext from '../../context/route-context';

const Header = (props) => (
    <div>
    <RouteContext.Consumer>
    {routeContext => {
    return (
        <header className="header z-depth-5">
                <div>
                    <h4 onClick={props.handleHomePage} className="header__title">FILMANIA</h4>
                </div>

                {
                    props.hidden 
                        ? <div></div>
                        : <form onSubmit={props.handleMovieSearchSubmit} className="header__form z-depth-5">
                            <input 
                                disabled={props.disable ? true : false}
                                onChange={props.handleMovieSearch} 
                                className="header__form--input" 
                                placeholder="SEARCH MOVIES.." 
                                name="title"
                                autoComplete="off"
                                />
                            <button type="submit" className="material-icons waves-effect waves-light header__form--btn white-text">search</button>
                        </form>
                }
                

            <div>
                {
                    routeContext.isAuth === false
                        ?   <div>
                                <button onClick={routeContext.handleLoginModal} className="btn-small waves-effect waves-light header__form--btn--login">LOG IN</button>
                                <button onClick={props.handleSignupModal} className="btn-small waves-effect waves-light header__form--btn--signup">SIGN UP</button>
                            </div>
                        :   <div>
                                <NavLink to="/favorites" className="btn-small waves-effect waves-light header__form--btn--favorites">FAVORITES</NavLink>
                                <button onClick={routeContext.handleLogout} className="btn-small waves-effect waves-light header__form--btn--signout">SIGN OUT</button>
                            </div>
                }
                
            </div>
        </header>
        )}
    }
    </RouteContext.Consumer>
    </div>
);

export default Header;