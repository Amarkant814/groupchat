<template>
  <div class="chat-sms-app-alt" ref="chatContainer">
    <div class="chat-sms-app" v-for="item in messages.msgs" :key="item.id">
      <div class="chat-box" v-if="item.sender != getUserName">
        <div class="chat-box-align">
          <span class="avatar">{{ item.sender[0].toUpperCase() }}</span>

          <span class="message-display">
            <div class="msg-bar">
              <span class="message-content">{{ item.content }}</span>
              <span class="flex align-items-center" v-if="item.likes && showLike && showLike.mid"><span class="" ><i class="pi pi-heart-fill" @click="addOrRemoveLike(item.id,'unlike')" ></i><span>{{ item.likes }}</span></span></span>
              <span v-else> <i class="pi pi-heart"  @click="addOrRemoveLike(item.id,'like')"></i></span>
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
              <span class="flex align-items-center" v-if="item.likes && showLike && showLike.mid"><span class="" ><i class="pi pi-heart-fill" @click="addOrRemoveLike(item.id,'unlike')" ></i><span>{{ item.likes }}</span></span></span>
              <span v-else> <i class="pi pi-heart"  @click="addOrRemoveLike(item.id,'like')"></i></span>
            </div>
            <span class="message-time">{{ formatDate(item.timestamp) }}</span>
          </span>
          <span class="avatar">{{ item.sender[0].toUpperCase() }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "ChatSmsApp",
  data() {
    return {
      showLike: {}
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
    ...mapActions({}),
    addOrRemoveLike(mid,action){
      if(action == 'like'){
        this.showLike[mid] = false;
        if(this.messages.msgs[mid-1].likes){
          this.messages.msgs[mid-1].likes += 1
        }
        else{
          this.messages.msgs[mid-1].likes = 1
        }
      }
      else if(action == 'unlike'){
        this.showLike[mid] = true;
        if(this.messages.msgs[mid-1].likes){
          this.messages.msgs[mid-1].likes -= 1
        }
        else{
          this.messages.msgs[mid-1].likes = 0
        }
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
