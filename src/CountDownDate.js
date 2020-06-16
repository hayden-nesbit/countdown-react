import React, { useState, useEffect } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CountDownDate() {

    let dateData = JSON.parse(localStorage.getItem("endDate"));
    dateData = dateData ? dateData : new Date()
    const [endDate, setEndDate] = useState(new Date(dateData))

    function storeEndDate(props) {
        setEndDate(props)
        localStorage.setItem("endDate", JSON.stringify(props))
    }

    return (
        <div className="form-inline">
            <h3 className="mt-2 mr-3">Countdown until </h3>
            <DatePicker
                onChange={date => storeEndDate(date)}
                placeholderText="Select an end date"
                selected={endDate}
                selectsEnd
                endDate={endDate}
            />
        </div>

    )
}

export default CountDownDate;
