import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert";
import Calendar from "react-calendar";
import SharebnbApi from "./api";
import { Form, FormGroup } from "reactstrap";
import userContext from "./userContext";
import './calendar.css';

/** Form for making a new booking
 *
 * Props:
 * - propertyId
 *
 * State:
 * - formData
 * - errors: array of error messages
 *
 * PropertyDetail -> BookingForm -> Alert
 */

function BookingForm({ propertyId }) {

    const { currUser } = useContext(userContext);
    const guestUsername = currUser.username;

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [alerts, setAlerts] = useState({
        messages: [],
        type: "danger"
    });
    const navigate = useNavigate();

    console.log("***STARTDATE", startDate);
    console.log("***ENDDATE", endDate);
    console.log("***ALERTS", alerts);

    /** handles form submission */
    async function handleSubmit(evt) {
        evt.preventDefault();
        setAlerts({ messages: [], type: "danger" });
        if ((startDate > endDate) || (startDate < Date.now)) {
            setAlerts({ messages: ["Invalid check in or check out date."], type: "danger" });
        } else {
            try {
                await SharebnbApi.createBooking({ propertyId, guestUsername, startDate, endDate });
                navigate(`/properties/${propertyId}`);
                setAlerts({ messages: [`Booked from ${startDate} to ${endDate}.`], type: "success" });
            }
            catch (err) {
                setAlerts({ messages: [...err], type: "danger" });
            }
        }
    }

    /** handles input change */
    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(d => ({
            ...d,
            [name]: value,
        }));
    }

    return (
        <div className="BookingForm text-center container col-lg-4 mt-4">
            <h2 className="text-dark mb-2">Make New Booking</h2>
            <div className="card">
                <div className="card-body">
                    <form
                        className="BookingForm" onSubmit={handleSubmit}>
                        <Calendar className="startDate"
                            value={startDate}
                            onChange={setStartDate}
                            required />
                        <Calendar className="endDate"
                            value={endDate}
                            onChange={setEndDate}
                            required />
                        {alerts.messages.length > 0 &&
                            <Alert messages={alerts.messages} type={alerts.type} />}
                        <div className="d-grid">
                            <button
                                type='submit'
                                className='btn btn-primary'>Book</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default BookingForm;