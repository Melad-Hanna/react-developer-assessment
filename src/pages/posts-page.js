import React, { useEffect, useState } from 'react';
import { getPosts } from '../services/posts-service';
import { getPostsCategories } from '../services/posts-categories-service';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Post from '../components/post';
import Skeleton from '@material-ui/lab/Skeleton';

const PostsPage = () => {
  const [posts, setPosts] = useState(null);
  const [filteredPosts, setFilteredPosts] = useState(null);
  const [renderedPosts, setRenderedPosts] = useState(null);
  const [nextPageNumber, setNextPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [postCategories, setPostsCategories] = useState(null);
  const [checkedCategories, setCheckedCategories] = useState(new Map());

  useEffect(() => {
    getPosts().then(res => {
      setPosts(res.posts);
      setFilteredPosts(res.posts);
    });
    getPostsCategories().then(res => {
      setPostsCategories(res.categories);
    });
  }, []);

  useEffect(() => {
    if (filteredPosts != null) {
      changeRenderedPostWithFilter();
      setLoading(false);
    }
  }, [filteredPosts, nextPageNumber]);

  useEffect(() => {
    if (posts != null) {
      let selectedCategories = [...checkedCategories.entries()].filter(([k, v]) => v === true);
      if (selectedCategories.length === 0) {
        setFilteredPosts(posts);
        return;
      }
      else {
        let filteredPosts = [];
        posts.forEach(post => {
          let postCategories = post.categories;
          for (let i = 0; i < postCategories.length; i++) {
            if (checkedCategories.has(postCategories[i].name) && checkedCategories.get(postCategories[i].name) === true) {
              filteredPosts.push(post);
              break;
            }
          }
        });
        console.log(filteredPosts);
        setFilteredPosts([...filteredPosts]);
      }
    }
  }, [checkedCategories]);

  const changeRenderedPostWithFilter = () => {
    setRenderedPosts([...filteredPosts.slice(0, nextPageNumber * 10)]);
  }

  const onLoadMorePostsClicked = () => {
    console.log(nextPageNumber);
    setNextPageNumber(nextPageNumber + 1);
  }

  const handleCategoryFilter = event => {
    checkedCategories.set(event.target.name, event.target.checked)
    setCheckedCategories(new Map(checkedCategories));
  }

  return (
    <>
      <div style={{ flexGrow: "1" }}>
        <Grid
          container
          spacing={3}
        >
          <Grid item xs={12} md={4} lg={3}>
            <FormControl component="fieldset" fullWidth>
              <FormLabel component="legend">CATEGORIES</FormLabel>
              {
                loading ?
                  <div>
                    <Skeleton height={40} />
                    <Skeleton height={40} />
                    <Skeleton height={40} />
                    <Skeleton height={40} />
                  </div>
                  :
                  <FormGroup>
                    {
                      postCategories ?
                        postCategories.map((category, index) => (
                          <FormControlLabel
                            key={index}
                            control={
                              <Checkbox
                                name={category}
                                checked={checkedCategories[category]}
                                onChange={handleCategoryFilter}
                                color="primary" />
                            }
                            label={category}
                            labelPlacement="end"
                          />
                        ))
                        : null
                    }
                  </FormGroup>
              }
            </FormControl>
          </Grid>
          <Grid item xs={12} md={8} lg={6}>
            {
              renderedPosts !== null & loading === false ?
                <>
                  {renderedPosts.length > 0 ?
                    <>
                      {renderedPosts.map((post, index) =>
                        <Post
                          key={index}
                          postData={post}
                          loading={loading}
                          withUrlToPost={true}
                        />
                      )}
                      {
                        renderedPosts.length >= filteredPosts.length ?
                          <Button variant="outlined" fullWidth disabled>
                            No More Posts to Show
                          </Button>
                          :
                          <Button variant="contained" color="primary" fullWidth onClick={onLoadMorePostsClicked}>
                            Load More ...
                          </Button>
                      }

                    </>
                    : <>No Posts to Show</>}
                </>
                :
                [1, 2, 3].map((s, index) =>
                  <Post
                    key={index}
                    postData={null}
                    loading={loading}
                  />
                )
            }
          </Grid>
        </Grid>
      </div>
    </>
  )
}

export default PostsPage;