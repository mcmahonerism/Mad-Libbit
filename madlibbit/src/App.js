import React from 'react';
import logo from './logo.svg';
import './App.css';
import pos from 'pos';
import Sentencer from 'sentencer';

class App extends React.Component {
  
  // Content at construction (startup)
  constructor(props){
    super(props); // not important
    
    this.state = {
      input: 'She already had a stage and a booty pole.',
      output: 'Type/paste something and hit submit'
    }
  }

  // Break up the text, see what kind of thing
  // every word is, and if it's a noun, return
  // something weird in its place.
  convert(){
    // split the text into chunks at every space
    let split = this.state.input.split(' ');
    // word fragments with punctuation etc attched
    const replaced = split.map(chunk => {
      // lex, break chunk into categorized fragments
      const words = new pos.Lexer().lex(chunk);
      const tagger = new pos.Tagger();
      const taggedWords = tagger.tag(words);
      // reassemble, using fragment or replacement
      const madlibs = taggedWords.map(([word, tag]) => {
        switch(tag){
          case 'NN': // singular
            return Sentencer.make("{{ noun }}")
          case 'NNS': // plural
            return Sentencer.make("{{ nouns }}")
          default:
            return word;
        }
      });
      return madlibs.join(''); // stringify
    }).join(' '); // put back spaces


    this.setState({output: replaced});
  }

  updateText(e){ this.setState({ input: e.target.value}) }

  render() {
    const boxStyle = {
      width: 500,
      height: 250
    };

    return (
      <div className="App">
        <div className="input">
        <h2>Input:</h2>
          <textarea
            style={boxStyle}
            value={this.state.input}
            onChange={e => { this.updateText(e)}}
          />
          <br/>
          <button onClick={() => this.convert()}>Submit</button>
        </div>
        <div className="output">
          <h2>Output:</h2>
          {this.state.output}
        </div>
      </div>
    );
  }
}

export default App;
