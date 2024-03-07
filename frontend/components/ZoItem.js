export const Item = (props) => {
    return (
        <div>
        <p>{props.itemName}</p>
        <p>{props.itemDescription}</p>
        <p>{props.itemPrice}</p>
        <p>{props.itemPrice}</p>
        <p>{props.itemIngredients}</p>
        <p>{props.itemImage}</p>
        </div>
    );
}