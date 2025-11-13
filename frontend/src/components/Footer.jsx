import React from "react";

function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-gray-300 text-center py-4 mt-12 border-t border-gray-700">
      <p className="text-sm">
        Blogging Platform,Created by{" "}
        <span className="text-teal-400 font-medium">Mukthar Ahammend</span> © {new Date().getFullYear()}
      </p>
    </footer>
  );
}

export default Footer;
