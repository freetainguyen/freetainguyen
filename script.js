// script.js

// Lấy tài nguyên từ localStorage
function getResources() {
  return JSON.parse(localStorage.getItem("resources") || "[]");
}

// Lưu tài nguyên vào localStorage
function saveResources(data) {
  localStorage.setItem("resources", JSON.stringify(data));
}

// Hiển thị tài nguyên theo loại
function displayResources(type, containerId) {
  const list = getResources().filter(r => r.type === type);
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = "";

  if (list.length === 0) {
    container.innerHTML = "<p>Chưa có tài nguyên nào.</p>";
    return;
  }

  list.forEach((res, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>${res.name}</h3>
      <p>${res.desc}</p>
      <a href="${res.link}" target="_blank"><button>Tải về</button></a>
    `;
    container.appendChild(card);
  });
}

// Hiển thị tất cả tài nguyên để quản lý (thêm phần xóa)
function displayAllResources(containerId) {
  const list = getResources();
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = "";

  if (list.length === 0) {
    container.innerHTML = "<p>Chưa có tài nguyên nào.</p>";
    return;
  }

  list.forEach((res, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>${res.name} <small>[${res.type}]</small></h3>
      <p>${res.desc}</p>
      <a href="${res.link}" target="_blank"><button>Tải về</button></a>
      <button style="margin-left:10px; background:red; color:white;" onclick="deleteResource(${index})">❌ Xóa</button>
    `;
    container.appendChild(card);
  });
}

// Thêm tài nguyên
function handleAddResource() {
  const name = document.getElementById("resName").value.trim();
  const desc = document.getElementById("resDesc").value.trim();
  const link = document.getElementById("resLink").value.trim();
  const type = document.getElementById("resType").value;

  if (!name || !desc || !link) {
    alert("Vui lòng điền đầy đủ thông tin!");
    return;
  }

  const data = getResources();
  data.push({ name, desc, link, type });
  saveResources(data);
  alert("Thêm tài nguyên thành công!");
  document.getElementById("resForm").reset();
}

// Xóa tài nguyên
function deleteResource(index) {
  let data = getResources();
  if (!data[index]) return;
  if (confirm(`Bạn có chắc chắn muốn xóa tài nguyên "${data[index].name}" không?`)) {
    data.splice(index, 1);
    saveResources(data);
    displayAllResources('allResources');
  }
}
