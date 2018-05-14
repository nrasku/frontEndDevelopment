import React from 'react';
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import SkyLight from 'react-skylight';

import 'react-big-calendar/lib/css/react-big-calendar.css';

export default class ClassCalendar extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		var myBigGreenDialog = {
	      width: '70%',
	      height: '600px',
	      marginTop: '-300px',
	      marginLeft: '-35%',
	    };
		let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])
		BigCalendar.momentLocalizer(moment);
		

		var myFilter = [
			{
			    title: "title", 
			    start: "start",
			    end: "end"
			}
		]

		const events = []
        let propEvents = this.props.events

		for (var i in propEvents) {
			let start = new Date(propEvents[i].date)
			let end = new Date(moment(start).add(propEvents[i].duration, 'minutes'))
			let newEvent = {title: propEvents[i].activity,
							start: start,
							end: end}
			events.push(newEvent)
		}

		return(
			<div>
				<SkyLight hideOnOverlayClicked ref={ref => this.simpleDialog = ref} 
				dialogStyles={myBigGreenDialog} title="Your events! In a calendar!">
		        	<BigCalendar 
					    events={events}
					    views={['month', 'week', 'day']}
					    step={60}
					    showMultiDayTimes
					    defaultDate={new Date()}
					/>    
				</SkyLight>
				<button style={{margin: 10}} className="btn btn-primary" onClick={() => this.simpleDialog.show() }>Show In Calendar</button>
			</div>
		);
	}
}