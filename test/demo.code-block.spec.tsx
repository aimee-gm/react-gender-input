import { expect } from 'code';
import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { CodeBlock } from '../demo/assets/components/code-block';

const jsx = '<Example>Some text</Example>';

describe('Demo: CodeBlock component', () => {
	let wrapper: ReactWrapper;
	let testSpan: ReactWrapper;

	before(() => {
		wrapper = mount(<CodeBlock>{jsx}</CodeBlock>);
		testSpan = wrapper
			.find('span')
			.findWhere((el) => el.text() === '<Example>')
			.first();
	});

	it('should contain a <code> block', () => {
		expect(wrapper.find('code').exists()).to.equal(true);
	});

	it('should display the code', () => {
		expect(wrapper.text()).to.equal(jsx);
	});

	it('should have a <span> tag containing the text <Example>', () => {
		expect(testSpan.exists()).to.equal(true);
	});

	it('should colour the code', () => {
		expect<Record<string, string>>(testSpan.prop('style')).to.equal({ color: '#f92672' });
	});
});
