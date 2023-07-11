// TODO Refactor similar code/config into reusable functions

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

export async function getCards({ queryKey }) {
  const id = queryKey[1];
  const apiRes = await fetch(localhost + "/cards");

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
}

export async function destroyCard(id) {
  const apiRes = fetch(localhost + "/destroy", requestOptionsPost({ id: id }));
}
