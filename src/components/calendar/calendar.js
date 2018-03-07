import React, { Component } from 'react';
import firebase from 'firebase';
import moment from 'moment';
import BigCalendar from 'react-big-calendar';
import style from './calendar.css';
import CreateEvent from '../create-event/create-event';
import { Button, Form, FormGroup, FormControl, HelpBlock, Alert } from 'react-bootstrap';
import { base } from '../../Config/config';
import { Redirect } from 'react-router-dom';

class MyCalendar extends Component {
  constructor() {
    super();
    BigCalendar.momentLocalizer(moment);
    this.state={
      // events: new Array(),
      show:false,
      title:"",
    }
  }

  // componentWillUpdate(){
  //   const ev = this.props.events;
  //   this.setState({
  //     events: ev
  //   })
  //   console.log('we in dis bitch');
  // }

  handleSelectEvent(slotinfo){
    var vals = Object.values(slotinfo);
    var title_val = vals[2];
    this.setState({
      show: true,
      title: title_val,
    })
  }

  handleModal() {
    this.setState({
      show:false
    })
  }

  render(){
    return(
      <div id="calendar_contain">
        <CreateEvent show={this.state.show} handleModal={this.handleModal.bind(this)} title={this.state.title}/>
        <BigCalendar
          events={this.props.events}
          startAccessor='startDate'
          endAccessor='startDate'
          defaultDate={new Date()}
          selectable={true}
          defaultView='month'
          onSelectEvent={this.handleSelectEvent.bind(this)}
          views={['month']}
        />
      </div>
    )
  }
}
export default MyCalendar;
