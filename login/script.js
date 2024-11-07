// Configuração do Parse
Parse.initialize("uN5Y1aXedE7dEvVvTUbpVSU6nuFBVSNpBVd550kz", "1VeLKickMsxP0RMsuxk7qJu7yKlxnDizSRFsS9P7");
Parse.serverURL = "https://parseapi.back4app.com";

const checkAuth = () => {
  const currentUser = Parse.User.current();
  if (!currentUser) {
    window.location.href = "../register/index.html";
  } else if (currentUser.get("tipo") === "vendedor") {
    window.location.href = "../pagesSeller/products/index.html";
  } else {
    window.location.href = "../dashboard/index.html"; // Página principal para outros usuários
  }
};
// Função de login
function loginUser(email, password) {
  Parse.User.logIn(email, password)
    .then((user) => {
      // Verifique o tipo de usuário
      const role = user.get("tipo"); // Assumindo que o campo se chama "role"

      if (role === "cliente") {
        // Redirecionar para a página de produtos para compra (Dashboard do Cliente)
        window.location.href = "../dashboard/index.html"; // Aqui redireciona para o dashboard
      } else if (role === "vendedor") {
        // Redirecionar para o painel de CRUD dos produtos (Dashboard do Vendedor)
        window.location.href = "../pagesSeller/products/index.html"; // Aqui também redireciona para o dashboard
      } else {
        console.error("Tipo de usuário desconhecido");
      }
    })
    .catch((error) => {
      console.error("Erro no login:", error.message);
      alert("Erro no login: " + error.message);
    });
}



// Event Listener para o formulário de login
document.getElementById("loginForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  loginUser(email, password);
});


// Função para logout
const logout = async () => {
  try {
    await Parse.User.logOut();
    alert("Deslogado com sucesso!");
    window.location.href = "../login/index.html";
  } catch (error) {
    alert("Erro ao deslogar: " + error.message);
  }
};