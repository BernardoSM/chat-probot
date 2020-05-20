<template>
	<div id="home">
		<div class="container">
			<div class="header">
				<div class="logo">
					<img src="@/assets/logo.png" alt="Logo">
				</div>
				<div class="company">
					Atendimento da empresa
				</div>
			</div>
			<div class="chat">
				<div class="messages">
					
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
			<div class="footer">
				Probot messenger
			</div>
		</div>
	</div>
</template>

<script>
	import VEmojiPicker from 'v-emoji-picker';

	export default {
		components: {
			VEmojiPicker
		},
		data() {
			return {
				picker: false,
				focused: false,
				inputSize: 0,
				message: ''
			}
		},
		methods: {
			selectEmoji(emoji) {
				document.querySelector('.fake-textarea').innerText = document.querySelector('.fake-textarea').innerText + emoji.data
				this.message = document.querySelector('.fake-textarea').innerText
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
		    }
		}
	}
</script>

<style lang="scss">
	#home {
		width: 100%;
		height: 100vh;
		background: $white-secondary;

		&:before {
			content: '';
			width: 100%;
			background: $primary;
			height: 20%;
			display: block;
			position: absolute;
			top: 0;
			left: 0;
		}

		.container {
			width: 100%;
			max-width: 1390px;
			height: 100%;
			margin: 0 auto;
			position: relative;
		}
	}

	.header {
		display: flex;
		justify-content: space-between;
		padding-top: 52px;
		margin-bottom: 18px;
		max-height: 40px;

		.logo {
			img {
				height: 40px;
				width: auto;
			}
		}

		.company {
			font-weight: $bold;
			font-size: 24px;
			line-height: 33px;
			color: $white;
		}
	}

	.chat {
		height: calc(100vh - 171px);
		background: $white;
		border-radius: 20px;
		position: relative;
		box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.15);

		.input {
			position: absolute;
			bottom: 0;
			left: 0;
			width: calc(100% - 20px);
			background: $white-dark;
			min-height: 42px;
			height: auto;
			display: flex;
			align-items: flex-end;
			padding: 10px;
			border-bottom-right-radius: 20px;
			border-bottom-left-radius: 20px;

			.placeholder {
				font-weight: $regular;
				font-size: 14px;
				line-height: 19px;
				color: $gray;
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

				svg {
					font-size: 16px;
					color: $white;
				}
			}
		}
	}

	.footer {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 61px;
		width: 100%;
		font-weight: $regular;
		font-size: 18px;
		line-height: 21px;
		color: $gray-light;
		text-transform: uppercase;
	}
</style>