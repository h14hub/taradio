var radioModel = require('../models/radioModel.js');

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
        var radio = new radioModel({
			name : req.body.name,
			frequency : req.body.frequency,
			city : req.body.city,
			streetNumber : req.body.streetNumber,
			streetName : req.body.streetName,
			zipCode : req.body.zipCode,
			lng : req.body.lng,
			lat : req.body.lat,
			radioType : req.body.radioType,
			diffusionType : req.body.diffusionType,
			slogan : req.body.slogan,
			created_at : req.body.created_at,
			updated_at : req.body.updated_at,
			streamUrl : req.body.streamUrl,
            logoUrl : req.body.logoUrl,
	        published : req.body.published,

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
			radio.frequency = req.body.frequency ? req.body.frequency : radio.frequency;
			radio.city = req.body.city ? req.body.city : radio.city;
			radio.streetNumber = req.body.streetNumber ? req.body.streetNumber : radio.streetNumber;
			radio.streetName = req.body.streetName ? req.body.streetName : radio.streetName;
			radio.zipCode = req.body.zipCode ? req.body.zipCode : radio.zipCode;
			radio.lng = req.body.lng ? req.body.lng : radio.lng;
			radio.lat = req.body.lat ? req.body.lat : radio.lat;
			radio.radioType = req.body.radioType ? req.body.radioType : radio.radioType;
			radio.diffusionType = req.body.diffusionType ? req.body.diffusionType : radio.diffusionType;
			radio.slogan = req.body.slogan ? req.body.slogan : radio.slogan;
			radio.created_at = req.body.created_at ? req.body.created_at : radio.created_at;
			radio.updated_at = req.body.updated_at ? req.body.updated_at : radio.updated_at;
			radio.streamUrl = req.body.streamUrl ? req.body.streamUrl : radio.streamUrl;
			radio.logoUrl = req.body.logoUrl ? req.body.logoUrl : radio.logoUrl;
			radio.published = req.body.published ? req.body.published : radio.published;
			
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
