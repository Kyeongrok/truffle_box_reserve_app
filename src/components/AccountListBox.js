import React from "react";

class AccountListBox extends React.Component {
    handleChange(event){
        this.props.handleChangeDefaultAccount(event.target.value);
    }
    render() {
        let list = [];
        if(this.props.accountList != null){
            list = this.props.accountList;
        }
        return(
            <select onChange={this.handleChange.bind(this)}>
                {list.map((arItem)=><option key={arItem}>{arItem}</option>)}
            </select>
        )
    }
}

export default AccountListBox