const form = document.querySelector(".signup-form");
const note = document.querySelector(".form-note");

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = new FormData(form).get("email");
  note.textContent = email
    ? "Listo. El siguiente paso es confirmar variantes, lote de 5 unidades y precio final."
    : "Agrega un correo para registrar el interés.";
  form.reset();
});
