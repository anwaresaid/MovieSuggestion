import React from 'react';
import Select from 'react-select';

function MultiSelect({options, onChange, label}) {
    return (
        <div>
            <h1>{label}</h1>
            <Select options={options} onChange={onChange}/>
        </div>
    )
}

export default MultiSelect;