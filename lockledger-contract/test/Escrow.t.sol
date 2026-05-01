//SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "forge-std/Test.sol";
import "../src/Escrow.sol";

contract EscrowTest is Test {
    Escrow escrow;
    address client = vm.addr(1);
    address freelancer = vm.addre(2);

    function setUp() public {
        vm.prank(client);
        escrow = new Escrow{value: 1 ether}(freelancer);
    }

    function testFundRelease() public {
        vm.prank(client);
        escrow.confirmWork();

        assertEq(escrow.state(), Escrow.State.COMPLETED);
        assertEq(freelancer.balance, 1 ether);
    }

    function testOnlyClientCanConfirm() public {
        vm.expectRevert("Not a client");
        vm.prank(freelancer);
        escrow.confirmWork();
    }
}
