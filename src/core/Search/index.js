import Layout from '../Layout';
import { getCategories, getProducts, list } from '../../common/api';
import { ProductCard } from '../../common/Components/ProductCard';
import { useCallback, useEffect, useState } from 'react';

export const Search = () => {
  const [data, setData] = useState({ categories: [], category: '', search: '', results: [], searched: false });
  const { categories, category, search, results, searched } = data;

  const loadCategories = useCallback(() => {
    getCategories().then((categories) => {
      if (categories.error) {
        console.log(categories.error);
      } else {
        setData((data) => ({ ...data, categories }));
      }
    });
  }, []);

  const handleChange = useCallback(
    (name) => (event) => {
      setData((data) => ({ ...data, [name]: event.target.value, searched: false }));
    },
    []
  );
  const searchData = useCallback(() => {
    if (search) {
      list({ search, category }).then((response) => {
        if (response.error) {
          console.log(response.error);
        } else {
          setData((data) => ({ ...data, results: response, searched: true }));
        }
      });
    }
  }, [category, search]);

  const submitHandler = useCallback(
    (e) => {
      e.preventDefault();
      searchData();
    },
    [searchData]
  );

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const searchForm = useCallback(() => {
    return (
      <form onSubmit={submitHandler}>
        <span className='input-group-text'>
          <div className='input-group input-group-lg'>
            <div className='input-group-prepend'>
              <select className='btn mr-2' onChange={handleChange('category')}>
                <option value='All'>All</option>
                {categories.map(({ _id, name }) => (
                  <option key={(_id, name)} value={_id}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
            <input
              type='search'
              className='form-control'
              onChange={handleChange('search')}
              placeholder='Search by name'
            />
          </div>
          <div className='btn input-group-append' style={{ border: 'none' }}>
            <button className='input-group-text'>Search</button>
          </div>
        </span>
      </form>
    );
  }, [categories, handleChange, submitHandler]);

  const searchMessage = useCallback((searched, results) => {
    if (searched && results.length > 0) {
      return `Found ${results.length} products`;
    } else if (searched && results.length === 0) {
      return 'No products found';
    }
  }, []);
  const searchedProducts = useCallback(
    (results = []) => {
      return (
        <>
          <h2 className='mt-4 mb-4'>{searchMessage(searched, results)}</h2>
          <div className='row'>
            {results.map((product) => (
              <ProductCard key={product.id} {...{ product }}></ProductCard>
            ))}
          </div>
        </>
      );
    },
    [searchMessage, searched]
  );

  return (
    <div>
      <h2>Search</h2>
      <div className='container mb-3'>{searchForm()}</div>
      <div className='container-fluid mb-3'>{searchedProducts(results)}</div>
    </div>
  );
};
