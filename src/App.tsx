import React from 'react';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card'
import './App.css';
import { ItalianWordGetter, EmptyWordGetter, WordGetter} from './WordGetter';

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
      <div className="Language-List col-sm-2 ">
        <Form.Select onChange={this.handleChange} className='shadow-none'>
          <option value="0">Select Language</option>
          <option value="1">Italian</option>
          <option value="2">Spanish</option>
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

class FlashCard extends React.Component<{language: String}, {word: string, answer:string, userInput: string,validation: string}>{

  private wordPair: string[]

  private languageSelector: Map<String, WordGetter>;

  constructor(props: {language: String}){
    super(props)

    this.languageSelector = new Map();
    this.languageSelector.set("Select Language", new EmptyWordGetter());
    this.languageSelector.set("Italian", new ItalianWordGetter());

    this.wordPair = ["", ""];
    this.state = {word: this.wordPair[0], answer: '', userInput: '', validation: ''}

    this.handleNext = this.handleNext.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCheck = this.handleCheck.bind(this);



  }

  render(){
    return( 
      <Card className='mx-auto col-3'>
      <Card.Header className='card-header'>{this.props.language}</Card.Header>
      <Card.Body>
        <h4>{this.capitalizeFirstLetter(this.state.word)}</h4>
        {/* <img src=''></img> */}
        <br />
        <Form >
          <input type="text" className={'form-control shadow-none ' + this.state.validation} placeholder="Enter word" onChange={this.handleChange}/>
          <br />
          <div className='container text-center'>
            <div className='row'>
              <input type="button" className="btn btn-outline-primary shadow-none col" value='Check' onClick={this.handleCheck}/>
              <input type="button" className="btn btn-outline-info shadow-none col" value='Next' onClick={this.handleNext}/>
              <small className="answer col">{this.capitalizeFirstLetter(this.state.answer)}</small>
            </div>
          </div>
        </Form>
        
      </Card.Body>
      </Card>
    )
  }

  handleNext(){
    let wordGetter: WordGetter | undefined = this.languageSelector.get(this.props.language)
    if(wordGetter === undefined)
      wordGetter = new EmptyWordGetter();
    
    this.wordPair = wordGetter.nextWord();
    this.setState({word: this.wordPair[0], answer: '', validation: '', userInput: ''});
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

  capitalizeFirstLetter(word: String) : string{
    const capitalized = word.charAt(0).toUpperCase() + word.slice(1);

    return capitalized;
  }
}