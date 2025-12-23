import React from "react";
import "./upgrade.css";

function UpgradePage() {
  return (
    <div className="upgrade-container">
      <h1 className="upgrade-title">Upgrade Your IntelliChat Experience</h1>
      <p className="upgrade-subtitle">
        Unlock more features, faster responses, and priority access.
      </p>

      <div className="upgrade-cards">
        
        <div className="plan-card free">
          <h2>Free Plan</h2>
          <p>✔ Basic responses</p>
          <p>✔ Limited daily usage</p>
          <p>✔ Standard support</p>
          <button className="disabled-btn">Current Plan</button>
        </div>

        <div className="plan-card pro">
          <h2>Pro Plan</h2>
          <p>🚀 Faster responses</p>
          <p>🔓 Unlimited messages</p>
          <p>📣 Priority access</p>
          <button className="upgrade-btn">Upgrade Now</button>
        </div>

      </div>
    </div>
  );
}

export default UpgradePage;
