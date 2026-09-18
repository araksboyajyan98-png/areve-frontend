import { Outlet } from "react-router-dom";

export const AppLayout = () => (
  <div className="min-h-screen bg-canvas text-ink">
    <Outlet />
  </div>
);
