import "./App.css";
import React, { useCallback, useState, useRef } from "react";
import { toHex, fromHex } from "./utils";
import { toChecksumAddress } from "./utils/checksum";

function App(): JSX.Element {
  const [hexAddress, setHexAddress] = useState<string>("");
  const [tronAddress, setTronAddress] = useState<string>("");

  const tronInput = useRef<HTMLInputElement>(null);
  const hexInput = useRef<HTMLInputElement>(null);

  const convertTronToHex = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        const input = tronInput.current?.value ?? "";
        if (input) {
          const convertedHex = toChecksumAddress(toHex(input).substring(2));
          setHexAddress(convertedHex);
        }
      } catch (err) {
        // eslint-disable-next-line no-alert -- simple demo error handling
        alert(err);
      }
    },
    []
  );

  const convertHexToTron = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        const input = hexInput.current?.value ?? "";
        if (input) {
          const convertedTron = fromHex(input);
          setTronAddress(convertedTron);
        }
      } catch (err) {
        // eslint-disable-next-line no-alert -- simple demo error handling
        alert(err);
      }
    },
    []
  );

  return (
    <div className="App">
      <header>Tron Converter</header>
      <div className="InputSection">
        <form onSubmit={convertTronToHex}>
          <h2>Tron =&gt; Hex</h2>
          <label htmlFor="tron-address">Enter Tron address</label>
          <input
            id="tron-address"
            className="InputField"
            type="text"
            ref={tronInput}
          />
          <input className="InputButton" type="submit" value="Convert" />
          <p className="ConversionResult">
            Hex address: <strong>{hexAddress}</strong>
          </p>
        </form>
      </div>

      <hr />

      <div className="InputSection">
        <form onSubmit={convertHexToTron}>
          <h2>Hex =&gt; Tron</h2>
          <label htmlFor="hex-address">Enter Hex address</label>
          <input
            id="hex-address"
            className="InputField"
            type="text"
            ref={hexInput}
          />
          <input className="InputButton" type="submit" value="Convert" />
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

      <div className="Footer">
        <p>
          View source on{" "}
          <a
            href="https://github.com/BriungRi/tron-converter"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </p>
      </div>
    </div>
  );
}

export default App;
