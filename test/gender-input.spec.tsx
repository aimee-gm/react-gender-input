import { expect } from 'code';
import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { SinonStub, stub } from 'sinon';

import { GenderInput } from '../lib/gender-input';

const standardLabels = [
	'Male',
	'Female',
	'Non-binary',
	'Other/Non-binary other',
	'Prefer not to say',
];
const standardValues = ['male', 'female', 'nonbinary', 'other', undefined];

describe('Gender component', () => {
	let wrapper: ReactWrapper;
	let labels: ReactWrapper;
	let inputs: ReactWrapper;

	describe('with default options', () => {
		before(() => {
			wrapper = mount(<GenderInput />);
			labels = wrapper.find('label');
			inputs = wrapper.find('input');
		});

		it('should have five options', () => {
			expect(labels).to.have.length(5);
		});

		it('should have five radio buttons', () => {
			expect(wrapper.find('label input[type="radio"]')).to.have.length(5);
		});

		it('should all not be required', () => {
			expect(wrapper.find('input[required=false]')).to.have.length(5);
		});

		it('should all have name of "gender-input', () => {
			expect(wrapper.find('input[name="gender-input"]')).to.have.length(5);
		});

		it('should have the correct values', () => {
			const values = inputs.map((option) => option.prop('value'));
			expect(values).to.only.include(standardValues);
		});

		it('should have the correct text', () => {
			const texts = labels.map((option) => option.text());
			expect(texts).to.only.include(standardLabels);
		});
	});

	describe('with required=true', () => {
		before(() => {
			wrapper = mount(<GenderInput required={true} />);
			inputs = wrapper.find('input');
		});

		it('all inputs should be marked required', () => {
			expect(wrapper.find('input[required=true]')).to.have.length(5);
		});
	});

	describe('with preferNotToSay=false', () => {
		before(() => {
			wrapper = mount(<GenderInput preferNotToSay={false} />);
			labels = wrapper.find('label');
		});

		it('should have four choices', () => {
			expect(labels).to.have.length(4);
		});

		it('has the correct labels', () => {
			const texts = labels.map((option) => option.text());
			expect(texts).to.only.include(standardLabels.slice(0, -1));
		});
	});

	describe('with custom name defined (name="custom-name")', () => {
		before(() => {
			wrapper = mount(<GenderInput name="custom-name" />);
			inputs = wrapper.find('input');
		});

		it('should have name of "gender-input', () => {
			expect(wrapper.find('input[name="custom-name"]')).to.have.length(5);
		});
	});

	describe('selecting a radio button', () => {
		let updateStub: SinonStub;
		let newValue: string;

		before(() => {
			updateStub = stub();
			wrapper = mount(<GenderInput onUpdate={updateStub} />);

			wrapper
				.find('input')
				.first()
				.simulate('change');

			newValue = wrapper
				.find('input')
				.first()
				.prop('value') as string;
		});

		it('should call onUpdate() with the new value', () => {
			expect(updateStub.callCount).to.equal(1);
			expect(updateStub.firstCall.args[0]).to.equal(newValue);
		});
	});

	describe('selecting prefer not to say', () => {
		let updateStub: SinonStub;

		before(() => {
			updateStub = stub();
			wrapper = mount(<GenderInput onUpdate={updateStub} />);

			wrapper
				.find('input')
				.last()
				.simulate('change');
		});

		it('should call onUpdate() with value=null', () => {
			expect(updateStub.callCount).to.equal(1);
			expect(updateStub.firstCall.args[0]).to.equal(null);
		});
	});

	describe('with value={null}', () => {
		before(() => {
			wrapper = mount(<GenderInput value={null} />);
		});

		it('should have "Prefer not to say" as checked', () => {
			expect(wrapper.find('input[checked=true]').prop<undefined>('value')).to.be.undefined();
		});
	});

	describe('with value="other" and otherReveal="select"', () => {
		let updateStub: SinonStub;

		before(() => {
			updateStub = stub();
			wrapper = mount(<GenderInput value="other" onUpdate={updateStub} />);
		});

		it('should have "other" as checked', () => {
			expect(wrapper.find('input[checked=true]').prop<string>('value')).equal('other');
		});

		it('should show a select box', () => {
			expect(wrapper.find('select')).to.have.length(1);
		});

		it('has select box name="gender-input-other"', () => {
			expect(wrapper.find('select').prop('name')).to.equal('gender-input-other');
		});

		it('should have a placeholder in the select box', () => {
			expect(wrapper.find('option[value="other"]').text()).to.equal('Please choose an option');
		});

		it('should have extended gender options in the select box', () => {
			expect(wrapper.find('select option[value="agender"]').text()).to.equal('Agender');
		});

		it('should have multiple options in the select box', () => {
			expect(wrapper.find('select option').length).to.be.greaterThan(10);
		});

		it('should trigger onUpdate when "agender" is selected', () => {
			wrapper.find('select').simulate('change', { target: { value: 'agender' } });
			expect(updateStub.callCount).to.equal(1);
			expect(updateStub.firstCall.args[0]).to.equal('agender');
		});
	});

	describe('otherReveal="select" and an unknown option for value', () => {
		before(() => {
			wrapper = mount(<GenderInput value="qwerty" />);
		});

		it('should not have any options checked', () => {
			expect(wrapper.find('input[checked=true]')).to.have.length(0);
		});

		it('should not show a select box', () => {
			expect(wrapper.find('select').exists()).to.equal(false);
		});
	});

	describe('with value="agender" and otherReveal="select"', () => {
		before(() => {
			wrapper = mount(<GenderInput value="agender" />);
		});

		it('should have "other" as checked', () => {
			expect(wrapper.find('input[value="other"]').prop('checked')).to.equal(true);
		});

		it('should show a select box', () => {
			expect(wrapper.find('select').exists()).to.equal(true);
		});

		it('should have "agender" selected', () => {
			expect(wrapper.find('select').prop<string>('value')).to.equal('agender');
		});

		it('should not have the values male, female or nonbinary', () => {
			const options = wrapper.find('option').map((el) => el.prop('value'));
			expect(options).to.not.include(['male', 'female', 'nonbinary']);
		});
	});

	describe('with value="other" and otherReveal=false', () => {
		before(() => {
			wrapper = mount(<GenderInput value="other" otherReveal={false} />);
		});

		it('should have "other" as checked', () => {
			expect(wrapper.find('input[value="other"]').prop('checked')).to.equal(true);
		});

		it('should not show a select box', () => {
			expect(wrapper.find('select').exists()).to.equal(false);
		});
	});
});
