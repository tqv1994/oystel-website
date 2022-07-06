<script lang="ts">
  import Textfield from '@smui/textfield';
  import { createEventDispatcher, afterUpdate } from 'svelte';
  import { goto } from '$app/navigation';
  import { searchKeys, type KeySearch } from '$lib/const';
  import Icon from '@smui/textfield/icon';
  import SearchIcon from '$lib/icons/SearchIcon.svelte';
  import { trySearch } from '$lib/store/search';
  import type { Kind } from '$lib/store/category';
  import { sortByName } from '$lib/utils/sort';
import type { Region } from '$lib/store/region';

  const dispatch = createEventDispatcher();
  let searchResultString = '';
  let results: KeySearch[] = searchKeys;

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
      q: searchResultString,
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
      q: searchResultString,
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
      q: searchResultString,
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
      q: searchResultString,
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
      q: searchResultString,
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
        q: searchResultString,
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
      q: searchResultString,
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
      q: searchResultString,
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
        q: searchResultString,
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
        q: searchResultString,
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
        q: searchResultString,
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
        q: searchResultString,
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

  async function search() {
    if (searchResultString != '') {
      results = [];
      results = [];
      results = results.concat(await getResultsByRegion());
      results = results.concat(await getResultsByDestination());
      results = results.concat(await getResultsByCity());
      results = results.concat(await getResultsByExperience());
      results = results.concat(await getResultsByArticle());
      results = results.concat(await getResultsByExperienceType());
      results = results.concat(await getProductResults());
      const destinationTypeResults = await trySearch<Kind>(
        fetch,
        'destination-type',
        {
          q: searchResultString,
          limit: 10,
        },
      );
      if (destinationTypeResults.hits) {
        results = results.concat(
          destinationTypeResults.hits.map((item) => {
            return {
              name: item.name,
              id: item.id,
              type: 'destinationType',
            };
          }),
        );
      }
      results = sortByName(results);
      let itemOther: KeySearch;
      results = results.reduce((acc: KeySearch[], item, index) => {
        if (item.name.toLowerCase() === 'other' && index + 1 < results.length) {
          itemOther = item;
        } else {
          acc.push(item);
        }
        if (index + 1 === results.length && itemOther) {
          acc.push(itemOther);
        }
        return acc;
      }, []);
    } else {
      results = searchKeys;
    }
  }

  afterUpdate(() => {
    document.getElementById('header-action-mobile').style.backgroundColor =
      '#fff';
  });

  async function handleSearch(key: KeySearch) {
    if (key.type === 'text' || !key?.id) {
      goto(`/search?q=${key.name}`);
    } else if (key.type === 'destinationType') {
      goto(`/destination/?t=${key.id}`);
    } else if (key.type === 'experienceType') {
      goto(`/experience/?t=${key.id}`);
    }
    dispatch('close');
    return;
  }

  const onSubmit = () => {
    goto(`/search?q=${searchResultString}`);
    dispatch('close');
    return;
  };
</script>

<div id="explode-wrap">
  <form class="search-form" on:submit|preventDefault={onSubmit}>
    <div class="form-control">
      <Textfield
        variant="outlined"
        on:keyup={search}
        bind:value={searchResultString}
        label="Start with a search"
        withTrailingIcon={false}
      >
        <Icon slot="trailingIcon"><SearchIcon /></Icon>
      </Textfield>
    </div>
    <div class="wrap-search-result">
      {#if results}
        {#if searchResultString == ''}
          <p class="m-0 mt-0 mb-30 make-bold">Trending Searches</p>
        {/if}
        <ul class="mt-0">
          {#each results as result}
            <li>
              <a
                href="javascript:void(0)"
                on:click={() => {
                  handleSearch(result);
                }}>{result.name}</a
              >
            </li>
          {/each}
        </ul>
      {/if}
    </div>
  </form>
</div>

<style lang="scss">
  #explode-wrap {
    margin-top: 16px;
  }
  .make-bold {
    font-weight: 900;
  }
  .wrap-search-result {
    margin-top: 32px;
    height: calc(100vh / 812 * 530);
    overflow-x: scroll;
  }
  .wrap-search-result ul {
    list-style: none;
    padding-left: 25px;
  }
  .wrap-search-result ul ul {
    padding-left: 50px;
  }
  .wrap-search-result ul li {
    margin-bottom: 30px;
  }
  .wrap-search-result ul li a {
    position: relative;
  }
  .wrap-search-result ul li a i {
    position: absolute;
    right: -30px;
    top: -4px;
  }
  .wrap-search-result ul li a.back {
    padding-left: 10px;
  }
  .wrap-search-result ul li a.back i {
    position: absolute;
    left: -10px;
    top: -4px;
  }

  .follow-wrap {
    position: absolute;
    bottom: 30px;
  }

  .search-form :global(.mdc-text-field) {
    height: 44px;
    width: 100%;
    -webkit-backdrop-filter: blur(7px) brightness(0.85);
    backdrop-filter: blur(7px) brightness(0.85);
    background-color: rgba(255, 255, 255, 0.65);
    border-radius: 0;
  }
  .search-form :global(.mdc-text-field .mdc-notched-outline__leading),
  .search-form :global(.mdc-text-field .mdc-notched-outline__notch),
  .search-form :global(.mdc-text-field .mdc-notched-outline__trailing) {
    border-color: transparent;
  }
  .search-form :global(.mdc-text-field img) {
    filter: brightness(0.1);
  }
</style>
