import React from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Skeleton from '@material-ui/lab/Skeleton';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const Post = ({ postData, loading, withUrlToPost }) => {
    return (
        <>
            <Grid item xs={12}>
                <Card style={{ borderRadius: `0px`, marginBottom: `25px` }}>
                    <CardHeader
                        avatar={
                            loading ?
                                <Skeleton variant="circle" width={40} height={40} />
                                :
                                <Avatar alt={postData.author.name.substring(0, 2)} src={postData.author.avatar} />
                        }
                        title={
                            loading ?
                                <Skeleton height={20} width="35%" />
                                :
                                <span>
                                    <strong className='post-username'>{postData.author.name}</strong>
                                    <span className="post-label">shared a post</span>
                                    <span className="post-title">{postData.title}</span>
                                </span>
                        }
                        subheader={
                            loading ?
                                <Skeleton height={15} width="30%" />
                                :
                                <span className="post-date">{new Date(postData.publishDate).toDateString()}</span>
                        }
                    />
                    <CardContent>
                        {
                            loading ?
                                <Skeleton height={75} width="100%" />
                                :
                                `${postData.summary}`
                        }
                    </CardContent>
                    {
                        !loading && withUrlToPost ?
                            <CardActions disableSpacing style={{flexDirection: "row-reverse"}}>
                                <Link to={`/posts/${postData.id}`}>
                                    <IconButton
                                        aria-label="show post"
                                    >
                                        <ArrowForwardIcon />
                                    </IconButton>
                                </Link>
                            </CardActions>
                            : null
                    }
                </Card>
            </Grid>
        </>
    );
}

export default Post;