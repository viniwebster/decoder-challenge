//Atribui as variaveis aos seus respectivos elementos HTML
const textarea = document.querySelector(".textarea");
const btnEncrypt = document.getElementById("encrypt");
const btnDecrypt = document.getElementById("decrypt");
const decryptContainerFigure = document.querySelector(
  ".container__right_figure"
);
const output = document.querySelector(".output");
const btnCopy = document.getElementById("button_copy");
const message = document.getElementById("error_message");

textarea.focus();
let minCharacter = 3;

const keyEncrypt = [
  ["e", "enter"],
  ["i", "imes"],
  ["a", "ai"],
  ["o", "ober"],
  ["u", "ufat"],
];

const keyDecrypt = [
  ["enter", "e"],
  ["imes", "i"],
  ["ai", "a"],
  ["ober", "o"],
  ["ufat", "u"],
];

//Executa função de encriptar ao clicar no botao criptografar
btnEncrypt.addEventListener("click", () => {
  let regExp = /^[a-z\s,.!?]*$/;
  //checa para ver se o campo de texto possui os requisitos
  if (regExp.test(textarea.value)) {
    output.innerHTML = encrypt(textarea.value, keyEncrypt);
    changeStyleOutput();
  } else {
    //Caso nao tenha os requisitos executa a função errorMessage exibindo a mensagem de erro na página
    errorMessage(`O texto não pode conter caracteres especiais e letras maiusculas!`);
  }
});

//Executa a função desencriptar no botão descriptografar
btnDecrypt.addEventListener("click", () => {
  if (textarea.value.length > minCharacter) {
    output.innerHTML = decrypt(textarea.value, keyDecrypt);
    changeStyleOutput();
  } else {
    errorMessage(`O texto não pode conter caracteres especiais e letras maiusculas!`);
  }
});

//Ao clicar no botão copiar, seleciona o texto gerado no campo output e copia para o clipboard
btnCopy.addEventListener("click", () => {
  navigator.clipboard
    .writeText(output.innerHTML)
    .then(() => {
      btnCopy.innerHTML = "Copiado!";
      setTimeout(() => {
        btnCopy.innerHTML = "Copiar";
      }, 2000);
    })
    .catch((e) => console.log(e));
});

//Função para criptografar o texto
function encrypt(text, key) {
  text = text.toLowerCase();

  //Faz um laço de repetição que percorre a matriz com a chave de criptografia
  for (let index = 0; index < key.length; index++) {
    //Faz um laço de repetição que percorre o texto
    for (let i = 0; i < text.length; i++) {
      //Verifica se o caractere atual é igual o caractere da chave, se for, faz a troca pelo valor contido na matriz da chave utilizando o metodo javaScript replaceAll
      if (text[i] == key[index][0]) {
        text = text.replaceAll(key[index][0], key[index][1]);
        break;
      }
    }
  }
  return text;
}

//Funciona da mesma forma que a função encrypt, porém sem a verificação caractere por caractere
function decrypt(text, key) {
  text = text.toLowerCase();

  for (let index = 0; index < key.length; index++) {
    for (let i = 0; i < text.length; i++) {
      text = text.replaceAll(key[index][0], key[index][1]);
    }
  }
  return text;
}

//Esconde a imagem do output, limpa o textarea e exibe o botão de copiar
function changeStyleOutput() {
  decryptContainerFigure.style.display = "none";
  btnCopy.style.display = "block";
  textarea.value = "";
}

//Exibe a mensagem de erro na nossa tag html
function errorMessage(error_message) {
  message.innerHTML = error_message;
  setTimeout(() => {
    message.innerHTML = "Apenas letras minúsculas e sem acento.";
  }, 3000);
}