const requestOptionsPost = (bodyObject) => {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(bodyObject, null, 2),
  };
};

const localhost = "http://localhost:8000";

export async function getCards() {
  const apiRes = await fetch(localhost + "/cards");
  console.log("coucou api");
  if (!apiRes.ok) {
    throw new console.error("not ok");
  }

  return apiRes.json();
}

export async function writeCard({ cardItem, isExisting }) {
  const apiRes = fetch(
    `${localhost}/write?new=${isExisting ? 0 : 1}`,
    requestOptionsPost(cardItem)
  );

  return apiRes;
}

export async function destroyCard(id) {
  const apiRes = fetch(localhost + "/destroy", requestOptionsPost({ id: id }));
}
