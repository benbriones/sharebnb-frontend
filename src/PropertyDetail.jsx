import { useState, useEffect, useContext } from 'react';
import SharebnbApi from './api';
import LoadingSpinner from './LoadingSpinner';
import { useParams } from 'react-router-dom';
import userContext from './userContext';
import BookingForm from './BookingForm';

// import SearchForm from './SearchForm';

/** Property Detail Component for Sharebnb
 *
 *
 *
 */
const benSrc = `https://sharebnb-bucket-bb1016.s3.us-west-1.amazonaws.com`;


function PropertyDetail() {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const { currUser } = useContext(userContext);

    useEffect(function fetchPropertyWhenMounted() {
        async function fetchProperty() {
            const resp = await SharebnbApi.getProperty(id);
            setProperty(resp);
        }
        fetchProperty();
    }, [id]);



    console.log("PropertyDetail***", property);

    if (!property) return <LoadingSpinner />;


    return (

        <div className='Property row justify-content-start'>
            <img src={`${benSrc}/${property.images[0]}`} alt={`Image of ${property.title}`} />
            <div className='text-center'>
                <h3>{property.title}</h3>
                <h5>Price: ${property.price}/night</h5>
                <h5>Address: {property.address}</h5>
                <h6>{property.description}</h6>
            </div>
            {currUser && <BookingForm propertyId={id} />}
        </div>
    );

}

export default PropertyDetail;