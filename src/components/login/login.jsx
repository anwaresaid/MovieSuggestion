import React from "react";
import loginImg from "../../img/movies.jpg";


export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                name:'',
                password:'',
            },
            missingInfoError: false,
            wrongInfoError: false,
        }
    }
    checkData = () => {
        if (this.state.user.name !='' && this.state.user.password !='') {
            if (this.props.user.name != this.state.user.name || this.props.user.password != this.state.user.password) {
                this.setState({wrongInfoError: true});
            } else {
                this.props.onClick(this.state.user);
            }
        }
        else {
            this.setState({missingInfoError: true});
        }
    }
    nameChange = (e) => {
        this.setState(prevState => ({ 
            user:{
                ...prevState.user,
                name: e.target.value
            }
        }))
    }
    passwordChange = (e) => {
        this.setState(prevState => ({ 
            user:{
                ...prevState.user,
                password: e.target.value
            }
        }))
    }
    render() {
        return (
        <div>
            <div className="base-container" ref={this.props.containerRef}>
                <div className="header">Login</div>
                <div className="content">
                    <div className="image">
                        <img src={loginImg}/>
                    </div>
                    <div className="form">
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" name="username" placeholder="Username" onChange={this.nameChange} value={this.state.user.name}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" placeholder="Password" onChange={this.passwordChange} value={this.state.user.password}/>
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <p style={{color: 'red', visibility:  !this.state.missingInfoError ? 'hidden' : 'visible'}}>Please complete missing info before registering</p>
                    <p style={{color: 'red', visibility:  !this.state.wrongInfoError ? 'hidden' : 'visible'}}>Please check the entered information</p>
                    <button type="button" className="btn" onClick={this.checkData}>
                        Login
                    </button>
                </div>
            </div>
        </div>
    )}
}