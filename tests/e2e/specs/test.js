// https://docs.cypress.io/api/table-of-contents

import { describe } from 'mocha';

// describe('My First Test', () => {
//   it('Visits the app root url', () => {
//     cy.visit('http://localhost:8080');
//     cy.contains('h1', 'Belépés');
//   });
// });

describe('Login test', () => {
  it.only('Check login with correct password', () => {
    cy.visit('/');
    cy.get(':nth-child(1) > .form-control').type(Cypress.env('user_name'));
    cy.get(':nth-child(2) > .form-control').type(Cypress.env('user_password '));
    cy.get('#submitButton').click();
  });
});
