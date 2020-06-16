import React, { useState, useEffect } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './CountDownDate.css'

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
            Timer(interval)
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    function refresh() {
        window.location.reload()
    }


    function Timer(interval) {

        let diff = endDate.getTime() - new Date().getTime()
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

        if (diff < 0) {
            clearInterval(interval)
            localStorage.clear()
        }

        setDateObj({
            diff: diff,
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
        item = dateObj.diff < 0 ? <div className="text-danger">0</div> : item

        let text = index === 0 ? "Years" :
            index === 1 ? "Months" :
                index === 2 ? "Days" :
                    index === 3 ? "Hours" :
                        index === 4 ? "Minutes" :
                            index === 5 ? "Seconds" : null

        return (
            <div id="card" key={index} className="card text-center mb-3">
                <div className="card-header">
                    <b>{text}</b>
                </div>
                <div className="card-body">
                    <h1 className="display-1">{item}</h1>
                </div>
            </div>
        )
    })


    return (
        <>
            <div id="num" className="container text-left">
                <div className="row">
                    {showDigit}
                </div>
            </div>
            <h3 className="mt-2 mr-3">Countdown until: </h3>
            <div>
                <DatePicker
                    onChange={date => storeEndDate(date)}
                    placeholderText="Select an end date"
                    selected={endDate}
                    selectsEnd
                    endDate={endDate}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="time"
                    dateFormat="MMMM d, yyyy h:mm aa"
                />
            </div>
            <button onClick={refresh} className="btn btn-success btn-sm mt-3">Start timer</button>
        </>

    )
}

export default CountDownDate;
