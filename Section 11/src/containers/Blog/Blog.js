import React, { Component } from 'react';
import {Route, NavLink, Switch, Redirect} from 'react-router-dom';

// import axios from 'axios';
import Posts from './Posts/Posts';
//import NewPost from './NewPost/NewPost';
import asyncComponent from '../../hoc/asyncComponent';

import './Blog.css';

const AsyncNewPost = asyncComponent(() => {
    return import('./NewPost/NewPost');
});

class Blog extends Component {
    state = {
        auth: true
    }

    render () {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink to='/posts' exact>Posts</NavLink></li>
                            <li><NavLink to='/new-post' exact>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>

                <Switch>
                    {this.state.auth ? <Route path='/new-post' component={AsyncNewPost} /> : null}
                    <Route path='/posts' component={Posts} />
                    <Route render={() => <h1>Not found</h1>} />
                    {/*<Redirect from='/' to='/posts' />*/}
                </Switch>
            </div>
        );
    }
}

export default Blog;