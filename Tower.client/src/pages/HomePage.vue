<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 home-banner">
        <img class=" home-banner"
          src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
          alt="Image of seating">
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
.home-banner {

  background-image: url("https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80");
  object-fit: cover;
}
</style>
