<template>

  <q-layout>
    <q-page-container>
      <q-page class="col justify-center">
        <h1>Login page</h1>

        <div class="q-pa-md" style="max-width: 400px">

          <q-form
            @submit="onSubmit"
            class="q-gutter-md"
          >
            <q-input
              filled
              v-model="userName"
              label="Your username *"

              lazy-rules
              :rules="[val => !!val || 'Field is required']"
            />
            <q-input
              filled
              v-model="password"
              label="Your password *"
              lazy-rules
              type="password"
              :rules="[val => !!val || 'Field is required']"
            />
            <div>
              <q-btn label="Submit" type="submit" color="primary"/>
            </div>
          </q-form>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>


<script lang="ts">
import {defineComponent, ref} from 'vue';
import {useUsers} from 'stores/stores';
import { useRouter } from 'vue-router'
export default defineComponent({
    name: 'LoginPage',
    setup: () => {
      const store = useUsers();
      const router = useRouter();
      const userName = ref(null);
      const password = ref(null);

      return {
        userName,
        password,
        onSubmit: () => {
          store.login({
            userName: String(userName.value),
            password: String(password.value)
          }).then(() => {
            router.push('/events');
          })
        }
      }
    }
  }
)
</script>
