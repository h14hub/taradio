// mongoose-gen -m radio -f name:string,federation:string,associationName:string,siret:string,address:string,zipCode:string,city:string,siteUrl:string,published:boolean,logoUrl:string,streamUrl:string,diffusionArea:string,presidentFullName:string,email:string,administrativePhone:string,phone:string,lat:number,lng:number -r

const data = require("./radios.json");
const Radio = require("./models/radioModel.js");
var geocoder = require('google-geocoder');

const geo = geocoder({
    key: 'AIzaSyDt3JwIm0WkonkGX5svIgI3f20oonUjwds',
});

var mongoose = require("mongoose");



function seedRadios() {
  mongoose
    .connect("mongodb://heroku_dvg7f743:ntg2v2jt0qhnnchc7l7vslogpm@ds051841.mlab.com:51841/heroku_dvg7f743", {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true
    })
    .then(() => {
      mongoose.connection.db.dropCollection('radios', function(err, result) {
        const radios = data.radios
        data.radios.forEach((radio) => {
          geo.find(`${radio.address} ${radio.zipCode} ${radio.city}`, (err, res) => {
            if (res) {
              if (res[0]){
                if (res[0].location){
                  radio.lng = res[0].location.lng;
                  radio.lat = res[0].location.lat;
                }
              }
            }
            else {
              console.log("not geocoded")
            }
              console.log(radio)
              var newRadio = new Radio(radio);
              newRadio.save();
              console.log("radio seeded");
            });
        })
      });
    });
}

seedRadios();
