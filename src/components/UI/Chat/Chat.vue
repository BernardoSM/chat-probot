<template>
	<div class="chat">
		<div class="messages">
			<Message v-for="(message, i) in messages" :key="i" :text="message.content" :isClerk="isClerk(message.actor_type)" :hasImage="hasImage(i)" :sended="getStatus(message.status)"/>
		</div>
		<div class="input" :class="'size-' + inputSize">
			<span v-if="!focused" class="placeholder">Digite uma mensagem</span>
			<div class="fake-textarea" contenteditable
				:class="{focused}"  
				@focus="textAreaFocus()"
				@focusout="textAreaFocusOut($event)"
				tabindex="1">
			</div>
			<div id="picker" 
				v-show="picker" 
				@focusout="pickerFocusOut()"
				tabindex="0">
				<VEmojiPicker @select="selectEmoji" />
			</div>
			<div class="emoji-button" @click="pickerFocus()">
				<font-awesome-icon :icon="['far', 'grin']" />
			</div>
			<div class="send-button" @click="sendMessage()">
				<font-awesome-icon icon="paper-plane" />
			</div>
		</div>
	</div>
</template>

<script>
	import VEmojiPicker from 'v-emoji-picker'
	import Message from '@/components/UI/Chat/Message.vue'

	export default {
		components: {
			VEmojiPicker,
			Message,
		},
		data() {
			return {
				picker: false,
				focused: false,
				inputSize: 0,
				message: ''
			}
		},
		computed: {
			messages() {
				return [
					{
						"id": 3335,
						"actor_type": "user",
						"message_type": "normal",
						"content": "Olá gostaria de saber do meu processo!",
						"status": "",
					},
					{
						"id": 3345,
						"actor_type": "agent",
						"message_type": "normal",
						"content": "Olá Usuário!",
						"status": "",
					},
					{
						"id": 3345,
						"actor_type": "agent",
						"message_type": "normal",
						"content": "Olá Usuário!",
						"status": "",
					},
					{
						"id": 3345,
						"actor_type": "agent",
						"message_type": "normal",
						"content": "Olá Usuário!",
						"status": "",
					},
					{
						"id": 3345,
						"actor_type": "agent",
						"message_type": "normal",
						"content": "Olá Usuário!",
						"status": "",
					},
					{
						"id": 3345,
						"actor_type": "agent",
						"message_type": "normal",
						"content": "Olá Usuário!",
						"status": "",
					},
					{
						"id": 3345,
						"actor_type": "agent",
						"message_type": "normal",
						"content": "Olá Usuário!",
						"status": "",
					},
					{
						"id": 3345,
						"actor_type": "agent",
						"message_type": "normal",
						"content": "Olá Usuário!",
						"status": "",
					},
					{
						"id": 3345,
						"actor_type": "agent",
						"message_type": "normal",
						"content": "Olá Usuário!",
						"status": "",
					},
					{
						"id": 3345,
						"actor_type": "agent",
						"message_type": "normal",
						"content": "Olá Usuário!",
						"status": "",
					},
					{
						"id": 3345,
						"actor_type": "agent",
						"message_type": "normal",
						"content": "Olá Usuário!",
						"status": "",
					},
					{
						"id": 3345,
						"actor_type": "agent",
						"message_type": "normal",
						"content": "Olá Usuário!",
						"status": "",
					},
					{
						"id": 3345,
						"actor_type": "agent",
						"message_type": "normal",
						"content": "Olá Usuário!",
						"status": "",
					},
					{
						"id": 3345,
						"actor_type": "agent",
						"message_type": "normal",
						"content": "Olá Usuário!",
						"status": "",
					}
				].reverse()
			}
		},
		methods: {
			selectEmoji(emoji) {
				document.querySelector('.fake-textarea').innerText = document.querySelector('.fake-textarea').innerText + emoji.data
				this.message = document.querySelector('.fake-textarea').innerText

				this.focused = true
			},
			pickerFocus() {
				this.picker = !this.picker
				setTimeout(() => {
					document.querySelector('#picker').focus()
				}, 100)
		    },
		    pickerFocusOut() {
		        this.picker = false
		    },
		    textAreaFocus() {
		    	this.focused = true
		    },
		    textAreaFocusOut(e) {
		    	this.message = e.target.innerText

		    	if(this.message.length === 0){
		    		this.focused = false
		    	}
		    },
		    sendMessage(){
		    	console.log(this.message)
		    },
		    isClerk(owner) {
				return owner === 'agent' ? true : false
			},
			hasImage(i) {
				let actor = this.messages[i].actor_type || ''
				let nextActor = ''

				if(typeof this.messages[i + 1] !== "undefined"){
					nextActor = this.messages[i + 1].actor_type || ''
				}
				

				return actor != nextActor ? true : false
			},
			sendMessage() {
				if(this.message.length > 0){

					this.fakeId++

					const {message, fakeId} = this

					this.$store.commit('sendMessage', {message, fakeId})

					// this.sendMessageRequest(this.message).then(resp => {
					// 	setTimeout(() => {
					// 		this.$store.commit('updateMessage', this.fakeId)
					// 	}, 2000)
							
					// }, err => {
					// 	this.openModal = true
					// 	this.$store.commit('deleteMessage')
					// })

					this.message = ''
				}
			},
			getStatus(status){
				return status != 'pending' ? true : false
			},
		}
	}
</script>

<style lang="scss" scoped>
	.chat {
		height: calc(100vh - 171px);
		background: $white;
		border-radius: 20px;
		position: relative;
		box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.15);
		display: flex;
		flex-flow: column;
		justify-content: space-between;

		@media (max-width: 991px) {
			border-radius: 0;
			height: calc(100vh - 53px);
		}

		.messages {
			font-family: $font;
			height: auto;
			padding: 0 20px;
			overflow-y: scroll;
			-webkit-overflow-scrolling: touch;
			display: flex;
			flex-flow: column;
			flex-direction: column-reverse;
			scroll-padding-top: 20px;
		}

		.input {
			width: calc(100% - 20px);
			background: $white-dark;
			min-height: 42px;
			height: auto;
			display: flex;
			align-items: flex-end;
			padding: 10px;
			border-bottom-right-radius: 20px;
			border-bottom-left-radius: 20px;
			position: relative;

			@media (max-width: 991px) {
				border-radius: 0;
			}

			.placeholder {
				font-weight: $regular;
				font-size: 14px;
				line-height: 19px;
				color: $gray-light;
				position: absolute;
				left: 31px;
    			top: 21px;
    			pointer-events: none;
			}

			.fake-textarea {
				width: 100%;
				background: $white;
				border: none;
				outline: 0;
				border-radius: 21px;
				font-weight: $regular;
				font-size: 14px;
				line-height: 19px;
				color: $gray;
				padding: 11px 21px;
				white-space: pre-wrap;
    			word-wrap: break-word;
    			cursor: text;
    			height: calc(100% - 20px);
    			max-height: 81px;
    			overflow-y: auto;

    			&.focused {
    				user-select: text;
    			}
			}

			#picker {
				position: absolute;
				bottom: 62px;
				right: 15px;
				outline: none;
			}

			.emoji-button {
				min-width: 42px;
				height: 42px;
				border-radius: 21px;
				display: flex;
				justify-content: center;
				align-items: center;
				background: $white-dark;
				cursor: pointer;
				margin: 0 10px;

				@media (max-width: 991px) {
					display: none;
				}

				&:hover {

					svg {
						color: $gray;
					}
				}

				svg {
					font-size: 22px;
					color: $gray-light;
				}
			}

			.send-button {
				min-width: 42px;
				height: 42px;
				border-radius: 21px;
				display: flex;
				justify-content: center;
				align-items: center;
				background: $primary;
				cursor: pointer;
				margin: 0 10px;

				svg {
					font-size: 16px;
					color: $white;
				}
			}
		}
	}
</style>