'use strict';

(function () {
  const input = document.querySelector('.aqi-input');
  const searchBtn = document.querySelector('.aqi-search-btn');
  const result = document.querySelector('.aqi-result');
  const cityChips = document.querySelectorAll('.aqi-city-chip');

  if (!input || !result) return;

  // ── Local AQI dataset (source: india-aqi.csv) ──────────────────────────────
  const AQI_DATA = [
    { city: 'Delhi', state: 'Delhi', aqi: 218 },
    { city: 'New Delhi', state: 'Delhi', aqi: 215 },
    { city: 'Gurugram', state: 'Haryana', aqi: 198 },
    { city: 'Gurgaon', state: 'Haryana', aqi: 198 },
    { city: 'Faridabad', state: 'Haryana', aqi: 203 },
    { city: 'Ghaziabad', state: 'Uttar Pradesh', aqi: 225 },
    { city: 'Noida', state: 'Uttar Pradesh', aqi: 212 },
    { city: 'Greater Noida', state: 'Uttar Pradesh', aqi: 215 },
    { city: 'Lucknow', state: 'Uttar Pradesh', aqi: 178 },
    { city: 'Kanpur', state: 'Uttar Pradesh', aqi: 182 },
    { city: 'Varanasi', state: 'Uttar Pradesh', aqi: 168 },
    { city: 'Agra', state: 'Uttar Pradesh', aqi: 172 },
    { city: 'Meerut', state: 'Uttar Pradesh', aqi: 192 },
    { city: 'Allahabad', state: 'Uttar Pradesh', aqi: 165 },
    { city: 'Prayagraj', state: 'Uttar Pradesh', aqi: 165 },
    { city: 'Gorakhpur', state: 'Uttar Pradesh', aqi: 158 },
    { city: 'Moradabad', state: 'Uttar Pradesh', aqi: 178 },
    { city: 'Bareilly', state: 'Uttar Pradesh', aqi: 162 },
    { city: 'Aligarh', state: 'Uttar Pradesh', aqi: 170 },
    { city: 'Mathura', state: 'Uttar Pradesh', aqi: 158 },
    { city: 'Muzaffarnagar', state: 'Uttar Pradesh', aqi: 175 },
    { city: 'Saharanpur', state: 'Uttar Pradesh', aqi: 168 },
    { city: 'Jhansi', state: 'Uttar Pradesh', aqi: 145 },
    { city: 'Firozabad', state: 'Uttar Pradesh', aqi: 185 },
    { city: 'Rampur', state: 'Uttar Pradesh', aqi: 162 },
    { city: 'Hapur', state: 'Uttar Pradesh', aqi: 192 },
    { city: 'Patna', state: 'Bihar', aqi: 188 },
    { city: 'Muzaffarpur', state: 'Bihar', aqi: 192 },
    { city: 'Gaya', state: 'Bihar', aqi: 168 },
    { city: 'Bhagalpur', state: 'Bihar', aqi: 158 },
    { city: 'Darbhanga', state: 'Bihar', aqi: 172 },
    { city: 'Purnia', state: 'Bihar', aqi: 155 },
    { city: 'Hisar', state: 'Haryana', aqi: 182 },
    { city: 'Rohtak', state: 'Haryana', aqi: 172 },
    { city: 'Sonipat', state: 'Haryana', aqi: 188 },
    { city: 'Panipat', state: 'Haryana', aqi: 168 },
    { city: 'Karnal', state: 'Haryana', aqi: 158 },
    { city: 'Ambala', state: 'Haryana', aqi: 142 },
    { city: 'Bhiwani', state: 'Haryana', aqi: 165 },
    { city: 'Yamunanagar', state: 'Haryana', aqi: 155 },
    { city: 'Jaipur', state: 'Rajasthan', aqi: 152 },
    { city: 'Jodhpur', state: 'Rajasthan', aqi: 122 },
    { city: 'Kota', state: 'Rajasthan', aqi: 142 },
    { city: 'Udaipur', state: 'Rajasthan', aqi: 98 },
    { city: 'Ajmer', state: 'Rajasthan', aqi: 112 },
    { city: 'Bikaner', state: 'Rajasthan', aqi: 132 },
    { city: 'Alwar', state: 'Rajasthan', aqi: 162 },
    { city: 'Bharatpur', state: 'Rajasthan', aqi: 148 },
    { city: 'Pali', state: 'Rajasthan', aqi: 118 },
    { city: 'Sikar', state: 'Rajasthan', aqi: 135 },
    { city: 'Ludhiana', state: 'Punjab', aqi: 158 },
    { city: 'Amritsar', state: 'Punjab', aqi: 148 },
    { city: 'Jalandhar', state: 'Punjab', aqi: 142 },
    { city: 'Patiala', state: 'Punjab', aqi: 132 },
    { city: 'Bathinda', state: 'Punjab', aqi: 128 },
    { city: 'Mohali', state: 'Punjab', aqi: 118 },
    { city: 'Pathankot', state: 'Punjab', aqi: 105 },
    { city: 'Chandigarh', state: 'Chandigarh', aqi: 102 },
    { city: 'Shimla', state: 'Himachal Pradesh', aqi: 45 },
    { city: 'Manali', state: 'Himachal Pradesh', aqi: 28 },
    { city: 'Dharamsala', state: 'Himachal Pradesh', aqi: 38 },
    { city: 'Solan', state: 'Himachal Pradesh', aqi: 52 },
    { city: 'Mandi', state: 'Himachal Pradesh', aqi: 48 },
    { city: 'Kullu', state: 'Himachal Pradesh', aqi: 32 },
    { city: 'Dehradun', state: 'Uttarakhand', aqi: 82 },
    { city: 'Haridwar', state: 'Uttarakhand', aqi: 112 },
    { city: 'Rishikesh', state: 'Uttarakhand', aqi: 72 },
    { city: 'Nainital', state: 'Uttarakhand', aqi: 42 },
    { city: 'Mussoorie', state: 'Uttarakhand', aqi: 35 },
    { city: 'Roorkee', state: 'Uttarakhand', aqi: 95 },
    { city: 'Haldwani', state: 'Uttarakhand', aqi: 88 },
    { city: 'Raipur', state: 'Chhattisgarh', aqi: 122 },
    { city: 'Bilaspur', state: 'Chhattisgarh', aqi: 112 },
    { city: 'Bhilai', state: 'Chhattisgarh', aqi: 132 },
    { city: 'Durg', state: 'Chhattisgarh', aqi: 128 },
    { city: 'Korba', state: 'Chhattisgarh', aqi: 148 },
    { city: 'Jagdalpur', state: 'Chhattisgarh', aqi: 72 },
    { city: 'Raigarh', state: 'Chhattisgarh', aqi: 138 },
    { city: 'Bhopal', state: 'Madhya Pradesh', aqi: 122 },
    { city: 'Indore', state: 'Madhya Pradesh', aqi: 132 },
    { city: 'Jabalpur', state: 'Madhya Pradesh', aqi: 118 },
    { city: 'Gwalior', state: 'Madhya Pradesh', aqi: 158 },
    { city: 'Ujjain', state: 'Madhya Pradesh', aqi: 128 },
    { city: 'Satna', state: 'Madhya Pradesh', aqi: 112 },
    { city: 'Rewa', state: 'Madhya Pradesh', aqi: 108 },
    { city: 'Sagar', state: 'Madhya Pradesh', aqi: 102 },
    { city: 'Ratlam', state: 'Madhya Pradesh', aqi: 118 },
    { city: 'Dewas', state: 'Madhya Pradesh', aqi: 125 },
    { city: 'Singrauli', state: 'Madhya Pradesh', aqi: 155 },
    { city: 'Renipani', state: 'Madhya Pradesh', aqi: 0 },
    { city: 'Madhai', state: 'Madhya Pradesh', aqi: 0 },
    { city: 'Satpura', state: 'Madhya Pradesh', aqi: 0 },
    { city: 'Pachmarhi', state: 'Madhya Pradesh', aqi: 18 },
    { city: 'Mumbai', state: 'Maharashtra', aqi: 148 },
    { city: 'Pune', state: 'Maharashtra', aqi: 112 },
    { city: 'Nagpur', state: 'Maharashtra', aqi: 128 },
    { city: 'Nashik', state: 'Maharashtra', aqi: 108 },
    { city: 'Aurangabad', state: 'Maharashtra', aqi: 118 },
    { city: 'Solapur', state: 'Maharashtra', aqi: 102 },
    { city: 'Kolhapur', state: 'Maharashtra', aqi: 88 },
    { city: 'Thane', state: 'Maharashtra', aqi: 142 },
    { city: 'Navi Mumbai', state: 'Maharashtra', aqi: 138 },
    { city: 'Amravati', state: 'Maharashtra', aqi: 115 },
    { city: 'Akola', state: 'Maharashtra', aqi: 108 },
    { city: 'Latur', state: 'Maharashtra', aqi: 95 },
    { city: 'Nanded', state: 'Maharashtra', aqi: 92 },
    { city: 'Pimpri', state: 'Maharashtra', aqi: 118 },
    { city: 'Ahmedabad', state: 'Gujarat', aqi: 142 },
    { city: 'Surat', state: 'Gujarat', aqi: 132 },
    { city: 'Vadodara', state: 'Gujarat', aqi: 128 },
    { city: 'Rajkot', state: 'Gujarat', aqi: 122 },
    { city: 'Gandhinagar', state: 'Gujarat', aqi: 118 },
    { city: 'Bhavnagar', state: 'Gujarat', aqi: 108 },
    { city: 'Jamnagar', state: 'Gujarat', aqi: 102 },
    { city: 'Junagadh', state: 'Gujarat', aqi: 98 },
    { city: 'Anand', state: 'Gujarat', aqi: 115 },
    { city: 'Bharuch', state: 'Gujarat', aqi: 125 },
    { city: 'Vapi', state: 'Gujarat', aqi: 138 },
    { city: 'Bengaluru', state: 'Karnataka', aqi: 112 },
    { city: 'Bangalore', state: 'Karnataka', aqi: 112 },
    { city: 'Mysuru', state: 'Karnataka', aqi: 78 },
    { city: 'Mysore', state: 'Karnataka', aqi: 78 },
    { city: 'Hubli', state: 'Karnataka', aqi: 98 },
    { city: 'Dharwad', state: 'Karnataka', aqi: 92 },
    { city: 'Mangaluru', state: 'Karnataka', aqi: 68 },
    { city: 'Mangalore', state: 'Karnataka', aqi: 68 },
    { city: 'Belagavi', state: 'Karnataka', aqi: 88 },
    { city: 'Belgaum', state: 'Karnataka', aqi: 88 },
    { city: 'Davangere', state: 'Karnataka', aqi: 92 },
    { city: 'Ballari', state: 'Karnataka', aqi: 102 },
    { city: 'Kalaburagi', state: 'Karnataka', aqi: 98 },
    { city: 'Shivamogga', state: 'Karnataka', aqi: 82 },
    { city: 'Tumkur', state: 'Karnataka', aqi: 88 },
    { city: 'Chennai', state: 'Tamil Nadu', aqi: 122 },
    { city: 'Coimbatore', state: 'Tamil Nadu', aqi: 92 },
    { city: 'Madurai', state: 'Tamil Nadu', aqi: 102 },
    { city: 'Salem', state: 'Tamil Nadu', aqi: 88 },
    { city: 'Tiruchirappalli', state: 'Tamil Nadu', aqi: 98 },
    { city: 'Trichy', state: 'Tamil Nadu', aqi: 98 },
    { city: 'Tirunelveli', state: 'Tamil Nadu', aqi: 82 },
    { city: 'Vellore', state: 'Tamil Nadu', aqi: 92 },
    { city: 'Erode', state: 'Tamil Nadu', aqi: 88 },
    { city: 'Tiruppur', state: 'Tamil Nadu', aqi: 85 },
    { city: 'Thoothukudi', state: 'Tamil Nadu', aqi: 78 },
    { city: 'Hyderabad', state: 'Telangana', aqi: 118 },
    { city: 'Warangal', state: 'Telangana', aqi: 108 },
    { city: 'Nizamabad', state: 'Telangana', aqi: 98 },
    { city: 'Karimnagar', state: 'Telangana', aqi: 102 },
    { city: 'Khammam', state: 'Telangana', aqi: 92 },
    { city: 'Secunderabad', state: 'Telangana', aqi: 115 },
    { city: 'Visakhapatnam', state: 'Andhra Pradesh', aqi: 92 },
    { city: 'Vizag', state: 'Andhra Pradesh', aqi: 92 },
    { city: 'Vijayawada', state: 'Andhra Pradesh', aqi: 108 },
    { city: 'Guntur', state: 'Andhra Pradesh', aqi: 102 },
    { city: 'Nellore', state: 'Andhra Pradesh', aqi: 92 },
    { city: 'Kurnool', state: 'Andhra Pradesh', aqi: 98 },
    { city: 'Tirupati', state: 'Andhra Pradesh', aqi: 82 },
    { city: 'Rajahmundry', state: 'Andhra Pradesh', aqi: 88 },
    { city: 'Kakinada', state: 'Andhra Pradesh', aqi: 85 },
    { city: 'Thiruvananthapuram', state: 'Kerala', aqi: 62 },
    { city: 'Trivandrum', state: 'Kerala', aqi: 62 },
    { city: 'Kochi', state: 'Kerala', aqi: 72 },
    { city: 'Cochin', state: 'Kerala', aqi: 72 },
    { city: 'Kozhikode', state: 'Kerala', aqi: 58 },
    { city: 'Calicut', state: 'Kerala', aqi: 58 },
    { city: 'Thrissur', state: 'Kerala', aqi: 68 },
    { city: 'Kollam', state: 'Kerala', aqi: 62 },
    { city: 'Kannur', state: 'Kerala', aqi: 52 },
    { city: 'Alappuzha', state: 'Kerala', aqi: 55 },
    { city: 'Palakkad', state: 'Kerala', aqi: 65 },
    { city: 'Kolkata', state: 'West Bengal', aqi: 158 },
    { city: 'Calcutta', state: 'West Bengal', aqi: 158 },
    { city: 'Howrah', state: 'West Bengal', aqi: 162 },
    { city: 'Durgapur', state: 'West Bengal', aqi: 148 },
    { city: 'Asansol', state: 'West Bengal', aqi: 142 },
    { city: 'Siliguri', state: 'West Bengal', aqi: 78 },
    { city: 'Darjeeling', state: 'West Bengal', aqi: 38 },
    { city: 'Kharagpur', state: 'West Bengal', aqi: 118 },
    { city: 'Burdwan', state: 'West Bengal', aqi: 132 },
    { city: 'Haldia', state: 'West Bengal', aqi: 145 },
    { city: 'Ranchi', state: 'Jharkhand', aqi: 98 },
    { city: 'Jamshedpur', state: 'Jharkhand', aqi: 132 },
    { city: 'Dhanbad', state: 'Jharkhand', aqi: 158 },
    { city: 'Bokaro', state: 'Jharkhand', aqi: 148 },
    { city: 'Hazaribagh', state: 'Jharkhand', aqi: 92 },
    { city: 'Bhubaneswar', state: 'Odisha', aqi: 88 },
    { city: 'Cuttack', state: 'Odisha', aqi: 92 },
    { city: 'Rourkela', state: 'Odisha', aqi: 112 },
    { city: 'Sambalpur', state: 'Odisha', aqi: 98 },
    { city: 'Puri', state: 'Odisha', aqi: 72 },
    { city: 'Berhampur', state: 'Odisha', aqi: 85 },
    { city: 'Guwahati', state: 'Assam', aqi: 82 },
    { city: 'Silchar', state: 'Assam', aqi: 68 },
    { city: 'Dibrugarh', state: 'Assam', aqi: 72 },
    { city: 'Jorhat', state: 'Assam', aqi: 62 },
    { city: 'Nagaon', state: 'Assam', aqi: 70 },
    { city: 'Shillong', state: 'Meghalaya', aqi: 38 },
    { city: 'Kohima', state: 'Nagaland', aqi: 28 },
    { city: 'Dimapur', state: 'Nagaland', aqi: 45 },
    { city: 'Imphal', state: 'Manipur', aqi: 48 },
    { city: 'Aizawl', state: 'Mizoram', aqi: 25 },
    { city: 'Agartala', state: 'Tripura', aqi: 62 },
    { city: 'Itanagar', state: 'Arunachal Pradesh', aqi: 32 },
    { city: 'Gangtok', state: 'Sikkim', aqi: 25 },
    { city: 'Srinagar', state: 'Jammu & Kashmir', aqi: 68 },
    { city: 'Jammu', state: 'Jammu & Kashmir', aqi: 122 },
    { city: 'Leh', state: 'Ladakh', aqi: 30 },
    { city: 'Kargil', state: 'Ladakh', aqi: 25 },
    { city: 'Panaji', state: 'Goa', aqi: 52 },
    { city: 'Margao', state: 'Goa', aqi: 55 },
    { city: 'Vasco da Gama', state: 'Goa', aqi: 58 },
    { city: 'Mapusa', state: 'Goa', aqi: 50 },
    { city: 'Puducherry', state: 'Puducherry', aqi: 82 },
    { city: 'Pondicherry', state: 'Puducherry', aqi: 82 },
    { city: 'Port Blair', state: 'Andaman & Nicobar', aqi: 28 },
    { city: 'Silvassa', state: 'Dadra & Nagar Haveli', aqi: 92 },
    { city: 'Daman', state: 'Daman & Diu', aqi: 88 },
    { city: 'Diu', state: 'Daman & Diu', aqi: 72 },
  ];

  // ── Lookup ─────────────────────────────────────────────────────────────────
  function lookupCity(query) {
    const q = query.trim().toLowerCase();
    return AQI_DATA.find(d => d.city.toLowerCase() === q) || null;
  }

  // ── AQI helpers ────────────────────────────────────────────────────────────
  function getAQIInfo(aqi) {
    if (aqi <= 50)  return { color: '#4CAF50', label: 'Good' };
    if (aqi <= 100) return { color: '#FFC107', label: 'Moderate' };
    if (aqi <= 150) return { color: '#FF9800', label: 'Unhealthy for Sensitive Groups' };
    if (aqi <= 200) return { color: '#F44336', label: 'Unhealthy' };
    return { color: '#9C27B0', label: 'Very Unhealthy' };
  }

  function getMessage(aqi) {
    if (aqi === 0)   return 'This is Satpura territory — pristine air, zero pollution.';
    if (aqi <= 50)   return 'Even at its best, city air can\'t match a pristine forest.';
    if (aqi <= 100)  return `You're breathing air ${aqi}× more polluted than Satpura's forests.`;
    if (aqi <= 200)  return `At ${aqi} AQI, your lungs are working overtime. Satpura sits at 0.`;
    return `${aqi} AQI — hazardous. The Satpura forest breathes at absolute zero.`;
  }

  // ── Render ─────────────────────────────────────────────────────────────────
  function showError(msg) {
    result.innerHTML = `<div class="aqi-error">${msg}</div>`;
    result.classList.add('visible');
  }

  function showResult(entry) {
    const { city, state, aqi } = entry;
    const info = getAQIInfo(aqi);
    const barPct = Math.min((aqi / 300) * 100, 100);
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
