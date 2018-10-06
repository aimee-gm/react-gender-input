import { expect } from 'chai';
import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { GenderInput } from '../src/gender-input';

const choices = ['Male', 'Female', 'Non-binary', 'Other'];

const defaultText = [...choices, 'Prefer not to say'];
const defaultValues = defaultText.map((val) => val.toLowerCase());

describe('Gender component', () => {
	let wrapper: ReactWrapper;
	let labels: ReactWrapper;
	let inputs: ReactWrapper;

	describe('with default options', () => {
		before(() => {
			wrapper = mount(<GenderInput name="title" />);
			labels = wrapper.find('label');
			inputs = wrapper.find('input');
		});

		it('should have five options', () => {
			expect(labels).to.have.length(5);
		});

		it('should have five radio buttons', () => {
			expect(wrapper.find('label input[type="radio"]')).to.have.length(5);
		});

		it('should not be required', () => {
			inputs.forEach((option) => {
				expect(option.prop('required')).to.equal(false);
			});
		});

		it('should have the correct values', () => {
			expect(inputs.map((option) => option.prop('value'))).to.eql(defaultValues);
		});

		it('should have the correct text', () => {
			expect(labels.map((option) => option.text())).to.eql(defaultText);
		});
	});

	describe('with required=true', () => {
		before(() => {
			wrapper = mount(<GenderInput name="title" required={true} />);
			inputs = wrapper.find('input');
		});

		it('all inputs should be marked required', () => {
			inputs.forEach((option) => {
				expect(option.prop('required')).to.equal(true);
			});
		});
	});

	describe('with preferNotToSay=false', () => {
		before(() => {
			wrapper = mount(<GenderInput name="title" preferNotToSay={false} />);
			labels = wrapper.find('label');
		});

		it('should only have the four choices', () => {
			expect(labels).to.have.lengthOf(4);
		});

		it('should only have the four simple choices', () => {
			expect(labels.map((option) => option.text())).to.eql(choices);
		});
	});

	describe('selecting the first option', () => {
		before(() => {
			wrapper = mount(<GenderInput name="title" />);
			wrapper
				.find('input')
				.first()
				.simulate('change');
			inputs = wrapper.find('input');
		});

		after(() => wrapper.setState({ value: null }));

		it('should update the state value', () => {
			expect(wrapper.state('value')).to.eql(defaultValues[0]);
		});

		it('should mark the input as checked', () => {
			expect(inputs.first().prop('checked')).to.equal(true);
		});
	});

	describe('selecting a second option', () => {
		before(() => {
			wrapper = mount(<GenderInput name="title" />);
			wrapper.setState({ value: defaultValues[0] });
			wrapper
				.find('input')
				.at(1)
				.simulate('change');
			inputs = wrapper.find('input');
		});

		after(() => wrapper.setState({ value: null }));

		it('should update the state value', () => {
			expect(wrapper.state('value')).to.eql(defaultValues[1]);
		});

		it('should deselect the first option', () => {
			expect(inputs.first().prop('checked')).to.equal(false);
		});

		it('should deselect the new option', () => {
			expect(inputs.at(1).prop('checked')).to.equal(true);
		});
	});
});
