<template>
  <q-layout>
    <q-page-container>
      <q-page class="col justify-center">
        <h1>Register page</h1>

        <div class="q-pa-md" style="max-width: 400px">

          <q-form
            @submit="onSubmit"
            class="q-gutter-md"
          >
            <q-input
              ref="firstNameRef"
              filled
              v-model="firstName"
              label="Your first name *"

              lazy-rules
              :rules="[val => !!val || 'Field is required']"
            />
            <q-input
              filled
              ref="lastNameRef"
              v-model="lastName"
              label="Your last name *"
              lazy-rules
              :rules="[val => !!val || 'Field is required']"
            />
            <q-input
              filled
              ref="userNameRef"
              v-model="userName"
              label="Your username *"
              lazy-rules
              :rules="[val => !!val || 'Field is required']"
            />
            <q-input
              filled
              ref="emailRef"
              v-model="email"
              label="Your work email *"
              lazy-rules
              :rules="[val => !!val || 'Field is required']"
            />
            <q-input
              filled
              ref="organizationRef"
              v-model="organization"
              label="Your organization *"
              lazy-rules
              :rules="[val => !!val || 'Field is required']"
            />
            <q-input
              filled
              ref="phoneNumberRef"
              v-model="phoneNumber"
              label="Your phone number *"
              lazy-rules
              :rules="[val => !!val || 'Field is required']"
            />
            <q-input
              filled
              ref="countryRef"
              v-model="country"
              label="Your country *"
              lazy-rules
              :rules="[val => !!val || 'Field is required']"
            />
            <q-input
              filled
              ref="passwordRef"
              v-model="password"
              type="password"
              label="Your password *"
              lazy-rules
              :rules="[val => !!val || 'Field is required']"
            />
            <q-input
              filled
              ref="confirmPasswordRef"
              type="password"
              v-model="confirmPassword"
              label="Confirm password*"
              lazy-rules
              :rules="[val => {
                if(!val) {
                  return 'Field is required'
                } if(confirmPassword !== password) {
                  return 'Password and confirm password does not match'
                }
              }]"
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
import { useUsers } from 'stores/stores';

export default defineComponent({
  name: 'RegisterPage',
  setup: () => {
    const store = useUsers();
    const firstName = ref(null)
    const firstNameRef = ref(null)
    const lastName = ref(null)
    const lastNameRef = ref(null)
    const userName = ref(null)
    const userNameRef = ref(null)
    const email = ref(null)
    const emailRef = ref(null)
    const organization = ref(null)
    const organizationRef = ref(null)
    const phoneNumber = ref(null)
    const phoneNumberRef = ref(null)
    const country = ref(null)
    const countryRef = ref(null)
    const password = ref(null)
    const passwordRef = ref(null)
    const confirmPassword = ref(null)
    const confirmPasswordRef = ref(null)
    return {
      firstName,
      firstNameRef,
      lastName,
      lastNameRef,
      userName,
      userNameRef,
      email,
      emailRef,
      organization,
      organizationRef,
      phoneNumber,
      phoneNumberRef,
      country,
      countryRef,
      password,
      passwordRef,
      confirmPassword,
      confirmPasswordRef,
      onSubmit: () => {
        if([
          firstNameRef,
          lastNameRef,
          userNameRef,
          emailRef,
          organizationRef,
          phoneNumberRef,
          countryRef,
          passwordRef,
          confirmPasswordRef
        ].every(field => field.value.validate())) {
        store.registerUser({
            firstName: String(firstName.value),
            lastName: String(lastName.value),
            email: String(email.value),
            userName: String(userName.value),
            organization: String(organization.value),
            phoneNumber: String(phoneNumber.value),
            country: String(country.value),
            password: String(password.value)
          })
        }
        return;
      },
    }
  }
})
</script>
