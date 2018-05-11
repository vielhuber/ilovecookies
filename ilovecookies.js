'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var iLoveCookies = function () {
    function iLoveCookies(settings) {
        (0, _classCallCheck3.default)(this, iLoveCookies);

        var _this = this;
        _this.settings = settings;

        if (document.cookie !== undefined && document.cookie.indexOf('ilovecookies=true') > -1) {
            return true;
        }

        if (_this.settings.css === true) {
            _this.addCss();
        }

        var lang = 'de';
        if (document.documentElement.hasAttribute('lang') && document.documentElement.getAttribute('lang').substring(0, 2).toLowerCase() in _this.settings) {
            lang = document.documentElement.getAttribute('lang').substring(0, 2).toLowerCase();
        }

        document.body.insertAdjacentHTML('afterbegin', '\
            <div class="ilovecookies">\
                <div class="ilovecookies__inner">\
                    <div class="ilovecookies__text">\
                        ' + _this.settings[lang].text + '\
                    </div>\
                </div>\
            </div>\
        ');

        if ('more_text' in _this.settings[lang] || 'close_text' in _this.settings[lang]) {
            document.querySelector('.ilovecookies__inner').insertAdjacentHTML('beforeend', '<div class="ilovecookies__buttons"></div>');
        }

        if ('more_text' in _this.settings[lang]) {
            var more_link_render = _this.settings[lang].more_link;
            // if function is used
            if (typeof _this.settings[lang].more_link === 'function') {
                more_link_render = '#';
            }
            // if relative link is used
            else if (_this.settings[lang].more_link.indexOf('http') === -1) {
                    more_link_render = window.location.protocol + '//' + window.location.host + '/' + _this.settings[lang].more_link;
                }
            document.querySelector('.ilovecookies__buttons').insertAdjacentHTML('beforeend', '<a href="' + more_link_render + '" class="ilovecookies__more">' + _this.settings[lang].more_text + '</a>');
            if (typeof _this.settings[lang].more_link === 'function') {
                document.querySelector('.ilovecookies__more').addEventListener('click', function (e) {
                    _this.settings[lang].more_link();
                    e.preventDefault();
                }, false);
            }
        }

        if ('close_text' in _this.settings[lang]) {
            document.querySelector('.ilovecookies__buttons').insertAdjacentHTML('beforeend', '<a href="#" class="ilovecookies__close">' + _this.settings[lang].close_text + '</a>');
        }

        document.querySelector('.ilovecookies__close').addEventListener('click', function (e) {
            document.querySelector('.ilovecookies').classList.add('ilovecookies--fadeout');
            setTimeout(function () {
                var el = document.querySelector('.ilovecookies');
                el.parentNode.removeChild(el);
            }, 1000);
            var d = new Date();d.setTime(d.getTime() + _this.settings.expiration * 24 * 60 * 60 * 1000);
            var expires = d.toUTCString();
            document.cookie = 'ilovecookies' + "=" + 'true' + "; " + "expires=" + expires + "; path=/";
            e.preventDefault();
        }, false);
    }

    (0, _createClass3.default)(iLoveCookies, [{
        key: 'addCss',
        value: function addCss() {
            document.head.insertAdjacentHTML('beforeend', '\
        <style>\
            .ilovecookies\
            {\
                position: fixed;\
                bottom: 0;\
                left: 0;\
                right: 0;\
                background-color: rgba(0, 0, 0, 0.90);\
                color: #fff;\
                z-index:2147483647;\
                transition: transform 0.5s ease-in;\
                font-size:17px;\
                -webkit-transform: translateZ(0);\
                -moz-transform: translateZ(0);\
                transform: translateZ(0);\
            }\
            .ilovecookies--fadeout\
            {\
                transform: translateY(100%);\
                pointer-events:none;\
            }\
            .ilovecookies__inner\
            {\
                margin:0 auto;\
                width:95%;\
                max-width:1280px;\
                padding: 10px 0;\
            }\
            .ilovecookies__buttons\
            {\
                margin-top:15px;\
            }\
            .ilovecookies__buttons:after\
            {\
                clear:both;\
                display:table;\
                content:\'\';\
            }\
            .ilovecookies__buttons a\
            {\
                color:inherit;\
                text-decoration:none;\
                font-weight:bold;\
            }\
            .ilovecookies__more\
            {\
                float:left;\
            }\
            .ilovecookies__close\
            {\
                float:right;\
            }\
            @media screen and (max-width: 700px)\
            {\
                .ilovecookies\
                {\
                    font-size:14px;\
                }\
                .ilovecookies__buttons\
                {\
                    margin-top:10px;\
                }\
            }\
        </style>\
        ');
        }
    }]);
    return iLoveCookies;
}();

/* expose class to window for direct usage */


exports.default = iLoveCookies;
window.iLoveCookies = iLoveCookies;