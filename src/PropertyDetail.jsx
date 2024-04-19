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

        <div className='Property row justify-content-center'>
                <p className='fs-2 text-capitalize text-center mb-0 mt-3'>{property.title}</p>
            <img src={`${benSrc}/${property.images[1]}`} className='col-4 mt-0 img-thumbnail' alt={`Image of ${property.title}`} />
            <div className='text-center'>
                <div className='fs-6'>Price: ${property.price}/night</div>
                <div className=' fs-6'>Address: {property.address}</div>
                <div className='fs-6 fst-italic'>{property.description}</div>
            </div>
            <div className='row justify-content-center'>
                {currUser && <BookingForm propertyId={id} />}
            </div>
        </div>
    );

}

export default PropertyDetail;