// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PharmaceuticalSupplyChain {
    // Enum for user roles
    enum Role { Admin, Supplier, Manufacturer, Transporter, LogisticWarehouse, Distributor, PharmacyWarehouse, LogisticEmployee, Inspector }

    // Struct for a product
    struct Product {
        uint productId;
        string name;
        uint quantity;
        address currentOwner;
    }

    // Struct for shipment details
    struct Shipment {
        uint shipmentId;
        uint productId;
        string origin;
        string destination;
        string departureDate;
        string expectedArrivalDate;
    }

    // Struct for transfer details
    struct TransferDetail {
        string from;
        string to;
        string date;
    }

    // Struct for a user
    struct User {
        address userAddress;
        Role role;
    }

    // Mappings
    mapping(uint => Product) public products;
    mapping(uint => Shipment) public shipments;
    mapping(address => User) public users;
    mapping(uint => TransferDetail[]) public transferHistories; // Mapping for transfer history of products

    // Counters for product and shipment IDs
    uint public productCounter;
    uint public shipmentCounter;

    // Modifiers
    modifier onlyAdmin() {
        require(users[msg.sender].role == Role.Admin, "Only admin can perform this action");
        _;
    }

    modifier onlySupplier() {
        require(users[msg.sender].role == Role.Supplier, "Only supplier can perform this action");
        _;
    }

    modifier onlyLogisticEmployee() {
        require(users[msg.sender].role == Role.LogisticEmployee, "Only logistic employee can perform this action");
        _;
    }

    modifier onlyInspector() {
        require(users[msg.sender].role == Role.Inspector, "Only inspector can perform this action");
        _;
    }

    modifier onlyAuthorized(uint productId) {
        require(
            users[msg.sender].role == Role.Admin ||
            users[msg.sender].role == Role.Inspector ||
            products[productId].currentOwner == msg.sender,
            "Not authorized"
        );
        _;
    }

    constructor() {
        // Initializing the contract deployer as Admin
        users[msg.sender] = User(msg.sender, Role.Admin);
    }

    // Function to add a new user
    function addUser(address _userAddress, Role _role) public onlyAdmin {
        users[_userAddress] = User(_userAddress, _role);
    }

    // Function to add a new product
    function addProduct(string memory _name, uint _quantity) public onlySupplier {
        productCounter++;
        products[productCounter] = Product(productCounter, _name, _quantity, msg.sender);
    }

    // Function to add a new shipment
    function addShipment(uint _productId, string memory _origin, string memory _destination, string memory _departureDate, string memory _expectedArrivalDate) public onlyLogisticEmployee {
        shipmentCounter++;
        shipments[shipmentCounter] = Shipment(shipmentCounter, _productId, _origin, _destination, _departureDate, _expectedArrivalDate);
        products[_productId].currentOwner = msg.sender;
        transferHistories[_productId].push(TransferDetail(_origin, _destination, _departureDate));
    }

    // Function to update product details
    function updateProduct(uint _productId, uint _quantity) public onlyAuthorized(_productId) {
        products[_productId].quantity = _quantity;
    }

    // Function to query product details
    function getProduct(uint _productId) public view returns (Product memory) {
        return products[_productId];
    }

    // Function to query shipment details
    function getShipment(uint _shipmentId) public view returns (Shipment memory) {
        return shipments[_shipmentId];
    }

    // Function to query transfer history
    function getTransferHistory(uint _productId) public view returns (TransferDetail[] memory) {
        return transferHistories[_productId];
    }
}
