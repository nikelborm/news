import React from 'react';
import MoreDetailed from './MoreDetailed';

function Article(props) {
    const {author, text, bigText} = props.data;
    return (
        <div className="article">
            <p className="news_author">{author}:</p>
            <p className="news_text">{text}</p>
            <MoreDetailed bigText={bigText}/>
        </div>
    );
};

export default Article;
