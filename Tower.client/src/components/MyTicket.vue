<template>
    <router-link class="text-dark selectable" :to="{ name: 'Event', params: { eventId: event.id } }">
        <div class="card">
            <!-- <img :src="event.coverImg" alt="{{ event.name }}"> -->
            <!-- <div v-for="t in myTicket" class="card-body">
                <Event :event="t" />
              
            </div> -->
            <div v-if="event.isCanceled" class="bg-danger rounded">CANCELED</div>
        </div>
    </router-link>
</template>


<script>
import { computed } from 'vue';
import { AppState } from '../AppState';
import { Event } from '../models/Event.js';


export default {
    props: {
        event: { type: Event, required: true }
    },
    setup() {
        return {
            myTicket: computed(() => AppState.tickets.find(t => t.eventId == AppState.event.id)),
        };
    },
}
</script>


<style lang="scss" scoped></style>