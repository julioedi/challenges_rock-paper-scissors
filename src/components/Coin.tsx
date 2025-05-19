import React, { Component } from "react";
import { Icon, selectionType } from "./Icon";

interface CoinProps {
    icon: selectionType,
    onClick?:(key:selectionType) => void
}
export default class extends Component<CoinProps> {
    render(): React.ReactNode {
        return (
            <div className={"coin_wrap " + this.props.icon} onClick={() =>{
                if (this.props.onClick) {
                    this.props.onClick(this.props.icon)
                }
            }}>
                <div className="before"/>
                <div className={`coin ` + this.props.icon}>
                    <div className="solid bkg" />
                    <div className="solid overlay" />
                    <div className="wrap">
                        <Icon name={this.props.icon} />
                    </div>
                </div>
            </div>
        )
    }
}