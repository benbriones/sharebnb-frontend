import { Routes, Route, Navigate } from "react-router-dom";
import userContext from "./userContext";
import { useContext } from "react";
import PropertiesList from "./PropertiesList";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import PropertyForm from "./PropertyForm";
import PropertyDetail from "./PropertyDetail";

/**RouteList component that contains all Routes
 *
 * Props: none
 * State: none
 *
 * App -> RoutesList ->
 *       { LoginForm, SignupForm, AddPropertyForm, PropertiesList, PropertyDetail, Bookings }
*/


function RoutesList({ login, signup, logout }) {
    // const { currentUser } = useContext(userContext);
    // TODO: make it so login and signup cant be reached if user logged in
    return (
        <div className="RoutesList">
            <Routes>
                <Route path='/' element={<PropertiesList />} />
                <Route path='/login' element={<LoginForm login={login} />} />
                <Route path='/signup' element={<SignupForm signup={signup} />} />
                <Route path='/add-property' element={<PropertyForm />} />
                <Route path='/properties/:id' element={<PropertyDetail />} />
                {/* <Route path='/bookings' element={<Bookings />} /> */}
                <Route path='*' element={<Navigate to="/" />} />
            </Routes>
        </div>
    );
}

export default RoutesList;