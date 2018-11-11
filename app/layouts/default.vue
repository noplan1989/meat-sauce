<template>
  <div class="app">
    <nuxt />
    <p class="github">
      <a href="https://github.com/noplan1989/meat-sauce" target="_blank">
        <img src="@/assets/icon/github.svg" alt="GitHub" />
      </a>
    </p>
  </div>
</template>

<style lang="scss">
html {
  font-family: sans-serif;
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 0.1em;
  font-feature-settings: 'palt';
  box-sizing: border-box;
  @include min {
    font-size: 24px;
  }
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.github {
  position: fixed;
  bottom: 0;
  right: 0;
  a {
    display: block;
    padding: 1rem;
  }
  img {
    display: block;
    width: 40px;
    height: auto;
  }
}
</style>
