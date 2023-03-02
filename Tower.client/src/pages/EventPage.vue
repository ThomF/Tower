<template>
  <div v-if="event">
    <div class="container-fluid">

      <div class="row d-flex backgroundCover">
        <div class="col-4">
          <img class="img-fluid" :src="event.coverImg" alt="">
        </div>
        <div class="col-8">
          <h1>{{ event.name }}</h1>
          <p>{{ event.description }}</p>
          <div class="row">
            <div class="col-10 d-flex">
              <h6>Capacity</h6>
              <b class="ms-2">{{ event.capacity }}</b>
            </div>
            <div class="col-2">
              <button @click="createTicket()" v-if="!myEvents" :disabled="event.isCanceled"
                class="btn btn-warning mdi mdi-human text-center">
                Attend
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- NOTE images of people attending -->
      <div class="row">
        <div class="col-12">
          <div v-for="t in ticket">
            <img class="img-fluid" :src="t.picture" :alt="t.name" :title="t.name">
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { watchEffect, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { AppState } from '../AppState';
import { Account } from '../models/Account';
import { eventsService } from '../services/EventsService';
import { ticketService } from '../services/TicketService';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';

export default {
  setup() {

    const route = useRoute()
    const router = useRouter()

    async function getEventById() {
      try {
        const eventId = route.params.eventId
        await eventsService.getEventById(eventId)
      } catch (error) {
        Pop.error('How did we get here?')
        router.push('/')
      }
    }

    async function getTicketHolders() {
      try {
        const eventId = route.params.eventId
        await ticketService.getTicketHolders(eventId)
      } catch (error) {
        logger.error(error)
        Pop.error(message.error)
      }
    }

    watchEffect(() => {
      if (route.params.eventId) {
        getEventById();
        getTicketHolders();
      }
    })

    return {
      event: computed(() => AppState.event),
      ticket: computed(() => AppState.tickets),
      account: computed(() => AppState.account),
      comments: computed(() => AppState.comments),
      myEvents: computed(() => AppState.myEvents),


      async createTicket() {
        try {
          await ticketService.createTicket({ eventId: route.params.eventId })
        } catch (error) {
          logger.error(error)
          Pop.error(error.message)
        }
      }


    }
  }
}
</script>

<style lang="scss" scoped></style>