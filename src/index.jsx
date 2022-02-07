import ReactDOM from 'react-dom';
import React from 'react';

const scaleNames = {c: 'Celsius', f: 'Fahrenheit'};

class Calculator extends React.Component {
	constructor(props) {
		super(props);
		this.state = {temperature: '', scale: 'c'};
	}

	handleTemperatureChange = (scale, temperature) => {
		this.setState({scale, temperature});
	}

	tryConvert = () => {
		function toCelsius(fahrenheit) {
			return (fahrenheit - 32) * 5 / 9;
		}

		function toFahrenheit(celsius) {
			return (celsius * 9 / 5) + 32;
		}

		const input = parseFloat(this.state.temperature);
		if (Number.isNaN(input)) {
			return '';
		}
		const output = this.state.scale === 'c' ? toCelsius(input) : toFahrenheit(input);
		const rounded = Math.round(output * 1000) / 1000;
		return rounded.toString();
	}

	TemperatureInput = (props) => {
		const temperature = props.temperature;
		const scale = props.scale;

		const handleOnChange = (e) => {
			this.handleTemperatureChange(props.scale, e.target.value);
		};

		return (
			<fieldset>
				<legend>Enter temperature in {scaleNames[scale]}:</legend>
				<input value={temperature}
				       onChange={handleOnChange}/>
			</fieldset>
		);
	}

	render() {
		const scale = this.state.scale;
		const temperature = this.state.temperature;
		const celsius = scale === 'f' ? this.tryConvert() : temperature;
		const fahrenheit = scale === 'c' ? this.tryConvert() : temperature;

		function BoilingVerdict  () {
			if (celsius >= 100) {
				return <p>The water would boil.</p>;
			}
			return <p>The water would not boil.</p>;
		}

		return (
			<div>
				<this.TemperatureInput
					scale="c"
					temperature={celsius} />
				<this.TemperatureInput
					scale="f"
					temperature={fahrenheit} />
				<BoilingVerdict
					celsius={parseFloat(celsius)}/></div>
		);
	}
}

ReactDOM.render(<Calculator/>, document.getElementById('root'));



