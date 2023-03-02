<template>
    <div class="modal fade" id="eventModal" tabindex="-1" aria-labelledby="Add Event Modal" aria-hidden="true">
        <div class="modal-dialog">
            <slot></slot>
        </div>
    </div>
</template>


<script>
export default {
    setup() {
        return {}
    }
}
</script>


<style lang="scss" scoped></style>