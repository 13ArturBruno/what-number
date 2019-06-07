import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CanvasDraw from 'react-canvas-draw'
import axios from 'axios'

class App extends React.Component {
    state = {
        blob: null
    }
    download = async () => {
        let img = this.saveable.canvasContainer.children[1].toDataURL('image/jpeg')
        await fetch(img)
            .then(res => res.blob())
            .then(blob => this.setState({ blob: blob }))

        this.postBlob(this.state.blob)
    }

    postBlob = (blob) => {
        var file = new File([blob], "porra.jpeg", { type: "image/jpeg" })

        let data = new FormData();
        data.append('data', file);

        axios.post(
            `http://192.168.0.107:8000/api/search/check_number/`,
            data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(res => {
                console.log(res)
            });

        // var a = document.createElement('a');
        // var url = window.URL.createObjectURL(file);
        // a.href = url;
        // a.download = "teste";
        // debugger
        // a.click();
        // window.URL.revokeObjectURL(url);


    }

    render() {
        return (
            <div>
                <div style={{ display: 'flex', marginTop: '50px', justifyContent: 'center', alignItems: 'center' }}>
                    <CanvasDraw
                        style={{ backgroundColor: '#000' }}
                        ref={canvas => (this.saveable = canvas)}
                        hideGrid
                        catenaryColor="white"
                        brushColor="white"
                        canvasWidth={200}
                        canvasHeight={200}
                        brushRadius={10}
                    />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '50px' }}>
                    <button
                        style={{
                            height: 60,
                            width: 180,
                            borderRadius: 10,
                            backgroundColor: 'aqua',
                            fontSize: 25
                        }}
                        onClick={() => {
                            this.download()
                        }}
                    >
                        Salvar
          </button>
                    <div style={{ width: 50 }} />
                    <button
                        style={{
                            height: 60,
                            width: 180,
                            borderRadius: 10,
                            backgroundColor: 'aqua',
                            fontSize: 25
                        }}
                        onClick={() => {
                            this.saveable.clear();
                        }}
                    >
                        Apagar
          </button>
                </div>
            </div >
        );
    }
}



const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);


