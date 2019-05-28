<template>
  <div class="text-input">
    <textarea placeholder="Press Ctrl + Enter to send" v-model="content" @keyup="onkeyup"></textarea>
  </div>
</template>

<script>
export default {
  name: 'TextList',
  data () {
    return {
      content: ''
    }
  },
  methods: {
    onkeyup (e) {
      if (e.ctrlKey && e.keyCode === 13 && this.content.length) {
        this.$store.dispatch('SendMessage', this.content)
        this.content = ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
.text-input {
    height: 80px;
    border-top: solid 1px #ddd;

    textarea {
        padding: 10px;
        height: 100%;
        width: 100%;
        border: none;
        outline: none;
        font-family: "Micrsofot Yahei";
        resize: none;
    }
}
</style>