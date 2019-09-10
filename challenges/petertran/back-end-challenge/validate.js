exports.validate = function (req, res, next) {
  const numbers = req.body;
  const message = 'Payload must be a list of EXACTLY 500 numbers!';

  if (!Array.isArray(numbers) || numbers.length !== 500) {
    return res.status(400).json({message});
  }

  for (let item of numbers) {
    if (typeof item !== 'number') {
      return res.status(400).json({message});
    }
  }

  next();
}