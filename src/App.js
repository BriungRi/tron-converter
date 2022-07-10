import "./App.css";
import { useCallback, useState, useRef } from "react";
import { toHex, fromHex } from "./utils";
import { utils as ethersUtils } from "ethers";

function App() {
  const [hexAddress, setHexAddress] = useState("");
  const [tronAddress, setTronAddress] = useState("");

  const tronInput = useRef(null);
  const hexInput = useRef(null);

  const convertTronToHex = useCallback((e) => {
    try {
      const input = tronInput.current.value;
      if (input) {
        const convertedHex = ethersUtils.getAddress(toHex(input).substring(2));
        setHexAddress(convertedHex);
      }
    } catch (e) {
      alert(e);
    }
    e.preventDefault();
  }, []);
  const convertHexToTron = useCallback((e) => {
    try {
      const input = hexInput.current.value;
      if (input) {
        const convertedTron = fromHex(input);
        setTronAddress(convertedTron);
      }
    } catch (e) {
      alert(e);
    }
    e.preventDefault();
  }, []);

  return (
    <div className="App">
      <header>Tron Converter</header>
      <div className="InputSection">
        {" "}
        <form onSubmit={convertTronToHex}>
          <h2>Tron ={">"} Hex</h2>
          <label>Enter Tron address</label>
          <input className="InputField" type="text" ref={tronInput} />
          <input className="InputButton" type="submit" name="Convert" />
          <p className="ConversionResult">
            Hex address: <strong>{hexAddress}</strong>
          </p>
        </form>
      </div>

      <hr />

      <div className="InputSection">
        <form onSubmit={convertHexToTron}>
          <h2>Hex ={">"} Tron</h2>
          <label>Enter Hex address</label>
          <input className="InputField" type="text" ref={hexInput} />
          <input className="InputButton" type="submit" name="Convert" />
          <p className="ConversionResult">
            Tron address: <strong>{tronAddress} </strong>
            {tronAddress !== "" && (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://tronscan.org/#/address/${tronAddress}`}
              >
                View on Tronscan
              </a>
            )}
          </p>
        </form>
      </div>

      <hr />

      <div>
        <p>
          View source on{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/briungri/tron-converter"
          >
            Github
          </a>
        </p>
      </div>
    </div>
  );
}

export default App;
