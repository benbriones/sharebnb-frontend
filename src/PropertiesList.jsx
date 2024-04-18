import { useState, useEffect } from 'react';
import SharebnbApi from './api';
import LoadingSpinner from './LoadingSpinner';
import PropertyCard from './PropertyCard';
// import SearchForm from './SearchForm';

/** PropertiesList Component for Sharebnb
 *
 *
 *
 */

function PropertiesList() {
    const [properties, setProperties] = useState({ data: null, searchTerm: "" });

    useEffect(function fetchPropertiesWhenMounted() {
        search(properties.searchTerm);
    }, []);

    /** handles search for companies that match search term */
    async function search(searchTerm) {
        const params = searchTerm === ""
            ? ""
            : { titleLike: searchTerm };

        const properties = await SharebnbApi.getProperties(params);
        setProperties({
            data: properties,
            searchTerm: searchTerm,
        });
    }

    console.log("propertiesList***", properties)

    if (!properties.data) return <LoadingSpinner />;


    return (

        <div className='Properties row justify-content-start'>
            {
                properties.data.map((p) => <PropertyCard key={p.id} property={p} />)
            }
        </div>


    );

}

export default PropertiesList;