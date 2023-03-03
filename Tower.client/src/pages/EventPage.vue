<template>
  <div v-if="event">
    <div class="container-fluid">
      <!-- FIXME DATE DATE DATE -->
      <div class="row" v-if="event.isCanceled">
        <div class="div">
          <h1 class="bg-danger">CANCELED</h1>
        </div>
      </div>
      <div class="row d-flex backgroundCover">
        <div class="col-4">
          <img class="img-fluid" :src="event.coverImg" alt="">
        </div>
        <div class="col-8">
          <div class="row">
            <div class="col-10">
              <h4>{{ event.type }}</h4>
              <h1>{{ event.name }}</h1>
              <b>{{ event.location }}</b>
            </div>
            <div class="col-2">
              {{ event.startDate }}
            </div>
          </div>
          <p class="mt-3">{{ event.description }}</p>
          <div class="row">
            <div class="col-10 d-flex">
              <h6>Capacity</h6>
              <b class="ms-2" v-if="event.capacity > 0">{{ event.capacity }}</b>
              <b class="ms-2" v-else="event.capacity <= 0">SOLD OUT</b>
            </div>
            <div v-if="event.capacity > 0" class="col-2">
              <button v-if="!myTicket && !event.isCanceled" @click="createTicket()"
                class="btn btn-warning mdi mdi-human text-center">
                Attend
              </button>
              <button v-if="myTicket" @click="removeTicket(myTicket.id)"
                class="btn btn-warning mdi mdi-human text-center">
                Leave
              </button>
            </div>
            <div v-else="event.capacity <= 0">SoldOut</div>
          </div>
        </div>
      </div>
      <!-- NOTE images of people attending -->
      <div class="row mt-2">
        <div class="col-12">
          <h3>See Who is Attending!</h3>
          <div class="border rounded my-3 d-flex">
            <div v-for="t in ticket">
              <img class="img-fluid round-img" :src="t.profile.picture" :alt="t.name" :title="t.profile.name">
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col4"></div>
        <div class="col4">
          <h1>Comments</h1>
          <form v-if="account.id" @submit.prevent="createComment()">
            <div class="form-group">
              <label for="body">Share your thoughts!</label>
              <textarea v-model="editable.body" required class="form-control" id="body" rows="3"></textarea>
            </div>
            <div class="modal-footer">
              <button type="submit" class="btn btn-dark">Comment</button>
            </div>
          </form>
        </div>
        <div class="col4"></div>
      </div>

      <div class="row">
        <div v-for="c in comments" class="col-12">
          <div class="card my-2">
            <div class="card-body elevation-5 text-dark d-flex">
              <div class="col-1 justify-content-end">
                <button @click="deleteComment(c.id)" v-if="account.id == c.creatorId" class="btn btn-danger-outline">
                  <h5 class="mdi mdi-delete-variant" aria-label="deleteComment"></h5>
                </button>
              </div>
              <div class="row">
                <div class="col-2">
                  <img :src="c.picture" alt="" :title="c.name">
                </div>
              </div>
              <p>{{ c.name }}</p>
              <p class="ms-3"> {{ c.body }}</p>
            </div>

          </div>
        </div>
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
import { watchEffect, computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { AppState } from '../AppState';
import { Account } from '../models/Account';
import { eventsService } from '../services/EventsService';
import { ticketService } from '../services/TicketService';
import { commentService } from '../services/CommentService';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';

export default {

  setup() {

    const route = useRoute()
    const router = useRouter()
    const editable = ref({})

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

    async function getCommentsByEvent() {
      try {
        const eventId = route.params.eventId
        await commentService.getCommentsByEvent(eventId)
      } catch (error) {
        logger.error(error)
        Pop.error(error.message)
      }
    }

    watchEffect(() => {
      if (route.params.eventId) {
        getEventById();
        getTicketHolders();
        getCommentsByEvent();
      }
    })

    return {
      editable,
      route,
      event: computed(() => AppState.event),
      ticket: computed(() => AppState.tickets),
      account: computed(() => AppState.account),
      comments: computed(() => AppState.comments),
      myTicket: computed(() => AppState.tickets.find(t => t.accountId == AppState.account.id)),


      async createTicket() {
        try {
          await ticketService.createTicket({ eventId: route.params.eventId })
        } catch (error) {
          logger.error(error)
          Pop.error(error.message)
        }
      },
      async removeTicket(ticketId) {
        try {
          if (await Pop.confirm('Are You Sure You Want To Cancel Your Ticket?')) {
            await ticketService.removeTicket(ticketId)
          }
        } catch (error) {
          Pop.error(error.message)
          logger.log(error)
        }
      },

      async createComment() {
        try {

          const commentData = editable.value
          commentData.eventId = route.params.eventId
          await commentService.createComment(commentData)
          editable.value = {}
        } catch (error) {
          logger.error(error)
          Pop.error(error.message)
        }
      },
      async deleteComment(commentId) {
        try {
          if (await Pop.confirm()) {
            await commentService.delete(commentId)
            Pop.success('Deleted Comment')
          }
        } catch (error) {
          Pop.error(error, 'failed to delete')
        }
      },
    }
  }
}
</script>

<style lang="scss" scoped>
.frosted {
  box-shadow: 0 0 5px 0;
  background: inherit;
  backdrop-filter: blur(80px);
  /* margin: 100px; */
}

.round-img {
  height: 75px;
  border-radius: 50%;
  padding: 5px;
}
</style>