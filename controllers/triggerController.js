/* ****************************************
* Error Controller
* For intentionally triggering a 500 error
**************************************** */
const triggerController = async (req, res, next) => {
  try {
    // 故意丟一個錯誤
    throw new Error("Intentional 500 error for testing");
  } catch (error) {
    next(error); // 丟給 error-handling middleware
  }
}

module.exports = { triggerController }