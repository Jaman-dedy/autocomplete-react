import './style.css'

import {Product} from '../../types/product'

interface ProductCardProps {
    key: number;
    onClick: (suggestion: Product) => void;
    product: Product
  }
  
const ProductCard: React.FC<ProductCardProps> = ({ onClick, product}) => {
    return (
    <div className="product__card" onClick={() => onClick(product)}>
      <img src={product?.thumbnail} alt={product?.title} className="product__image" />
      <div className="product__details">
        <span className="product__details--name">{product?.title}</span>
        <span className="product__details--price">${product?.price}</span>
      </div>
    </div>
  )};

  export default ProductCard