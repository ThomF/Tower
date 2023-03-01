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
            <div class="col-10">
              <b>{{ event.capacity }}</b>
            </div>
            <div class="col-2">
              <button class="btn btn-warning mdi mdi-human text-center">
                Attend
              </button>
            </div>
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
import { eventsService } from '../services/EventsService';
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


    watchEffect(() => {
      if (route.params.eventId) {
        getEventById()
      }
    })

    return {
      event: computed(() => AppState.event)
    }
  }
}
</script>

<style lang="scss" scoped></style>