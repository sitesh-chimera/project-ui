describe("Should add device to the system", () => {
  it("Add Mobile", () => {
    cy.visit("http://localhost:3000");
    cy.get(".add-device_button").click();
    cy.get("input#formBasicDeviceName")
      .type("Samsung Mobile")
      .should("have.value", "Samsung Mobile");
    cy.get("input#formBasicOS")
      .type("Android Operation System")
      .should("have.value", "Android Operation System");
    cy.get("input#formBasicManufacturer")
      .type("Samsung Company")
      .should("have.value", "Samsung Company");
    cy.get(".save-device_button").click();
  });
});
