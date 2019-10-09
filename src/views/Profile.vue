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
								<div class="subheading">{{ user.name }}</div>
								<div class="tertiary--text">{{ user.role }}</div>
							</v-card-text>
						</v-flex>
						<v-flex class='text-xs-left my-auto mr-3'>
							<div class="caption grey--text" left>Group</div>
							<div class="subheading">HadCAD Product Development</div>
							<div class="caption grey--text" left>Location</div>
							<div class="subheading">Provo, UT</div>
							<div class="caption grey--text" left>Skills</div>
							<div class="subheading">Vue.js | C++ | Solidworks</div>
						</v-flex>
					</v-layout>
        </v-card>
      </v-flex>
			<!-- Projects -->
			<v-flex class='ma-2'>
				<v-expansion-panel>
					<v-expansion-panel-content>
						<div slot='header' class='tertiary--text headline'>Projects</div>
						<v-card>
							<v-card-text>
								Sample text
							</v-card-text>
							<v-card-actions>
								<v-btn>Test</v-btn>
							</v-card-actions>
						</v-card>
					</v-expansion-panel-content>
				</v-expansion-panel>
			</v-flex>
			<!-- Groups -->
			<v-flex class='ma-2'>
				<v-expansion-panel>
					<v-expansion-panel-content>
						<div slot='header' class='tertiary--text headline'>Groups</div>
						<v-card>
							<v-card-text>
								This will list all of my groups. I'll be able to come in here, and see some data.
								This will let me jump to the group page, view my hours, etc.
							</v-card-text>
							<v-card-actions>
								<v-btn to='/team'>Go to Group</v-btn>
							</v-card-actions>
						</v-card>
					</v-expansion-panel-content>
				</v-expansion-panel>
			</v-flex>
			<!-- Settings -->
			<v-flex class='ma-2'>
				<v-card class='tertiary--text text-xs-center'>
					<v-expansion-panel>
						<v-expansion-panel-content>
							<div slot='header' class='tertiary--text headline'>Settings</div>
							<v-divider></v-divider>
							<v-card-text>
								<!-- Section -->
								<v-layout>
									<v-flex class='text-sm-left'>
										<h2 class='subheading font-weight-light'>Account</h2>
									</v-flex>
									<v-flex>
										<v-text-field label='Username' v-model='title' solo></v-text-field>
										<v-text-field label='Email' v-model='Email' solo></v-text-field>
									</v-flex>
								</v-layout>
								<v-divider></v-divider>
								
								<!-- Section -->
								<v-layout class='mt-3'>
									<v-flex class='text-sm-left'>
										<h2 class='subheading font-weight-light'>Billing</h2>
									</v-flex>
									<v-flex>
										<v-text-field label='Title' v-model='title' solo></v-text-field>
										<v-text-field label='Credit Card' v-model='CreditCard' solo></v-text-field>
									</v-flex>
								</v-layout>
								<v-divider></v-divider>

								<!-- Section -->
								<v-layout class='mt-3'>
									<v-flex class='text-sm-left'>
										<h2 class='subheading font-weight-light'>Password</h2>
									</v-flex>
									<v-flex>
										<v-text-field label='Old Password' v-model='title' solo></v-text-field>
										<v-text-field label='New Password' v-model='Client' solo></v-text-field>
									</v-flex>
								</v-layout>

							</v-card-text>
							<v-divider></v-divider>
							<v-card-actions>
								<v-spacer></v-spacer>
								<v-btn flat outline class='primary primary--text'>
									<v-icon left>person</v-icon>
									<span>Save Changes</span>
								</v-btn>
								<v-btn flat outline class='primary primary--text'>
									<v-icon left>lock</v-icon>
									<span>Reset Defaults</span>
								</v-btn>
							</v-card-actions>
						</v-expansion-panel-content>
					</v-expansion-panel>
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
				avatar: '/avatar-1.png'
			}
		}
	}
}
</script>

<style>
/* #profile-card {
	border: 1px solid #607D8B;
	border-radius: 10%;
} */
</style>
