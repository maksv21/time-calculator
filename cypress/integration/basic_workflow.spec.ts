/// <reference types="cypress" />

import { inputSelector, keyboardSelector, preResultSelector } from './constants'

describe('check basic workflow', () => {
  before(() => {
    cy.visit('http://localhost:3000/')
  })

  it('should renders keyboard', () => {
    cy.get(keyboardSelector).contains('1').click()
    cy.get(keyboardSelector).contains('+').click()
    cy.get(keyboardSelector).contains('2').click()
    cy.get(keyboardSelector).contains('0').click()
    cy.get(keyboardSelector).contains(':').click()
    cy.get(keyboardSelector).contains('1').click()
  })

  it('input should render entered value', () => {
    cy.get(inputSelector).should('have.text', '1+20:1')
  })

  it('pre result should show result', () => {
    cy.get(preResultSelector).should('have.text', '21:01')
  })

  it('after clicking the equality button should show result', () => {
    cy.get(keyboardSelector).contains('=').click()
    cy.get(inputSelector).should('have.text', '21:01')
  })
})
