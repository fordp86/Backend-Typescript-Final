import axios from "axios";
import { useEffect, useState } from "react";
import TweetContext from './TweetContext';

export const TweetProvider = (props) => {

    const [ tweet, setTweet ] = useState([]);
    const baseUrl = "http://localhost:3000/api/coffee/";

    function getTweets() {

    }

    function getOneTweet(id) {
        
    }

    function addTweet(coffee) {        

    }

    function editTweet(coffee) {

    }

    function deleteTweet(id) {

    }

    return (
        <TweetContext.Provider value={{
            tweet,
            getTweets,
            getOneTweet,
            addTweet,
            editTweet,
            deleteTweet
        }}>
            { props.children }
        </TweetContext.Provider>
    )
};