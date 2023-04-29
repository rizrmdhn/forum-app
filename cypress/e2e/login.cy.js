describe("Login spec", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/login");
  });

  it("should display login page correctly", () => {
    cy.get('div[class="login-page-container"]').should("exist");
    cy.get("input[type='email']").should("exist");
    cy.get("input[type='password']").should("exist");
    cy.get("button[type='submit']").should("exist");
  });

  it("should display alert when username is empty", () => {
    cy.get("input[type='email']").type(" ");
    cy.get("input[type='password']").type("123456");
    cy.get("button[type='submit']").click();
    cy.get("div[class='swal2-container']").should("exist");
  });
});
