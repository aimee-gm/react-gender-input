import { expect } from 'chai';
import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';
import { GenderInputDemo } from '../src/demo/assets/components/gender-input-demo';

describe('Demo: CodeBlock component', () => {
	let wrapper: ShallowWrapper;

	const notRequiredProps = {
		name: 'gender-input-demo-name-442',
		preferNotToSay: true,
		onUpdate: () => {},
		required: false,
	};

	before(() => {
		wrapper = shallow(<GenderInputDemo genderProps={notRequiredProps} />);
	});

	it('should have a label with text "Gender: Optional"', () => {
		const label = wrapper.find('label');

		expect(label.exists()).to.equal(true);
		expect(label.text()).to.equal('Gender: Optional');
	});

	it('should contain a <GenderInput> component', () => {
		expect(wrapper.find('GenderInput').exists()).to.equal(true);
	});

	it('should pass the props to  <GenderInput>', () => {
		expect(wrapper.find('GenderInput').props()).to.deep.equal(notRequiredProps);
	});

	context('with required=true', () => {
		before(() => {
			const props = {
				required: true,
				onUpdate: () => {},
			};

			wrapper = shallow(<GenderInputDemo genderProps={props} />);
		});

		it('should have a label with text "Gender:"', () => {
			const label = wrapper.find('label');

			expect(label.exists()).to.equal(true);
			expect(label.text()).to.equal('Gender: ');
		});
	});
});
