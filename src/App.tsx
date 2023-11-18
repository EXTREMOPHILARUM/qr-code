import QRCode from 'react-qr-code';
import { signal, effect } from '@preact/signals-react';

const inputText = signal('');
const qrCodes = signal<string[]>([]);
let isInitialized = false;

effect(() => {
  if (!isInitialized) {
    const storedQRCodes = localStorage.getItem('qrCodes');
    console.log('storedQRCodes', storedQRCodes);
    if (storedQRCodes) {
      qrCodes.value = JSON.parse(storedQRCodes);
      console.log('qrCodes.value', qrCodes.value);
    }
    isInitialized = true;
    console.log('isInitialized', isInitialized);
  }
  else {
    localStorage.setItem('qrCodes', JSON.stringify(qrCodes.value));
    console.log('initialized qrCodes.value ', qrCodes.value);
  }
});

function App() {
  const addQRCode = () => {
    if (inputText.value) {
      qrCodes.value = [...qrCodes.value, inputText.value];
      inputText.value = '';
    }
  };

  const editQRCode = (index: number) => {
    const newText = prompt('Enter new text for QR code');
    if (newText) {
      qrCodes.value = qrCodes.value.map((code, i) => (i === index ? newText : code));
    }
  };

  const deleteQRCode = (index: number) => {
    qrCodes.value = qrCodes.value.filter((_, i) => i !== index);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    inputText.value = e.currentTarget.value;
  };

  return (
    <div className="App">
      <h1>QR Code Generator</h1>
      <input
        type="text"
        placeholder="Enter text for QR code"
        value={inputText.value}
        onChange={handleInputChange}
      />
      <button onClick={addQRCode}>Add QR Code</button>
      <div>
        <h2>Generated QR Codes</h2>
        <table>
          <thead>
            <tr>
              <th>Text</th>
              <th>QR Code</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {qrCodes.value.map((code, index) => (
              <tr key={index}>
                <td>{code}</td>
                <td><QRCode value={code} /></td>
                <td>
                  <button onClick={() => editQRCode(index)}>Edit</button>
                  <button onClick={() => deleteQRCode(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;