describe('Test address box', () => {
    beforeEach(() => {
        cy.visit('/');
    });
    it('Tests address input', () => {
        cy.get('button#create-job-btn').should('be.disabled');
        cy.get('input#pickup-address').type('15 rue de Bourgogne');
        cy.get('input#dropoff-address').type('29 rue du 4 Septembre');

        cy.get('input#pickup-address').should('have.value', '15 rue de Bourgogne');
        cy.get('input#dropoff-address').should('have.value', '29 rue du 4 Septembre');


        cy.server();
        cy.route({
            method: 'POST',
            url: 'https://stuart-frontend-challenge.now.sh/geocode',
        }).as('geocodeApi');

        cy.wait('@geocodeApi').then((xhr) => {
            cy.get('button#create-job-btn').should('not.be.disabled');
        });
    });
    it('Test address input blur', () => {
        cy.get('input#pickup-address').type('15 rue de Bourgogne').blur();
        cy.server();
        cy.route({
            method: 'POST',
            url: 'https://stuart-frontend-challenge.now.sh/geocode',
        }).as('geocodeApi');
        cy.wait('@geocodeApi').then((xhr) => {
            expect(xhr.status).to.equal(200);
        });
    });
    it('Tests address input with incorrect inputs', () => {
        cy.get('input#pickup-address').type('18 rue de Bourgogne');
        cy.get('input#dropoff-address').type('21 rue du 4 Septembre');

        cy.server();
        cy.route({
            method: 'POST',
            url: 'https://stuart-frontend-challenge.now.sh/geocode',
        }).as('geocodeApi');

        cy.wait('@geocodeApi').then((xhr) => {
            cy.get('button#create-job-btn').should('be.disabled');
        });
    });
});
