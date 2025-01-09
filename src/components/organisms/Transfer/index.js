import React from 'react';

import { transferAlbums } from '../../../services/apis';
import './index.css';

const Transfer = () => {
  const handleTransfer = async () => {
    const result = await transferAlbums();
    console.log(result);
  };

  return (
    <div>
      <h1>Transfer Albums</h1>
      <button onClick={handleTransfer}>Transfer</button>
    </div>
  );
};

export default Transfer;
