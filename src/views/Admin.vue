<template>
    <div class="bg-gray-900 py-10 my-16 max-w-7xl mx-auto">
      <h2 class="px-4 text-3xl font-normal leading-7 text-white sm:px-6 lg:px-8">Users</h2>
      <table class="mt-6 w-full whitespace-nowrap text-left">
        <colgroup>
          <col class="w-full sm:w-4/12" />
          <col class="lg:w-4/12" />
          <col class="lg:w-2/12" />
          <col class="lg:w-1/12" />
          <col class="lg:w-1/12" />
        </colgroup>
        <thead class="border-b border-white/10 text-sm leading-6 text-white">
          <tr>
            <th scope="col" class="py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8">ID</th>
            <th scope="col" class="hidden py-2 pl-0 pr-8 font-semibold sm:table-cell">User ID</th>
            <th scope="col" class="py-2 pl-0 pr-4 text-right font-semibold sm:pr-8 sm:text-left lg:pr-20">Score</th>
            <th scope="col" class="hidden py-2 pl-0 pr-8 font-semibold md:table-cell lg:pr-20">Rank</th>
          
          </tr>
        </thead>
        <tbody class="divide-y divide-white/5">
          <tr v-for="record in filteredRecords" :key="record.id">
            <td class="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
              <div class="flex items-center gap-x-4">
                <img
                  :src="item.imageUrl"
                  alt=""
                  class="h-8 w-8 rounded-lg bg-gray-800"
                />
                <div class="truncate text-sm font-medium leading-6 text-white">
                  {{ item.name }}
                </div>
              </div>
            </td>
            <td class="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
              <div class="flex gap-x-3">
                <div class="font-mono text-sm leading-6 text-gray-400">
                  {{ item.email }}
                </div>
              </div>
            </td>
            <td
              class="py-4 pl-0 pr-4 text-sm leading-6 sm:pr-8 lg:pr-20"
              :class="statuses[item.status]"
            >
              <div class="flex items-center justify-end gap-x-2 sm:justify-start">
                <div class="w-full h-1 rounded-full bg-transparent">
                  <div :class="['bg-primary', ' ', 'rounded-full ', 'h-full']"></div>
                </div>
                <span class="text-gray-400 font-xs">{{ item.score }}</span>
                <div class="hidden text-white sm:block"></div>
              </div>
            </td>
            <td class="hidden py-4 pl-0 pr-8 text-sm leading-6 text-gray-400 md:table-cell lg:pr-20">
              last
            </td>
            <td
              class="py-4 pl-0 pr-4 text-sm leading-6 sm:pr-8 lg:pr-20"
              v-if="!item.isVerified"
            >
              <div class="flex items-center justify-end gap-x-2 sm:justify-start">
                <button
                  @click="verify(item.id)"
                  class="text-gray-400 font-xs border px-2"
                >
                  Verify
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import client from "../axios.config";
  
  const statuses = {
    Completed: "text-green-400 bg-green-400/10",
    Error: "text-rose-400 bg-rose-400/10",
  };
  
  const barObj = ref([]);
  
  const verify = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      };
      await client.post(`users/verify/${userId}`, { isVerified: true }, { headers });
      alert("User verification successful");
  

      await fetchUserRecords();
    } catch (error) {
      console.error(error);
      alert("Something went wrong while verifying the user");
    }
  };
  
  const fetchUserRecords = async () => {
    try {
      const response = await client.get("/users");
      barObj.value = response.data;
    } catch (error) {
      console.error(error);
    }
  };
  
  onMounted(async () => {
  
    await fetchUserRecords();
  });
  </script>
  


 