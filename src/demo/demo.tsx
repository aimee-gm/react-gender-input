import React from 'react';
import ReactDOM from 'react-dom';

import './demo.scss';
import { GenderInput } from '../gender-input';
import autobind from 'autobind-decorator';

interface DemoState {
	[key: string]: string | boolean | null;
	gender: string | null;
	preferNotToSay: boolean;
	required: boolean;
}

class DemoApp extends React.Component<{}, DemoState> {
	constructor(props: {}) {
		super(props);
		this.state = {
			gender: null,
			required: false,
			preferNotToSay: true,
		};
	}

	@autobind
	onUpdate(gender: string) {
		this.setState({ gender });
	}

	private get demoState() {
		return { gender: this.state.gender };
	}

	private get genderProps() {
		return {
			onUpdate: this.onUpdate,
			required: this.state.required,
			preferNotToSay: this.state.preferNotToSay,
			name: 'gender-input',
		};
	}

	private get optionalText() {
		if (!this.state.required) {
			return <span>Optional</span>;
		}

		return void 0;
	}

	private get genderInput() {
		return (
			<section>
				<label id="gender-label">Gender: {this.optionalText}</label>
				<div>
					<GenderInput
						name={this.genderProps.name}
						onUpdate={this.onUpdate}
						required={this.state.required}
						preferNotToSay={this.state.preferNotToSay}
					/>
				</div>
			</section>
		);
	}

	private button(name: string, value: boolean) {
		return (
			<button
				className={this.state[name] === value ? 'selected' : ''}
				onClick={() =>
					this.setState({
						[name]: value,
					})
				}>
				{value.toString()}
			</button>
		);
	}

	private json(obj: Record<string, any>) {
		return <pre>{JSON.stringify(obj, null, 4)}</pre>;
	}

	render() {
		return (
			<div>
				{this.genderInput}
				{this.json(this.genderProps)}
				{this.json(this.demoState)}
				<div>
					required:
					{this.button('required', true)}
					{this.button('required', false)}
				</div>
				<div>
					preferNotToSay:
					{this.button('preferNotToSay', true)}
					{this.button('preferNotToSay', false)}
				</div>
			</div>
		);
	}
}

ReactDOM.render(<DemoApp />, document.getElementById('demo'));
