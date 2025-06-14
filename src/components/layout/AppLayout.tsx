
import { ReactNode } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen bg-secondary">
      <Header />
      <div className="flex flex-1 min-h-0">
        <Sidebar />
        <main className="flex-1 min-w-0 px-8 py-8 bg-background shadow-none lg:shadow-soft rounded-lg mx-2 my-4 transition-all">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default AppLayout;
