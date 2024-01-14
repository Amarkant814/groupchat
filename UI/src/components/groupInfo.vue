<template>
    <div class="chat-sms-app-alt" ref="chatContainer">
      <div class="info-section">
        <DataTable :value="userInfo">
        <Column field="username" :header="`Username`" style="width:85%">
          <template #body="slotProps">
            {{
            slotProps.data.username
            }}
          </template>
        </Column>
        <Column field="actions" :header="`Action`">
          <template #body="slotProps">
            <span style="cursor: pointer;"><i class="pi pi-trash"></i></span>
          </template>
        </Column>
      </DataTable>
      </div>
    </div>
  </template>
  
  <script>
  import { mapActions, mapGetters } from "vuex";
  export default {
    name: "ChatSmsApp",
    data() {
      return {
      };
    },
    props: {
      info: {
        default: {},
        type: Object,
      },
    },
    computed: {
      ...mapGetters({
        getGroupInfo: "getGroupInfo",
      }),
      userInfo(){
        return this.getGroupInfo.user_info
      }
    },
    methods: {
      
    },
    mounted() {
    }
  };
  </script>
  
  <style></style>
  