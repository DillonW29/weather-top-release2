import { db } from "../lowdb.js";

export const stationStore = {
  getUserStations(userId) {
    return db.data.stations.filter((station) => station.userid === userId);
  },

  getStationById(id) {
    return db.data.stations.find((station) => station.id === id);
  },

  addStation(station) {
    db.data.stations.push(station);
    db.write();
  },

  removeStation(id) {
    const index = db.data.stations.findIndex((station) => station.id === id);
    if (index !== -1) {
      db.data.stations.splice(index, 1);
      db.write();
    }
  }
};
