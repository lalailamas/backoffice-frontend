import axios from "axios";
const DspApi = {
  createUser: (user) => {
    return axios.post(process.env.NEXT_PUBLIC_DSP_API_BASE + 'app-user/signup', user, { headers: { 'content-type': 'application/x-www-form-urlencoded' } });
  },
  loginUser: (credentials) => {
    return axios.post(process.env.NEXT_PUBLIC_DSP_API_BASE + 'app-user/login', credentials, { headers: { 'content-type': 'application/x-www-form-urlencoded' } });
  },
  listProducts: (limit, page,search) => {
    if (search != '' && search != undefined) {

      return axios.get(process.env.NEXT_PUBLIC_DSP_API_BASE + `product/list?limit=${limit}&page=${page}&search=${search}`, { headers: { 'content-type': 'application/x-www-form-urlencoded' } });
    }
    else {
      return axios.get(process.env.NEXT_PUBLIC_DSP_API_BASE + `product/list?limit=${limit}&page=${page}`, { headers: { 'content-type': 'application/x-www-form-urlencoded' } });
      
    }
  },
  createProduct: (product) => {
    var data = new FormData();
    for (var key of Object.keys(product)) {
      data.append(key, product[key]);
    }
    return axios.post(process.env.NEXT_PUBLIC_DSP_API_BASE + `product/create`, data, { headers: { 'content-type': "multipart/form-data" } });
  },
  updateProduct: (product) => {
    return axios.put(process.env.NEXT_PUBLIC_DSP_API_BASE + `product/update`, product, { headers: { 'content-type': 'application/x-www-form-urlencoded' } });
  },
  updateProductStock: (object) => {
    return axios.put(process.env.NEXT_PUBLIC_DSP_API_BASE + `product/stock`, object, { headers: { 'content-type': 'application/x-www-form-urlencoded' } });
  },
  findProductByEAN: (ean) => {
    return axios.get(process.env.NEXT_PUBLIC_DSP_API_BASE + `product/find?ean=${ean}`, { headers: { 'content-type': 'application/x-www-form-urlencoded' } });
  },

  getProduct: (id) => {
    return axios.get(process.env.NEXT_PUBLIC_DSP_API_BASE + `product/?id=${id}`, { headers: { 'content-type': 'application/x-www-form-urlencoded' } });
  },
  deleteProduct: (id) => {
    return axios.delete(process.env.NEXT_PUBLIC_DSP_API_BASE + `product/delete`,  { data: { id: id } , headers: { 'content-type': 'application/x-www-form-urlencoded' } });
  },
  updateProductImage: (id, file) => {
    var data = new FormData();

    data.append('id', id);
    data.append('image', file);

    return axios.put(process.env.NEXT_PUBLIC_DSP_API_BASE + `product/update-image`, data, { headers: { 'content-type': "multipart/form-data" } });
    

  },
  listWarehouses: (limit, page) => {
    return axios.get(process.env.NEXT_PUBLIC_DSP_API_BASE + `warehouse/list?limit=${limit}&page=${page}`, { headers: { 'content-type': 'application/x-www-form-urlencoded' } });

  },
  listWarehouseProducts:(warehouse_id) => {
    return axios.get(process.env.NEXT_PUBLIC_DSP_API_BASE + `warehouse/${warehouse_id}/product/list`, { headers: { 'content-type': 'application/x-www-form-urlencoded' } });

  },

  listStores: (limit,page) => {
    return axios.get(process.env.NEXT_PUBLIC_DSP_API_BASE + `store?limit=${limit}&page=${page}`, { headers: { 'content-type': 'application/x-www-form-urlencoded' } });

  },


  listReplenishmentOrders: (limit,page,search) => {
    if (search != '') {
      return axios.get(process.env.NEXT_PUBLIC_DSP_API_BASE + `replenishment-order/?limit=${limit}&page=${page}&search=${search}`, { headers: { 'content-type': 'application/x-www-form-urlencoded' } });
    }
    else {
      return axios.get(process.env.NEXT_PUBLIC_DSP_API_BASE + `replenishment-order/?limit=${limit}&page=${page}`, { headers: { 'content-type': 'application/x-www-form-urlencoded' } });

      
    }
  },
  createReplenishmentOrder: (ro) => {
    return axios.post(process.env.NEXT_PUBLIC_DSP_API_BASE + `replenishment-order/create`, ro);
  },

  updateReplenishmentOrder: (data) => {
    
    return axios.put(process.env.NEXT_PUBLIC_DSP_API_BASE + `replenishment-order/${data.id}`, data);

  },
  

  createPickingOperation: (ro_id,po) => {
    // var data = new FormData();
    // for (var key of Object.keys(po)) {
    //   data.append(key, po[key]);
    // }
    return axios.post(process.env.NEXT_PUBLIC_DSP_API_BASE + `replenishment-order/${ro_id}/picking-operation`, po);
  },

  deletePickingOperation: (po) => {
    return axios.delete(process.env.NEXT_PUBLIC_DSP_API_BASE + `replenishment-order/${po.replenishment_order_id}/picking-operation/${po.id}` );
  
  },
  updatePickingOperation: (ro_id,po_id,data) => {
    return axios.put(process.env.NEXT_PUBLIC_DSP_API_BASE + `replenishment-order/${ro_id}/picking-operation/${po_id}`, data );

  },
  getReplenishmentOrder: (ro_id) => {
    return axios.get(process.env.NEXT_PUBLIC_DSP_API_BASE + `replenishment-order/${ro_id}`, { headers: { 'content-type': 'application/x-www-form-urlencoded' } });
  
  },
  deleteReplenishmentOrder: (ro_id) => {
    return axios.delete(process.env.NEXT_PUBLIC_DSP_API_BASE + `replenishment-order/${ro_id}`, { headers: { 'content-type': 'application/x-www-form-urlencoded' } });
  
  }


}



export default DspApi; 