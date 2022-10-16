<script setup lang="ts">
import { copyToClipboard } from 'quasar';
import { ref } from 'vue'

const INITIAL_VALUE_LENGTH = 5;

type Item = {
  originalVal: string
  newVal: string
}

const words = ref(
  new Array<Item | null>(INITIAL_VALUE_LENGTH)
  .fill(null)
  .map(() => {
    return {
      originalVal: '',
      newVal: ''
    }
  })
);
const originalSentence = ref('');
const newSentence = ref('');

const clickReplace = (): void => {
  console.log(originalSentence.value);
};

const clickCopy = (): void => {
  copyToClipboard(newSentence.value)
    .then(() => {
      // success!
    })
    .catch(() => {
      // fail
    })
};
</script>

<template>
    <h1>複数単語置換ツール「まるちぇん」</h1>
    <div class="container">入力した文章の中で、指定した複数の単語を置換した文章を生成してくれるツールです。</div>
    <div class="container">
      <h2>置換したい単語のセットを記入してください</h2>
      <div v-for="word in words" class="word-fields row">
        <div class="col-5 word-field">
          <q-input v-model="word.originalVal" bg-color="white" filled label="置換元の単語" placeholder="山田" />
        </div>
        <div class="col-1">
          <q-icon name="double_arrow" size="2em" />
        </div>
        <div class="col-5 word-field">
          <q-input v-model="word.newVal" bg-color="white" filled label="置換後の単語" placeholder="ヤマダ" />
        </div>
      </div>
    </div>
    <div class="container">
      <h2>単語を置換する文章を記入してください</h2>
      <div class="sentence-fields row">
        <div class="col-5 sentence-field">
          <p>置換元となる文章</p>
        </div>
        <div class="col-1" /><!--アイコンの位置調整用-->
        <div class="col-5 sentence-field">
          <p>置換元となる文章</p>
        </div>
      </div>
      <div class="sentence-fields row">
        <div class="col-5 sentence-field">
          <q-input
            v-model="originalSentence"
            bg-color="white"
            placeholder="あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。"
            filled
            type="textarea"
          />
          <div class="actions">
            <q-btn color="primary" label="置換する" @click="clickReplace" />
          </div>
        </div>
        <div class="col-1">
          <q-icon name="chevron_right" size="3em" />
          <div class="actions">
          </div>
        </div>
        <div class="col-5 sentence-field">
          <q-input
            v-model="newSentence"
            bg-color="dark"
            color="lime-11"
            filled
            readonly
            type="textarea"
          />
          <div class="actions">
            <q-btn icon="content_copy" color="primary" label="置換後の文章をコピー" @click="clickCopy" />
          </div>
        </div>
      </div>
    </div>
</template>

<style lang="scss" scoped>
.container {
  margin: 8px 0 40px;
  padding: 8px 16px;
  font-size: 16px;

  .word-fields {
    justify-content: center;
    align-items: center;

    .word-field {
      padding: 8px 16px;
      max-width: 350px;
    }
  }
  .sentence-fields {
    justify-content: center;
    align-items: center;

    .sentence-field {
      padding: 8px 16px;
    }
  }
  .actions {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 16px 0;
  }
}
</style>