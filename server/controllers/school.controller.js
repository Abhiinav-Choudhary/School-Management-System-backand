const School = require("../models/school.model");


async function addSchool(req, res) {
  const { name, address, latitude, longitude } = req.body;

  if (!name || !address || latitude == null || longitude == null) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newSchool = await School.create({
      name,
      address,
      latitude,
      longitude,
    });

    return res.status(201).json({ message: "School added successfully", school: newSchool });
  } catch (error) {
    return res.status(500).json({ error: "Failed to add school", details: error.message });
  }
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}


function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; 
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; 
}


const listSchools = async (req, res) => {
  const { lat, lng } = req.query;

  const userLat = parseFloat(lat);
  const userLng = parseFloat(lng);

  if (isNaN(userLat) || isNaN(userLng)) {
    return res.status(400).json({
      error: "Latitude and longitude are required and must be valid numbers",
    });
  }

  try {
    const schools = await School.find();

    const schoolsWithDistance = schools.map((school) => {
      const distance = getDistance(
        userLat,
        userLng,
        school.latitude,
        school.longitude
      );

      return {
        ...school.toObject(),
        distance: Number(distance.toFixed(2)), 
      };
    });

    
    schoolsWithDistance.sort((a, b) => a.distance - b.distance);

    res.status(200).json({ schools: schoolsWithDistance });
  } catch (error) {
    res.status(500).json({
      error: "Failed to list schools",
      details: error.message,
    });
  }
};


module.exports = {
  addSchool,
  listSchools,
};
