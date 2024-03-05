import PropTypes from 'prop-types';
import {useState , useEffect} from react
export const Business = ({businessName,businessActivityHours,businessAddress,businessDescription,businessImage}) => {
    return (
        <div>
        <p>{businessName}</p>
        <p>{businessActivityHours}</p>
        <p>{businessAddress}</p>
        <p>{businessDescription}</p>
        {businessImage ? <img src={businessImage} alt={businessName} /> : null}
        </div>
    );
}

    Business.propTypes = {
        businessName: PropTypes.string.isRequired,
        businessActivityHours: PropTypes.string.isRequired,
        businessAddress: PropTypes.string.isRequired,
        businessDescription: PropTypes.string.isRequired,
        businessImage: PropTypes.string, 
    };

    Business.defaultProps = {
        businessImage: null,
    };