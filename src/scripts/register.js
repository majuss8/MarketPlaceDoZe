import { register } from '../services/authService';

document.getElementById('register-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;

  if (password !== confirmPassword) {
    alert('As senhas não coincidem!');
    return;
  }

  try {
    await register(name, email, password);
    alert('Usuário cadastrado com sucesso!');
    window.location.href = '/login';
  } catch (error) {
    console.error('Erro no registro:', error);
    alert('Erro ao realizar o cadastro. Tente novamente.');
  }
});