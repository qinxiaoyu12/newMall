<template>
    <div class="detailGoodsInfo" v-if="Object.keys(DetailGoodsInfo).length !== 0">
      <div class="info-desc clear-fix">
        <div class="start">
        </div>
        <div class="desc">{{DetailGoodsInfo.desc}}</div>
        <div class="end"></div>
      </div>
      <div class="info-key">{{DetailGoodsInfo.detailImage[0].key}}</div>
      <div class="info-list">
        <img v-for="(item, index) in DetailGoodsInfo.detailImage[0].list" :key="index" :src="item" @load="imgLoad" alt="">
      </div>
    </div>
</template>

<script>
    export default {
        name: "DetailGoodsInfo",
        props: {
          DetailGoodsInfo: {
            type: Object,
            default() {
              return {}
            }
          }
        },
      data() {
          return {
            counter: 0,
            imagesLength: 0
          }
      },
      methods: {
          imgLoad() {
            if (++this.counter === this.imagesLength) {
              this.$emit('imageLoad')
            }
          }
      },
      watch: {
        DetailGoodsInfo() {
          this.imagesLength = this.DetailGoodsInfo.detailImage[0].list.length
        }
      }
    }
</script>

<style scoped>
  .detailGoodsInfo {
    padding: 20px 0;
    border-bottom: 5px solid #f2f5f8;
  }

  .info-desc {
    padding: 0 15px;
  }

  .info-desc .start, .info-desc .end {
    width: 90px;
    height: 1px;
    background-color: #a3a3a5;
    position: relative;
  }

  .info-desc .start {
    float: left;
  }

  .info-desc .end {
    float: right;
  }

  .info-desc .start::before, .info-desc .end::after {
    content: '';
    position: absolute;
    width: 5px;
    height: 5px;
    background-color: #333;
    bottom: 0;
  }

  .info-desc .end::after {
    right: 0;
  }

  .info-desc .desc {
    padding: 15px 0;
    font-size: 14px;
  }

  .info-key {
    margin: 10px 0 10px 15px;
    color: #333;
    font-size: 15px;
  }

  .info-list img {
    width: 100%;
  }
</style>
