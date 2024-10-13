import { LightningElement } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import ZIPCODE_OBJECT from '@salesforce/schema/Non_US_Zip_Code__c';
import ZIPCODE_FIELD from '@salesforce/schema/Non_US_Zip_Code__c.Zip_Code_Data__c';


export default class Zippopotam extends LightningElement {
    zipCode;
    apiResponse;
    msg;
    zipCodeInfo;

    setZipCode(event){
        this.zipCode = event.target.value;
        this.template.querySelector("c-zippopotam-child").clear();
        this.apiResponse = null;
    }

    searchZip(){
        const apiUrl = 'http://api.zippopotam.us/us/'+this.zipCode;
        fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
           console.log(data);
           if(data['country'] === 'United States'){
                console.log( this.template.querySelector("c-zippopotam-child"));
                this.template.querySelector("c-zippopotam-child").displayInfo(data);
           }else{
            this.apiResponse = 'else'
            const fields ={};
            fields[ZIPCODE_FIELD.fieldApiName] = this.zipCode;
            const recordInfo = {apiName:ZIPCODE_OBJECT.objectApiName,fields};
            createRecord(recordInfo)
            .then(result => {
                const event = new ShowToastEvent({
                    title: 'Record Created Successfully',
                    message: 'Non US Zipcode Record Created',
                    variant: 'success'
                });
                this.dispatchEvent(event);
                this.msg = 'Record Created Successfully';
            }).catch(error => {
                const event = new ShowToastEvent({
                    title: 'Record Creation Failed',
                    message: 'Non US Zipcode Record Created',
                    variant: 'error'
                });
                this.dispatchEvent(event);
                this.msg = error.message;
               
           })
           }
        }).catch(error => {
            this.msg = error;
            this.apiResponse = 'error';
        });
    }

}