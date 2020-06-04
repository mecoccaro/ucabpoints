import axios from "axios";

export const login = (user, callback) => {
  axios
    .post(`${process.env.VUE_APP_BACKEND_URL}/auth/adminLogin`, {
      email: user.email,
      password: user.password,
    })
    .then(function (response) {
      sessionStorage.setItem("user", JSON.stringify(response.data));
      callback(response.data, null);
    })
    .catch(function (error) {
      callback(null, error);
    });
};

export const getPlaces = (place, callback) => {
  axios
    .get(`${process.env.VUE_APP_BACKEND_URL}/place/type/${place.placeType}`)
    .then(function (response) {
      callback(response.data, null);
    })
    .catch(function (error) {
      callback(null, error);
    });
};

export const getPlacesId = (place, callback) => {
  axios
    .get(
      `${process.env.VUE_APP_BACKEND_URL}/place/idtype/${place.id}/${place.placeType}`
    )
    .then(function (response) {
      callback(response.data, null);
    })
    .catch(function (error) {
      callback(null, error);
    });
};

export const getRole = (role, callback) => {
  axios
    .get(`${process.env.VUE_APP_BACKEND_URL}/role/name/${role.name}`)
    .then(function (response) {
      callback(response.data, null);
    })
    .catch(function (error) {
      callback(null, error);
    });
};

export const getStatus = (status, callback) => {
  axios
    .get(
      `${process.env.VUE_APP_BACKEND_URL}/status/${status.name}/${status.type}`
    )
    .then(function (response) {
      callback(response.data, null);
    })
    .catch(function (error) {
      callback(null, error);
    });
};

export const getService = (commission, callback) => {
  axios
    .get(
      `${process.env.VUE_APP_BACKEND_URL}/commission/${commission.commissionId}`
    )
    .then(function (response) {
      callback(response.data, null);
    })
    .catch(function (error) {
      callback(null, error);
    });
};

export const service = (payload, callback) => {
  axios
    .post(`${process.env.VUE_APP_BACKEND_URL}/commission`, {
      serviceCharge: payload.commission.service_charge,
      serviceTransfer: payload.commission.service_transfer,
      processor: payload.commission.processor,
      dateOfCreation: payload.commission.dateOfCreation,
    })
    .then(function (response) {
      callback(response.data, null);
    });
};

export const points = (payload, callback) => {
  axios
    .post(`${process.env.VUE_APP_BACKEND_URL}/conversion`, {
      unitA: payload.conversion.unit_a,
      unitB: payload.conversion.unit_b,
      anAIsSoManyB: payload.conversion.equivalence,
      dateOfCreation: payload.conversion.dateOfCreation,
    })
    .then(function (response) {
      callback(response.data, null);
    });
};

export const getLastCommission = (callback) => {
  axios
    .get(`${process.env.VUE_APP_BACKEND_URL}/commission/last/commission`)
    .then(function (response) {
      callback(response.data, null);
    })
    .catch(function (error) {
      callback(null, error);
    });
};

export const getDollarPoints = (callback) => {
  axios
    .get(`${process.env.VUE_APP_BACKEND_URL}/conversion`)
    .then(function (response) {
      callback(response.data[0], null);
    })
    .catch(function (error) {
      callback(null, error);
    });
};
