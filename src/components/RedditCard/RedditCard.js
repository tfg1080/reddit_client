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
            return(<video className="content-video" width='320' height="240" controls ><source src={props.hostedVideoUrl.reddit_video.fallback_url}/></video>)
        case 'link':
            if(props.thumbnail.length > 15) {
                 return (
                    <a href={props.mediaUrl} ><img className="content-thumbnail" alt="link thumbnail" src={props.thumbnail} ></img></a>) }
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

    const handleSubClick = () => {
        props.search(props.subreddit.slice(2));
        console.log(props.subreddit.slice(2));
    }
    

    return(
        <div className="RedditCard">
                <div className='card-header'>
                <img className="icon" src={imgUrl} alt="subreddit header" onClick={handleSubClick}></img>
                <h4 className="subreddit-name" onClick={handleSubClick} >{props.subreddit}</h4>
    <h4 className='author'>Posted by {props.author}</h4>
                <h4 className='ups'>Up Votes: {Math.round(props.ups/1000)}K</h4>
                </div>
                <div className={props.postType}>
                <h2 className='title'>{props.title}</h2>
                { media() }
            </div>
        </div>
    )
}

