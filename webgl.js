const vertexShaderSource = `
    attribute vec4 a_position;
    uniform vec2 u_translation;
    void main() {
        gl_Position = a_position + vec4(u_translation, 0, 0);
        gl_PointSize = 10.0;
    }
`;
const fragmentShaderSource = `
    precision mediump float;
    uniform vec4 u_color;
    void main() {
        gl_FragColor = u_color;
    }
`;




const B = [
    -0.15, -0.15, -0.15, 0.15,
    -0.15, 0.15, 0.0, 0.15,
    -0.15, -0.15, 0.0, -0.15,
    -0.15, 0.0, 0.0, 0.0,
    0.0, 0.15, 0.0, 0.0,
    0.0, 0.0, 0.0, -0.15,
];

const A = [
    -0.15, -0.15,
    0.0, 0.15,
    0.0, 0.15,
    0.15, -0.15,
    -0.08, 0.0,
    0.08, 0.0,
];

const T = [
    -0.15, 0.15,
    0.15, 0.15,
    0.0, 0.15,
    0.0, -0.15,
];

const R = [
    -0.15, 0.15,
    -0.15, -0.15,

    -0.15, 0.15,
    0.0, 0.15,

    -0.15, 0.0,
    0.0, 0.0,

    0.0, 0.15,
    0.0, 0.0,

    -0.10, 0.00,
    0.0, -0.125,
];

const U = [
    -0.05, 0.125,
    -0.05, -0.125,

    -0.05, -0.125,
    0.05, -0.125,

    0.05, -0.125,
    0.05, 0.125,
];

const Y = [
    -0.15, 0.15,
    0.0, 0.0,

    0.15, 0.15,
    0.0, 0.0,

    0.0, 0.0,
    0.0, -0.15,
];

let program;
let GL;



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

function start() {
    GL = initWebgl();

    if (!GL) {
        return;
    }
    const vertexShader = createShader(GL, GL.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(GL, GL.FRAGMENT_SHADER, fragmentShaderSource);
    program = createProgram(GL, vertexShader, fragmentShader);

    GL.useProgram(program);



    translation(B, [-0.8, 0]);
    draw(B, [0.0, 0.0, 1.0, 1.0]);

    translation(A, [-0.6, 0]);
    draw(A, [0.0, 1.0, 0.0, 1.0]);

    translation(T, [-0.3, 0]);
    draw(T, [1.0, 0.0, 1.0, 1.0]);

    translation(U, [0.0, 0]);
    draw(U, [1.0, 0.0, 0.0, 1.0]);

    translation(R, [0.3, 0]);
    draw(R, [0.0, 1.0, 1.0, 1.0]);

    translation(A, [0.5, 0]);
    draw(A, [0.5, 0.1, 1.0, 1.0]);

    translation(Y, [0.8, 0]);
    draw(Y, [0.2, 0.5, 0.0, 1.0]);

}

start();
