import React, { useState, useEffect } from 'react';
import AutoComplete from './components/Autocomplete';
import './App.css';

import { Product } from './types/product';
import useFetchProducts from './hook/useFetchProducts';

function App() {

  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { data, fetchData } = useFetchProducts();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleAutoComplete = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = event.target.value;
    setInput(userInput);
    await fetchData();

    if (userInput.trim() === '') {
      setSuggestions([]);
    }
    if(!userInput){
      setSuggestions([]);
    }
    else {
      const filteredSuggestions = data.filter((item) =>
        item.brand.toLowerCase().includes(userInput.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    }
  };

  return (
    <div className="App">
      <AutoComplete
        onAutoComplete={handleAutoComplete}
        input={input}
        setInput={setInput}
        suggestions={suggestions}
        setSuggestions={setSuggestions}
        data={data}
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
      />
    </div>
  );
}

export default App;
