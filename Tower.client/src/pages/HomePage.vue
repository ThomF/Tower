<template>
  <div class="container">
    <div class="row">
      <div class="col-12 ">
        <div class="bg-banner"></div>
        <!-- <img class="image-banner img-fluid"
          src="https://images.unsplash.com/photo-1519750157634-b6d493a0f77c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
          alt="Image of seating"> -->
      </div>
    </div>
    <div class="row">
      <div class="col-3" v-for="e in events">
        <Event :event="e" />

      </div>
    </div>
  </div>
</template>

<script>
import Pop from '../utils/Pop';
import { eventsService } from '../services/EventsService.js'
import { onMounted, computed } from 'vue';
import { AppState } from '../AppState';
import Event from '../components/Event.vue'

export default {
  setup() {
    async function getAllEvents() {
      try {
        await eventsService.getAllEvents()
      } catch (error) {
        Pop.error(error, 'Getting all Events')
      }
    }

    onMounted(() => {
      getAllEvents()
    })
    return {
      events: computed(() => AppState.events),

      account: computed(() => AppState.account)

    };
  },
  components: { Event }
}
</script>

<style scoped lang="scss">
// .bg-banner {
//   background-image: src('https://images.unsplash.com/photo-1519750157634-b6d493a0f77c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80');
// }
</style>
