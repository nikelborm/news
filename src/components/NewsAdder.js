import React from 'react';
// import ReactDOM from 'react-dom';

class NewsAdder extends React.Component {
    constructor(props) {
        super(props);
        this.author = React.createRef();
        this.text = React.createRef();
        this.bigText = React.createRef();
        this.alert_button = React.createRef();
    }
    state = {
        agreeChecked: false,
        authorNotEmpty: false,
        textNotEmpty: false,
        bigTextNotEmpty: false
    }
    componentDidMount = () => {
        this.author.current.focus();
    }
    onClickButtonHandler = (e) => {
        e.preventDefault();
        const author = this.author.current.value;
        const text = this.text.current;
        const bigText = this.bigText.current;
        const id = Math.floor(Math.random() * 999);
        const latestNews = {
            id,
            author,
            text: text.value,
            bigText: bigText.value
        };
        this.props.callBack(latestNews);
        this.setState({
            isLoading: true
        })
        fetch('http://localhost:2000/send',{
            method : "post",
            mode : "no-cors",
            body : JSON.stringify(latestNews)
        })
        // я просто очень сильно заебался. И да, Я знаю что это говнокод
        text.value = "";
        bigText.value = "";
        this.setState({
            textNotEmpty: false,
            bigTextNotEmpty: false
        });
    }
    onCheckRuleClick = () => {
        this.setState({
            agreeChecked: !this.state.agreeChecked
        });
    }
    onFieldChange = (e) => {
        e = e.currentTarget;
        this.setState({
            [e.getAttribute("data")]: e.value.trim().length > 0
        });
    }
    validate = () => {
        const s = this.state;
        return !(s.agreeChecked && s.authorNotEmpty && s.textNotEmpty && s.bigTextNotEmpty);
    }
    render() {
        return (
            <form className="add cf">
                <input  data='authorNotEmpty' className='add_author' onChange={this.onFieldChange}  defaultValue='' placeholder='Ваше имя'      ref={this.author} type='text'/>
                <textarea data='textNotEmpty' className='add_text' onChange={this.onFieldChange}    defaultValue='' placeholder='Заголовок'     ref={this.text}></textarea>
                <textarea data='bigTextNotEmpty' className='add_text' onChange={this.onFieldChange} defaultValue='' placeholder='Текст новости' ref={this.bigText}></textarea>
                <label className='add_checkrule'>
                    <input type='checkbox' defaultChecked={false} ref='checkrule' onChange={this.onCheckRuleClick}/>
                    Я согласен справилами
                </label>
                <button className='add_btn' onClick={this.onClickButtonHandler} ref='alert_button' disabled={this.validate()}>
                    добавить новость
                </button>
            </form>
        );
    }
}

export default NewsAdder;
