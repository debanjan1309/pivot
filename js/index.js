function calculatePivot() {
    const candleHigh = parseFloat(document.getElementById('candleHigh').value);
    const candleLow = parseFloat(document.getElementById('candleLow').value);
    const candleClose = parseFloat(document.getElementById('candleClose').value);

    if (isNaN(candleHigh) || isNaN(candleLow) || isNaN(candleClose)) {
        alert('Please enter valid numbers.');
        return;
    }

    const pivot = (candleHigh + candleClose + candleLow) / 3;
    const candleSize = candleHigh - candleLow;

    const support1 = pivot - (0.382 * candleSize);
    const support2 = pivot - (0.618 * candleSize);
    const support3 = pivot - candleSize;
    const resistance1 = pivot + (0.382 * candleSize);
    const resistance2 = pivot + (0.618 * candleSize);
    const resistance3 = pivot + candleSize;

    document.getElementById('results').style.display = 'block';
    document.getElementById('pivot').textContent = `Pivot: ${pivot.toFixed(2)}`;
    document.getElementById('support1').textContent = `Support 1: ${support1.toFixed(2)}`;
    document.getElementById('support2').textContent = `Support 2: ${support2.toFixed(2)}`;
    document.getElementById('support3').textContent = `Support 3: ${support3.toFixed(2)}`;
    document.getElementById('resistance1').textContent = `Resistance 1: ${resistance1.toFixed(2)}`;
    document.getElementById('resistance2').textContent = `Resistance 2: ${resistance2.toFixed(2)}`;
    document.getElementById('resistance3').textContent = `Resistance 3: ${resistance3.toFixed(2)}`;
}

//------------------------------------------------------------------------------------------------------------------------------------------>

function calculateAll() {
    const inputValue = parseFloat(document.getElementById('inputValue').value);

    if (isNaN(inputValue)) {
        alert("Please enter a valid number.");
        return;
    }

    const sqrtValue = Math.sqrt(inputValue);

    // --- Vibration Calculation ---
    function getVibrationMinutes(multiplier, adjustment) {
        return ((multiplier * sqrtValue) - adjustment) % 180;
    }

    function generateTimes(vibrationMinutes) {
        const times = [];
        let currentTime = new Date();
        currentTime.setHours(9, 15, 0, 0);
        const endTime = new Date();
        endTime.setHours(15, 30, 0, 0);

        currentTime.setMinutes(currentTime.getMinutes() + vibrationMinutes);

        while (currentTime <= endTime) {
            let hours = currentTime.getHours();
            let minutes = currentTime.getMinutes();
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12;
            times.push(`${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`);
            currentTime.setMinutes(currentTime.getMinutes() + vibrationMinutes);
        }

        return times;
    }

    const vibrationMinutes1 = getVibrationMinutes(210, 180);
    const vibrationMinutes2 = getVibrationMinutes(180, 225);

    const vibrationTimes1 = generateTimes(vibrationMinutes1);
    const vibrationTimes2 = generateTimes(vibrationMinutes2);

    // --- Gann Levels ---
    function gannLevels(cmp) {
        const root = Math.round(Math.sqrt(cmp) * 1000) / 1000;
        const ir = Math.floor(root);
        const fr = root - ir;
        const step = 0.125;
        const base = Math.floor(fr / step) * step;

        const buy = Math.round(Math.pow(ir + base + step, 2) * 100) / 100;
        const sell = Math.round(Math.pow(ir + base, 2) * 100) / 100;
        const sl = Math.round((buy + sell) / 2 * 100) / 100;

        const resistances = [];
        for (let i = 2; i <= 6; i++) resistances.push(Math.round(Math.pow(ir + base + i * step, 2) * 100) / 100);

        const supports = [];
        for (let i = 1; i <= 5; i++) supports.push(Math.round(Math.pow(ir + base - i * step, 2) * 100) / 100);

        const bt = resistances.map(r => Math.round(r * 0.9995 * 100) / 100);
        const st = supports.map(s => Math.round(s * 1.0005 * 100) / 100);

        return { buy, sell, sl, bt, st };
    }

    function gannLevelsBig(cmp) {
        const root = Math.sqrt(cmp);
        const step = 0.08334;
        const buy = Math.round(Math.pow(root + 3.5 * step, 2) * 100) / 100;
        const sell = Math.round(Math.pow(root - 3.5 * step, 2) * 100) / 100;
        const sl = Math.round((buy + sell) / 2 * 100) / 100;

        const elements = [6, 8, 12, 18, 24, 28];
        const bt = elements.map(e => Math.round(Math.pow(root + e * step, 2) * 100) / 100);
        const st = elements.map(e => Math.round(Math.pow(root - e * step, 2) * 100) / 100);

        return { buy, sell, sl, bt, st };
    }

    let gannResult;
    if (inputValue > 4000) {
        gannResult = gannLevelsBig(inputValue);
        document.getElementById("gannTitle").textContent = "Gann Big Levels:";
    } else {
        gannResult = gannLevels(inputValue);
        document.getElementById("gannTitle").textContent = "Gann Levels:";
    }

    const gannBody = document.getElementById("gannBody");
    gannBody.innerHTML = `
        <tr>
            <td>${gannResult.st.join(", ")}</td>
            <td>${gannResult.sell}</td>
            <td>${gannResult.sl}</td>
            <td>${gannResult.buy}</td>
            <td>${gannResult.bt.join(", ")}</td>
        </tr>
    `;

    document.getElementById("vibration1").textContent = `Vibration 1 Times: ${vibrationTimes1.join(", ")}`;
    document.getElementById("vibration2").textContent = `Vibration 2 Times: ${vibrationTimes2.join(", ")}`;

    document.getElementById("results").style.display = 'block';
}
