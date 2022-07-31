import React from "react";

export default function Delete() {
  const element = document.getElementById("photos");
  element.remove();
  return (
    <div>
      <button onclick="Delete()">Delete</button>
    </div>
  );
}
