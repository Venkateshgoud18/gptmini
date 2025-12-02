import React from 'react';
import './Sidebar.css';
function Sidebar() {
  return (
    <section className="sidebar">
      <h2>Sidebar</h2>
      <button><img src="/src/assets/image.png" alt="gpt logo"></img><i class="fa-regular fa-pen-to-square"></i></button>

      {/* Sidebar content such as navigation links would go here */}
      <ul className="history">
        <li>History 1</li>
        <li>History 2</li>
        <li>History 3</li>
      </ul>
      <div className="sign">
        <p>By Venkatesh &hearts;</p>
      </div>
    </section>
  );
}

export default Sidebar;