// script.js

async function fetchDummyData() {
    const response = await fetch("https://dummyjson.com/users");
    const data = await response.json();
  
    const dummyDataList = document.getElementById("dummyData");
    data.users.slice(0, 5).forEach((user) => {
      const listItem = document.createElement("li");
      listItem.textContent = `User: ${user.firstName}, Time Zone: Simulated`;
      dummyDataList.appendChild(listItem);
    });
  }
  
  function convertTime(datetime, sourceZone, targetZone) {
    try {
      // Use Luxon or Intl.DateTimeFormat for robust handling
      const options = { timeZone: targetZone, hour12: true };
      const formatted = new Intl.DateTimeFormat("en-US", options).format(
        new Date(datetime)
      );
  
      return formatted;
    } catch (error) {
      return `Error converting time: ${error.message}`;
    }
  }
  
  document.getElementById("timeZoneForm").addEventListener("submit", (e) => {
    e.preventDefault();
  
    const datetime = document.getElementById("datetime").value;
    const sourceZone = document.getElementById("sourceZone").value;
    const targetZone = document.getElementById("targetZone").value;
  
    const convertedTime = convertTime(datetime, sourceZone, targetZone);
    document.getElementById("output").textContent = convertedTime;
  });
  
  fetchDummyData();
  