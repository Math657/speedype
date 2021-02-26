import React, { Component } from 'react'
import axios from 'axios'

// import ReactCSSTransitionGroup from 'react-transition-group'

// const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup

export class Game extends Component {
    constructor(props){
        super(props)
        this.state = {
          gameStarted: false,
          activeWord: [],
          activeLetters: [],
          score: 0,
          timer: 0,
          wordList: []
        }
        this.inputRef = React.createRef()
        this.getWordList = this.getWordList.bind(this)
        this.getRandomInt = this.getRandomInt.bind(this)
        this.getWord = this.getWord.bind(this)
        this.checkEqual = this.checkEqual.bind(this)
        this.timer = this.timer.bind(this)
        this.startGame = this.startGame.bind(this)
        this.rating = this.rating.bind(this)
      }

      componentWillMount() {
      
        document.addEventListener('keydown', function(e) {
          e.preventDefault()
          
          // handle backspace and delete
          if(e.which === 46 || e.which === 8){
            this.setState({
              activeLetters: this.state.activeLetters.slice(0,-1)
            })
            return true
          }
          
          // otherwise add character to array
          let char = String.fromCharCode(e.which)
          let newActiveLetters = this.state.activeLetters
          newActiveLetters.push(char)
          if(this.checkEqual(newActiveLetters, this.state.activeWord) ){
            this.setState({
              activeWord: this.getWord(),
              activeLetters: [],
              score: this.state.score + 5
            })
          }
          else{
            this.setState({
              activeLetters: newActiveLetters
            })
          }
    
        }.bind(this))
      }

      checkEqual(arr1, arr2) {
        if(arr1.length !== arr2.length)
            return false
        for(var i = arr1.length; i--;) {
            if(arr1[i] !== arr2[i])
                return false
        }
  
        return true
    }
    
    getRandomInt(min=0, max) {
      return Math.floor(Math.random() * (max - min)) + min
    }

    timer() {
        let newTime = this.state.timer - 1
        this.setState({
          timer: newTime
        })
        if(newTime === 0){
          window.clearInterval(this.interval)
        }
    }
      
    rating() {
        if(this.state.score < 15) {
          return '😫'
        }
        else if (this.state.score < 25) {
          return '😐'
        }
        else if (this.state.score < 35) {
          return '😊'
        }
        else if (this.state.score < 45) {
          return '😃'
        }
        else {
          return '😎'
        }
    }
      
    startGame() {
        axios.get('http://localhost:3000/generate/words')
        .then(res => {
            this.setState({ wordList: res.data })
            this.setState({
                activeLetters: [],
                wordList: this.getWordList()
            }, function(){
            // let word = this.getWord()
                this.setState({
                    activeWord: this.getWord(),
                    gameStarted: true,
                    score: 0,
                    timer: 6
                })      
            })
        })
        .catch(err => {
            console.log(err)
        })
        
        this.inputRef.current.focus()

        this.interval = setInterval(this.timer, 1000)
      }
    
      getWord() {
        let index = this.getRandomInt(0, this.state.wordList.length)
        let wordToUse = this.state.wordList[index]
        let newWordsList = this.state.wordList
        newWordsList.splice(index, 1)
        this.setState({
          wordList: newWordsList
        })
        
        return wordToUse.split('')
      }  
      

    getWordList() {
        let list = this.state.wordList
        return list
    }

    render(){

        let letters = []
        let board
        this.state.activeWord.map((current, index) =>{
          let correct
          if(this.state.activeLetters[index] === undefined){
            correct='undefined'
          }
          else if(this.state.activeLetters[index] === current){
            correct='true'
          }
          else{
            correct='false'
          }
          letters.push(<span className="game-letter" key={index} data-correct={correct}>{current}</span>)
          return true
        })
        if(!this.state.gameStarted){
          board=(
             <div className="game__board" key="start">
              <p className="home-title">{'Welcome to Speedype.'}</p>
              <p className="home-infos">{'Type as many words as you can'}</p>
              <button className="button" onClick={this.startGame}>Play</button>
             </div>)
        }
        else if(this.state.timer && this.state.gameStarted){
           board=(
             <div className="game__board" key="inprogress">
               <div className="game__score">{'SCORE: '+ this.state.score}</div>
               {/* <ReactCSSTransitionGroup transitionName='fade' transitionEnterTimeout={500} transitionLeaveTimeout={500}> */}
               <div className="game__words" key={this.state.activeWord}>{letters}</div>
               {/* </ReactCSSTransitionGroup> */}
               <div className="game__timer">{'TIMELEFT: ' + this.state.timer}</div>
             </div>)
        }
        else{
          board=(
            <div className="game__board" key="timesup">
              <div className="game__words">
                <p>{'GAME OVER'}</p>
                <p>{'FINAL SCORE: ' + this.state.score}<span className="emoji">{this.rating()}</span></p>
                <button className="button" onClick={this.startGame}>{'Retry'}</button>
              </div>
            </div>
          )
        }
    
        return(
          <div className="game">
            {/* <ReactCSSTransitionGroup transitionName='scale' transitionEnterTimeout={500} transitionLeaveTimeout={500}>
            yo
            </ReactCSSTransitionGroup> */}
            {board}
            <input ref={this.inputRef} className="secret-input" type="text"/>
          </div>
        )
      }
    }


export default Game
