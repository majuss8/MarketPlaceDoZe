// Inicialização do Parse
Parse.initialize("uN5Y1aXedE7dEvVvTUbpVSU6nuFBVSNpBVd550kz", "1VeLKickMsxP0RMsuxk7qJu7yKlxnDizSRFsS9P7");
Parse.serverURL = "https://parseapi.back4app.com";

// Função para verificar se o usuário está logado
const checkAuth = () => {
  const currentUser = Parse.User.current();
  if (!currentUser) {
    window.location.href = "login.html";
  } else if (currentUser.get("tipo") === "vendedor") {
    window.location.href = "dashboard.html";
  } else {
    window.location.href = "home.html"; // Página principal para outros usuários
  }
};


// Função para logout
const logout = async () => {
  try {
    await Parse.User.logOut();
    alert("Deslogado com sucesso!");
    window.location.href = "login.html";
  } catch (error) {
    alert("Erro ao deslogar: " + error.message);
  }
};

// Função para atualizar o perfil (para vendedores)
const updateProfile = async (profileData) => {
  const currentUser = Parse.User.current();
  Object.keys(profileData).forEach((key) => {
    currentUser.set(key, profileData[key]);
  });
  try {
    await currentUser.save();
    alert("Perfil atualizado com sucesso!");
  } catch (error) {
    alert("Erro ao atualizar perfil: " + error.message);
  }
};



