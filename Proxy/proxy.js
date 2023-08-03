const object = {
    name: 'Matheus',
    age: 21
};

const handler = {
    get: (obj, prop) => {
        console.log(`Acessando ${prop}`);
        return obj[prop];
    },

    set: (obj, prop, value) => {
        console.log(`Definindo a propriedade ${prop} com o valor ${value}`);
        obj[prop] = value;
    }
};

const proxy = new Proxy(object, handler);

console.log(proxy.name);
console.log(proxy.age);

proxy.name = 'Ranzani';
proxy.age = 30;
