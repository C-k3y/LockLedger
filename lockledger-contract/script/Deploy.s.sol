// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "forge-std/Script.sol";
import "../src/EscrowFactory.sol";

contract DeployScript is Script {
    function run() external {
        vm.startBroadcast();
        EscrowFactory factory = new EscrowFactory();
        vm.stopBroadcast();
    }
}
