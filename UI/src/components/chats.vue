<template>
  <section class="loggedin-section">
    <div class="rectangle-1">
      <div class="alignElements">
        <img class="img-span" src="./../assets/images/Group7.svg" alt="" />
        <InputText :class="errors && errors[0] ? 'error_msgs' : ''" v-bind="field" field="searchChats"
          placeholder="Search" v-model="searchChats">
        </InputText>
        <img class="img-search" src="./../assets/images/search.svg" alt="" />
      </div>
      <span class="user-txt" @click="toggleProfile"> {{ getUserName[0].toUpperCase() }}</span>
    </div>


    <OverlayPanel ref="profileOverlay" class="profile-panel">
      <div class="profile-overlay">
        <hr class="m-t-2" />
        <div class="add-user" @click="showUserDialog = true">
          Add Users
        </div>
        <hr class="m-t-2" />
        <div>
          <div class="data-truncate">
            <RouterLink to="/signout">
              <h4 class="fw-300 flex align-items-center justify-content-start gap-2">
                <span class="pi pi-fw pi-sign-out"></span>
                <span>Logout</span>
              </h4>
            </RouterLink>
          </div>
        </div>
      </div>
    </OverlayPanel>




    <span style="display: flex">
      <div class="rectangle-4">
        <div class="frame-8">
          <span class="chats">Chats</span>

          <span class="img-add">
            <img class="img-addlayout" @click="AddChats" src="./../assets/images/add.svg" alt="" />
          </span>
        </div>
        <div class="chat-layout" :class="item.id == messages?.id ? 'bg-color-gray' : ''" v-for="item in displayChats"
          :key="item.id" @click="openChat(item)">
          <span class="rectangle-5">
            <span class="participant">
              {{ getShortNameForChats(item.name) }}
            </span>
          </span>
          <span class="frame-16">
            <div class="frame-15">
              <span class="txt-1"> {{ item.name }}</span>
              <span class="txt-2">Created {{ formatDate(item.createdAt) }}</span>
            </div>
          </span>
        </div>
      </div>
      <div class="chat-flex">
        <div class="frame-18" ref="chatContainer">
          <div class="text">
            {{ messages?.name }}

            <span class="group-info">
              <i class="pi pi-info-circle" v-if="!showGroupData" @click="groupInfo('show')"></i>
              <i class="pi pi-times" v-else @click="groupInfo('hide')"></i>
            </span>
          </div>
          <GroupInfo v-if="showGroupData" :info="dispGroupInfo"/>
          <IndividualChat :messages="messages" v-else/>
        </div>
        <div class="chat-text-field" v-if="!showGroupData">
          <Form @submit="sendChatMessage()" ref="sendSMS">
            <div class="chat-input-field">
              <!-- <img class="img-info" src="./../assets/images/attach_file.svg" alt="" /> -->

              <InputText field="addNewMessage" v-model="addNewMessage" />
              <button type="submit" class="img-add">
                <img src="./../assets/images/send.svg" alt="" />
              </button>
            </div>
          </Form>
        </div>
      </div>
    </span>
  </section>
  <Dialog v-model:visible="visible" modal :closable="true" :header="headerValue" :style="{ width: '50vw' }">
    <div class="form-group">
      <InputText field="contentValue" v-model="contentValue" placeholder="Group Name" />
      <MultiSelect v-if="getAllUsers" v-model="selectedUsers" :options="getAllUsers" optionLabel="username"
        placeholder="Select Users for this group" filter class="users-multiselect" />

    </div>

    <template #footer>
      <Button label="Create" icon="pi pi-check" :disabled="checkFilled" @click="addGroup" autofocus />
    </template>
  </Dialog>

  <Dialog v-model:visible="showUserDialog" modal :closable="true" :header="userHeaderValue" :style="{ width: '50vw' }">
    <p>
      As an admin, You can add new users to this application and invite them by sharing credentials to start a
      conversation with them in
      a group. </p>
    <p class="name-label"><strong>New User Details</strong></p>

    <Form @submit="addNewUser" ref="form">
      <div class="grid userinfo">
        <InputValidator name="username" rules="required" v-slot="{ field, errors }">
          <InputText field="userName" :class="errors && errors[0] ? 'error_msgs' : ''" v-bind="field" v-model="userName" placeholder="Username" :style="{ marginTop: '10px' }"  />
          <span class="error_msg">
            <small v-if="errors && errors[0]">{{ errors[0] }}</small>
          </span>
        </InputValidator>
        <InputValidator name="email" rules="required|email" v-slot="{ field, errors }">
          <InputText field="userEmail" :class="errors && errors[0] ? 'error_msgs' : ''" v-bind="field" v-model="userEmail" placeholder="Email"
            :style="{ marginTop: '10px' }" />
          <span class="error_msg">
            <small v-if="errors && errors[0]">{{ errors[0] }}</small>
          </span>
        </InputValidator>

        <InputValidator name="password" rules="required" v-slot="{ field, errors }">
          <InputText field="userPass" :class="errors && errors[0] ? 'error_msgs' : ''" v-model="userPass" v-bind="field" placeholder="Password" type="password"
            :style="{ marginTop: '10px' }" />
          <span class="error_msg">
            <small v-if="errors && errors[0]">{{ errors[0] }}</small>
          </span>
        </InputValidator>
      </div>
    </Form>

    <template #footer>
      <Button label="Add User" type="submit" icon="pi pi-plus" :disabled="checkUserFilled" autofocus />
    </template>
  </Dialog>
</template>
<script>


import InputText from "primevue/inputtext";
import MultiSelect from "primevue/multiselect"
import Button from "primevue/button";
import IndividualChat from "./IndividualChat.vue";
import GroupInfo from "./groupInfo.vue"
import { mapActions, mapGetters } from "vuex";
import { v4 as uuidv4 } from "uuid";
import io from "socket.io-client"

export default {
  data() {
    return {
      messages: [],
      chatMessages: null,
      socket: null,
      searchChats: "",
      addNewMessage: "",
      contentValue: "",
      visible: false,
      headerValue: "Create a Group",
      userHeaderValue: "Add Users on this Platform",
      selectedUsers: [],
      isUserSelected: false,
      showUserDialog: false,
      userEmail: '',
      userName: '',
      userPass: '',
      showGroupData: false,
      dispGroupInfo:{}
    };
  },
  components: {
    InputText,
    Button,
    IndividualChat,
    MultiSelect,
    GroupInfo
  },
  computed: {
    ...mapGetters({
      getChats: "getChats",
      getUserName: "getUserName",
      getAllUsers: "getAllUsers"
    }),
    checkFilled() {
      return (!this.contentValue || this.selectedUsers.length == 0)
    },
    checkUserFilled() {
      return (!this.userEmail || !this.userName || !this.userPass)
    }
  },
  methods: {
    ...mapActions({
      getAllChats: "getAllChats",
      AddChatInStore: "AddChatInStore",
      loginApi: "loginApi",
      AddMessagesInStore: "AddMessagesInStore",
      fetchAllUsers: "fetchAllUsers",
      createGroup: "createGroup",
      signupApi: "signupApi",
      fetchGroupUsers: "fetchGroupUsers",
      AddChatLive: "AddChatLive",
    }),
    async groupInfo(type = 'hide'){
      this.showGroupData = !this.showGroupData
      if(type == 'show'){
        const resp = await this.fetchGroupUsers({ groupID: this.messages.id})
        if (resp.status == 200){
          this.dispGroupInfo = resp.data
        }
      }
    },
    toggleProfile(e) {
      this.$refs.profileOverlay.toggle(e);
    },
    async addNewUser() {
      const resp = await this.signupApi({ email: this.userEmail, username: this.userName, password: this.userPass, role: 2 });
      if (resp.status == 201) {
        this.$toast.add({ summary: "User added successfully", severity: "success", life: 3000 })
      }
      this.showUserDialog = false
    },
    async AddChats() {
      this.isUserSelected = false;
      this.visible = true;
      await this.fetchAllUsers();
    },
    async sendChatMessage() {
      if (!this.addNewMessage) {
        return;
      }
      let payload = {
        groupID: this.messages.id,
        content: this.addNewMessage,
      };
      let final_payload = {
        api:{...payload},
        chatId: this.messages.id,
        messages: {
          id: uuidv4(),
          content: this.addNewMessage,
          sender: this.getUserName,
          timestamp: new Date().toISOString(),
        },
      };
      this.addNewMessage = "";
      await this.AddMessagesInStore(final_payload);
      this.socket.emit('newMessage', final_payload);
      this.displayChats = this.getChats;
      this.messages = this.getChats.find(el => el.id == this.messages.id);
      this.$refs.chatContainer.scrollTop = this.$refs.chatContainer.scrollHeight;
    },
    async addGroup() {
      let payload = {
        id: uuidv4(),
        name: this.contentValue,
        createdAt: new Date().toISOString(),
        messages: [],
      };
      let api_payload = {
        groupname: this.contentValue,
        users: this.selectedUsers.map(item => item.id)
      }
      await this.AddChatInStore(payload);
      await this.createGroup(api_payload);
      const roomInfo = {
        roomId: this.messages.id,
        ...api_payload
      }
      this.socket.emit('joinRoom',roomInfo)
      this.displayChats = this.getChats;
      this.messages = this.getChats;
      this.selectedUsers = [];
      this.contentValue = "";
      this.visible = false;
    },
    openChat(item) {
      this.messages = item;
      this.showGroupData = false;
    },
    getShortNameForChats(item) {
      const name = item.split(" ");
      if (name.length <= 1) {
        return name[0][0];
      } else {
        return name[0][0] + name[1][0];
      }
    },
    sendMessage() {
      // Emit a 'newMessage' event to the server
      this.socket.emit('newMessage', { text: this.addNewMessage });
    },
    formatDate(value) {
      const dateObject = new Date(value);
      const day = dateObject.getDate();
      const month = new Intl.DateTimeFormat("en", { month: "short" }).format(
        dateObject
      );
      const year = dateObject.getFullYear();

      const formattedDate = `${day} ${month} ${year}`;
      return formattedDate;
    },
    async signout() {
      sessionStorage.removeItem('atoken');
      window.location.reload()
    },
  },
  async mounted() {

    // this.$toast.add({summary: "Report not found", severity: "error", life: 3000})

    // this.$refs.chatContainer.scrollTop = this.$refs.chatContainer?.scrollHeight;

    await this.getAllChats();
    this.messages = this.getChats[0];
    this.displayChats = this.getChats;
    this.socket = io('http://localhost:3000', {
      auth: {
        token: sessionStorage.getItem('atoken'),
      },
    })

    this.socket.on('messages', (messages) => {
      this.chatMessages = messages;
    });

    this.socket.on('newMessage', (message) => {
      if(message.messages.sender != this.getUserName){
        this.AddChatLive(message)
      }
    });

    this.socket.on('deleteMessage', (messageId) => {
      this.chatMessages = this.messages.filter((msg) => msg.id !== messageId);
    });


  },
  watch: {
    searchChats() {
      this.displayChats = this.getChats.filter((chat) =>
        chat.name.toLowerCase().includes(this.searchChats.toLowerCase())
      );
    },
  },
};
</script>
<style></style>
