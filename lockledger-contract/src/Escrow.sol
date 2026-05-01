//SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract Escrow is ReentrancyGuard {
    enum State {
        AWAITING_PAYMENT,
        IN_PROGRESS,
        COMPLETED,
        DISPUTED
    }

    address public immutable client;
    address public immutable freelancer;
    uint256 public immutable amount;
    State public state;

    constructor(address _freelancer) payable {
        client = msg.sender;
        freelancer = _freelancer;
        amount = msg.value;
    }

    function confirmWork() external onlyClient nonReentrant {
        state = State.COMPLETED;
        payable(freelancer).transfer(amount);
    }

    modifier onlyClient() {
        require(msg.sender == client, "Not a client");
        _;
    }
}
