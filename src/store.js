import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const now = new Date()

export default new Vuex.Store({
  state: {
    socket: null,
    user: {
      id: 1,
      name: "nDanshin"
    },
    currentRoomId: 1,
    rooms: [
      {
        id: 1,
        name: 'Main',
        img: '../assets/2.png',
        messages: [
          {
            content: 'Hello i am the 1st message in 1st room',
            date: now,
            self: false
          }
        ]
      },
      {
        id: 2,
        name: 'Room2',
        img: '../assets/2.png',
        messages: [
          {
            content: 'Hello2',
            date: now,
            self: true
          }
        ]
      }
    ]
  },
  getters: {
    currentRoom (state) {
      return state.rooms.find(room => room.id === state.currentRoomId)
    }
  },
  mutations: {
    InitData (state) {
      let data = localStorage.getItem('vue-chat-session');
      if (data) {
        state.rooms = JSON.parse(data)
      }
    },
    SelectRoom (state, id) {
      state.currentRoomId = id
    },
    SignupUser (state, user) {
      state.user.id = user.id
      state.user.name = user.name
    },
    ConnectWS (state, socket) {
      state.socket = socket
    },
    RecieveMessage (state, message) {
      let room = state.rooms.find(item => item.id === message.roomId)
      room.messages.push({
        userId: message.userId,
        content: 'user: ' + message.userId + ' Content: ' + message.content,
        date: new Date(),
        self: state.user.id === message.userId
      })
    }
  },
  actions: {
    InitData (context) {
      console.log(1)
      if (!context.state.socket) {
        context.dispatch('JoinRoom', 1)
        .then(() => context.dispatch('JoinRoom', 2))
        .then(() => context.dispatch('ConnectWS'))
      }
    },
    SignupUser (context, user) {
      return new Promise((resolve, reject) => {
        axios({url: 'http://localhost:8081/users', data: user, method: 'POST'})
        .then(resp => {
          context.commit('SignupUser', { id: resp.data.id, name: resp.data.userName })
          resolve(resp)
        })
        .then(() => context.dispatch('JoinRoom', 1))
        .then(() => context.dispatch('JoinRoom', 2))
        .catch(err => reject(err))
      })
    },
    SendMessage (context, content) {
      return new Promise((resolve, reject) => {
        let message = {
          user: context.state.user.id,
          room: context.state.currentRoomId,
          content: content
        }
        axios({url: 'http://localhost:8081/messages', data: message, method: 'POST'})
        .then(resp => resolve(resp))
        .catch(err => reject(err))
      })
    },
    JoinRoom (context, roomId) {
      return new Promise((resolve, reject) => {
        let url = 'http://localhost:8081/rooms/users/' + roomId + '/' + context.state.user.id 
        axios({url: url, data: {}, method: 'PUT'})
        .then(resp => resolve(resp))
        .catch(err => reject(err))
      })
    },
    ConnectWS (context) {
      if ( context.state.socket ) {
        context.state.socket.close()
        context.state.socket = null
      }
      var socket = new WebSocket("ws://localhost:8081/ws/" + context.state.user.id)
      socket.onopen = function () { 
        alert('Connection establish')
      }
      socket.onclose = function(event) {
        if (event.wasClean) {
          alert('Connection closed clean')
        } else {
          alert('Disconnection')
        }
        alert('Code: ' + event.code + ' Reason: ' + event.reason)
      }
      socket.onmessage = function(event) {
        context.commit('RecieveMessage', JSON.parse(event.data))
      }
      socket.onerror = function(error) {
        alert('Error: ' + error.message)
      }
      context.commit('ConnectWS', socket)
    }
  }
})
