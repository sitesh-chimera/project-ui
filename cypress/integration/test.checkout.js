describe("Should check out device", () => {
  it("Check out device", () => {
    cy.visit("http://localhost:3000/dashboard");
    cy.get(".checkout-device_button-0").click();
    cy.get("input#formBasicCheckOutBy")
      .type("Test User")
      .should("have.value", "Test User");
    cy.get(".save-checkout_button").click();
  });
});
