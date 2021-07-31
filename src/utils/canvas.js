export const draw = (shapes, canvas, ctx) => {
    ctx.current.clearRect(
      0,
      0,
      canvas.current.clientWidth,
      canvas.current.clientHeight
    );
    shapes.map((figure) => {
        if(figure.type === "rectangle") {
            drawRect(figure, ctx)
        } else if (figure.type) {
            drawCircle(figure, ctx)
        }
    });
};

const drawRect = (rect, ctx) => {
    const { x, y, w, h, color, isActive } = rect;

    ctx.current.beginPath();
    if (isActive) {
      ctx.current.strokeStyle = "black";
      ctx.current.lineWidth = 5;
      ctx.current.strokeRect(x, y, w, h);
    }
    ctx.current.fillStyle = color;
    ctx.current.fillRect(x, y, w, h);
};
const drawCircle = (circle, ctx) => {
    const { x, y, xRad, yRad, color, isActive } = circle;

    ctx.current.beginPath();
    if (isActive) {
      ctx.current.ellipse(x,y,xRad,yRad, 0, 0, Math.PI * 2);
      ctx.current.strokeStyle = "black";
      ctx.current.lineWidth = 5;
      ctx.current.stroke();
    }
    ctx.current.ellipse(x,y,xRad,yRad, 0, 0, Math.PI * 2);
    ctx.current.fillStyle = color;
    ctx.current.fill();
};

export const createShape = (elemData, mouseX, mouseY) => {
    const {type, offsetX, offsetY} = elemData;
    if (type === "rectangle") {
        return {
          x: mouseX - offsetX,
          y: mouseY - offsetY,
          w: 100,
          h: 50,
          color: "lightgreen",
          isActive: true,
          id: Math.random(),
          type,
        };
      } else if (type === "circle") {
        return {
          x: mouseX,
          y: mouseY,
          xRad: 50,
          yRad: 25,
          color: "blue",
          isActive: true,
          id: Math.random(),
          type,
        };
      }
}