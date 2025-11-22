// Magnus–Sonntag 포화수증기압 함수
function es_magnus_sonntag(Tc) {
    // Tc: 섭씨 온도
    return 6.112 * Math.exp((17.62 * Tc) / (243.12 + Tc));
}

function calculate() {
    const Td = parseFloat(document.getElementById("dryBulb").value);
    const Tw = parseFloat(document.getElementById("wetBulb").value);
    const resultDiv = document.getElementById("result");

    if (isNaN(Td) || isNaN(Tw)) {
        resultDiv.innerHTML = "건구온도와 습구온도를 모두 입력해주세요.";
        return;
    }

    if (Tw > Td) {
        resultDiv.innerHTML = "습구온도는 건구온도보다 높을 수 없습니다.";
        return;
    }

    // -----------------------------------------
    // Python 공식 100% 동일한 계산 로직 시작
    // -----------------------------------------

    // 1) 포화수증기압 (hPa)
    const e_d = es_magnus_sonntag(Td);   // 건구 기준 포화수증기압
    const e_w = es_magnus_sonntag(Tw);   // 습구 기준 포화수증기압

    // 2) 실제 수증기압 e (hPa)
    const N = 0.6687451584;  // psychrometric constant 근사값
    const e = e_w - N * (1.0 + 0.00115 * Tw) * (Td - Tw);

    // 3) 상대습도 (%)
    const RH = (e / e_d) * 100.0;

    // 4) 절대습도 (g/m^3)
    const AH = 216.7 * e / (Td + 273.15);

    // 5) 수분부족분 (hPa, kPa)
    const VPD_hPa = e_d - e;
    const VPD_kPa = VPD_hPa / 10.0;

    // -----------------------------------------
    // 출력 HTML
    // -----------------------------------------

    resultDiv.innerHTML = `
        <b>계산 결과</b><br>
        ● 상대습도(RH): <b>${RH.toFixed(2)} %</b><br>
        ● 절대습도(AH): <b>${AH.toFixed(3)} g/m³</b><br>
        ● 수분부족분 VPD: <b>${VPD_hPa.toFixed(3)} hPa</b>
          (<b>${VPD_kPa.toFixed(3)} kPa</b>)<br><br>

        <div class="plant-tip">
            <span class="leaf">🌱</span>
            이 3가지 요소는 <b>식물 생육에 매우 중요한 환경 지표</b>입니다.
        </div>
    `;
}
