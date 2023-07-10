const writeCards = (cardItem, isExisting) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(cardItem, null, 2),
  };
  const apiRes = fetch(
    `http://localhost:8000/write?new=${isExisting ? 0 : 1}`,
    requestOptions
  );
};

export default writeCards;
