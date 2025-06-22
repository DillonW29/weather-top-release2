import axios from "axios";
import { stationStore } from "../models/station-store.js";
import accountsController from "./accounts-controller.js";

const weatherRequestUrl = `https://api.openweathermap.org/data/2.5/weather?q=Tramore,Ireland&units=metric&appid=81e6554e88d12b9a5a80d1740acede2b`
const apiKey="81e6554e88d12b9a5a80d1740acede2b";
export const dashboardController = {
  index(request, response) {
  const user = accountsController.getCurrentUser(request);
  response.render("index", { user: user });
  },
  dashboard(request, response) {
    const user = accountsController.getCurrentUser(request);
    if (!user) {
      return response.redirect("/login");
    }
    const stations = stationStore.getUserStations(user.id);
    response.render("dashboard", {
      title: "Your Dashboard",
      user: user,
      stations: stations,
      active:"dashboard",
    });
  },
  addStation(request, response) {
    const user = accountsController.getCurrentUser(request);
    const newStation = {
      name: request.body.name,
      latitude: request.body.latitude,
      longitude: request.body.longitude
    };
    stationStore.addStation(user.id, newStation);
    response.redirect("/dashboard");
  }
};
