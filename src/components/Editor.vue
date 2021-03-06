<template>
  <div id="editor">
    <v-container class="ma-0 pa-0">
      <v-btn outline icon class="green green--text text--darken-4" @click="addMemo">
        <v-icon>add</v-icon>
      </v-btn>
      <v-btn
        outline
        icon
        class="blue blue--text text--darken-4"
        v-if="isEditing"
        @click="saveMemos"
      >
        <v-icon>save</v-icon>
      </v-btn>
      <v-btn
        outline
        icon
        class="blue blue--text text--darken-4"
        v-if="!isEditing"
        @click="editMemo"
      >
        <v-icon>edit</v-icon>
      </v-btn>
      <v-btn
        outline
        icon
        class="red red--text text--darken-4"
        v-if="memos.length > 1"
        @click="deleteMemo"
      >
        <v-icon>delete</v-icon>
      </v-btn>
      <v-layout row justify-center>
        <v-card class="mr-2" width="150" height="484">
          <v-list subheader class="scroll">
            <template v-for="(memo, index) in memos">
              <v-list-tile
                :key="index"
                @click="selectMemo(index)"
                v-bind:class="{ 'blue': index==selectedIndex }"
              >
                <v-list-tile-content>
                  <v-list-tile-sub-title>{{ memo.title }}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-divider v-if="index + 1 < memos.length" :key="index"></v-divider>
            </template>
          </v-list>
        </v-card>
        <v-layout column justify-center v-if="isEditing">
          <v-text-field box label="タイトル" v-model="memos[selectedIndex].title"></v-text-field>
          <v-layout row justify-center>
            <v-textarea
              box
              no-resize
              height="400"
              label="本文"
              v-model="memos[selectedIndex].markdown"
            ></v-textarea>
            <div class="preview markdown ml-5 mt-4">
              <div v-html="preview()"></div>
            </div>
          </v-layout>
        </v-layout>
        <v-layout column v-if="!isEditing">
          <h1 class="view ml-5">{{memos[selectedIndex].title}}</h1>
          <div class="view markdown ml-5 mt-3 gray" v-html="preview()"></div>
        </v-layout>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
marked.setOptions({ breaks: true });
import marked from "marked";
export default {
  name: "editor",
  props: ["user"],
  data() {
    return {
      memos: [
        {
          title: "",
          markdown: ""
        }
      ],
      selectedIndex: 0,
      isEditing: false
    };
  },
  created: function() {
    firebase
      .database()
      .ref("memos/" + this.user.uid)
      .once("value")
      .then(result => {
        if (result.val()) {
          this.memos = result.val();
        }
      });
  },
  mounted: function() {
    document.onkeydown = e => {
      if (e.key == "s" && (e.metaKey || e.ctrlKey)) {
        this.saveMemos();
        return false;
      }
    };
  },
  beforeDestroy: function() {
    document.onkeydown = null;
  },
  methods: {
    logout: function() {
      firebase.auth().signOut();
    },
    addMemo: function() {
      this.memos.push({
        markdown: "",
        title: "新規メモ"
      });
      this.saveMemos();
    },
    deleteMemo: function() {
      this.memos.splice(this.selectedIndex, 1);
      if (this.selectedIndex > 0) {
        this.selectedIndex--;
      }
      this.saveMemos();
    },
    saveMemos: function() {
      firebase
        .database()
        .ref("memos/" + this.user.uid)
        .set(this.memos);
      this.isEditing = false;
    },
    selectMemo: function(index) {
      this.selectedIndex = index;
    },
    editMemo: function(index) {
      this.isEditing = true;
    },
    preview: function() {
      return marked(this.memos[this.selectedIndex].markdown);
    },
    displayTitle: function(text) {
      return text.split(/\n/)[0].replace(/#\s/, "");
    }
  }
};
</script>

<style lang="scss" scoped>
.editorWrapper {
  display: flex;
}
.memoListWrapper {
  width: 20%;
  border-top: 1px solid #000;
}
.memoTitle {
  height: 1.5em;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
}
.addMemoBtn {
  margin-top: 20px;
}
.deleteMemoBtn {
  margin: 10px;
}
.markdown {
  width: 45%;
  height: 400px;
}
.preview {
  width: 45%;
  text-align: left;
}
.view {
  width: 80%;
  text-align: left;
}
.gray {
  color: rgb(80, 79, 79);
}
</style>
