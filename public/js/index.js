const updateBtn = document.getElementById("updateBtn");
const connectBtn = document.getElementById("connectBtn");
const wifiSelect = document.getElementById("wifiSelect");
const wifiPassword = document.getElementById("wifiPassword");

// Функция для получения списка Wi-Fi сетей
async function fetchWiFiNetworks() {
  try {
    const response = await fetch("/api/wifi");
    const { networks } = await response.json();
    updateWiFiList(networks);
  } catch (error) {
    console.error("Ошибка при получении Wi-Fi сетей:", error);
  }
}

// Функция для обновления списка сетей
function updateWiFiList(networks) {
  wifiSelect.innerHTML = networks.length
    ? networks
        .map((n) => `<option value="${n.ssid}">${n.ssid}</option>`)
        .join("")
    : '<option value="">Нет доступных сетей</option>';
  restoreSavedData();
}

// Восстановление сохраненных данных
function restoreSavedData() {
  const savedData = JSON.parse(localStorage.getItem("wifiData"));
  if (savedData) {
    wifiSelect.value = savedData.network;
    wifiPassword.value = savedData.password;
  }
}

// Сохранение данных в localStorage
function saveWiFiData() {
  const selectedNetwork = wifiSelect.value;
  const password = wifiPassword.value;
  if (selectedNetwork && password) {
    localStorage.setItem(
      "wifiData",
      JSON.stringify({ network: selectedNetwork, password })
    );
    console.log(`Подключаемся к ${selectedNetwork} с паролем: ${password}`);
  } else {
    alert("Выберите сеть и введите пароль");
  }
}

updateBtn.addEventListener("click", fetchWiFiNetworks);
connectBtn.addEventListener("click", saveWiFiData);

document.addEventListener("DOMContentLoaded", fetchWiFiNetworks);
