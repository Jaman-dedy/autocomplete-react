import { useState, useCallback } from 'react';
import { Product } from '../types/product';


const URI:string = process.env.REACT_APP_API_URL || 'https://dummyjson.com/products'
const useFetchProducts = () => {
  console.log('URI :>> ', URI);
  const [data, setData] = useState<Product[]>([]);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(URI);
      const jsonData = await response.json();
      if (jsonData.products && Array.isArray(jsonData.products)) {
        setData(jsonData.products);
      } else {
        console.error('Fetched data is not in the expected format:', jsonData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  },[]);

  return { data, fetchData };
};

export default useFetchProducts;