import * as APIController from "./APIcontroller";

export const APICaller = async (action, callback) => {
  switch (action.type) {
    case "LOGIN":
      APIController.login(action.payload.user, (res, err) => {
        if (!err) {
          callback(res, null);
        } else {
          callback(null, err);
        }
      });
      break;
    case "REGISTER":
      APIController.register(action.payload, (res, err) => {
        if (!err) {
          APIController.login(action.payload.user, function (res, err) {
            if (!err) {
              callback(res, null);
            } else {
              callback(null, err);
            }
          });
        } else {
          callback(null, err);
        }
      });
      break;
    case "GET_PLACES":
      APIController.getPlaces(action.payload.place, (res, err) => {
        if (!err) {
          callback(res, null);
        } else {
          callback(null, err);
        }
      });
      break;
    case "GET_PLACES_ID":
      APIController.getPlacesId(action.payload.place, (res, err) => {
        if (!err) {
          callback(res, null);
        } else {
          callback(null, err);
        }
      });
      break;
    case "GET_ROLE":
      APIController.getRole(action.payload.role, (res, err) => {
        if (!err) {
          callback(res, null);
        } else {
          callback(null, err);
        }
      });
      break;
    case "GET_STATUS":
      APIController.getStatus(action.payload.status, (res, err) => {
        if (!err) {
          callback(res, null);
        } else {
          callback(null, err);
        }
      });
      break;
    case "GET_SERVICE":
      APICaller.getService(action.payload.commission, (res, err) => {
        if (!err) {
          callback(res, null);
        } else {
          callback(null, err);
        }
      });
      break;
    case "SERVICE":
      APIController.service(action.payload, (res, err) => {
        if (!err) {
          callback(res, null);
        } else {
          callback(null, err);
        }
      });
      break;
    case "POINTS":
      APIController.points(action.payload, (res, err) => {
        if (!err) {
          callback(res, null);
        } else {
          callback(null, err);
        }
      });
      break;
    case "GET_LAST_COMMISSION":
      APIController.getLastCommission((res, err) => {
        if (!err) {
          callback(res, null);
        } else {
          callback(null, err);
        }
      });
      break;
    case "GET_DOLLAR_POINTS":
      APIController.getDollarPoints((res, err) => {
        if (!err) {
          callback(res, null);
        } else {
          callback(null, err);
        }
      });
      break;
    default:
      break;
  }
};
