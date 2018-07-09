/* eslint-disable no-undef */
const Room = artifacts.require("./Room.sol");
const Reservation = artifacts.require("./Reservation.sol");
const TemaToken = artifacts.require("./TemaToken.sol");

contract('Reservation', (accounts) => {
    it("reserve", () => {
        return Reservation.deployed().then(instance => {
            return instance.registRoom("room-1", 100, "http://www.google.com").then(() => {

                instance.roomCount().then(count => console.log("roomCount:",count));
                return instance.myAccount().then(addr => {

                    return TemaToken.deployed().then(tema => {
                        tema.mint(addr, 100000);
                        return instance.reserve(addr, "7-5", 2).then(() => {
                            return instance.reserves(addr).then(item=>{
                                console.log(item);
                                assert.equal('7-5', item[1]);
                                assert.equal(200, item[3]);
                            })
                        });
                    });

                });
            });

        });
    });



});
