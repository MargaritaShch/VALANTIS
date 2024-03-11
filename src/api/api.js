import getPasswordHash from '../utils/authUtils.js';

class API  {
    constructor(){
        this.requestUrl = 'https://api.valantis.store:41000/';
        this.totalItemsCountCache = null;
        this.idsCache = {}; 
        //set HTTP request headers
        this.requestSettings = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Auth': getPasswordHash('Valantis'),
            }
        };
    }
    //send request: get action and params from API and create string format password
    async fetchAPI(action, params) {
        const body = { action, params };
        const requestSettings = { ...this.requestSettings, body: JSON.stringify(body), headers: { ...this.requestSettings.headers} };
        try {
            const response = await fetch(this.requestUrl, requestSettings);
            if (!response.ok) {
                throw new Error(await response.text());
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error while retrieving data:', error);
            return this.fetchAPI(action, params);
        }
    }

    //return all products and hash result
    async getTotalItemsCount() {
        if (this.totalItemsCountCache !== null) {
            return this.totalItemsCountCache;
        }
        try {
            const response = await this.fetchAPI('get_ids', { offset: 0, limit: 8004 });
            this.totalItemsCountCache = response.result.length; //save in cash
            return response.result.length;
        } catch (error) {
            console.error('Error while retrieving total items count:', error);
            return 0;
        }
    }

    async getProductsList() {
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
                const response = await this.fetchAPI('get_ids', { offset, limit });
                this.idsCache[cacheKey] = response.result;
            } catch (error) {
                console.error('Error while retrieving IDS:', error);
            }
        }
        //if the data was in the cache is returned without making a request to api
        return this.idsCache[cacheKey];
    }
  
    async getProduct(ids) {
        try {
            const response = await this.fetchAPI('get_items', { ids });
         
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
            return uniqueById;
        } catch (error) {
            console.error('Error while retrieving products:', error);
        }
    }
}

export default API;
