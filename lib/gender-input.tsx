import autobind from 'autobind-decorator';
import React, { Component, ChangeEvent } from 'react';
import { GenderOptions, GenderOption } from './genders';

export interface GenderInputProps {
	required?: boolean;
	preferNotToSay?: boolean;
	fullList?: 'select' | false;
	onUpdate: (value: string | null) => void;
	name?: string;
}

interface GenderInputState {
	value: string | null | undefined;
}

export class GenderInput extends Component<GenderInputProps, GenderInputState> {
	static defaultProps: Partial<GenderInputProps> = {
		required: false,
		preferNotToSay: true,
		name: 'gender-input',
		fullList: 'select',
	};

	constructor(props: GenderInputProps) {
		super(props);
		this.state = { value: undefined };
	}

	public render() {
		return [GenderOptions.simple.map(this.radioButton), this.select(), this.preferNotToSay()];
	}

	private key(name: string) {
		return name.toLowerCase();
	}

	private isSelected(value: string) {
		if (!this.state.value) {
			return false;
		}

		if (value === 'other' && !GenderOptions.simple.find((item) => item.value === this.state.value)) {
			return true;
		}

		return this.state.value === this.key(value);
	}

	@autobind
	private option({ label, value }: GenderOption) {
		return (
			<option key={value} value={value}>
				{label}
			</option>
		);
	}

	private select() {
		if (this.props.fullList !== 'select' || !this.isSelected('other') || !this.state.value) {
			return;
		}

		return (
			<select key="full-select" name={this.props.name} value={this.state.value} onChange={this.handleChange}>
				<option value="other">Please choose an option</option>
				{GenderOptions.extended.map(this.option)}
			</select>
		);
	}

	private set value(value: string) {
		this.setState({ value: value || null });
		this.props.onUpdate(value || null);
	}

	@autobind
	private handleChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
		this.value = event.target.value;
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
