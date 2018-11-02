import { expect } from 'chai';
import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { CodeBlock } from '../src/demo/assets/components/code-block';

const json = `{
	"key": "value"
}`;

const jsx = '<Example>Some text</Example>';

describe('Demo: CodeBlock component', () => {
	let wrapper: ReactWrapper;
	let testSpan: ReactWrapper;

	describe('with language=json', () => {
		describe('with a child string', () => {
			before(() => {
				wrapper = mount(<CodeBlock language="json">{json}</CodeBlock>);
				testSpan = wrapper
					.find('span')
					.findWhere((el) => el.text() === '"key"')
					.first();
			});

			it('should contain a <code> block', () => {
				expect(wrapper.find('code').exists()).to.equal(true);
			});

			it('should display the code', () => {
				expect(wrapper.text()).to.equal(json);
			});

			it('should have a <span> tag containing the text "key"', () => {
				expect(testSpan.exists()).to.equal(true);
			});

			it('should colour the code', () => {
				expect(testSpan.prop('style')).to.eql({ color: '#f92672' });
			});
		});

		describe('with a code property', () => {
			before(() => {
				wrapper = mount(<CodeBlock language="json" code={{ key: 'value' }} />);
				testSpan = wrapper
					.find('span')
					.findWhere((el) => el.text() === '"key"')
					.first();
			});

			it('should stringify and format the code', () => {
				expect(wrapper.text()).to.equal(json);
			});
		});
	});

	describe('with language=jsx', () => {
		before(() => {
			wrapper = mount(<CodeBlock language="jsx">{jsx}</CodeBlock>);
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
			expect(testSpan.prop('style')).to.eql({ color: '#f92672' });
		});
	});
});
