import '../styles/App.css';
import React from "react";
import YouTube from 'react-youtube';
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";

export const YouTubeEmbed = ({ videoList }) => {  
    let currVideo = videoList[Math.floor(Math.random() * videoList.length)];
    let player;
  
    const onPlayerReady = (event) => {    
        void event.target.setVolume(10);
        void event.target.playVideo();
        player = event;
        currVideo = player.target.getVideoUrl();
    }
  
    const onEnd = (event) => {
        currVideo = videoList[Math.floor(Math.random() * videoList.length)];
        void event.target.loadVideoById(currVideo);
        player = event;
        currVideo = player.target.getVideoUrl();
    }
  
    const opts = {
        playerVars: {
            autoplay: 1,
            controls: 0,
            modestbranding: 1,
            rel: 0,
            loop: 1,
        }
    }
    
    let isMute = false;
    const toggleMute = () => {
        if (player)
        {
            if(!isMute) {
            isMute = true;
            player.target.mute();
            } else {
                isMute = false;
                player.target.unMute();
            } 
        }
    }
  
    return (
        <>
        <button className={ "muteButton" } onClick={ toggleMute }>
            {
                isMute ?
                <FaVolumeUp className={ "muteIcon" }/> :
                <FaVolumeMute className={ "muteIcon" }/>
            }
        </button>
        <div className={ "videoWrapper" }>
            <div className={ "videoResponsive" }>        
            <YouTube id="player"
            videoId={ currVideo } 
            opts={ opts } 
            onReady={ onPlayerReady }
            onEnd={ onEnd }
            />
            </div>
        </div>
        <div>
            <a className={ "vidLink" } 
            href={ 'https://www.youtube.com/watch?v=' + currVideo }
            target="_blank" rel="noopener noreferrer">
            <b>
            Current Video
            </b>
            </a>
        </div>
        </>
    );
};