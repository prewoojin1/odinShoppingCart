import { useState } from "react";

export default function ProductCard({ product, onAddToCart }) {
    const [amount, setAmount] = useState(1);

    return (
        <div style={{ border: "1px solid #ddd", padding: "16px", borderRadius: "8px"}}>
            <img
                src={product.image}
                alt={product.title}
                style={{ width: "120px", height: "120px", objectFit: "contain" }} 
            />
            <h3>{product.title}</h3>
            <p>가격: ${product.price}</p>
            <label>
                <input 
                    type="number"
                    min="1"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                />
            </label>
            <button type="button" onClick={() => setAmount(amount+1)}>+</button>
            <button type="button" onClick={() => setAmount((prev) => (prev > 1 ? prev - 1 : prev))}>-</button>
            <button type="button" onClick={() => onAddToCart(product, amount)}>Add to Cart</button>
        </div>
    )
}