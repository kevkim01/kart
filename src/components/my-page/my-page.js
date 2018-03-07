import React, { Component } from 'react';
import firebase from 'firebase';
import moment from 'moment';
import BigCalendar from 'react-big-calendar';
import style from './my-page.css';
import CreateEvent from '../create-event/create-event';
import { Button, Form, FormGroup, FormControl, HelpBlock, Alert } from 'react-bootstrap';
import { base } from '../../Config/config';
import { Redirect } from 'react-router-dom';
import MyCalendar from '../calendar/calendar';

class MyPage extends Component {
  constructor() {
    super();
    this.state={
      events: new Array(),
      index: 0,
      redirect: false,
      loading: true
    }
  }

  componentWillMount(){
    var populate_event = new Array();
    var user = firebase.auth().currentUser;
    if(!user){
      this.setState({
        redirect:true
      })
    }
    else{
      this.eventsRef = base.syncState('users/' + user.uid + '/events', {
        context: this,
        state: 'events',
        asArray: true,
        then(){
          this.setState({loading: false})
        }
       });

       // .then(function(){
       //   this.setState({
       //     loading:false
       //   })
       // });
      // var user_id = user.uid;
      // var user_events = firebase.database().ref('users/' + user_id + '/events/');
      // user_events.once('value').then(function(snapshot){
      //   snapshot.forEach(function(data){
      //     const yr = data.val().year;
      //     const month = data.val().month;
      //     const day = data.val().day;
      //     const event_info = {
      //       title: data.val().title,
      //       startDate: new Date(yr,month,day),
      //       endDate: new Date(yr,month,day)
      //     }
      //     populate_event.push(event_info);
      //   })
      // });
      // setTimeout(() => {
      //   this.setState({
      //     events: populate_event,
      //     loading: false,
      //   });}, 0);
      // this.setState({
      //   events: populate_event,
      //   loading: false,
      // })
  }
}

  // componentDidUpdate(){
  //
  // }

  handleSubmit(e){
    var name = this.event_in.value;
    var date = this.date_in.value;
    var i = this.state.index;

    var yr,month,day;
    yr = date.slice(0,4);
    month = date.slice(5,7) - 1;
    day = date.slice(8,10) - 0;

    var dup = this.state.events.slice(); //creates the clone of the state
    var new_date = new Date(yr,month,day);
    var newelement = {
      title: name,
      startDate:new_date.toString(),
      endDate:new_date.toString()
    };
    dup.push(newelement);

    var user = firebase.auth().currentUser;
    var key = name + date;
    const account = firebase.database().ref('users/' + user.uid + '/events').child(key);
    account.set({
      title: name,
      year: yr,
      month: month,
      day: day,
      date: new_date.toString()
    });

    this.setState({
      events: dup,
      index: i+1
    })
    e.preventDefault();
    e.target.reset();
  }

  render(){
    if(this.state.redirect === true){
      return <Redirect to='/' />
    }
    if(this.state.loading === true) {
      return (
        <div style={{ textAlign: "center", position: "absolute", top: "25%", left: "50%", color: "rgb(236, 241, 244)"}}>
          <h3>Loading</h3>
          <i className="fa fa-spinner fa-spin fa-5x"></i>
        </div>
      )
    }

    return(
      <div className="row">
        <div className="col-sm-8" id="calendar_contain">
          <MyCalendar events={this.state.events} handleSubmit={this.handleSubmit.bind(this)}/>
        </div>

        <div className="col-sm-3" id="form_contain">
          <h3>add an event</h3>
          <form onSubmit={this.handleSubmit.bind(this)} noValidate className="">
            <FormGroup>
              <HelpBlock>event name</HelpBlock>
              <FormControl
                type="text"
                placeholder="event"
                inputRef={(ref)=>{this.event_in=ref}}
              />
            </FormGroup>

            <FormGroup>
              <HelpBlock>date</HelpBlock>
              <FormControl
                type="date"
                placeholder="date"
                inputRef={(ref)=>{this.date_in=ref}}
              />
            </FormGroup>

            <div className="button_el">
              <Button type="submit" bsStyle="primary">Submit</Button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
export default MyPage;
