
# Computer Graphics HW

WebGL ile line primitive'ini kullanarak "BATURAY" karakteri için gerekli olan çizgilerin pozisyonlamaları ve translationları ayarlanarak 'BATURAY' kelimesi çizilmiştir.

# WebGL İnitilization
WebGL'i tanımlamak için gerekli boilerplate kod kısımı.

```javascript
function initWebgl() {

    let canvas = document.getElementById('glCanvas');
    let gl = canvas.getContext('webgl');

    if (!gl) {
        console.log('WebGL not supported, falling back on experimental-webgl');
        gl = canvas.getContext('experimental-webgl');
    }

    if (!gl) {
        alert('Your browser does not support WebGL');
    }

    return gl;

}

function createShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
        return shader;
    }

    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
}

function createProgram(gl, vertexShader, fragmentShader) {
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    const success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
        return program;
    }

    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
}

}
```

# Draw ve Translation 
draw fonsiyonu kullanılarak çizgilerin çizimi yapılırken translation fonksiyonu ile çizimin yapılacağı pozisyon belirleniyorç
```javascript
function translation(positions, translation) {
    const positionBuffer = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, positionBuffer);
    GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(positions), GL.STATIC_DRAW);

    const positionAttributeLocation = GL.getAttribLocation(program, "a_position");
    GL.enableVertexAttribArray(positionAttributeLocation);
    GL.vertexAttribPointer(positionAttributeLocation, 2, GL.FLOAT, false, 0, 0);

    const translationLocation = GL.getUniformLocation(program, "u_translation");
    GL.uniform2fv(translationLocation, translation);
}

function draw(positions, color) {
    const colorLocation = GL.getUniformLocation(program, "u_color");
    GL.uniform4fv(colorLocation, color);
    GL.drawArrays(GL.LINES, 0, positions.length);
}
```



