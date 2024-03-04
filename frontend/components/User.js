
export const User = (props) => {
    return (
        <div>
        <p>{props.fullName}</p>
        <p>{props.email}</p>
        <p>{props.phoneNumber}</p>
        <p>{props.birthDate}</p>
        <p>{props.password}</p>
        <p>{props.image}</p>
        </div>
    );
}

