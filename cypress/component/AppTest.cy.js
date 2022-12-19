import App from '../../src/App'
import 'cypress-react-app-actions'

let itemName = 'Hello, world!';
let input = '#text-input';

describe('QA Automation Cypress test', () => {
  beforeEach(()=>{
    //Mount the app before each test
    cy.mount(<App/>)

  })

  it('App can renders without error', () => {
    cy.get('.list-container > ul > li').should('not.exist');
    cy.request('/').its('status').should('eql', 200)
  })

  it('State loads without entries', ()=> {
    cy.get('.app-container').getComponent().its('state').should('be.an', 'array')
    //Get the state `note`
    cy.get('.app-container').getComponent().its('state[1]').should('be.empty')
  })

  it('App can save elements correctly', ()=> {
    //Create a item in the list
    cy.addItem(itemName)
    // cy.get('.app-container').getComponent().its('state[1]').then(console.log)
    cy.get('.app-container').getComponent().its('state[1]').should('have.length', 1)
    cy.get('.note-container').should('have.length', 1)
    cy.get('.note-container > li').as('item')
    cy.get('@item').should('be.visible').and('have.text', 'Hello, world!')
  })

  it('App can delete items', ()=> {
    cy.addItem(itemName)
    cy.get('.note-container').should('have.length', 1)
    //Delete item
    cy.deleteItem(itemName)
    // cy.wait(1000)
    cy.get('.list-container > ul > li').should('not.exist');
  })

})