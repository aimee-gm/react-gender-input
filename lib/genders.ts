export interface GenderOption {
	label: string;
	value: string;
}

function optionMap(label: string) {
	return {
		label,
		value: label.toLowerCase(),
	};
}

export const simple = ['Male', 'Female', 'Non-binary', 'Other'];
export const extended = ['Agender'];

export const Genders = simple.concat(extended);

export const GenderOptions = {
	simple: simple.map(optionMap),
	extended: extended.map(optionMap),
	full: Genders.map(optionMap),
};
