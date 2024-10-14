public with sharing class AccountPlataformEventPublisher {
   
    public static void publishAccountEvent(List<Account> TrgAccsNew, List<Account> TrgAccsOld, Map<id,Account> mapAccsNew,Map<id,Account> mapAccsOld ){
        
        List<Account> updatedAccts = new  List<Account>();
        for(Account ac:TrgAccsNew){
            if(ac.Risk__c != mapAccsOld.get(ac.id).Risk__c ){
                updatedAccts.add(ac); 
            }    
        }
        
        List<Account_High_Risk__e> accountEvents = new List<Account_High_Risk__e>();
        for(Account acc : updatedAccts) {
            Account_High_Risk__e eve = new Account_High_Risk__e();    
            eve.Account_Owner_Id__c = acc.OwnerId;
            eve.Risk__c = acc.Risk__c;
            eve.AccountId__c = acc.id;
            accountEvents.add(eve);
        }

        if(accountEvents.size()>0){
            EventBus.publish(accountEvents);
        }
    }
}