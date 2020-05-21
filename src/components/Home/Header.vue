<template>
	<div class="header">
		<div class="logo">
			<img src="@/assets/logo.png" alt="Logo">
		</div>
		<div class="company">
			Atendimento da empresa
		</div>
	</div>
</template>

<script>
	export default {

	}
</script>

<style lang="scss" scoped>
	.header {
		display: flex;
		justify-content: space-between;
		padding-top: 52px;
		margin-bottom: 18px;
		max-height: 40px;

		@media (max-width: 991px) {
			padding: 10px 0;
			max-height: 100%;
			justify-content: center;
			margin: 0;
		}

		.logo {
			@media (max-width: 991px) {
				display: none;
			}

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

			@media (max-width: 991px) {
				font-size: 18px;
			}
		}
	}
</style>