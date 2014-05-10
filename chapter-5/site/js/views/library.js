var app = app || {};

app.LibraryView = Backbone.View.extend({

    el: '#books',

    events: {
        'click #add': 'addBook'
    },
    
    initialize: function(initialBooks) {
        this.collection = new app.Library(initialBooks);
        this.render();
        this.listenTo(this.collection, 'add', this.renderBook);
    },

    // コレクション内のそれぞれの本について描画処理を呼び出し、リスト全体を表現します
    render: function() {
        this.collection.each(function(item) {
            this.renderBook(item);
        }, this);
    },

    // BookViewを使い、個々の本を描画します。生成された要素はリストのDOMに追加されます
    renderBook: function(item) {
        var bookView = new app.BookView({
            model: item
        });
        this.$el.append(bookView.render().el);
    },

    addBook: function(e) {
        e.preventDefault();

        var formData = {};

        $('#addBook div').children('input').each(function(i, el) {
            if($(el).val() != '') {
                formData[el.id] = $(el).val();
            }
        });

        this.collection.add(new app.Book(formData));
    }
    
});
