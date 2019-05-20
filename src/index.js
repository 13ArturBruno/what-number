import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CanvasDraw from 'react-canvas-draw'

function App() {
    let saveableCanvas = null
    let canvasRef = useRef(null)

    const getImg = (data) => {
        console.log(data)
    }

    return (
        <div>
            <CanvasDraw
                ref={canvasRef}
                hideGrid
            />
            <button
                onClick={() => {
                    localStorage.setItem(
                        "savedDrawing",
                        canvasRef.getSaveData()
                    );
                }}
            >
                Save
          </button>
            <button
                onClick={() => {
                    canvasRef.clear();
                }}
            >
                Clear
          </button>
            <button
                onClick={() => {
                    canvasRef.undo();
                }}
            >
                Undo
          </button>

            <button
                onClick={() => getImg(localStorage.getItem("savedDrawing"))}
            >
                Load
        </button>
            <CanvasDraw
                disabled
                hideGrid
                ref={canvasRef}
                saveData={localStorage.getItem("savedDrawing")}
            />
        </div >
    );
}



const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);


