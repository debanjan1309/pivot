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

//------------------------------------------------------------------------------------------------------------------------>

function calculateVibration() {
    const inputValue = parseFloat(document.getElementById('inputValue').value);

    if (isNaN(inputValue)) {
        alert("Please enter a valid number.");
        return;
    }

    const sqrt = Math.sqrt(inputValue);

    function computeTime(multiplier, adjustment) {
        let degree = ((multiplier * sqrt) - adjustment) % 180;
        let totalHours = degree / 60;
        let hours = Math.floor(totalHours);
        let minutes = Math.round((totalHours % 1) * 60);

        if (minutes >= 60) {
            minutes -= 60;
            hours += 1;
        }

        let finalHour = 9 + hours;
        let finalMinute = 15 + minutes;

        if (finalMinute >= 60) {
            finalMinute -= 60;
            finalHour += 1;
        }

        return `${finalHour}:${finalMinute.toString().padStart(2, '0')} a.m.`;
    }

    const vibration1 = computeTime(210, 180);
    const vibration2 = computeTime(180, 225);

    document.getElementById("vibration1").textContent = `First Vibration Time: ${vibration1}`;
    document.getElementById("vibration2").textContent = `Second Vibration Time: ${vibration2}`;
    document.getElementById("vibrationResults").style.display = 'block';
}
