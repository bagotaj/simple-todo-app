<template>
  <p class="right fontsize12">{{ todo.owner }}</p>
  <div class="divCenter" v-show="!showField('todoText')" @click="focusField('todoText')">
    <p class="p90" v-html="urlMatcherInTodo(todoInputFields.todoText)"></p><span class="span10" @click="focusField('todoText')">+</span>
  </div>
  <div class="divCenter" v-show="showField('todoText')" @focus="focusField('todoText')" @blur="blurField">
      <input class="p90" type="text" v-model="todoInputFields.todoText" /><span class="span10del" @click="blurField">+</span>
  </div>
  <div class="divCenter" v-show="!showField('link')">
    <a :href="todo.link" target="_blank" class="p90">{{ checkSnippetURLlength }}</a><span class="span10" @click="focusField('link')">+</span>
  </div>
  <div class="divCenter" v-if="checkSnippetURLlength" v-show="showField('link')" @focus="focusField('link')" @blur="blurField">
      <input class="p90" type="text" v-model="todoInputFields.link" /><span class="span10del" @click="blurField">+</span>
  </div>
  <button @click="$store.commit('stopTimer', todo.id)" class="margin-top20" :class="{ stopped: $store.state.stopped[todo.id] }">Leállít</button>
  <button class="done margin-top20" @click="$store.dispatch('updateTodoField', {todoId: todo.id, task: { done: true }})">Kész</button>
</template>

<script>
export default {
    props: ['todo'],
    data() {
        return {
            todoInputFields : {
                todoText: this.todo.todo,
                link: this.todo.link
      },
            editField : ''
        }
    },
    methods: {
        focusField(fieldName){
            this.editField = fieldName;
        },
        blurField(){
            let keyName = this.editField === 'todoText' ? 'todo' : 'link';
            let sendingData = {todoId: this.todo.id, task: {[keyName]: this.todoInputFields[this.editField]}};
            this.$store.dispatch('updateTodoField', sendingData);
            this.urlMatcherInTodo(this.todoInputFields.todoText);
            this.editField = '';
        },
        showField(fieldName){
            return (this.todoInputFields[fieldName] == '' || this.editField == fieldName)
        },
        URLMaker(match) {
            return `<a href="${match}" target="_blank">${match.substring(0, 40) + '...'}</a>`
        },
        urlMatcherInTodo(todoText) {
            const URLMatcher = new RegExp('(?:(?:https?|ftp|file)://|www.|ftp.)(?:([-A-Z0-9+&@#/%=~_|$?!:,.]*)|[-A-Z0-9+&@#/%=~_|$?!:,.])*(?:([-A-Z0-9+&@#/%=~_|$?!:,.]*)|[A-Z0-9+&@#/%=~_|$])', 'igm');
            return todoText.replace(URLMatcher, match => this.URLMaker(match))
        },
    },
    mounted() {
        this.$store.dispatch('setTimeout', {todo: this.todo.todo, todoId: this.todo.id});
    },
    computed: {
        snippetURL() {
            return this.todo.link.substring(0, 40) + '...'
        },
        checkSnippetURLlength() {
            return this.snippetURL.length > 3 ? this.snippetURL : '';
        }
    },
    unmounted() {
        this.$store.commit('stopTimer', this.todo.id);
    }
}
</script>

<style>
    .divCenter {
        display: flex;
        align-items: center;
    }
    p {
        white-space: pre-wrap;
        letter-spacing: 1px;
    }
    .p90 {
        width: 90%;
        display: inline-block;
    }
    input.p90 {
        background: #f4f4f4;
    }
    .span10 {
        width: 10%;
        font-weight: bold;
        cursor: pointer;
    }
    .span10:hover {
        transform: rotate(45deg);
        color: #FF3E24;
    }
    .span10del {
        width: 10%;
        color: #FF3E24;
        font-weight: bold;
        transform: rotate(45deg);
        cursor: pointer;
    }
    .span10del:hover {
        transform: rotate(0);
        color: #454545;
    }
    .stopped {
        pointer-events: none;
        opacity: 0.3;
    }
    .done {
        background: #FF3E24;
    }
    .done:hover {
        background: #FF3E24;
        opacity: 70%;
    }
    .right {
        display: flex;
        justify-content: end;
    }
    .fontsize12 {
        font-size: 12px;
    }
</style>