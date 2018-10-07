import React from 'react';
import ReactDOM from 'react-dom';

import './demo.scss';
import { GenderInput } from '../gender-input';
import autobind from 'autobind-decorator';

interface DemoState {
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

	private optionalText() {
		if (!this.state.required) {
			return <span>Optional</span>;
		}

		return void 0;
	}

	render() {
		return (
			<div>
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
				<pre>{JSON.stringify(this.genderProps, null, 4)}</pre>
				<pre>{JSON.stringify(this.demoState, null, 4)}</pre>
				<div>
					required:
					<button onClick={() => this.setState({ required: true })}>true</button>
					<button onClick={() => this.setState({ required: false })}>false</button>
				</div>
				<div>
					preferNotToSay:
					<button onClick={() => this.setState({ preferNotToSay: true })}>true</button>
					<button onClick={() => this.setState({ preferNotToSay: false })}>false</button>
				</div>
			</div>
		);
	}
}

ReactDOM.render(<DemoApp />, document.getElementById('demo'));
