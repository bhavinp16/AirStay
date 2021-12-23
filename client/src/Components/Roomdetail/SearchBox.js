import React from 'react';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-dates';
// import { Redirect } from 'react-router-dom';
// const reactDates = require('react-dates/initialize');

class SearchBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false,
            searchTerm: "",
            kidsCount: 0,
            petsCount: 0,
            parentsCount: 0,
            adultsCount: 0,
            startDate: null,
            endDate: null,
            totaldays: 0,
            focusedInput: null,
            guestsInputBorderFocused: false,
            redirectToSearchIdx: false,
            incrementkids: 100,
            incrementold: 150,
            incrementpets: 200,
            incrementadults: 300,
            incrementday: 600,
            price: 0,
            dateprice: 0
        };

        this.inputNode = React.createRef();
        this.dropdownNode = React.createRef();
        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.increaseCount = this.increaseCount.bind(this);
        this.decreaseCount = this.decreaseCount.bind(this);
        this.handleSearchUpdate = this.handleSearchUpdate.bind(this);
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

    handleSearchUpdate() {
        return (e) => {
            this.setState({
                searchTerm: e.currentTarget.value
            });
        };
    }

    handleDateUpdate(startdate,enddate) {
        var sd = JSON.stringify(startdate);
        var ed = JSON.stringify(enddate);
        sd = sd.substring(1, 11);
        ed = ed.substring(1, 11);
        var days = Math.floor((Date.parse(ed) - Date.parse(sd)) / 86400000);
        days = days + 1;
        this.state.totaldays = days;
        console.log(days);
        if(enddate!=null && startdate!=null){
            if ((this.state.dateprice == (this.state.incrementday * this.state.totaldays)) || (this.state.dateprice == 0)){
                console.log("11")
                this.state.dateprice = this.state.incrementday * this.state.totaldays
                this.setState({
                    // totaldays: days,
                    // dateprice: this.state.incrementday * this.state.totaldays,
                    price: this.state.price + this.state.dateprice,
                    // console.log(this.state[type2],this.state.price)
                })
                console.log(this.state.price,this.state.dateprice, this.state.totaldays)
            }
            else{
                console.log("22")
                this.setState({
                    // totaldays: days,
                    price: this.state.price - this.state.dateprice + (this.state.incrementday * this.state.totaldays),
                    // dateprice: this.state.incrementday * this.state.totaldays, 
                    // console.log(this.state[type2],this.state.price)
                })
                this.state.dateprice = this.state.incrementday * this.state.totaldays
            }
        }
        
    }

    handleSearchSubmit(e) {
        e.preventDefault();
        let startDate = null;
        let endDate = null;
        if (this.state.startDate && this.state.endDate) {
            startDate = this.state.startDate.format('YYYY/MM/DD');
            endDate = this.state.endDate.format('YYYY/MM/DD');
        }
        this.props.fetchTreehouseSearchResults(this.state.searchTerm, startDate, endDate);
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
        // console.log(this.state.startDate,this.state.endDate);
        this.setState({
            [type]: newVal,
            price: this.state.price + this.state[type2]
            
            // console.log(this.state[type2],this.state.price)
        })
        // console.log("Increase");
    }

    decreaseCount(type, type2) {
        // e.stopPropagation();
        let newVal = this.state[type] - 1;
        
        if (this.state[type] > 0) {
            this.setState({
                [type]: newVal,
                price: this.state.price - this.state[type2]
                // console.log(this.state[type2],this.state.price)
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
        let petsMinusSignColorClass = (this.state.petsCount === 0) ? "search-box-minus-circle" : "search-box-plus-circle";
        let parentsMinusSignColorClass = (this.state.parentsCount === 0) ? "search-box-minus-circle" : "search-box-plus-circle";
        let adultsMinusSignColorClass = (this.state.adultsCount === 0) ? "search-box-minus-circle" : "search-box-plus-circle";

        // Create Guests input string
        let guestsInputContent = [
            this.makeSingleGuestsInputString("kid", "kidsCount"),
            this.makeSingleGuestsInputString("pet", "petsCount"),
            this.makeSingleGuestsInputString("parent", "parentsCount"),
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
                onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate }, ()=>{this.handleDateUpdate(this.state.startDate,this.state.endDate)})}
                focusedInput={this.state.focusedInput}
                onFocusChange={focusedInput => this.setState({ focusedInput })}
                numberOfMonths={1}
                // onChange={this.handleDateUpdate()}
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
                    <li>
                        <div className="search-box-dropdown-label">
                            <div>Pets</div>
                            <div>Dogs, capybaras, etc.</div>
                        </div>
                        <div className="search-box-counter-container">
                            <div
                                className={`${petsMinusSignColorClass}`}
                                onClick={() => this.decreaseCount("petsCount", "incrementpets")}>–</div>
                            <div className="search-box-dropdown-counter-num">{this.state.petsCount}+</div>
                            <div
                                className="search-box-plus-circle"
                                onClick={() => this.increaseCount("petsCount", "incrementpets")} >+</div>
                        </div>
                    </li>
                    <li>
                        <div className="search-box-dropdown-label">
                            <div>Parents</div>
                            <div>Old people</div>
                        </div>
                        <div className="search-box-counter-container">
                            <div
                                className={`${parentsMinusSignColorClass}`}
                                onClick={() => this.decreaseCount("parentsCount", "incrementold")}>–</div>
                            <div className="search-box-dropdown-counter-num">{this.state.parentsCount}+</div>
                            <div
                                className="search-box-plus-circle"
                                onClick={() => this.increaseCount("parentsCount", "incrementold")}>+</div>
                        </div>
                    </li>
                </ul>
            </div>
        )

        let dropdownComponent = this.state.dropdownOpen ? dropdownMenu : <></>;

        return (
            <div className="splash-image-container">
                <div className="search-box-container">
                    <div className="search-box-header">
                        <h1>Book your dream destination with us
                            <span style={{float:"right"}}>
                            Price :  {this.state.price}
                            </span>
                            
                        </h1>
                    </div>

                    <form onSubmit={this.handleSearchSubmit}>
                        <span className="search-box-label">
                            WHERE
                        </span>
                        <input
                            className="search-box-input"
                            type="text"
                            placeholder="Anywhere"
                            onChange={this.handleSearchUpdate()}
                            value={this.state.searchTerm} />
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

                        <input
                            className="search-box-submit-btn"
                            type="submit"
                            value="Search" />
                    </form>
                </div>
            </div >
        )
    }

}

export default SearchBox;