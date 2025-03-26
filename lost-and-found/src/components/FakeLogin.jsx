import React from "react";

const FakeLogin = () => {
  const handleLogin = (id) => {
    localStorage.setItem("user_id", id);
    alert(`Logged in as user ID: ${id}`);
  };

  return (
    <div style={{ margin: "20px" }}>
      <h3>🔐 Fake Login</h3>
      <button onClick={() => handleLogin(1)}>Login as Admin (ID 1)</button>
      <button onClick={() => handleLogin(2)}>Login as Nivya (ID 2)</button>
      <button onClick={() => handleLogin(3)}>Login as Fayaaz (ID 3)</button>
    </div>
  );
};

export default FakeLogin;
