import { useOutletContext } from "react-router";

export default function Cart() {
    const { cartItems, handleRemoveItem, handleQuantityChange } = useOutletContext();
    const itemSum = cartItems.reduce((sum, item) => sum + item.price*item.quantity, 0);

    return(
        <div>
            <h1>Cart Page</h1>
            {cartItems.length === 0 ? (
                <p>장바구니가 비어 있습니다.</p>
            ) : (
            cartItems.map((item) => (
                <div key={item.id}>
                    <img 
                        src={item.image} 
                        alt={item.title} 
                        style={{ width: "60px", height: "60px", objectFit: "contain" }} 
                    />
                    <p>Product Title: {item.title}</p>
                    <p>Product Price: ${item.price}</p>
                    <p>Product Quantity: 
                        <button type="button" onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                        {item.quantity}
                        <button type="button" onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                    </p>
                    <button type="button" onClick={() => handleRemoveItem(item.id)}>Remove</button>
                </div>
            ))
            )}
            <p>Total Price: ${itemSum}</p>
        </div>
    )
}