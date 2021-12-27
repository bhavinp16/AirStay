import React from 'react';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-dates';
import NProgress from 'nprogress';
import SearchToast from './SearchToast';
import axios from 'axios';
import moment from 'moment';


// import { Redirect } from 'react-router-dom';
// const reactDates = require('react-dates/initialize');
class SearchBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false,
            searchTerm: "",
            kidsCount: 0,
            adultsCount: 0,
            startDate: null,
            endDate: null,
            totaldays: 0,
            focusedInput: null,
            guestsInputBorderFocused: false,
            redirectToSearchIdx: false,
            incrementkids: this.props.childPrice,
            incrementadults: this.props.adultPrice,
            incrementday: 600,
            price: 0,
            dateprice: 0,
            roomid: this.props.roomid,
            capacityadults: this.props.capacityAdults,
            capacitychildren: this.props.capacitychildren,

        };

        this.inputNode = React.createRef();
        this.dropdownNode = React.createRef();
        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.increaseCount = this.increaseCount.bind(this);
        this.decreaseCount = this.decreaseCount.bind(this);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.makeSingleGuestsInputString = this.makeSingleGuestsInputString.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    // componentWillMount() {
    //     document.addEventListener('mousedown', this.handleClick, false)
    // }



    componentDidMount() {
        document.addEventListener('mousedown', this.handleClick, false)
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClick, false)
        // this.props.clearTreehouseState();
    }

    handleClick(e) {
        if (this.dropdownNode.current.contains(e.target)) {
            this.openDropdown();
            return;
        } else if (this.inputNode.current.contains(e.target)) {
            this.toggleDropdown();
        } else {
            this.closeDropdown();
        }
    }

    handleDateUpdate(startdate, enddate) {
        var sd = JSON.stringify(startdate);
        var ed = JSON.stringify(enddate);
        sd = sd.substring(1, 11);
        ed = ed.substring(1, 11);
        var days = Math.floor((Date.parse(ed) - Date.parse(sd)) / 86400000);
        days = days + 1;
        this.state.totaldays = days;
        console.log(days);
        if (enddate != null && startdate != null) {
            if ((this.state.dateprice === (this.state.incrementday * this.state.totaldays)) || (this.state.dateprice === 0)) {
                console.log("11")
                this.state.dateprice = this.state.incrementday * this.state.totaldays
                this.setState({
                    // totaldays: days,
                    // dateprice: this.state.incrementday * this.state.totaldays,
                    price: this.state.price + this.state.dateprice,
                })
                console.log(this.state.price, this.state.dateprice, this.state.totaldays)
            }
            else {
                console.log("22")
                this.setState({
                    // totaldays: days,
                    price: this.state.price - this.state.dateprice + (this.state.incrementday * this.state.totaldays),
                    // dateprice: this.state.incrementday * this.state.totaldays,
                })
                this.state.dateprice = this.state.incrementday * this.state.totaldays
            }
        }

    }

    calculateDateArray(startDate, endDate) {
        let dateArray = [];
        let currentDate = moment(startDate);
        let end = moment(endDate);
        while (currentDate <= end) {
            dateArray.push(currentDate.format('YYYY-MM-DD'));
            currentDate = currentDate.add(1, 'days');
        }
        return dateArray;
    };

    async handleSearchSubmit(e) {
        e.preventDefault();
        let startDate = null;
        let endDate = null;
        if (this.state.startDate && this.state.endDate) {
            startDate = this.state.startDate.format('YYYY/MM/DD');
            endDate = this.state.endDate.format('YYYY/MM/DD');
        }

        var formdata = {
            billingDetails: {
                price: this.state.price,
                duration: this.state.totaldays,
                date: this.calculateDateArray(startDate, endDate),
                adult: this.state.adultsCount,
                children: this.state.kidsCount
            }
        }
        NProgress.start();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('token'),
            }
        };

        try {
            var c = 0;
            if (formdata.billingDetails.price === 0 ||
                (formdata.billingDetails.adult === 0 && formdata.billingDetails.children === 0) ||
                formdata.billingDetails.date === "null null" ||
                formdata.billingDetails.duration === 0) {
                // SearchToast("Empty Field Present", 'error')
                console.log("empty")
                alert("Empty Field Found")
                c = c + 1
                console.log(c)
                // addToast("Empty Field Present", { appearance: 'error', autoDismiss: true, autoDismissTimeout: 1500 });
            }
            if (formdata.billingDetails.adult > this.state.capacityadults) {
                alert(`Adults Capacity execeeded, Max Adult Capacity: ${this.state.capacityadults}`)
                c = c + 1
                console.log(c)
            }
            if (formdata.billingDetails.children > this.state.capacitychildren) {
                alert(`Children Capacity execeeded, Max Children Capacity: ${this.state.capacitychildren}`)
                c = c + 1
                console.log(c)
            }
            if (c === 0) {
                console.log(c, formdata.billingDetails.children, formdata.billingDetails.adult, this.state.capacityadults, this.state.capacitychildren)
                const res = await axios.post(`http://localhost:3000/api/booking/${this.props.id}`, JSON.stringify(formdata), config);
                if (res.status === 200) {
                    alert("Booking Successful");
                }
            }
            // localStorage.setItem('token', res.data.token);
            NProgress.done();
            // addToast("Booking Successful", { appearance: 'success', autoDismiss: true, autoDismissTimeout: 1500 });

        } catch (err) {
            console.log(err);
            alert("Booking Failed")
            NProgress.done();
            // SearchToast("Booking Failed", 'error')
            console.log("errr")
            // addToast("Booking Failed", { appearance: 'error', autoDismiss: true, autoDismissTimeout: 1500 });
        }
        // this.props.fetchTreehouseSearchResults(this.state.searchTerm, startDate, endDate);
        this.setState({ redirectToSearchIdx: true })
    }

    toggleDropdown() {
        this.setState({ dropdownOpen: !this.state.dropdownOpen });
    }

    openDropdown() {
        this.setState({ dropdownOpen: true });
    }

    closeDropdown() {
        this.setState({ dropdownOpen: false });
    }

    toggleGuestsInputBorderColor() {
        this.setState({ guestsInputBorderFocused: !this.state.guestsInputBorderFocused });
    }

    increaseCount(type, type2) {
        // e.stopPropagation();
        let newVal = this.state[type] + 1;
        this.setState({
            [type]: newVal,
            price: this.state.price + this.state[type2]
        })
    }

    decreaseCount(type, type2) {
        // e.stopPropagation();
        let newVal = this.state[type] - 1;

        if (this.state[type] > 0) {
            this.setState({
                [type]: newVal,
                price: this.state.price - this.state[type2]
            })
        }
    }

    makeSingleGuestsInputString(type, stateName) {
        let num = this.state[stateName];
        if (num === 0) return null;
        if (num === 1) {
            return `${num} ${type}`
        } else {
            return `${num} ${type}s`
        }
    };

    render() {

        // Redirect to search index when a search is made
        // if (this.state.redirectToSearchIdx) {
        //     return <Redirect to="/treehouses/search" />
        // }

        // Conditional to toggle color of minus sign on Guests dropdown
        let kidsMinusSignColorClass = (this.state.kidsCount === 0) ? "search-box-minus-circle" : "search-box-plus-circle";
        let adultsMinusSignColorClass = (this.state.adultsCount === 0) ? "search-box-minus-circle" : "search-box-plus-circle";

        // Create Guests input string
        let guestsInputContent = [
            this.makeSingleGuestsInputString("kid", "kidsCount"),
            this.makeSingleGuestsInputString("adult", "adultsCount")
        ].filter(type => type).join(", ");

        // Conditional for the Guests input chevron
        let chevronDirection;
        if (this.state.dropdownOpen) {
            chevronDirection = "fas fa-chevron-up";
        } else {
            chevronDirection = "fas fa-chevron-down";
        }

        // Conditional for guests input container border color class
        let guestsInputBorderColorClass = this.state.guestsInputBorderFocused ? "guests-input-outline-blue" : "";

        const dateRangePicker = (
            <DateRangePicker
                startDate={this.state.startDate}
                startDateId="mm/dd/yyyy"
                endDate={this.state.endDate}
                dateFormat="DD/MM/YYYY"
                endDateId="mm/dd/yyyy"
                onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate }, () => { this.handleDateUpdate(this.state.startDate, this.state.endDate) })}
                focusedInput={this.state.focusedInput}
                onFocusChange={focusedInput => this.setState({ focusedInput })}
                numberOfMonths={1}
            />
        )

        const dropdownMenu = (
            <div className="search-box-dropdown-container">
                <ul>
                    <li>
                        <div className="search-box-dropdown-label">
                            <div>Adults</div>
                            <div>The matured ones</div>
                        </div>
                        <div className="search-box-counter-container">
                            <div
                                className={`${adultsMinusSignColorClass}`}
                                onClick={() => this.decreaseCount("adultsCount", "incrementadults")}>–</div>
                            <div className="search-box-dropdown-counter-num">{this.state.adultsCount}+</div>
                            <div
                                className="search-box-plus-circle"
                                onClick={() => {
                                    this.increaseCount("adultsCount", "incrementadults");
                                }} >+</div>
                        </div>
                    </li>
                    <li>
                        <div className="search-box-dropdown-label">
                            <div>Kids</div>
                            <div>The young at heart</div>
                        </div>
                        <div className="search-box-counter-container">
                            <div
                                className={`${kidsMinusSignColorClass}`}
                                onClick={() => this.decreaseCount("kidsCount", "incrementkids")}>–</div>
                            <div className="search-box-dropdown-counter-num">{this.state.kidsCount}+</div>
                            <div
                                className="search-box-plus-circle"
                                onClick={() => {
                                    this.increaseCount("kidsCount", "incrementkids");
                                }} >+</div>
                        </div>
                    </li>
                </ul>
            </div>
        )

        let dropdownComponent = this.state.dropdownOpen ? dropdownMenu : <></>;

        return (
            <div className="splash-image-container">
                <div className="search-box-container">
                    <div className="search-box-header" style={{ paddingBottom: "4%", }}>
                        <h1>Book your dream destination with us
                            <span style={{ float: "right" }}>
                                Price :  {this.state.price}
                            </span>

                        </h1>
                    </div>
                    <form onSubmit={this.handleSearchSubmit}>
                        <div className="check_-labels-container">
                            <span className="search-box-label checkin-label">
                                CHECK-IN
                            </span>
                            <span className="search-box-label checkout-label">
                                CHECKOUT
                            </span>
                        </div>
                        <div className="check_-inputs-container">
                            {dateRangePicker}
                        </div>
                        <div style={{ paddingBottom: "6%", }}></div>
                        <span className="search-box-label">
                            GUESTS
                        </span>
                        <div
                            id={guestsInputBorderColorClass}
                            className={`search-box-input guests-input-container`}
                            ref={this.inputNode}
                            onFocus={() => this.toggleGuestsInputBorderColor()}
                            onBlur={() => this.toggleGuestsInputBorderColor()}
                            tabIndex="0">
                            <input
                                className="guests-input"
                                type="text"
                                placeholder="Guests"
                                readOnly
                                value={guestsInputContent}
                                onFocus={() => this.toggleGuestsInputBorderColor()}
                                onBlur={() => this.toggleGuestsInputBorderColor()}
                            />
                            <i className={chevronDirection}></i>
                        </div>
                        <div
                            ref={this.dropdownNode}
                        >{dropdownComponent}</div>
                        <div style={{ paddingBottom: "6%", }}></div>
                        <input
                            className="search-box-submit-btn bg-blue-500 hover:bg-blue-700"
                            type="submit"
                            value="Book Now" />
                    </form>
                </div>
            </div >
        )
    }

}

export default SearchBox;