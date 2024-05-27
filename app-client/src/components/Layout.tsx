import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export function Layout() {
  return (
    <div>
      <Header />
      <main style={{marginTop: '64px'}}>
        <Outlet />
      </main>
    </div>
  );
}
