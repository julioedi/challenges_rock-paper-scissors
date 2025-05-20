import React, { Component, HTMLProps } from "react";
import { Icon, selectionType } from "./Icon";

interface CoinProps {
    icon: selectionType,
    clickeable?: boolean,
    computer?: boolean,
    customProps?: HTMLProps<HTMLDivElement>,
    onClick?: (key: selectionType, container: HTMLDivElement | null) => void
    empty?: boolean,
}
export default class extends Component<CoinProps> {
    container: HTMLDivElement | null = null;
    render(): React.ReactNode {

        const { icon, clickeable, empty, computer, customProps } = this.props;
        const inProps = customProps || {} as HTMLProps<HTMLDivElement>;
        const { className, ...props } = inProps;
        if (empty == true) {
            return (
                <div
                    {...props}
                    className={"coin_wrap empty " + icon + (className ? " " + className : "")}
                    ref={ref => {
                        this.container = ref;
                    }}
                >
                    {/* <div className="before" /> */}
                    <div className="title">
                        {computer ? "The House" : "You"} Picked
                    </div>
                    <div className={`coin ` + icon}>
                        {/* <div className="solid bkg" />
                        <div className="solid overlay" /> */}
                        <div className="wrap">
                            {/* <Icon name={icon} /> */}
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <div
                {...props}
                className={"coin_wrap " + icon + (className ? " " + className : "")}
                onClick={() => {
                    if (this.props.onClick) {
                        this.props.onClick(icon, this.container)
                    }
                }}
                ref={ref => {
                    this.container = ref;
                }}
            >
                <div className="before" />
                <div className="title">
                    {computer ? "The House" : "You"} Picked
                </div>
                <div className={`coin ` + icon}>
                    <div className="solid bkg" />
                    <div className="solid overlay" />
                    <div className="wrap">
                        <Icon name={icon} />
                    </div>
                </div>
            </div>
        )
    }
}