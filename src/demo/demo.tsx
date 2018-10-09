import React from 'react';
import ReactDOM from 'react-dom';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { monokai } from 'react-syntax-highlighter/styles/hljs';

import './demo.scss';
import { GenderInput } from '../gender-input';

interface DemoState {
	[key: string]: string | boolean | null | undefined;
	gender: string | null | undefined;
	preferNotToSay: boolean;
	required: boolean;
}

class DemoApp extends React.Component<{}, DemoState> {
	constructor(props: {}) {
		super(props);
		this.state = {
			gender: undefined,
			required: false,
			preferNotToSay: true,
		};
	}

	private get demoState() {
		return { gender: this.state.gender };
	}

	private get genderProps() {
		return {
			required: this.state.required,
			preferNotToSay: this.state.preferNotToSay,
			name: 'gender-input',
			onUpdate: (gender: string | null) => {
				this.setState({
					gender,
				});
			},
		};
	}

	private get optionalText() {
		if (!this.state.required) {
			return <span>Optional</span>;
		}

		return void 0;
	}

	private get genderInputMarkup() {
		const markup = `
<GenderInput
	name='${this.genderProps.name}'
	onUpdate={(gender) => this.setState({ gender })}
	required={${this.genderProps.required.toString()}}
	preferNotToSay={${this.genderProps.preferNotToSay.toString()}}
/>
		`;
		return <SyntaxHighlighter style={monokai}>{markup}</SyntaxHighlighter>;
	}

	private get genderInput() {
		return (
			<section>
				<label id="gender-label">Gender: {this.optionalText}</label>
				<div>
					<GenderInput
						name={this.genderProps.name}
						onUpdate={this.genderProps.onUpdate}
						required={this.genderProps.required}
						preferNotToSay={this.genderProps.preferNotToSay}
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
				{this.genderInputMarkup}
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
