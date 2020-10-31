import React, { Component } from 'react';
import axios from 'axios';
import update from 'immutability-helper';
import Hall from "./hall.component";

function convertTimestamps(timestamp) {
    return new Date(timestamp * 1000) 
        .toString()                   
        .slice(16, -44);
}

export default class Forms extends Component {
    constructor(props) {
        super(props);

        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeDiscount = this.onChangeDiscount.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            title: "",
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber : "",
            time: "",
            timeOptions: [],
            discount: "none",
            price: 0,
            seatValidation: 1,
            arrangement: { // <== Creating basic structure of seat arrangement so app won't crash before reading data from API
                "A": [{ '1': 0 }, { '2': 0 }, { '3': 0 }, { '4': 0 }, { '5': 0 }, { '6': 0 }, { '7': 0 }],
                "B": [{ '1': 0 }, { '2': 0 }, { '3': 0 }, { '4': 0 }, { '5': 0 }, { '6': 0 }, { '7': 0 }, { '8': 0 }],
                "C": [{ '1': 0 }, { '2': 0 }, { '3': 0 }, { '4': 0 }, { '5': 0 }, { '6': 0 }, { '7': 0 }, { '8': 0 }, { '9': 0 }],
                "D": [{ '1': 0 }, { '2': 0 }, { '3': 0 }, { '4': 0 }, { '5': 0 }, { '6': 0 }, { '7': 0 }, { '8': 0 }, { '9': 0 }],
                "E": [{ '1': 0 }, { '2': 0 }, { '3': 0 }, { '4': 0 }, { '5': 0 }, { '6': 0 }, { '7': 0 }, { '8': 0 }, { '9': 0 }],
                "F": [{ '1': 0 }, { '2': 0 }, { '3': 0 }, { '4': 0 }, { '5': 0 }, { '6': 0 }, { '7': 0 }, { '8': 0 }, { '9': 0 }],
                "G": [{ '1': 0 }, { '2': 0 }, { '3': 0 }, { '4': 0 }, { '5': 0 }, { '6': 0 }, { '7': 0 }, { '8': 0 }, { '9': 0 }]             
            }
        }
    }

    componentDidMount() {
        axios.post('http://localhost:5000/movie', {movie: "78483421"} )
            .then((response) => {
                this.setState({
                    title: response.data.title,
                    timeOptions: response.data.sessions.map(convertTimestamps),
                    time: response.data.sessions.map(convertTimestamps)[0],
                    arrangement: response.data.arrangement 
            })
            }, (error) => {
                console.log(error);
            });
    } 

    onChangeFirstName(e) {
        this.setState({
            firstName: e.target.value
        });
    }

    onChangeLastName(e) {
        this.setState({
            lastName: e.target.value
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangePhoneNumber(e) {
        this.setState({
            phoneNumber: e.target.value
        });
    }

    onChangeDate(e) {
        this.setState({
            time: e.target.value
        });
    }

    onChangeDiscount(e) {
        this.setState({
            discount: e.target.value
        });
    }

    onSubmit(e) {
        if (this.state.price !== 0) {
            e.preventDefault();
            const formData = this.state;
            this.props.history.push({
                pathname: '/summary',
                data: formData
            })
        }
        else {
            this.setState({
                seatValidation: 0
            })
        }
    }

    handleClick(row, i) {
        var newArrangement;
        const seatState = this.state.arrangement[row][i - 1][i];
        if (seatState === 2) {
            let updatedRow = this.state.arrangement[row]
            updatedRow[i - 1][i] = 0;

            newArrangement = update(this.state.arrangement, {
                row: { $set: updatedRow }
            });

            this.setState({
                arrangement: newArrangement,
                price: this.state.price - 20
            })
        }
        else if (seatState === 0) {
            let updatedRow = this.state.arrangement[row]
            updatedRow[i - 1][i] = 2;

            newArrangement = update(this.state.arrangement, {
                row: { $set: updatedRow }
            });

            this.setState({
                arrangement: newArrangement,
                price: this.state.price+20
            })
        }
    }

    render() {
        return (
            <div className>
                <h2 className={"title"}>{this.state.title}</h2>
                <form onSubmit={this.onSubmit} action="javascript:void(0);">
                    <h3 className="title">Dane osobowe</h3>

                    <div className="row">
                        <div className="col">
                            <div className="form-group">
                                <label>Imi&#281;: </label>
                                 <input type="text"
                                        required
                                        className="form-control"
                                        value={this.state.firstName}
                                         onChange={this.onChangeFirstName}
                                 />
                            </div>
                        </div>

                        <div className="col">
                            <div className="form-group">
                                <label>Nazwisko: </label>
                                <input type="text"
                                    required
                                    className="form-control"
                                    value={this.state.lastName}
                                    onChange={this.onChangeLastName}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <div className="form-group">
                                <label>Email: </label>
                                <input type="email"
                                    placeholder="example@email.com"
                                    required
                                    className="form-control"
                                    value={this.state.email}
                                    onChange={this.onChangeEmail}
                                />
                            </div>
                        </div>

                        <div className="col">
                            <div className="form-group">
                                <label>Numer telefonu: </label>
                                <input type="tel"
                                    placeholder="123456789"
                                    pattern="[0-9]{9}"
                                    required
                                    className="form-control"
                                    value={this.state.phoneNumber}
                                    onChange={this.onChangePhoneNumber}
                                />
                            </div>
                        </div>
                    </div>

                    <h3 className="title">Opcje seansu</h3>

                    <div className="form-group">
                        <label>Godzina: </label>
                        <select ref="userInput"
                            required
                            className="form-control"
                            value={this.state.time}
                            onChange={this.onChangeDate}>
                            >
                            {
                                this.state.timeOptions.map(function (date) {
                                    return <option
                                        key={date}
                                        value={date}>{date}
                                    </option>;
                                })
                            }
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Zni&#380;ka: </label>
                        <select ref="userInput"
                            required
                            className="form-control"
                            value={this.state.discount}
                            onChange={this.onChangeDiscount}>
                            >
                            <option key="none" value="none">Brak -0%</option>
                            <option key="student" value="student">Zni&#380;ka studencka -10%</option>
                            <option key="child" value="child">Zni&#380;ka dla dzieci -15%</option>
                            <option key="pensioner" value="pensioner">Zni&#380;ka dla emeryt&oacute;w -20%</option>                       
                        </select>
                    </div>
     
                    <h3 className="title">Wyb&oacute;r miejsc</h3>

                    <Hall arrangement={this.state.arrangement} onClick={(row, i) => this.handleClick(row, i)} />
                    <p hidden={this.state.seatValidation} style={{ color: "red", textAlign: "center" }}>Wybierz miejsce!</p>
                    <br /><br />
                    <div class="row">
                        <div className="form-group col text-center">
                            <input type="submit" value="Podsumowanie" className="btn btn-dark btn-lg"/>
                        </div>
                    </div>

                </form>
            </div>
        )
    }
}
