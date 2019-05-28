<template>
  <div class="room">
    <ul>
        <li v-for="item in this.$store.state.rooms" :class="{ active: item.id === currentId() }" @click="selectRoom(item.id)">
            <img class="avatar"  width="30" height="30" :alt="item.name" src="../assets/2.png">
            <p class="name">{{item.name}}</p>
        </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Room',
  
  methods: {
    selectRoom: function (id) {
      return this.$store.commit('SelectRoom', id)
    },
    currentId: function () {
      return this.$store.state.currentRoomId
    }
  }
}
</script>

<style scoped lang="less">
.room {
    li {
        padding: 12px 15px;
        border-bottom: 1px solid #292C33;
        cursor: pointer;
        transition: background-color .1s;
        list-style-type: none;

        &:hover {
            background-color: rgba(255, 255, 255, 0.03);
        }
        &.active {
            background-color: rgba(255, 255, 255, 0.1);
        }
    }
    .avatar, .name {
        vertical-align: middle;
    }
    .avatar {
        border-radius: 2px;
    }
    .name {
        display: inline-block;
        margin: 0 0 0 15px;
    }
}
</style>