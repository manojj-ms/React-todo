import http from "../http-common";

const getAll = () => {
    return http.get("/tutorials/getall");
};

const get = id => {
    return http.get(`/tutorials/${id}`);
};

const create = data => {
    return http.post("/tutorials/create", data);
};

const update = (id, data) => {
    return http.put(`/tutorials/update/${id}`, data);
};

const remove = id => {
    return http.delete(`/tutorials/delete/${id}`);
};

const removeAll = () => {
    return http.delete(`/tutorials`);
};

const findByTitle = title => {
    return http.get(`/tutorials/getall?title=${title}`);
};

const TutorialService = {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    findByTitle
};

export default TutorialService;