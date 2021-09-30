const { Schema, model } = require('mongoose')


const MedicSchema = Schema({

    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    user: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    hospitals: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Hospitals'
    }
}, {collection: 'Medicos'})

MedicSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model( 'Medics', MedicSchema);

