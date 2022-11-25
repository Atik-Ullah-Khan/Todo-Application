/***
 * Title : User id generator.
 * Author : Atik Ullah Khan.
 * Description : Generate id for user.
 * Date : 26/11/2022.
 ***/

const generateId = () => {
  return Date.now().toString();
};

module.exports = generateId;
