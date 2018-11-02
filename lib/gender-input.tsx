import autobind from 'autobind-decorator';
import React, { Component, ChangeEvent } from 'react';

export interface GenderInputProps {
	required?: boolean;
	preferNotToSay?: boolean;
	onUpdate: (value: string | null) => void;
	name?: string;
}

interface GenderInputState {
	value: string | null | undefined;
}

interface GenderOption {
	label: string;
	value: string;
}

function optionMap(label: string) {
	return {
		label,
		value: label.toLowerCase(),
	};
}

const simpleList: GenderOption[] = ['Male', 'Female', 'Non-binary', 'Other'].map(optionMap);

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

	public render() {
		return [simpleList.map(this.radioButton), this.preferNotToSay()];
	}

	private key(name: string) {
		return name.toLowerCase();
	}

	private isSelected(value: string) {
		if (!this.state.value) {
			return false;
		}

		if (value === 'other' && !simpleList.find((item) => item.value === this.state.value)) {
			return true;
		}

		return this.state.value === this.key(value);
	}

	private set value(value: string) {
		console.log(value);
		this.setState({ value: value || null });
		this.props.onUpdate(value || null);
	}

	@autobind
	private handleChange(event: ChangeEvent<HTMLInputElement>) {
		this.value = event.currentTarget.value;
	}

	@autobind
	private radioButton({ label, value }: GenderOption) {
		return (
			<label key={value}>
				<input
					name={this.props.name}
					type="radio"
					checked={this.isSelected(value)}
					value={value}
					onChange={this.handleChange}
					required={this.props.required}
				/>
				{label}
			</label>
		);
	}

	private preferNotToSay() {
		if (!this.props.preferNotToSay) {
			return;
		}

		return (
			<label key="prefer-not-to-say">
				<input
					name={this.props.name}
					type="radio"
					checked={this.state.value === null}
					value={undefined}
					onChange={this.handleChange}
					required={this.props.required}
				/>
				Prefer not to say
			</label>
		);
	}
}
