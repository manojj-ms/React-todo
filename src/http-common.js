import axios from "axios";

export default axios.create({
    baseURL: "https://mernstackserver.herokuapp.com/api",
    headers: {
        "Content-type": "application/json"
    }
});