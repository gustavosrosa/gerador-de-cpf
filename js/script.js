let cpfSection = document.querySelector(".cpf");
let generateBtn = document.querySelector("#generate");
let copyAreaBtn = document.querySelector("#copy");
let cpfElement = document.querySelector("#cpf-element")

generateBtn.addEventListener("click", () => {
    cpfElement.innerText = generateBaseNumberCPF();
})

copyAreaBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(cpfElement.innerText).then(
        () => {
            console.log(`${cpfElement.innerText} copiado!`)
        },
        (err) => {
            console.log(`${cpfElement.innerText} não foi copiado, houve um erro!`)
        }
    )
})

function generateBaseNumberCPF() {
    let baseNumber = String(Math.floor(Math.random() * 99999999)).padStart(8, "0");

    return formatCPF(createCPFWithBusinessFields(baseNumber));
    
}

function generateUFDigit() {
    let possibilities = "0123456789";
    return possibilities[Math.floor(Math.random() * possibilities.length)];
}

function generateVD(baseNumber, initializer) {

    let businessSum = initParameters().sum;
    let weight = initParameters().weight;

    for (let i = initializer; i < baseNumber.length; i++) {
        businessSum += parseInt(baseNumber.charAt(i)) * weight-- 
    }

    return calcRemainerToDigit(businessSum);
}

function calcRemainerToDigit(sum) {
    let remainder = sum % 11;
    let digit;

    (remainder == 0 || remainder == 1) ? digit = 0 : digit = 11 - remainder;

    return digit;
}

function createCPFWithBusinessFields(baseNumber) {
    baseNumber += generateUFDigit();
    baseNumber += generateVD(baseNumber, initParameters().vd1);
    baseNumber += generateVD(baseNumber, initParameters().vd2);

    return baseNumber;
}

function formatCPF(cpf) {
    const regex = /^(\d{3})(\d{3})(\d{3})(\d{2})$/;
    return cpf.replace(regex, "$1.$2.$3-$4");
}

function initParameters() {
    return {
        sum: 0,
        weight: 10,
        vd1: 0,
        vd2: 1
    }
}