/* eslint-disable jsx-a11y/control-has-associated-label */
import React from "react";

import { useNavigate } from "react-router-dom";

function AddNewThread() {
  const navigate = useNavigate();

  const AddNewThreadHandler = () => {
    navigate("/new");
  };
  return (
    <button
      title="addNewThread-Vote"
      className="addNewThread-btn bi bi-plus-circle-fill"
      onClick={() => AddNewThreadHandler()}
    ></button>
  );
}

export default AddNewThread;
