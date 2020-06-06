import React, {Component} from 'react';
import ReactDom from 'react-dom';
import './assets/style.css';
import quizService from "./quizService"
import QuestionBox from "./components/QuestionBox";
import Score from "./components/Score";



class QuizBee extends Component {

    state = {
        quizBank: [],
        score: 0,
        responses: 0
    };
    computeAnswer = (answer, rightAnswer) =>{
        if(answer === rightAnswer){
            this.setState({
                score: this.state.score +1
            });
        }
       this.setState({
           responses: this.state.responses < 10 ? this.state.responses + 1 : 10
       })
    }
    
    getQuestion = () =>{
        quizService().then(question => {
            this.setState({
                quizBank: question
            })
        })
    }

    playAgain = () => {
        this.getQuestion();
        this.setState({
            score: 0,
            responses: 0
        })
    }

    componentDidMount(){
        this.getQuestion();
    }

    render(){
        return(
            <div className="container">
                <div className="title">QuizBank</div>
                {this.state.quizBank.length > 0 && this.state.responses < 10 && this.state.quizBank.map(({question,answers,correct,questionId}) => (  
                <QuestionBox question ={question} options = {answers} key = {questionId} selected = {answer => this.computeAnswer(answer, correct)} />))}
                {this.state.responses === 10 ? (<Score score = {this.state.score} playAgain = {this.playAgain}/> ) :null}
            </div>
        );
        
    }
}
ReactDom.render(<QuizBee />, document.getElementById("root"));