document.addEventListener('DOMContentLoaded', function()
{

    var settings = {
        expiration: 30,
        close_show: true
    }
    if( document.documentElement.hasAttribute('lang') && document.documentElement.getAttribute('lang').substring(0,2) == 'en' )
    {
        settings.text = 'To ensure that our web site is well managed and to facilitate improved navigation within the site, we may use cookies. By using this website, you agree to the use of cookies.';
        settings.close_text = 'Close';
        settings.more_text = 'Further information';
        settings.more_link = 'privacy';
    }
    else
    {
        settings.text = 'Um die Webseite optimal gestalten und fortlaufend verbessern zu können, verwenden wir Cookies. Durch die weitere Nutzung der Webseite stimmen Sie der Verwendung von Cookies zu.';
        settings.close_text = 'Schließen';
        settings.more_text = 'Weitere Informationen';
        settings.more_link = 'datenschutz';
    }

    if( document.cookie !== undefined && document.cookie.indexOf('ilovecookies=true') > -1 )
    {
        return true;
    }
    document.body.insertAdjacentHTML('afterbegin','\
        <div class="ilovecookies">\
            <div class="ilovecookies__inner">\
                <div class="ilovecookies__text">\
                    '+settings.text+'\
                </div>\
            </div>\
        </div>\
    ');
    if( settings.more_link || settings.close_show )
    {
        document.querySelector('.ilovecookies__inner').insertAdjacentHTML('beforeend','<div class="ilovecookies__buttons"></div>');
    }
    if( settings.more_link )
    {
        // if relative link is used
        if( settings.more_link.indexOf('http') === -1 )
        {
            settings.more_link = window.location.protocol+'//'+window.location.host+'/'+settings.more_link;
        }
        document.querySelector('.ilovecookies__buttons').insertAdjacentHTML('beforeend','<a href="'+settings.more_link+'" class="ilovecookies__more">'+settings.more_text+'</a>');
    }
    if( settings.close_show )
    {
        document.querySelector('.ilovecookies__buttons').insertAdjacentHTML('beforeend','<a href="#" class="ilovecookies__close">'+settings.close_text+'</a>');
    }
    document.querySelector('.ilovecookies__close').addEventListener('click', function(e)
    {
        document.querySelector('.ilovecookies').classList.add('ilovecookies--fadeout');
        setTimeout(function()
        {
            var el = document.querySelector('.ilovecookies');
            el.parentNode.removeChild(el);
        },1000);
        var d = new Date(); d.setTime(d.getTime() + (settings.expiration*24*60*60*1000));
        var expires = d.toUTCString();
        document.cookie = 'ilovecookies' + "=" + 'true' + "; " + "expires=" + expires + "; path=/";
        e.preventDefault();
    }, false);

});