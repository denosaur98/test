<template>
  <div class="spaceship__page">
    <div class="spaceship-wrapper" v-if="currentSpaceship">
      <table class="item__table">
        <tr>
          <th>Название</th>
          <th>Вместимость</th>
          <th>Грузоподъемнось</th>
          <th>Производитель</th>
          <th>Экипаж</th>
        </tr>
        <tr>
          <td>{{ currentSpaceship.name }}</td>
          <td>{{ currentSpaceship.passengers }}</td>
          <td>{{ currentSpaceship.cargo_capacity }}</td>
          <td>{{ currentSpaceship.manufacturer }}</td>
          <td>{{ currentSpaceship.crew }}</td>
        </tr>
      </table>
      <table class="item__table">
        <tr>
          <th>Расходные материалы</th>
          <th>Стоимость</th>
          <th>Рейтинг</th>
          <th>Количество</th>
          <th>Макс.Скорость</th>
        </tr>
        <tr>
          <td>{{ currentSpaceship.consumables }}</td>
          <td>{{ currentSpaceship.cost_in_credits }}</td>
          <td>{{ currentSpaceship.hyperdrive_rating }}</td>
          <td>{{ currentSpaceship.length }}</td>
          <td>{{ currentSpaceship.max_atmosphering_speed }}</td>
        </tr>
      </table>
      <table class="item__table">
        <tr>
          <th>Модель</th>
          <th>Макс. кол-во пассажиров</th>
          <th>Класс</th>
          <th v-if="currentSpaceship.films.length > 0">Фильмы</th>
          <th v-if="currentSpaceship.pilots.length > 0">Пилоты</th>
        </tr>
        <tr>
          <td>{{ currentSpaceship.model }}</td>
          <td>{{ currentSpaceship.passengers }}</td>
          <td>{{ currentSpaceship.starship_class }}</td>
          <td class="column-point" v-for="(films, index) in currentSpaceship.films" :key="index">{{ films }}</td>
          <td class="column-point" v-for="(pilots, index) in currentSpaceship.pilots" :key="index">{{ pilots }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import store from '/src/store/index.js';
import { useRoute } from 'vue-router';

const route = useRoute()
const spaceshipData = computed(() => store.state.spaceshipData)
const spaceshipId = computed(() => {
  const pathParts = route.fullPath.split('/')
  return pathParts[pathParts.length - 1]
})
const currentSpaceship = computed(() => {
  if (!spaceshipData.value || !spaceshipData.value.results) {
    return null
  }
  return spaceshipData.value.results.find(spaceship => {
    const urlParts = spaceship.url.split('/')
    const spaceshipIdFromUrl = urlParts[urlParts.length - 2]
    return spaceshipIdFromUrl === spaceshipId.value
  })
})

onMounted(async () => {
  await store.dispatch('fetchSpaceshipData')
})
</script>

<style lang="scss" scoped>
.spaceship__page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 150px;

  .spaceship-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    gap: 100px;

    .item__table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0;

      tr {
        width: 100%;
  
        td,
        th {
          height: 50px;
          text-align: center;
          min-width: 300px;
          border: 1px solid #000;
        }

        .column-point {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
}
</style>