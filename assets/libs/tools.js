function rnRequest (interface, method, parameters, callback) {
    var callback = callback || function(){};
    var hash = md5(JSON.stringify(parameters));
    var data = {
        hash: hash,
        checksum: 'ea24d4af2c566004782f750f940615e5',
        parameters: parameters,
        client: 1
    };
    $.ajax({
        type: 'post',
        dataType: 'json',
        url: 'http://s7.railnation.ru/web/rpc/flash.php?interface=' + interface + '&method=' + method,
        contentType: 'application/json; charset=UTF-8',
        data: JSON.stringify(data),
        success: callback
    });
};

function rnLoadView (path, callback) {
    var callback = callback || function(){};
    $.ajax({
        type: 'get',
        dataType: 'html',
        url: chrome.extension.getURL('views/' + path + '.html'),
        success: callback
    });
}