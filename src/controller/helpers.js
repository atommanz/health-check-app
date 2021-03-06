import 'whatwg-fetch'

export const apiFetch = async ({
  url, query, method, body, contentType, headers
}) => {
  headers = { ...headers, 'Content-Type': contentType || 'application/json' }
  const res = await fetch(`${url}`, {
    method: method || 'GET',
    headers,
    body: (contentType === 'application/x-www-form-urlencoded;charset=UTF-8' ?
      new URLSearchParams(body) :
      (JSON.stringify(body))),
  })
  const json = await res.json()

  // console.log(json)
  return json
}

