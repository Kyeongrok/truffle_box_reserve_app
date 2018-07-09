import React from "react";

class RoomListBox extends React.Component {

    render() {
        let list = [];
        if(this.props.roomList != null){
            list = this.props.roomList;
        }

        return(
            <table>
                <thead>
                    <tr>
                        <th>
                            방이름
                        </th>
                        <th>
                            방가격
                        </th>
                        <th>
                            account
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((arItem)=><RoomItem key={arItem[0]} room={arItem}/>)}
                </tbody>
            </table>
        )
    }
}

function RoomItem(props) {

    const price = props.room[2].toNumber();
    return (
        <tr>
            <td>
                {props.room[1]}
            </td>
            <td>
                {price}
            </td>
            <td>
                {props.room[0]}
            </td>
        </tr>

    )
}

export default RoomListBox