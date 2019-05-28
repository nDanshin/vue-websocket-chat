import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const now = new Date()

export default new Vuex.Store({
  state: {
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
    }
  },
  actions: {
    SignupUser (context, user) {
      return new Promise((resolve, reject) => {
        axios({url: 'http://localhost:8080/users', data: user, method: 'POST'})
        .then(resp => {
          //let newUser = 
          context.commit('SignupUser', { id: resp.data.id, name: resp.data.userName })
          resolve(resp)
        })
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
        axios({url: 'http://localhost:8080/messages', data: message, method: 'POST'})
        .then(resp => resolve(resp))
        .catch(err => reject(err))
      })
    }
  }
})
