const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class SharebnbApi {

  static token = null;

  static async request(endpoint, data = {}, method = "GET") {
    const url = new URL(`${BASE_URL}/${endpoint}`);

    // TODO: add condition for multipart request
    const headers = {
      authorization: `Bearer ${SharebnbApi.token}`,
      'content-type': 'application/json',
    };

    url.search = (method === "GET")
      ? new URLSearchParams(data).toString()
      : "";

    // set to undefined since the body property cannot exist on a GET method
    const body = (method !== "GET")
      ? JSON.stringify(data)
      : undefined;

    const resp = await fetch(url, { method, body, headers });

    if (!resp.ok) {
      console.error("API Error:", resp.statusText, resp.status);
      const message = (await resp.json()).error.message;
      throw Array.isArray(message) ? message : [message];
    }

    return await resp.json();
  }

  // Individual API routes

  /** Get details on a property by ID. */

  static async getProperty(id) {
    const res = await this.request(`properties/${id}`);
    return res.property;
  }

  /** Get list of properties, with optional filter that takes in searchTerm  */

  static async getProperties(searchTerm) {
    console.log("searchTerm***", searchTerm)
    const searchTermParam = searchTerm ? { titleLike: searchTerm } : {};
    const res = await this.request("properties", searchTermParam);
    console.log("inAPI***", res)
    return res.properties;
  }

  /** Create new property  */

  static async createProperty(data) {
    for (let [key, value] of data.entries()) {
          console.log("** mulitForm from API", key, value)
      }

    const res = await fetch(`${BASE_URL}/properties`,
    {
      method: "POST",
      body: data
    });

    const resData = await res.json();
    console.log("*** DATA FROM CREATE IN API", resData)

    // const res = await this.request(
    //   "properties",
    //   data,
    //   "POST");
    return res.property;
  }

  /** Authenticates user's login credentials; if authenticated, returns
   * JWT token */

  static async login({ username, password }) {
    const res = await this.request("auth/login", { username, password }, "POST");
    return res.token;
  }

  /** Signup new user and validates request; if valid, returns JWT token */

  static async signup({ username, password, firstName, lastName, email, phone }) {
    const res = await this.request(
      "auth/register",
      { username, password, firstName, lastName, email, phone },
      "POST");
    return res.token;
  }

  /** Get user */
  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

}

export default SharebnbApi;
