import React, { Component } from 'react';
import NewsAdder from './NewsAdder';
import News from './News';
import myNews from'./DBNews';
// import myNews from 'localhost:3000/data/newsData.json'
class App extends Component {
    state = {
        newsNow : myNews
    }
    addNews = (data) => {
        // 1) для добавления наверх (затратно)
        const nextNews = [data, ...this.state.newsNow]
        this.setState({ newsNow: nextNews })
        // 2) для добавления в конец
        // this.setState({
        //   newsNow: this.state.newsNow.concat(data)
        // });
    }

    // затем обновляем новый массив новостей в this.state.news
    render() {
        return (
            <React.Fragment>
                <NewsAdder callBack={this.addNews}/>
                <h3>Новости</h3>
                <News data={this.state.newsNow}/>
                {/* Здесь мог бы быть тег strong из News, но в данном случае его надо разместить вверху, так как myNews должна быть динамична */}
            </React.Fragment>
        );
    }
}

export default App;
