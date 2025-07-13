# WeatherTop Application 🌦️  
This is Dillon Waters' submission for the Web Development 2 Assignment at SETU (Southeast Technological University).

## 📚 Overview
WeatherTop is a full-stack weather station application built using Node.js and Handlebars. It allows users to register, manage personal weather stations, and view detailed reports — both manually entered and auto-generated via the OpenWeatherMap API.

## 🚀 Features

### ✅ User Account
- User authentication (Sign Up / Login / Logout)
- Each user has access to their own weather stations only

### 📍 Station Management
- Add/delete stations with name and location (latitude & longitude)
- Station list sorted alphabetically
- Deleting a station cascades and deletes all its reports

### 📊 Reports
- Add reports manually (code, temperature, wind speed/direction, pressure)
- Each report includes a timestamp
- Auto-generate a weather report using **OpenWeatherMap API**
- Icons display current weather based on code (e.g., ☀️, ☁️)

### 🗺️ Station View
- LeafletJS map showing station location
- Current summary (latest values + min/max for each parameter)

### 📈 Trends
- Temperature trend graph using **Frappe Charts**
- Shows temperature change over time for each station

## 📦 Tech Stack
- Node.js
- Express
- Handlebars (hbs)
- LowDB (for JSON-based persistence)
- LeafletJS (for maps)
- Frappe Charts (for graphing)

## 🌐 API Used
- [OpenWeatherMap](https://openweathermap.org/) for auto-generated weather data

## 🏁 Installation

```bash
npm install
npm start