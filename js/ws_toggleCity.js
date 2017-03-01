
setInterval(function() {
  if(localStorage.getItem('one')) {
    $('#ws_city').html(localStorage.getItem('one'));
  }
},20);


var vm = new Vue({
  el:'section',
  data: {
    city:'北京',
    cityArr : [
      {
        flag:'A',
        arr:[]
      },
      {
        flag:'B',
        arr:[]
      },
      {
        flag:'C',
        arr:[]
      },
      {
        flag:'D',
        arr:[]
      },
      {
        flag:'E',
        arr:[]
      },
      {
        flag:'F',
        arr:[]
      },
      {
        flag:'G',
        arr:[]
      },
      {
        flag:'H',
        arr:[]
      },
      {
        flag:'J',
        arr:[]
      },
      {
        flag:'K',
        arr:[]
      },
      {
        flag:'L',
        arr:[]
      },
      {
        flag:'M',
        arr:[]
      },
      {
        flag:'N',
        arr:[]
      },
      {
        flag:'P',
        arr:[]
      },
      {
        flag:'Q',
        arr:[]
      },
      {
        flag:'R',
        arr:[]
      },
      {
        flag:'S',
        arr:[]
      },
      {
        flag:'T',
        arr:[]
      },
      {
        flag:'W',
        arr:[]
      },
      {
        flag:'X',
        arr:[]
      },
      {
        flag:'Y',
        arr:[]
      },
      {
        flag:'Z',
        arr:[]
      }

    ]
  },
  mounted: function () {
    this.$nextTick(function () {
      this.cartView();
    })
  },
  computed:{
    //  totalMoney : function() {
    //    return 100;
    //  }
  },
  methods:{
    cartView:function() {
      this.$http.get('../php/city.php').then(function(response) {
       var res = response.data;
       var _this = this;
       console.log(JSON.parse(res));
       JSON.parse(res).allcity.forEach(function(item,index) {
         _this.cityArr.forEach(function(a,b) {
           if(a.flag.toLowerCase() == item.pinyin.substr(0,1)) {
             a.arr.push(item.name);
           }
         })
       });
     });
     console.log(this.cityArr[1].arr);
   },
   citySelect: function(a) {
     localStorage.setItem('one',a);
     this.city = a;
   }
  }
})
