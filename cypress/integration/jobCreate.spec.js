describe('Test job creation', () => {
    before(() => {
        cy.visit('/');
    });
    it('Tests inputs and if a new job is created successfully', () => {

        cy.server();
        cy.route({
            method: 'POST',
            url: 'https://stuart-frontend-challenge.now.sh/geocode',
        }).as('geocodeApi');
        cy.route({
            method: 'POST',
            url: 'https://stuart-frontend-challenge.now.sh/jobs',
        }).as('jobApi');


        cy.get('button#create-job-btn').should('be.disabled');
        cy.get('input#pickup-address').type('15 rue de Bourgogne');
        cy.get('input#dropoff-address').type('29 rue du 4 Septembre');
        cy.get('input#pickup-address').should('have.value', '15 rue de Bourgogne');
        cy.get('input#dropoff-address').should('have.value', '29 rue du 4 Septembre');


        cy.wait('@geocodeApi').then((xhr) => {
            cy.get('button#create-job-btn').should('not.be.disabled');
            cy.get('button#create-job-btn').click();
        });
        cy.wait('@jobApi').then((xhr) => {
            expect(xhr.status).to.equal(200);
        });
    });
});
