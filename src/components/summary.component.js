import React, { Component } from 'react';
import update from 'immutability-helper';
import Hall from "./hall.component";

export default class Summary extends Component {
    constructor(props) {
        super(props);

        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeDiscount = this.onChangeDiscount.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleEditPersonalData = this.handleEditPersonalData.bind(this);
        this.handleEditFilmOptions = this.handleEditFilmOptions.bind(this);
        this.handleEditSeatChoice = this.handleEditSeatChoice.bind(this);

        this.state = {
            title: "",
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            time: "",
            timeOptions: [],
            discount: "",
            price: 0,
            seatValidation: true,
            arrangement: {  // <== Creating basic structure of seat arrangement so app won't crash before reading data from props.location
                "A": [{ '1': 0 }, { '2': 0 }, { '3': 0 }, { '4': 0 }, { '5': 0 }, { '6': 0 }, { '7': 0 }],
                "B": [{ '1': 0 }, { '2': 0 }, { '3': 0 }, { '4': 0 }, { '5': 0 }, { '6': 0 }, { '7': 0 }, { '8': 0 }],
                "C": [{ '1': 0 }, { '2': 0 }, { '3': 0 }, { '4': 0 }, { '5': 0 }, { '6': 0 }, { '7': 0 }, { '8': 0 }, { '9': 0 }],
                "D": [{ '1': 0 }, { '2': 0 }, { '3': 0 }, { '4': 0 }, { '5': 0 }, { '6': 0 }, { '7': 0 }, { '8': 0 }, { '9': 0 }],
                "E": [{ '1': 0 }, { '2': 0 }, { '3': 0 }, { '4': 0 }, { '5': 0 }, { '6': 0 }, { '7': 0 }, { '8': 0 }, { '9': 0 }],
                "F": [{ '1': 0 }, { '2': 0 }, { '3': 0 }, { '4': 0 }, { '5': 0 }, { '6': 0 }, { '7': 0 }, { '8': 0 }, { '9': 0 }],
                "G": [{ '1': 0 }, { '2': 0 }, { '3': 0 }, { '4': 0 }, { '5': 0 }, { '6': 0 }, { '7': 0 }, { '8': 0 }, { '9': 0 }]
            },
            personalDataReadOnly: true,
            filmOptionsReadOnly: true,
            seatChoiceReadOnly: true
        }
    }

    componentDidMount() {
        const { data } = this.props.location
        this.setState({
            title: data.title,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phoneNumber: data.phoneNumber,
            time: data.time,
            timeOptions: data.timeOptions,
            discount: data.discount,
            price: data.price,
            arrangement: data.arrangement
        }) 
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

    handleClick(row, i) {
        var newArrangement;
        const seatState = this.state.arrangement[row][i - 1][i];
        if (seatState === 2 && !this.state.seatChoiceReadOnly) {
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
        else if (seatState === 0 && !this.state.seatChoiceReadOnly) {
            let updatedRow = this.state.arrangement[row]
            updatedRow[i - 1][i] = 2;

            newArrangement = update(this.state.arrangement, {
                row: { $set: updatedRow }
            });

            this.setState({
                arrangement: newArrangement,
                price: this.state.price + 20
            })
        }
    }

    handleEditPersonalData(e) {
        this.setState({
            personalDataReadOnly: !this.state.personalDataReadOnly
        })
    }

    handleEditFilmOptions(e) {
        this.setState({
            filmOptionsReadOnly: !this.state.filmOptionsReadOnly
        })
    }

    handleEditSeatChoice(e) {
        if (this.state.seatChoiceReadOnly === false && this.state.price === 0) {
            this.setState({
                seatValidation: false
            })
        }
        else {
            this.setState({
                seatChoiceReadOnly: !this.state.seatChoiceReadOnly,
                seatValidation: true
            })
        }
    }

    render() {
        var price;
        if (this.state.discount === "child") 
            price = this.state.price * 85 / 100
        else if (this.state.discount === "student")
            price = this.state.price * 90 / 100
        else if(this.state.discount === "pensioner")
            price = this.state.price * 85 / 100
        else if (this.state.discount === "none")
            price = this.state.price
        
        return (
            <div className>
                <h2 className={"title"}>Podsumowanie</h2>
                <div className="row">                    
                    <div className="col">
                        <form action="javascript:void(0);" onSubmit={this.handleEditPersonalData}>
                            <div className="form-container">

                                <h3 className="title">Dane osobowe</h3>
                                
                                <div className="form-group row">
                                    <label className="col-sm-2 col-form-label">Imi&#281;: </label>
                                    <div className="col-sm-10">
                                        <input type="text"
                                            required
                                            className="form-control"
                                            value={this.state.firstName}
                                            onChange={this.onChangeFirstName}
                                            readOnly={this.state.personalDataReadOnly}
                                            />
                                    </div>
                                </div>
                        
                                <div className="form-group row">
                                    <label className="col-sm-2 col-form-label">Nazwisko: </label>
                                    <div className="col-sm-10">
                                        <input type="text"
                                            required
                                            className="form-control"
                                            value={this.state.lastName}
                                            onChange={this.onChangeLastName}
                                            readOnly={this.state.personalDataReadOnly}
                                        />
                                    </div>
                                </div>
                     
                                <div className="form-group row">
                                    <label className="col-sm-2 col-form-label">Email: </label>
                                    <div className="col-sm-10">
                                        <input type="email"
                                            placeholder="example@email.com"
                                            required
                                            className="form-control"
                                            value={this.state.email}
                                            onChange={this.onChangeEmail}
                                            readOnly={this.state.personalDataReadOnly}
                                        />
                                    </div>
                                </div>
                 
                                <div className="form-group row">
                                    <label className="col-sm-2 col-form-label">Telefon: </label>
                                    <div className="col-sm-10">
                                        <input type="tel"
                                            placeholder="123456789"
                                            pattern="[0-9]{9}"
                                            required
                                            className="form-control"
                                            value={this.state.phoneNumber}
                                            onChange={this.onChangePhoneNumber}
                                            readOnly={this.state.personalDataReadOnly}
                                        />
                                    </div>
                                </div>

                                <div class="row">
                                    <div className="form-group col text-center">
                                        <button
                                            type="submit"
                                            className="btn btn-dark"
                                            >
                                            {this.state.personalDataReadOnly ? "Edytuj" : "Zapisz zmiany"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    
                    
                    <div className="col">
                        <form action="javascript:void(0);" onSubmit={this.handleEditFilmOptions}>
                            <div className="form-container">
                                <h3 className="title">Opcje seansu</h3>
                                <div className="form-group row">
                                    <label className="col-sm-2 col-form-label">Godzina: </label>
                                    <div className="col-sm-10">
                                        <select ref="userInput"
                                            required
                                            className="form-control"
                                            value={this.state.time}
                                            onChange={this.onChangeDate}
                                            disabled={this.state.filmOptionsReadOnly}>
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
                                </div>

                                <div className="form-group row">
                                    <label className="col-sm-2 col-form-label">Zni&#380;ka: </label>
                                    <div className="col-sm-10">
                                        <select ref="userInput"
                                            required
                                            className="form-control"
                                            value={this.state.discount}
                                            onChange={this.onChangeDiscount}
                                            disabled={this.state.filmOptionsReadOnly}>
                                            <option key="none" value="none">Brak -0%</option>
                                            <option key="student" value="student">Zni&#380;ka studencka -10%</option>
                                            <option key="child" value="child">Zni&#380;ka dla dzieci -15%</option>
                                            <option key="pensioner" value="pensioner">Zni&#380;ka dla emeryt&oacute;w -20%</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="row">
                                    <div className="form-group col text-center">
                                        <button
                                            type="submit"
                                            className="btn btn-dark"
                                            >
                                            {this.state.filmOptionsReadOnly ? "Edytuj" : "Zapisz zmiany"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>                   
                </div>
                
                <div className="row">
                    <div className="col"></div>
                    <div className="col">
                        <h3 className="title">Wyb&oacute;r miejsc</h3>                     
                        <Hall arrangement={this.state.arrangement} onClick={(row, i) => this.handleClick(row, i)} />
                        <p hidden={this.state.seatValidation} style={{color: "red", textAlign: "center"}}>Wybierz miejsce!</p>
                        <br />
                        <div class="row">
                            <div className="form-group col text-center">
                                <button
                                    type="button"
                                    className="btn btn-dark"
                                    onClick={this.handleEditSeatChoice}>
                                    {this.state.seatChoiceReadOnly ? "Edytuj" : "Zapisz zmiany"}
                                </button>
                            </div>
                        </div>
                    </div>         
                </div>

                {/* THESE BUTTONS DOESN'T DO ANYTHING!!! */}
                <div class="row">
                    <div className="form-group col text-center">
                        <div className="btn-group mr-2">
                            <button type="button" className="btn btn-dark btn-lg">Rezerwuj</button>
                        </div>
                        <div className="btn-group mr-2">
                            <button type="button" className="btn btn-dark btn-lg">Kup ({price}zl)</button>
                        </div>
                    </div>
                </div>  
            </div>
        )
    }
}
