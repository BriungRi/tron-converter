import './App.css';
import React, { useCallback, useState, useRef } from 'react';
import type { JSX } from 'react';
import { toHex, fromHex } from './utils';
import { toChecksumAddress } from './utils/checksum';

interface ConversionResult {
  input: string;
  output?: string;
  error?: string;
}

function App(): JSX.Element {
  const [hexResults, setHexResults] = useState<ConversionResult[]>([]);
  const [tronResults, setTronResults] = useState<ConversionResult[]>([]);
  const [hexCopyStatus, setHexCopyStatus] = useState<
    'idle' | 'copied' | 'error'
  >('idle');
  const [tronCopyStatus, setTronCopyStatus] = useState<
    'idle' | 'copied' | 'error'
  >('idle');

  const tronInput = useRef<HTMLTextAreaElement>(null);
  const hexInput = useRef<HTMLTextAreaElement>(null);

  const copyToClipboard = useCallback(
    (
      results: ConversionResult[],
      setStatus: (status: 'idle' | 'copied' | 'error') => void
    ) => {
      const successfulResults = results
        .filter((result) => result.output)
        .map((result) => result.output)
        .join('\n');

      if (successfulResults) {
        navigator.clipboard
          .writeText(successfulResults)
          .then(() => {
            setStatus('copied');
            // Reset status after 2 seconds
            setTimeout(() => setStatus('idle'), 2000);
          })
          .catch(() => {
            setStatus('error');
            // Reset status after 3 seconds for error
            setTimeout(() => setStatus('idle'), 3000);
          });
      }
    },
    []
  );

  const convertTronToHex = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        const input = tronInput.current?.value ?? '';
        if (input.trim()) {
          // Split by newlines and filter out empty lines
          const addresses = input
            .split('\n')
            .map((addr) => addr.trim())
            .filter((addr) => addr.length > 0);

          const results: ConversionResult[] = addresses.map((address) => {
            try {
              const convertedHex = toChecksumAddress(
                toHex(address).substring(2)
              );
              return { input: address, output: convertedHex };
            } catch (err) {
              return {
                input: address,
                error: err instanceof Error ? err.message : String(err),
              };
            }
          });

          setHexResults(results);
        }
      } catch (err) {
        alert(err);
      }
    },
    []
  );

  const convertHexToTron = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        const input = hexInput.current?.value ?? '';
        if (input.trim()) {
          // Split by newlines and filter out empty lines
          const addresses = input
            .split('\n')
            .map((addr) => addr.trim())
            .filter((addr) => addr.length > 0);

          const results: ConversionResult[] = addresses.map((address) => {
            try {
              const convertedTron = fromHex(address);
              return { input: address, output: convertedTron };
            } catch (err) {
              return {
                input: address,
                error: err instanceof Error ? err.message : String(err),
              };
            }
          });

          setTronResults(results);
        }
      } catch (err) {
        alert(err);
      }
    },
    []
  );

  const getCopyButtonText = (status: 'idle' | 'copied' | 'error') => {
    switch (status) {
      case 'copied':
        return '✓ Copied!';
      case 'error':
        return '✗ Failed';
      default:
        return 'Copy All';
    }
  };

  const getCopyButtonStyle = (status: 'idle' | 'copied' | 'error') => {
    const baseStyle = {
      padding: '4px 8px',
      fontSize: '0.8em',
      border: '1px solid #ccc',
      borderRadius: '4px',
      cursor: 'pointer',
      minWidth: '70px',
      transition: 'all 0.2s ease',
    };

    switch (status) {
      case 'copied':
        return {
          ...baseStyle,
          backgroundColor: '#d4edda',
          borderColor: '#c3e6cb',
          color: '#155724',
        };
      case 'error':
        return {
          ...baseStyle,
          backgroundColor: '#f8d7da',
          borderColor: '#f5c6cb',
          color: '#721c24',
        };
      default:
        return { ...baseStyle, backgroundColor: '#f0f0f0' };
    }
  };

  const renderConversionStats = (results: ConversionResult[]) => {
    const successCount = results.filter((r) => r.output).length;
    const errorCount = results.filter((r) => r.error).length;

    return (
      <h3 style={{ fontSize: '1.1em', margin: '0.5em 0', color: '#333' }}>
        Converted addresses:{' '}
        <span style={{ color: '#28a745', fontWeight: 'bold' }}>
          {successCount} successful
        </span>
        {errorCount > 0 && (
          <>
            {', '}
            <span style={{ color: '#dc3545', fontWeight: 'bold' }}>
              {errorCount} errors
            </span>
          </>
        )}
      </h3>
    );
  };

  return (
    <div className="App">
      <header>Tron Converter</header>
      <div className="InputSection">
        <form onSubmit={convertTronToHex}>
          <h2>Tron =&gt; Hex</h2>
          <textarea
            id="tron-address"
            className="InputField"
            rows={10}
            ref={tronInput}
            placeholder="Enter one or more Tron addresses. For multiple addresses, enter each address on a new line."
            aria-label="Enter Tron address"
          />
          <input className="InputButton" type="submit" value="Convert" />
          <div className="ConversionResult">
            {hexResults.length > 0 && (
              <>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  {renderConversionStats(hexResults)}
                  {hexResults.some((r) => r.output) && (
                    <button
                      type="button"
                      onClick={() =>
                        copyToClipboard(hexResults, setHexCopyStatus)
                      }
                      style={getCopyButtonStyle(hexCopyStatus)}
                      disabled={hexCopyStatus !== 'idle'}
                    >
                      {getCopyButtonText(hexCopyStatus)}
                    </button>
                  )}
                </div>
                <div
                  style={{
                    maxHeight: '160px',
                    overflowY: 'auto',
                    border: '1px solid #eee',
                    padding: '10px',
                    borderRadius: '4px',
                  }}
                >
                  {hexResults.map((result, index) => (
                    <div key={index} style={{ marginBottom: '4px' }}>
                      {result.output ? (
                        <div>{result.output}</div>
                      ) : (
                        <div style={{ color: 'red' }}>
                          <em>Error converting &quot;{result.input}&quot;:</em>{' '}
                          {result.error}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </form>
      </div>

      <hr />

      <div className="InputSection">
        <form onSubmit={convertHexToTron}>
          <h2>Hex =&gt; Tron</h2>
          <textarea
            id="hex-address"
            className="InputField"
            rows={10}
            ref={hexInput}
            placeholder="Enter one or more Hex addresses. For multiple addresses, enter each address on a new line."
            aria-label="Enter Hex address"
          />
          <input className="InputButton" type="submit" value="Convert" />
          <div className="ConversionResult">
            {tronResults.length > 0 && (
              <>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  {renderConversionStats(tronResults)}
                  {tronResults.some((r) => r.output) && (
                    <button
                      type="button"
                      onClick={() =>
                        copyToClipboard(tronResults, setTronCopyStatus)
                      }
                      style={getCopyButtonStyle(tronCopyStatus)}
                      disabled={tronCopyStatus !== 'idle'}
                    >
                      {getCopyButtonText(tronCopyStatus)}
                    </button>
                  )}
                </div>
                <div
                  style={{
                    maxHeight: '160px',
                    overflowY: 'auto',
                    border: '1px solid #eee',
                    padding: '10px',
                    borderRadius: '4px',
                  }}
                >
                  {tronResults.map((result, index) => (
                    <div key={index} style={{ marginBottom: '4px' }}>
                      {result.output ? (
                        <div>
                          {result.output}{' '}
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={`https://tronscan.org/#/address/${result.output}`}
                          >
                            (View on Tronscan)
                          </a>
                        </div>
                      ) : (
                        <div style={{ color: 'red' }}>
                          <em>Error converting &quot;{result.input}&quot;:</em>{' '}
                          {result.error}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </form>
      </div>

      <div className="Footer">
        <p>
          <a href="/blog/">Learn about TRON address formats</a>
          &middot;
          <a
            href="https://github.com/BriungRi/tron-converter"
            target="_blank"
            rel="noopener noreferrer"
          >
            View source on GitHub
          </a>
        </p>
      </div>
    </div>
  );
}

export default App;
