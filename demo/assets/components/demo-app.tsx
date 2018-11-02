import React from 'react';
import autobind from 'autobind-decorator';

import { CodeBlock } from './code-block';
import { GenderInputDemo } from './gender-input-demo';
import { PropToggle } from './prop-toggle';

interface DemoState {
	[key: string]: string | boolean | null | undefined;
	gender: string | null | undefined;
	preferNotToSay: boolean;
	required: boolean;
}

export class DemoApp extends React.Component<{}, DemoState> {
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

	@autobind
	private setParam(name: string, val: boolean) {
		this.setState({ [name]: val });
	}

	render() {
		return (
			<div>
				<h1>react-gender-input</h1>
				<div id="demo-panel">
					<h2>Demo</h2>
					<GenderInputDemo genderProps={this.genderProps} />
				</div>
				<div id="markup-panel">
					<h2>Markup</h2>
					<CodeBlock language="jsx">{GenderInputDemo.markup(this.genderProps)}</CodeBlock>
				</div>
				<div id="output-panel">
					<h2>Output</h2>
					<CodeBlock language="json" code={this.demoState} />
				</div>
				<div id="parameters">
					<h2>Parameters</h2>
					<PropToggle name="required" current={this.state.required} onClick={this.setParam} />
					<PropToggle name="preferNotToSay" current={this.state.preferNotToSay} onClick={this.setParam} />
				</div>
			</div>
		);
	}
}
