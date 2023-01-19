describe('create Label', () => {
  it('passes', () => {
    cy.visit('');
    cy.get('[data-cy=openLabelModal]').click();

    cy.get('[data-cy=labelNameInput]').type('Alex liebt Lucky Dragon');
    cy.get('[data-cy=labelSelectorInput]').click();

    cy.get(
      '#alert-input-2-0 > .alert-button-inner > .alert-radio-label'
    ).click();
    cy.get('.alert-button-group > :nth-child(2)').click();
    cy.get('[data-cy=saveLabel]').click();
  });
});

describe('delete Label', () => {
  it('passes', () => {
    cy.visit('');
    cy.get(':nth-child(5) > .item-has-start-slot').rightclick();
    cy.get('.content-sizing > .list-md > :nth-child(2)').click();
  });
});
