var radioModel = require('../models/radioModel.js');

var geocoder = require('google-geocoder');

const geo = geocoder({
    key: 'AIzaSyDt3JwIm0WkonkGX5svIgI3f20oonUjwds',
});

/**
 * radioController.js
 *
 * @description :: Server-side logic for managing radios.
 */
module.exports = {

    /**
     * radioController.list()
     */
    list: function (req, res) {
        radioModel.find(function (err, radios) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting radio.',
                    error: err
                });
            }
            return res.json(radios);
        });
    },

    /**
     * radioController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        radioModel.findOne({_id: id}, function (err, radio) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting radio.',
                    error: err
                });
            }
            if (!radio) {
                return res.status(404).json({
                    message: 'No such radio'
                });
            }
            return res.json(radio);
        });
    },

    /**
     * radioController.create()
     */
    create: function (req, res) {
        let lng = 0;
        let lat =0;
        geo.find(`${req.body.address} ${req.body.zipCode} ${req.body.city}`, (err, response) => {
            if (response) {
                if (response[0]){
                    if (response[0].location){
                        lng = response[0].location.lng;
                        lat = response[0].location.lat;
                        console.log("geocoded");
                    }
                }
            }
            else {
                console.log("not geocoded")
            }
            
            var radio = new radioModel({
                name : req.body.name,
                federation : req.body.federation,
                associationName : req.body.associationName,
                siret : req.body.siret,
                address : req.body.address,
                zipCode : req.body.zipCode,
                city : req.body.city,
                siteUrl : req.body.siteUrl,
                published : req.body.published,
                logoUrl : req.body.logoUrl,
                streamUrl : req.body.streamUrl,
                diffusionArea : req.body.diffusionArea,
                presidentFullName : req.body.presidentFullName,
                email : req.body.email,
                administrativePhone : req.body.administrativePhone,
                phone : req.body.phone,
                lat : req.body.lat,
                lng : req.body.lng,
                slogan : req.body.slogan,
                frequency : req.body.frequency,
                radioType : req.body.radioType,
                lat: lat,
                lng: lng
            });
            
    
            radio.save(function (err, radio) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when creating radio',
                        error: err
                    });
                }
                return res.status(201).json(radio);
            });
        });

    },

    /**
     * radioController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        radioModel.findOne({_id: id}, function (err, radio) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting radio',
                    error: err
                });
            }
            if (!radio) {
                return res.status(404).json({
                    message: 'No such radio'
                });
            }

            radio.name = req.body.name ? req.body.name : radio.name;
			radio.federation = req.body.federation ? req.body.federation : radio.federation;
			radio.associationName = req.body.associationName ? req.body.associationName : radio.associationName;
			radio.siret = req.body.siret ? req.body.siret : radio.siret;
			radio.address = req.body.address ? req.body.address : radio.address;
			radio.zipCode = req.body.zipCode ? req.body.zipCode : radio.zipCode;
			radio.city = req.body.city ? req.body.city : radio.city;
			radio.siteUrl = req.body.siteUrl ? req.body.siteUrl : radio.siteUrl;
			radio.published = req.body.published ? req.body.published : radio.published;
			radio.logoUrl = req.body.logoUrl ? req.body.logoUrl : radio.logoUrl;
			radio.streamUrl = req.body.streamUrl ? req.body.streamUrl : radio.streamUrl;
			radio.diffusionArea = req.body.diffusionArea ? req.body.diffusionArea : radio.diffusionArea;
			radio.presidentFullName = req.body.presidentFullName ? req.body.presidentFullName : radio.presidentFullName;
			radio.email = req.body.email ? req.body.email : radio.email;
			radio.administrativePhone = req.body.administrativePhone ? req.body.administrativePhone : radio.administrativePhone;
			radio.phone = req.body.phone ? req.body.phone : radio.phone;
			radio.lat = req.body.lat ? req.body.lat : radio.lat;
			radio.lng = req.body.lng ? req.body.lng : radio.lng;
			radio.slogan = req.body.slogan ? req.body.slogan : radio.slogan;
			radio.frequency = req.body.frequency ? req.body.frequency : radio.frequency;
            radio.radioType = req.body.radioType ? req.body.radioType : radio.radioType;
            
            if (radio.address !== req.body.address ? req.body.address : radio.address
                || radio.zipCode !== req.body.zipCode ? req.body.zipCode : radio.zipCode
                || radio.city !== req.body.city ? req.body.city : radio.city) {

                geo.find(`${req.body.address} ${req.body.zipCode} ${req.body.city}`, (err, response) => {
                    if (response) {
                        if (response[0]){
                            if (response[0].location){
                                radio.lng = response[0].location.lng;
                                radio.lat = response[0].location.lat;
                                console.log("geocoded");
                            }
                        }
                    }
                    else {
                        console.log("not geocoded")
                    }
                })
            }

            
			
            radio.save(function (err, radio) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating radio.',
                        error: err
                    });
                }

                return res.json(radio);
            });
        });
    },

    /**
     * radioController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        radioModel.findByIdAndRemove(id, function (err, radio) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the radio.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
