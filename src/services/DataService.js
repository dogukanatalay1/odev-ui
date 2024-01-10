import http from "@/http";

class DataService {
    sendFile(data) {
        return http.post("/file", data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        });
    }

    getAESfile(selectedFile) {
        return http.get(`/file/aes/${selectedFile}`);
    }

    getAllFiles() {
        return http.get("/files/all");
    }

    deleteFile(selectedFile) {
        return http.delete(`/files/delete/${selectedFile}`)
    }
}

export default new DataService();
