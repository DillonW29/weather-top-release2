import { stationStore } from "../models/station-store.js";
import { accountsController } from "./accounts-controller.js";
import { v4 as uuid } from "uuid";

export const dashboardController = {
  index(request, response) {
    const loggedInUser = accountsController.getCurrentUser(request);
    if (!loggedInUser) {
      response.redirect("/login");
    } else {
      const stations = stationStore.getUserStations(loggedInUser.id);
      const viewData = {
        title: "Your Dashboard",
        user: loggedInUser,
        stations: stations,
      };
      response.render("dashboard-view", viewData);
    }
  },

  addStation(request, response) {
    const loggedInUser = accountsController.getCurrentUser(request);
    const newStation = {
      id: uuid(),
      userid: loggedInUser.id,
      name: request.body.name,
      lat: request.body.lat,
      lng: request.body.lng,
      reports: [],
    };
    stationStore.addStation(newStation);
    response.redirect("/dashboard");
  },

  deleteStation(request, response) {
    const stationId = request.params.id;
    stationStore.removeStation(stationId);
    response.redirect("/dashboard");
  },
};
