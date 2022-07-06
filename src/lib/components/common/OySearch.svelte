<script lang="ts">
  import { clickOutside } from '$lib/components/events/clickOutside.js';
  import Textfield from '@smui/textfield';
  import { searchKeys, type KeySearch } from '$lib/const';
  import { goto } from '$app/navigation';
  import { createEventDispatcher, onMount } from 'svelte';
  import { documentHelper } from '$lib/helpers';
  import SearchIcon from '$lib/icons/SearchIcon.svelte';
  import Icon from '@smui/textfield/icon';
  import { trySearch } from '$lib/store/search';
  import type { Kind } from '$lib/store/category';
  import { sortByName } from '$lib/utils/sort';
  import type { Advisor } from '$lib/store/advisor';
  import { makeLink } from '$lib/utils/link';
  import type { Region } from '$lib/store/region';
  export let searchResult = '';
  // tagsStore.subscribe(({ tags }) => {
  //     tagDatas = Object.values(tags);
  // });
  let keyResults: KeySearch[] = [];
  let disabled: boolean;
  const dispatcher = createEventDispatcher();
  export let label = 'Start with a search';

  export let openSearchComplete = false;
  function handleOpenSearchComplete() {
    openSearchComplete = true;
    keyResults = searchKeys;
  }
  function handleCloseSearchComplete() {
    openSearchComplete = false;
    keyResults = [];
  }

  if (openSearchComplete) {
    handleOpenSearchComplete();
  }

  function getTypeQueries(
    object: Region,
    field: string,
    prefixValue: string,
    numberField: number = 1,
  ): string[] {
    let result = [];
    if (numberField === 1) {
      result.push(`id = ${prefixValue}-${object[field]}`);
    } else {
      for (let i = 1; i <= numberField; i++) {
        if (object[`${field}${i}`]) {
          result.push(`id = ${prefixValue}-${object[`${field}${i}`]}`);
        }
      }
    }
    return result;
  }

  async function getResultsByRegion(): Promise<KeySearch[]> {
    let results: KeySearch[] = [];
    const regionResults = await trySearch<Region>(fetch, 'region', {
      q: searchResult,
      limit: 10,
    });
    // Find experienceType, destinationType and country from region;
    if (regionResults.hits && regionResults.hits.length > 0) {
      let experienceTypeQueries: string[] = [];
      let destinationTypeQueries: string[] = [];
      let countryQueries: string[] = [];
      regionResults.hits.map((item) => {
        experienceTypeQueries = experienceTypeQueries.concat(
          getTypeQueries(item, 'experienceType', 'experience-type', 6),
        );
        destinationTypeQueries = destinationTypeQueries.concat(
          getTypeQueries(item, 'destinationType', 'destination-type'),
        );
        countryQueries = countryQueries.concat(
          getTypeQueries(item, 'country', 'country'),
        );
      });
      if (experienceTypeQueries.length > 0) {
        const experienceTypeOfRegionResults = await trySearch<Kind>(
          fetch,
          'experience-type',
          {
            filter: [experienceTypeQueries],
            limit: 10,
          },
        );
        console.log(
          'experienceTypeOfRegionResults',
          experienceTypeOfRegionResults,
        );
        if (experienceTypeOfRegionResults.hits) {
          results = experienceTypeOfRegionResults.hits.map((item) => {
            return {
              name: item.name,
              id: item.id,
              type: 'experienceType',
            };
          });
        }
      }
      if (destinationTypeQueries.length > 0) {
        const destinationTypeOfRegionResults = await trySearch<Kind>(
          fetch,
          'destination-type',
          {
            filter: destinationTypeQueries,
            limit: 10,
          },
        );
        if (destinationTypeOfRegionResults.hits) {
          results = results.concat(
            destinationTypeOfRegionResults.hits.map((item) => {
              return {
                name: item.name,
                id: item.id,
                type: 'destinationType',
              };
            }),
          );
        }
      }
      if (countryQueries.length > 0) {
        const countryOfRegionResults = await trySearch<Kind>(fetch, 'country', {
          filter: countryQueries,
          limit: 10,
        });
        if (countryOfRegionResults.hits) {
          results = results.concat(
            countryOfRegionResults.hits.map((item) => {
              return {
                name: item.name,
                id: item.id,
                type: 'country',
              };
            }),
          );
        }
      }
    }
    return results;
  }

  async function getResultsByDestination(): Promise<KeySearch[]> {
    let results: KeySearch[] = [];
    const regionResults = await trySearch<Region>(fetch, 'destination', {
      q: searchResult,
      limit: 10,
    });
    // Find experienceType, destinationType and country from region;
    if (regionResults.hits && regionResults.hits.length > 0) {
      let experienceTypeQueries: string[] = [];
      regionResults.hits.map((item) => {
        experienceTypeQueries = experienceTypeQueries.concat(
          getTypeQueries(item, 'experience_type', 'experience-type', 6),
        );
      });
      if (experienceTypeQueries.length > 0) {
        const experienceTypeResults = await trySearch<Kind>(
          fetch,
          'experience-type',
          {
            filter: [experienceTypeQueries],
            limit: 10,
          },
        );
        if (experienceTypeResults.hits) {
          results = experienceTypeResults.hits.map((item) => {
            return {
              name: item.name,
              id: item.id,
              type: 'experienceType',
            };
          });
        }
      }
    }
    return results;
  }

  async function getResultsByCity(): Promise<KeySearch[]> {
    let results: KeySearch[] = [];
    const regionResults = await trySearch<Region>(fetch, 'city', {
      q: searchResult,
      limit: 10,
    });
    // Find experienceType, destinationType and country from region;
    if (regionResults.hits && regionResults.hits.length > 0) {
      let experienceTypeQueries: string[] = [];
      regionResults.hits.map((item) => {
        experienceTypeQueries = experienceTypeQueries.concat(
          getTypeQueries(item, 'experienceType', 'experience-type', 6),
        );
      });
      if (experienceTypeQueries.length > 0) {
        const experienceTypeResults = await trySearch<Kind>(
          fetch,
          'experience-type',
          {
            filter: [experienceTypeQueries],
            limit: 10,
          },
        );
        if (experienceTypeResults.hits) {
          results = experienceTypeResults.hits.map((item) => {
            return {
              name: item.name,
              id: item.id,
              type: 'experienceType',
            };
          });
        }
      }
    }
    return results;
  }

  async function getResultsByExperience(): Promise<KeySearch[]> {
    let results: KeySearch[] = [];
    const regionResults = await trySearch<Region>(fetch, 'experience', {
      q: searchResult,
      limit: 10,
    });
    // Find experienceType, destinationType and country from region;
    if (regionResults.hits && regionResults.hits.length > 0) {
      let experienceTypeQueries: string[] = [];
      regionResults.hits.map((item) => {
        experienceTypeQueries = experienceTypeQueries.concat(
          getTypeQueries(item, 'type', 'experience-type', 6),
        );
      });
      if (experienceTypeQueries.length > 0) {
        const experienceTypeResults = await trySearch<Kind>(
          fetch,
          'experience-type',
          {
            filter: [experienceTypeQueries],
            limit: 10,
          },
        );
        if (experienceTypeResults.hits) {
          results = experienceTypeResults.hits.map((item) => {
            return {
              name: item.name,
              id: item.id,
              type: 'experienceType',
            };
          });
        }
      }
    }
    return results;
  }

  async function getResultsByArticle(): Promise<KeySearch[]> {
    let results: KeySearch[] = [];
    const regionResults = await trySearch<Region>(fetch, 'article', {
      q: searchResult,
      limit: 10,
    });
    // Find experienceType, destinationType and country from region;
    if (regionResults.hits && regionResults.hits.length > 0) {
      let experienceTypeQueries: string[] = [];
      regionResults.hits.map((item) => {
        experienceTypeQueries = experienceTypeQueries.concat(
          getTypeQueries(item, 'experience_type', 'experience-type', 6),
        );
      });
      if (experienceTypeQueries.length > 0) {
        const experienceTypeResults = await trySearch<Kind>(
          fetch,
          'experience-type',
          {
            filter: [experienceTypeQueries],
            limit: 10,
          },
        );
        if (experienceTypeResults.hits) {
          results = experienceTypeResults.hits.map((item) => {
            return {
              name: item.name,
              id: item.id,
              type: 'experienceType',
            };
          });
        }
      }
    }
    return results;
  }

  async function getResultsByExperienceType(): Promise<KeySearch[]> {
    let results: KeySearch[] = [];
    const experienceTypeResults = await trySearch<Region>(
      fetch,
      'experience-type',
      {
        q: searchResult,
        limit: 10,
      },
    );
    // Find experienceType, destinationType and country from region;
    if (experienceTypeResults.hits && experienceTypeResults.hits.length > 0) {
      let advisorQueries: string[] = [];
      let productQueries: string[] = [];
      if (experienceTypeResults.hits) {
        results = results.concat(
          experienceTypeResults.hits.map((item) => {
            advisorQueries.push(`experienceType1 = ${item.id}`);
            advisorQueries.push(`experienceType2 = ${item.id}`);
            advisorQueries.push(`experienceType3 = ${item.id}`);
            advisorQueries.push(`experienceType4 = ${item.id}`);
            advisorQueries.push(`experienceType5 = ${item.id}`);

            productQueries.push(`experience_type1 = ${item.id}`);
            productQueries.push(`experience_type2 = ${item.id}`);
            productQueries.push(`experience_type3 = ${item.id}`);
            productQueries.push(`experience_type4 = ${item.id}`);
            productQueries.push(`experience_type5 = ${item.id}`);

            return {
              name: item.name,
              id: item.id,
              type: 'experienceType',
            };
          }),
        );
      }
      if (advisorQueries.length > 0) {
        const advisorResults = await trySearch<Kind>(fetch, 'advisor', {
          filter: [advisorQueries],
          limit: 10,
        });
        if (advisorResults.hits) {
          results = results.concat(
            advisorResults.hits.map((item) => {
              return {
                name: item.name,
                id: item.id,
                type: 'advisor',
              };
            }),
          );
        }
      }
      if (productQueries.length > 0) {
        const productResults = await trySearch<Kind>(fetch, 'product', {
          filter: [productQueries],
          limit: 10,
        });
        if (productResults.hits) {
          results = results.concat(
            productResults.hits.map((item) => {
              return {
                name: item.name,
                id: item.id,
                type: 'product',
              };
            }),
          );
          results = results.reduce((acc: KeySearch[], item: KeySearch) => {
            const index = acc.findIndex(
              (keySearch) => keySearch.name === item.name && item.type === 'product',
            );
            if (index < 0) {
              acc.push(item);
            }
            return acc;
          }, []);
        }
      }
    }
    return results;
  }

  async function getProductResults(): Promise<KeySearch[]> {
    let results: KeySearch[] = [];
    let filterProductsByType: string[] = [];
    const productTypeResults = await trySearch<Kind>(fetch, 'product-type', {
      q: searchResult,
      limit: 10,
    });
    if (productTypeResults.hits && productTypeResults.hits.length > 0) {
      productTypeResults.hits.map((item) => {
        filterProductsByType.push(`type1 = ${item.id}`);
        filterProductsByType.push(`type2 = ${item.id}`);
        filterProductsByType.push(`type3 = ${item.id}`);
      });
    }

    let filterProductsByFit: string[] = [];
    const productFitResults = await trySearch<Kind>(fetch, 'product-fit', {
      q: searchResult,
      limit: 10,
    });
    if (productFitResults.hits && productFitResults.hits.length > 0) {
      productFitResults.hits.map((item) => {
        filterProductsByFit.push(`product_fit = ${item.id}`);
      });
    }

    let filterProductsByVacationStyle: string[] = [];
    const vacationStyleResults = await trySearch<Kind>(
      fetch,
      'vacation-style',
      {
        q: searchResult,
        limit: 10,
      },
    );
    if (vacationStyleResults.hits && vacationStyleResults.hits.length > 0) {
      vacationStyleResults.hits.map((item) => {
        filterProductsByVacationStyle.push(`vacation_style = ${item.id}`);
      });
    }

    let filterProductsByDesigner: string[] = [];
    const productDesignerResults = await trySearch<Kind>(
      fetch,
      'product-designer',
      {
        q: searchResult,
        limit: 10,
      },
    );
    if (productDesignerResults.hits && productDesignerResults.hits.length > 0) {
      productDesignerResults.hits.map((item) => {
        filterProductsByDesigner.push(`product_designer = ${item.id}`);
      });
    }

    let filterProductsByPattern: string[] = [];
    const productPatternResults = await trySearch<Kind>(
      fetch,
      'product-patterns',
      {
        q: searchResult,
        limit: 10,
      },
    );
    if (productPatternResults.hits && productPatternResults.hits.length > 0) {
      productPatternResults.hits.map((item) => {
        filterProductsByPattern.push(`product_pattern = ${item.id}`);
      });
    }

    let filterProductsByColour: string[] = [];
    const productColoursResults = await trySearch<Kind>(
      fetch,
      'product-colours',
      {
        q: searchResult,
        limit: 10,
      },
    );
    if (productColoursResults.hits && productColoursResults.hits.length > 0) {
      productColoursResults.hits.map((item) => {
        filterProductsByColour.push(`product_colour = ${item.id}`);
      });
    }
    if (
      filterProductsByColour.length > 0 ||
      filterProductsByDesigner.length > 0 ||
      filterProductsByFit.length > 0 ||
      filterProductsByPattern.length > 0 ||
      filterProductsByType.length > 0 ||
      filterProductsByVacationStyle.length > 0
    ) {
      const productResults = await trySearch<Kind>(fetch, 'product', {
        filter: [
          [...filterProductsByColour],
          [...filterProductsByDesigner],
          [...filterProductsByFit],
          [...filterProductsByPattern],
          [...filterProductsByType],
          [...filterProductsByVacationStyle],
        ],
        limit: 10,
      });
      if (productResults.hits) {
        results = results.concat(
          productResults.hits.map((item) => {
            return {
              name: item.name,
              id: item.id,
              type: 'product',
            };
          }),
        );
        results = results.reduce((acc: KeySearch[], item: KeySearch) => {
          const index = acc.findIndex(
            (keySearch) => keySearch.name === item.name,
          );
          if (index < 0) {
            acc.push(item);
          }
          return acc;
        }, []);
      }
    }
    return results;
  }

  async function handleSearchTags() {
    if (searchResult != '') {
      keyResults = [];
      keyResults = keyResults.concat(await getResultsByRegion());
      keyResults = keyResults.concat(await getResultsByDestination());
      keyResults = keyResults.concat(await getResultsByCity());
      keyResults = keyResults.concat(await getResultsByExperience());
      keyResults = keyResults.concat(await getResultsByArticle());
      keyResults = keyResults.concat(await getResultsByExperienceType());
      keyResults = keyResults.concat(await getProductResults());
      // Find destinationTypes by query
      const destinationTypeResults = await trySearch<Kind>(
        fetch,
        'destination-type',
        {
          q: searchResult,
          limit: 10,
        },
      );
      // Find advisors by query
      const advisorResults = await trySearch<Kind>(fetch, 'advisor', {
        q: searchResult,
        limit: 10,
      });
      if (destinationTypeResults.hits) {
        keyResults = keyResults.concat(
          destinationTypeResults.hits.map((item) => {
            return {
              name: item.name,
              id: item.id,
              type: 'destinationType',
            };
          }),
        );
      }
      if (advisorResults.hits) {
        keyResults = keyResults.concat(
          advisorResults.hits.map((item) => {
            return {
              name: item.name,
              id: item.id,
              type: 'advisor',
            };
          }),
        );
      }
      keyResults = keyResults.reduce((acc: KeySearch[], item: KeySearch) => {
        const index = acc.findIndex(
          (keySearch) =>
            keySearch.id === item.id && keySearch.type === item.type,
        );
        if (index < 0) {
          acc.push(item);
        }
        return acc;
      }, []);
      keyResults = sortByName(keyResults);
      let itemOther: KeySearch;
      keyResults = keyResults.reduce((acc: KeySearch[], item, index) => {
        if (
          item.name.toLowerCase() === 'other' &&
          index + 1 < keyResults.length
        ) {
          itemOther = item;
        } else {
          acc.push(item);
        }
        if (index + 1 === keyResults.length && itemOther) {
          acc.push(itemOther);
        }
        return acc;
      }, []);
    } else {
      keyResults = searchKeys;
    }
  }

  async function handleSearch(key: KeySearch) {
    if (key.type === 'text' || !key?.id) {
      goto(`/search?q=${key.name}`);
    } else if (key.type === 'destinationType') {
      goto(`/destinations/?t=${key.id}`);
    } else if (key.type === 'experienceType') {
      goto(`/experiences/?t=${key.id}`);
    } else if (key.type === 'advisor') {
      goto(makeLink('/advisors', { name: key.name, id: key.id }));
    } else if (key.type === 'country') {
      goto(`/search?c=${key.id}`);
    } else if (key.type === 'product') {
      goto(`/shop/products-listing?q=${key.name}`);
    }
    dispatcher('close');
    return;
  }

  const onSubmit = () => {
    goto(`/search?q=${searchResult}`);
    dispatcher('close');
    return;
  };

  onMount(async () => {
    checkDeviceToDisableInput();
  });
  function checkDeviceToDisableInput() {
    if (document.documentElement.clientWidth <= 949) {
      if (documentHelper.getMobileOperatingSystem() == 'Android') {
        disabled = true;
      } else {
        disabled = false;
      }
    } else {
      disabled = false;
    }
  }
</script>

<svelte:window
  on:resize={() => {
    checkDeviceToDisableInput();
  }}
/>
<form class="search-form" on:submit|preventDefault={onSubmit}>
  <div
    class="form-control {openSearchComplete == true
      ? 'open-search-complete'
      : false}"
    use:clickOutside
    on:click_outside={handleCloseSearchComplete}
  >
    <Textfield
      on:click={handleOpenSearchComplete}
      variant="outlined"
      {label}
      withTrailingIcon={false}
      bind:value={searchResult}
      on:keyup={handleSearchTags}
      {disabled}
    >
      <Icon slot="trailingIcon"><SearchIcon /></Icon>
    </Textfield>
    <div class="tags light mr--35 ml--35 text-left">
      {#if searchResult == ''}
        <p class="m-0 mt-25">Trending Searches</p>
      {/if}
      <ul>
        {#if keyResults.length > 0}
          {#each keyResults as key}
            <li class="mt-0">
              <a
                class="m-0"
                href="javascript:void(0);"
                on:click={() => {
                  handleSearch(key);
                }}>{key.name}</a
              >
            </li>
          {/each}
        {/if}
      </ul>
    </div>
  </div>
</form>

<style lang="scss">
  .search-form :global(.mdc-text-field) {
    height: 44px;
    width: 457px;
    -webkit-backdrop-filter: blur(7px) brightness(0.85);
    backdrop-filter: blur(7px) brightness(0.85);
    background-color: rgba(255, 255, 255, 0.65);
    border-radius: 0;

    @media screen and (max-width: 949px) {
      width: 100%;
    }
  }
  .form-control {
    .tags {
      display: none;
    }
    &.open-search-complete {
      background: #fff;
      display: inline-block;
      @media screen and (max-width: 949px) {
        display: block;
      }
      position: relative;
      &:before {
        position: absolute;
        content: ' ';
        width: calc(100% + 70px);
        height: calc(100% + 50px);
        background: #fff;
        left: 50%;
        transform: translateX(-50%);
        top: -25px;
      }
      :global(.mdc-text-field.mdc-text-field *) {
        border-color: transparent;
      }
      :global(.mdc-text-field.mdc-text-field--focused) {
        :global(.mdc-notched-outline__notch) {
          display: none;
        }
      }
      .tags {
        display: block;
        position: relative;
        p {
          padding-left: 50px;
          font-weight: 300;
        }
        ul {
          padding-left: 0;
          list-style: none;
          max-height: 150px;
          overflow-y: scroll;
          &::-webkit-scrollbar-track {
            background-color: #d3d3d3;
          }
          &::-webkit-scrollbar {
            width: 5px;
            background-color: #d3d3d3;
          }
          &::-webkit-scrollbar-thumb {
            background-color: #000;
          }
          a {
            padding-left: 70px;
            font-size: 14px;
            font-weight: 300;
            letter-spacing: 0.2;
            line-height: 22px;
            padding-top: 12.5px;
            padding-bottom: 12.5px;
            display: block;
            &:active {
              background-color: #d9d8da;
            }
            &:hover {
              background-color: #dedede;
            }
          }
        }
      }
    }
  }
</style>
