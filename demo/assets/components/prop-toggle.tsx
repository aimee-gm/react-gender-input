import React from 'react';
import autobind from 'autobind-decorator';

interface PropToggleProps {
	name: string;
	current: string | boolean;
	options: (string | boolean)[];
	onClick(name: string, value: string | boolean): void;
}

export class PropToggle extends React.Component<PropToggleProps> {
	static defaultProps: Partial<PropToggleProps> = {
		options: [true, false],
	};

	private buttonId(value: string | boolean) {
		return `param-toggle-${this.props.name}-${value.toString()}`;
	}

	@autobind
	private button(value: string | boolean) {
		const id = this.buttonId(value);

		return (
			<button
				key={id}
				id={id}
				className={this.props.current === value ? 'selected' : ''}
				onClick={() => this.props.onClick(this.props.name, value)}>
				{value.toString()}
			</button>
		);
	}

	render() {
		return (
			<div className="prop-toggle">
				<span className="code">{this.props.name}</span>
				<span className="toggle">{this.props.options.map(this.button)}</span>
			</div>
		);
	}
}
