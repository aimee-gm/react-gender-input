import { expect } from 'code';
import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';
import { GenderInputDemo } from '../demo/assets/components/gender-input-demo';

describe('Demo: GenderInputDemo component', () => {
	const notRequiredProps = {
		name: 'gender-input-demo-name-442',
		preferNotToSay: true,
		onUpdate: () => {},
		otherReveal: 'select' as 'select',
		required: false,
		value: 'other',
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
			expect(wrapper.find('GenderInput').props()).to.equal(notRequiredProps);
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
			expect(result).to.be.a.string();
		});

		it('should return the correct markup', () => {
			expect(result).to.equal(`<GenderInput
	name='gender-input-demo-name-442'
	preferNotToSay={true}
	onUpdate={(gender) => this.setState({ gender })}
	otherReveal='select'
	required={false}
	value='other'
/>`);
		});
	});
});
