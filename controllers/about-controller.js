import {accountsController} from "../controllers/accounts-controller.js";

export const aboutController = {
  index(request, response) {
    const user = accountsController.getCurrentUser(request);
    const viewData = {
      title: "WeatherTop 2.0",
      user:user,
    };
    console.log("about rendering");
    response.render("about-view", viewData);
  },
};
