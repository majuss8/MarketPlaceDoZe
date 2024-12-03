Parse.initialize("uN5Y1aXedE7dEvVvTUbpVSU6nuFBVSNpBVd550kz", "1VeLKickMsxP0RMsuxk7qJu7yKlxnDizSRFsS9P7");
Parse.serverURL = "https://parseapi.back4app.com";

// Função para editar o perfil do usuário
const editProfile = async (nome, email, senha, idade, telefone, tipo) => {
  const currentUser = Parse.User.current();
  if (!currentUser) {
    window.location.href = "../../login/index.html";
    return;
  }

  currentUser.set("nome", nome);
  currentUser.set("email", email);
  currentUser.set("password", senha);
  currentUser.set("idade", idade);
  currentUser.set("phone", telefone);
  currentUser.set("tipo", tipo);

  try {
    await currentUser.save();
    alert("Perfil atualizado com sucesso!");
    window.location.href = "../../dashboard/index.html";  // Redireciona para o dashboard após editar o perfil
  } catch (error) {
    alert("Erro ao atualizar perfil: " + error.message);
    console.error("Erro ao editar perfil:", error);
  }
};

// Função para preencher os dados do formulário com as informações do usuário atual
const populateProfileForm = async () => {
  const currentUser = Parse.User.current();
  if (!currentUser) {
    window.location.href = "../../login/index.html";
    return;
  }

  // Preenche os campos do formulário com os dados do usuário
  document.getElementById("nome").value = currentUser.get("nome") || '';
  document.getElementById("email").value = currentUser.get("email") || '';
  document.getElementById("idade").value = currentUser.get("idade") || '';
  document.getElementById("telefone").value = currentUser.get("phone") || '';
  document.getElementById("tipo").value = currentUser.get("tipo") || '';
};

// Event Listener para o formulário de edição
document.getElementById("registerForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value.trim();
  const idade = parseInt(document.getElementById("idade").value.trim());
  const telefone = document.getElementById("telefone").value.trim();
  const tipo = document.getElementById("tipo").value;

  if (!nome || !email || !senha || !idade || !telefone || !tipo) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  editProfile(nome, email, senha, idade, telefone, tipo);
});

// Chama a função para preencher o formulário com os dados do usuário atual ao carregar a página
window.onload = populateProfileForm;

// Função para logout
const logout = async () => {
  await Parse.User.logOut();
  window.location.href = "../../login/index.html";
};

