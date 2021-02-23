import React, { useState, useEffect } from 'react';
import { getPostById } from '../services/posts-service';
import { useParams } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Post from '../components/post';

const PostDetailPage = () => {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    let { id } = useParams();
    useEffect(() => {
        getPostById(id).then(res => {
            setPost(res.post);
        });
    }, []);

    useEffect(() => {
        setTimeout(() => setLoading(false), 500);
    }, [post]);

    return (
        <div style={{ flexGrow: "1" }}>
            <Grid
                container
                spacing={3}
            >
                {post ?
                    <>
                        <Grid item xs={12} md={6} lg={9}>
                            <Post
                                loading={loading}
                                postData={post}
                                withUrlToPost={false}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} lg={3}>
                            <Typography variant="h6" gutterBottom>
                                Post Categories
                             </Typography>
                            {
                                post.categories.map((postCategory, index) => (
                                    <Typography key={index} variant="subtitle2" gutterBottom style={{color: 'blue'}}>
                                        #{postCategory.name.replaceAll(' ', '_')}
                                    </Typography>
                                ))
                            }
                        </Grid>
                    </>
                    : null}
            </Grid>
        </div>
    );
}

export default PostDetailPage;