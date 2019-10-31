import React, { Component } from 'react'
import { connect } from "react-redux";
import { addArticle } from '../actions';
class ArticleAdd extends Component {
    state = {
        title: '',
        body: ''
    };
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.addArticle(this.state);
    };

    render() {
        return (
            <div>
                <h4>Add Article</h4>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input type="text" name="title" required value={this.state.title} onChange={this.handleChange}
                            className="form-control" placeholder="Title" />
                    </div>
                    <div className="form-group">
                        <textarea name="body" rows="5" required value={this.state.body} onChange={this.handleChange}
                            className="form-control" placeholder="Content" />
                    </div>
                    <button type="submit" className="btn btn-dark">Create</button>
                </form>
            </div>
        )
    }
}
const mapDispatchToProps = { addArticle };
export default connect(null, mapDispatchToProps)(ArticleAdd);
