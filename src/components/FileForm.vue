<template>
    <div>

        <div id="form">
            <div style="display: flex; flex-direction: column;">
                <label for="key">Key:</label>
                <textarea v-model="secretKey" name="" id="" cols="30" rows="10"></textarea>
            </div>

            <div id="algo-pick">
                <label for="algo">Algorithm: </label>
                <select name="" id="" v-model="selectedAlgo">
                    <option v-for="algo in hashAlgoritms" :key="algo">{{ algo }}</option>
                </select>
            </div>

            <div id="file-input">
                <input style="width: 90px;" type="file" @change="handleFileUpload">

                <button @click="createHashedFile()" class="btn">
                    Upload
                </button>
            </div>

        </div>

        <div id="view-files">
            <div>
                <button @click="getAESfile()" class="btn" style="width: 80px;">
                    Decrypt and get AES file
                </button>
            </div>

            <div>
                <button @click="deleteFile()" class="btn" style="width: 80px;">
                    Delete Selected file
                </button>
            </div>

            <div v-if="imgSrc">
                <img :src="imgSrc" style="width: 200px;" alt="">
            </div>

            <a href="http://" target="_blank" rel="noopener noreferrer"></a>

            <img :src="imgSrc" alt="">
        </div>

        <div v-if="exception" style="color: red">
            {{ exception }}
        </div>

        <ul id="all-files">
            <h2>
                All files in /upload:
            </h2>
            <li v-for="file in allFiles" :key="file">
                <span> {{ file }} </span>
                <button 
                    @click="selectedFileName = file"
                    class="btn" 
                    style="margin-left: 10px;"
                >
                    Select
                </button>

            </li>
        </ul>

        <div>
            Selected file name: {{ selectedFileName }}
        </div>
    </div>
</template>
  
<script>
import DataService from "@/services/DataService";
  
export default {
    name: 'App',
    data() {
        return {
            hashAlgoritms: ["none", "DES", "AES", "Blowfish"],
            selectedAlgo: "",
            selectedFile: null,
            secretKey: "aabbccddeeff00112233445566778899aabbccddeeff00112233445566778899",
            exception: null,
            imgSrc: null,
            allFiles: [],
            selectedFileName: ""
        }
    },
    created() {
        this.getAllFiles();
    },
    methods: {
        handleFileUpload(event) {
            this.selectedFile = event.target.files[0];
        },

        async getAllFiles() {
            let response = await DataService.getAllFiles();
            this.allFiles = response.data;
            console.log('files: ', response);
        },

        async deleteFile() {
            let response = await DataService.deleteFile(this.selectedFileName);
            console.log('res: ', response);

            await this.getAESfile();
        },

        bufferToBase64(buf) {
            var binary = '';
            var bytes = new Uint8Array(buf);
            var len = bytes.byteLength;
            for (var i = 0; i < len; i++) {
                binary += String.fromCharCode(bytes[i]);
            }
            return window.btoa(binary);
        },

        async getAESfile() {
            try {
                let response = await DataService.getAESfile(this.selectedFileName);
                let imgData = response.data.decryptedFile.data;
                let base64String = this.bufferToBase64(imgData);
                this.imgSrc = 'data:image/png;base64,' + base64String;

                console.log(this.imgSrc);
            } catch (ex) {
                this.exception = ex;
            }
        },

        async createHashedFile() {
            const formData = new FormData();
            formData.append("file", this.selectedFile);
            formData.append("algo", this.selectedAlgo);
            formData.append("secretKey", this.secretKey);

            try {
                let response = await DataService.sendFile(formData);
                console.log('res: ', response);
            } catch(ex) {
                this.exception = ex;
            }
        }
    }
}
</script>
  
<style scoped>
#form {
    display: flex;
    flex-direction: row;
    width: 600px;
    justify-content: space-between;
    align-items: center;
    box-shadow: 3px 3px 3px 3px lightgray;
    padding: 12px;
    border-radius: 6px;
}

#file-input {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

.btn {
    margin-top: 10px;
    width: 80px;
    background-color: red;
    color: white;
    border-radius: 6px;
    margin-bottom: 10px;
    border: none;
    padding: 3px;
    box-shadow: 1px 1px lightgray;
}

.btn:hover {
    background-color: #8B0000;
    color: white;
}

#algo-pick {
    margin-left: 10px;
}

#view-files {
    box-shadow: 3px 3px 3px 3px lightgray;
    border: none;
    border-radius: 6px;
    margin-top: 20px;
    width: 600px;
    padding: 10px;
    
}

#all-files {
    box-shadow: 3px 3px 3px 3px lightgray;
    padding: 30px;
    padding-top: 10px;
}
</style>
