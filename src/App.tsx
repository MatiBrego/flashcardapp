import React from 'react';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card'
import './App.css';
import {WordGetter, ItalianWordGetter, EmptyWordGetter, SpanishWordGetter, PortugueseWordGetter} from './WordGetter';

class App extends React.Component<{}, { language: string}> {

  constructor(props: any){
    super(props)
    this.state = { language : 'Select Language'};

    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    return(
    <div className="App">
      <div className="h1">FlashCard <small className='text-muted'>App</small></div>
      <div className="Language-List col-2 ">
        <Form.Select onChange={this.handleChange} className='shadow-none'>
          <option value="0">Select Language</option>
          <option value="1">Italian</option>
          <option value="2">Spanish</option>
          <option value="3">Portuguese</option>
        </Form.Select>
      </div>
      <br />
      <FlashCard language = {this.state.language}></FlashCard>
    </div>
    
    )
  }

  handleChange(e: any) {
    this.setState({ language: e.target.options[e.target.value].text });
  }
}

export default App;

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

  handleCheck(){
    this.setState({answer: this.wordPair[1]});

    if(this.state.userInput.toLocaleLowerCase() === this.wordPair[1].toLocaleLowerCase()){
      this.setState({validation: "is-valid"})
    }else{
      this.setState({validation: "is-invalid"})
    }
  }

  handleKeyPress(event: any){
    var form = document.getElementById("form");
    function handleForm(event:any) { event.preventDefault(); }
    if(form !== null)
      form.addEventListener('submit', handleForm); 

    if(event.key === 'Enter'){
      this.handleCheck();
    }
  }

  capitalizeFirstLetter(word: String) : string{
    const capitalized = word.charAt(0).toUpperCase() + word.slice(1);

    return capitalized;
  }
}