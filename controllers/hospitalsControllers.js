const Hospitals = require("../models/hospitals");

const getHospitals = async (req, res) => {

  try {
    const hospitals = await Hospitals.find().populate('user','nombre email')
    
    res.json({
      ok: true,
      hospitals
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Ha ocurrido un error",
    });
  }
};


const createHospitals = async (req, res) => {
    
    const uid = req.uid;
    const hospitals = new Hospitals({
        user: uid,
        ...req.body
    });
    console.log(uid)
    
    try {
        
        const hospitalDB = await hospitals.save();
        
        res.json({
            ok: true,
            hospitals: hospitalDB
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Ha ocurrido un error",
      });
    }
};

const putHospitals = async (req, res) => {
    
    id = req.params.id;
    uid = req.uid;

    try {

      const hospitalDB = await Hospitals.findById( id )

      if( !hospitalDB ) {
        return res.status(404).json({
          ok: false,
          msg: 'El id del hospital no existe'
        })
      }

      const hospital = {
        ...req.body,
        usuario: uid
      }
      const putHospital = await Hospitals.findByIdAndUpdate(id, hospital, {new: true});

        res.json({
        ok: true,
        hospital: putHospital
    });

} catch (error) {
    console.log(error);
    res.status(500).json({
        ok: false,
        msg: "Ha ocurrido un error",
    });
}
};

const deleteHospitals = async (req, res) => {

    id = req.params.id;
    
    try {

      const hospitalDB = await Hospitals.findById( id );

      if ( !hospitalDB ) {
        return res.status(404).json({
          ok: false,
          msg: 'No se encontró el hospital por id'
        })
      }

      await Hospitals.findByIdAndDelete(id);

      res.json({
        ok: true,
        msg: "Se ha eliminado correctamente el hospital",
      });

    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: "Ha ocurrido un error",
      });
    }
  };

module.exports = {
  getHospitals,
  createHospitals,
  putHospitals,
  deleteHospitals,

};
