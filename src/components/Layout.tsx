import React from "react";
import MainHeader from "./MainHeader";
import Footer from "@/components/Footer";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <div className="flex justify-center">
        <main className="px-6 xl:px-0 mt-6 prose lg:prose-xl prose-slate max-w-6xl prose-h1:last:mb-4">
          <MainHeader />
          {children}
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
