// Teste de fluxo completo de compra de passagem no BlazeDemo
describe('Fluxo completo de compra de passagem no BlazeDemo', () => {
  it('Deve realizar a compra de uma passagem com sucesso', () => {
    // 1. Acessar a página principal
    cy.visit('/');

    // Asserção: Verificar se estamos na página inicial
    cy.contains('Welcome to the Simple Travel Agency!')
      .should('be.visible');

    // 2. Selecionar a cidade de origem
    cy.get('select[name="fromPort"]')
      .select('Boston') // Origem: Boston
      .should('have.value', 'Boston');

    // 3. Selecionar a cidade de destino
    cy.get('select[name="toPort"]')
      .select('New York') // Destino: New York
      .should('have.value', 'New York');

    // 4. Clicar no botão "Find Flights"
    cy.get('input[type="submit"]')
      .click();

    // Asserção: Verificar se estamos na página de resultados
    cy.url()
      .should('include', '/reserve');
    cy.contains('Flights from Boston to New York')
      .should('be.visible');

    // 5. Selecionar o primeiro voo da lista
    cy.get('table tbody tr')
      .first()
      .within(() => {
        cy.get('input[type="submit"]').click();
      });

    // Asserção: Verificar se estamos na página de compra
    cy.url().should('include', '/purchase');
    cy.contains('Your flight from')
      .should('be.visible');

    // 6. Preencher o formulário de compra com dados fictícios
    cy.get('input#inputName')
      .type('Tom Sellec'); // Nome

    cy.get('input#address')
      .type('123 Fifth Avenue'); // Endereço

    cy.get('input#city')
      .type('New York'); // Cidade

    cy.get('input#state')
      .type('NY'); // Estado

    cy.get('input#zipCode')
      .type('12345'); // CEP

    cy.get('select#cardType')
      .select('Visa'); // Tipo de cartão

    cy.get('input#creditCardNumber')
      .type('111222333444'); // Número do cartão

    cy.get('input#creditCardMonth').clear()
      .type('09'); // Mês do cartão

    cy.get('input#creditCardYear').clear()
      .type('2025'); // Ano do cartão

    cy.get('input#nameOnCard')
      .type('Tom Sellec'); // Nome no cartão

    cy.get('input#rememberMe')
      .check(); // Opção "Remember Me"

    // 7. Clicar no botão "Purchase Flight"
    cy.get('input[type="submit"]')
      .click();

    // Asserção: Verificar se a confirmação da compra é exibida
    cy.url().should('include', '/confirmation');
    cy.contains('Thank you for your purchase today!')
      .should('be.visible');
  });
});
