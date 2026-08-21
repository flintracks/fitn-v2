import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import WhatsAppFloat from "./WhatsAppFloat";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-20">
        <Outlet />
      </main>
      <WhatsAppFloat />
      <Footer />
    </div>
  );
}
