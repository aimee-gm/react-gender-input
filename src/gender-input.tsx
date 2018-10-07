import autobind from 'autobind-decorator';
import React, { Component, ChangeEvent } from 'react';

interface GenderInputProps {
	required?: boolean;
	preferNotToSay?: boolean;
	onUpdate: (value: string | null) => void;
	name?: string;
}

interface GenderInputState {
	value: string | null | undefined;
}

const choices = ['Male', 'Female', 'Non-binary', 'Other'];

export class GenderInput extends Component<GenderInputProps, GenderInputState> {
	static defaultProps: Partial<GenderInputProps> = {
		required: false,
		preferNotToSay: true,
		name: 'gender-input',
	};

	constructor(props: GenderInputProps) {
		super(props);
		this.state = { value: undefined };
	}

	private get choices() {
		if (this.props.preferNotToSay) {
			return [...choices, 'Prefer not to say'];
		}

		return choices;
	}

	public render() {
		return this.choices.map(this.radioButton);
	}

	@autobind
	private handleChange(event: ChangeEvent<HTMLInputElement>) {
		const value = event.currentTarget.value || null;
		this.setState({ value });
		this.props.onUpdate(value);
	}

	@autobind
	private radioButton(name: string) {
		const key = name.toLowerCase();
		const value = name === 'Prefer not to say' ? null : key;

		return (
			<label key={key}>
				<input
					name={this.props.name}
					type="radio"
					checked={this.state.value === value}
					value={value || undefined}
					onChange={this.handleChange}
					required={this.props.required}
				/>
				{name}
			</label>
		);
	}
}
