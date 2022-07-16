//default constant variables
const defaultColor = "#272727";
const defaultSize = 32;
const defaultwidth = 450;
const defaultMode = "paint";
const defaultCanvas = "#ffffff";

//default variables
let color = defaultColor;
let size = defaultSize;
let width = defaultwidth;
let currentMode = "paint";
let canvas = defaultCanvas;

const colorCanvas = document.getElementById("color-canvas");
const colorPicker = document.getElementById("color-picker");
const colorMode = document.getElementById("color-mode");
const rainbowMode = document.getElementById("rainbow-mode");
const eraserMode = document.getElementById("erase-mode");
const reset = document.getElementById("reset");
const grid = document.querySelector('.grid');
const slider = document.getElementById("slider");
const range = document.getElementById("slider-value");
const width_slider = document.getElementById("width-slider");
const width_range = document.getElementById("width-slider-value");
const grid_lines = document.getElementById("grid-lines");
const choice = document.querySelectorAll(".choice");


let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

let modechanger = (mode) =>{currentMode = mode;};
let numberRandom = () =>{ return random= Math.trunc(Math.random() * 256); };

reset.addEventListener("click", () => reload());
rainbowMode.addEventListener("click", () => modechanger("rainbow"));
colorMode.addEventListener("click",() => modechanger("paint"));
eraserMode.addEventListener("click",() => modechanger("eraser"));

let reload = () =>{
  grid_lines.classList.remove("settings");
  grid.innerHTML = "";
  gridSetup(size);
};

let removeClassList =()=>{
  choice.forEach(choice=>{
    choice.classList.remove("active");
  });
};

choice.forEach(choice =>{
  choice.addEventListener("click",()=>{
    removeClassList();
    choice.classList.add("active");
  })
});

grid_lines.addEventListener("click",()=>{
  let gridElements = document.querySelectorAll('.grid-element');
  grid_lines.classList.toggle("settings");
  gridElements.forEach(on =>{
    on.classList.toggle("on");
  });
});

width_slider.addEventListener("input",()=>{
  width = width_slider.value;
  width_range.textContent = `${width}px by ${width}px `;
  grid.style.width = `${width}px`;
  grid.style.height = `${width}px`;
});

slider.addEventListener("input",()=>{
  size = slider.value;
  range.textContent = `${size} x ${size} `;
  reload();
});

colorPicker.addEventListener("input",()=>{  
    color = colorPicker.value;
});
colorCanvas.addEventListener("input",()=>{  
    const eraseColor = document.querySelectorAll(".eraseColor");
    canvas = colorCanvas.value;
    grid.style.backgroundColor = canvas;
    eraseColor.forEach(element =>{
      element.style.backgroundColor = colorCanvas.value;
    });
});

paint = (e) =>{
  if (e.type === 'mouseover' && !mouseDown) return;
  if(currentMode == "paint"){
    console.log("paint");
    e.target.style.backgroundColor = color;
  }else if(currentMode == "rainbow"){
    console.log("rainbow");
    e.target.style.backgroundColor = `rgb(${numberRandom()},${numberRandom()},${numberRandom()})`;
  }else if(currentMode = "eraser"){
    e.target.style.backgroundColor = canvas;
    e.target.classList.add("eraseColor");
  }
};

gridSetup = (size) =>{
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`
  
    for (let i = 0; i < size * size; i++) {
      let gridElement = document.createElement('div');
      gridElement.classList.add('grid-element');
      gridElement.addEventListener('mouseover', paint);
      gridElement.addEventListener('mousedown', paint);
      grid.appendChild(gridElement);
    }
}
window.onload = () => {
  colorPicker.value = defaultColor;
  colorCanvas.value = defaultCanvas;
  gridSetup(size);
}