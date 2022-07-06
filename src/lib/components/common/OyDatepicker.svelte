<script lang="ts">
  import Textfield from '@smui/textfield';
  import HelperText from '@smui/textfield/helper-text';
  import { afterUpdate } from 'svelte';
  import { InlineCalendar } from 'svelte-calendar';
  export let value: string | Date | null;
  export let min: string | Date | undefined = undefined;
  export let max: string | Date | undefined = undefined;
  export let invalid: boolean = false;
  //https://6edesign.github.io/svelte-calendar/docs/props
  let store: any;
  let innerWidth = 0;
  let optionsDefault = {
    width: '700px',
    maxWidth: '100vw',
    legend: {
      height: '35px',
    },
    shadow: '0px 0px 5px rgba(0, 0, 0, 0.25)',
    colors: {
      text: {
        primary: '#333',
        highlight: '#fff',
      },
      background: {
        primary: '#fff',
        highlight: '#eb7400',
        hover: '#eee',
      },
      border: '#eee',
    },
    font: {
      regular: '1em',
      large: '30em',
    },
    grid: {
      disabledOpacity: '.35',
      outsiderOpacity: '.6',
    },
  };
  export let options = {};
  export let type: 'default' | 'inline' = 'default';
  const theme = {
    calendar: {
      ...optionsDefault,
      ...options,
    },
  };
  const convertDate = (date: string | Date): string => {
    date = new Date(date);
    return `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${(
      '0' + date.getDate()
    ).slice(-2)}`;
  };
  let selected: string = value ? convertDate(value) : '';

  afterUpdate(() => {
    if (typeof $store !== 'undefined') {
      const result = new Date($store.selected);
      value = `${result.getFullYear()}-${('0' + (result.getMonth() + 1)).slice(
        -2,
      )}-${('0' + result.getDate()).slice(-2)}`;
    } else {
      if (selected !== '') {
        value = convertDate(selected);
      } else {
        value = null;
      }
    }
  });

  const handleDateValidate = () => {
    const result = new Date(selected);
    const minDate = new Date(min);
    const maxDate = new Date(max);
    if (
      Date.parse(result.toDateString()) < Date.parse(minDate.toDateString())
    ) {
      value = selected = convertDate(minDate);
    } else if (
      Date.parse(result.toDateString()) > Date.parse(maxDate.toDateString())
    ) {
      value = selected = convertDate(maxDate);
    } else {
      if (selected !== '') {
        value = convertDate(selected);
      } else {
        value = null;
      }
    }
  };
</script>

<svelte:window bind:innerWidth />
{#if type === 'default'}
  <div>
    <Textfield
      bind:value={selected}
      label=""
      type="date"
      {invalid}
      on:blur={handleDateValidate}
    >
      <HelperText validationMsg slot="helper">
        <slot />
      </HelperText>
    </Textfield>
    <!-- <Datepicker {theme} selected={selected} bind:store let:key let:send let:receive>
            <div in:receive|local={{ key }} out:send|local={{ key }}>
                <Textfield value={$store?.hasChosen ? dateTimeHelper.formatDate($store.selected) : dateTimeHelper.formatDate(value)}/>
            </div>
        </Datepicker> -->
  </div>
{:else}
  <InlineCalendar
    bind:store
    selected={new Date(selected)}
    {theme}
    start={min ? new Date(min) : undefined}
    end={max ? new Date(max) : undefined}
  />
{/if}

<style lang="scss">
  // style calendar
  div {
    :global(.contents-wrapper) {
      position: fixed;
    }
  }
</style>
