import Vue from 'vue'
import {getters} from '@/store/modules/chat'

export default {
	state: {
		messages: JSON.parse(localStorage.getItem('messages')) || []
	},
	getters: {
		getMessages: state => state.messages.reverse()
	},
	mutations: {
		setMessages(state) {
			state.messages = JSON.parse(localStorage.getItem('messages'))
		},
	},
	actions: {
		messagesRequest({commit, getters}) {

			const userId = getters.getUserId

			return new Promise((resolve, reject) => {
				Vue.prototype.$http.get(`/message/${userId}`)
					.then(resp => {
						const messages = resp.data

						localStorage.setItem(
							'messages', 
							JSON.stringify(messages)
						)

						commit('setMessages', messages)
					}, err => {

						resolve(reject)
					})
			})
		},
		sendMessageRequest({commit, getters}, message) {

			const userId = getters.getUserId

			return new Promise((resolve, reject) => {

				Vue.prototype.$http.post(`/message`, {
					'text': message,
					'user': userId
				})
					.then(resp => {
						console.log(resp)

						resolve(resp)
					}, err => {

						reject(err)
					})

			})
		},
		editMessageRequest({commit, getters}, payload) {

			const userId = getters.getUserId

			return new Promise((resolve, reject) => {

				Vue.prototype.$http.put(`/message`, {
					'_id': payload.messageIdEdit,
					'text': payload.message,
					'user': userId,
				})
					.then(resp => {
						console.log(resp)

						resolve(resp)
					}, err => {

						reject(err)
					})

			})
		},
		deleteMessageRequest({commit, getters}, messageid) {

			return new Promise((resolve, reject) => {

				Vue.prototype.$http.delete(`/message/${messageid}`)
					.then(resp => {
						console.log(resp)

						resolve(resp)
					}, err => {

						reject(err)
					})

			})
		},
	}
}