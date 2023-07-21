import { useState, useEffect } from 'react';
import DspApi from '@/lib/api';



const useGetProducts = (params, cachekey) => {
  const [products, setProducts] = useState(null);
  const [meta, setMeta] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    setLoading(true)
    DspApi.listProducts(params.limit, params.page).then(
      (response) => {
        setProducts(response.data.data)
        setMeta(response.data.meta)
      }
    ).catch((err) => {
      setError(err);
    }).finally(() => {
      setLoading(false);
    });
  }


  useEffect(() => {
    fetchData();
  }, [params, cachekey]);

  // custom hook returns value
  return { products, meta, error, loading };


}

export default useGetProducts;
