import autobind from 'autobind-decorator';
import React, { Component, ChangeEvent } from 'react';

interface GenderInputProps {
	name: string;
	required?: boolean;
	preferNotToSay?: boolean;
}

interface GenderInputState {
	value: string | null;
}

export class GenderInput extends Component<GenderInputProps, GenderInputState> {
	private choices = ['Male', 'Female', 'Non-binary', 'Other'];

	static defaultProps: Partial<GenderInputProps> = {
		required: false,
		preferNotToSay: true,
	};

	constructor(props: GenderInputProps) {
		super(props);
		this.state = { value: null };

		if (this.props.preferNotToSay) {
			this.choices.push('Prefer not to say');
		}
	}

	public render() {
		return this.choices.map(this.radioButton);
	}

	@autobind
	private handleChange(event: ChangeEvent<HTMLInputElement>) {
		const value = event.currentTarget.value;
		this.setState({ value });
	}

	@autobind
	private radioButton(name: string) {
		const key = name.toLowerCase();

		return (
			<label key={key}>
				<input
					type="radio"
					checked={this.state.value === key}
					value={key}
					onChange={this.handleChange}
					required={this.props.required}
				/>
				{name}
			</label>
		);
	}
}
