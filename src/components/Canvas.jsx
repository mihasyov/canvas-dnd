import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import {
  ADD_SHAPE_ON_CANVAS,
  SET_TARGET_EL,
  SET_MOUSE_DOWN,
  SET_MOUSE_UP,
} from "../store/types";
import { draw, createShape } from "../utils/canvas";
import { hitShapeCheck } from "../utils";

const Canvas = ({ shapes, isOnTarget, isMouseDown, targetEl, dispatch }) => {
  const canvas = useRef();
  let ctx = useRef();
  useEffect(() => {
    const canvasEle = canvas.current;
    canvasEle.width = canvasEle.clientWidth;
    canvasEle.height = canvasEle.clientHeight;

    ctx.current = canvasEle.getContext("2d");
  }, []);

  useEffect(() => {
    draw(shapes, canvas, ctx);
  });

  const allowDrop = (e) => {
    e.preventDefault();
  };

  const onDrop = (e, shapes) => {
    const mouseX = parseInt(e.nativeEvent.offsetX - canvas.current.clientLeft);
    const mouseY = parseInt(e.nativeEvent.offsetY - canvas.current.clientTop);
    const elemData = JSON.parse(e.dataTransfer.getData("figure"));
    shapes.forEach((shape) => (shape.isActive = false));
    const newShape = createShape(elemData, mouseX, mouseY);
    dispatch({ type: ADD_SHAPE_ON_CANVAS, payload: newShape });
  };

  const handleMouseDown = async (e) => {
    dispatch({ type: SET_MOUSE_DOWN });
    const mouseX = parseInt(e.nativeEvent.offsetX - canvas.current.clientLeft);
    const mouseY = parseInt(e.nativeEvent.offsetY - canvas.current.clientTop);
    const { isOnTarget, targetEl, targetIndex } = hitShapeCheck(
      mouseX,
      mouseY,
      shapes
    );
    console.log(targetIndex);
    if (isOnTarget) {
      dispatch({ type: SET_TARGET_EL, payload: { isOnTarget, targetEl } });
      draw(shapes, canvas, ctx);
    }
  };

  const handleMouseUp = (e) => {
    if (isOnTarget && targetEl) {
      dispatch({ type: SET_MOUSE_UP });
    }
  };

  const handleMouseMove = (e) => {
    if (!isMouseDown || !isOnTarget) return;
    const dx = e.movementX;
    const dy = e.movementY;
    targetEl.x += dx;
    targetEl.y += dy;
    draw(shapes, canvas, ctx);
  };

  //----------------------------------------------------------
  //                          RENDER
  //----------------------------------------------------------

  console.log("render");
  return (
    <div className="canvas">
      <div className="title">Canvas</div>
      <canvas
        className="canvas-area"
        ref={canvas}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
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
