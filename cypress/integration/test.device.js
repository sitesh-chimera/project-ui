describe("Device", () => {
  const STTE_URL = "http://localhost:3000";
  it("can create a device", () => {
    const device = "samsung device";
    const OS = "Android";
    const manufacturer = "India";

    cy.visit(STTE_URL);

    cy.get("p").contains(
      "colored row has been checked out for more than a week or older than"
    );

    cy.get("table").contains("th", "Device");
    cy.get("table").contains("th", "OS");
    cy.get("table").contains("th", "Manufacturer");
    cy.get("table").contains("th", "lastCheckedOutDate");
    cy.get("table").contains("th", "lastCheckedOutBy");
    cy.get("table").contains("th", "CheckedOut");
    cy.get("table").contains("th", "Action");

    cy.get(".add-device_button").click();

    cy.get("div.modal-title").should("have.text", "Add Device");

    cy.get("input#formBasicDeviceName")
      .type(device)
      .should("have.value", device);
    cy.get("input#formBasicOS").type(OS).should("have.value", OS);
    cy.get("input#formBasicManufacturer")
      .type(manufacturer)
      .should("have.value", manufacturer);
    cy.get(".save-device_button").click();
    cy.wait(1000);
  });

  it("Add Feedback", () => {
    const feedback = "Test feedback";
    cy.visit(STTE_URL);
    cy.get("p").contains(
      "colored row has been checked out for more than a week or older than"
    );
    cy.get("table").contains("th", "Device");
    cy.get("table").contains("th", "OS");
    cy.get("table").contains("th", "Manufacturer");
    cy.get("table").contains("th", "lastCheckedOutDate");
    cy.get("table").contains("th", "lastCheckedOutBy");
    cy.get("table").contains("th", "CheckedOut");
    cy.get("table").contains("th", "Action");

    cy.get(".add-feedback_button-0").click();
    cy.get("p").contains("Feedback");
    cy.get("input#formBasicfeedback")
      .type(feedback)
      .should("have.value", feedback);

    cy.get(".save-feedback_button").click();
    cy.wait(1000);
  });

  it("DELETE DEVICE", () => {
    cy.visit("http://localhost:3000");
    cy.get(".delete-device_button-0").click();
  });
  // it("Should check in device", () => {
  //   cy.visit(STTE_URL);
  //   cy.get("p").contains(
  //     "colored row has been checked out for more than a week or older than"
  //   );
  //   cy.get('select[name="check-in"]').each(($entry) => {
  //     cy.wrap($entry).within(() => {
  //       cy.get("option")
  //         .eq(1)
  //         .then((firstNonDisabledOption) =>
  //           cy.wrap($entry).select(firstNonDisabledOption.val())
  //         );
  //     });
  //   });
  //   cy.get("select").select("check In").should("have.value", "check-in");
  // });
});
