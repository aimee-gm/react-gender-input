import Enzyme from 'enzyme';
import React from 'react';
import Adapter16 from 'enzyme-adapter-react-16';

function configure() {
	const matches = React.version.match(/^[0-9]+/);

	if (matches && matches[0]) {
		switch (matches[0]) {
			case '16':
				return Enzyme.configure({ adapter: new Adapter16() });
		}
	}

	throw new Error(`Cannot determine React version from "${React.version}"`);
}

configure();
