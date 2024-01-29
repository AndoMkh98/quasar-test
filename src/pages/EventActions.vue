<template>
  <q-layout>
    <q-page-container>
      <q-page class="col justify-center">
        <div>
          <h1>
            {{title}}
          </h1>

          <router-link to="/events" />
        </div>
        <div class="q-pa-md " style="max-width: 400px">
          <q-input
            filled
            v-model="name"
            label="Name of event *"

            lazy-rules
            :rules="[val => !!val || 'Field is required']"
          />
          <q-editor v-model="description" min-height="5rem" />
          <q-input
            filled
            v-model="country"
            label="Country of event*"

            lazy-rules
            :rules="[val => !!val || 'Field is required']"
          />
          <q-date v-model="createdAt" :options="isDateDisabled"/>

          <q-file
            v-model="files"
            label="Pick files"
            filled
            multiple
            style="max-width: 300px"
            max-file-size="2048"
          />
          <div v-if="files.length > 0" class="file-preview">
            <h5 class="text-h6">File Preview</h5>
            <q-list>
              <q-item v-for="file in files" :key="file.name">
                <q-item-section>
                  <q-img :src="getFileObjectURL(file)"/>
                  <q-item-label>{{ file.name }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
          <div class="actions-container">
            <q-btn :label="submitBtnTitle" color="primary" @click="handleSubmit"/>
            <q-btn v-if="isEdit" label="Delete" color="primary" @click="handleRemoveEvent"/>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {useEvents} from 'stores/useEvents';
import moment from 'moment';


export default defineComponent({
  name: 'EventActions',
  setup: () => {
    const store = useEvents();
    const route = useRoute();
    const { push } = useRouter();
    const name = ref(store.selectedEvent?.name || '');
    const description = ref(store.selectedEvent?.description || '');
    const files = ref(store.selectedEvent?.files || []);
    const country = ref(store.selectedEvent?.country || '');
    const createdAt = ref(store.selectedEvent?.createdAt || moment().format('YYYY/MM/DD'));
    return {
      title: route.params.id ? 'Edit event' : 'Create Event',
      submitBtnTitle: route.params.id ? 'Edit' : 'Save',
      isEdit: !!route.params.id,
      name,
      description,
      country,
      files,
      createdAt,
      isDateDisabled: (date: string) => date >= moment().format('YYYY/MM/DD'),
      handleRemoveEvent: () => {
        store.removeEvent(route.params.id as string).then(() => {
          push('/events')
        })
      },
      handleSubmit: () => {
        store[route.params.id ? 'updateEvent' : 'createEvent']({
          id: route.params.id as string,
          name: String(name.value),
          description: String(description.value),
          country: String(country.value),
          files: files.value,
          createdAt: createdAt.value as Date
        }).then(() => {
          push('/events')
        })
      }
    }
  },
  methods: {
    getFileObjectURL(file: File | string) {
      return this.isEdit ? (file as string) : window.URL.createObjectURL(file as File);
    },
  },
})
 </script>

<style>
.actions-container {
  display: flex;
  gap: 2rem
}
</style>
