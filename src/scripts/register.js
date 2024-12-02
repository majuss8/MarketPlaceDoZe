import { register } from '../services/authService';

document.getElementById('register-form').addEventListener('submit', (e) => {
  e.preventDefault();

  // Pegando os valores dos campos de input
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;

  // Validação simples
  if (password !== confirmPassword) {
    alert('As senhas não coincidem!');
    return;
  }

  // Chama a função de registro passando os dados do usuário
  register(name, email, password);
});