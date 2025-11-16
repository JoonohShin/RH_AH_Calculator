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

    const P = 1013;

    const es = (T) => 6.112 * Math.exp((17.67 * T) / (T + 243.5));

    const e_sw = es(T_w);
    const e_s  = es(T_d);

    const e = e_sw - 0.00066 * P * (T_d - T_w);

    const AH = (2.16679 * e) / (T_d + 273.15);
    const RH = (e / e_s) * 100;
    const VPD = (e_s - e) / 10;

    // 🔥 여기서 plant-tip이 실제 HTML로 들어감!
    resultDiv.innerHTML = `
        <b>계산 결과</b><br>
        ● 절대습도: <b>${AH.toFixed(2)} g/m³</b><br>
        ● 상대습도: <b>${RH.toFixed(1)} %</b><br>
        ● 수분부족분(VPD): <b>${VPD.toFixed(2)} kPa</b><br><br>

        <div class="plant-tip">
            <span class="leaf">🌱</span>
            이 3가지 요소는 <b>식물 생육에 매우 중요한 환경 지표</b>입니다.
        </div>
    `;
}
