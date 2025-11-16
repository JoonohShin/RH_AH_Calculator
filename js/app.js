function calculate() {
    const T_d = parseFloat(document.getElementById("dryBulb").value);
    const T_w = parseFloat(document.getElementById("wetBulb").value);

    if (isNaN(T_d) || isNaN(T_w)) {
        document.getElementById("result").innerHTML = "온도를 제대로 입력해주세요.";
        return;
    }

    // 대기압 1013 hPa 가정
    const P = 1013;

    // 포화수증기압 계산 함수
    function saturationVaporPressure(T) {
        return 6.112 * Math.exp((17.67 * T) / (T + 243.5));
    }

    const e_sw = saturationVaporPressure(T_w);   // 습구 포화수증기압
    const e_s  = saturationVaporPressure(T_d);   // 건구 포화수증기압

    // 실제 수증기압 (습구 이용)
    const e = e_sw - 0.00066 * P * (T_d - T_w);

    // 절대습도 (g/m³)
    const AH = (2.16679 * e) / (T_d + 273.15);

    // 상대습도 (%)
    const RH = (e / e_s) * 100;

    document.getElementById("result").innerHTML = `
        ● 절대습도: <b>${AH.toFixed(2)} g/m³</b><br>
        ● 상대습도: <b>${RH.toFixed(1)} %</b>
    `;
}
