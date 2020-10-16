<template>
    <span class="selectBreed">
        <span class="breedName">{{this.breedName}}</span>
        (<span>{{this.subBreed.length}}</span>)
        <input type="checkbox" 
            :name="this.breedName" 
            @change="breedChecked">
    </span>
</template>

<script>
    export default {
        props: ['breedName', 'subBreed', 'breedChkboxHndlr'],
        methods: {
            breedChecked: function(event) {
                this.breedChkboxHndlr(event);
            }
        }
    }
</script>