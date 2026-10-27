import ProductCard from '../components/ProductCard'
import { useOutletContext } from "react-router";
import { useEffect, useState } from 'react';


export default function Shop() {
    const { handleAddToCart } = useOutletContext();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
            .then((res) => {
            if (res.status >= 400) {
                throw new Error("서버 에러가 발생했습니다.");
            }
            return res.json();
            })
            .then((data) => setProducts(data))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
        }, []);
    
    if (loading) return <p>상품 목록을 불러오는 중입니다...</p>;
    if (error) return <p>에러: {error}</p>;

    return(
        <div>
            <h1>Shop Page</h1>
            <h2>Product</h2>
            <div>
                {products.map((product) =>(
                    <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
                ))}
            </div>
        </div>
        
    )
}