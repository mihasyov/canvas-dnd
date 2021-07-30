import React from "react";

const Figures = () => {
  return (
    <div className="figures">
      <div className="title">Figures</div>
      <div className="pallet">
        <div data-type="rectangle" className="shape rectangle" draggable></div>
        <div data-type="circle" className="shape circle" draggable></div>
      </div>
    </div>
  );
};

export default Figures;
