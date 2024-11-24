import express from "express";
import config from "./config.js";
import path from "path";
import wifi from "node-wifi";

// Инициализируем wifi
wifi.init({
  iface: null, // Оставьте null для автоматического выбора интерфейса
});

const __dirname = path.resolve();

const app = express();
app.use(express.json());

// Обслуживаем статические файлы из папки "public"
app.use(express.static(path.join(__dirname, "public")));

// Роут для корня сайта (отдаём index.html)
app.get("/", (req, res) => {
  const filePath = path.join(__dirname, "public", "index.html");
  console.log("Отдаю файл:", filePath); // Логируем путь для проверки
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error("Ошибка при отдаче файла:", err);
    }
  });
});

// Роут для получения списка доступных Wi-Fi сетей
app.get("/api/wifi", (req, res) => {
  wifi.scan((error, networks) => {
    if (error) {
      res.status(500).json({ message: "Ошибка при сканировании Wi-Fi сетей" });
    } else {
      res.status(200).json({ networks });
    }
  });
});

app.listen(config.port, () => {
  console.log(`Server запущен на порту ${config.port}`);
});
