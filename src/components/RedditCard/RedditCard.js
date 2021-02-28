import React, {useState, useEffect} from 'react';
import './RedditCard.css';

export function RedditCard(props) {
    const [imgUrl, setImgUrl] = useState("https://i.redd.it/8lbvjjhmzaj61.jpg")


    useEffect(() => {
        getSubredditImage()
      });
   

     const media = () => {switch(props.postType) {
        case 'image':
        return (<img className="content-image" src={props.mediaUrl} alt='contentimage'></img>);
        case 'hosted:video':
            return(<video width='320' height="240" controls ><source src={props.hostedVideoUrl.reddit_video.fallback_url}/></video>)
        case 'link':
            if(props.thumbnail) {
                 return (<img alt="link thumbnail" src={props.thumbnail} ></img>) }
                 break;
        default:
            break;
        }} 

        
        

      const getSubredditImage = () => {
        fetch(`https://www.reddit.com/${props.subreddit}/about.json`
        ).then(response => response.json()
        ).then(jsonResponse => {
            if(jsonResponse.data.icon_img){
                setImgUrl(jsonResponse.data.icon_img);
            }
            
        })
        } 
    

    return(
        <div className="RedditCard">
            <div className={props.postType}>
                <img className="icon" src={imgUrl} alt="subreddit header"></img>
                <h4>{props.subreddit}</h4>
                <h4>author: {props.author}</h4>
                
                <h2>{props.title}</h2>
                
                { media() }
        
            </div>
        </div>
    )
}

