import { useCallback, useState } from 'react';
import './index.css';

export const Checkbox = ({ categories, handleFilters }) => {
  const [checked, setChecked] = useState([]);

  const handleToggle = useCallback(
    (_id) => (_event) => {
      const newCheckedCategoryIds = [...checked];
      if (!newCheckedCategoryIds.includes(_id)) {
        newCheckedCategoryIds.push(_id);
      } else {
        newCheckedCategoryIds.splice(_id, 1);
      }

      setChecked(newCheckedCategoryIds);
      handleFilters(newCheckedCategoryIds, 'category');
    },
    [checked, handleFilters]
  );

  return categories.map(({ _id, name }) => (
    <li key={_id} className='list-unstyled'>
      <input type='checkbox' className='form-check-input' onChange={handleToggle(_id)} />
      <label className='form-check-label'>{name}</label>
    </li>
  ));
};
