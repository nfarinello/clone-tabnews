function status(request, response) {
  response.status(200).json({ key: "sou demais" });
}

export default status;
