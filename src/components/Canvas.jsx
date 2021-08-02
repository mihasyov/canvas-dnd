import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { draw } from "../utils/canvas";
import {
  handleDeleteKey,
  handleDrop,
  handleMouseDown,
  handleMouseUp,
  handleMouseMove,
  handleMouseOut,
} from "../handlers";

const Canvas = ({ shapes, isOnTarget, isMouseDown, targetEl, dispatch }) => {
  const canvas = useRef();
  let ctx = useRef();
  useEffect(() => {
    const canvasEle = canvas.current;
    canvasEle.width = canvasEle.clientWidth;
    canvasEle.height = canvasEle.clientHeight;
    ctx.current = canvasEle.getContext("2d");

    document.addEventListener("keydown", handleDeleteKey);
    return () => {
      document.removeEventListener("keydown", onDeleteKey);
    };
  }, []);

  useEffect(() => {
    draw(shapes, canvas, ctx);
  });

  const onDeleteKey = (e) => {
    handleDeleteKey(e, shapes, dispatch);
  };

  const allowDrop = (e) => {
    e.preventDefault();
  };

  const onDrop = (e) => {
    handleDrop(e, shapes, canvas, dispatch);
  };

  const onMouseDown = (e) => {
    handleMouseDown(e, shapes, canvas, dispatch);
  };

  const onMouseUp = (e) => {
    handleMouseUp(e, isOnTarget, targetEl, shapes, dispatch);
  };

  const onMouseMove = (e) => {
    handleMouseMove(e, isMouseDown, isOnTarget, targetEl);
    draw(shapes, canvas, ctx);
  };

  const onMouseOut = (e) => {
    handleMouseOut(e, isMouseDown, isOnTarget, targetEl, shapes, dispatch);
  };
  //----------------------------------------------------------
  //                          RENDER
  //----------------------------------------------------------

  return (
    <div className="canvas">
      <div className="title">Canvas</div>
      <canvas
        className="canvas-area"
        ref={canvas}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        onMouseOut={onMouseOut}
        onDragOver={allowDrop}
        onDrop={(e) => onDrop(e, shapes)}
      ></canvas>
    </div>
  );
};

const mapStateToProps = ({ targetEl, isOnTarget, isMouseDown, shapes }) => ({
  targetEl,
  isOnTarget,
  isMouseDown,
  shapes,
});

export default connect(mapStateToProps)(Canvas);
