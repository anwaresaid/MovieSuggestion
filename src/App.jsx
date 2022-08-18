import React from "react";
import "./App.scss";
import "./components/main/style.css"
import Main from "./components/main/Main"
import { Login, Register } from "./components/login/index";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogginActive: true,
      isLoggedIn: false,
      account: {},
    };
  }

  componentDidMount() {
    const { isLoggedIn } = this.state;

    if(!isLoggedIn) {
      this.rightSide.classList.add("right");
    }
  }
  registeredUser = (user) => {
    this.setState({ account: user});
  }

  loginUser = () => {
    this.setState({ isLoggedIn: true });
  }
  changeState() {
    const { isLogginActive } = this.state;

    if (isLogginActive) {
      this.rightSide.classList.remove("right");
      this.rightSide.classList.add("left");
    } else {
      this.rightSide.classList.remove("left");
      this.rightSide.classList.add("right");
    }
    this.setState(prevState => ({ isLogginActive: !prevState.isLogginActive }));
  }

  render() {
    const { isLogginActive } = this.state;
    const { isLoggedIn } = this.state;
    const current = isLogginActive ? "Register" : "Login";
    const currentActive = isLogginActive ? "login" : "register";
    return (
      <>
      <div className="App">
        {!isLoggedIn && (<div className={`${isLogginActive ? "login": "register"}`}>
          <div className="container" ref={ref => (this.container = ref)}>
            {isLogginActive &&(
              <Login user={this.state.account} onClick={this.loginUser} containerRef={ref => (this.current = ref)} />
            )}
            {!isLogginActive &&(
              <Register onClick={this.registeredUser} containerRef={ref => (this.current = ref)} />
            )}
          </div>
          <RightSide
            current={current}
            currentActive={currentActive}
            containerRef={ref => (this.rightSide = ref)}
            onClick={this.changeState.bind(this)}
          />
        </div>
        )}
      </div>
        { isLoggedIn &&(
              <Main user={this.state.account} />
            )}
      </>
    );
  }
}

const RightSide = props => {
  return (
    <div
      className="right-side"
      ref={props.containerRef}
      onClick={props.onClick}
    >
      <div className="inner-container">
        <div className="text">{props.current}</div>
      </div>
    </div>
  );
};

export default App;