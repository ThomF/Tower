<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <h1>My Events</h1>
        <div v-for="e in myEvents">
          <Event :event="e" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { eventsService } from '../services/EventsService'
import Pop from '../utils/Pop'
export default {
  setup() {
    async function getMyTickets() {
      try {
        await eventsService.getMyTickets()
      } catch (error) {
        Pop.error(error, 'what the?!')
      }
    }

    onMounted(() => {
      // getMyTickets()
    })
    return {
      account: computed(() => AppState.account),
      myEvents: computed(() => AppState.myTicket)
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
