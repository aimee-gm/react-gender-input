import React from 'react';
import { GenderInputProps, GenderInput } from '../../../lib/gender-input';

interface GenderInputDemoProps {
	genderProps: GenderInputProps;
}

type MarkupProps = Required<GenderInputProps>;

export class GenderInputDemo extends React.Component<GenderInputDemoProps> {
	private get optionalText() {
		if (!this.props.genderProps.required) {
			return <span>Optional</span>;
		}

		return void 0;
	}

	render() {
		return (
			<section>
				<label id="gender-label">Gender: {this.optionalText}</label>
				<div>
					<GenderInput {...this.props.genderProps} />
				</div>
			</section>
		);
	}

	static markup(props: MarkupProps) {
		return `<GenderInput
	name='${props.name}'
	onUpdate={(gender) => this.setState({ gender })}
	required={${props.required.toString()}}
	preferNotToSay={${props.preferNotToSay.toString()}}
/>`.trim();
	}
}
