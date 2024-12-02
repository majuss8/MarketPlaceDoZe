import Parse from 'parse';

// Função de Login
async function login(email, password) {
  try {
    const user = await Parse.User.logIn(email, password);
    return user; // Retorna o usuário logado
  } catch (error) {
    console.error('Erro de login', error.message);
    throw new Error('Falha no login');
  }
};

// Função de Registro
async function register(email, password, role) {
  try {
    const user = new Parse.User();
    user.set("username", email); // Email como nome de usuário
    user.set("password", password);
    user.set("email", email);
    user.set("role", role); // Define se é comprador ou vendedor

    await user.signUp();
    return user; // Retorna o usuário registrado
  } catch (error) {
    console.error('Erro no registro', error.message);
    throw new Error('Falha no registro');
  }
};

// Função de logout
const logout = () => {
  localStorage.removeItem('token');
  window.location.href = '/login';
};


// // Função de login
// const login = async (email, password) => {
//   // Aqui você pode fazer uma chamada para a API para autenticar o usuário
//   const response = await fetch('https://api-seu-projeto.com/login', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ email, password })
//   });

//   const data = await response.json();

//   if (data.token) {
//     // Armazene o token no localStorage ou em cookies
//     localStorage.setItem('token', data.token);
//     window.location.href = '/dashboard'; // Redirecionar após o login
//   } else {
//     alert('Erro ao fazer login');
//   }
// };

// // Função de registro
// const register = async (name, email, password) => {
//   const response = await fetch('https://api-seu-projeto.com/register', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ name, email, password })
//   });

//   const data = await response.json();

//   if (data.success) {
//     alert('Cadastro realizado com sucesso! Agora você pode fazer login.');
//     window.location.href = '/login'; // Redireciona para a página de login após o registro
//   } else {
//     alert('Erro ao realizar o cadastro: ' + data.message);
//   }
// };

export { login, logout, register };