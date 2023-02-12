import React from 'react';
import Form from 'react-bootstrap/Form';
import './assets/App.css';
import FlashCard from './components/FlashCard';
import { ToggleButton } from 'react-bootstrap';

class App extends React.Component<{}, { language: string, reversed: boolean}> {

  constructor(props: any){
    super(props)
    this.state = { language : 'Select Language', reversed: false};

    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    return(
    <div className="App">
      <div className="h1">FlashCard <small className='text-muted'>App</small></div>
      <div className='row'>
        <div className="Language-List col-2 ">
          <Form.Select onChange={this.handleChange} className='shadow-none'>
            <option value="0">Select Language</option>
            <option value="1">Italian</option>
            <option value="2">Spanish</option>
            <option value="3">Portuguese</option>
          </Form.Select>
        </div>
        <div className='col-2'>
        <ToggleButton className="mb-2 shadow-none" id="toggle-check" type="checkbox"
                      variant="outline-success" checked={this.state.reversed} value="1"
                      onChange={(e) => this.setState({reversed: e.currentTarget.checked})}>
        Reversed </ToggleButton>
        </div>
      </div>
      <br />
      <FlashCard language = {this.state.language} reversed = {this.state.reversed}></FlashCard>
    </div>
    )
  }

  handleChange(e: any) {
    this.setState({ language: e.target.options[e.target.value].text });
  }
}

export default App;