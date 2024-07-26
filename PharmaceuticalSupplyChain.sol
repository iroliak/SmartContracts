// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PharmaceuticalSupplyChain {
    // Enum for user roles
    enum Role { Admin, Supplier, LogisticEmployee, Inspector }

    // Enum for supply chain participants
    enum Participant { Supplier, Transporter, Manufacturer, LogisticWarehouse, Distributor, PharmaWarehouse }

    // Struct for a product
    struct Product {
        uint productId;
        string name;
        string manufacturer;
        uint quantity;
        Participant currentLocation;
        address owner;
    }

    // Struct for shipment details
    struct Shipment {
        uint shipmentId;
        uint productId;
        Participant origin;
        Participant destination;
        string departureDate;
        string expectedArrivalDate;
    }

    // Struct for a user
    struct User {
        address userAddress;
        Role role;
    }

    // Mapping for products and shipments
    mapping(uint => Product) public products;
    mapping(uint => Shipment) public shipments;

    // Mapping for users
    mapping(address => User) public users;

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
            products[productId].owner == msg.sender,
            "Not authorized"
        );
        _;
    }

    modifier onlyViewableByRole(uint productId, Role role) {
        require(
            (role == Role.Supplier && products[productId].currentLocation <= Participant.Manufacturer) ||
            (role == Role.LogisticEmployee && products[productId].currentLocation <= Participant.LogisticWarehouse) ||
            (role == Role.Inspector) ||
            (role == Role.Admin),
            "Access not permitted"
        );
        _;
    }

    constructor() {
        // Initializing the contract deployer as Admin
        users[msg.sender] = User(msg.sender, Role.Admin);

        // Pre-creating 10 products and their corresponding shipment details for demonstration
        for (uint i = 1; i <= 10; i++) {
            addProductInternal(
                string(abi.encodePacked("Product", uint2str(i))),
                "Manufacturer",
                100 + i,
                Participant.Supplier,
                msg.sender
            );
            addShipmentInternal(i, Participant.Supplier, Participant.Transporter, "2024-01-01", "2024-01-05");
        }
    }

    // Internal function to add a new product (used for initial setup)
    function addProductInternal(
        string memory _name,
        string memory _manufacturer,
        uint _quantity,
        Participant _currentLocation,
        address _owner
    ) internal {
        productCounter++;
        products[productCounter] = Product(productCounter, _name, _manufacturer, _quantity, _currentLocation, _owner);
    }

    // Internal function to add a new shipment (used for initial setup)
    function addShipmentInternal(
        uint _productId,
        Participant _origin,
        Participant _destination,
        string memory _departureDate,
        string memory _expectedArrivalDate
    ) internal {
        shipmentCounter++;
        shipments[shipmentCounter] = Shipment(shipmentCounter, _productId, _origin, _destination, _departureDate, _expectedArrivalDate);
        products[_productId].currentLocation = _destination;
    }

    // Function to add a new user
    function addUser(address _userAddress, Role _role) public onlyAdmin {
        users[_userAddress] = User(_userAddress, _role);
    }

    // Function to add a new product
    function addProduct(
        string memory _name,
        string memory _manufacturer,
        uint _quantity,
        Participant _currentLocation
    ) public onlySupplier {
        productCounter++;
        products[productCounter] = Product(productCounter, _name, _manufacturer, _quantity, _currentLocation, msg.sender);
    }

    // Function to add a new shipment
    function addShipment(
        uint _productId,
        Participant _origin,
        Participant _destination,
        string memory _departureDate,
        string memory _expectedArrivalDate
    ) public onlyLogisticEmployee {
        shipmentCounter++;
        shipments[shipmentCounter] = Shipment(shipmentCounter, _productId, _origin, _destination, _departureDate, _expectedArrivalDate);
        products[_productId].currentLocation = _destination;
    }

    // Function to update product details
    function updateProduct(
        uint _productId,
        uint _quantity,
        Participant _currentLocation
    ) public onlyAuthorized(_productId) {
        products[_productId].quantity = _quantity;
        products[_productId].currentLocation = _currentLocation;
    }

    // Function to query product details based on role
    function getProduct(uint _productId) public view onlyViewableByRole(_productId, users[msg.sender].role) returns (Product memory) {
        return products[_productId];
    }

    // Function to query shipment details
    function getShipment(uint _shipmentId) public view returns (Shipment memory) {
        return shipments[_shipmentId];
    }

    // Helper function to convert uint to string
    function uint2str(uint _i) internal pure returns (string memory) {
        if (_i == 0) {
            return "0";
        }
        uint j = _i;
        uint len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint k = len;
        while (_i != 0) {
            k = k - 1;
            uint8 temp = (48 + uint8(_i - _i / 10 * 10));
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            _i /= 10;
        }
        return string(bstr);
    }
}
