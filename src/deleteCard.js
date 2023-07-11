const deleteCard = (id) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ id: id }, null, 2),
  };
  const apiRes = fetch("http://localhost:8000/destroy", requestOptions);
};

export default deleteCard;
