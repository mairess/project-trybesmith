const validPassword = 'terrível';
const validUsername = 'Hagar';

const validLoginBody = { username: validUsername, password: validPassword };

const existingUser = {
  id: 1, 
  username: 'Hagar',
  vocation: 'Guerreiro',
  level: 10,
  password: '$2a$10$i3brDhN6DoiMFILYiI0eeuaCTis3I4Kefju7zDnFt6Z9xWcCgZ3eG'
};

const noUsernameLoginBody = { username: '', password: validPassword };

const noPasswordLoginBody = { username: validUsername, password: '' };

const notExistingUsername = { username: 'notExistingUsername', password: validPassword };

const notExistingPassword = { username: validUsername, password: 'notExistingPassword' };

export default {
    validLoginBody,
    existingUser,
    noUsernameLoginBody,
    noPasswordLoginBody,
    notExistingUsername,
    notExistingPassword,
  };