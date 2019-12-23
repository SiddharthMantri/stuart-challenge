import { Context } from "./context";
import PropTypes from 'prop-types';


const Provider = ({ children }) => {
    return (
        <Context.Provider>
            {children}
        </Context.Provider>
    )
}
Provider.propTypes = {
    children: PropTypes.node
}
export default Provider;