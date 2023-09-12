import { useState, useEffect } from 'react';
import DspApi from '@/lib/api';



const useGetROrders = (params, cachekey) => {
  const [rorders, setROrders] = useState(null);
  const [meta, setMeta] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    setLoading(true)
    DspApi.listReplenishmentOrders(params.limit, params.page, params.search).then(
      (response) => {
        setROrders(response.data.data)
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
  return { rorders, meta, error, loading };


}

export default useGetROrders;
