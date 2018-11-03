export interface GenderOption {
	label: string;
	value: string;
	minimal?: boolean;
}

export const GenderOptions: GenderOption[] = [
	{
		label: 'Female',
		value: 'female',
		minimal: true,
	},
	{
		label: 'Male',
		value: 'male',
		minimal: true,
	},
	{
		label: 'Non-binary',
		value: 'nonbinary',
		minimal: true,
	},
	{
		label: 'Agender',
		value: 'agender',
	},
	{
		label: 'Androgyne',
		value: 'androgyne',
	},
	{
		label: 'Bigender',
		value: 'bigender',
	},
	{
		label: 'Demiboy',
		value: 'demiboy',
	},
	{
		label: 'Demigender',
		value: 'demigender',
	},
	{
		label: 'Demigirl',
		value: 'demigirl',
	},
	{
		label: 'Genderfluid',
		value: 'genderfluid',
	},
	{
		label: 'Genderflux',
		value: 'genderflux',
	},
	{
		label: 'Genderqueer',
		value: 'genderqueer',
	},
	{
		label: 'Intergender',
		value: 'intergender',
	},
	{
		label: 'Polygender',
		value: 'polygender',
	},
	{
		label: 'Neutrosis',
		value: 'neutrosis',
	},
	{
		label: 'Trans-female',
		value: 'transfemale',
	},
	{
		label: 'Trans-male',
		value: 'transmale',
	},
	{
		label: 'Trans-feminine',
		value: 'transfeminine',
	},
	{
		label: 'Trans-masculine',
		value: 'transmasculine',
	},
	{
		label: 'Transgender',
		value: 'transgender',
	},
	{
		label: 'Two-spirit',
		value: 'twospirit',
	},
];

export const Genders = GenderOptions.map((opt) => opt.label);
