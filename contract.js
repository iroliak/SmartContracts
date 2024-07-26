import web3 from './web3';
import contractData from './PharmaceuticalSupplyChain.json';
const address = '0x3400515BD46DF97abd0F865EBB1a52B7F22eCF66'; 

const abi = [
    [
        {
          "inputs": [],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "inputs": [],
          "name": "productCounter",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "constant": true
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "products",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "productId",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "manufacturer",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "quantity",
              "type": "uint256"
            },
            {
              "internalType": "enum PharmaceuticalSupplyChain.Participant",
              "name": "currentLocation",
              "type": "uint8"
            },
            {
              "internalType": "address",
              "name": "owner",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "constant": true
        },
        {
          "inputs": [],
          "name": "shipmentCounter",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "constant": true
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "shipments",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "shipmentId",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "productId",
              "type": "uint256"
            },
            {
              "internalType": "enum PharmaceuticalSupplyChain.Participant",
              "name": "origin",
              "type": "uint8"
            },
            {
              "internalType": "enum PharmaceuticalSupplyChain.Participant",
              "name": "destination",
              "type": "uint8"
            },
            {
              "internalType": "string",
              "name": "departureDate",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "expectedArrivalDate",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "constant": true
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "name": "users",
          "outputs": [
            {
              "internalType": "address",
              "name": "userAddress",
              "type": "address"
            },
            {
              "internalType": "enum PharmaceuticalSupplyChain.Role",
              "name": "role",
              "type": "uint8"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "constant": true
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_userAddress",
              "type": "address"
            },
            {
              "internalType": "enum PharmaceuticalSupplyChain.Role",
              "name": "_role",
              "type": "uint8"
            }
          ],
          "name": "addUser",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "_name",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "_manufacturer",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "_quantity",
              "type": "uint256"
            },
            {
              "internalType": "enum PharmaceuticalSupplyChain.Participant",
              "name": "_currentLocation",
              "type": "uint8"
            }
          ],
          "name": "addProduct",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_productId",
              "type": "uint256"
            },
            {
              "internalType": "enum PharmaceuticalSupplyChain.Participant",
              "name": "_origin",
              "type": "uint8"
            },
            {
              "internalType": "enum PharmaceuticalSupplyChain.Participant",
              "name": "_destination",
              "type": "uint8"
            },
            {
              "internalType": "string",
              "name": "_departureDate",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "_expectedArrivalDate",
              "type": "string"
            }
          ],
          "name": "addShipment",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_productId",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "_quantity",
              "type": "uint256"
            },
            {
              "internalType": "enum PharmaceuticalSupplyChain.Participant",
              "name": "_currentLocation",
              "type": "uint8"
            }
          ],
          "name": "updateProduct",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_productId",
              "type": "uint256"
            }
          ],
          "name": "getProduct",
          "outputs": [
            {
              "components": [
                {
                  "internalType": "uint256",
                  "name": "productId",
                  "type": "uint256"
                },
                {
                  "internalType": "string",
                  "name": "name",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "manufacturer",
                  "type": "string"
                },
                {
                  "internalType": "uint256",
                  "name": "quantity",
                  "type": "uint256"
                },
                {
                  "internalType": "enum PharmaceuticalSupplyChain.Participant",
                  "name": "currentLocation",
                  "type": "uint8"
                },
                {
                  "internalType": "address",
                  "name": "owner",
                  "type": "address"
                }
              ],
              "internalType": "struct PharmaceuticalSupplyChain.Product",
              "name": "",
              "type": "tuple"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "constant": true
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_shipmentId",
              "type": "uint256"
            }
          ],
          "name": "getShipment",
          "outputs": [
            {
              "components": [
                {
                  "internalType": "uint256",
                  "name": "shipmentId",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "productId",
                  "type": "uint256"
                },
                {
                  "internalType": "enum PharmaceuticalSupplyChain.Participant",
                  "name": "origin",
                  "type": "uint8"
                },
                {
                  "internalType": "enum PharmaceuticalSupplyChain.Participant",
                  "name": "destination",
                  "type": "uint8"
                },
                {
                  "internalType": "string",
                  "name": "departureDate",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "expectedArrivalDate",
                  "type": "string"
                }
              ],
              "internalType": "struct PharmaceuticalSupplyChain.Shipment",
              "name": "",
              "type": "tuple"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "constant": true
        }
      ],
];

const contract = new web3.eth.Contract(abi, address);

export default contract;
