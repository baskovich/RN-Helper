$(function(){
    rnLoadView('top_panel', function(html){
        $('body').append(html);
        $('#rn-top-panel')
            .on('mouseenter', function(){
                $(this).animate({
                    left: 0,
                    opacity: 1
                }, 300);
            })
            .on('mouseleave', function(){
                $(this).animate({
                    left: -250,
                    opacity: 0
                }, 300);
            });

        $('#rn-btn-invite').on('click', function(){
            showWindow('invite');
        });
    });
});

function showWindow (name) {
    if (!$('.rn-window-' + name).length) {
        rnLoadView('window/' + name, function(html){
            $('body').append(html);
            var cbName = 'onShowWindow' + name.substr(0,1).toUpperCase() + name.substr(1).toLowerCase();
            window[cbName]();
            $('.rn-window .close').on('click', function(){
                $(this).parent().remove();
            });
        });
    }
}

function onShowWindowInvite () {
    rnRequest('HighscoreInterface', 'search', ['00000000-0000-0000-0000-000000000000', 9, 200], function(data){
        if (typeof data.Body.ranking == 'undefined') {
            console.log(data);
            return;
        }
        var inviteGroups = $('#rn-invite-groups');
        for (var i in data.Body.ranking) {
            var group = $('<div><input type="checkbox" data-id="' + data.Body.ranking[i].corporation_id + '">&nbsp;' + data.Body.ranking[i].nick + '</div>');
            inviteGroups.append(group);
        }
        checkboxInvite();
    });
}

function checkboxInvite () {
    $('#rn-invite-groups input[type=checkbox]').on('change', function(){
        if ($(this).is(':checked')) {

        } else {

        }
        console.log($(this).data('id'));
    });
}