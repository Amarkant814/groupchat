<template>
  <div class="chat-sms-app-alt" ref="chatContainer">
    <div class="chat-sms-app" v-for="item in messages.msgs" :key="item.id">
      <div class="chat-box" v-if="item.sender != getUserName">
        <div class="chat-box-align">
          <span class="avatar">{{ item.sender[0].toUpperCase() }}</span>

          <span class="message-display">
            <div class="msg-bar">
              <span class="message-content">{{ item.content }}</span>
              <span class="like-content">
                <span class="flex align-items-center" v-if="item.mylike"><i class="pi pi-heart-fill" @click="addOrRemoveLike(item.id,'unlike')" ></i></span>
                <span v-else> <i class="pi pi-heart"  @click="addOrRemoveLike(item.id,'like')"></i></span>
                <span v-if="item.likes" @click="showLikes(item.id)" style="margin-top:5px">{{ item.likes }}</span>
              </span>
            </div>
            <span class="message-time">{{ formatDate(item.timestamp) }}</span>
          </span>
        </div>
      </div>
      <div class="chat-box chat-box-right" v-else>
        <div class="chat-box-align-right">
          <span class="message-display">
            <div class="msg-bar">
              <span class="message-content">{{ item.content }}</span>
              <span class="like-content">
                <span class="flex align-items-center" v-if="item.mylike"><i class="pi pi-heart-fill" @click="addOrRemoveLike(item.id,'unlike')" ></i></span>
                <span v-else> <i class="pi pi-heart"  @click="addOrRemoveLike(item.id,'like')"></i></span>
                <span v-if="item.likes" @click="showLikes" style="margin-top:5px">{{ item.likes }}</span>
              </span>
            </div>
            <span class="message-time">{{ formatDate(item.timestamp) }}</span>
          </span>
          <span class="avatar">{{ item.sender[0].toUpperCase() }}</span>
        </div>
      </div>
    </div>
  </div>
  <Dialog v-model:visible="showLikedUser" modal :closable="true" :header="likedHeader" :style="{ width: '50vw' }">
    <div v-for="user in likedUsers">
      {{ user }}
    </div>
    </Dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "ChatSmsApp",
  data() {
    return {
      showLikedUser:false,
      likedHeader: 'Users that liked this message: ',
      likedUsers:[],
    };
  },
  props: {
    messages: {
      default: {},
      type: Object,
    },
  },
  computed: {
    ...mapGetters({
      getUserName: "getUserName",
    }),
  },
  methods: {
    ...mapActions({
      getAllChats: "getAllChats",
      likeMessage: "likeMessage",
      getLikedUsers: "getLikedUsers"
    }),
    async addOrRemoveLike(mId,action){
      let payload = {
        m_id:mId,
        type:action,
        group_id: this.messages.id
      }
      await this.likeMessage(payload);
      this.$emit('likeChat',payload)
    },
    async showLikes(message_id){
      const resp = await this.getLikedUsers({m_id:message_id});
      if(resp.status == 200){
        this.showLikedUser = true
        this.likedUsers = resp.data.users
      }
    },
    formatDate(value) {
      const dateObject = new Date(value);
      const hours = dateObject.getHours();
      const minutes = dateObject.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      const formattedHours = hours % 12 || 12;
      const formattedTime = `${String(formattedHours).padStart(
        2,
        "0"
      )}:${String(minutes).padStart(2, "0")} ${ampm}`;

      return formattedTime;
    },
  },
  mounted() {
    this.$refs.chatContainer.scrollTop = this.$refs.chatContainer.scrollHeight;
  }
};
</script>

<style></style>
