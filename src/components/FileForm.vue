<template>
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

    <div v-if="exception" style="color: red">{{ exception }}</div>

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
            secretKey: "",
            exception: null
        }
    },
    methods: {
        handleFileUpload(event) {
            this.selectedFile = event.target.files[0];
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
</style>
