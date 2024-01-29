<template>
  <q-layout>
    <q-page-container>
      <q-page class="col justify-center">
        <div class="events-container">
          <h3>
            All events
          </h3>
          <router-link to="/events/actions">
            Create event
          </router-link>
        </div>

        <div>
          <q-table
            :sort-method="customSort"
            title="Events" :rows="store.selectEvents" :columns="columns" @row-click="onRowClick">
            <template v-slot:body-cell-description="props">
              <q-td :props="props" :raw="true">
                <div v-html="props.row.description"/>
              </q-td>
            </template>
          </q-table>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>


<script lang="ts">

import {defineComponent} from 'vue'
import {useEvents, Event} from 'stores/useEvents';
import {useRouter} from 'vue-router';
import moment from 'moment'

export default defineComponent({
  name: 'AllEvents',
  setup: () => {
    const store = useEvents();
    const router = useRouter();
    const columns = [
      {
        name: 'name',
        label: 'Name',
        field: 'name',
        sortable: true
      },
      {
        name: 'description',
        label: 'Description',
        field: 'description',
        sortable: true
      },
      {
        name: 'country',
        label: 'Country',
        field: 'country',
        sortable: true
      },
      {
        name: 'createdAt',
        label: 'Date of creation',
        field: 'createdAt',
        sortable: true,
        format: (val: Date) => `${moment(val).format('DD/MM/YYYY')}`,
      },
    ];

    return {
      store,
      columns,
      customSort(rows: Array<any>, sortBy: string, descending: boolean) {
        const data = [...rows]

        if (sortBy) {
          data.sort((a, b) => {
            const x = descending ? b : a
            const y = descending ? a : b
            if (sortBy === 'createdAt') {
              return moment(x[sortBy]).isAfter(y[sortBy]) ? 1 : moment(x[sortBy]).isBefore(y[sortBy]) ? -1 : 0
            } else {
              return x[sortBy] > y[sortBy] ? 1 : x[sortBy] < y[sortBy] ? -1 : 0
            }
          })
        }

        return data
      },
      onRowClick: (evt: MouseEvent, row: Event) => {
        store.setSelectedEvent(row);
        router.push(`/events/actions/${row.id}`)
      }
    }
  },
  mounted() {
    this.store.getEvents();
  }
})
</script>


<style>
.events-container {
  display: flex;
  align-items: center;
  gap: 2rem
}
</style>
