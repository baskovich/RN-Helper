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
    rnRequest('HighscoreInterface', 'search', ['00000000-0000-0000-0000-000000000000', 9, 10000], function(data){
        if (typeof data.Body.ranking == 'undefined') {
            console.log(data);
            return;
        }
        var inviteGroups = $('#rn-invite-groups');
        for (var i in data.Body.ranking) {
            var groupId = data.Body.ranking[i].corporation_id;
            var name = data.Body.ranking[i].nick;
            var group = $('<div><input type="checkbox" data-id="' + groupId + '">&nbsp;' + name + '</div>');
            inviteGroups.append(group);
        }
        checkboxInvite();
    });

    $('#rn-invite-submit').on('click', onInviteSubmit);
}

function checkboxInvite () {
    $('#rn-invite-groups input[type=checkbox]').on('change', function(){
        var inviteUsers = $('#rn-invite-users');
        var id = $(this).data('id');
        if ($(this).is(':checked')) {
            rnRequest('CorporationInterface', 'get', [id], onCheckedGroup);
        } else {
            $('input[type=checkbox][data-group-id=' + id + ']', inviteUsers).parent().remove();
        }
    });
}

function onCheckedGroup (data) {
    var inviteUsers = $('#rn-invite-users');
    var groupId = data.Body.ID;
    for (var i in data.Body.members) {
        var userId = data.Body.members[i].user_id;
        var name = data.Body.members[i].name;
        var user = $('<div><input type="checkbox" data-group-id="' + groupId + '" data-user-id="' + userId + '" checked>&nbsp;' + name + '</div>');
        inviteUsers.append(user);
    }
}

function onInviteSubmit () {
    var btn = $('#rn-invite-submit');
    if (!btn.hasClass('inactive')) {
        btn.text('Подождите...').addClass('inactive');
        var checkboxes = $('#rn-invite-users input[type=checkbox]');
        var count = checkboxes.length;
        checkboxes.each(function(index, el){
            if ($(el).is(':checked')) {
                var id = $(el).data('user-id');
                rnRequest('CorporationInterface', 'invite', [id]);
            }
            if (!--count) doInviteUsers();
        });
    }
}

function doInviteUsers () {
    alert('Все пользователи приглашены');
}