var React = require('react');
var Clock = require('Clock');
var Controls = require('Controls');

var Timer = React.createClass({
	getInitialState: function() {
		return {
			count: 0,
			countdownStatus: 'stopped'
		}
	},
	componentDidUpdate: function(newProps, prevState) {
		if(this.state.countdownStatus !== prevState.countdownStatus) {
			switch(this.state.countdownStatus) {
				case 'started':
					this.handleStart();
					break;
				case 'stopped':
					this.setState({
						count: 0
					});
				case 'paused':
					clearInterval(this.timer);
					this.timer = undefined;
					break;
			}
		}
	},
	componentWillUnmount: function() {
		clearInterval(this.timer);
	},
	handleStart: function() {
		this.timer = setInterval(() => {
			this.setState({
				count: this.state.count + 1
			})
		}, 1000);
	},
	handleStatusChange: function(newStatus) {
		this.setState({
			countdownStatus: newStatus
		});
	},
	render: function() {
		var {count, countdownStatus} = this.state;

		return (
			<div>
				<h1 className="page-title">Timer App</h1>
				<Clock totalSeconds={count}/>
				<Controls countdownStatus={countdownStatus} onStatusChange={this.handleStatusChange}/>
			</div>
		)
	}
});

module.exports = Timer;