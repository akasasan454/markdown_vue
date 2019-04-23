<template>
  <div id="editor">
    <v-container>
      <h1>エディター画面</h1>
      <span>{{ user.displayName }}</span>
      <v-btn class="red white--text text--darken-4" @click="logout">ログアウト</v-btn>
      <div class="editorWrapper">
        <div class="memoListWrapper">
          <div
            class="memoList"
            v-for="(memo, index) in memos"
            :key="index"
            @click="selectMemo(index)"
            :data-selected="index == selectedIndex"
          >
            <p class="memoTitle">{{ displayTitle(memo.markdown) }}</p>
          </div>
          <v-btn outline round class="green green--text text--darken-4" @click="addMemo">メモの追加</v-btn>
          <v-btn
            outline
            round
            class="red red--text text--darken-4"
            v-if="memos.length > 1"
            @click="deleteMemo"
          >選択中のメモの削除</v-btn>
          <v-btn outline round class="blue blue--text text--darken-4" @click="saveMemos">メモの保存</v-btn>
        </div>
        <v-layout column justify-center>
          <v-text-field box label="タイトル" v-model="memos[selectedIndex].title"></v-text-field>
          <v-textarea box height="300" label="本文" v-model="memos[selectedIndex].markdown"></v-textarea>
        </v-layout>
        <div class="preview markdown-body pl-5" v-html="preview()"></div>
      </div>
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
      selectedIndex: 0
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
        markdown: "無題のメモ"
      });
    },
    deleteMemo: function() {
      this.memos.splice(this.selectedIndex, 1);
      if (this.selectedIndex > 0) {
        this.selectedIndex--;
      }
    },
    saveMemos: function() {
      firebase
        .database()
        .ref("memos/" + this.user.uid)
        .set(this.memos);
    },
    selectMemo: function(index) {
      this.selectedIndex = index;
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
.memoList {
  padding: 10px;
  box-sizing: border-box;
  text-align: left;
  border-bottom: 1px solid #000;
  // &:nth-child(even) {
  //   background-color: #f6f6f6;
  // }
  &[data-selected="true"] {
    background-color: rgb(4, 113, 255);
  }
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
  width: 40%;
  height: 500px;
}
.preview {
  width: 40%;
  text-align: left;
}
</style>
