import React from 'react';
import ReactDOM from 'react-dom';

import './demo.scss';
import { CodeBlock } from './components/code-block';
import { GenderInputDemo } from './components/gender-input-demo';

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

	render() {
		return (
			<div>
				<h1>react-gender-input</h1>
				<h2>Demo</h2>
				<GenderInputDemo genderProps={this.genderProps} />
				<h2>Markup</h2>
				<CodeBlock language="jsx">{GenderInputDemo.markup(this.genderProps)}</CodeBlock>
				<h2>Output</h2>
				<CodeBlock language="json">{JSON.stringify(this.demoState, null, 4)}</CodeBlock>
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
