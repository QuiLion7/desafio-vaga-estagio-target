# Desafios de Estágio

Este projeto responsivo de perguntas e respostas interativas, foi desenvolvido como parte de uma seleção para vaga de estágio.

![Print versão desktop](https://github.com/QuiLion7/desafio-vaga-estagio-target/blob/main/app/images/desktop.png?raw=true)
![Print versão tablet](https://github.com/QuiLion7/desafio-vaga-estagio-target/blob/main/app/images/tablet.png?raw=true)
![Print versão mobile](https://github.com/QuiLion7/desafio-vaga-estagio-target/blob/main/app/images/tablet.png?raw=true)

## Funcionalidades

- **Navegação dinâmica** com transições suaves entre seções.
- **Animações interativas** para tornar a experiência do usuário mais envolvente.
- **Componentes lógicos interativos** como Fibonacci, Contagem, Soma, Lógica e Interruptor.
- **Formulário de Contato** com validação e integração ao WhatsApp para envio de mensagens.

## Stack utilizada

- **Next.js** - Framework de React para desenvolvimento full-stack
- **TypeScript** - Superset de JavaScript que adiciona tipagem estática
- **TailwindCSS** - Framework de CSS para estilização rápida e responsiva
- **Framer Motion** - Biblioteca para animações suaves em React
- **React Hook Form** - Gerenciamento de formulários em React
- **Zod** - Validação de esquemas de dados em TypeScript
- **React Scroll** - Para navegação suave entre as seções da página
- **Shadcn** - Biblioteca de componentes UI acessíveis e personalizáveis

## Uso/Exemplos

```javascript
const checkIsFibonacci = useCallback((num: number): string => {
  let a = 0;
  let b = 1;
  let next = 0;

  while (next < num) {
    next = a + b;
    a = b;
    b = next;
  }

  return next === num || num === 0
    ? `"${num}" pertence à sequência de Fibonacci.`
    : `"${num}" não pertence à sequência de Fibonacci.`;
}, []);

const handleCheck = useCallback(() => {
  if (inputValue > 0) {
    const resultMessage = checkIsFibonacci(inputValue);
    setResult(resultMessage);
    setCountdown(5);
    setInputValue(0);

    const clearResult = () => {
      setResult("");
    };

    const updateCountdown = () => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(updateInterval);
          clearResult();
        }
        return prev - 1;
      });
    };

    const timeoutId = setTimeout(clearResult, 5000);
    const updateInterval = setInterval(updateCountdown, 1000);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(updateInterval);
    };
  }
}, [inputValue, checkIsFibonacci]);
```

## Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

- Faça um `fork` do projeto.
- Crie uma `nova branch`.
- Faça `commit` das suas alterações.
- Faça `push` para a branch.
- Abra um `pull request`.

## Autores

- [@QuiLion7](https://www.github.com/QuiLion7)

## Licença

[MIT](https://choosealicense.com/licenses/mit/)
