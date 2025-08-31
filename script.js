
document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const regionSelect = document.getElementById("regionSelect");
  const typeSelect = document.getElementById("typeSelect");
  const resultsContainer = document.getElementById("resultsContainer");

  // 드롭다운 옵션 설정
  const regions = [...new Set(data.map(row => row["지역"]).filter(Boolean))].sort();
  const types = [...new Set(data.map(row => row["전형유형"]).filter(Boolean))].sort();

  regions.forEach(region => {
    const opt = document.createElement("option");
    opt.value = region;
    opt.textContent = region;
    regionSelect.appendChild(opt);
  });

  types.forEach(type => {
    const opt = document.createElement("option");
    opt.value = type;
    opt.textContent = type;
    typeSelect.appendChild(opt);
  });

  function renderResults() {
    const query = searchInput.value.trim().toLowerCase();
    const selectedRegion = regionSelect.value;
    const selectedType = typeSelect.value;

    resultsContainer.innerHTML = "";

    const filtered = data.filter(row => {
      const matchesQuery = `${row["대학명"]} ${row["모집단위"]}`.toLowerCase().includes(query);
      const matchesRegion = !selectedRegion || row["지역"] === selectedRegion;
      const matchesType = !selectedType || row["전형유형"] === selectedType;
      return matchesQuery && matchesRegion && matchesType;
    });

    filtered.forEach(row => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <h3>${row["대학명"]}</h3>
        <p><strong>지역:</strong> ${row["지역"]}</p>
        <p><strong>전형유형:</strong> ${row["전형유형"]}</p>
        <p><strong>모집단위:</strong> ${row["모집단위"]}</p>
        <p><strong>2025 경쟁률:</strong> ${row["2025 입시결과 경쟁"]}</p>
        <p><strong>2025 70%컷:</strong> ${row["2025 입시결과 70%"]}</p>
        <p><strong>2024 경쟁률:</strong> ${row["2024 입시결과 경쟁"]}</p>
        <p><strong>2024 70%컷:</strong> ${row["2024 입시결과 70%"]}</p>
      `;
      resultsContainer.appendChild(card);
    });
  }

  searchInput.addEventListener("input", renderResults);
  regionSelect.addEventListener("change", renderResults);
  typeSelect.addEventListener("change", renderResults);

  renderResults();
});
