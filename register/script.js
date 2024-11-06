// Configuração do Parse
Parse.initialize("uN5Y1aXedE7dEvVvTUbpVSU6nuFBVSNpBVd550kz", "1VeLKickMsxP0RMsuxk7qJu7yKlxnDizSRFsS9P7");
Parse.serverURL = "https://parseapi.back4app.com";

// Função de cadastro
const registerUser = async (nome, email, senha, idade, tipo) => {
  const user = new Parse.User();
  user.set("username", email);
  user.set("email", email);
  user.set("password", senha);
  user.set("nome", nome);
  user.set("idade", idade);
  user.set("tipo", tipo);
  try {
    await user.signUp();
    alert("Cadastro realizado com sucesso!");
    window.location.href = "../login/index.html";
  } catch (error) {
    alert("Erro ao cadastrar: " + error.message);
  }
};

// Event Listener para o formulário de cadastro
document.getElementById("registerForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value.trim();
  const idade = parseInt(document.getElementById("idade").value.trim());
  const tipo = document.getElementById("tipo").value;
  registerUser(nome, email, senha, idade, tipo);
});