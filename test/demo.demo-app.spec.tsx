import { expect } from 'code';
import { ShallowWrapper, shallow, ReactWrapper, mount } from 'enzyme';
import React from 'react';
import { DemoApp } from '../demo/assets/components/demo-app';

describe('Demo: DemoApp component', () => {
	describe('the component structure', () => {
		let wrapper: ShallowWrapper;

		before(() => {
			wrapper = shallow(<DemoApp />);
		});

		it('has a GenderInputDemo', () => {
			expect(wrapper.find('GenderInputDemo').exists()).to.equal(true);
		});

		it('has a JSX code block', () => {
			expect(wrapper.find('CodeBlock').length).to.equal(1);
		});

		describe('Prop toggles', () => {
			it('has required defaulting to false', () => {
				const block = wrapper.find('PropToggle[name="required"]');
				expect(block.exists()).to.equal(true);
				expect<boolean | string>(block.prop('current')).to.equal(false);
			});

			it('has preferNotToSay defaulting to true', () => {
				const block = wrapper.find('PropToggle[name="preferNotToSay"]');
				expect(block.exists()).to.equal(true);
				expect<boolean | string>(block.prop('current')).to.equal(true);
			});

			it("has otherReveal defaulting to 'select'", () => {
				const block = wrapper.find('PropToggle[name="otherReveal"]');
				expect(block.exists()).to.equal(true);
				expect<boolean | string>(block.prop('current')).to.equal('select');
			});
		});
	});

	describe('the component functionality', () => {
		let wrapper: ReactWrapper;

		before(() => {
			wrapper = mount(<DemoApp />);
		});

		it('has a prefer not to say option', () => {
			expect(
				wrapper
					.find('label')
					.last()
					.text()
			).to.equal('Prefer not to say');
		});

		it('has preferNotToSay={true} in the markup', () => {
			expect(wrapper.find('#markup-panel').text()).to.include('preferNotToSay={true}');
		});

		it('has no required fields', () => {
			expect(wrapper.find('input[required=false]').length).to.equal(5);
		});

		it('has required={false} in the markup', () => {
			expect(wrapper.find('#markup-panel').text()).to.include('required={false}');
		});

		it("has otherReveal='select' in the markup", () => {
			expect(wrapper.find('#markup-panel').text()).to.include("otherReveal='select'");
		});

		describe('when the preferNotToSay prop toggle changed from true to false', () => {
			before(() => {
				wrapper.find('#param-toggle-preferNotToSay-false').simulate('click');
			});

			after(() => {
				wrapper.find('#param-toggle-preferNotToSay-true').simulate('click');
			});

			it('hides the preferNotToSay option', () => {
				expect(
					wrapper
						.find('label')
						.last()
						.text()
				).to.not.equal('Prefer not to say');
			});

			it('updates the markup to preferNotToSay={false}', () => {
				expect(wrapper.find('#markup-panel').text()).to.include('preferNotToSay={false}');
			});
		});

		describe('when the required prop toggle changed from false to true', () => {
			before(() => {
				wrapper.find('#param-toggle-required-true').simulate('click');
			});

			it('makes the fields required', () => {
				expect(wrapper.find('input[required=true]').length).to.equal(5);
			});

			it('updates the markup to required={true}', () => {
				expect(wrapper.find('#markup-panel').text()).to.include('required={true}');
			});
		});

		describe('when "other" is selected', () => {
			before(() => wrapper.find('input[value="other"]').simulate('change'));

			it('shows the select box', () => {
				expect(wrapper.find('select').exists()).to.equal(true);
			});
		});

		describe("when the otherReveal prop toggle changed from 'select' to false", () => {
			before(() => {
				before(() => wrapper.find('input[value="other"]').simulate('change'));
				wrapper.find('#param-toggle-otherReveal-false').simulate('click');
			});

			it('removes the select box', () => {
				expect(wrapper.find('select').exists()).to.equal(false);
			});

			it('updates the markup to otherReveal={false}', () => {
				expect(wrapper.find('#markup-panel').text()).to.include('otherReveal={false}');
			});
		});

		describe('selecting an option', () => {
			before(() => {
				wrapper.find('[value="female"]').simulate('change');
			});

			it('updates the selected option to the new value', () => {
				expect(wrapper.find('h2 aside').text()).to.include('Selected option: female');
			});
		});
	});
});
