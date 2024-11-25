// Configuração do Parse
Parse.initialize("uN5Y1aXedE7dEvVvTUbpVSU6nuFBVSNpBVd550kz", "1VeLKickMsxP0RMsuxk7qJu7yKlxnDizSRFsS9P7");
Parse.serverURL = "https://parseapi.back4app.com";

// Mostrar mensagens de erro
function showError(message) {
  const errorMessage = document.getElementById("errorMessage");
  errorMessage.textContent = message;
  errorMessage.style.display = "block";
}

// Função para verificar se o usuário está autenticado
const checkAuth = async () => {
  try {
    const currentUser = Parse.User.current();
    if (!currentUser) {
      window.location.href = "../login/index.html"; // Redireciona para a página de login
    } else {
      const role = currentUser.get("tipo");
      if (role === "vendedor") {
        window.location.href = "../pagesSeller/products/index.html";
      } else if (role === "cliente") {
        window.location.href = "../dashboard/index.html";
      } else {
        showError("Tipo de usuário desconhecido.");
        await Parse.User.logOut();
      }
    }
  } catch (error) {
    console.error("Erro ao verificar autenticação:", error);
    showError("Erro ao verificar autenticação. Tente novamente.");
  }
};

// Função de login
async function loginUser(email, password) {
  try {
    const user = await Parse.User.logIn(email, password);
    const role = user.get("tipo");

    // Redirecionar baseado no tipo
    if (role === "cliente") {
      window.location.href = "../dashboard/index.html";
    } else if (role === "vendedor") {
      window.location.href = "../pagesSeller/products/index.html";
    } else {
      showError("Tipo de usuário desconhecido.");
      await Parse.User.logOut();
    }
  } catch (error) {
    console.error("Erro no login:", error.message);
    showError("Email ou senha inválidos. Tente novamente.");
  }
}

// Logout
async function logout() {
  try {
    await Parse.User.logOut();
    alert("Deslogado com sucesso!");
    window.location.href = "../login/index.html";
  } catch (error) {
    showError("Erro ao deslogar. Tente novamente.");
  }
}

// Listener para o formulário de login
document.getElementById("loginForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  loginUser(email, password);
});
