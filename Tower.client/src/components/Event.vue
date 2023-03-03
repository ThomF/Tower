<template>
    <router-link class="text-dark selectable" :to="{ name: 'Event', params: { eventId: event.id } }">
        <div class="card">
            <img :src="event.coverImg" alt="{{ event.name }}">
            <div class="card-body">
                <h6>{{ event.name }}</h6>
                <p>{{ event.description }}</p>
                <span>{{ event.capacity }}</span>
            </div>
            <div v-if="event.isCanceled" class="bg-danger rounded">CANCELED</div>
        </div>
    </router-link>
</template>


<script>
import { computed } from 'vue';
import { AppState } from '../AppState';
import { Event } from '../models/Event.js'

export default {
    props: {
        event: { type: Event, required: true }
    },
    setup() {
        return {
            // event: computed(() => AppState.event)
        };
    },
}
</script>


<style lang="scss" scoped></style>