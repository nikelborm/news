import React, { Component } from 'react';

class MoreDetailed extends Component {
    // Я вынес кнопку в отдельный компонент, чтобы рендерилось меньше, то есть только кнопка или текст ей на замену, а не весь Article
    state = {
        visible: false
    }
    readMoreClick = (e) => {
        // Явно отменяет переход по ссылке/нажатие кнопки
        e.preventDefault();
        this.setState({
            visible: !this.state.visible
        });
    }
    render() {
        const { visible } = this.state;
        return (
            <React.Fragment>
            {/*eslint-disable-next-line*/}
                <a onClick={this.readMoreClick} href="" className='news_readmore'>{visible ? 'Свернуть' : 'Раскрыть'}</a>
                {visible && <p className="news_big-text">{this.props.bigText}</p>}
            </React.Fragment>
        );
    }
}

export default MoreDetailed;
