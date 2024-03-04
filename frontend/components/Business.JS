export const Business = (props) => {
    return (
        <div>
        <p>{props.businessName}</p>
        <p>{props.businessActivityHours}</p>
        <p>{props.businessAddress}</p>
        <p>{props.businessDescription}</p>
        <p>{props.businessImage}</p>
        </div>
    );
}