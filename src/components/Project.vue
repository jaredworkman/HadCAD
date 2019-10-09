<template>
<div>
	<v-toolbar
		color='white'
		tabs
		flat
	>
		<v-toolbar-title>Project Name</v-toolbar-title>
		<v-spacer></v-spacer>
		<v-btn icon>
			<v-icon>search</v-icon>
		</v-btn>
		<v-btn icon>
			<v-icon>more_vert</v-icon>
		</v-btn>
	</v-toolbar>
	<v-tabs
		slot='extension'
		v-model='active'
		slider-color='yellow'
		grow
	>
		<v-tab
			v-for='i in 5'
			:key='i'
		>
			Tag {{ i }}
		</v-tab>

		<v-tab-item
			v-for='i in 5'
			:key='i'
		>
			<v-card>
				<v-card-text><Task /></v-card-text>
			</v-card>
		</v-tab-item>
	</v-tabs>
</div>
</template>

<script>
import Task from '@/components/task.vue'

export default {
	components: {
    Task,
	},
	data() {
		return {
      active: null,
			text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
		}
	},
	methods: {

	}
}
</script>
