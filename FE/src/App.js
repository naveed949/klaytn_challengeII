import logo from './logo.svg';
import './App.css';
import {useState} from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import 'bootstrap/dist/css/bootstrap.min.css';
import {providerOptions} from './providers';

function App() {
  const [address, setAddress]=useState(null)
  const [signer, setSigner]=useState(null)
  const [provider, setProvider]=useState(null)
  const [message, setMessage]=useState(null)
  const [signature, setSignature]=useState(null)
  const [error, setError]=useState("")

  async function connect() {
      try {
        const web3Modal = new Web3Modal({
            // network: "mainnet", // optional
            cacheProvider: true, // optional
            providerOptions // required
        });
        const instance = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(instance);
        const signer = provider.getSigner();
        setAddress(await signer.getAddress());
        setSigner( signer);
        setProvider(provider);

          provider.on("accountsChanged", (accounts) => {
              window.location.reload()
          });

          // Subscribe to chainId change
          provider.on("chainChanged", (chainId) => {
              window.location.reload()
          });
      } catch (e) {
          console.error(error);
          setError(error);
      }
    }
  const sign = async () => {
      if (!provider) return;
      try {
          const signature = await signer.signMessage(message);
          setSignature(signature);
      } catch (error) {
          // console.error(error);
          setError(error);
      }
  }
  const getMessage = async (e) => {
      const msg = e.target.value;
      setMessage(msg);
  }
  const verifyBE = async () => {
      try {
          const requestOptions = {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                  "message": message,
                  "signer": address,
                  "signature": signature
              })
          };
          fetch('http://localhost:9090/verify', requestOptions)
              .then(response => response.json())
              .then(data => {
                  console.log(data)
                  alert(data.message)
              }).catch(error => {
                  throw(error);
          });
      } catch (e) {
          // console.error(error);
          setError(error);
      }
  }
  const verifyFE = async () => {
      try {
      let verified = ethers.utils.verifyMessage(message, signature);
      if (verified === address)
      window.alert("Verified! signed by: " + verified);
      else
          window.alert("verification failed!");
  } catch (e) {
        // console.error(error);
        setError(error);
    }
  }
  return (
    <div className="App">
        <div className="row m-2">
            <div className="col-lg-3"></div>
            <div className="col-lg-6">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        React dAPP
                    </p>
                    <div>
                        <button className="btn btn-light" onClick={ connect}> connect wallet</button> <br/>
                        {address ? (
                            <p className="connected">connected with: {address.substring(0,5).concat("....").concat(address.substring(38,42))}</p>
                        ) : null}
                        <input
                            className="form-control"
                            placeholder="Enter message to be signed"
                            maxLength={40}
                            onChange={getMessage}

                        />
                        {signature ? (
                            <p className="text-break fs-6">
                                SIGNATURE: {signature}
                            </p>
                        ) : null}
                        <button className="btn btn-light" onClick={ sign}> Sign</button>
                        <button className="btn btn-light" onClick={ verifyFE}> Verify on FE</button>
                        <button className="btn btn-light" onClick={ verifyBE}> Verify on BE</button>
                        <br/>
                        {error ? (
                            <a className="error">{`Error: ${error}`}</a>
                        ) : null}
                    </div>

                </header>
            </div>
            <div className="col-lg-3"></div>
        </div>

    </div>
  );
}

export default App;
