import React, { useRef, useEffect } from 'react';
import classNames from '../../utils/className';
import ProductCard from '../Product';
import EmptyImg from '../../assets/404.png'
import './style.css';
import { Product } from '../../types/product';


interface AutoCompleteProps {
  onAutoComplete: (event: React.ChangeEvent<HTMLInputElement>) => void;
  input: string;
  setInput: (input: string) => void;
  suggestions: Product[];
  setSuggestions: (suggestion: Product[]) => void;
  data: Product[];
  selectedProduct: Product | null;
  setSelectedProduct: (suggestion: Product | null) => void
}

const AutoComplete: React.FC<AutoCompleteProps> = ({ onAutoComplete, input, setInput, suggestions, setSuggestions, data, selectedProduct, setSelectedProduct }) => {

  const autocompleteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        autocompleteRef.current &&
        !autocompleteRef.current.contains(event.target as Node)
      ) {
        setSuggestions([]);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [setSuggestions]);

  const handleSuggestionClick = (suggestion: Product) => {
    setInput(suggestion.title);
    setSuggestions([]);
    setSelectedProduct(suggestion);
  };

  const handleClearClick = () => {
    setSuggestions([]);
    setSelectedProduct(null);
    setInput('');
  };

  const displayedProducts = selectedProduct ? [selectedProduct] : data;

  const renderSuggestion = (suggestion: Product) => {
    const regex = new RegExp(`(${input})`, 'gi');
    const parts = suggestion.description.split(regex);

    return (
      <li
        key={suggestion.id}
        onClick={() => handleSuggestionClick(suggestion)}
        className={classNames('autocomplete__suggestion', {
          'autocomplete__suggestion--selected': suggestion.brand === input,
        })}
      >
        {parts.map((part, index) =>
          regex.test(part) && input ? (
            <span key={index} className="autocomplete__suggestion-highlight">
              {part}
            </span>
          ) : (
            part
          )
        )}
      </li>
    );
  };

  return (
    <div>
      <div className="autocomplete" >
        <div className="autocomplete__input-container" ref={autocompleteRef}>
          <input
            type="text"
            value={input}
            onChange={onAutoComplete}
            placeholder="Apple, Samsung, Huwawei, Hp, Microsoft"
            className="autocomplete__input"
          />
          {input.length > 0 && (
            <button className="autocomplete__clear-button" onClick={handleClearClick}>
              &times;
            </button>
          )}
        </div>
        {suggestions.length > 0 && input && (
            <ul className="autocomplete__suggestions">
              {suggestions.map((suggestion) => renderSuggestion(suggestion))}
            </ul>
          )}
      </div>
      {
        Array.isArray(displayedProducts) && displayedProducts.length > 0 ? (
          <div className={`product__list ${selectedProduct ? 'single__product' : ''}`}>
            {displayedProducts.map((product) => (
              <ProductCard onClick={handleSuggestionClick} key={product.id} product={product} />
            ))}
          </div>
        ) :
          <div className='no__product'>
            <img src={EmptyImg} alt="404" />
            There's no product to display at the moment come back later please!
          </div>
      }
    </div>
  );
};

export default AutoComplete;