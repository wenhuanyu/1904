<template>
    <view class="background fix-padding">
        <view class="total"></view>
        <view class="fix-top flex">
            <view class="good flex flex-column mr-20">
                <view class="text">总利润</view>
                <view class="number">{{profit_price}}</view>
            </view>
			<view class="good flex flex-column">
			    <view class="text">销售额</view>
			    <view class="number">{{total_price}}</view>
			</view>
        </view>
		<!-- 搜索 -->
		<view class="container search">
			<view class="flex">
				<view class="text">自定义查</view>
				<uni-datetime-picker class="date-picker" ref="formDate" v-model="start_time" placeholder="开始时间"/>
				至
				<uni-datetime-picker class="date-picker" ref="formDate" v-model="end_time" placeholder="结束时间"/>
				<button class="btn-search btn-color" @click="searchTime">查询</button>
			</view>
		</view>
		<view class="container fix-bottom">
		    <button class="btn-submit" @click="navigateBack">返回</button>
		</view>
	</view>
</template>

<script lang="ts">
    export default {
        data() {
            return {
                uid: 0,
                profit_price: 0,
                total_price: 0,
				start_time:'',
				end_time:'',
				date:'',
            }
        },
        onLoad() {
            this.uid = this.common.get("uid")
			// 库存管理接口
            this.listInterface()
        },
		
        methods: {
			searchTime() {
				this.date = this.start_time + ' ' +'-'+ ' ' + this.end_time
				this.listInterface()
			},
			// 库存管理接口
			listInterface() {
				this.http({
				    url: this.api.Statistic_index,
				    method: "POST",
				    data: {
				        uid: this.uid,
						date:this.date
				    },
				    success: res => {
				        this.profit_price = res.profit_price
				        this.total_price = res.total_price
				    }
				})
			},
			// 返回
			navigateBack() {
				uni.switchTab({
					url:"/pages/index/index"
				})
			}
        },
    }
</script>

<style lang="scss">
    .background {
        // background: #F6F6F6;
    }
	.search .uni-date-editor--x .uni-date__icon-clear {
		top: -4rpx;
	}
	.uni-date-single {
		padding: 0!important;
		height: 64rpx;
	}
	.date-picker {
		width: 42%!important;
	}
	
	.uniui-calendar {
		display: none;
	}
	.btn-search {
		background: $color-b5;
	}
    .total {
        width: 750rpx;
        height: 170rpx;
        background: $color-main;
    }

    .fix-top {
        position: absolute;
        width: 750rpx;
        height: 270rpx;
        padding: 30rpx;
        box-sizing: border-box;
        top: 0;

        .flex {
            width: 400rpx;
            height: 160rpx;
            background: $color-f;
            box-shadow: 0rpx 2rpx 16rpx 2rpx rgba(179, 175, 175, 0.12);
            border-radius: 8rpx;

            .text {
                font-size: 24rpx;
                color: $color-9;
            }

            .number {
                font-size: 40rpx;
                color: $color-3;
                font-weight: bold;
                margin-top: 10rpx;
            }
        }
    }

    .search {
        margin-top: 48rpx;
    }

    
</style>
