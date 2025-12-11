import React, { useState } from "react";
import "./settings.css";

export default function Settings() {
  const [theme, setTheme] = useState("dark");
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="settings-container">

      {/* LEFT SIDEBAR */}
      <div className="settings-sidebar">
        <h2>Settings</h2>

        <ul>
          <li className="active">General</li>
          <li>Appearance</li>
          <li>Notifications</li>
          <li>Account</li>
          <li>About</li>
        </ul>
      </div>

      {/* RIGHT CONTENT */}
      <div className="settings-content">

        {/* GENERAL */}
        <section className="settings-section">
          <h3>General</h3>
          <p>Basic preferences for your SigmaGPT experience.</p>
        </section>

        {/* APPEARANCE */}
        <section className="settings-section">
          <h3>Appearance</h3>
          <div className="setting-item">
            <label>Theme</label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="settings-select"
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
              <option value="system">System default</option>
            </select>
          </div>
        </section>

        {/* NOTIFICATIONS */}
        <section className="settings-section">
          <h3>Notifications</h3>
          <div className="setting-item toggle-row">
            <label>Email Notifications</label>
            <label className="switch">
              <input
                type="checkbox"
                checked={notifications}
                onChange={() => setNotifications(!notifications)}
              />
              <span className="slider"></span>
            </label>
          </div>
        </section>

        {/* ACCOUNT */}
        <section className="settings-section">
          <h3>Account</h3>

          <div className="setting-item">
            <button className="delete-btn">
              Delete Account
            </button>
          </div>

          <div className="setting-item">
            <button
              className="logout-btn"
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/login";
              }}
            >
              Logout
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}
