# 金币云商中签号码计算



[深圳证券交易所](http://www.szse.cn/market/trend/index.html?code=399001)

<div style="width:50%">
  <el-date-picker
    @change="changeDate"
    v-model="value1"
    value-format="yyyy-MM-dd"
    type="date"
    placeholder="选择日期">
  </el-date-picker>
  <br/>
  深证成指(399001):<el-input v-model="num1" :readonly="true"></el-input>
  中小100(399005):<el-input v-model="num2" :readonly="true"></el-input>
  报名人数:<el-input v-model="num3"></el-input>
  中签数量:<el-input v-model="num4"></el-input>
  您的号码:<el-input v-model="num5"></el-input>
  <el-button style="margin-top:20px;margin-bottom:20px" type="primary" @click="onSubmit">确定</el-button>
</div>


<div v-if="show">
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>中签号码</span>
      <div style="float: right; padding: 3px 0;color:red">{{flag ? '恭喜您，中签了' : '没有中签'}}</div>
    </div>
    <div style="height:200px;overflow:scroll;"> 
      <div v-for="o in list" :key="o" class="text item">
        {{ o }}
      </div>
    </div>
  </el-card>
</div>

<script>
export default {
   data() {
        return {
            value: new Date(),
            value1: '',
            num1: '',
            num2: '',
            num3: '',
            num4: '',
            num5: '',
            list: [],
            show: false,
            flag: false,
        }
    },
    methods: {
      onSubmit() {
          let zhi = this.num1;//深证成指 399001
          let zhong = this.num2;//中小100 399005
          if(zhi == 0) {
            this.show = false;
            alert('所选日期数据为空')
            return;
          }
          if(!this.num3 || !this.num4 || !this.num5) {
            this.show = false;
            alert('数据不完整')
            return;
          }
          let A = ((zhi * 100) * (zhong * 100)) * 10000;

          let B = Number((A + "").split("").reverse().join(""));

          let X = Number(this.num3);//报名人数
          let Y = B%X +1 ;

          let num = Number(this.num4);//中签数量

          if(num > X) {
            this.show = false;
            alert('中签数量应小于报名人数')
            return;
          }
          
          let Z = parseInt(X/num);
          
          let list = [];
          this.flag = false;
          for(let i = 0; i < num; i++) {
              let q = Y + Z*i;
              if(q > X) {
                  q = q - X
              }
              if(q == this.num5) {
                this.flag = true;
              }
              list.push(q);
          }
          this.list = list;
          this.show = true;
      },
      async getNum(code, date) {
        const _this = this;
        let num = 0;
        //https://segmentfault.com/a/1190000011072725
        const API_PROXY = 'https://bird.ioliu.cn/v1/?url='
        await _this.$axios.get(API_PROXY + 'http://www.szse.cn/api/report/ShowReport/data' , {
          params: {
            SHOWTYPE: 'JSON',
            CATALOGID: '1826',
            TABKEY: 'tab1',
            txtDmorjc: code,
            txtDate: date,
            txtEndDate: date,
            random: '0.18374597387061065',
          }
        })
        .then(function (res) {
          if(res.data[0].data.length > 0) {
            num = Number(res.data[0].data[0].ss.replace(/,/g, ""));
          }
        }, function (error) {
          alert('出错了')
          console.log(error)
        })
        return num;
      },
      async changeDate(value) {
        this.num1 = await this.getNum('399001', value);
        this.num2 = await this.getNum('399005', value);
      },
    },
    mounted() {
    }
}
</script>
<style>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }
</style>
