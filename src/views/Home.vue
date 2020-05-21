<template>
	<div id="home">
		<div class="container">
			<HomeHeader/>
			<Chat/>
			<HomeFooter/>
		</div>
	</div>
</template>

<script>
	import HomeHeader from '@/components/Home/Header.vue'
	import Chat from '@/components/UI/Chat/Chat.vue'
	import HomeFooter from '@/components/Home/Footer.vue'

	export default {
		components: {
			HomeHeader,
			Chat,
			HomeFooter
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

			@media (max-width: 1390px) {
				max-width: 991px;
			}
		}
	}

</style>