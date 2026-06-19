'use strict';

(function () {
  const input = document.querySelector('.aqi-input');
  const searchBtn = document.querySelector('.aqi-search-btn');
  const result = document.querySelector('.aqi-result');
  const cityChips = document.querySelectorAll('.aqi-city-chip');

  if (!input || !result) return;

  // ── Local AQI dataset (source: aqi.in, updated: 19 Jun 2026) ─────────────
  const AQI_DATA = [
    { city: 'Delhi', state: 'Delhi', aqi: 81 },
    { city: 'New Delhi', state: 'Delhi', aqi: 81 },
    { city: 'Gurugram', state: 'Haryana', aqi: 92 },
    { city: 'Gurgaon', state: 'Haryana', aqi: 92 },
    { city: 'Faridabad', state: 'Haryana', aqi: 98 },
    { city: 'Ghaziabad', state: 'Uttar Pradesh', aqi: 110 },
    { city: 'Noida', state: 'Uttar Pradesh', aqi: 105 },
    { city: 'Greater Noida', state: 'Uttar Pradesh', aqi: 108 },
    { city: 'Lucknow', state: 'Uttar Pradesh', aqi: 138 },
    { city: 'Kanpur', state: 'Uttar Pradesh', aqi: 142 },
    { city: 'Varanasi', state: 'Uttar Pradesh', aqi: 132 },
    { city: 'Agra', state: 'Uttar Pradesh', aqi: 135 },
    { city: 'Meerut', state: 'Uttar Pradesh', aqi: 148 },
    { city: 'Allahabad', state: 'Uttar Pradesh', aqi: 128 },
    { city: 'Prayagraj', state: 'Uttar Pradesh', aqi: 128 },
    { city: 'Gorakhpur', state: 'Uttar Pradesh', aqi: 158 },
    { city: 'Moradabad', state: 'Uttar Pradesh', aqi: 138 },
    { city: 'Bareilly', state: 'Uttar Pradesh', aqi: 125 },
    { city: 'Aligarh', state: 'Uttar Pradesh', aqi: 132 },
    { city: 'Mathura', state: 'Uttar Pradesh', aqi: 122 },
    { city: 'Muzaffarnagar', state: 'Uttar Pradesh', aqi: 136 },
    { city: 'Saharanpur', state: 'Uttar Pradesh', aqi: 130 },
    { city: 'Jhansi', state: 'Uttar Pradesh', aqi: 112 },
    { city: 'Firozabad', state: 'Uttar Pradesh', aqi: 142 },
    { city: 'Rampur', state: 'Uttar Pradesh', aqi: 125 },
    { city: 'Hapur', state: 'Uttar Pradesh', aqi: 148 },
    { city: 'Patna', state: 'Bihar', aqi: 148 },
    { city: 'Muzaffarpur', state: 'Bihar', aqi: 154 },
    { city: 'Gaya', state: 'Bihar', aqi: 132 },
    { city: 'Bhagalpur', state: 'Bihar', aqi: 161 },
    { city: 'Darbhanga', state: 'Bihar', aqi: 138 },
    { city: 'Saharsa', state: 'Bihar', aqi: 164 },
    { city: 'Purnia', state: 'Bihar', aqi: 122 },
    { city: 'Hisar', state: 'Haryana', aqi: 110 },
    { city: 'Rohtak', state: 'Haryana', aqi: 102 },
    { city: 'Sonipat', state: 'Haryana', aqi: 108 },
    { city: 'Panipat', state: 'Haryana', aqi: 98 },
    { city: 'Karnal', state: 'Haryana', aqi: 92 },
    { city: 'Ambala', state: 'Haryana', aqi: 85 },
    { city: 'Bhiwani', state: 'Haryana', aqi: 95 },
    { city: 'Yamunanagar', state: 'Haryana', aqi: 88 },
    { city: 'Jaipur', state: 'Rajasthan', aqi: 118 },
    { city: 'Jodhpur', state: 'Rajasthan', aqi: 95 },
    { city: 'Kota', state: 'Rajasthan', aqi: 110 },
    { city: 'Udaipur', state: 'Rajasthan', aqi: 78 },
    { city: 'Ajmer', state: 'Rajasthan', aqi: 88 },
    { city: 'Bikaner', state: 'Rajasthan', aqi: 102 },
    { city: 'Alwar', state: 'Rajasthan', aqi: 125 },
    { city: 'Bharatpur', state: 'Rajasthan', aqi: 115 },
    { city: 'Pali', state: 'Rajasthan', aqi: 152 },
    { city: 'Sikar', state: 'Rajasthan', aqi: 105 },
    { city: 'Ludhiana', state: 'Punjab', aqi: 122 },
    { city: 'Amritsar', state: 'Punjab', aqi: 115 },
    { city: 'Jalandhar', state: 'Punjab', aqi: 110 },
    { city: 'Patiala', state: 'Punjab', aqi: 102 },
    { city: 'Bathinda', state: 'Punjab', aqi: 98 },
    { city: 'Mohali', state: 'Punjab', aqi: 90 },
    { city: 'Pathankot', state: 'Punjab', aqi: 82 },
    { city: 'Chandigarh', state: 'Chandigarh', aqi: 79 },
    { city: 'Shimla', state: 'Himachal Pradesh', aqi: 42 },
    { city: 'Manali', state: 'Himachal Pradesh', aqi: 25 },
    { city: 'Dharamsala', state: 'Himachal Pradesh', aqi: 153 },
    { city: 'Dharamshala', state: 'Himachal Pradesh', aqi: 153 },
    { city: 'Solan', state: 'Himachal Pradesh', aqi: 48 },
    { city: 'Mandi', state: 'Himachal Pradesh', aqi: 44 },
    { city: 'Kullu', state: 'Himachal Pradesh', aqi: 30 },
    { city: 'Dehradun', state: 'Uttarakhand', aqi: 75 },
    { city: 'Haridwar', state: 'Uttarakhand', aqi: 95 },
    { city: 'Rishikesh', state: 'Uttarakhand', aqi: 65 },
    { city: 'Nainital', state: 'Uttarakhand', aqi: 38 },
    { city: 'Mussoorie', state: 'Uttarakhand', aqi: 32 },
    { city: 'Roorkee', state: 'Uttarakhand', aqi: 82 },
    { city: 'Haldwani', state: 'Uttarakhand', aqi: 78 },
    { city: 'Raipur', state: 'Chhattisgarh', aqi: 108 },
    { city: 'Bilaspur', state: 'Chhattisgarh', aqi: 98 },
    { city: 'Bhilai', state: 'Chhattisgarh', aqi: 118 },
    { city: 'Durg', state: 'Chhattisgarh', aqi: 112 },
    { city: 'Korba', state: 'Chhattisgarh', aqi: 132 },
    { city: 'Jagdalpur', state: 'Chhattisgarh', aqi: 62 },
    { city: 'Raigarh', state: 'Chhattisgarh', aqi: 122 },
    { city: 'Bhopal', state: 'Madhya Pradesh', aqi: 108 },
    { city: 'Indore', state: 'Madhya Pradesh', aqi: 115 },
    { city: 'Jabalpur', state: 'Madhya Pradesh', aqi: 102 },
    { city: 'Gwalior', state: 'Madhya Pradesh', aqi: 138 },
    { city: 'Ujjain', state: 'Madhya Pradesh', aqi: 112 },
    { city: 'Satna', state: 'Madhya Pradesh', aqi: 98 },
    { city: 'Rewa', state: 'Madhya Pradesh', aqi: 92 },
    { city: 'Sagar', state: 'Madhya Pradesh', aqi: 88 },
    { city: 'Ratlam', state: 'Madhya Pradesh', aqi: 102 },
    { city: 'Dewas', state: 'Madhya Pradesh', aqi: 110 },
    { city: 'Singrauli', state: 'Madhya Pradesh', aqi: 138 },
    { city: 'Renipani', state: 'Madhya Pradesh', aqi: 0 },
    { city: 'Madhai', state: 'Madhya Pradesh', aqi: 0 },
    { city: 'Satpura', state: 'Madhya Pradesh', aqi: 0 },
    { city: 'Pachmarhi', state: 'Madhya Pradesh', aqi: 15 },
    { city: 'Mumbai', state: 'Maharashtra', aqi: 57 },
    { city: 'Pune', state: 'Maharashtra', aqi: 51 },
    { city: 'Nagpur', state: 'Maharashtra', aqi: 112 },
    { city: 'Nashik', state: 'Maharashtra', aqi: 92 },
    { city: 'Aurangabad', state: 'Maharashtra', aqi: 102 },
    { city: 'Solapur', state: 'Maharashtra', aqi: 88 },
    { city: 'Kolhapur', state: 'Maharashtra', aqi: 72 },
    { city: 'Thane', state: 'Maharashtra', aqi: 65 },
    { city: 'Navi Mumbai', state: 'Maharashtra', aqi: 62 },
    { city: 'Amravati', state: 'Maharashtra', aqi: 98 },
    { city: 'Akola', state: 'Maharashtra', aqi: 92 },
    { city: 'Latur', state: 'Maharashtra', aqi: 82 },
    { city: 'Nanded', state: 'Maharashtra', aqi: 78 },
    { city: 'Pimpri', state: 'Maharashtra', aqi: 102 },
    { city: 'Ahmedabad', state: 'Gujarat', aqi: 69 },
    { city: 'Surat', state: 'Gujarat', aqi: 75 },
    { city: 'Vadodara', state: 'Gujarat', aqi: 72 },
    { city: 'Rajkot', state: 'Gujarat', aqi: 68 },
    { city: 'Gandhinagar', state: 'Gujarat', aqi: 65 },
    { city: 'Bhavnagar', state: 'Gujarat', aqi: 60 },
    { city: 'Jamnagar', state: 'Gujarat', aqi: 58 },
    { city: 'Junagadh', state: 'Gujarat', aqi: 55 },
    { city: 'Anand', state: 'Gujarat', aqi: 62 },
    { city: 'Bharuch', state: 'Gujarat', aqi: 70 },
    { city: 'Vapi', state: 'Gujarat', aqi: 78 },
    { city: 'Bengaluru', state: 'Karnataka', aqi: 96 },
    { city: 'Bangalore', state: 'Karnataka', aqi: 96 },
    { city: 'Mysuru', state: 'Karnataka', aqi: 68 },
    { city: 'Mysore', state: 'Karnataka', aqi: 68 },
    { city: 'Hubli', state: 'Karnataka', aqi: 85 },
    { city: 'Dharwad', state: 'Karnataka', aqi: 80 },
    { city: 'Mangaluru', state: 'Karnataka', aqi: 55 },
    { city: 'Mangalore', state: 'Karnataka', aqi: 55 },
    { city: 'Belagavi', state: 'Karnataka', aqi: 182 },
    { city: 'Belgaum', state: 'Karnataka', aqi: 182 },
    { city: 'Davangere', state: 'Karnataka', aqi: 78 },
    { city: 'Ballari', state: 'Karnataka', aqi: 88 },
    { city: 'Kalaburagi', state: 'Karnataka', aqi: 82 },
    { city: 'Shivamogga', state: 'Karnataka', aqi: 70 },
    { city: 'Tumkur', state: 'Karnataka', aqi: 75 },
    { city: 'Chennai', state: 'Tamil Nadu', aqi: 98 },
    { city: 'Coimbatore', state: 'Tamil Nadu', aqi: 78 },
    { city: 'Madurai', state: 'Tamil Nadu', aqi: 88 },
    { city: 'Salem', state: 'Tamil Nadu', aqi: 72 },
    { city: 'Tiruchirappalli', state: 'Tamil Nadu', aqi: 82 },
    { city: 'Trichy', state: 'Tamil Nadu', aqi: 82 },
    { city: 'Tirunelveli', state: 'Tamil Nadu', aqi: 68 },
    { city: 'Vellore', state: 'Tamil Nadu', aqi: 75 },
    { city: 'Erode', state: 'Tamil Nadu', aqi: 72 },
    { city: 'Tiruppur', state: 'Tamil Nadu', aqi: 70 },
    { city: 'Thoothukudi', state: 'Tamil Nadu', aqi: 62 },
    { city: 'Hyderabad', state: 'Telangana', aqi: 89 },
    { city: 'Warangal', state: 'Telangana', aqi: 92 },
    { city: 'Nizamabad', state: 'Telangana', aqi: 82 },
    { city: 'Karimnagar', state: 'Telangana', aqi: 85 },
    { city: 'Khammam', state: 'Telangana', aqi: 78 },
    { city: 'Secunderabad', state: 'Telangana', aqi: 88 },
    { city: 'Visakhapatnam', state: 'Andhra Pradesh', aqi: 78 },
    { city: 'Vizag', state: 'Andhra Pradesh', aqi: 78 },
    { city: 'Vijayawada', state: 'Andhra Pradesh', aqi: 92 },
    { city: 'Guntur', state: 'Andhra Pradesh', aqi: 85 },
    { city: 'Nellore', state: 'Andhra Pradesh', aqi: 75 },
    { city: 'Kurnool', state: 'Andhra Pradesh', aqi: 82 },
    { city: 'Tirupati', state: 'Andhra Pradesh', aqi: 68 },
    { city: 'Rajahmundry', state: 'Andhra Pradesh', aqi: 72 },
    { city: 'Kakinada', state: 'Andhra Pradesh', aqi: 70 },
    { city: 'Thiruvananthapuram', state: 'Kerala', aqi: 48 },
    { city: 'Trivandrum', state: 'Kerala', aqi: 48 },
    { city: 'Kochi', state: 'Kerala', aqi: 55 },
    { city: 'Cochin', state: 'Kerala', aqi: 55 },
    { city: 'Kozhikode', state: 'Kerala', aqi: 42 },
    { city: 'Calicut', state: 'Kerala', aqi: 42 },
    { city: 'Thrissur', state: 'Kerala', aqi: 52 },
    { city: 'Kollam', state: 'Kerala', aqi: 48 },
    { city: 'Kannur', state: 'Kerala', aqi: 38 },
    { city: 'Alappuzha', state: 'Kerala', aqi: 42 },
    { city: 'Palakkad', state: 'Kerala', aqi: 50 },
    { city: 'Kolkata', state: 'West Bengal', aqi: 105 },
    { city: 'Calcutta', state: 'West Bengal', aqi: 105 },
    { city: 'Howrah', state: 'West Bengal', aqi: 112 },
    { city: 'Durgapur', state: 'West Bengal', aqi: 125 },
    { city: 'Asansol', state: 'West Bengal', aqi: 118 },
    { city: 'Siliguri', state: 'West Bengal', aqi: 65 },
    { city: 'Darjeeling', state: 'West Bengal', aqi: 32 },
    { city: 'Kharagpur', state: 'West Bengal', aqi: 98 },
    { city: 'Burdwan', state: 'West Bengal', aqi: 110 },
    { city: 'Raiganj', state: 'West Bengal', aqi: 158 },
    { city: 'Haldia', state: 'West Bengal', aqi: 122 },
    { city: 'Ranchi', state: 'Jharkhand', aqi: 155 },
    { city: 'Jamshedpur', state: 'Jharkhand', aqi: 115 },
    { city: 'Dhanbad', state: 'Jharkhand', aqi: 179 },
    { city: 'Bokaro', state: 'Jharkhand', aqi: 132 },
    { city: 'Hazaribagh', state: 'Jharkhand', aqi: 78 },
    { city: 'Bhubaneswar', state: 'Odisha', aqi: 75 },
    { city: 'Cuttack', state: 'Odisha', aqi: 80 },
    { city: 'Rourkela', state: 'Odisha', aqi: 98 },
    { city: 'Sambalpur', state: 'Odisha', aqi: 85 },
    { city: 'Puri', state: 'Odisha', aqi: 60 },
    { city: 'Berhampur', state: 'Odisha', aqi: 72 },
    { city: 'Guwahati', state: 'Assam', aqi: 70 },
    { city: 'Silchar', state: 'Assam', aqi: 55 },
    { city: 'Dibrugarh', state: 'Assam', aqi: 60 },
    { city: 'Jorhat', state: 'Assam', aqi: 52 },
    { city: 'Nagaon', state: 'Assam', aqi: 58 },
    { city: 'Shillong', state: 'Meghalaya', aqi: 35 },
    { city: 'Kohima', state: 'Nagaland', aqi: 25 },
    { city: 'Dimapur', state: 'Nagaland', aqi: 40 },
    { city: 'Imphal', state: 'Manipur', aqi: 42 },
    { city: 'Aizawl', state: 'Mizoram', aqi: 22 },
    { city: 'Agartala', state: 'Tripura', aqi: 55 },
    { city: 'Itanagar', state: 'Arunachal Pradesh', aqi: 28 },
    { city: 'Gangtok', state: 'Sikkim', aqi: 22 },
    { city: 'Srinagar', state: 'Jammu & Kashmir', aqi: 58 },
    { city: 'Jammu', state: 'Jammu & Kashmir', aqi: 105 },
    { city: 'Leh', state: 'Ladakh', aqi: 28 },
    { city: 'Kargil', state: 'Ladakh', aqi: 22 },
    { city: 'Panaji', state: 'Goa', aqi: 45 },
    { city: 'Margao', state: 'Goa', aqi: 48 },
    { city: 'Vasco da Gama', state: 'Goa', aqi: 50 },
    { city: 'Mapusa', state: 'Goa', aqi: 42 },
    { city: 'Puducherry', state: 'Puducherry', aqi: 70 },
    { city: 'Pondicherry', state: 'Puducherry', aqi: 70 },
    { city: 'Port Blair', state: 'Andaman & Nicobar', aqi: 22 },
    { city: 'Silvassa', state: 'Dadra & Nagar Haveli', aqi: 78 },
    { city: 'Daman', state: 'Daman & Diu', aqi: 72 },
    { city: 'Diu', state: 'Daman & Diu', aqi: 58 },
  ];

  // ── Lookup ─────────────────────────────────────────────────────────────────
  function lookupCity(query) {
    const q = query.trim().toLowerCase();
    return AQI_DATA.find(d => d.city.toLowerCase() === q) || null;
  }

  // ── AQI helpers — Indian CPCB scale ────────────────────────────────────────
  function getAQIInfo(aqi) {
    if (aqi <= 50)  return { color: '#00C853', label: 'Good',        desc: 'Minimal impact. Safe for everyone.' };
    if (aqi <= 100) return { color: '#AEEA00', label: 'Satisfactory', desc: 'Minor breathing discomfort to sensitive people (asthma, elderly, children).' };
    if (aqi <= 200) return { color: '#FFD600', label: 'Moderate',    desc: 'Breathing discomfort to people with lung disease, asthma, children, and older adults.' };
    if (aqi <= 300) return { color: '#FF6D00', label: 'Poor',        desc: 'Breathing discomfort to most people on prolonged exposure.' };
    if (aqi <= 400) return { color: '#DD2C00', label: 'Very Poor',   desc: 'Respiratory illness on prolonged exposure; avoid outdoor exercise.' };
    return           { color: '#6A0000', label: 'Severe',      desc: 'Affects healthy people and seriously impacts those with existing diseases, health emergencies.' };
  }

  function getMessage(aqi) {
    if (aqi === 0)   return 'This is Satpura territory — pristine air, zero pollution.';
    if (aqi <= 50)   return 'Even at its cleanest, city air can\'t match a pristine forest.';
    if (aqi <= 100)  return `At ${aqi} AQI, sensitive groups are already at risk. Satpura sits at 0.`;
    if (aqi <= 200)  return `At ${aqi} AQI, your lungs are working overtime. Satpura breathes at absolute zero.`;
    if (aqi <= 300)  return `${aqi} AQI — most people face breathing discomfort. Satpura: 0. The gap is staggering.`;
    if (aqi <= 400)  return `${aqi} AQI — avoid going outside. Satpura's forest air remains at zero pollution.`;
    return `${aqi} AQI — a health emergency. Satpura's forest breathes at absolute zero.`;
  }

  // ── Render ─────────────────────────────────────────────────────────────────
  function showError(msg) {
    result.innerHTML = `<div class="aqi-error">${msg}</div>`;
    result.classList.add('visible');
  }

  function showResult(entry) {
    const { city, state, aqi } = entry;
    const info = getAQIInfo(aqi);
    const barPct = Math.min((aqi / 500) * 100, 100);
    const msg = getMessage(aqi);

    result.innerHTML = `
      <div class="aqi-compare-row">
        <div class="aqi-city-block">
          <p class="aqi-city-name">${city}</p>
          <p class="aqi-city-state">${state}</p>
          <span class="aqi-city-number" style="color:${info.color}">${aqi}</span>
        </div>
        <div class="aqi-vs">vs</div>
        <div class="aqi-city-block">
          <p class="aqi-city-name">Satpura Forest</p>
          <p class="aqi-city-state">Madhya Pradesh</p>
          <span class="aqi-forest-number">0</span>
          <span class="aqi-forest-label">Zero Pollution</span>
        </div>
      </div>
      <div class="aqi-gauge-wrap">
        <div class="aqi-gauge-labels">
          <span>${city}</span>
          <span>Satpura (0)</span>
        </div>
        <div class="aqi-gauge-bar-bg">
          <div class="aqi-gauge-bar-fill" style="background:${info.color};width:0%"></div>
        </div>
      </div>
      <span class="aqi-category" style="background:${info.color}20;color:${info.color}">${info.label}</span>
      <p class="aqi-category-desc" style="color:rgba(255,255,255,0.75);font-size:0.82em;margin:6px 0 0;font-style:italic;">${info.desc}</p>
      <p class="aqi-message">"${msg}"</p>
    `;

    result.classList.add('visible');
    requestAnimationFrame(() => requestAnimationFrame(() => {
      const bar = result.querySelector('.aqi-gauge-bar-fill');
      if (bar) bar.style.width = barPct + '%';
    }));
  }

  // ── Search ─────────────────────────────────────────────────────────────────
  function triggerSearch() {
    const query = input.value.trim();
    if (!query) { input.focus(); return; }

    const entry = lookupCity(query);
    if (entry) {
      showResult(entry);
    } else {
      showError(`Unable to fetch AQI for <strong>${query}</strong>. Try a major Indian city.`);
    }
  }

  searchBtn && searchBtn.addEventListener('click', triggerSearch);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') triggerSearch(); });
  cityChips.forEach(chip => {
    chip.addEventListener('click', () => {
      input.value = chip.dataset.city;
      triggerSearch();
    });
  });
})();
