public class AccountTestTriggerHelper {
    
    public static void updateContacts(List<Account> TrgAccsNew, List<Account> TrgAccsOld, Map<id,Account> mapAccsNew,Map<id,Account> mapAccsOld ){
        System.debug(TrgAccsNew);
        System.debug(mapAccsNew);
        Map<id,Account> updatedAccts = new  Map<id,Account>();
        for(Account ac:TrgAccsNew){
            if(ac.Site != mapAccsOld.get(ac.id).Site ){
                updatedAccts.put(ac.id, ac);
            }    
        }
        List<Contact> contactsFromAccsUpdated = [Select id, Site__c, accountId FROM Contact where AccountId IN :updatedAccts.keyset() LIMIT 49999 ];
        List<Contact> contactstoUpdate = new  List<Contact>();
        for(Contact cont :contactsFromAccsUpdated ){
            cont.Site__c = updatedAccts.get(cont.AccountId).Site;
            contactstoUpdate.add(cont);
        }
        if(contactstoUpdate.size() > 0){
              update contactstoUpdate;
        }
      
    }


}