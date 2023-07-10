// TODO Refactor similar code/config into reusable functions

export async function getCards({ queryKey }) {
  const id = queryKey[1];
  const apiRes = await fetch("http://localhost:8000/cards");

  if (!apiRes.ok) {
    throw new console.error("not ok");
  }

  return apiRes.json();
}

export async function writeCard(cardItem, isExisting) {
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
}

export async function destroyCard(id) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ id: id }, null, 2),
  };
  const apiRes = fetch("http://localhost:8000/destroy", requestOptions);
}
