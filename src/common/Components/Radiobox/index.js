import { useCallback, useState } from 'react';
import './index.css';

export const Radiobox = ({ prices, handleFilters }) => {
  const [value, setValue] = useState(0);

  const handleChange = useCallback(
    (event) => {
      handleFilters(event.target.value, 'price');
      setValue(event.target.value);
    },
    [handleFilters]
  );

  return prices.map(({ name, _id }) => {
    return (
      <li key={_id} className='list-unstyled'>
        <input
          type='radio'
          className='mr-2'
          name='price'
          checked={parseInt(value) === parseInt(_id)}
          onChange={handleChange}
          value={_id}
        />
        <label className='form-check-label'>{name}</label>
      </li>
    );
  });
};
