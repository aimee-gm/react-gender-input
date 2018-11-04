import React from 'react';
import { GenderInputProps, GenderInput } from '../../../lib/gender-input';

interface GenderInputDemoProps {
	genderProps: GenderInputProps;
}

interface MarkupProps extends GenderInputProps {
	[key: string]: any;
}

export class GenderInputDemo extends React.Component<GenderInputDemoProps> {
	private get optionalText() {
		if (!this.props.genderProps.required) {
			return <em>Optional</em>;
		}

		return void 0;
	}

	render() {
		return (
			<div>
				<label id="gender-label">Gender: {this.optionalText}</label>
				<div id="component-demo">
					<GenderInput {...this.props.genderProps} />
				</div>
			</div>
		);
	}

	static markup(props: MarkupProps) {
		const lines = ['<GenderInput'];

		for (const name in props) {
			if (name === 'onUpdate') {
				lines.push('\tonUpdate={(gender) => this.setState({ gender })}');
			} else if (typeof props[name] === 'string') {
				lines.push(`\t${name}='${props[name]}'`);
			} else {
				lines.push(`\t${name}={${props[name]}}`);
			}
		}

		lines.push('/>');
		return lines.join('\n');
	}
}
