import React, { ChangeEvent, StatelessComponent } from 'react';
import { genderOptions } from 'gender-options';

export interface GenderInputProps {
	required?: boolean;
	preferNotToSay?: boolean;
	otherReveal?: 'select' | false;
	onUpdate: (value: string | null) => void;
	name?: string;
	value?: string | null;
}

export const GenderInput: StatelessComponent<GenderInputProps> = function(props) {
	props = {
		required: false,
		preferNotToSay: true,
		name: 'gender-input',
		otherReveal: 'select',
		...props,
	};

	function handleChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
		props.onUpdate(event.target.value || null);
	}

	const radioOptions = genderOptions.basic;
	const selectOptions = [
		{ label: 'Please choose an option', value: 'other' },
		...genderOptions.standard.filter((val) => !genderOptions.basic.includes(val)),
	];

	const otherLabel = props.otherReveal === 'select' ? 'Other/Non-binary other' : 'Other';
	const otherSelected = Boolean(
		props.value === 'other' || selectOptions.find((item) => item.value === props.value)
	);

	const output = [
		radioOptions.map(({ label, value }) => (
			<label key={value}>
				<input
					name={props.name}
					type="radio"
					checked={props.value === value}
					value={value}
					onChange={handleChange}
					required={props.required}
				/>
				{label}
			</label>
		)),
		<label key="other">
			<input
				name={props.name}
				type="radio"
				checked={otherSelected}
				value="other"
				onChange={handleChange}
				required={props.required}
			/>
			{otherLabel}
		</label>,
	];

	if (otherSelected && props.otherReveal === 'select') {
		output.push(
			<select
				key="full-select"
				name={`${props.name}-other`}
				value={props.value || 'other'}
				onChange={handleChange}>
				{selectOptions.map(({ label, value }) => (
					<option key={value} value={value}>
						{label}
					</option>
				))}
			</select>
		);
	}

	if (props.preferNotToSay) {
		output.push(
			<label key="prefer-not-to-say">
				<input
					name={props.name}
					type="radio"
					checked={props.value === null}
					value={undefined}
					onChange={handleChange}
					required={props.required}
				/>
				Prefer not to say
			</label>
		);
	}

	return <div>{output}</div>;
};
