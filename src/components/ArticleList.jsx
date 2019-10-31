import React, { Component } from 'react'
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getArticles } from '../actions';

class ArticleList extends Component {
    componentDidMount() {
        this.props.getArticles();
    }
    render() {
        if (this.props.articles.length) {
            return (
                <div>
                    {
                        this.props.articles.map(article => {
                            return (
                                <div key={article.id} >
                                    <h4><Link to={`/articles/${article.id}`}> {article.title}</Link></h4>
                                    <p>{article.body}</p>
                                </div>
                            )
                        })
                    }
                </div>
            )
        } else {
            return (
                <div>No articles</div>
            )
        }
    }
}
const mapStateToProps = (state) => ({ articles: state.articles });
export default connect(mapStateToProps, { getArticles })(ArticleList);