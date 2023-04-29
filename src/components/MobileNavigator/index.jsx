import React from "react";
import { CgProfile } from "react-icons/cg";
import "./styles/styles.css";

export default function MobileNavigator() {
  return (
    <div className="mobile-navigator">
      <div className="mobile-navigator__item">
        <CgProfile />
      </div>
    </div>
  );
}
