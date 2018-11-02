import { expect } from 'chai';
import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';
import { GenderInputDemo } from '../../demo/assets/components/gender-input-demo';
import { GenderInputProps } from '../../lib/gender-input';

describe('Demo: GenderInputDemo component', () => {
	const notRequiredProps: Required<GenderInputProps> = {
		name: 'gender-input-demo-name-442',
		preferNotToSay: true,
		onUpdate: () => {},
		fullList: 'select',
		required: false,
	};

	describe('the component', () => {
		let wrapper: ShallowWrapper;

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

	describe('GenderInputDemo::markup()', () => {
		let result: string;

		before(() => {
			result = GenderInputDemo.markup(notRequiredProps);
		});

		it('should return a string', () => {
			expect(result).to.be.a('string');
		});

		it('should return the correct markup', () => {
			expect(result).to.equal(`<GenderInput
	name='gender-input-demo-name-442'
	onUpdate={(gender) => this.setState({ gender })}
	required={false}
	preferNotToSay={true}
/>`);
		});
	});
});
