import React, { useState, useEffect } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CountDownDate() {

    let dateData = JSON.parse(localStorage.getItem("endDate"));
    dateData = dateData ? dateData : new Date()
    const [endDate, setEndDate] = useState(new Date(dateData))
    const [dateObj, setDateObj] = useState({})

    function storeEndDate(props) {
        setEndDate(props)
        localStorage.setItem("endDate", JSON.stringify(props))
    }


    useEffect(() => {
        const interval = setInterval(() => {
            Timer()
        }, 1000);
        return () => clearInterval(interval)
    }, []);


    function Timer() {

        let yrs = endDate.getFullYear() - new Date().getFullYear()
        let mos = endDate.getMonth() - new Date().getMonth()
        let days = endDate.getDate() - new Date().getDate()
        let hrs = endDate.getHours() - new Date().getHours()
        let min = endDate.getMinutes() - new Date().getMinutes()
        let sec = endDate.getSeconds() - new Date().getSeconds()

        if (sec < 0) {
            min = min - 1
            sec = sec + 60
        }
        if (min < 0) {
            hrs = hrs - 1;
            min = min + 60;
        }
        if (hrs < 0) {
            days = days - 1;
            hrs = hrs + 24;
        }
        if (days < 0) {
            mos = mos - 1;
            let CurrentDaysInMonth = (endDate.getMonth(), (endDate.getFullYear(), 0), new Date().getDate());
            days = days + CurrentDaysInMonth;
        }
        if (mos < 0) {
            yrs = yrs - 1;
            mos = mos + 12;
        }

        setDateObj({
            yrs: yrs,
            mos: mos,
            days: days,
            hrs: hrs,
            min: min,
            sec: sec
        })

    }

    let digits = [dateObj.yrs, dateObj.mos, dateObj.days, dateObj.hrs, dateObj.min, dateObj.sec]
    let showDigit = digits.map((item, index) => {
        return (
            <div key={index} className="col-2">
                <h1 className="display-1">{item}:</h1>
            </div>
        )
    })

    let text = ["years", "months", "days", "hours", "minutes", "seconds"]
    let showText = text.map((item, index) => {
        return (
            <div key={index} className="col-2">
                <h5>{item}</h5>
            </div>
        )
    })

    return (
        <>
            <div className="form-inline text-center">
                <h3 className="mt-2 mr-3">Countdown until </h3>
                <DatePicker
                    onChange={date => storeEndDate(date)}
                    placeholderText="Select an end date"
                    selected={endDate}
                    selectsEnd
                    endDate={endDate}
                />
            </div>
            <div id="num" className="container text-left">
                <div className="row">
                    {showDigit}
                </div>
                <div className="row">
                    {showText}
                </div>
            </div>
        </>

    )
}

export default CountDownDate;
