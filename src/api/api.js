import md5 from 'md5';

function getXAuth(password) {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
  const day = String(currentDate.getDate()).padStart(2, '0'); 
  const timestamp = `${year}${month}${day}`
  const string = `${password}_${timestamp}`;
  
  console.log(string)
  return md5(string);//Valantis_20240228
}

async function fetchAPI(action, params, password) {
  const XAUTH = getXAuth(password);
  
  const requestSettings = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Auth": XAUTH,
    },
    body: JSON.stringify({ action, params }),
};
  console.log("RequestSettings",requestSettings)//{method: 'POST', X-Auth: 'ab2c87028e0a44d43658d891974542fb'}

  try {
    const response = await fetch("http://api.valantis.store:40000/", requestSettings);
    console.log("RESPONSE:",response)//Response {type: 'cors', url: 'http://api.valantis.store:40000/', redirected: false, status: 401, ok: false, …}
    const data = await response.json();
    // упорядоченный список идентификаторов товаров
    console.log("DATA", data)//["18e4e3bd-5e60-4348-8c92-4f61c676be1f","711837ec-57f6-4145-b17f-c74c2896bafe","6c972a4a-5b91-4a98-9780-3a19a7f41560"]
    return data;
  } catch (error) {
    console.error("Error while retrieving data:", error);
  }
}

async function getProduct(action, params, password) {
  try {
const data = await fetchAPI( action, params, password);
    return data;
  } catch (error) {
    console.error("Error while retrieving data:", error);
  }
}

export { fetchAPI, getProduct };
