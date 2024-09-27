<template>
  <div class="spaceship__list">
    <div class="list-wrapper" v-if="spaceshipData">
      <p class="search__copy-link">{{ searchLink }}</p>
      <input class="list__search" placeholder="ВВЕДИТЕ НАЗВАНИЕ КОРАБЛЯ:" v-model="searchingSpaceship">
      <div class="list__items-wrapper">
        <RouterLink :to="`/starships/${formatUrl(spaceships.url)}`" class="list__item" v-for="spaceships in spaceshipFilters" :key="spaceships.model">
          <table class="item__table">
            <tr>
              <th>Название</th>
              <th>Вместимость</th>
              <th>Грузоподъемнось</th>
              <th>Производитель</th>
              <th>Экипаж</th>
            </tr>
            <tr>
              <td>{{ spaceships.name }}</td>
              <td>{{ spaceships.passengers }}</td>
              <td>{{ spaceships.cargo_capacity }}</td>
              <td>{{ spaceships.manufacturer }}</td>
              <td>{{ spaceships.crew }}</td>
            </tr>
          </table>
        </RouterLink>
      </div>
      <div class="pagination">
        <button class="pagination__prev" :class="!spaceshipData.previous ? 'disabled' : ''" @click="prevStep">prev</button>
        <button class="pagination__next" :class="!spaceshipData.next ? 'disabled' : ''" @click="nextStep">next</button>
      </div>
    </div>
    <div class="list__loading" v-else>
      <p>Загрузка...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import store from '/src/store/index.js';
import { useRouter, useRoute } from 'vue-router';

const spaceshipData = computed(() => store.state.spaceshipData)
const searchingSpaceship = ref(store.state.searchQuery)
const spaceshipFilters = computed(() => {
  return spaceshipData.value.results.filter(spaceship =>
    spaceship.name.toLowerCase().includes(searchingSpaceship.value.toLowerCase())
  )
})

const router = useRouter()
const route = useRoute()
const searchLink = computed(() => {
  const pageNumber = route.params.page ? parseInt(route.params.page, 10) : 1
  const searchQuery = encodeURIComponent(searchingSpaceship.value)
  return `${window.location.origin}/starships/page/${pageNumber}?search=${searchQuery}`
})
function getPageNumber(url) {
  const match = url.match(/page=(\d+)/)
  return match ? parseInt(match[1], 10) : null
}
async function prevStep() {
  if (spaceshipData.value.previous) {
    const pageNumber = getPageNumber(spaceshipData.value.previous)
    if (pageNumber) {
      store.commit('setPageNumber', pageNumber)
      await store.dispatch('fetchSpaceshipData')
      router.push(`/starships/page/${pageNumber}?search=${searchingSpaceship.value}`)
    }
  }
}
async function nextStep() {
  if (spaceshipData.value.next) {
    const pageNumber = getPageNumber(spaceshipData.value.next)
    if (pageNumber) {
      store.commit('setPageNumber', pageNumber)
      await store.dispatch('fetchSpaceshipData')
      router.push(`/starships/page/${pageNumber}?search=${searchingSpaceship.value}`)
    }
  }
}

function formatUrl(url) {
  const urlPath = url.split('/')
  return urlPath[urlPath.length - 2]
}

onMounted(async () => {
  const pageNumber = route.params.page ? parseInt(route.params.page, 10) : 1
  const searchQuery = route.query.search || ''
  store.commit('setPageNumber', pageNumber)
  store.commit('setSearchQuery', searchQuery)
  searchingSpaceship.value = searchQuery
  await store.dispatch('fetchSpaceshipData')
})

watch(searchingSpaceship, (newSearchQuery) => {
  store.commit('setSearchQuery', newSearchQuery)
  router.push(`/starships/page/${store.state.pageNumber}?search=${newSearchQuery}`)
})
</script>

<style lang="scss" scoped>
.spaceship__list {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 150px;

  .list-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    max-width: 1000px;

    .search__copy-link {
      font-size: 20px;
      color: #a1a1a1;
      margin-bottom: 20px;
    }

    .list__search {
      width: 100%;
      padding: 10px 15px;
      font-size: 15px;
      border-radius: 5px;
      outline: none;
      border: 1px solid #000;
    }

    .list__items-wrapper {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      gap: 20px;
      margin-top: 50px;
      width: 100%;

      .list__item {
        display: flex;
        align-items: center;
        border: none;
        box-shadow: 1px 1px 5px 1px #a1a1a1;
        padding: 10px 20px;
        min-height: 150px;
        width: 100%;
        border-radius: 5px;

        .item__table {
          width: 100%;

          tr {
            width: 100%;

            td, th {
              height: 50px;
              text-align: center;
              width: 200px;
            }
          }
        }
      }
    }

    .pagination {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 20px;
      margin-top: 50px;

      .pagination__prev, .pagination__next {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 30px;
        width: 150px;
        border: 1px solid #000;
        border-radius: 5px;
        padding: 10px 20px;
        background: none;

        &.disabled {
          border: 1px solid #c4c4c4;
          color: #575757;
          background: #c4c4c4;
        }
      }
    }
  }

  .list__loading { 
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;

    p {
      font-size: 30px;
    }
  }
}
</style>