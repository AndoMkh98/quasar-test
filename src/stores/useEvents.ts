import { defineStore } from 'pinia';
import axios from 'axios';
export type Event = {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  country: string;
  files: Array<string>;
}
export const useEvents = defineStore('users', {
  state: (): {
    events: Array<Event>,
    selectedEvent: Event | null;
  } => ({
    events: [],
    selectedEvent: null
  }),

  getters: {
    selectEvents: (state) => state.events,
  },
  actions: {
    setSelectedEvent (payload: Event)  {
      this.selectedEvent = payload
    },
    async getEvents () {
      try {
        const response = await axios.get('http://localhost:8085/events')
        this.events = response.data
      } catch (e: any) {
        throw new Error(e)
      }
    },

    async createEvent(body: Omit<Event, 'id'>) {
      try {

        const { files, ...rest } = body
        const formData = new FormData();
        files.forEach(item => {
          formData.append('files', item)
        })
        formData.append('body', JSON.stringify(rest))
        const response = await axios.post('http://localhost:8085/events', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.token}`
          }
        })
        this.events = this.events.concat(response.data);
      } catch(err: any) {
        throw new Error(err)
      }
    },

    async updateEvent(body: Partial<Event>) {
      try {
        const response = await axios.patch(`http://localhost:8085/events/${body.id}`, body, {
          headers: {
            Authorization: `Bearer ${localStorage.token}`
          }
        })
        this.events = this.events.map((item) => item.id === response.data.id ? response.data : item);
      } catch(err: any) {
        throw new Error(err)
      }
    },

    async removeEvent(id: string) {
      try {
        const response = await axios.delete(`http://localhost:8085/events/${id}`)
        this.events = this.events.filter((item) => item.id !== id );
      } catch(err: any) {
        throw new Error(err)
      }
    }
  }
});
