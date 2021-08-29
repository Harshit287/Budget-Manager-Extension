$(function(){
    $("#saveLimit").click(function(){
        var limit = $("#limit").val();
        if(limit){
            chrome.storage.sync.set({'limit': limit}, function(){
                close();
            });
        }
    });

    $("#resetTotal").click(function(){
        chrome.storage.sync.set({'total': 0},function(){
            var notifOptions = {
                type : 'basic',
                iconUrl : 'icons/icon48.png',
                title : 'Total Reset',
                message : "Total has beed reset to 0!"
            };
            chrome.notifications.create('resetNotif', notifOptions);
        });
    });
});
