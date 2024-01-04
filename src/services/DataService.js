import http from "@/http";

class DataService {
    sendFile(data) {
        return http.post("/file", data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        });
    }
}

export default new DataService();
