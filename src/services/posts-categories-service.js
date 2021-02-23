import axios from 'axios';

export const getPostsCategories = () => {
    return axios.get("/api/categories")
            .then(res => res.data)
            .catch(err => {
                console.log(err);
            });
}
