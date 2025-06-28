import userStore from "../models/user-store.js";

export const accountsController = {
  index(request, response) {
    const user = accountsController.getCurrentUser(request);
    response.render("index",{user:user}); 
  },

  showSignup(request, response) {
    response.render("signup");
  },

  showLogin(request, response) {
    response.render("login");
  },

  signup(request, response) {
    const user = {
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      email: request.body.email,
      password: request.body.password,
    };
    userStore.addUser(user);
    response.redirect("/login");
  },

  login(request, response) {
    const user = userStore.validateUser(request.body.email, request.body.password);
    if (user) {
      response.cookie("user", user.email);
      response.redirect("/");
    } else {
      response.redirect("/login");
    }
  },

  logout(request, response) {
    response.clearCookie("user");
    response.redirect("/");
  },

  getCurrentUser(request) {
    const userEmail = request.cookies.user;
    return userStore.getUserByEmail(userEmail);
  },
};

export default accountsController;
