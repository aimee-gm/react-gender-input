import React from 'react';

interface PropToggleProps {
	name: string;
	current: boolean;
	onClick(name: string, value: boolean): void;
}

export class PropToggle extends React.Component<PropToggleProps> {
	private buttonName(value: boolean) {
		return `param-toggle-${this.props.name}-${value.toString()}`;
	}
	private button(value: boolean) {
		return (
			<button
				id={this.buttonName(value)}
				className={this.props.current === value ? 'selected' : ''}
				onClick={() => this.props.onClick(this.props.name, value)}>
				{value.toString()}
			</button>
		);
	}

	render() {
		return (
			<div>
				<span className="param">{this.props.name}</span>:{this.button(true)}
				{this.button(false)}
			</div>
		);
	}
}
