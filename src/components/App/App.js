import {BrowserRouter} from 'react-router-dom';
import './App.css';
import {ToastContainer} from 'react-toastify';
import {Jwt} from './../../api/jwt'
import {Login} from "../Login/Login";


export function App() {
    const {token, setToken} = Jwt();

    return (
        <div style={{backgroundColor: "#1b1c1d", height: "100%"}}>
            <BrowserRouter>
                {!token ?
                    <Login setToken={setToken}/> :
                    <div>
                        <h2>Logged in </h2>
                    </div>
                }
            </BrowserRouter>
            <ToastContainer/>
        </div>
    );
}

export default App;
