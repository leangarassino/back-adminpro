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
    
    try {
        const hospitals = Hospitals.find();
        res.json({
            ok: true,
        msg: "Hola soy el Hospital3",
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
    
    try {
      const hospitals = Hospitals.find();
      res.json({
        ok: true,
        msg: "Hola soy el Hospital4",
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
