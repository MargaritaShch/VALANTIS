//hash library
import md5 from 'md5';

const getPasswordHash = (password) => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
    const day = String(currentDate.getDate()).padStart(2, '0'); 
    const timestamp = `${year}${month}${day}`;
    const string = `${password}_${timestamp}`;
    
    return md5(string);
};

export default getPasswordHash;