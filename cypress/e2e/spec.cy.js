///<reference types="Cypress" />
const URL = "http://192.168.0.174:8080/";

context("Casa de cambio", () => {
  beforeEach(() => {
    cy.visit(URL);
  });

  it("Revisa que luego de cargada la pagina se muestre mas de una opción en moneda base", () => {
    cy.get("#divisa-base").find("option").should("not.have.length", 1);
  });

  it("Revisa que clickeando el boton confirmar sin seleccionar ninguna opcion ponga los cuadros en error", () => {
    cy.get("#confirmar").click();
    cy.get("#divisa-base").should("have.class", "is-invalid");
    cy.get("#fecha-consulta").should("have.class", "is-invalid");
  });


  it("Revisa que clickeando el boton confirmar seleccionando solo la fecha, se muestre en error solo el cuadro de fecha", () => {
    cy.get("#fecha-consulta").type("2024-01-01");
    cy.get("#confirmar").click();
    cy.get("#divisa-base").should("have.class", "is-invalid");
    cy.get("#fecha-consulta").should("have.class", "is-valid");
  });

  it("Revisa que clickeando el boton confirmar seleccionando solo la divisa base, se muestre en error solo el cuadro de divisa base", () => {
    cy.get("#divisa-base").select("USD");
    cy.get("#confirmar").click();
    cy.get("#divisa-base").should("have.class", "is-valid");
    cy.get("#fecha-consulta").should("have.class", "is-invalid");
  });

  it("Revisa que seleccionando opciones validas los cuadros se muestren en verde", () => {
    cy.get("#divisa-base").select("USD");
    cy.get("#fecha-consulta").type("2024-01-01");
    cy.get("#confirmar").click();
    cy.get("#divisa-base").should("have.class", "is-valid");
    cy.get("#fecha-consulta").should("have.class", "is-valid");
  });

  it("Revisa que seleccionando opciones validas, se muestre la informacion", () => {
    cy.get("#divisa-base").select("USD");
    cy.get("#fecha-consulta").type("2024-01-01");
    cy.get("#confirmar").click();
    cy.get("td").should("exist");
  });
});
