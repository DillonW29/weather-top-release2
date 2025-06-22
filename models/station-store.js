import { v4 as uuid } from "uuid";
import { initStore } from "../utils/store-utils.js";

const db = initStore("stations");

export const stationStore = {
  stations:[],

  async getAllStations() {
    await db.read();
    return db.data.stations;
  },

  addStation(userId, station) {
    station.id = uuid();       // unique ID
    station.userId = userId;   
    this.stations.push(station);
  },

  async getStationById(id) {
    await db.read();
    const list = db.data.stations.find((station) => station._id === id);
    return list;
  },

  async deleteStationById(id) {
    await db.read();
    const index = db.data.stations.findIndex((station) => station._id === id);
    db.data.stations.splice(index, 1);
    await db.write();
  },

  async deleteAllStations() {
    db.data.stations = [];
    await db.write();
  },
   getUserStations(userId) {
    return this.stations.filter(s => s.userId === userId);
  },
  getStationById(id) {
    return this.stations.find((station) => station.id === id);
  },
};

