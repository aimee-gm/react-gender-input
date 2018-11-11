import React, { StatelessComponent } from 'react';

interface PropToggleProps {
	name: string;
	current: string | boolean;
	options?: (string | boolean)[];
	onClick(name: string, value: string | boolean): void;
}

export const PropToggle: StatelessComponent<PropToggleProps> = function PropToggle(props) {
	const options = props.options || [true, false];

	return (
		<div className="prop-toggle">
			<span className="code">{props.name}</span>
			<span className="toggle">
				{options.map((value: string | boolean) => {
					const id = `param-toggle-${props.name}-${value.toString()}`;

					return (
						<button
							key={id}
							id={id}
							className={props.current === value ? 'selected' : ''}
							onClick={() => props.onClick(props.name, value)}>
							{value.toString()}
						</button>
					);
				})}
			</span>
		</div>
	);
};
