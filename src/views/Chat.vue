<template>
  <div class="chat">
    <div class="sidebar">
      <Room/>
    </div>
    <div class="main">
      <Message/>
      <TextInput/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Room from '@/components/Room.vue'
import Message from '@/components/Message.vue'
import TextInput from '@/components/TextInput.vue'

export default {
  name: 'chat',
  components: {
    Room, Message, TextInput
  }
}
</script>

<style lang="less" scoped>
.chat {
    margin: 20px auto;
    width: 800px;
    height: 600px;

    overflow: hidden;
    border-radius: 3px;

    .sidebar, .main {
        height: 100%;
    }
    .sidebar {
        float: left;
        width: 200px;
        color: #f4f4f4;
        background-color: #2e3238;
    }
    .main {
        position: relative;
        overflow: hidden;
        background-color: #eee;
    }
    .text-input {
        position: absolute;
        width: 100%;
        bottom: 0;
        left: 0;
    }
    .message {
        height: ~'calc(100% - 80px)';
    }
}
</style>