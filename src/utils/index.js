export const hitShapeCheck = (x, y, shapes) => {
    let targetEl = null,
        isOnTarget = false,
        targetIndex = null;

    for (let i = 0; i < shapes.length; i++) {
      const shape = shapes[i];
      shape.isActive = false;
      // check Rectangle
      if (
        shape.type === "rectangle" &&
        x >= shape.x &&
        x <= shape.x + shape.w &&
        y >= shape.y &&
        y <= shape.y + shape.h
      ) {
        shape.isActive = true;
        targetEl = shape;
        isOnTarget = true;
        targetIndex = i;
      }
      // check Circle
      if (
        shape.type === "circle" &&
        Math.pow(x-shape.x,2)/ Math.pow(shape.xRad,2) + Math.pow(y-shape.y,2)/ Math.pow(shape.yRad,2) < 1
      ) {
        shape.isActive = true;
        targetEl = shape;
        isOnTarget = true;
        targetIndex = i;
      }
    }
    return {
        targetEl,
        isOnTarget,
        targetIndex
    }
};

export const checkOutsideCanvas = (e, targetEl) => {
    if (targetEl.type === "rectangle") {
        return e.target.offsetLeft > e.clientX ||
        e.target.offsetLeft + targetEl.w < e.clientX ||
        e.target.offsetTop > e.clientY ||
        e.target.offsetTop + targetEl.h < e.clientY;
    } else if (targetEl.type === "circle") {
        return e.target.offsetLeft > e.clientX ||
        e.target.offsetLeft + targetEl.xRad < e.clientX ||
        e.target.offsetTop > e.clientY ||
        e.target.offsetTop + targetEl.yRad < e.clientY;
    }
}

export const swapElems = (index1, index2, arr) => {
    const newArr = JSON.parse(JSON.stringify(arr));
    [newArr[index1], newArr[index2]] = [newArr[index2], newArr[index1]];
    return newArr;
  };
