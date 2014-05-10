var app = app || {};

// Todoモデル
// ---------

// Todo項目を表すモデルには、titleとcompletedそしてorderという3つの属性が含まれます
app.Todo = Backbone.Model.extend({

    defaults: {
        title: '',
        completed: false
    },

    // completed属性の値をトグルします
    toggle: function() {
        this.save({
            completed: !this.get('completed')
        });
    }
});
