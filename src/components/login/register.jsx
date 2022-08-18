import React from "react";
import loginImg from "../../img/movies.jpg";
import Checkbox from '@mui/material/Checkbox';
import {allCats} from "../main/const"; 
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

export class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                name:'',
                password:'',
                email:'',
                categoriesFav: [],
            },
            missingInfoError: false,
            registered: false,
        } 
    }
   
    checkData = () => {
        if (this.state.user.name !='' && this.state.user.email !='' && this.state.user.password !='' && this.state.user.categoriesFav.length != 0) {
            this.props.onClick(this.state.user);
            this.setState({registered: true});
        }
        else {
            this.setState({missingInfoError: true});
        }
    }

    checkBoxChange = (e) => {
        this.setState(prevState => ({ 
            user:{
                ...prevState.user,
                categoriesFav: e.target.value
            }
        }))
    }

    nameChange = (e) => {
        this.setState(prevState => ({ 
            user:{
                ...prevState.user,
                name: e.target.value
            }
        }))
    }
    emailChange = (e) => {
        this.setState(prevState => ({ 
            user:{
                ...prevState.user,
                email: e.target.value
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
        const MenuProps = {
            PaperProps: {
              style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
              },
            },
        };
        return( 
        <div>
            <div className="base-container" ref={this.props.containerRef}>
                <div className="header">Register</div>
                <div className="content">
                    <div className="image">
                        <img src={loginImg}/>
                    </div>
                    <div className="form">
                        <div className="form-data">
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input type="text" name="username" placeholder="Username" onChange={this.nameChange} value={this.state.user.name}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" name="email" placeholder="email" onChange={this.emailChange} value={this.state.user.email}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" placeholder="Password" onChange={this.passwordChange} value={this.state.user.password}/>
                            </div>
                        </div>
                        <h4>Please Select Your favorite Categories</h4>
                        <Select
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            multiple
                            value={this.state.user.categoriesFav}
                            onChange={this.checkBoxChange}
                            input={<OutlinedInput label="Tag" />}
                            renderValue={(selected) => selected.join(', ')}
                            MenuProps={MenuProps}
                            >
                            {allCats.map((category) => (
                                <MenuItem key={category.label} value={category.value}>
                                    <Checkbox checked={this.state.user.categoriesFav.indexOf(category.value) > -1} />
                                    <ListItemText primary={category.label} />
                                </MenuItem>
                            ))}
                        </Select>
                    </div>
                </div>
                <div className="footer">
                    <p style={{color: 'red', visibility:  !this.state.missingInfoError ? 'hidden' : 'visible'}}>Please complete missing info before registering</p>
                    <p style={{color: 'green', visibility:  !this.state.registered ? 'hidden' : 'visible'}}>Your registration is complete! now go to the login tab and enter your user name and password.</p>
                    <button type="button" className="btn" onClick={this.checkData}>
                        Register
                    </button>
                </div>
            </div>
        </div>
    )}
}
