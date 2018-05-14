## installation

use it as a module:
```
npm install ilovecookies
```
```js
import iLoveCookies from 'iLoveCookies';
```

or embed it directly:
```html
<script src="ilovecookies.min.js"></script> 
```


## usage

```js
document.addEventListener('DOMContentLoaded', () =>
{
    let ilovecookies = new iLoveCookies({
        expiration: 30,
        css: true,
        de: {
            text: 'Um die Webseite optimal gestalten und fortlaufend verbessern zu können, verwenden wir Cookies. Durch die weitere Nutzung der Webseite stimmen Sie der Verwendung von Cookies zu.',
            close_text: 'Schließen',
            more_text: 'Weitere Informationen',
            more_link: 'datenschutz'
        },
        en: {
            text: 'To ensure that our web site is well managed and to facilitate improved navigation within the site, we may use cookies. By using this website, you agree to the use of cookies.',
            close_text: 'Close',
            more_text: 'Further information',
            more_link: function() { alert('foo'); }
        }
    });
});
```