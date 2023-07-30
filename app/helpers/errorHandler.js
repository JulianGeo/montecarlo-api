export const httpError = (res, err, message) => {
  console.log("error:", err.message);
  res.status(500);
  res.send({
    message: message,
  });
};
