import React from "react";

class RoomBox extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            "roomName":"",
            "roomPrice":0
        }
    }
    hello(){
        this.props.reservationInstance.registRoom(
            this.state.roomName, this.state.roomPrice, "hello")
    }
    handleChangeName(event){
        this.setState({roomName: event.target.value});
    }
    handleChangePrice(event){
        this.setState({roomPrice: event.target.value});
    }
    render() {
        return(
            <div>
                방이름:<input type="text" name="name" value={this.state.roomName} onChange={this.handleChangeName.bind(this)}/>
                방가격:<input type="text" name="name" value={this.state.roomPrice} onChange={this.handleChangePrice.bind(this)}/>
                <button onClick={()=>this.hello()}>방만들기</button>
            </div>
        )
    }
}

export default RoomBox