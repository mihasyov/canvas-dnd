import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import {
  ADD_SHAPE_ON_CANVAS,
  SET_TARGET_EL,
  SET_MOUSE_DOWN,
  SET_MOUSE_UP,
  DELETE_SHAPE,
  MOUSE_OUT,
  SET_ACTIVE_SHAPE,
} from "../store/types";

import { draw, createShape } from "../utils/canvas";
import { hitShapeCheck, checkOutsideCanvas, swapElems } from "../utils";

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
      document.removeEventListener("keydown", handleDeleteKey);
    };
  }, []);

  useEffect(() => {
    draw(shapes, canvas, ctx);
  });

  const handleDeleteKey = (e) => {
    if (e.key === "Delete") {
      const newShapes = shapes.filter((el) => el.isActive !== true);
      dispatch({ type: DELETE_SHAPE, payload: newShapes });
    }
  };

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

  const handleMouseDown = (e) => {
    dispatch({ type: SET_MOUSE_DOWN });
    const mouseX = parseInt(e.nativeEvent.offsetX - canvas.current.clientLeft);
    const mouseY = parseInt(e.nativeEvent.offsetY - canvas.current.clientTop);
    const { isOnTarget, targetEl, targetIndex } = hitShapeCheck(
      mouseX,
      mouseY,
      shapes
    );
    if (isOnTarget) {
      dispatch({ type: SET_TARGET_EL, payload: { isOnTarget, targetEl } });
    }
  };

  const handleMouseUp = (e) => {
    if (isOnTarget && targetEl) {
      const currentIndex = shapes.findIndex((el) => el.id === targetEl.id);
      const lastIndex = shapes.length - 1;

      // push selected shape to the end to draw shape above other
      const newArr = swapElems(currentIndex, lastIndex, shapes);
      // set current coords to selected shape
      newArr[lastIndex].x = targetEl.x;
      newArr[lastIndex].y = targetEl.y;

      dispatch({ type: SET_ACTIVE_SHAPE, payload: newArr });
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

  const handleMouseOut = (e) => {
    dispatch({ type: MOUSE_OUT });
    if (!targetEl) return;
    const isMouseOutsideCanvas = checkOutsideCanvas(e, targetEl);
    if (isMouseDown && isOnTarget && isMouseOutsideCanvas) {
      const newShapes = shapes.filter((el) => el.id !== targetEl.id);
      dispatch({ type: DELETE_SHAPE, payload: newShapes });
    }
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
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseOut={handleMouseOut}
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
