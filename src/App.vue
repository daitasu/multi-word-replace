<script setup lang="ts">
import { copyToClipboard, LocalStorage, useQuasar } from 'quasar';
import { onMounted, ref } from 'vue'

type Item = {
  originalVal: string
  newVal: string
}

const INITIAL_VALUE_LENGTH = 5;
const $q = useQuasar();

const wordsets = ref<Item[]>(
  new Array<Item | null>(INITIAL_VALUE_LENGTH)
    .fill(null) // 同じオブジェクト参照を持ってしまうためnullで初期値生成を行いmapする
    .map(() => {
      return {
        originalVal: '',
        newVal: ''
      }
    })
);
const originalSentence = ref('');
const newSentence = ref('');

const clickAdd = (): void => {
  const innerWordset = wordsets.value;
  innerWordset.push({
    originalVal: '',
    newVal: ''
  })
  wordsets.value = innerWordset;
}

const clickReplace = (): void => {
  let innerNewSentence = originalSentence.value;

  for (let i = 0; i < wordsets.value.length; i++) {
    const wordset = wordsets.value[i];
    if (!wordset.originalVal || !wordset.newVal) continue;
    
    innerNewSentence = innerNewSentence.replace(new RegExp(wordset.originalVal,'g'), wordset.newVal);
  }
  newSentence.value = innerNewSentence;

  notifySuccess('置換')
};

const clickCopy = (): void => {
  copyToClipboard(newSentence.value)
    .then(() => notifySuccess('コピー'))
    .catch(notifyError)
};

const notifySuccess = (value: string): void => {
  $q.notify({
      type: 'positive',
      message: `${value}しました`,
      icon: 'done',
      timeout: 1000
  })
};

const notifyError = (): void => {
  $q.notify({
    type: 'negative',
    message: 'エラーが発生しました',
    icon: 'warning',
    timeout: 1000
  })
};

const onBlur = () => {
  // 空欄を除去
  const innerWordset = wordsets.value.filter(wordset => {
    return !!wordset.originalVal && !! wordset.newVal
  })
  // ブラウザ上に単語セットを保存する
  LocalStorage.set('wordsets', innerWordset)
}

onMounted(() => {
  // ブラウザ上に保存している単語セットを適用する
  const value = LocalStorage.getItem<Item[]>('wordsets')
  if (!value) return;
  wordsets.value = value;
});
</script>

<template>
    <h1>複数単語置換ツール「まるちぇん」</h1>
    <div class="container">
      入力した文章の中で、指定した複数の単語を置換した文章を生成してくれるツールです。
    </div>
    <div class="container">
      <h2>1. 置換したい単語のセットを記入してください</h2>
      <p class="caption">※ 指定した単語のセットは閲覧端末のブラウザ上に保存されます。端末やブラウザの変更時には引き継がれないためご注意ください</p>
      <div v-for="wordset in wordsets" class="word-fields row">
        <div class="col-5 word-field">
          <q-input v-model="wordset.originalVal" bg-color="white" filled label="置換元の単語" placeholder="山田" @blur="onBlur" />
        </div>
        <div class="col-1">
          <q-icon name="double_arrow" size="2em" />
        </div>
        <div class="col-5 word-field">
          <q-input v-model="wordset.newVal" bg-color="white" filled label="置換後の単語" placeholder="ヤマダ" @blur="onBlur" />
        </div>
      </div>
      <div class="word-fields row">
        <div class="add-word col-12">
          <q-btn icon="add" color="primary" label="単語のセットを追加" @click="clickAdd" />
        </div>
      </div>
    </div>
    <div class="container">
      <h2>2. 単語を置換する文章を記入してください</h2>
      <p class="caption">※ 文章は保存されず破棄されます。コピーしてご利用ください。</p>
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
            <q-btn color="primary" label=" 文章を置換" @click="clickReplace" />
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

  .caption {
    color: #aaa;
    margin: 0 0 16px;
  }

  .word-fields {
    justify-content: center;
    align-items: center;

    .word-field {
      padding: 8px 16px;
      max-width: 350px;
    }
    .add-word {
      margin: 16px 0 0;
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