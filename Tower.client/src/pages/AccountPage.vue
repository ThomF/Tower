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
      </div>
    </div>
    <div class="row">
      <div class="col-3" v-for="t in myTicket">
        <router-link class="text-dark selectable" :to="{ name: 'Event', params: { eventId: t.eventId } }">
          <div class="bg-dark border rounded mt-3 d-flex">
            <img class="biggie img-fluid" :src="t.event.coverImg" alt="{{ t.event.name }}">
            <div class="card-body">
              <h6>{{ t.event.name }}</h6>
              <span> Capacity {{ t.event.capacity }}</span>
            </div>
          </div>
          <div v-if="t.event.isCanceled" class="bg-danger rounded">CANCELED</div>

        </router-link>
      </div>
    </div>

  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { Event } from '../models/Event'
// import { ticketEvent } from '../models/Event'
import { eventsService } from '../services/EventsService'
import Pop from '../utils/Pop'
export default {
  setup() {
    async function getMyTickets() {
      try {
        await eventsService.getMyTickets();
      }
      catch (error) {
        Pop.error(error, "{what the?! cant get my tickets}");
      }
    }
    onMounted(() => {
      getMyTickets();
    });
    return {
      account: computed(() => AppState.account),
      myTicket: computed(() => AppState.myTicket)
    };
  },
  components: { Event }
}
</script>

<style scoped>
img {
  max-width: 100px;
}

.biggie {
  height: 200px;
}
</style>
