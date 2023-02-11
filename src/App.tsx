import React from 'react';
import Form from 'react-bootstrap/Form';
import './assets/App.css';
import FlashCard from './components/FlashCard';

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