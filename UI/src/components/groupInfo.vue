<template>
    <div class="chat-sms-app-alt" ref="chatContainer">
      <div class="card info-section">
        <DataTable :value="userInfo" v-model:filters="filters" dataKey="id" :loading="loading"
                :globalFilterFields="['username']">
            <template #header>
              <div class="flex justify-content-between" style="height:60%">
                  <span class="p-input-icon-left">
                      <i class="pi pi-search" />
                      <InputText v-model="filters['global'].value" placeholder="Search Participants" />
                  </span>
                  <Button type="button" icon="pi pi-plus" label="Add Participant" @click="addNewUser" style="width:25%"/>
              </div>
            </template>
        <Column field="username" :header="`Username`" style="width:85%">
          <template #body="slotProps">
            {{
            slotProps.data.username
            }}
          </template>
        </Column>
        <Column field="actions" :header="`Action`">
          <template #body="slotProps">
            <span style="cursor: pointer;" @click="removeDialog(slotProps.data)"><i class="pi pi-trash"></i></span>
          </template>
        </Column>
      </DataTable>
      </div>
    </div>
    <Dialog v-model:visible="showAddUser" modal :closable="true" :header="addGroupUserHeader" :style="{ width: '50vw' }">
      <div class="form-group">
      <MultiSelect v-if="getAllUsers" v-model="selectedUsers" :options="filteredUsers" optionLabel="username"
        placeholder="Select Users to add" filter class="users-multiselect" />
      </div>
      <template #footer>
        <Button label="Add" icon="pi pi-check" :disabled="checkFilled" @click="addUserInGroup" autofocus />
      </template>
    </Dialog>
    <Dialog v-model:visible="showRemoveUser" modal :closable="true" :header="removeHeader" :style="{ width: '50vw' }">
      <div class="form-group">
      <p>Are You sure You want to remove this User from the Group?</p>
      </div>
      <template #footer>
        <div class="flex justify-content-center">
          <Button label="No" icon="pi pi-times" @click="showRemoveUser = false" class="b-secondary" style="width:50%"/>
          <Button label="Yes" icon="pi pi-check" @click="removeUser" autofocus class="b-primary" style="width:50%"/>
        </div>
      </template>
    </Dialog>
  </template>
  
  <script>
  import InputText from 'primevue/inputtext';
  import Button from "primevue/button";
  import MultiSelect from "primevue/multiselect";
  import { mapActions, mapGetters } from "vuex";
  import { FilterMatchMode } from 'primevue/api';
  export default {
    name: "ChatSmsApp",
    components:{
      InputText,
      Button,
      MultiSelect
    },
    data() {
      return {
        filters:{
          global: { value: null, matchMode: FilterMatchMode.CONTAINS },
          name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        },
        showAddUser:false,
        addGroupUserHeader: "Add More Participants",
        selectedUsers: [],
        showRemoveUser: false,
        removeHeader: "Remove User from Group",
        deletedUser: null,
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
        getAllUsers: 'getAllUsers'
      }),
      userInfo(){
        return this.getGroupInfo.user_info
      },
      filteredUsers(){
        return this.getAllUsers.filter(el => !this.getGroupInfo.user_info.map(element => element.id).includes(el.id))
      },
      checkFilled(){
        return this.selectedUsers.length == 0
      }
    },
    methods: {
      ...mapActions({
        fetchAllUsers: "fetchAllUsers",
        addNewParticipant: "addNewParticipant",
        deleteUserFromGroup: "deleteUserFromGroup",
        fetchGroupUsers: 'fetchGroupUsers'
      }),
      removeDialog(data){
        this.deletedUser = data.id
        this.showRemoveUser = true
      },
      async removeUser(){
        let payload = {
          groupID: this.getGroupInfo.group_info[0].id,
          user: this.deletedUser
        }
        const resp = await this.deleteUserFromGroup(payload)
        if(resp.status == 200){
          this.$toast.add({severity:'success', summary: 'User Removed from group ', life:3000})
          this.showRemoveUser = false;
          await this.fetchGroupUsers({ groupID: this.getGroupInfo.group_info[0].id})
        }
      },
      async addNewUser(){
        this.showAddUser = true
        await this.fetchAllUsers();
      },
      async addUserInGroup(){
        let payload = {
          groupID: this.getGroupInfo.group_info[0].id,
          users: this.selectedUsers.map(item => item.id)
        }
        const resp = await this.addNewParticipant(payload);
        if(resp.status == 201 ){
          this.$toast.add({severity:'success', summary: 'New Users Added ', life:3000})
          this.showAddUser = false;
          await this.fetchGroupUsers({ groupID: this.getGroupInfo.group_info[0].id})
        }
      }
    },
    async mounted() {
    }
  };
  </script>
  
  <style></style>
  