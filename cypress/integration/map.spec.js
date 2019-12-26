describe('Test Google Maps load', () => {
    before(() => {
        cy.visit('/');
    });
    it('Map loads correctly', () => {
        cy.window().then((win) => {
            expect(win.google).to.exist;
        });
    });
});