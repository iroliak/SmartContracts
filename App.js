import React, { useEffect, useState } from 'react';
import web3 from './utils/web3';
import contract from './utils/contract';

function App() {
  const [account, setAccount] = useState('');
  const [products, setProducts] = useState([]);
  const [shipments, setShipments] = useState([]);

  useEffect(() => {
    async function loadBlockchainData() {
      try {
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
        console.log('Accounts:', accounts);

        console.log('Contract Methods:', contract.methods);

        const productCounter = await contract.methods.productCounter().call();
        console.log('Product Counter:', productCounter);

        const loadedProducts = [];
        for (let i = 1; i <= productCounter; i++) {
          const product = await contract.methods.products(i).call();
          console.log('Product:', product);
          loadedProducts.push(product);
        }
        setProducts(loadedProducts);

        const shipmentCounter = await contract.methods.shipmentCounter().call();
        console.log('Shipment Counter:', shipmentCounter);

        const loadedShipments = [];
        for (let i = 1; i <= shipmentCounter; i++) {
          const shipment = await contract.methods.shipments(i).call();
          console.log('Shipment:', shipment);
          loadedShipments.push(shipment);
        }
        setShipments(loadedShipments);
      } catch (error) {
        console.error('Error loading blockchain data:', error);
      }
    }

    loadBlockchainData();
  }, []);

  return (
    <div>
      <h1>Pharmaceutical Supply Chain</h1>
      <p>Account: {account}</p>
      <h2>Products</h2>
      <ul>
        {products.map(product => (
          <li key={product.productId}>
            {product.name} - {product.quantity} units at {product.currentLocation}
          </li>
        ))}
      </ul>
      <h2>Shipments</h2>
      <ul>
        {shipments.map(shipment => (
          <li key={shipment.shipmentId}>
            Product ID: {shipment.productId}, from {shipment.origin} to {shipment.destination}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
