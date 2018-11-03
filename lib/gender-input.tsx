import autobind from 'autobind-decorator';
import React, { Component, ChangeEvent } from 'react';
import { GenderOptions, GenderOption } from './genders';

export interface GenderInputProps {
	required?: boolean;
	preferNotToSay?: boolean;
	otherReveal?: 'select' | false;
	onUpdate: (value: string | null) => void;
	name?: string;
	value?: string | null;
}

export class GenderInput extends Component<GenderInputProps> {
	private minimalOptions: GenderOption[];
	private extendedOptions: GenderOption[];

	static defaultProps: Partial<GenderInputProps> = {
		required: false,
		preferNotToSay: true,
		name: 'gender-input',
		otherReveal: 'select',
	};

	constructor(props: GenderInputProps) {
		super(props);
		this.state = { value: undefined };

		this.minimalOptions = GenderOptions.filter((gender) => gender.minimal);
		this.extendedOptions = GenderOptions.filter((gender) => !gender.minimal);
	}

	public render() {
		return [
			this.minimalOptions.map(this.radioButton),
			this.radioButton(this.otherOption),
			this.select(),
			this.preferNotToSay(),
		];
	}

	private get otherOption(): GenderOption {
		return {
			label: this.props.otherReveal === 'select' ? 'Other/Non-binary other' : 'Other',
			value: 'other',
		};
	}

	private key(name: string) {
		return name.toLowerCase();
	}

	private isSelected(value: string) {
		if (!this.props.value) {
			return false;
		}

		if (value === 'other' && this.extendedOptions.find((item) => item.value === this.props.value)) {
			return true;
		}

		return this.props.value === this.key(value);
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
		if (this.props.otherReveal !== 'select' || !this.isSelected('other') || !this.props.value) {
			return;
		}

		const name = `${this.props.name}-other`;

		return (
			<select key="full-select" name={name} value={this.props.value} onChange={this.handleChange}>
				<option value="other">Please choose an option</option>
				{this.extendedOptions.map(this.option)}
			</select>
		);
	}

	@autobind
	private handleChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
		this.props.onUpdate(event.target.value);
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
					checked={this.props.value === null}
					value={undefined}
					onChange={this.handleChange}
					required={this.props.required}
				/>
				Prefer not to say
			</label>
		);
	}
}
