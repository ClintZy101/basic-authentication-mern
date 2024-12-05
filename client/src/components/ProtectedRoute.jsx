import React from "react";

export default function ProtectedRoute({token, message, accessProtectedRoute}) {

  return (
    <div>
      {token && (
        <div>
          <button onClick={accessProtectedRoute} style={{ margin: "10px" }}>
            Access Protected Route
          </button>
        </div>
      )}
      {message && <p>{message}</p>}
    </div>
  );
}
