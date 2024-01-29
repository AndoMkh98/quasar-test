<template>
  <q-toggle
    v-model="darkMode"
    @update:model-value="toggleDarkMode"
  />
  <router-view />
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import { useRouter } from 'vue-router'
import {useQuasar} from 'quasar';
export default defineComponent({
  name: 'App',
  setup: () => {
    const $q = useQuasar()
    const darkMode = ref(false)
    return {
      darkMode,
      toggleDarkMode: () => {
        $q.dark.set(darkMode.value)
      }
    }
  },
  mounted() {


    console.log()
    const router = useRouter();
    const token = localStorage.getItem('token');
    if(token) {
      router.push('/events')
    } else {
      router.push('/login')
    }
  }
});
</script>
