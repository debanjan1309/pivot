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
