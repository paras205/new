import axios from "axios";
import history from '../history';

export const RECEIVE_ARTICLES = 'GET_ARTICLES';
export const ADD_ARTICLE = 'ADD_ARTICLE';
export const RECEIVE_ARTICLE = 'RECEIVE_ARTICLE';
export const REMOVE_ARTICLE = 'REMOVE_ARTICLE';
export const UPDATE_ARTICLE = 'UPDATE_ARTICLE';
export const REPLACE_ARTICLE = 'REPLACE_ARTICLE';

const apiUrl = 'http://localhost:3001/articles';


const receiveArticles = (data) => ({
    type: RECEIVE_ARTICLES,
    articles: data
})
export const getArticles = () => {
    return (dispatch) => {
        return axios.get(`${apiUrl}`)
            .then(response => {
                dispatch(receiveArticles(response.data))
            })
            .catch(error => { console.log(error) })
    }
}
// add article
export const addArticle = ({ title, body }) => {
    return (dispatch) => {
        return axios.post(`${apiUrl}`, { title, body })
            .then(response => {
                let data = response.data;
                dispatch({ type: ADD_ARTICLE, payload: { id: data.id, title: data.title, body: data.body } })
            })
            .then(() => {
                history.push("/articles")
            })
            .catch(error => { throw (error) });
    }
}
// get the article info
export const getArticle = (id) => {
    return (dispatch) => {
        return axios.get(`${apiUrl}/${id}`)
            .then(response => {
                dispatch({ type: RECEIVE_ARTICLE, article: response.data });
            })
            .catch(error => {
                throw (error);
            });
    };
};
// delete the article
export const deleteArticle = (id) => {
    return (dispatch) => {
        return axios.delete(`${apiUrl}/${id}`)
            .then(response => {
                dispatch({ type: REMOVE_ARTICLE, payload: { id } })
            })
            .then(() => {
                history.push("/articles")
            })
            .catch(error => {
                throw (error);
            });
    };
};
// update article
export const updateArticle = (article) => {
    const articleId = article.id;
    return (dispatch) => {
        return axios.patch(`${apiUrl}/${article.id}`, { title: article.title, body: article.body })
            .then(response => {
                const data = response.data;
                dispatch({ type: UPDATE_ARTICLE, payload: { id: data.id, title: data.title, body: data.body } })
                dispatch({ type: REPLACE_ARTICLE, payload: { id: data.id, title: data.title, body: data.body } })
            })
            .then(() => {
                history.push(`/articles/${articleId}`)
            })
            .catch(error => { throw (error) });
    };
};