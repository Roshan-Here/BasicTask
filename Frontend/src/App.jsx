import React, { useState } from 'react';
import CryptoJS from 'crypto-js';

function App() {
  const [message, setMessage] = useState('');
  const [encryptedMessage, setEncryptedMessage] = useState('');
  const [decryptedMessage, setDecryptedMessage] = useState('');

  const key = import.meta.env.VITE_CRYPTO_KEY; // Replace 'yourSecretKey' with your actual secret key

  const encryptMessage = () => {
    const iv = CryptoJS.lib.WordArray.random(16); // Generate a random 16-byte IV
    const encrypted = CryptoJS.AES.encrypt(message, key, { iv: iv }).toString();
    console.log(encrypted)
    setEncryptedMessage(encrypted);
  };

  const decryptMessage = () => {
    const decrypted = CryptoJS.AES.decrypt(encryptedMessage, key).toString(CryptoJS.enc.Utf8);
    console.log(decrypted)
    setDecryptedMessage(decrypted);
  };

  return (
    <div className='flex flex-col justify-center items-center'>
      <input
        type="text"
        className='input input-bordered w-full max-w-xs'
        placeholder="Enter your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button className='m-3 btn bg-gray-500' onClick={encryptMessage}>Encrypt</button>
      <button className='m-3 btn bg-slate-800' onClick={decryptMessage}>Decrypt</button>

      <div className='m-3'>
        <h2 >Encrypted Message:</h2>
        <p>{encryptedMessage}</p>
      </div>

      <div className='m-3'>
        <h2>Decrypted Message:</h2>
        <p>{decryptedMessage}</p>
      </div>
    </div>
  );
}

export default App;
