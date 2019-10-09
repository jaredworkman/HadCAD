<template>
<div class="profile">
  <v-container>
    <v-layout column justify-center>
			<!-- Profile Section -->
      <v-flex>
        <v-card id='profile-card' class='tertiary--text text-xs-center ma-2'>
					<v-layout row>
						<v-flex>
							<v-responsive class='pt-4'>
								<v-avatar size='100' class='white'>
									<img :src='user.avatar'>
								</v-avatar>
							</v-responsive>
							<v-card-text>
								<div class="subheading">{{ member.name }}</div>
							</v-card-text>
                        </v-flex>
						<v-flex class='text-xs-left my-auto mr-3'>
							<div class="caption grey--text" left>Hours Worked: {{projectTime}}</div>
                        </v-flex>
                    </v-layout>
                    <h3 class='ml-3 my-2 font-weight-medium' v-if='task.timeSubmissions.length > 0'>Time Submissions</h3>
                    <v-divider></v-divider>
                    <v-layout
                        v-for='sub in task.timeSubmissions'
                        :key='sub.id'
                            >
                    <v-flex>
                        <TimeSub :sub='sub'/>
                    </v-flex>
                    </v-layout>
                    <h3 class='ml-3 my-2 font-weight-medium' v-if='task.expenseSubmissions.length > 0'>Expense Submissions</h3>
                    <v-divider></v-divider>
                    <v-layout
                        v-for='sub in task.expenseSubmissions'
                        :key='sub.id'
                        row wrap
                    > 
                    <v-flex>
                        <ExpenseSub :sub='sub'/>
                    </v-flex>
                    </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</div>
</template>

<script>
export default {
	data() {
		return {
			user: {
				name: 'Connor Lindsey',
				role: 'Developer',
				avatar: '/avatar-1.png',
			},
			title: '',
			email: '',
			originalPassword: '',
			newPassword: '',
			creditName: '',
			CreditCard: '',
			color: this.$vuetify.theme.primary
		}
	},
	methods: {
		setColor () {
			this.$vuetify.theme.primary = this.color;
		}
	}
}
</script>
