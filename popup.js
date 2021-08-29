$(function(){

    chrome.storage.sync.get(['total', 'limit'], function(budget){
        $("#total").text(budget.total);
        $("#limit").text(budget.limit);
    });

    $("#spendAmount").click(function(){
        chrome.storage.sync.get(['total', 'limit'], function(budget){
            var newTotal = 0;
            if (budget.total){
                newTotal += parseInt(budget.total);
            }

            var amount = $("#amount").val();
            if (amount){
                newTotal += parseInt(amount);
            }

            chrome.storage.sync.set({'total': newTotal},function(){
                if ( amount && newTotal >= budget.limit){
                    var notifOptions = {
                        type : 'basic',
                        iconUrl : 'icons/icon48.png',
                        title : 'Limit reached!',
                        message : "uh oh! looks like you've reached your limit"
                    };
                    chrome.notifications.create('limitNotif1', notifOptions);
                }
            });

            $("#total").text(newTotal);
            $("#amount").val('');

        });        
    });
    $("#keepAmount").click(function(){
        chrome.storage.sync.get(['total', 'limit'], function(budget){
            var newTotal = 0;
            if (budget.total){
                newTotal += parseInt(budget.total);
            }

            var amount = $("#amount").val();
            if (amount){
                if ( amount <= newTotal){
                    newTotal -= parseInt(amount);
                    chrome.storage.sync.set({'total': newTotal});
                }
                else{
                    var notifOptions = {
                        type : 'basic',
                        iconUrl : 'icons/icon48.png',
                        title : 'Limit reached!',
                        message : "uh oh! looks like you want to keep more then Total"
                    };
                    chrome.notifications.create('limitNotif2', notifOptions);
                }
            }

            $("#total").text(newTotal);
            $("#amount").val('');

        });        
    });
});
