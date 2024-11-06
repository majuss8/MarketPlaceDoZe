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