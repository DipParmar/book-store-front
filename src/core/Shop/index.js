import { useCallback, useEffect, useState } from 'react';
import { getCategories, getFilterdProducts } from '../../common/api';
import { Checkbox } from '../../common/Components/Checkbox';
import Layout from '../Layout';
import { prices } from '../../common/utils/fixedPrices';
import './index.css';
import { Radiobox } from '../../common/Components/Radiobox';
import { ProductCard } from '../../common/Components/ProductCard';

export const Shop = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  const [productFilters, setProductFilters] = useState({ filters: { category: [], price: [] } });
  const [limit, setLimit] = useState(5);
  const [skip, setSkip] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]);
  const [size, setSize] = useState(0);
  const [inititaedOnce, setInititatedOnce] = useState(false);

  const init = useCallback(() => {
    getCategories().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data);
      }
    });
  }, []);

  const loadMore = useCallback(() => {
    let toSkip = skip + limit;
    getFilterdProducts({ skip: toSkip, limit, filters: productFilters }).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults((products) => [...products, ...data.products]);
        setSize(data.size);
        setSkip(toSkip);
      }
    });
  }, [limit, productFilters, skip]);

  const loadFilteredResults = useCallback(
    (filters) => {
      getFilterdProducts({ skip, limit, filters }).then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setFilteredResults(data.products);
          setSize(data.size);
          setSkip(0);
        }
      });
    },
    [limit, skip]
  );

  useEffect(() => {
    if (!inititaedOnce) {
      init();
      loadFilteredResults();
      setInititatedOnce(true);
    }
  }, [init, inititaedOnce, loadFilteredResults]);

  const handlePrice = useCallback((value) => {
    const data = prices;

    let range = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value)) {
        range = data[key].range;
      }
    }
    return range;
  }, []);

  const handleFilters = useCallback(
    (filters, filterBy) => {
      const newFilters = { ...productFilters };
      newFilters.filters[filterBy] = filters;

      if (filterBy === 'price') {
        let priceValues = handlePrice(filters);
        newFilters.filters[filterBy] = priceValues;
      }
      loadFilteredResults(productFilters.filters);
      setProductFilters(newFilters);
    },
    [handlePrice, loadFilteredResults, productFilters]
  );

  return (
    <Layout title='Shop' className='container-fluid ' description='Search and find books of your choice'>
      <div className='row'>
        <div className='col-4'>
          <h4>Filter by categories</h4>
          <ul>
            <Checkbox {...{ categories, handleFilters }} />
          </ul>
          <h4>Filter by price range</h4>
          <ul>{<Radiobox {...{ prices, handleFilters }} />}</ul>
        </div>
        <div className='col-8'>
          <h2 className='mb-4'>Products</h2>
          <div className='row'>
            {filteredResults.map((product) => (
              <ProductCard key={product._id} {...{ product }}></ProductCard>
            ))}
          </div>

          {size > 0 && size >= limit && (
            <button onClick={loadMore} className='btn btn-warning mb-5'>
              Load More
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
};
