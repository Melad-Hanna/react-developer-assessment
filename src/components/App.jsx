import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import PostsPage from '../pages/posts-page';
import PostDetailPage from '../pages/post-detail-page';
import Topbar from '../components/top-bar';

function App() {
  return <>
    <BrowserRouter>
      <Topbar />
      <div id="main">
        <Switch>
          <Route path="/posts/:id" exact component={PostDetailPage}/>
          <Route path="/" exact component={PostsPage} />
        </Switch>
      </div>
    </BrowserRouter>
  </>;
}

export default App;
