pragma solidity ^0.5.3;

/**
 * @title SafeMath
 * @dev Unsigned math operations with safety checks that revert on error
 */
library SafeMath {
    /**
     * @dev Multiplies two unsigned integers, reverts on overflow.
     */
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        // Gas optimization: this is cheaper than requiring 'a' not being zero, but the
        // benefit is lost if 'b' is also tested.
        // See: https://github.com/OpenZeppelin/openzeppelin-solidity/pull/522
        if (a == 0) {
            return 0;
        }

        uint256 c = a * b;
        require(c / a == b);

        return c;
    }

    /**
     * @dev Integer division of two unsigned integers truncating the quotient, reverts on division by zero.
     */
    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        // Solidity only automatically asserts when dividing by 0
        require(b > 0);
        uint256 c = a / b;
        // assert(a == b * c + a % b); // There is no case in which this doesn't hold

        return c;
    }

    /**
     * @dev Subtracts two unsigned integers, reverts on overflow (i.e. if subtrahend is greater than minuend).
     */
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b <= a);
        uint256 c = a - b;

        return c;
    }

    /**
     * @dev Adds two unsigned integers, reverts on overflow.
     */
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a);

        return c;
    }

    /**
     * @dev Divides two unsigned integers and returns the remainder (unsigned integer modulo),
     * reverts when dividing by zero.
     */
    function mod(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b != 0);
        return a % b;
    }
}

contract MultiSigWallet {
    
    using SafeMath for uint256;
    
    mapping(address => bool) owners;
    uint256 public count;
    
    bool public proposal = false;
    address payable public proposalAddr;
    uint public proposalAmount;
    uint public proposalId;
    uint public proposalVouts;
    
    mapping(address => uint) pool;
    
    modifier isOwner(){
        require (owners[msg.sender] == true);
        _;
    }
    
    modifier isPasive(){
        require (proposal == false);
        _;
    }
    
    modifier isActive(){
        require (proposal == true);
        _;
    }
    
    constructor () public{
        owners[msg.sender] = true;
        count = count.add(1);
    }
    
    function addOwner(address own) public isOwner {
        owners[own] = true;
        count = count.add(1);
    }
    
    function deposite() public payable { }
    
    function balance() public view returns(uint){
        return address(this).balance;
    }
    
    function createProposal(address payable to, uint val)  public isPasive isOwner{
        proposal = true;
        proposalAddr = to;
        proposalAmount = val;
        proposalId = proposalId.add(1);
        proposalVouts = 0;
    }
    
    function rejectProposal() public isActive isOwner{
        proposal = false;
    }
    
    
    function signProposal() public isActive isOwner {
        require (pool[msg.sender] != proposalId);
        pool[msg.sender] = proposalId;
        proposalVouts = proposalVouts.add(1);
        if (proposalVouts == count){
            proposalAddr.transfer(proposalAmount);
            proposal = false;
        }
    }
}

contract MultiSigWalletFactory {

    function create() public returns (address wallet)
    {
        MultiSigWallet wallet = new MultiSigWallet();
        return address(wallet);
    }
}
