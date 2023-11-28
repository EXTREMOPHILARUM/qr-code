import React from 'react';
import QRCode from 'qrcode';
import { signal, effect } from '@preact/signals-react';
import { Button, Input, Table, TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell} from "@nextui-org/react";


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

  const downloadQRCode = (code: string) => {
    const canvas = document.createElement("qr-canvas " + code);
    const qrCode = new QRCode(canvas, code);
    const qrCodeDataURL = qrCode.toDataURL();
    const link = document.createElement('a');
    link.href = qrCodeDataURL;
    link.download = `${code}.png`;
    link.click();
  };

  return (
    <div className="App flex flex-col items-center p-4">
    <h1 className="text-center text-2xl font-bold mb-6">QR Code Generator</h1>
    <div className="flex flex-col md:flex-row justify-center items-center mb-6 w-full md:w-auto">
      <Input
        isClearable={true}
        variant="bordered"
        placeholder="Enter text for QR code"
        value={inputText.value}
        onChange={(e) => inputText.value = e.target.value}
        className="mb-4 md:mb-0 md:mr-4 w-full md:w-auto"
      />
      <Button onClick={addQRCode} className="w-full md:w-auto">Add QR Code</Button>
    </div>
    <h2 className="text-center text-xl font-semibold mb-4">Generated QR Codes</h2>
    <Table
      aria-label="Generated QR Codes"
      className='flex flex-col md:flex-row justify-center items-center mb-6 w-full md:w-auto'
      selectionMode="none"
    >
      <TableHeader>
        <TableColumn>Text</TableColumn>
        <TableColumn>QR Code</TableColumn>
        <TableColumn>Actions</TableColumn>
      </TableHeader>
      <TableBody>
        {qrCodes.value.map((code, index) => (
          <TableRow key={index}>
            <TableCell>{code}</TableCell>
            <TableCell> </TableCell>
            <TableCell>
              <div className="flex justify-center">
                <Button size="sm" color="primary" onClick={() => editQRCode(index)} className="mr-2">
                  Edit
                </Button>
                <Button size="sm" color="danger" onClick={() => deleteQRCode(index)}>
                  Delete
                </Button>
                <Button size="sm" color="success" onClick={() => downloadQRCode(code)}>
                  Download
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
  );
}

export default App;