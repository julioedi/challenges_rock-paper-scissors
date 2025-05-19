import React, { Component } from 'react';
import "@root/style/general.scss";
import Coin from './components/Coin';
import { selectionsList, selectionType } from './components/Icon';

const initial = localStorage.getItem("rps_score") as null | string;
const base = initial ? parseInt(initial) : 0;

const handlers = Object.keys(selectionsList) as selectionType[];
class App extends Component {
  state = {
    score: !isNaN(base) ? 0 : base,
    step: 0,
  }
  Head = () => {
    return (
      <header className='mws'>
        <img src='./assets/images/logo.svg' />
        <div className='score'>
          <div>Score</div>
          <div className='number'>{this.state.score}</div>
        </div>
      </header>
    )
  }
  toogleRules = () => {

  }

  setHandler = (key:selectionType) =>{
    // console.log(key);
  }

  Controllers = () => {
    return handlers.map((item, key) => <Coin icon={item} key={key} onClick={this.setHandler}/>)
  }
  popup: HTMLDivElement | null = null;
  render(): React.ReactNode {
    const { Head, Controllers } = this;
    return (
      <>
        <Head />
        <main className='mws' />
        <div id="rules_btn" onClick={this.toogleRules}>
          Rules
        </div>
        <div id="rules">
          <Controllers />
        </div>
      </>
    )
  }
}

export default App;
