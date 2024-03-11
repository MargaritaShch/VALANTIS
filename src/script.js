import './style.scss';
import API from './api/api.js'; 
import Controller from './Modules/Controller.js';
import Model from './Modules/Model.js';
import View from './Modules/View.js';

document.addEventListener('DOMContentLoaded', () => {
    const model = new Model(new API());
    const view = new View();
    new Controller(model, view);
});




