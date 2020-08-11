Vue.component('draggable',vuedraggable);

var app = new Vue({
    el: "#app",
    data: {
        message: "hello, world!",
        todoList: [
            { done: false, text: "Do this" },
            { done: false, text: "Then this" },
            { done: false, text: "And finally, this" }
        ],
        editing: -1,
        myArray: [{id: 1, name: "hello"}, {id: 2, name: "world"}, {id:3, name: "obbinton"}]
    },
    mounted() {
        if (localStorage.getItem("todoList")) {
            try {
                this.todoList = JSON.parse(localStorage.getItem("todoList"));
            } catch (e) {
                // Data is corrupt, burn it all!
                localStorage.removeItem("todoList");
            }
        }
    },
    methods: {
        reverseTodos: function() {
            this.todoList = this.todoList.reverse()
        },
        focusField(n) {
            this.editing = n
        },
        addItem: function() {
            todoField = document.getElementById('todoInput')
            if (todoField.value.length > 0) {
                this.todoList.push({ done: false, text: todoField.value});
                todoField.value = "";
                this.saveList();
            }
        },
        removeItem(n) {
            this.todoList.splice(n, 1);
            this.saveList();
        },
        saveList: function() {
            const parsed = JSON.stringify(this.todoList);
            localStorage.setItem("todoList", parsed);
        }
    }
})
