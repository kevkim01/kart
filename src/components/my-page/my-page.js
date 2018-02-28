import React, { Component } from 'react';
import firebase from 'firebase';
import moment from 'moment';
import BigCalendar from 'react-big-calendar';
import style from './my-page.css';
import ResetPassword from '../reset-password/reset-password';
import { Button, Form, FormGroup, FormControl, HelpBlock, Alert } from 'react-bootstrap';

class MyCalendar extends Component {
  constructor() {
    super();
    BigCalendar.momentLocalizer(moment); // or globalizeLocalizer
    this.state={
      events: [],
      index: 0
    }

let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])
  }

  handleSelectEvent(slotinfo){
    alert(Object.values(slotinfo));
  }

  convertDate(d){
    var yr,month,day;
    var ret;

    yr = d.slice(0,4);
    month = d.slice(5,7) - 1;
    day = d.slice(8,10) - 0;
    // console.log(yr, month,day);
    ret = new Date(yr,month,day);
    console.log(ret);
    return ret;
  }

  handleSubmit(e){
    var name = this.event_in.value;
    var date = this.date_in.value;
    var i = this.state.index;
    var yr,month,day;
    yr = date.slice(0,4);
    month = date.slice(5,7) - 1;
    day = date.slice(8,10) - 0;
    console.log(yr,month,day);
    var newelement = {title: name, startDate:new Date(yr,month,day), endDate:new Date(yr,month,day)};
    console.log(newelement);
    let a = this.state.events.slice(); //creates the clone of the state
    a[i] = newelement;
    console.log(a);
    this.setState({
      events: a,
      index: i+1
    })
    e.preventDefault();
  }

  render(){
    return(
      <div id="calendar_contain">
        <BigCalendar
          events={this.state.events}
          startAccessor='startDate'
          endAccessor='startDate'
          defaultDate={new Date()}
          selectable={true}
          defaultView='month'
          onSelectSlot={this.handleSelectEvent}
        />

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
    )
  }
}
export default MyCalendar;
