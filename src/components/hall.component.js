import React, { Component } from 'react';

class Seat extends Component {
    render() {
        const color = this.props.seatState === 0 ?
            "rgb(180,180,180)" : this.props.seatState === 1 ?
                "rgb(255,0,0)" : "rgb(30,250,30)";

        return (
            <div>
                <button
                    type="button"
                    onClick={this.props.onClick}
                    className="seat"
                    style={{backgroundColor: color}}></button>
            </div>
        )
    }
};


export default class Hall extends Component {

    renderSeat(row, i) {
        return <Seat key={row + i}
                 seatState={this.props.arrangement[row][i - 1][i]}
                 onClick={() => this.props.onClick(row, i)}/>   
    }

    render() {
        return (
            <div>
                <div className="hall-row-7">
                    {this.renderSeat("A", 1)}
                    {this.renderSeat("A", 2)}
                    {this.renderSeat("A", 3)}
                    {this.renderSeat("A", 4)}
                    {this.renderSeat("A", 5)}
                    {this.renderSeat("A", 6)}
                    {this.renderSeat("A", 7)}
                </div>
                <div className="hall-row-8">
                    {this.renderSeat("B", 1)}
                    {this.renderSeat("B", 2)}
                    {this.renderSeat("B", 3)}
                    {this.renderSeat("B", 4)}
                    {this.renderSeat("B", 5)}
                    {this.renderSeat("B", 6)}
                    {this.renderSeat("B", 7)}
                    {this.renderSeat("B", 8)}
                </div>
                <div className="hall-row-9">
                    {this.renderSeat("C", 1)}
                    {this.renderSeat("C", 2)}
                    {this.renderSeat("C", 3)}
                    {this.renderSeat("C", 4)}
                    {this.renderSeat("C", 5)}
                    {this.renderSeat("C", 6)}
                    {this.renderSeat("C", 7)}
                    {this.renderSeat("C", 8)}
                    {this.renderSeat("C", 9)}
                </div>
                <div className="hall-row-9">
                    {this.renderSeat("D", 1)}
                    {this.renderSeat("D", 2)}
                    {this.renderSeat("D", 3)}
                    {this.renderSeat("D", 4)}
                    {this.renderSeat("D", 5)}
                    {this.renderSeat("D", 6)}
                    {this.renderSeat("D", 7)}
                    {this.renderSeat("D", 8)}
                    {this.renderSeat("D", 9)}
                </div>
                <div className="hall-row-9">
                    {this.renderSeat("E", 1)}
                    {this.renderSeat("E", 2)}
                    {this.renderSeat("E", 3)}
                    {this.renderSeat("E", 4)}
                    {this.renderSeat("E", 5)}
                    {this.renderSeat("E", 6)}
                    {this.renderSeat("E", 7)}
                    {this.renderSeat("E", 8)}
                    {this.renderSeat("E", 9)}
                </div>
                <div className="hall-row-9">
                    {this.renderSeat("F", 1)}
                    {this.renderSeat("F", 2)}
                    {this.renderSeat("F", 3)}
                    {this.renderSeat("F", 4)}
                    {this.renderSeat("F", 5)}
                    {this.renderSeat("F", 6)}
                    {this.renderSeat("F", 7)}
                    {this.renderSeat("F", 8)}
                    {this.renderSeat("F", 9)}
                </div>
                <div className="hall-row-9">
                    {this.renderSeat("G", 1)}
                    {this.renderSeat("G", 2)}
                    {this.renderSeat("G", 3)}
                    {this.renderSeat("G", 4)}
                    {this.renderSeat("G", 5)}
                    {this.renderSeat("G", 6)}
                    {this.renderSeat("G", 7)}
                    {this.renderSeat("G", 8)}
                    {this.renderSeat("G", 9)}
                </div>
            </div>
        )
    };
}