import { useState, useEffect, useContext } from 'react';
import userContext from './userContext';
import BookingCard from './BookingCard';
/** User bookings page
 *
 *
 */

function UserBookings ()  {

    const { currUser } = useContext(userContext)
    const bookings = currUser.bookings
    // {properties.data.map((p) => <PropertyCard key={p.id} property={p} />)}

    return (

        <div>
            {bookings.map((bookingId) => <BookingCard bookingId={bookingId} />)}
        </div>


    )
}
export default UserBookings;