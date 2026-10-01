import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="admin-container">
      <Sidebar
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />
      <div className="admin-main">
        <Header onToggleMobile={() => setMobileOpen(!mobileOpen)} />
        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
