/// <reference types="cypress"/>

before(() => {
	cy.visit(`http://localhost:8080`);
});

describe('The demo page', () => {
	it('should have version, npm and github links in the the nav bar', () => {
		cy.contains('nav li#version', /v[0-9]+\.[0-9]+\.[0-9-]+$/)
			.should('exist')
			.find('a')
			.should('have.prop', 'href', 'https://github.com/aimee-gm/react-gender-input/releases');
		cy.contains('nav li#npm', 'npm')
			.should('exist')
			.find('a')
			.should('have.prop', 'href', 'https://npmjs.org/package/react-gender-input');
		cy.contains('nav li#repo', 'GitHub')
			.should('exist')
			.find('a')
			.should('have.prop', 'href', 'https://github.com/aimee-gm/react-gender-input');
	});

	it('should have package descriptions in the header', () => {
		cy.get('header h1')
			.should('exist')
			.should('contain', 'react-gender-input');

		cy.contains('header p', 'react component').should('exist');
	});

	describe('the demo', () => {
		it('should display the demo', () => {
			cy.contains('h2', 'Demo').should('exist');
			cy.contains('h2', 'Markup').should('exist');
			cy.contains('h2', 'Parameters').should('exist');
			cy.contains('label', 'Gender:').should('exist');
			cy.contains('label', 'Gender:').should('exist');
			cy.contains('.value', 'Selected option: undefined').should('exist');

			cy.get('input[type="radio"]').should('have.length', 5);

			cy.get('input[type="radio"]').each(($el) => {
				cy.wrap($el).should('have.prop', 'checked', false);
			});
		});

		it('should have default options set', () => {
			cy.contains('pre', 'required={false}').should('exist');
			cy.contains('pre', "otherReveal='select'").should('exist');
		});

		it('should respond to user input', () => {
			cy.get('select').should('not.exist');
			cy.get('input[value="other"]').click();
			cy.get('input[value="other"]').should('have.prop', 'checked', true);
			cy.get('select').should('exist');
		});

		it('should update the demo based on the parameter options', () => {
			cy.contains('label', 'Prefer not to say').should('exist');
			cy.get('#param-toggle-preferNotToSay-false').should('not.have.class', 'selected');
			cy.get('#param-toggle-preferNotToSay-false').click();
			cy.get('#param-toggle-preferNotToSay-false').should('have.class', 'selected');
			cy.contains('label', 'Prefer not to say').should('not.exist');
		});
	});

	it('should have copyright and license data in the footer', () => {
		cy.get('footer')
			.should('contain', '© Aimee Gamble-Milner')
			.find('a')
			.first()
			.should('have.prop', 'href', 'https://github.com/aimee-gm');
		cy.get('footer')
			.should('contain', 'MIT Licensed')
			.find('a')
			.eq(1)
			.should(
				'have.prop',
				'href',
				'https://github.com/aimee-gm/react-gender-input/blob/master/LICENSE'
			);
	});
});
