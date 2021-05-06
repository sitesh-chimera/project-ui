describe("Should add feedback to device", () => {
  it("Add Feedback", () => {
    cy.visit("http://localhost:3000/dashboard");
    cy.get(".add-feedback_button-0").click();
    cy.get("input#formBasicfeedback")
      .type("Test Feedback")
      .should("have.value", "Test Feedback");
    cy.get(".save-feedback_button").click();
  });
});
