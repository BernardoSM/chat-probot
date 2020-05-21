<template>
	<div class="footer">
		Probot messenger
	</div>
</template>

<script>
	export default {
		
	}
</script>

<style lang="scss" scoped>
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

		@media (max-width: 991px) {
			display: none;
		}
	}
</style>