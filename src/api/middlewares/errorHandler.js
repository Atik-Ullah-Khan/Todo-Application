/***
 * Title : Global error handler.
 * Author : Atik Ullah Khan.
 * Description : Handle http errors centrally.
 * Date : 26/04/2022.
 ***/

const CustomError = require("../../config/CustomError");

const errorHandler = (err, _req, res, _next) => {
  if (err instanceof CustomError) {
    res.status(err.status);
    res.json({ status: err.status, message: err.message });
  } else if (err instanceof Error) {
    res.status(500);
    res.json({
      status: 500,
      message: "Something went wrong. Please try again.",
    });
  }
};

module.exports = errorHandler;
