import React from "react";

const Figures = () => {
  const handleMouseDown = (e) => {
    e.target.parentNode.childNodes.forEach((child) =>
      child.classList.remove("active")
    );
    e.target.classList.add("active");
  };

  const onDragStart = (e) => {
    const rect = e.target.getBoundingClientRect();
    const type = e.target.dataset.type;
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    e.dataTransfer.setData(
      "figure",
      JSON.stringify({ offsetX, offsetY, type })
    );
  };

  return (
    <div className="figures">
      <div className="title">Figures</div>
      <div className="pallet">
        <div
          data-type="rectangle"
          className="shape rectangle"
          draggable
          onMouseDown={handleMouseDown}
          onDragStart={onDragStart}
        ></div>
        <div
          data-type="circle"
          className="shape circle"
          draggable
          onMouseDown={handleMouseDown}
          onDragStart={onDragStart}
        ></div>
      </div>
    </div>
  );
};

export default Figures;
