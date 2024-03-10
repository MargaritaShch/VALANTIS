import getPasswordHash from '../utils/authUtils.js';

class API  {
    constructor(){
      this.requestUrl = "http://api.valantis.store:40000/";
      this.password = "Valantis";
      this.totalItemsCountCache = null;
      this.idsCache = {}; 
      //set HTTP request headers
      this.requestSettings = {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          }
      };
    }
    //send request: get action and params from API and create string format password
    async fetchAPI(action, params) {
      console.log("Calling fetchAPI with action:", action, "params:", params);
      const XAUTH = getPasswordHash(this.password);
      const body = { action, params };
      const requestSettings = { ...this.requestSettings, body: JSON.stringify(body), headers: { ...this.requestSettings.headers, "X-Auth": XAUTH } };
      console.log("RequestSettings", requestSettings)
      try {
          const response = await fetch(this.requestUrl, requestSettings);
          console.log("RESPONSE:", response)
          const data = await response.json();
          console.log("DATA", data)
          return data;
      } catch (error) {
          console.error("Error while retrieving data:", error);
      }
    }

    //return all products and hash result
    async getTotalItemsCount() {
      if (this.totalItemsCountCache !== null) {
        return this.totalItemsCountCache;
    }
    try {
        const response = await this.fetchAPI("get_ids", { offset: 0, limit: 8004 });
        console.log("ALL PRODUCTS", response.result.length);
        this.totalItemsCountCache = response.result.length; //save in cash
        console.log("CASH", this.totalItemsCountCache)
        return response.result.length;
    } catch (error) {
        console.error("Error while retrieving total items count:", error);
        return 0;
    }
 }

    async getProductsList(params) {
      const ids = await this.getIDS();
      const products = await this.getProduct(ids);
      return products;
    }
  
    async getIDS(offset, limit) {
      //save in hash 
      const cacheKey = `${offset}-${limit}`;
      //if the hash does not contain cacheKey, make a request to the api
      if (!this.idsCache[cacheKey]) {
          try {
              const response = await this.fetchAPI("get_ids", { offset, limit });
              this.idsCache[cacheKey] = response.result;
          } catch (error) {
              console.error("Error while retrieving IDS:", error);
          }
      }
      //if the data was in the cache is returned without making a request to api
      return this.idsCache[cacheKey];
  }
  
    async getProduct(ids) {
      try {
          const response = await this.fetchAPI("get_items", { ids });
          console.log("GET_ITEMS:", response);
          //filters uniqe ids
          const uniqueById = response.result.filter((function() {
            const seenIds = new Set();
            return item => {
              if (!seenIds.has(item.id)) {
                seenIds.add(item.id);
                return true;
              }
              return false;
            };
          })());
          console.log("UNIQUE_ITEMS:", uniqueById);
          return uniqueById;
      } catch (error) {
          console.error("Error while retrieving products:", error);
      }
    }
}
  export default API;