function saturationVaporPressure(T) {
    return 6.112 * Math.exp((17.67 * T) / (T + 243.5));
}

function calculate() {
    const T_d = parseFloat(document.getElementById("dryBulb").value);
    const T_w = parseFloat(document.getElementById("wetBulb").value);
    const resultDiv = document.getElementById("result");

    if (isNaN(T_d) || isNaN(T_w)) {
        resultDiv.innerHTML = "건구온도와 습구온도를 모두 입력해주세요.";
        return;
    }

    if (T_w > T_d) {
        resultDiv.innerHTML = "습구온도는 건구온도보다 높을 수 없습니다.";
        return;
    }

    const P = 1013; // hPa
    const e_sw = saturationVaporPressure(T_w);
    const e_s = saturationVaporPressure(T_d);

    // 실제 수증기압
    const e = e_sw - 0.00066 * P * (T_d - T_w);

    // 절대습도 (g/m³)
    const AH = (2.16679 * e) / (T_d + 273.15);

    // 상대습도 (%)
    const RH = (e / e_s) * 100;

    // 수분부족분(VPD) = 포화수증기압 - 실제수증기압
    const VPD = (e_s - e) / 10; // kPa 단위로 변환

    resultDiv.innerHTML = `
        <b>계산 결과</b><br>
        ● 절대습도: <b>${AH.toFixed(2)} g/m³</b><br>
        ● 상대습도: <b>${RH.toFixed(1)} %</b><br>
        ● 수분부족분(VPD): <b>${VPD.toFixed(2)} kPa</b><br>
    `;
}

window.addEventListener("DOMContentLoaded", () => {
    document.getElementById("calcBtn").addEventListener("click", calculate);
});
