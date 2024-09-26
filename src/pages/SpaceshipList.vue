<template>
  <div class="spaceship__list">
    <div class="list-wrapper" v-if="spaceshipData">
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
    </div>
    <div class="list__loading" v-else>
      <p>Загрузка...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import store from '/src/store/index.js';

const spaceshipData = computed(() => store.state.spaceshipData)
const searchingSpaceship = ref('')
const spaceshipFilters = computed(() => {
  return spaceshipData.value.results.filter(spaceship =>
    spaceship.name.toLowerCase().includes(searchingSpaceship.value.toLowerCase())
  )
})

function formatUrl(url) {
  const urlPath = url.split('/')
  return urlPath[urlPath.length - 2]
}

onMounted(async() => {
  await store.dispatch('fetchSpaceshipData')
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