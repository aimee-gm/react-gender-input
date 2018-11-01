import React from 'react';
import ReactDOM from 'react-dom';

import './demo.scss';
import { GenderInput } from '../../gender-input';
import { CodeBlock } from './components/code-block';

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

		return <CodeBlock language="jsx">{markup.trim()}</CodeBlock>;
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
		return <CodeBlock language="json">{JSON.stringify(obj, null, 4)}</CodeBlock>;
	}

	render() {
		return (
			<div>
				<h1>react-gender-input</h1>
				<h2>Demo</h2>
				{this.genderInput}
				<h2>Markup</h2>
				{this.genderInputMarkup}
				<h2>Output</h2>
				{this.json(this.demoState)}
				<h2>Parameters</h2>
				<div>
					<span className="param">required</span>:{this.button('required', true)}
					{this.button('required', false)}
				</div>
				<div>
					<span className="param">preferNotToSay</span>:{this.button('preferNotToSay', true)}
					{this.button('preferNotToSay', false)}
				</div>
			</div>
		);
	}
}

ReactDOM.render(<DemoApp />, document.getElementById('demo'));
