// https://docs.cypress.io/api/table-of-contents

import { describe } from 'mocha';

// describe('Login test', () => {
//   it.only('Check login with correct password', () => {
//     cy.visit('/');
//     cy.get(':nth-child(1) > .form-control').type(Cypress.env('user_name'));
//     cy.get(':nth-child(2) > .form-control').type(Cypress.env('user_password '));
//     cy.get('#submitButton').click();
//   });
// });

// describe('Prompt Test', function () {
//   // test case
//   it('Scenario 1', function () {
//     //URL launch
//     cy.visit('http://localhost:8081/');
//     //handling prompt alert
//     cy.window().then((win) => {
//       //stubbing prompt and alert windows
//       cy.stub(win, 'prompt').returns('Joseph');
//       cy.stub(win, 'alert').as('alert');
//     });
//     cy.get('#switch-register').click();
//     cy.get('@alert').should(
//       'have.been.calledWith',
//       'Hello Joseph! How are you today?'
//     );
//   });
// });

describe('Pop up Test', () => {
  it('Login', () => {
    cy.visit('http://localhost:8081/');
    cy.get(':nth-child(1) > .form-control').type(Cypress.env('user_name'));
    cy.get(':nth-child(2) > .form-control').type(Cypress.env('user_password'));
    cy.get('#submitButton').click();
  });
  it('Check popup', () => {
    const popup_url = 'http://youtube.com';
    cy.window().then((win) => {
      cy.stub(win, 'open').as('windowopen');
    });
    cy.get('#popupWindow').click();
    //cy.get('@windowopen').should('have.been.calledWidth', popup_url);
    cy.window().then((win) => {
      win.location.href = popup_url;
      cy.get('input#search').type('Cypress by qa box lets test{enter}');
    });
  });
});
