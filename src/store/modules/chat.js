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
		sendMessage(state, payload) {
			const storedMessages = JSON.parse(localStorage.getItem('messages'))

			if(!Array.isArray(storedMessages)){
				storedMessages = []
			}

			storedMessages.push({
				'fakeId': payload.fakeId,
				'content': payload.message,
				'actor_type': 'user',
				'status': 'pending'
			})

			localStorage.setItem(
				'messages', 
				JSON.stringify(storedMessages)
			)

			this.commit('setMessages')
		},
		updateMessage(state, payload){
			let storedMessages = JSON.parse(localStorage.getItem('messages'))

			storedMessages.map(e => {
				if(e.fakeId === payload){
					return e.status = 'resolved'
				}
			})

			localStorage.setItem(
				'messages', 
				JSON.stringify(storedMessages)
			)

			this.commit('setMessages')
		},
		deleteMessage(state){
			let storedMessages = JSON.parse(localStorage.getItem('messages'))

			let filteredMessages = storedMessages.filter(e => e.status != 'pending')

			localStorage.setItem(
				'messages', 
				JSON.stringify(filteredMessages)
			)

			this.commit('setMessages')
		},
	},
	actions: {
		messagesRequest({commit, getters}) {

			const userData = getters.getUserData
			const storedMessages = getters.getMessages
			let lastMessage = storedMessages[storedMessages.length - 1]

			return new Promise((resolve, reject) => {

				if(typeof lastMessage === 'undefined' || lastMessage.status != 'pending'){
					Vue.prototype.$http.get(`/freshchat/${userData.conversation_id}/conversations`)
						.then(resp => {
							const messages = resp.data

							localStorage.setItem(
								'messages', 
								JSON.stringify(messages)
							)
							
							commit('setMessages')

							resolve(resp)
						}, err => {
							const messages = []

							localStorage.setItem(
								'messages', 
								JSON.stringify(messages)
							)
							
							commit('setMessages')

							resolve(reject)
						})
				}
				
			})
		},
		sendMessageRequest({commit, getters}, payload) {

			let userData = getters.getUserData

			const objectData = { 
				'chat_user_id': userData.chat_user_id,
				'content': payload,
				"conversationExists": userData.conversation_id.length > 0 ? true : false,
    			"id": userData.id
			}

			return new Promise((resolve, reject) => {

				Vue.prototype.$http.post(`/freshchat/conversations`, objectData)
					.then(resp => {
						userData.conversation_id = resp.data.conversation_id

						localStorage.setItem(
							'user-data', 
							JSON.stringify(userData)
						)

						commit('setUserData')

						resolve(resp)
					}, err => {

						reject(err)
					})

			})
		},
	}
}