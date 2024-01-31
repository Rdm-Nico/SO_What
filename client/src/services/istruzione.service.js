import http from "../http-common"

class IstruzioneDataService {
    // create a service that uses axios object above to send HTTP requests
    getAll() {
        return http.get("/istruzioni");
    }

    get(id) {
        return http.get(`/istruzioni/${id}`);
    }
    create(data){
        return http.post("/istruzioni", data);
    }

    update(id, data){
        return http.put(`/istruzioni/${id}`, data);
    }

    delete(id){
        return http.delete(`/istruzioni/${id}`);
    }

    findByTitle(title) {
        return http.get(`/istruzioni?title=${title}`);
    }

    findByReparto(reparto){
        return http.get(`/istruzioni/reparti?reparto=${reparto}`);
    }
}

export default new IstruzioneDataService();