import React from 'react';
import './search-box.style.css'

export const SearchBox = ({ placeholder, handleChange }) => (
    <div className="search">
        <input
            placeholder={placeholder}
            onChange={handleChange}
        />
    </div>

)