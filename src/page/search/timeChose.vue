<template>
	<div class="timeChose">
		<nut-calendar 
			:is-visible="isVisible3" 
			:default-value="date3" 
			type="range" 
			:start-date="null" 
			:end-date="null"
			:animation="`nutSlideUp`" 
			@close="switchPicker('isVisible3')" 
			@choose="setChooseValue3">
		</nut-calendar>
	</div>
</template>

<script>
	export default {
		name: 'timeChose',
		data() {
			return {
				date3: null,
				isVisible3: false,
			}
		},
		components: {},
		mounted() {

		},
		methods: {
			switchPicker(param) {
				this[`${param}`] = !this[`${param}`];
			},
			setChooseValue3(param) {
				this.date3 = [...[param[0][3], param[1][3]]];
			}
		},
		computed: {

		},
		watch: {

		}
	}
</script>

<style scoped="scoped" lang="scss">
	.timeChose {}
</style>
