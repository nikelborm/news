import React from 'react';
import Article from './Article';

function News(props) {
    const {data} = props;
    return (
        <div className = "news" >
            {data.map( (item) => <Article key={item.id} data={item}/> )}
            <strong className = "news_count">
                {!data.length ? "К сожалению, новостей нет." : "Всего новостей: " + data.length}
            </strong>
        </div>
    );
};

export default News;
