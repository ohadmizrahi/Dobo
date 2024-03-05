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