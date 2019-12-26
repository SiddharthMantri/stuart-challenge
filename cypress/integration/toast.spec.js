describe('Test toast on successful job creation', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('Tests toast after job creation and click to disappear', () => {
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
            cy.get('div#delivery-toast').should('exist');
            cy.get('div#delivery-toast').click();
            cy.get('div#delivery-toast').should('not.exist');
        });
    });

    it('Test toast and wait for it to disappear after 5 seconds', () => {
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
            cy.get('div#delivery-toast').should('exist');
            // eslint-disable-next-line cypress/no-unnecessary-waiting
            cy.wait(5000).then(() => {
                cy.get('div#delivery-toast').should('not.exist');
            });
        });
    });
});
