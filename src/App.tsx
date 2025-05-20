import React, { Component, HTMLAttributes } from 'react';
import "@root/style/general.scss";
import Coin from './components/Coin';
import { selectionsList, selectionType } from './components/Icon';
import { wait } from './utilities/wait';

import { beats } from './components/Icon';

class Rules extends Component {
  state = {
    active: false as boolean,
  }
  toggle = () => {
    this.setState({
      active: !this.state.active
    })
  }
  container: HTMLDivElement | null = null;
  render(): React.ReactNode {

    const { active } = this.state
    return (
      <div id="rules_details" className={active ? "active" : undefined} ref={ref => {
        this.container = ref;
      }}>
        <div className='bkg' />
        <div className='contain'>
          <div className='head'>
            <h1>Rules</h1>
            <div className='close' onClick={this.toggle}>
              <img src="./assets/images/icon-close.svg" alt="" />
            </div>
          </div>
          <img className='preview' src="./assets/images/image-rules-bonus.svg" alt="" />
        </div>
      </div>
    )
  }
}


const initial = localStorage.getItem("rps_score") as null | string;
const base = initial ? parseInt(initial) : 0;

const handlers = Object.keys(selectionsList) as selectionType[];
class App extends Component {
  state = {
    score: isNaN(base) ? 0 : base,
    userPick: null as selectionType | null,
    computerPick: null as selectionType | null
  }

  restart = () => {
    this.setState({
      userPick: null,
      computerPick: null,
    })
    this.result = 0;
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
    this.rules?.toggle();
  }

  setHandler = async (key: selectionType, container: HTMLDivElement | null) => {
    container?.classList.add("current");

    this.container?.classList.add("userPick");
    await wait(0.3);
    // if (container) {
    //   container.style.cssText = "transition:none";
    // }
    await new Promise(res => {
      this.setState({
        userPick: key,
      }, () => {
        res(true);
      })
    })
    await wait(1);

    const computerPick = this.randomPick();

    const el = this.wins(key, computerPick);
    if (el == 0) {
      this.state.score = this.state.score - 1;
      if (this.state.score < 0) {
        this.state.score = 0;
      }
    }
    else if (el == 2) {
      this.state.score = this.state.score + 1;
    }
    const score = this.state.score + el < 0 ? 0 : el;
    this.result = el;
    await new Promise(res => {
      this.setState({
        computerPick,
      }, () => {
        res(true);
      })
    })
    localStorage.setItem("rps_score", score.toString());
  }
  result: number = 0;

  messages = [
    "You Loose",
    "Tie",
    "You Win"
  ];


  Controllers = () => {
    return handlers.map((item, key) => (
      <Coin
        icon={item}
        key={key}
        onClick={this.setHandler}
      />
    ))
  }

  container: HTMLDivElement | null = null;
  Selection = () => {
    const { Head, Controllers,RulesWrap } = this;
    return (
      <>
        <Head />
        <main className='mws' />
        <div id="rules_btn" onClick={this.toogleRules}>
          Rules
        </div>
        <RulesWrap>
          <Controllers />
        </RulesWrap>
        <Rules ref={ref => {
          this.rules = ref;
        }} />
      </>
    )
  }

  randomPick = () => {
    return handlers[Math.floor(Math.random() * handlers.length)];
  }

  RulesWrap = ({ children,...props }: HTMLAttributes<HTMLDivElement>) => {
    return (
      <div className='rules_wrap'>
        <div {...props}id="rules" ref={ref => {
          this.container = ref;
        }}
        >
          {children}
        </div>
      </div>
    )
  }
  UserPicked = () => {
    const { Head, RulesWrap } = this;
    return (
      <>
        <Head />
        <main className='mws' />
        <div id="rules_btn" onClick={this.toogleRules}>
          Rules
        </div>
        <RulesWrap 
          className='userPick completed'
        >
          <Coin
            icon={this.state.userPick as any}
            customProps={{
              className: "current end",
              style: {
                transition: "none"
              }
            }}
          />
          <Coin
            icon={"" as any}
            computer
            customProps={{
              className: "current end",
              style: {
                width: 0,
                opacity: 0
              }
            }}
            empty
            ref={(e) => {
              setTimeout(async () => {
                if (!e?.container) return;
                e.container.style.transition = "";
                await wait();
                e.container.style.width = "1em";
                await wait();
                e.container.style.cssText = "";
              }, 300)

            }}
          />
        </RulesWrap>
        <Rules ref={ref => {
          this.rules = ref;
        }} />
      </>
    )
  }

  wins = (user: selectionType, computer: selectionType): 0 | 1 | 2 => {
    //key dont exists
    if (!(user in beats) || !(computer in beats)) {
      return 0;
    }
    //Both selected the same
    if (user == computer) {
      return 1;
    }

    const data = beats[user];
    return data.includes(computer) ? 0 : 2;
  }


  FinalMessage = () => {
    return (

      <div className='wins start' ref={ref => {
        setTimeout(() => {
          if (ref) {
            ref.classList.remove("start");
          }
        }, 300)
      }}>
        <h1>
          {this.messages[this.result]}
        </h1>
        <div className='rest_button' onClick={this.restart}>
          Play again
        </div>
      </div>
    )
  }
  Completed = () => {
    const { Head, FinalMessage,RulesWrap } = this;

    // return null;
    return (
      <>
        <Head />
        <main className='mws' />
        <div id="rules_btn" onClick={this.toogleRules}>
          Rules
        </div>
        <RulesWrap
          className='userPick completed'
        >
          <Coin
            icon={this.state.userPick as any}
            customProps={{
              className: "current end",
              style: {
                transition: "none"
              }
            }}
          />
          <FinalMessage />
          <Coin
            icon={this.state.computerPick as any}
            computer
            customProps={{
              className: "current end animate",
            }}

            ref={(e) => {
              setTimeout(async () => {
                if (!e?.container) return;
                e.container.classList.remove("animate");
              }, 300)

            }}
          />
        </RulesWrap>
        <Rules ref={ref => {
          this.rules = ref;
        }} />
      </>
    )
  }
  popup: HTMLDivElement | null = null;
  rules: Rules | null = null;

  render(): React.ReactNode {
    const { Selection, UserPicked, Completed } = this;
    const { computerPick, userPick } = this.state;
    if (!userPick && !computerPick) {
      return <Selection />;
    }
    if (!computerPick) {
      return <UserPicked />
    }
    return <Completed />
  }
}

export default App;
