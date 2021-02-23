import { createServer } from 'miragejs';

import data from './data.json';

createServer({
  routes() {
    this.namespace = 'api';

    this.get('/posts', () => {
      return data;
    });

    this.get('/posts/:id', (s, request) => {
      let id = request.params.id;
      let post = data.posts.find(post => post.id === id);
      console.log(post);
      return {post: post};
    });

    this.get('/categories', () => {
      let posts = data.posts;
      let categoriesSet = new Set();
      posts.forEach(post => {
        let postCategories = post.categories;
        for (let i = 0; i < postCategories.length; i++) {
          if (!categoriesSet.has(postCategories[i].name))
            categoriesSet.add(postCategories[i].name);
        }
      });
      return { categories: Array.from(categoriesSet) };
    });
  },
});
