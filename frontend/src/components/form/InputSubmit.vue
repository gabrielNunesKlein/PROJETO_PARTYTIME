<template>
    <div>
        <input type="submit" :value="text">
    </div>
</template>

<script>
export default {
    name: "InputSubmit",
    props: {
        text: ""
    }
}
</script>

<style scoped>
    input{
        width: 200px;
        margin: 0 auto;
        text-transform: uppercase;
        color: #FFFF;
        background-color: #25282E;
        cursor: pointer;
        padding: 12px;
        transition: .5s;
    }

    input:hover {
        background-color: #141619;
    }
</style>