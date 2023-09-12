import { useState, useEffect } from 'react';
import DspApi from '@/lib/api';



const useGetStores = (params, cachekey) => {
  const [stores, setStores] = useState(null);
  const [meta, setMeta] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    setLoading(true)
    DspApi.listStores(params.limit, params.page, params.search).then(
      (response) => {
        setStores(response.data.data)
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
  return { stores, meta, error, loading };


}

export default useGetStores;
