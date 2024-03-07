import getPasswordHash from '../utils/authUtils.js';

class API  {
  constructor(){
    this.requestUrl = "http://api.valantis.store:40000/";
    this.password = "Valantis";
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

  async getProductsList(params) {
    const ids = await this.getIDS();
    const products = await this.getProduct(ids);
    return products;
  }

  async getIDS() {
    try {
        const response = await this.fetchAPI("get_ids", { offset: 0, limit: 5 });
        return response.result;
    } catch (error) {
        console.error("Error while retrieving IDS:", error);
    }
  }

  async getProduct(ids) {
    try {
        const response = await this.fetchAPI("get_items", { ids });
        return response.result;
    } catch (error) {
        console.error("Error while retrieving products:", error);
    }
  }
}

export default API;

