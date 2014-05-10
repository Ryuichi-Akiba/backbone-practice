var app = app || {};

// Todoコレクション
// --------------

// バックエンドとして、リモートのサーバではなくlocalStorageを利用する
var TodoList = Backbone.Collection.extend({

    model: app.Todo,

    localStorage: new Backbone.LocalStorage('todos-backbone'),

    // 完了済の項目だけをフィルタリングして返す
    completed: function() {
        return this.filter(function(todo) {
            return todo.get('completed');
        });
    },

    // 未了の項目だけをフィルタリングして返す
    remaining: function() {
        return this.without.apply(this, this.completed());
    },

    // 次に作成されるTodo項目の連番を返す
    nextOrder: function() {
        if (!this.length) {
            return 1;
        }
        return this.last().get('order') + 1;
    },

    comparator: function(todo) {
        return todo.get('order');
    }
    
});

// コレクションをグローバルに作成する
app.Todos = new TodoList();
