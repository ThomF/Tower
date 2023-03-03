<template>
    <div class="modal-content bg-custom">
        <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">New Album</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form @submit.prevent="createEvent()">
            <div class="modal-body">
                <div class="mb-3">
                    <label for="name" class="form-label">Name of Event</label>
                    <input v-model="editable.name" required type="text" class="form-control" id="name"
                        aria-describedby="Name of Event">
                </div>
                <div class="mb-3">
                    <label for="description" class="form-label">Description</label>
                    <input v-model="editable.description" required type="text" class="form-control" id="description"
                        aria-describedby="Description">
                </div>
                <div class="mb-3">
                    <label for="location" class="form-label">Location</label>
                    <input v-model="editable.location" required type="text" class="form-control" id="location"
                        aria-describedby="Location">
                </div>
                <div class="mb-3">
                    <label for="capacity" class="form-label">Capacity</label>
                    <input v-model="editable.capacity" required type="text" class="form-control" id="capacity"
                        aria-describedby="Capacity">
                </div>
                <div class="mb-3">
                    <label for="startDate" class="form-label">Start Date</label>
                    <input v-model="editable.startDate" required type="date" class="form-control" id="startDate"
                        aria-describedby="StartDate">
                </div>
                <div class="mb-3">
                    <label for="coverImg" class="form-label">Cover Image</label>
                    <input v-model="editable.coverImg" required type="url" class="form-control" id="coverImg"
                        aria-describedby="Cover Image">
                </div>
                <label for="type" class="form-label">Type of Event</label>
                <select v-model="editable.type" class="form-select mb-3" aria-label="Select Event Type" id="type">
                    <option selected value="convention">Convention</option>
                    <option value="convention">Convention</option>
                    <option value="concert">Concert</option>
                    <option value="digital">Digital</option>
                    <option value="sport">Sport</option>
                </select>
            </div>
            <div class="modal-footer">
                <button type="reset" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Create Event!</button>
            </div>
        </form>
    </div>
</template>


<script>
import { ref } from 'vue';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { eventsService } from '../services/EventsService.js'
import { router } from '../router';

export default {
    setup() {
        const editable = ref({
            type: 'convention'
        })
        return {
            editable,
            async createEvent() {
                try {
                    const formData = editable.value
                    const eventId = await eventsService.createEvent(formData)
                    if (eventId) {
                        router.push({ name: 'Event', params: { eventId: eventId } })
                    }
                } catch (error) {
                    logger.error(error)
                    Pop.error(error.message)
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.bg-custom {
    background-color: #202A44;
}
</style>