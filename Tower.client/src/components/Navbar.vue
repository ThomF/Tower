<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-3">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center">
        <img alt="logo" src="Global/tower.png" height="45" />
      </div>
    </router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
      aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto">
        <li>

        </li>
        <li>
          <button v-if="account.id" class="btn btn-tower ms-2" data-bs-toggle="modal" data-bs-target="#eventModal">
            <i class="mdi mdi-plus-box"></i>
            Add New Event
          </button>
        </li>
        <li>
          <button @click="cancelEvent(event.id)"
            v-if="account.id && route.name == 'Event' && event?.creatorId == account.id"
            class="btn btn-danger ms-2">Cancel
            Event</button>
        </li>
      </ul>
      <router-link :to="{ name: 'Account' }" class="btn text-success lighten-30 selectable text-uppercase">
        Account
      </router-link>
      <!-- LOGIN COMPONENT HERE -->
      <Login />
    </div>
  </nav>
</template>

<script>
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import { AppState } from '../AppState';
import Login from './Login.vue'
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
import { eventsService } from '../services/EventsService';
export default {
  setup() {
    const route = useRoute()
    return {
      route,
      account: computed(() => AppState.account),
      event: computed(() => AppState.event),

      async cancelEvent(eventId) {
        try {
          if (await Pop.confirm('You cant undo this cancel.')) {
            await eventsService.cancelEvent(eventId)
          }
        } catch (error) {
          logger.error(error)
          Pop.error(error.message)
        }
      }
    }
  },
  components: { Login }
}
</script>

<style scoped>
a:hover {
  text-decoration: none;
}

.btn-tower {
  background: #79E7AB;
}

.btn-tower:hover {
  background: #00e266;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

@media screen and (min-width: 768px) {
  nav {
    height: 64px;
  }
}
</style>
