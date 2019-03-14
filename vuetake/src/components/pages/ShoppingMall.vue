<template>
  <div>
    <div class="search-bar">
      <van-row class="test-row">
        <van-col span="3"><img :src="locationIcon"
               width="70%"
               class="loaction-icon"></van-col>
        <van-col span="16">
          <input type="text"
                 class="search-input">
        </van-col>
        <van-col span="5">
          <van-button size='mini'>查找</van-button>
        </van-col>
      </van-row>
    </div>
    <div class="swiper-area">
      <van-swipe :autoplay="1000">
        <van-swipe-item v-for="(banner,index) in bannerPicArray"
                        :key=index>
          <img v-lazy="banner.image"
               width="100%" /></van-swipe-item>
      </van-swipe>
    </div>
    <div class="type-bar">
      <div v-for="(cate,index) in category"
           :key="index">
        <img v-lazy="cate.image"
             width="90%">
        <span>{{cate.mallCategoryName}}</span>
      </div>
    </div>
    <div class="ad-banner">
      <img v-lazy="adBanner.PICTURE_ADDRESS"
           width="100%">
    </div>
    <div class="recommend-area">
      <div class="recommend-title">
        商品推荐
      </div>
      <div class="recommend-body">
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item,index) in recommendGoods"
                        :key="index">
            <div class="recommend-item">
              <img :src="item.image"
                   width="80%"
                   alt="" />
              <div>{{item.goodsName}}</div>
              <div>￥{{item.price | moneyFilter}}(￥{{item.mallPrice | moneyFilter}})</div>
            </div>

          </swiper-slide>

        </swiper>
      </div>
      <floorComponent :floorData="floor1"
                      :floorTitle="floorName.floor1"></floorComponent>
      <floorComponent :floorData="floor2"
                      :floorTitle="floorName.floor2"></floorComponent>
      <floorComponent :floorData="floor3"
                      :floorTitle="floorName.floor3"></floorComponent>
      <div class="hot-area">
        <div class="hot-title">热卖商品</div>
        <div class="hot-goods">
          <!--这里需要一个list组件-->
          <van-list>
            <van-row gutter="20">

              <van-col span="12"
                       v-for="( item, index) in hotGoods"
                       :key="index">
                <goods-info :goodsId="item.goodsId"
                            :goodsImage="item.image"
                            :goodsName="item.name"
                            :goodsPrice="item.price"></goods-info>
              </van-col>
            </van-row>
          </van-list>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
import axios from 'axios'
import url from '@/serviceAPI.config.js'
// 轮播
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import swiperDefault from '../swiper/swiperDefault.vue'
import floorComponent from '../component/floorComponent.vue'
import { toMoney } from '../filter/moneyFilter.js'
import goodsInfo from '../component/goodsInfoComponent.vue'
export default {
  data () {
    return {
      swiperOption: {
        slidesPerView: 3
      },
      msg: 'Shopping Mall',
      locationIcon: require('../../assets/images/dingwei.png'),
      bannerPicArray: [], // 轮播图片
      category: [], // 获取类别
      adBanner: [], // 获得广告图片
      recommendGoods: [], // 推荐商品
      floor1: [],
      floor2: [],
      floor3: [],
      floorName: {},
      hotGoods: []// 热卖商品

    }
  },
  created () {
    axios({
      url: url.getShoppingMallInfo,
      method: 'get'
    })
      .then(response => {
        console.log(response)
        if (response.status === 200) {
          this.bannerPicArray = response.data.data.slides // 轮播图片
          this.category = response.data.data.category // 获取类别
          this.adBanner = response.data.data.advertesPicture // 获得广告图片
          this.recommendGoods = response.data.data.recommend // 推荐商品
          this.floor1 = response.data.data.floor1 // 楼层商品
          this.floor2 = response.data.data.floor2 // 楼层商品
          this.floor3 = response.data.data.floor3 // 楼层商品
          this.floorName = response.data.data.floorName // 楼层名称
          this.hotGoods = response.data.data.hotGoods // 热卖商品
        }
      })
      .catch(error => {
        console.log(error)
      })
  },
  components: {
    swiper,
    swiperSlide,
    swiperDefault,
    floorComponent,
    goodsInfo
  },
  filters: {
    moneyFilter (money) {
      return toMoney(money)
    }
  }
}
</script>

<style scoped>
.search-bar {
  height: 2.3rem;
  background-color: #e5017d;
  line-height: 2.3rem;
  overflow: hidden;
}
.search-input {
  width: 100%;
  height: 1.3rem;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  border-bottom: 1px solid #fff !important;
  background-color: #e5017d;
  color: #fff;
}
.loaction-icon {
  padding-top: 0.1rem;
  padding-left: 0.3rem;
}
.swiper-area {
  clear: both;
  max-height: 10rem;
  overflow: hidden;
}
.type-bar {
  background-color: #fff;
  margin: 0 0.3rem 0.3rem 0.3rem;
  border-radius: 0.3rem;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
.type-bar div {
  padding: 0.3rem;
  font-size: 12px;
  text-align: center;
}
.recommend-area {
  background-color: #fff;
  margin-top: 0.3rem;
}
.recommend-title {
  border-bottom: 1px solid #eee;
  font-size: 14px;
  padding: 0.2rem;
  color: #e5017d;
}

.recommend-body {
  border-bottom: 1px solid #eee;
}
.recommend-item {
  width: 99%;
  border-right: 1px solid #eee;
  font-size: 12px;
  text-align: center;
}
.floor-anomaly {
  display: flex;
  flex-direction: row;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
}
.floor-anomaly div {
  width: 10rem;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.floor-one {
  border-right: 1px solid #ddd;
}
.floor-two {
  border-bottom: 1px solid #ddd;
}
.floor-rule {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: #fff;
}
.floor-rule div {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 10rem;
  border-bottom: 1px solid #ddd;
}
.floor-rule div:nth-child(odd) {
  border-right: 1px solid #ddd;
}
.hot-area {
  text-align: center;
  font-size: 14px;
  height: 1.8rem;
  line-height: 1.8rem;
}
</style>
