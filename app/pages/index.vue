<template>
  <div class="container">
    <div class="content">
      <h1 class="title">ミートソース<br />ボロネーゼ</h1>

      <div class="input">
        <div class="input-inside">
          <label for="upload" class="input-label">
            <input type="file" id="upload" ref="upload" class="input-upload" @change="handleChange" />
          </label>
          <p class="input-text" v-if="!isSelected">画像をここに</p>
          <div class="input-preview" v-if="previewSrc"><img :src="previewSrc" alt="" /></div>
        </div>
      </div>

      <p :class="['result', { error: !isPredicting && error }]">{{ result }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isSelected: false,
      isPredicting: false,
      previewSrc: null,
      scores: [],
      error: false
    }
  },
  computed: {
    result() {
      if (this.isPredicting) {
        return '予測中...'
      }

      if (!this.isSelected) {
        return '？？？'
      }

      if (this.error) {
        return 'すみませんが、もう一度・・・'
      }

      if (!this.scores.length) {
        return 'わからぬ。'
      }

      const labelToResult = {
        meatsource: 'たぶん、ミートソース',
        bolognese: 'たぶん、ボロネーゼ',
        kimurakaela: 'それは、木村カエラ'
      }

      return labelToResult[this.scores[0].displayName]
    }
  },
  methods: {
    handleChange() {
      const file = this.$refs.upload.files[0]

      if (file) {
        this.preview(file)
        this.predict(file)
      }
    },
    preview(file) {
      const reader = new FileReader()

      reader.addEventListener('load', () => {
        this.isSelected = true
        this.previewSrc = reader.result
      })

      reader.readAsDataURL(file)
    },
    async predict(file) {
      const formData = new FormData()

      formData.append('image', file)

      this.isPredicting = true

      try {
        this.scores = await this.$axios.$post('/api/predict', formData)
        console.log(this.scores)

        if (this.error) {
          this.error = false
        }
      } catch (err) {
        this.error = true
        console.error(err)
      }

      this.isPredicting = false
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  @include max {
    padding: 2rem;
  }
  @include min {
    width: 100vw;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.content {
  @include max {
    max-width: 420px;
    margin: 0 auto;
  }
  @include min {
    width: $mq-max;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.title {
  position: relative;
  font-size: 20px;
  line-height: 3.6;
  text-align: center;
  @include max {
    margin-bottom: 2rem;
  }
  @include min {
    width: calc(100% / 3);
    font-size: 24px;
  }
  &:before {
    content: '';
    width: 2em;
    height: 0.2rem;
    background-color: currentColor;
    @include center;
  }
}

.input {
  @include max {
    margin-bottom: 3rem;
  }
  @include min {
    width: calc(100% / 3);
    padding: 1rem;
    line-height: 3.6;
    text-align: center;
  }
  &-inside {
    position: relative;
    &:before {
      content: '';
      display: block;
      height: 0;
      padding-top: 56.25%;
      @include min {
        padding-top: 70%;
      }
    }
  }
  &-label {
    border: 0.2rem solid currentColor;
    @include fit-full;
    @include min {
      &:hover {
        opacity: 0.8;
      }
    }
  }
  &-upload {
    opacity: 0;
    cursor: pointer;
    @include fit-full;
  }
  &-text {
    line-height: 2;
    white-space: nowrap;
    pointer-events: none;
    @include center;
  }
  &-preview {
    padding: 1rem;
    pointer-events: none;
    @include center-flex;
    @include fit-full;
    img {
      width: auto;
      height: auto;
      max-width: 100%;
      max-height: 100%;
    }
  }
}

.result {
  line-height: 3.6;
  text-align: center;
  @include min {
    width: calc(100% / 3);
  }
  &.error {
    color: $color-error;
  }
}
</style>
