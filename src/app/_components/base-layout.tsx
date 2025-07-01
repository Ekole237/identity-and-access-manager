import { Navbar } from "#/components/ui/navbar";
import React from "react";

type Props = React.PropsWithChildren;

export const BaseLayout = ({ children }: Props) => {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="container mx-auto flex-grow px-4 py-6 md:px-6 lg:px-8">
        {children}
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 py-4 text-center text-sm text-gray-300">
        <div className="container mx-auto">
          <p>© {new Date().getFullYear()} IAM System</p>
        </div>
      </footer>
    </div>
  );
};
