modules.define('form', ['i-bem__dom'], function(provide, BEMDOM) {

    provide(BEMDOM.decl(this.name, {
        onSetMod: {
            js: {
                inited: function() {
                    this.bindTo('submit', this._onSubmit);
                    this.findBlockInside('input').on('change', this._onChange, this);
                    BEMDOM.blocks.checkbox.on(this.domElem, 'change', this._onChange, this);
                }
            }
        },

        _onChange: function() {
            this.emit('change');
        },

        _onSubmit: function(e) {
            e.preventDefault();
            this.emit('submit');
        },

        getVal: function() {
            return this.domElem.serialize();
        },

        isEmpty: function() {
            return !this.findBlockInside('input').getVal().trim() ||
                this.findBlocksInside('checkbox').every(function(checkbox) {
                    return !checkbox.hasMod('checked');
                });
        }

    }));

});
