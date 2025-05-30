const canvas = document.getElementById('sim-canvas');
  const ctx = canvas.getContext('2d');
  const pressureSlider = document.getElementById('pressure-slider');
  const temperatureSlider = document.getElementById('temperature-slider');
  const pressureVal = document.getElementById('pressure-val');
  const temperatureVal = document.getElementById('temperature-val');
  const instructions = document.getElementById('instructions');
  let membraneSelected = false;
  function updateInstructions() {
    const pressureSet = pressure > 0;
    const temperatureSet = temperature > 15; // assuming 15 is default
    const membraneSet = membraneSelected;
    

    if (!pressureSet || !temperatureSet) {
      instructions.textContent = "Adjust pressure and temperature to start.";
    } else if (!membraneSet) {
      instructions.textContent = "Select membrane.";
    } else {
      instructions.textContent = "Start experiment";
    }
  }

  const membranes = {
    TFC: { thickness: 6, color: 'black', gap: 7, allowedSizes: [6] },
    CA: { thickness: 3, color: 'blue', gap: 7, allowedSizes: [6, 8] },
    PT: { thickness: 2, color: 'green', gap: 11, allowedSizes: [6, 8, 10] }
  };

  let selectedMembrane = 'TFC';
  let molecules = [];
  let animationId;
  let running = false;

  function initMolecules() {
    molecules = [];
    const sizes = [6, 8, 10, 12];
    const colors = ['blue', 'red', 'green', 'purple'];
    for (let i = 0; i < 50; i++) {
      const sizeIndex = Math.floor(Math.random() * sizes.length);
      molecules.push({
        x: Math.random() * (canvas.width / 2 - 30),
        y: Math.random() * (canvas.height - sizes[sizeIndex]),
        size: sizes[sizeIndex],
        color: colors[sizeIndex],
        vx: 0,
        vy: 0,
        settled: false
      });
    }
  }

  function drawBeaker() {
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#e0f7fa');
    gradient.addColorStop(1, '#b2ebf2');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#0077b6';
    ctx.lineWidth = 3;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
  }

  function drawMembrane(type) {
    const x = canvas.width / 2;
    ctx.save();
    ctx.translate(x, 0);
    ctx.lineCap = 'round';
    const mem = membranes[type];
    ctx.strokeStyle = mem.color;
    ctx.lineWidth = mem.thickness;

    if (type === 'TFC') {
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, canvas.height);
      ctx.stroke();
    } else if (type === 'CA') {
      ctx.setLineDash([]);
      let y = 0;
      while (y < canvas.height) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(0, y + 14);
        ctx.stroke();
        y += 20;
      }
    } else if (type === 'PT') {
      ctx.setLineDash([10, 6]);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, canvas.height);
      ctx.stroke();
    }

    ctx.restore();
  }

  function updateMolecules(membrane) {
    if (pressure <= 0) return;
    for (let mol of molecules) {
      if (!running) continue;
      let speed = 0.5 + pressure * 0.3 + (temperature - 15) * 0.1;
      if (!mol.settled) {
        mol.vx += 0.05;
        mol.vx = Math.min(mol.vx, speed);
      }
      mol.x += mol.vx;

      if (mol.x >= canvas.width / 2) {
        if (!mol.settled) {
          mol.vy += 0.3 - 0.1 * mol.vy;
          mol.vx -= 0.1 * mol.vx;
          mol.y += mol.vy;

          if (mol.y + mol.size >= canvas.height) {
            mol.y = canvas.height - mol.size;
            mol.vx = mol.vy = 0;
            mol.settled = true;
          }

          if (mol.y < 0) {
            mol.y = 0;
            mol.vy *= -0.6;
          }
        }
      } else {
        mol.y += mol.vy;
        if (mol.y < 0 || mol.y > canvas.height - mol.size) mol.vy *= -1;
      }

      if (
        mol.x + mol.size > canvas.width / 2 &&
        mol.x < canvas.width / 2 + membrane.thickness
      ) {
        if (selectedMembrane === 'CA') {
          const inGap = (mol.y % 20) >= 14;
          if (!membrane.allowedSizes.includes(mol.size) || !inGap) {
            mol.x = canvas.width / 2 - mol.size;
            mol.vx *= -1;
          }
        } else {
          if (!membrane.allowedSizes.includes(mol.size)) {
            mol.x = canvas.width / 2 - mol.size;
            mol.vx *= -1;
          }
        }
      }

      if (mol.x + mol.size > canvas.width) {
        mol.x = canvas.width - mol.size;
        mol.vx *= -1;
      }
      if (mol.x < 0) {
        mol.x = 0;
        mol.vx *= -1;
      }
    }
  }

  function drawMolecules() {
    for (let mol of molecules) {
      ctx.beginPath();
      ctx.fillStyle = mol.color;
      ctx.arc(mol.x, mol.y, mol.size / 2, 0, 2 * Math.PI);
      ctx.fill();
    }
  }

  function animate() {
    const membrane = membranes[selectedMembrane];
    drawBeaker();
    drawMembrane(selectedMembrane);
    updateMolecules(membrane);
    drawMolecules();
    updateGraph(pressure, temperature, membrane);
    animationId = requestAnimationFrame(animate);
  }

  

  const chartCtx = document.getElementById('fluxChart').getContext('2d');
  const chart = new Chart(chartCtx, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'Water Flux',
        borderColor: 'blue',
        data: [],
        fill: false
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { title: { display: true, text: 'Pressure (atm)' }},
        y: { title: { display: true, text: 'Water Flux (arbitrary units)' }}
      }
    }
  });
  chart.data.labels = ['0'];
  chart.data.datasets[0].data = [0];
  chart.update();
  function updateGraph(pressure, temperature, membrane) {
    if (!running || pressure <= 0) return;
    const flux = pressure * (temperature - 10) * membrane.allowedSizes.length * 0.1;
    chart.data.labels.push(pressure.toFixed(1));
    chart.data.datasets[0].data.push(flux.toFixed(2));
    if (chart.data.labels.length > 50) {
      chart.data.labels.shift();
      chart.data.datasets[0].data.shift();
    }
    chart.update('none');
  }

  pressureSlider.oninput = () => {
    pressure = parseFloat(pressureSlider.value);
    pressureVal.textContent = pressure;
    updateInstructions();
  };

  temperatureSlider.oninput = () => {
    temperature = parseFloat(temperatureSlider.value);
    temperatureVal.textContent = temperature;
    updateInstructions();
  };

  document.getElementById('start-btn').onclick = () => {
    if (!running && pressure > 0) {
      running = true;
      animate();
    }
  };

  document.getElementById('pause-btn').onclick = () => {
    running = false;
    cancelAnimationFrame(animationId);
  };

  document.getElementById('reset-btn').onclick = () => {
    running = false;
    cancelAnimationFrame(animationId);
    initMolecules();
    chart.data.labels = ['0'];
    chart.data.datasets[0].data = [0];
    chart.update();

    pressureSlider.value = 0;
    temperatureSlider.value = 15;
    pressureVal.textContent = '0';
    temperatureVal.textContent = '15';
    pressure = 0;
    temperature = 15;

    drawBeaker();
    drawMembrane(selectedMembrane);
    drawMolecules();
    instructions.textContent = "Adjust pressure and temperature to start.";
  };

  document.querySelectorAll('.membrane').forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll('.membrane').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedMembrane = btn.getAttribute('data-membrane');
      membraneSelected = true;
      drawBeaker();
      drawMembrane(selectedMembrane);
      drawMolecules();
      updateInstructions();
    };
  });

  let pressure = 0, temperature = 15;
  pressureSlider.value = 0;
  temperatureSlider.value = 15;
  pressureVal.textContent = '0';
  temperatureVal.textContent = '15';

  initMolecules();
  drawBeaker();
  drawMembrane(selectedMembrane);
  drawMolecules();
