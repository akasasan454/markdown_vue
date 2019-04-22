<template>
  <div id="editor">
    <h1>エディター</h1>
    <span>{{ user.displayName }}</span>
    <button @click="logout">ログアウト</button>
    <div class="editorWrapper">
      <div class="memoListWrapper"></div>
      <textarea class="markdown" v-model="markdown"></textarea>
      <div class="preview" v-html="preview()"></div>
    </div>
  </div>
</template>

<script>
import marked from "marked";
export default {
  name: "editor",
  props: ["user"],
  data() {
    return {
      memos: [{ markdown: "" }],
      selectedIndex: 0
    };
  },
  methods: {
    logout: function() {
      firebase.auth().signOut();
    },
    addMemo: function() {
      this.memos.push({ markdown: "無題のメモ" });
    },
    selectedMemo: function() {
      this.slectedIndex = index;
    },
    preview: function() {
      return marked(this.memos[this.selectedIndex].markdown);
    },
    displayName: function(text) {
      return text.split(/\n/)[0];
    }
  }
};
</script>

<style lang="scss" scoped>
.editer {
  height: 100%;
}
.memoListWrapper {
  width: 20%;
  padding-bottom: 20px;
}
.memoList {
  padding: 10px;
  box-sizing: border-box;
  text-align: left;
  border-bottom: #ccc 1px solid;
  &:nth-child(even) {
    background-color: rgba(#0078ff, 0.1);
  }
  &[data-selected="true"] {
    background-color: rgba(#00ff30, 0.2);
  }
}
.memoTitle {
  height: 1.5em;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
}
.memoBtns {
  padding: 10px;
  border-bottom: #ccc 1px solid;
  :nth-child(n + 2) {
    margin-left: 10px;
  }
}
.deleteMemoBtn {
  background-color: rgba(255, 0, 50, 0.8);
}
.markdown {
  border: none;
  border-right: #ccc 1px solid;
  border-left: #ccc 1px solid;
  background-color: #eee;
  box-shadow: inset 0 0 5px 0 rgba(0, 0, 0, 0.1);
  padding: 10px;
  width: 50%;
  resize: none;
}
.previewWrapper {
  text-align: left;
  width: 30%;
}
.previewTitle {
  color: #888;
  padding: 10px;
  font-size: 14px;
  border-bottom: #ddd 1px dotted;
}
.preview {
  padding: 10px;
}
.markdown,
.memoListWrapper,
.previewWrapper {
  overflow: scroll;
  float: left;
  height: 100%;
  box-sizing: border-box;
}
</style>
