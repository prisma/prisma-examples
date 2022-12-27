<template>
    <main>
        <div class="container">
            <h2>Add User</h2>
            <div>
                <input v-model="first_name" type="text" placeholder="Enter Name" />
                <input v-model="last_name" type="text" placeholder="Enter Last Name" />
            </div>
            <div class="justify-content-center mt-3">
                <button @click.prevent="add" :class="{'btn-grey': !first_name || !last_name}">Add</button>
            </div>
        </div>
        <br />
        <div class="container">
            <h2>Users ({{ user_list.length }})</h2>
            <br />
            <table v-if="user_list.length > 0">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Created At</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="({ id, first_name, last_name, created_at }, index) in user_list" :key="id">
                        <td>{{ index + 1 }}</td>
                        <td>{{ first_name }}</td>
                        <td>{{ last_name }}</td>
                        <td>{{ (new Date(created_at)).toUTCString() }}</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Created At</th>
                    </tr>
                </tfoot>
            </table>
            <ul v-else>
                <li>
                    No Users
                </li>
            </ul>
        </div>
    </main>
</template>

<script setup lang="ts">
    //Initialize ref variables
    let first_name = ref();
    let last_name = ref();
    let user_list = ref([]);

    const add = async () => {
        const { success } = await $fetch('/users/add', { 
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            first_name: first_name.value,
            last_name: last_name.value
          }) 
        }).then((data: any)=>{ 
            return data
        }).catch((error)=>{
            console.log(error);
            
            return false
        });

        if(success){
            loadUsers()
        }
    };

    const loadUsers = async () => {
        const { data, success } = await $fetch('/users/getAll', { 
          method: "GET",
          headers: { "Content-Type": "application/json" }
        }).then((data: any)=>{ 
            return data
        }).catch((error)=>{
            console.log(error);
            
            return false
        });

        if(success){
            user_list.value = data;
        }
    };

    onMounted(() => {
        //Get all the users in the database
        loadUsers();
    });
</script>

<style scoped>
    main {
        display: flex;
        width: 100vw;
        height: 100vh;
    }

    .container {
        margin: auto;
        border: 3px solid blue;
        padding: 30px;
        border-radius: 12px;
        width: 30vw;
    }

    .container form {
        display: contents;
        width: 30vw;
    }

    .container div input {
        width: 100%;
        height: 35px;
        text-align: center;
        border: 3px grey solid;
        border-radius: 25px;
        margin: 5px;
    }

    h2, h3 {
        display: flex;
        justify-content: center;
    }

    h4 {
        background: yellow;
        text-align: center;
    }

    li {
        list-style: none;
        text-align: center;
    }

    button {
        cursor: pointer;
        padding: 8px;
        border-radius: 5px;
        color: white;
        background-color: blue !important;
        font-size: 22px;
        margin-top: 5px;
    }

    .btn-grey {
        background-color: gray !important;
    }

    .justify-content-center {
        display: flex;
        justify-content: center;
    }

    table {
        margin-left: 15%;
    }

    td, th {
        border: 1px solid #ddd;
        padding: 8px;
    }

    tr:nth-child(even){background-color: #f2f2f2;}

    tr:hover {background-color: #ddd;}

    th {
        padding-top: 12px;
        padding-bottom: 12px;
        text-align: left;
        background-color: #04AA6D;
        color: white;
    }
</style>