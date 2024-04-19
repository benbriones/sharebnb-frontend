import { Card, CardBody, CardTitle, CardImg, CardText } from "reactstrap";
import { Link } from 'react-router-dom';
import SharebnbApi from "./api";
import { useState, useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";

/**Booking Card
 *
 * PropertiesList -> PropertyCard
 */




function BookingCard({ bookingId }) {
    console.log("booking id is", bookingId)

   const [property, setProperty] = useState(null);
   const [booking, setBooking] = useState(null)

    useEffect(function fetchPropertyWhenMounted() {
        async function fetchProperty() {
            const booking = await SharebnbApi.getBooking(bookingId)
            console.log("booking response", booking)
            const resp = await SharebnbApi.getProperty(booking.propertyID);
            console.log("property response", resp)
            setProperty(resp);
            setBooking(booking);
        }
        fetchProperty();
    }, []);


    if(!property || !booking) return <LoadingSpinner />;


    console.log("bookingIs***", booking);
    return (
            <Card className="m-3 d-flex"
                style={{ width: "30em" }}>
                <CardBody>
                    <div className='mt-1 text-center'>
                        <Link to={`properties/${booking.propertyID}`} className='text-decoration-none col-md-4'>
                            <CardTitle className='text-capitalize' tag="h5">{property.title}</CardTitle>
                        </Link>
                        <CardText className='fw-bold' >Price: ${property.price}/night</CardText>
                        <CardText className='fw-bold' >Booked From: {booking.startDate} to {booking.endDate}</CardText>
                    </div>
                </CardBody>
            </Card>
    );
}

export default BookingCard;