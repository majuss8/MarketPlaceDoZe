import { login } from '../services/authService';

document.getElementById('login-form').addEventListener('submit', (e) => {
  e.preventDefault();

  // Obter os valores dos campos de entrada
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Validar se os campos não estão vazios
  if (!email || !password) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  // Chamar a função de login do serviço de autenticação
  login(email, password)
    .then((response) => {
      // Sucesso: redirecionar ou mostrar mensagem de sucesso
      console.log('Login bem-sucedido:', response);
      // Redirecionar ou atualizar a interface conforme necessário
      window.location.href = 'pages/Dashboard/index.html'; // Exemplo de redirecionamento
    })
    .catch((error) => {
      // Erro: exibir uma mensagem de erro
      console.error('Erro ao fazer login:', error);
      alert('Credenciais inválidas, tente novamente.');
    });
});