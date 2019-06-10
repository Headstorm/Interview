axios.defaults.xsrfCookieName = 'csrftoken' //need this for axios method:post
axios.defaults.xsrfHeaderName = 'X-CSRFToken' //need this for axios method:post

var app = new Vue({
  el: '#id_homepage',
  data: {
      recaptchaValue:'BS',
      name:'',
      email:'',
      message:'',
      randomNumbersPost:[],
      randomNumbersGet:[], //list of numbers received from backend
      randomNumbersPatch:[], //we send 1 random number to django and then django will append that to most recent 500 rand int list from db and return an ordered list
  },
  methods:{
      loadNosqlJsonInDB:function(){
          axios({
                method: 'get',
                baseURL: window.location.origin, //we need base url in case if its called from some other page
                url: 'homepage/loadNosqlJsonInDB/',
                data: { },
                responseType: 'json', //server will response with this datatype
              })
              .then ( function (response){
                  data=response.data;
                  console.log('loadNosqlJsonInDB ajax successfull. backend status ',data['status']);

              }.bind(this))
              .catch ( function (response){
                  data=response.data;
                  console.log('loadNosqlJsonInDB ',data['status']);
              });

      },

      submitClicked: async function(e){
          e.preventDefault(); //by default dont submit the form. we need to wait until google token is generated
          console.log('submitClicked. recaptchaValue=',this.recaptchaValue);
          token = await grecaptcha.execute('6LdPwqcUAAAAALEPET3zl_ih7mirFlKMYF5r7CbS', {action: 'homepage'}); //wait untill google returns a token
          console.log('recaptchaValue=',token);
          this.recaptchaValue=token; //this gets assigned (template updates) only after the method finishes. so use nextTick()

          this.$nextTick(()=>{ //once the template has updated then submit the form on next tick
              document.getElementById("id_contactform").submit(); //now submit the form
              console.log('submit');
          });
      },
      postData:function(){
          this.randomNumbersPost=Array.from({length: 500}, () => Math.floor(Math.random() * 40)); //creates an array of random int. we store it in this.randomNumbersPost to show on our webpage
          // this.randomNumbersPost=['x','y'] //this wont work when backend validates the data
          axios({
                method: 'post',
                baseURL: window.location.origin, //we need base url in case if its called from some other page
                url: 'homepage/data/',
                data: {
                      intArray: this.randomNumbersPost,
              },
                responseType: 'json', //server will response with this datatype
              })
              .then ( function (response){
                  data=response.data;
                  console.log('postData ',data['status']);

              }.bind(this))
              .catch ( function (response){
                  data=response.data;
                  console.log('postData ',data['status']);
              });

      },

      getData:function(){
          axios({
                method: 'get',
                baseURL: window.location.origin, //we need base url in case if its called from some other page
                url: 'homepage/data/',
                data: {

              },
                responseType: 'json', //server will response with this datatype
              })
              .then ( function (response){
                  data=response.data;
                  this.randomNumbersGet=data['getData'];
                  console.log('getData ',data['status']);

              }.bind(this))
              .catch ( function (response){
                  data=response.data;
                  console.log('getData ',data['status']);
              });

      },

      patchData:function(){
          var randomNumber=Math.floor(Math.random() * 40);
          console.log('random numer=',randomNumber);
          axios({
                method: 'patch',
                baseURL: window.location.origin, //we need base url in case if its called from some other page
                url: 'homepage/data/',
                data: {
                    randomNumber:randomNumber,
              },
                responseType: 'json', //server will response with this datatype
              })
              .then ( function (response){
                  data=response.data;
                  this.randomNumbersPatch=data['patchData'];
                  console.log('patchData ',data['status']);

              }.bind(this))
              .catch ( function (response){
                  data=response.data;
                  console.log('patchData ',data['status']);
              });

      },

  },
  mounted:function(){
      console.log('Form information \n',formData.name,'\n',formData.email,'\n',formData.message); //dumping all form data to console
  },

  delimiters: ["[[","]]"],
});
