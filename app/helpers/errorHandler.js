export const httpError = (res, err, message, status) => {
  console.log("error:", err);
  res.status(status);
  res.send({
    message: message,
  });
};
