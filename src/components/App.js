import React, { Component } from 'react';
import NewsAdder from './NewsAdder';
import News from './News';
class App extends Component {
    state = {
        newsNow : null,
        isLoading: false
    }
    addNews = (data) => {
        // 1) для добавления наверх (затратно)
        const nextNews = [data, ...this.state.newsNow]
        this.setState({ newsNow: nextNews })
        // 2) для добавления в конец
        // this.setState({
        //     newsNow: this.state.newsNow.concat(data)
        // });
    }
    componentDidMount() {
        this.setState({ isLoading: true });
        fetch(document.location.href+'load',{method:"post"})
            .then(response => {
                console.log(response);
                return response.json()
            })
            .then(data => {
                this.setState({ isLoading: false, newsNow: data })
            })
    }
    // затем обновляем новый массив новостей в this.state.news
    render() {
        const { newsNow, isLoading } = this.state;
        return (
            <React.Fragment>
                <NewsAdder callBack={this.addNews}/>
                <h3>Новости</h3>
                {isLoading && <p>Загружаю...</p>}
                {Array.isArray(newsNow) && <News data={newsNow} />}
            </React.Fragment>
        );
    }
}

export default App;
