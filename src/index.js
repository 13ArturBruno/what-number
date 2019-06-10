import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CanvasDraw from 'react-canvas-draw'
import axios from 'axios'

class App extends React.Component {
    state = {
        blob: null,
        loading: false,
        number: null
    }

    download = async () => {
        this.setState({ loading: true })
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
            `http://192.168.0.113:8000/api/search/check_number/`,
            data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(res => {
                this.setState({ loading: false, number: res.data[0] })
            });

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
                            height: 40,
                            width: 140,
                            borderRadius: 10,
                            backgroundColor: 'aqua',
                            fontSize: 20
                        }}
                        onClick={() => {
                            this.download()
                        }}
                    >
                        Checar
          </button>
                    <div style={{ width: 50 }} />
                    <button
                        style={{
                            height: 40,
                            width: 140,
                            borderRadius: 10,
                            backgroundColor: 'aqua',
                            fontSize: 20
                        }}
                        onClick={() => {
                            this.saveable.clear();
                        }}
                    >
                        Apagar
          </button>
                </div>
                {this.state.number == null ? null :
                    <div style={{ display: 'flex', marginTop: '50px', justifyContent: 'center', alignItems: 'center' }}>
                        <text>{'O numero é :'}</text>
                        <text style={{ marginLeft: 10, fontSize: 25 }}>{this.state.number}</text>
                    </div>
                }
            </div >
        );
    }
}



const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);


