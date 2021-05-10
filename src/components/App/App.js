import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.css';
import {ToastContainer} from 'react-toastify';
import {Jwt} from './../../api/jwt'
import {Login} from "../Login/Login";


export function App() {
    const {token, setToken} = Jwt();

    return (
        <div style={{backgroundColor: "#333", height: "100%"}}>
            <BrowserRouter>
                {!token ?
                    <Login setToken={setToken}/> :
                    <div>
                    </div>
                }
            </BrowserRouter>
            <ToastContainer/>
        </div>
    );
}

export default App;
