<template>
    <div class="wrapper">
        <swiper :options="swiperOption" class="swiper">
            <!-- 轮播 -->
            <swiper-slide v-for="item in swiperList" :key='item.id'>
                <img :src="item.imgUrl" class="img-item" alt="">
            </swiper-slide>
            <!-- 轮播指示点 -->
            <div class="swiper-pagination"  slot="pagination"></div>
        </swiper>
    </div>
</template>

<script>
export default {
    name:'HomeHeader',
    data(){
        return {
            swiperOption:{
                pagination:'.swiper-pagination'
            },
            swiperList:[{
                id:'0001',
                imgUrl:'/static/img/ms-lb.7128a52.png'
            },
            {
                id:'0002',
                imgUrl:'/static/img/ms-lb.7128a52.png'
            }]
        }
    },
    computed: {

    },
    mounted(){

    }
}
</script>

<style lang="stylus" scoped>
    @import '~css/varibles.styl'
    .wrapper >>> .swiper-pagination-bullet.swiper-pagination-bullet-active
        background-color:#ffd33b
        padding: 0 0.08rem
        border-radius: 0.3rem
    .wrapper >>> .swiper-pagination-bullet
        background-color :#fff
        opacity :1
    .swiper
        width:7.5rem
        height:4.85rem
        .img-item
            width:100%
            height :100%
            border-bottom-left-radius: 0.8rem;
            border-bottom-right-radius: 0.8rem;
</style>