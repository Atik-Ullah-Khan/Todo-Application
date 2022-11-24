/***
 * Title : Not found controller.
 * Author : Atik Ullah Khan.
 * Description : Send not found response if the url does not exist.
 * Date : 24/11/2022.
 ***/

const notFound = (_req, res) => {
  res.status(404).json({ status: 404, message: "Resource not found!" });
};

module.exports = notFound;
