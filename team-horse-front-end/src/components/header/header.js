import React, { Component } from 'react';
import './header.css';
// import FontAwesome from 'react-fontawesome';
import { Button } from 'antd'

import logo from '../../img/smart_home.jpg';

class Header extends Component {
  
    constructor(props){
        super(props);

        this.state = {
            searchTerm : "",
            headerStyle:{backgroundColor:this.props.backgroundColor}
        }
        this.handleTitleClick = this.handleTitleClick.bind(this);
        this.handleCreateRecipe = this.handleCreateRecipe.bind(this);
        this.handleViewByCategory = this.handleViewByCategory.bind(this);
    }
    handleTitleClick(event){

        if(this.props.onClickTitle != null){
            this.props.onClickTitle();
        }
            
    }
    handleCreateRecipe(){
        this.props.showRecipe1();
    }
    handleViewByCategory(){
        this.props.viewRecipeCategory()
    }
  
    render() {

        return (

            //this is JSX code which is very similar to HTML we already know
            <div className="header" style={this.state.headerStyle}>
                 <a href="#default" className="logo" onClick={this.handleTitleClick} > <img className="header-img" src={logo} alt="React logo"  /> {this.props.title}</a>
            </div>
        );
    }
}
export default Header;