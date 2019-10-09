<template>
<div class="team">
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm6 md4 lg3 v-for='(member, i) in members' :key='member'>
        <v-card class='tertiary--text text-xs-center ma-3' hover @click='handleClick(member)'>
          <v-responsive class='pt-4'>
            <v-avatar size='100' class='white'>
              <img :src='`/avatar-${(i + 1) % 6}.png`'>
            </v-avatar>
          </v-responsive>
          <v-card-text>
            <div class="subheading">{{ member }}</div>
            <div class="tertiary--text">Engineer</div>
          </v-card-text>
          <v-card-actions>
            <v-btn flat color='tertiary'>
              <v-icon small left>message</v-icon>
              <span>Message</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
	data() {
		return {
		}
  },
  computed: {
    ...mapState({
      group: state => state.groupMap[state.currentGroup],
      members: state => state.groupMap[state.currentGroup].members
    })
  },
  methods: {
    handleClick(member) {
      alert(`You selected ${member}. This will do something soon`)
    }
  }
}
</script>