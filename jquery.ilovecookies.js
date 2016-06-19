"use strict";
(function($) {
    $(document).ready(function() {
        var settings = {
            text: 'Um die Webseite optimal gestalten und fortlaufend verbessern zu können, verwenden wir Cookies.\
            Durch die weitere Nutzung der Webseite stimmen Sie der Verwendung von Cookies zu.',
            close: true,
            expiration: 7,
            more: 'datenschutz'
        }
        if( document.cookie !== undefined && document.cookie.indexOf('ilovecookies=true') > -1 ) { return true; }
        $('body').prepend('\
            <div id="ilovecookies">\
                <div class="inner">\
                    <div class="text">\
                        '+settings.text+'\
                    </div>\
                </div>\
            </div>\
        ');
        if( settings.more || settings.close ) { $('#ilovecookies .inner').append('<div class="buttons"></div>'); }
        if( settings.more ) {
            // if relative link is used
            if( settings.more.indexOf('http') === -1 ) {
                settings.more = window.location.protocol+'//'+window.location.host+'/'+settings.more;
            }
            $('#ilovecookies .inner .buttons').append('<a href="'+settings.more+'" class="more">Weitere Informationen</a>');
        }
        if( settings.close ) {
            $('#ilovecookies .inner .buttons').append('<a href="#" class="close">Schließen</a>');
        }
        $('#ilovecookies .close').click(function() {
            $(this).closest('#ilovecookies').fadeOut(100, function() {
                $(this).remove();
            });
            var d = new Date(); d.setTime(d.getTime() + (settings.expiration*24*60*60*1000));
            var expires = d.toUTCString();
            document.cookie = 'ilovecookies' + "=" + 'true' + "; " + "expires=" + expires + "; path=/";
            return false;
        });
    });
})(jQuery);