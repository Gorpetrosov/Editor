// https://docs.cypress.io/api/introduction/api.html

describe('Generated Code', () => {
    it('Visits the generated code', () => {
      cy.visit('localhost:8080/editor')
      cy.wait(2000)
      cy.get('#cm0 .CodeMirror')
      .first()
      .then((cm0Code) => {
        cm0Code[0].CodeMirror.getValue();
        
        cy.get('#cm1 .CodeMirror')
        .first()
        .then((cm1Code) => {
          cm1Code[0].CodeMirror.getValue();

          cy.get('input[name="nameSpace"]')
          .invoke('val')
          .then(sometext => {
            cy.request('generate', {data: cm0Code[0].CodeMirror.getValue(), nameSpace: sometext}).should((response) => {
              cy.log(response)
              console.log(response);
              expect(response.status).to.eq(200)
              expect(response).to.have.property('headers')
              expect(response).to.have.property('duration')
            })
          });
        });
      });
    })
  })
  