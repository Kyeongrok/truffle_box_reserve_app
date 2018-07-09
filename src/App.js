import React from 'react'
import TemaToken from '../build/contracts/TemaToken.json'
import TemaTokenMarket from '../build/contracts/TemaTokenMarket.json'
import Reservation from '../build/contracts/Reservation.json'
import getWeb3 from './utils/getWeb3'

import RoomBox from './components/RoomBox';
import RoomListBox from './components/RoomListBox';
import ReserveListBox from './components/ReserveListBox';
import AccountListBox from './components/AccountListBox';

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            storageValue: 0,
            web3: null,
            "defaultAccount":"",
            "reservationInstance": null
        }

        this.handleChangeDefaultAccount = this.handleChangeDefaultAccount


    }

    componentWillMount() {
        // Get network provider and web3 instance.
        // See utils/getWeb3 for more info.

        getWeb3
            .then(results => {
                this.setState({
                    web3: results.web3
                })

                // Instantiate contract once web3 provided.
                this.instantiateContract()
            })
            .catch(() => {
                console.log('Error finding web3.')
            })
    }

    instantiateContract() {
        const contract = require('truffle-contract')
        const temaToken = contract(TemaToken);
        const temaTokenMarket = contract(TemaTokenMarket);
        const reservation = contract(Reservation);
        temaTokenMarket.setProvider(this.state.web3.currentProvider);
        temaToken.setProvider(this.state.web3.currentProvider);
        reservation.setProvider(this.state.web3.currentProvider);

        let defaultAccount = this.state.web3.eth.accounts[0];
        // this.state.web3.eth.defaultAccount = defaultAccount;

        console.log(defaultAccount);

        let gas = this.state.web3
        //.getBlock("pending").gasLimit
        console.log("gas:",gas);
        // // var reservationInstance = reservation.deployed();
        // reservationInstance.registRoom("hello", 100, "http");

        reservation.deployed().then(instance=>{
           //instance.registRoom("hello", 100, "http");
        });


        // Get accounts.
        // this.temaTokenInstance = temaToken.deployed();
        // this.temaTokenMarketInstance = temaTokenMarket.deployed();

        // if (await this.temaTokenInstance.owner() !== this.temaTokenMarketInstance.address) {
        //     console.log(this.temaTokenMarketInstance.address);
        //     this.temaTokenInstance.transferOwnership(this.temaTokenMarketInstance.address);
        // }
        //

        // // this.temaTokenInstance.balanceOf(defaultAccount)
        // //     .then(balance=>console.log("bal:",balance));
        //
        // var roomList = await this.getRoomList();
        // this.setState({
        //     roomList1: roomList,
        //     "defaultAccount":defaultAccount,
        //     "reservationInstance": reservationInstance
        // })

    }

    // rooms
    async registRoom(title, pricePerDay) {
        await this.reservationInstance.registRoom(title, pricePerDay, {gas: 300000});
        this.setState({"hello":"nello"});
        this.render();
    }

    async getRoomList() {
        var roomCount = await this.reservationInstance.roomCount().then(r => r.toNumber());
        var roomList = [];
        for(var i = 0; i < roomCount; i++) {
            var room = this.state.reservationInstance.roomByIndex(i);
            roomList.push(room);
        }
        console.log(roomList);
        this.setState({
            roomList1: roomList
        });
    }

    async getRoomForHost(host) {
        return await this.reservationInstance.rooms(host);
    }

    // reservation
    async makeReservation(host, from, duration) {
        await this.reservationInstance.reserve(host, from, duration, {gas: 300000});
        const reservation = await this.getReservationForGuest(this.state.web3.eth.defaultAccount);
        const totalPrice = reservation[3];
        await this.temaTokenInstance.approve(this.reservationInstance.address, totalPrice, {gas: 300000});
    }

    async getReservationForGuest(guest) {
        const reservation = await this.reservationInstance.reserves(guest);
        return reservation;
    }

    async checkout(comment, grade) {
        await this.reservationInstance.checkout(comment, grade);
    }


    async claim(from, comment, grader) {
        await this.reservationInstance.claim(from, comment, grader);
    }

    // token
    async getBalance(address) {
        return await this.temaTokenInstance.balanceOf(address);
    }

    async buyToken(address, pay) {
        return await this.temaTokenMarketInstance.sendTransaction({gas: 300000, value: pay});
    }

    handleChangeDefaultAccount(account){

    }
    render() {
        let accounts = [];
        if(this.state.web3 !=null){
            accounts = this.state.web3.eth.accounts;
            console.log(accounts);
        }

        return (
            <div className="App">
                <nav className="navbar pure-menu pure-menu-horizontal">
                    <a href="#" className="pure-menu-heading pure-menu-link">Tema 토큰</a>
                </nav>

                <main className="container">
                    <div className="pure-g">
                        <div className="pure-u-1-1">
                            <h1>Tema Token!</h1>
                            <p>테마 토큰 호텔 예약 D앱 입니다.</p>
                            <AccountListBox handleChangeDefaultAccount={this.handleChangeDefaultAccount} accountList={accounts}/>
                            <h3>방목록 보기</h3>
                            <RoomListBox roomList={this.state.roomList1} name="hello"/>
                            <RoomBox reservationInstance={this.state.reservationInstance}/>

                            <h3>예약 목록 보기</h3>
                            <ReserveListBox roomList={this.state.roomList1} name="hello"/>


                        </div>
                    </div>
                </main>
            </div>
        );
    }
}

export default App
