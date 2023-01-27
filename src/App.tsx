import React from 'react';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card'
import './App.css';

class App extends React.Component<{}, { language: string}> {

  constructor(props: any){
    super(props)
    this.state = { language : ''};

    this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return(
    <div className="App">
      <div className="h1">FlashCard <small className='text-muted'>App</small></div>
      <div className="Language-List col-sm-2 ">
        <Form.Select onChange={this.handleChange} className='shadow-none'>
          <option>Select Language</option>
          <option value="1">Spanish</option>
          <option value="2">Italian</option>
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

class FlashCard extends React.Component<{language: String}, { word:string[] | undefined}>{
  render(){
    return( 
      <Card className='mx-auto col-sm-3'>
      <Card.Header className='card-header'>{this.props.language}</Card.Header>
      <Card.Body>
        <h4>Hello</h4>
        <br />
        <Form>
          <input type="text" className='form-control shadow-none' placeholder="Enter word"/>
          <br />
          <input type="button" className="btn btn-outline-primary shadow-none" value='Check'/>
          <input type="button" className="btn btn-outline-info shadow-none" value='Next'/>
        </Form>
      </Card.Body>
      </Card>
    )
  }
}