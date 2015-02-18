modules.define('sssr', ['i-bem__dom', 'jquery', 'functions__debounce'], function(provide, BEMDOM, $, debounce) {

    provide(BEMDOM.decl(this.name, {
        onSetMod: {
            js: {
                inited: function() {
                    this.findBlockInside('form').on('submit change', this._doRequest, this);
                    this._debounceRequest = debounce(this._sendRequest, 500, this);
                }
            },
            loading: function(modName, modVal) {
                this.findBlockInside('spin').setMod('visible', modVal);
            }
        },

    _doRequest: function(e) {
        if (this.findBlockInside('form').isEmpty()) {
            return;
        }
        this.setMod('loading');
        e.type === 'change' ? this._debounceRequest(): this._sendRequest();
    },

    clear: function() {
        this._xhr && this._xhr.abort();
        this._updateContent('');
        this.delMod('loading');
    },

    _sendRequest: function() {
        this._xhr && this._xhr.abort();
        this._xhr = $.ajax({
            type: 'GET',
            dataType: 'html',
            cache: false,
            url: '/search/',
            data: this.findBlockInside('form').getVal(),
            success: this._onSuccess.bind(this)
        });
    },

    _onSuccess: function(result) {
        this.delMod('loading');
        this._updateContent(result);
    },

    _updateContent: function(html) {
        BEMDOM.update(this.elem('content'), html);
    }
}));
})
