import axios from 'axios';

export const getPosts = () => {
    return axios.get("/api/posts")
            .then(res => res.data)
            .catch(err => {
                console.log(err);
            });
}

export const getPostById = (id) => {
    return axios.get(`/api/posts/${id}`)
            .then(res => res.data)
            .catch(err => {
                console.log(err);
            })
}
