import React from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import {WordGetter, ItalianWordGetter, EmptyWordGetter, SpanishWordGetter, PortugueseWordGetter} from '../util/WordGetter';


/**
 * Renders a card that prompts the user with a word, takes and answer and checks it. 
 * It takes a given language as parameter.
 */
class FlashCard extends React.Component<{language: String}, {word: string, answer:string, userInput: string, validation: string, help: string}>{

    private wordPair: string[];
  
    private languageSelector: Map<String, WordGetter>;
  
    constructor(props: {language: String}){
      super(props)
  
      this.languageSelector = new Map();
      this.languageSelector.set("Select Language", new EmptyWordGetter());
      this.languageSelector.set("Italian", new ItalianWordGetter());
      this.languageSelector.set("Spanish", new SpanishWordGetter());
      this.languageSelector.set("Portuguese", new PortugueseWordGetter());
  
  
      this.wordPair = ["", ""];
      this.state = {word: this.wordPair[0], answer: '', userInput: '', validation: '', help: 'Select language and press next to start'}
  
      this.handleNext = this.handleNext.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleCheck = this.handleCheck.bind(this);
      this.handleKeyPress = this.handleKeyPress.bind(this)
    }
  
    render(){
      return( 
        <Card className='mx-auto col-3'>
        <Card.Header className='card-header'>{this.props.language}</Card.Header>
        <Card.Body>
          <h4>{this.capitalizeFirstLetter(this.state.word)}</h4>
          {/* <img src=''></img> */}
          <br />
          <Form id='form'>
            <input type="text" className={'form-control shadow-none ' + this.state.validation} placeholder="Enter word" onChange={this.handleChange} onKeyPress={this.handleKeyPress}/>
            <br />
            <div className='container text-center'>
              <div className='row'>
                <input type="button" className="btn btn-outline-primary shadow-none col" value='Check' onClick={this.handleCheck}/>
                <input type="button" className="btn btn-outline-info shadow-none col" value='Next' onClick={this.handleNext}/>
                <small className="answer col">{this.capitalizeFirstLetter(this.state.answer)}</small>
              </div>
            </div>
          </Form>
          <br />
          <div className='text-muted'>{this.state.help}</div>
          
        </Card.Body>
        </Card>
      )
    }
  
    /**
     * Gets a new word pair with the wordGetter object based on the language. Then updates the state with the new word pair 
     */
    handleNext(){
      let wordGetter: WordGetter | undefined = this.languageSelector.get(this.props.language)
      if(wordGetter === undefined)
        wordGetter = new EmptyWordGetter();
      
      this.wordPair = wordGetter.nextWord();
      this.setState({word: this.wordPair[0], answer: '', validation: '', userInput: '', help: ''});
    }
  
    handleChange(e: any){
      this.setState({userInput: e.target.value})
    }
  
    /**
     * Checks the user input by comparing it to the answer in the word pair. Updates the validation in the state.
     */
    handleCheck(){
      this.setState({answer: this.wordPair[1]});
  
      if(this.state.userInput.toLocaleLowerCase() === this.wordPair[1].toLocaleLowerCase()){
        this.setState({validation: "is-valid"})
      }else{
        this.setState({validation: "is-invalid"})
      }
    }
  
    /**
     * Adds the possibility of checking by using the "Enter" key.
     * 
     * @param event
     */
    handleKeyPress(event: any){
      var form = document.getElementById("form");
      function handleForm(event:any) { event.preventDefault(); }
      if(form !== null)
        form.addEventListener('submit', handleForm); 
  
      if(event.key === 'Enter'){
        this.handleCheck();
      }
    }
  
    /**
     * Method used to capitalize the first letter of a given word.
     * 
     * @param word
     * @returns the word with the capitalized letter
     */
    capitalizeFirstLetter(word: String) : string{
      const capitalized = word.charAt(0).toUpperCase() + word.slice(1);
  
      return capitalized;
    }
  }

  export default FlashCard