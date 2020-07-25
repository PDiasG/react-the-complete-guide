import React, {Component} from 'react';
import {Route} from 'react-router-dom';

import axios from '../../../axios';

import Post from '../../../components/Post/Post';
import FullPost from '../FullPost/FullPost';
import {Link} from 'react-router-dom';

import './Posts.css'

class Posts extends Component {
    state = {
        posts: [],
        selectedPostId: null
    }

    componentDidMount() {
        axios.get('/posts')
            .then(response => {
                const posts = response.data.slice(0, 4);
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Max'
                    }
                })

                this.setState({posts: updatedPosts});
            })
            .catch(error => {
                //this.setState({error: true});
            });
    }

    postSelectedHandler = (id) => {
        this.props.history.push('/posts/' + id);
    }

    render() {
        let posts = <p style={{textAlign: 'center', color: 'red'}}>Something went wrong!</p>
        
        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return (
                    <Post 
                        key={post.id}
                        title={post.title} 
                        author={post.author} 
                        clicked={() => this.postSelectedHandler(post.id)}/>
                )
            });
        }

        return(
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <Route path={this.props.match.url + '/:id'} exact component={FullPost} />
            </div>
        );

    }
}

export default Posts;