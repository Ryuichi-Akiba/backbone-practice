var app = app || {};

app.BookView = Backbone.View.extend({

    tagName: 'div',
    className: 'bookContainer',
    template: _.template($('#bookTemplate').html()),

    events: {
        'click .delete': 'deleteBook'
    },
    
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));

        return this;
    },

    deleteBook: function() {
        // モデルを削除します
        this.model.destroy();
        // ビューを削除します
        this.remove();
    }
    
});
