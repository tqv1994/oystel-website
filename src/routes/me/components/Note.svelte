<script lang="ts">
    export let value: string = "*Denotes Required Fields";
    let classNames: string;
    export {classNames as class};
</script>
<p class={`note m-0 ${classNames}`}>{value}</p>

<style lang="scss">
    .note {
      font-style: oblique;
    }
</style>