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
	otherReveal: 'select' | false;
}

export class DemoApp extends React.Component<{}, DemoState> {
	constructor(props: {}) {
		super(props);
		this.state = {
			gender: undefined,
			required: false,
			preferNotToSay: true,
			otherReveal: 'select',
		};
	}

	private get genderProps() {
		return {
			name: 'gender-input',
			value: this.state.gender,
			required: this.state.required,
			preferNotToSay: this.state.preferNotToSay,
			otherReveal: this.state.otherReveal,
			onUpdate: (gender: string | null) => {
				this.setState({
					gender,
				});
			},
		};
	}

	@autobind
	private setParam(name: string, val: string | boolean) {
		this.setState({ [name]: val });
	}

	render() {
		const currentValue = this.state.gender || (this.state.gender === null ? 'null' : 'undefined');

		return (
			<div id="demo-container">
				<section id="demo-panel">
					<h2>
						Demo
						<div className="value">
							Selected option: <span className="code">{currentValue}</span>
						</div>
					</h2>
					<GenderInputDemo genderProps={this.genderProps} />
				</section>
				<section id="markup-panel">
					<h2>Markup</h2>
					<CodeBlock>{GenderInputDemo.markup(this.genderProps)}</CodeBlock>
				</section>
				<section id="parameters">
					<h2>Parameters</h2>
					<PropToggle name="required" current={this.state.required} onClick={this.setParam} />
					<PropToggle
						name="preferNotToSay"
						current={this.state.preferNotToSay}
						onClick={this.setParam}
					/>
					<PropToggle
						name="otherReveal"
						current={this.state.otherReveal}
						options={['select', false]}
						onClick={this.setParam}
					/>
				</section>
			</div>
		);
	}
}
