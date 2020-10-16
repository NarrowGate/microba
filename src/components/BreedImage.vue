<template>
    <div class="col-md-4 dog-tile" title="Click to remove image">
        <div class="card mb-4 shadow-sm">
        <img 
            :src="this.imgUrl" 
            @click="this.removeImgHandlr">
        </div>
    </div>
</template>

<script>
    export default {
        props: ['imgUrl', 'imgBreedName', 'imgIndex', 'imgRemoveHandlr'],
        methods: {
            removeImgHandlr: function () {
                this.imgRemoveHandlr(this.imgIndex, this.imgBreedName, this);
            }
        }
    }
</script>