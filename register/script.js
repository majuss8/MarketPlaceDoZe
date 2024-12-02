Parse.initialize("uN5Y1aXedE7dEvVvTUbpVSU6nuFBVSNpBVd550kz", "1VeLKickMsxP0RMsuxk7qJu7yKlxnDizSRFsS9P7");
Parse.serverURL = "https://parseapi.back4app.com";

// Função de cadastro
const registerUser = async (nome, email, senha, idade, telefone, tipo) => {
  const user = new Parse.User();
  user.set("username", email);
  user.set("email", email);
  user.set("password", senha);
  user.set("nome", nome);
  user.set("idade", idade); // Deve ser um número
  user.set("phone", telefone); // Deve ser uma string ou número
  user.set("tipo", tipo);

  console.log("Dados do usuário antes do cadastro:", user.toJSON());

  try {
    await user.signUp();
    alert("Cadastro realizado com sucesso!");
    window.location.href = "../login/index.html";
  } catch (error) {
    alert("Erro ao cadastrar: " + error.message);
    console.error("Erro de cadastro:", error);
  }
};

// Event Listener para o formulário de cadastro
document.getElementById("registerForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value.trim();
  const idade = parseInt(document.getElementById("idade").value.trim());
  const telefone = document.getElementById("telefone").value.trim(); // Corrigido para string
  const tipo = document.getElementById("tipo").value;

  if (!nome || !email || !senha || !idade || !telefone || !tipo) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  registerUser(nome, email, senha, idade, telefone, tipo);
});