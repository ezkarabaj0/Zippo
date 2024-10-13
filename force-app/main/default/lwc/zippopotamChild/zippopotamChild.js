import { LightningElement, api } from 'lwc';

export default class ZippopotamChild extends LightningElement {

    country;
    zipcode;
    city;
    places ={};

    @api
    displayInfo(param) {
        console.log('Inthe child '+param.places[0]["place name"]);
        this.country = param.country;
        this.zipcode = param["post code"];
        if(param.places[0]["place name"] != undefined){
            this.city = param.places[0]["place name"];
        }   
        this.places = param.places;
    }
    @api
    clear(){
        this.country = null;
        this.zipcode = null;
        this.city = null;
        this.places = {};
    }
}