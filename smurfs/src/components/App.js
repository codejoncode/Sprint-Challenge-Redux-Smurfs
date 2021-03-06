import React, { Component } from 'react';
import {connect} from 'react-redux'; 
import {getSmurfs, addSmurf, updateSmurf, deleteSmurf, clickedSmurf} from '../actions';
import './App.css';



class App extends Component {

  componentDidMount () {
    this.props.getSmurfs(); 
  }

  resetFields = () => {
    this.name.value = ''
    this.age.value = ''
    this.height.value = ''
  }

  addingSmurf = () => {
    const name = this.name.value;
    const age = parseInt(this.age.value,10);
    const height = this.height.value; 
    const smurf = {name, age, height};
    this.resetFields(); 
    this.props.addSmurf(smurf); 
  }

  doubleClickingSmurf = (id, name,age,height) => {
    this.name.value = name;
    this.age.value = age; 
    this.height.value = height
    this.props.clickedSmurf(id);
  }
  deleteSmurf = id => {
    const sureToDelete = prompt('This can not be undone. To continue enter the word delete (just the word no extra characters)')
    if(sureToDelete && sureToDelete.toLowerCase() === 'delete'){
      this.props.deleteSmurf(id); 
    }
  }
  updating = () => {
    const smurf = {name: this.name.value, age: parseInt(this.age.value,10), height: this.height.value}
    this.resetFields()
    this.props.updateSmurf(this.props.current, smurf)
  }
  flipCard = index => {
    const cards = document.querySelectorAll('.card')
    const card = cards[index]
    card.classList.toggle('is-flipped')
  }

  render() {
    const smurfs = this.props.smurfs; 
    return (
      <div className="App">
        <div className = "header"><h1>SMURFS! 2.0 W/ Redux</h1></div>
        <div><p>Instructions: click to flip card for more infomation on the smurf. Double click to update. Click icon on back side of card to delete(must flip first).</p></div>
        <div className = "form">
        <input type="text" placeholder="...name" ref ={input => this.name = input}/>
        <input type="text" placeholder="...age" ref ={input => this.age = input}/>
        <input type="text" placeholder ="...height" ref ={input => this.height = input}/>
        {this.props.doubleClicked === false ? <button onClick = {this.addingSmurf}>Add Smurf</button> 
        : 
        <button onClick ={this.updating}>Update Smurf</button>
        } 
        </div>      
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        {smurfs.map((smurf, i )=> 
        <div onClick = {() => this.flipCard(i)} onDoubleClick = {() => this.doubleClickingSmurf(smurf.id, smurf.name, smurf.age, smurf.height)}key ={i} className = 'scene'>
          <div  className ="card">
            <div className="card__face card__face--front">
            {smurf.name}
            </div> 
            <div className="card__face card__face--back">
              <h1>{smurf.name}</h1>
              
              <h1>{smurf.age}</h1>
              
              <h1>{smurf.height}</h1>
              
              <i onClick = {() => this.deleteSmurf(smurf.id)}className="fas fa-minus-circle"></i>
            </div>
          </div>
        </div>)}

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    smurfs: state.smurfs,
    fetchingSmurfs: state.fetchingSmurfs,
    addingSmurf: state.addingSmurf,
    updatingSmurf: state.updatingSmurf,
    deletingSmurf: state.deletingSmurf,
    doubleClicked: state.doubleClicked,
    current: state.current,
    error: state.error,
  }
}



export default connect(mapStateToProps, {getSmurfs,addSmurf, updateSmurf,deleteSmurf, clickedSmurf})(App);
