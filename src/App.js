import React, {useEffect, useState} from 'react';
import './App.css';

import {Navbar} from '../src/components/navbar/Navbar.js'
import {RedditCard} from '../src/components/RedditCard/RedditCard.js'


function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getInitialPosts();
  },[]);
  
  const getInitialPosts = () => {
    fetch("https://www.reddit.com/r/popular/.json"
      ).then(response => response.json()
      ).then(jsonResponse =>  { 
    
          setPosts(jsonResponse.data.children.map(post => post));
      });
  };

  const search = (input) => {
    // const searchTerm = in.target.value;
    fetch(`https://www.reddit.com/r/${input}/.json`
    ).then(response => response.json()
    ).then(jsonResponse =>  {
      if(!jsonResponse.data){
        return;
      }
        setPosts(jsonResponse.data.children.map(post => post))
      });
  }

  const handleSearch = (e) => {
    setTimeout(search(e.target.value), 2000)
  }

  return (
    <div className="App">
      <Navbar />
      <input type="search" placeholder="Search Subreddit..." onChange={handleSearch}/>
      {posts.map(post => {
       return (
         <RedditCard 
        title= {post.data.title}
        key={post.data.name}
        subreddit={post.data.subreddit_name_prefixed}
        author={post.data.author}
        postUrl={post.data.url}
        ups={post.data.ups}
        mediaUrl={post.data.url}
        hostedVideoUrl={post.data.media}
        subsub={post.data.subreddit_subscribers}
        postType={post.data.post_hint}
        thumbnail={post.data.thumbnail}
        search={search}
       />

       )})
      }


    </div>
  );
}

export default App;
