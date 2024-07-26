import React, { useState } from 'react';
import web3 from '../utils/web3';
import contract from '../utils/contract';

function AddProduct() {
  const [name, setName] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [quantity, setQuantity] = useState('');
  const [currentLocation, setCurrentLocation] = useState(0);

  const addProduct = async () => {
    const accounts = await web3.eth.getAccounts();
    await contract.methods.addProduct(name, manufacturer, quantity, currentLocation).send({ from: accounts[0] });
  };

  return (
    <div>
      <h2>Add Product</h2>
      <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input type="text" placeholder="Manufacturer" value={manufacturer} onChange={e => setManufacturer(e.target.value)} />
      <input type="number" placeholder="Quantity" value={quantity} onChange={e => setQuantity(e.target.value)} />
      <input type="number" placeholder="Current Location" value={currentLocation} onChange={e => setCurrentLocation(e.target.value)} />
      <button onClick={addProduct}>Add Product</button>
    </div>
  );
}

export default AddProduct;
