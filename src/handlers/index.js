import {  hitShapeCheck, swapElems, checkOutsideCanvas } from "../utils";
import { createShape } from "../utils/canvas";
import { 
    ADD_SHAPE_ON_CANVAS,
    SET_MOUSE_DOWN,
    SET_TARGET_EL,
    SET_ACTIVE_SHAPE,
    SET_MOUSE_UP,
    MOUSE_OUT,
    DELETE_SHAPE 
} from "../store/types";

export const handleDeleteKey = (e, shapes, dispatch) => {
    if (e.key === "Delete") {
      const newShapes = shapes.filter((el) => el.isActive !== true);
      dispatch({ type: DELETE_SHAPE, payload: newShapes });
    }
};

export const handleDrop = (e, shapes, canvas, dispatch) => {
    const mouseX = parseInt(e.nativeEvent.offsetX - canvas.current.clientLeft);
    const mouseY = parseInt(e.nativeEvent.offsetY - canvas.current.clientTop);
    const elemData = JSON.parse(e.dataTransfer.getData("figure"));
    shapes.forEach((shape) => (shape.isActive = false));
    const newShape = createShape(elemData, mouseX, mouseY);
    dispatch({ type: ADD_SHAPE_ON_CANVAS, payload: newShape });
};

export  const handleMouseDown = (e, shapes, canvas, dispatch) => {
    dispatch({ type: SET_MOUSE_DOWN });
    const mouseX = parseInt(e.nativeEvent.offsetX - canvas.current.clientLeft);
    const mouseY = parseInt(e.nativeEvent.offsetY - canvas.current.clientTop);
    const { isOnTarget, targetEl } = hitShapeCheck(
      mouseX,
      mouseY,
      shapes
    );
    if (isOnTarget) {
      dispatch({ type: SET_TARGET_EL, payload: { isOnTarget, targetEl } });
    }
};

export const handleMouseUp = (e, isOnTarget, targetEl, shapes, dispatch) => {
    if (isOnTarget && targetEl) {
      const currentIndex = shapes.findIndex((el) => el.id === targetEl.id);
      const lastIndex = shapes.length - 1;

      // push selected shape to the end to draw shape above other
      const newArr = swapElems(currentIndex, lastIndex, shapes, dispatch);
      // set current coords to selected shape
      newArr[lastIndex].x = targetEl.x;
      newArr[lastIndex].y = targetEl.y;

      dispatch({ type: SET_ACTIVE_SHAPE, payload: newArr });
      dispatch({ type: SET_MOUSE_UP });
    }
};

export const handleMouseMove = (e, isMouseDown, isOnTarget, targetEl) => {
    if (!isMouseDown || !isOnTarget) return;
    const dx = e.movementX;
    const dy = e.movementY;
    targetEl.x += dx;
    targetEl.y += dy;
    // draw(shapes, canvas, ctx);
};

export const handleMouseOut = (e, isMouseDown, isOnTarget, targetEl, shapes, dispatch) => {
    dispatch({ type: MOUSE_OUT });
    if (!targetEl) return;
    const isMouseOutsideCanvas = checkOutsideCanvas(e, targetEl);
    if (isMouseDown && isOnTarget && isMouseOutsideCanvas) {
      const newShapes = shapes.filter((el) => el.id !== targetEl.id);
      dispatch({ type: DELETE_SHAPE, payload: newShapes });
    }
};