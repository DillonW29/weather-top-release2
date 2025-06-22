import { v4 as uuid } from 'uuid';

const userStore = {
  users: [],

  addUser(user) {
    user.id = uuid(); // generates unique ID
    this.users.push(user);
  },

  getUserByEmail(email) {
    return this.users.find((u) => u.email === email);
  },

  getUserById(id) {
    return this.users.find((u) => u.id === id);
  },

  validateUser(email, password) {
    return this.users.find((u) => u.email === email && u.password === password);
  },
};

export default userStore;
