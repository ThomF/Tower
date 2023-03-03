<template>
  <div v-if="events" class="container-fluid">
    <div class="row">
      <div class="col-12 home-banner">
        <img class=" home-banner"
          src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
          alt="Image of seating">
      </div>
    </div>
    <div class="row">

      <div class="">
        <div class="rounded justify-content-around text-center w-bav">
          <button @click="changeFilter('')" class="btn btn-outline">All</button>
          <button @click="changeFilter('convention')" class="btn btn-outline">Convention</button>
          <button @click="changeFilter('concert')" class="btn btn-outline">Concert</button>
          <button @click="changeFilter('sport')" class="btn btn-outline">sport</button>
          <button @click="changeFilter('digital')" class="btn btn-outline">Digital</button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-3 mt-2" v-for="e in events">
        <Event :event="e" />

      </div>
    </div>
  </div>
  <div v-else class="text-light text-center p-5">
    <h1 class="display-1">
      <i class="mdi mdi-music mdi-spin"></i><i class="mdi mdi-earth mdi-spin"></i><i
        class="mdi mdi-microphone mdi-spin"></i><i class="mdi mdi-pinwheel mdi-spin"></i>
    </h1>
  </div>
</template>
  
<script>
import Pop from '../utils/Pop';
import { eventsService } from '../services/EventsService.js'
import { onMounted, computed, ref } from 'vue';
import { AppState } from '../AppState';
import Event from '../components/Event.vue'

export default {
  setup() {
    const filterCategory = ref('')
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
      events: computed(() => {
        if (!filterCategory.value) {
          return AppState.events
        }
        else {
          return AppState.events.filter(e => e.type == filterCategory.value)
        }
      }),
      account: computed(() => AppState.account),

      changeFilter(category) {
        filterCategory.value = category
      }

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

.w-bav {
  margin-top: 10px;
  margin-bottom: 10px;
  border: 2px solid rgb(0, 0, 0);
  background-color: #79E7AB;
}

.height-event {
  height: 20vh;
}
</style>
